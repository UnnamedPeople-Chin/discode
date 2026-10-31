import * as vscode from 'vscode';
import { ActivityDetector } from './activity/ActivityDetector';
import { ConfigurationHandler } from './config/ConfigurationHandler';
import { DiscordRpcManager } from './rpc/DiscordRpcManager';
import { SettingsWebviewPanel } from './ui/SettingsWebviewPanel';

const DEFAULT_CLIENT_ID = '1565769356619554887';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
    const outputChannel = vscode.window.createOutputChannel('Discord Presence');
    context.subscriptions.push(outputChannel);
    outputChannel.appendLine('[Extension] Initializing Discord Rich Presence extension...');

    const configHandler = new ConfigurationHandler();
    const clientId = configHandler.effectiveClientId;
    const rpcManager = DiscordRpcManager.getInstance(clientId);
    rpcManager.setOutputChannel(outputChannel);

    const activityDetector = new ActivityDetector(rpcManager, configHandler);

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
    context.subscriptions.push(
        rpcManager.onConnectionChange(state => {
            if (state.isConnected) {
                statusBarItem.text = '$(pulse) Discord: Connected';
                statusBarItem.tooltip = `Terhubung ke Discord sebagai: ${state.user || 'User'} (Klik untuk buka Settings / Ctrl+Alt+D)`;
                activityDetector.evaluateState(true);
            } else if (state.isConnecting) {
                statusBarItem.text = '$(sync~spin) Discord: Connecting...';
                statusBarItem.tooltip = 'Sedang menyambungkan ke socket Discord...';
            } else {
                statusBarItem.text = '$(circle-slash) Discord: Reconnecting...';
                statusBarItem.tooltip = 'Koneksi Discord terputus. Mencoba reconnect otomatis...';
            }
        })
    );

    // Registrasi Command: Buka Settings UI Webview
    context.subscriptions.push(
        vscode.commands.registerCommand('discordPresence.openSettings', () => {
            SettingsWebviewPanel.render(context.extensionUri, configHandler, activityDetector, rpcManager);
        })
    );

    // Registrasi Command: Reset Timer Cepat
    context.subscriptions.push(
        vscode.commands.registerCommand('discordPresence.resetTimer', () => {
            activityDetector.resetTimer();
            vscode.window.showInformationMessage('Discord Presence: Timer koding berhasil di-reset ke 00:00!');
        })
    );

    // Hot-reload setting jika ada konfigurasi yang diubah
    context.subscriptions.push(
        configHandler.onDidChangeSettings(() => {
            const updatedId = configHandler.effectiveClientId;
            if (rpcManager.getClientId() !== updatedId) {
                rpcManager.updateClientId(updatedId);
            }
            activityDetector.forceSync();
        })
    );

    // Start background IPC connection
    rpcManager.connect();
}

export function deactivate(): void {
    // vscode automatically calls .dispose() on context.subscriptions
}
