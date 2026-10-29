"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const ActivityDetector_1 = require("./activity/ActivityDetector");
const ConfigurationHandler_1 = require("./config/ConfigurationHandler");
const DiscordRpcManager_1 = require("./rpc/DiscordRpcManager");
const SettingsWebviewPanel_1 = require("./ui/SettingsWebviewPanel");
const DEFAULT_CLIENT_ID = '383226320970055681';
async function activate(context) {
    const outputChannel = vscode.window.createOutputChannel('Discord Presence');
    context.subscriptions.push(outputChannel);
    outputChannel.appendLine('[Extension] Initializing Discord Rich Presence extension...');
    const configHandler = new ConfigurationHandler_1.ConfigurationHandler();
    const clientId = configHandler.customClientId || DEFAULT_CLIENT_ID;
    const rpcManager = DiscordRpcManager_1.DiscordRpcManager.getInstance(clientId);
    rpcManager.setOutputChannel(outputChannel);
    const activityDetector = new ActivityDetector_1.ActivityDetector(rpcManager, configHandler);
    context.subscriptions.push(configHandler);
    context.subscriptions.push(rpcManager);
    context.subscriptions.push(activityDetector);
    // Status Bar Item dengan status koneksi dinamis
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'discordPresence.openSettings';
    statusBarItem.text = '$(sync~spin) Discord: Connecting...';
    statusBarItem.tooltip = 'Menghubungkan ke Discord... (Klik untuk buka Settings)';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);
    // Listener perubahan status koneksi
    context.subscriptions.push(rpcManager.onConnectionChange(state => {
        if (state.isConnected) {
            statusBarItem.text = '$(pulse) Discord: Connected';
            statusBarItem.tooltip = `Terhubung ke Discord sebagai: ${state.user || 'User'} (Klik untuk buka Settings / Ctrl+Alt+D)`;
        }
        else if (state.isConnecting) {
            statusBarItem.text = '$(sync~spin) Discord: Connecting...';
            statusBarItem.tooltip = 'Sedang menyambungkan ke socket Discord...';
        }
        else {
            statusBarItem.text = '$(circle-slash) Discord: Reconnecting...';
            statusBarItem.tooltip = 'Koneksi Discord terputus. Mencoba reconnect otomatis...';
        }
    }));
    // Registrasi Command: Buka Settings UI Webview
    context.subscriptions.push(vscode.commands.registerCommand('discordPresence.openSettings', () => {
        SettingsWebviewPanel_1.SettingsWebviewPanel.render(context.extensionUri, configHandler, activityDetector);
    }));
    // Registrasi Command: Reset Timer Cepat
    context.subscriptions.push(vscode.commands.registerCommand('discordPresence.resetTimer', () => {
        activityDetector.resetTimer();
        vscode.window.showInformationMessage('Discord Presence: Timer koding berhasil di-reset ke 00:00!');
    }));
    // Hot-reload setting jika ada konfigurasi yang diubah
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('discordPresence.clientId')) {
            const updatedId = configHandler.customClientId || DEFAULT_CLIENT_ID;
            rpcManager.updateClientId(updatedId);
        }
        if (e.affectsConfiguration('discordPresence')) {
            activityDetector.evaluateState();
        }
    }));
    // Start background IPC connection
    rpcManager.connect();
}
function deactivate() {
    // vscode automatically calls .dispose() on context.subscriptions
}
//# sourceMappingURL=extension.js.map