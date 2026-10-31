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
    currentUserInfo = null;
    THROTTLE_INTERVAL_MS = 2000;
    lastSendTimestamp = 0;
    pendingPayload = null;
    throttleTimer = null;
    lastSentPayload = null;
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
    getClientId() {
        return this.clientId;
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
                const rawUser = client.user;
                if (rawUser && rawUser.id) {
                    let avatarUrl = '';
                    if (rawUser.avatar) {
                        const isAnimated = rawUser.avatar.startsWith('a_');
                        avatarUrl = `https://cdn.discordapp.com/avatars/${rawUser.id}/${rawUser.avatar}.${isAnimated ? 'gif' : 'png'}?size=160`;
                    }
                    else {
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
                }
                else {
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
            user: this.discordUser || undefined,
            userInfo: this.currentUserInfo || undefined
        });
    }
    handleDisconnect(error) {
        this.isConnected = false;
        this.isConnecting = false;
        this.discordUser = null;
        this.currentUserInfo = null;
        this.lastSentPayload = null;
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
    arePayloadsEqual(a, b) {
        if (!a && !b)
            return true;
        if (!a || !b)
            return false;
        if (a.name !== b.name)
            return false;
        if (a.type !== b.type)
            return false;
        if (a.details !== b.details)
            return false;
        if (a.state !== b.state)
            return false;
        if (a.startTimestamp !== b.startTimestamp)
            return false;
        if (a.endTimestamp !== b.endTimestamp)
            return false;
        if (a.largeImageKey !== b.largeImageKey)
            return false;
        if (a.largeImageText !== b.largeImageText)
            return false;
        if (a.smallImageKey !== b.smallImageKey)
            return false;
        if (a.smallImageText !== b.smallImageText)
            return false;
        if (a.instance !== b.instance)
            return false;
        const aButtons = a.buttons;
        const bButtons = b.buttons;
        const aLen = aButtons?.length || 0;
        const bLen = bButtons?.length || 0;
        if (aLen !== bLen)
            return false;
        if (aButtons && bButtons) {
            for (let i = 0; i < aLen; i++) {
                if (aButtons[i].label !== bButtons[i].label || aButtons[i].url !== bButtons[i].url) {
                    return false;
                }
            }
        }
        return true;
    }
    updateActivity(payload) {
        if (this.arePayloadsEqual(this.lastSentPayload, payload)) {
            // Deduplicate: same activity is already live on Discord
            this.pendingPayload = null;
            return;
        }
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
            this.lastSendTimestamp = 0;
            await this.executeSend(toSend, true);
        }
    }
    async executeSend(payload, force = false) {
        if (!this.client || !this.isConnected)
            return;
        if (!force && this.arePayloadsEqual(this.lastSentPayload, payload)) {
            this.pendingPayload = null;
            return;
        }
        try {
            this.log(`Sending Activity to Discord -> Type: ${payload.type ?? 0} | Details: "${payload.details || ''}" | State: "${payload.state || ''}"`);
            const activity = {
                state: payload.state,
                details: payload.details,
                instance: Boolean(payload.instance)
            };
            if (payload.type !== undefined) {
                activity.type = payload.type;
            }
            if (payload.startTimestamp || payload.endTimestamp) {
                activity.timestamps = {
                    start: payload.startTimestamp,
                    end: payload.endTimestamp
                };
            }
            if (payload.largeImageKey || payload.smallImageKey) {
                activity.assets = {
                    large_image: payload.largeImageKey,
                    large_text: payload.largeImageText,
                    small_image: payload.smallImageKey,
                    small_text: payload.smallImageText
                };
            }
            const buttons = payload.buttons;
            if (buttons && buttons.length > 0) {
                activity.buttons = buttons;
            }
            await this.client.request('SET_ACTIVITY', {
                pid: process.pid,
                activity
            });
            this.lastSendTimestamp = Date.now();
            this.lastSentPayload = { ...payload };
            this.pendingPayload = null;
        }
        catch (err) {
            this.log(`Failed to set activity: ${String(err)}`);
            this.handleDisconnect(err);
        }
    }
    async clearActivity() {
        this.pendingPayload = null;
        this.lastSentPayload = null;
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
        this.lastSentPayload = null;
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
            user: this.discordUser,
            userInfo: this.currentUserInfo
        };
    }
    getCurrentUserInfo() {
        return this.currentUserInfo;
    }
    isCurrentlyConnected() {
        return this.isConnected;
    }
    dispose() {
        this.disconnectAndClean();
        this.events.removeAllListeners();
        DiscordRpcManager.instance = null;
    }
}
exports.DiscordRpcManager = DiscordRpcManager;
//# sourceMappingURL=DiscordRpcManager.js.map