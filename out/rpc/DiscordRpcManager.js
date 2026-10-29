"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordRpcManager = void 0;
const discord_rpc_1 = require("discord-rpc");
const events_1 = require("events");
class DiscordRpcManager {
    static instance = null;
    client = null;
    clientId;
    isConnected = false;
    isConnecting = false;
    retryCount = 0;
    reconnectTimer = null;
    discordUser = null;
    THROTTLE_INTERVAL_MS = 15000;
    lastSendTimestamp = 0;
    pendingPayload = null;
    throttleTimer = null;
    events = new events_1.EventEmitter();
    outputChannel;
    constructor(clientId) {
        this.clientId = clientId;
    }
    static getInstance(clientId) {
        if (!DiscordRpcManager.instance) {
            DiscordRpcManager.instance = new DiscordRpcManager(clientId);
        }
        else if (DiscordRpcManager.instance.clientId !== clientId) {
            DiscordRpcManager.instance.updateClientId(clientId);
        }
        return DiscordRpcManager.instance;
    }
    setOutputChannel(channel) {
        this.outputChannel = channel;
    }
    log(message) {
        const time = new Date().toLocaleTimeString();
        this.outputChannel?.appendLine(`[${time}] ${message}`);
    }
    onConnectionChange(listener) {
        this.events.on('change', listener);
        return {
            dispose: () => {
                this.events.off('change', listener);
            }
        };
    }
    static computeBackoff(retryCount, baseDelayMs = 5000, maxDelayMs = 60000, jitterMs = 0) {
        const exponent = Math.min(retryCount, 5);
        const calculated = Math.min(maxDelayMs, baseDelayMs * Math.pow(2, exponent));
        return calculated + jitterMs;
    }
    updateClientId(newClientId) {
        if (this.clientId === newClientId)
            return;
        this.clientId = newClientId;
        this.log(`Client ID updated to: ${newClientId}`);
        this.disconnectAndClean();
        this.connect();
    }
    async connect() {
        if (this.isConnected || this.isConnecting || !this.clientId)
            return;
        this.isConnecting = true;
        this.clearReconnectTimer();
        this.emitState();
        this.log('Connecting to Discord IPC socket...');
        try {
            const client = new discord_rpc_1.Client({ transport: 'ipc' });
            this.client = client;
            client.on('ready', () => {
                this.isConnected = true;
                this.isConnecting = false;
                this.retryCount = 0;
                this.discordUser = client.user?.username || 'User';
                this.log(`Successfully connected to Discord as: ${this.discordUser}`);
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
            client.on('error', (err) => {
                this.log(`Discord IPC error: ${String(err)}`);
                this.handleDisconnect(err);
            });
            const transportAny = client.transport;
            if (transportAny?.socket?.on) {
                transportAny.socket.on('error', (err) => {
                    this.log(`Socket error trapped: ${String(err)}`);
                    this.handleDisconnect(err);
                });
            }
            await client.login({ clientId: this.clientId });
        }
        catch (error) {
            this.log(`Failed to login to Discord: ${String(error)}`);
            this.handleDisconnect(error);
        }
    }
    emitState() {
        this.events.emit('change', {
            isConnected: this.isConnected,
            isConnecting: this.isConnecting,
            user: this.discordUser || undefined
        });
    }
    handleDisconnect(error) {
        this.isConnected = false;
        this.isConnecting = false;
        this.discordUser = null;
        this.emitState();
        this.cleanupClient();
        this.scheduleReconnect();
    }
    scheduleReconnect() {
        this.clearReconnectTimer();
        const jitter = Math.floor(Math.random() * 2000);
        const delay = DiscordRpcManager.computeBackoff(this.retryCount, 5000, 60000, jitter);
        this.retryCount++;
        this.log(`Scheduling reconnect in ${(delay / 1000).toFixed(1)}s (Attempt #${this.retryCount})...`);
        this.reconnectTimer = setTimeout(() => {
            this.connect();
        }, delay);
    }
    updateActivity(payload) {
        this.pendingPayload = payload;
        if (!this.isConnected || !this.client) {
            this.log(`Activity queued (offline): ${payload.details || 'No details'} | ${payload.state || 'No state'}`);
            return;
        }
        const now = Date.now();
        const elapsed = now - this.lastSendTimestamp;
        if (elapsed >= this.THROTTLE_INTERVAL_MS) {
            this.executeSend(payload);
        }
        else if (!this.throttleTimer) {
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
    async forceSendActivity(payload) {
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
    async executeSend(payload) {
        if (!this.client || !this.isConnected)
            return;
        try {
            this.log(`Sending Activity to Discord -> Details: "${payload.details || ''}" | State: "${payload.state || ''}" | Icon: "${payload.largeImageKey || ''}"`);
            await this.client.setActivity(payload);
            this.lastSendTimestamp = Date.now();
            this.pendingPayload = null;
        }
        catch (err) {
            this.log(`Failed to set activity: ${String(err)}`);
            this.handleDisconnect(err);
        }
    }
    async clearActivity() {
        this.pendingPayload = null;
        if (this.throttleTimer) {
            clearTimeout(this.throttleTimer);
            this.throttleTimer = null;
        }
        if (this.client && this.isConnected) {
            try {
                this.log('Clearing presence from Discord...');
                await this.client.clearActivity();
            }
            catch {
                // Ignore socket teardown failures
            }
        }
    }
    clearReconnectTimer() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
    }
    cleanupClient() {
        if (this.client) {
            try {
                this.client.destroy();
            }
            catch {
                // Ignore destroy errors
            }
            this.client = null;
        }
    }
    disconnectAndClean() {
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
    getStatus() {
        return {
            isConnected: this.isConnected,
            isConnecting: this.isConnecting,
            retryCount: this.retryCount,
            user: this.discordUser
        };
    }
    dispose() {
        this.disconnectAndClean();
        this.events.removeAllListeners();
        DiscordRpcManager.instance = null;
    }
}
exports.DiscordRpcManager = DiscordRpcManager;
//# sourceMappingURL=DiscordRpcManager.js.map