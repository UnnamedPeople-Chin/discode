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
exports.SettingsWebviewPanel = void 0;
const fs = __importStar(require("fs"));
const vscode = __importStar(require("vscode"));
const settingsModalWebviewHtml_1 = require("./settingsModalWebviewHtml");
class SettingsWebviewPanel {
    extensionUri;
    configHandler;
    activityDetector;
    rpcManager;
    static currentPanel;
    panel;
    disposables = [];
    constructor(panel, extensionUri, configHandler, activityDetector, rpcManager) {
        this.extensionUri = extensionUri;
        this.configHandler = configHandler;
        this.activityDetector = activityDetector;
        this.rpcManager = rpcManager;
        this.panel = panel;
        this.panel.webview.html = this.getHtmlContent();
        this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
        // Subscribing to live events from VS Code & Discord IPC
        this.disposables.push(this.activityDetector.onDidChangeActivity(({ payload, previewData }) => {
            this.sendLivePresenceUpdate(payload, previewData);
        }), this.rpcManager.onConnectionChange(state => {
            this.sendConnectionUpdate(state);
        }));
        this.panel.webview.onDidReceiveMessage(async (message) => {
            switch (message.command) {
                case 'ready':
                    this.sendInitialData();
                    break;
                case 'saveSettings':
                    await this.handleSaveSettings(message.settings);
                    break;
                case 'applyTimer':
                    await this.handleApplyTimer(message.settings);
                    break;
                case 'resetTimer':
                    this.activityDetector.resetTimer();
                    this.panel.webview.postMessage({
                        command: 'actionResult',
                        action: 'reset',
                        ok: true,
                        message: 'Timer di-reset ke 00:00.'
                    });
                    break;
                case 'reloadSettings':
                    this.sendInitialData();
                    break;
                case 'close':
                    this.dispose();
                    break;
                case 'resetDefaults':
                    await this.handleSaveSettings({
                        enabled: true,
                        'appearance.largeImageStyle': 'fileIcon',
                        'appearance.showElapsedTime': true,
                        'timer.mode': 'session',
                        'timer.customOffsetMinutes': 0,
                        'formatting.detailsEditing': 'Editing {fileName}',
                        'formatting.stateEditing': 'Workspace: {workspace}',
                        'behavior.whenNoFileOpen': 'keepLastFile',
                        'behavior.idleAction': 'showIdle',
                        idleTimeoutSeconds: 300,
                        'privacy.showFileName': true,
                        'privacy.showWorkspaceName': true,
                        'privacy.showGitBranch': false,
                        'privacy.showDebugStatus': true
                    });
                    break;
            }
        }, null, this.disposables);
    }
    static render(extensionUri, configHandler, activityDetector, rpcManager) {
        if (SettingsWebviewPanel.currentPanel) {
            SettingsWebviewPanel.currentPanel.panel.reveal(vscode.ViewColumn.One);
            SettingsWebviewPanel.currentPanel.sendInitialData();
            return SettingsWebviewPanel.currentPanel;
        }
        const panel = vscode.window.createWebviewPanel('discordPresenceSettings', 'Discord Presence: Settings & Preview', vscode.ViewColumn.One, {
            enableScripts: true,
            retainContextWhenHidden: true,
            localResourceRoots: [
                vscode.Uri.joinPath(extensionUri, 'assets')
            ]
        });
        SettingsWebviewPanel.currentPanel = new SettingsWebviewPanel(panel, extensionUri, configHandler, activityDetector, rpcManager);
        return SettingsWebviewPanel.currentPanel;
    }
    sendInitialData() {
        this.panel.webview.postMessage({
            command: 'init',
            settings: this.configHandler.getAllSettingsAsObject(),
            discordUser: this.rpcManager.getCurrentUserInfo(),
            connectionState: this.rpcManager.getStatus(),
            currentPresence: this.activityDetector.getCurrentPayload(),
            previewData: this.activityDetector.getCurrentPreviewData()
        });
    }
    sendLivePresenceUpdate(payload, previewData) {
        this.panel.webview.postMessage({
            command: 'liveUpdate',
            discordUser: this.rpcManager.getCurrentUserInfo(),
            presence: payload,
            previewData
        });
    }
    sendConnectionUpdate(state) {
        this.panel.webview.postMessage({
            command: 'connectionUpdate',
            discordUser: this.rpcManager.getCurrentUserInfo(),
            connectionState: state
        });
    }
    async handleSaveSettings(newSettings) {
        try {
            for (const [key, value] of Object.entries(newSettings)) {
                await this.configHandler.updateSetting(key, value);
            }
            this.activityDetector.forceSync();
            this.sendInitialData();
            this.panel.webview.postMessage({
                command: 'actionResult',
                action: 'save',
                ok: true,
                message: 'Pengaturan tersimpan dan presence sudah diperbarui.'
            });
        }
        catch (error) {
            this.panel.webview.postMessage({
                command: 'actionResult',
                action: 'save',
                ok: false,
                message: `Pengaturan gagal disimpan: ${String(error)}`
            });
            vscode.window.showErrorMessage(`Gagal menyimpan pengaturan: ${String(error)}`);
        }
    }
    async handleApplyTimer(timerSettings) {
        try {
            for (const [key, value] of Object.entries(timerSettings)) {
                await this.configHandler.updateSetting(key, value);
            }
            this.activityDetector.forceSync();
            this.panel.webview.postMessage({
                command: 'actionResult',
                action: 'timer',
                ok: true,
                message: 'Timer diperbarui dan presence sudah diperbarui.'
            });
        }
        catch (error) {
            this.panel.webview.postMessage({
                command: 'actionResult',
                action: 'timer',
                ok: false,
                message: `Timer gagal diterapkan: ${String(error)}`
            });
            vscode.window.showErrorMessage(`Gagal menerapkan timer: ${String(error)}`);
        }
    }
    dispose() {
        SettingsWebviewPanel.currentPanel = undefined;
        this.panel.dispose();
        this.disposables.forEach(disposable => disposable.dispose());
        this.disposables = [];
    }
    getHtmlContent() {
        const nonce = this.getNonce();
        let bannerUri = '';
        try {
            const bannerPath = vscode.Uri.joinPath(this.extensionUri, 'assets', 'banner.jpg').fsPath;
            if (fs.existsSync(bannerPath)) {
                const base64 = fs.readFileSync(bannerPath).toString('base64');
                bannerUri = `data:image/jpeg;base64,${base64}`;
            }
        }
        catch {
            bannerUri = this.panel.webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'assets', 'banner.jpg')).toString();
        }
        return (0, settingsModalWebviewHtml_1.getSettingsModalWebviewHtml)(nonce, this.panel.webview.cspSource, bannerUri);
    }
    getNonce() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
exports.SettingsWebviewPanel = SettingsWebviewPanel;
//# sourceMappingURL=SettingsWebviewPanel.js.map