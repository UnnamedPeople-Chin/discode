import { Client, Presence } from 'discord-rpc';
import { EventEmitter } from 'events';
import type * as vscode from 'vscode';

export type ActivityPayload = Presence;

export interface DiscordUserInfo {
    id: string;
    username: string;
    globalName: string;
    discriminator?: string;
    avatar?: string | null;
    avatarUrl?: string;
}

export interface ConnectionState {
    isConnected: boolean;
    isConnecting: boolean;
    user?: string;
    userInfo?: DiscordUserInfo;
}

export class DiscordRpcManager implements vscode.Disposable {
    private static instance: DiscordRpcManager | null = null;
    private client: Client | null = null;
    private clientId: string;

    private isConnected = false;
    private isConnecting = false;
    private retryCount = 0;
    private reconnectTimer: NodeJS.Timeout | null = null;
    private discordUser: string | null = null;
    private currentUserInfo: DiscordUserInfo | null = null;

    private readonly THROTTLE_INTERVAL_MS = 15000;
    private lastSendTimestamp = 0;
    private pendingPayload: ActivityPayload | null = null;
    private throttleTimer: NodeJS.Timeout | null = null;

    private readonly events = new EventEmitter();
    private outputChannel?: { appendLine: (msg: string) => void };

    private constructor(clientId: string) {
        this.clientId = clientId;
    }

    public static getInstance(clientId: string): DiscordRpcManager {
        if (!DiscordRpcManager.instance) {
            DiscordRpcManager.instance = new DiscordRpcManager(clientId);
        } else if (DiscordRpcManager.instance.clientId !== clientId) {
            DiscordRpcManager.instance.updateClientId(clientId);
        }
        return DiscordRpcManager.instance;
    }

    public setOutputChannel(channel: { appendLine: (msg: string) => void }): void {
        this.outputChannel = channel;
    }

    private log(message: string): void {
        const time = new Date().toLocaleTimeString();
        this.outputChannel?.appendLine(`[${time}] ${message}`);
    }

    public onConnectionChange(listener: (state: ConnectionState) => void): { dispose: () => void } {
        this.events.on('change', listener);
        return {
            dispose: () => {
                this.events.off('change', listener);
            }
        };
    }

    public static computeBackoff(
        retryCount: number,
        baseDelayMs = 5000,
        maxDelayMs = 60000,
        jitterMs = 0
    ): number {
        const exponent = Math.min(retryCount, 5);
        const calculated = Math.min(maxDelayMs, baseDelayMs * Math.pow(2, exponent));
        return calculated + jitterMs;
    }

    public updateClientId(newClientId: string): void {
        if (this.clientId === newClientId) return;
        this.clientId = newClientId;
        this.log(`Client ID updated to: ${newClientId}`);
        this.disconnectAndClean();
        this.connect();
    }

    public async connect(): Promise<void> {
        if (this.isConnected || this.isConnecting || !this.clientId) return;

        this.isConnecting = true;
        this.clearReconnectTimer();
        this.emitState();
        this.log('Connecting to Discord IPC socket...');

        try {
            const client = new Client({ transport: 'ipc' });
            this.client = client;

            client.on('ready', () => {
                this.isConnected = true;
                this.isConnecting = false;
                this.retryCount = 0;

                const rawUser = (client as unknown as {
                    user?: {
                        id?: string;
                        username?: string;
                        discriminator?: string;
                        global_name?: string;
                        avatar?: string | null;
                    };
                }).user;

                if (rawUser && rawUser.id) {
                    let avatarUrl = '';
                    if (rawUser.avatar) {
                        const isAnimated = rawUser.avatar.startsWith('a_');
                        avatarUrl = `https://cdn.discordapp.com/avatars/${rawUser.id}/${rawUser.avatar}.${isAnimated ? 'gif' : 'png'}?size=160`;
                    } else {
                        const disc = rawUser.discriminator && rawUser.discriminator !== '0'
                            ? parseInt(rawUser.discriminator, 10)
                            : null;
                        const defaultIdx = disc !== null
                            ? (disc % 5)
                            : Number((BigInt(rawUser.id) >> 22n) % 6n);
                        avatarUrl = `https://cdn.discordapp.com/embed/avatars/${defaultIdx}.png`;
                    }

                    this.currentUserInfo = {
                        id: rawUser.id,
                        username: rawUser.username || 'User',
                        globalName: rawUser.global_name || rawUser.username || 'User',
                        discriminator: rawUser.discriminator,
                        avatar: rawUser.avatar,
                        avatarUrl
                    };
                    this.discordUser = this.currentUserInfo.globalName;
                } else {
                    this.discordUser = client.user?.username || 'User';
                    this.currentUserInfo = null;
                }

                this.log(`Successfully connected to Discord as: ${this.discordUser} (ID: ${this.currentUserInfo?.id || 'Unknown'})`);
                this.emitState();

                if (this.pendingPayload) {
                    const toSend = this.pendingPayload;
                    this.pendingPayload = null;
                    this.updateActivity(toSend);
                }
            });

            client.on('close', () => {
                this.log('Discord IPC connection closed.');
                this.handleDisconnect();
            });

            client.on('error', (err: unknown) => {
                this.log(`Discord IPC error: ${String(err)}`);
                this.handleDisconnect(err);
            });

            const transportAny = (client as unknown as { transport?: { socket?: { on?: (event: string, cb: (err: unknown) => void) => void } } }).transport;
            if (transportAny?.socket?.on) {
                transportAny.socket.on('error', (err: unknown) => {
                    this.log(`Socket error trapped: ${String(err)}`);
                    this.handleDisconnect(err);
                });
            }

            await client.login({ clientId: this.clientId });
        } catch (error) {
            this.log(`Failed to login to Discord: ${String(error)}`);
            this.handleDisconnect(error);
        }
    }

    private emitState(): void {
        this.events.emit('change', {
            isConnected: this.isConnected,
            isConnecting: this.isConnecting,
            user: this.discordUser || undefined,
            userInfo: this.currentUserInfo || undefined
        });
    }

    private handleDisconnect(error?: unknown): void {
        this.isConnected = false;
        this.isConnecting = false;
        this.discordUser = null;
        this.currentUserInfo = null;
        this.emitState();
        this.cleanupClient();
        this.scheduleReconnect();
    }

    private scheduleReconnect(): void {
        this.clearReconnectTimer();

        const jitter = Math.floor(Math.random() * 2000);
        const delay = DiscordRpcManager.computeBackoff(this.retryCount, 5000, 60000, jitter);
        this.retryCount++;
        this.log(`Scheduling reconnect in ${(delay / 1000).toFixed(1)}s (Attempt #${this.retryCount})...`);

        this.reconnectTimer = setTimeout(() => {
            this.connect();
        }, delay);
    }

    public updateActivity(payload: ActivityPayload): void {
        this.pendingPayload = payload;

        if (!this.isConnected || !this.client) {
            this.log(`Activity queued (offline): ${payload.details || 'No details'} | ${payload.state || 'No state'}`);
            return;
        }

        const now = Date.now();
        const elapsed = now - this.lastSendTimestamp;

        if (elapsed >= this.THROTTLE_INTERVAL_MS) {
            this.executeSend(payload);
        } else if (!this.throttleTimer) {
            const remaining = this.THROTTLE_INTERVAL_MS - elapsed;
            this.log(`Rate-limit active. Queueing payload to send in ${(remaining / 1000).toFixed(1)}s...`);
            this.throttleTimer = setTimeout(() => {
                this.throttleTimer = null;
                if (this.pendingPayload) {
                    const next = this.pendingPayload;
                    this.pendingPayload = null;
                    this.executeSend(next);
                }
            }, remaining);
        }
    }

    public async forceSendActivity(payload?: ActivityPayload): Promise<void> {
        if (payload) {
            this.pendingPayload = payload;
        }
        if (this.throttleTimer) {
            clearTimeout(this.throttleTimer);
            this.throttleTimer = null;
        }
        if (this.pendingPayload) {
            const toSend = this.pendingPayload;
            this.pendingPayload = null;
            await this.executeSend(toSend);
        }
    }

    private async executeSend(payload: ActivityPayload): Promise<void> {
        if (!this.client || !this.isConnected) return;

        try {
            this.log(`Sending Activity to Discord -> Details: "${payload.details || ''}" | State: "${payload.state || ''}" | Icon: "${payload.largeImageKey || ''}"`);
            await this.client.setActivity(payload);
            this.lastSendTimestamp = Date.now();
            this.pendingPayload = null;
        } catch (err) {
            this.log(`Failed to set activity: ${String(err)}`);
            this.handleDisconnect(err);
        }
    }

    public async clearActivity(): Promise<void> {
        this.pendingPayload = null;
        if (this.throttleTimer) {
            clearTimeout(this.throttleTimer);
            this.throttleTimer = null;
        }

        if (this.client && this.isConnected) {
            try {
                this.log('Clearing presence from Discord...');
                await this.client.clearActivity();
            } catch {
                // Ignore socket teardown failures
            }
        }
    }

    private clearReconnectTimer(): void {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
    }

    private cleanupClient(): void {
        if (this.client) {
            try {
                this.client.destroy();
            } catch {
                // Ignore destroy errors
            }
            this.client = null;
        }
    }

    private disconnectAndClean(): void {
        this.isConnected = false;
        this.isConnecting = false;
        this.clearReconnectTimer();
        if (this.throttleTimer) {
            clearTimeout(this.throttleTimer);
            this.throttleTimer = null;
        }
        this.cleanupClient();
        this.emitState();
    }

    public getStatus(): { isConnected: boolean; isConnecting: boolean; retryCount: number; user: string | null; userInfo: DiscordUserInfo | null } {
        return {
            isConnected: this.isConnected,
            isConnecting: this.isConnecting,
            retryCount: this.retryCount,
            user: this.discordUser,
            userInfo: this.currentUserInfo
        };
    }

    public getCurrentUserInfo(): DiscordUserInfo | null {
        return this.currentUserInfo;
    }

    public isCurrentlyConnected(): boolean {
        return this.isConnected;
    }

    public dispose(): void {
        this.disconnectAndClean();
        this.events.removeAllListeners();
        DiscordRpcManager.instance = null;
    }
}
