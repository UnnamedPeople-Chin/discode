import * as vscode from 'vscode';
import { ActivityDetector } from '../activity/ActivityDetector';
import { ConfigurationHandler } from '../config/ConfigurationHandler';
import { getSettingsModalWebviewHtml } from './settingsModalWebviewHtml';

export class SettingsWebviewPanel {
    public static currentPanel: SettingsWebviewPanel | undefined;
    private readonly panel: vscode.WebviewPanel;
    private disposables: vscode.Disposable[] = [];

    private constructor(
        panel: vscode.WebviewPanel,
        private readonly configHandler: ConfigurationHandler,
        private readonly activityDetector: ActivityDetector
    ) {
        this.panel = panel;
        this.panel.webview.html = this.getHtmlContent();

        this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
        this.panel.webview.onDidReceiveMessage(
            async message => {
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
            },
            null,
            this.disposables
        );
    }

    public static render(
        extensionUri: vscode.Uri,
        configHandler: ConfigurationHandler,
        activityDetector: ActivityDetector
    ): SettingsWebviewPanel {
        if (SettingsWebviewPanel.currentPanel) {
            SettingsWebviewPanel.currentPanel.panel.reveal(vscode.ViewColumn.One);
            SettingsWebviewPanel.currentPanel.sendInitialData();
            return SettingsWebviewPanel.currentPanel;
        }

        const panel = vscode.window.createWebviewPanel(
            'discordPresenceSettings',
            'Discord Presence: Settings & Preview',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true
            }
        );

        SettingsWebviewPanel.currentPanel = new SettingsWebviewPanel(panel, configHandler, activityDetector);
        return SettingsWebviewPanel.currentPanel;
    }

    private sendInitialData(): void {
        this.panel.webview.postMessage({
            command: 'init',
            settings: this.configHandler.getAllSettingsAsObject(),
            previewData: this.activityDetector.getCurrentPreviewData()
        });
    }

    private async handleSaveSettings(newSettings: Record<string, unknown>): Promise<void> {
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
        } catch (error) {
            this.panel.webview.postMessage({
                command: 'actionResult',
                action: 'save',
                ok: false,
                message: `Pengaturan gagal disimpan: ${String(error)}`
            });
            vscode.window.showErrorMessage(`Gagal menyimpan pengaturan: ${String(error)}`);
        }
    }

    private async handleApplyTimer(timerSettings: Record<string, unknown>): Promise<void> {
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
        } catch (error) {
            this.panel.webview.postMessage({
                command: 'actionResult',
                action: 'timer',
                ok: false,
                message: `Timer gagal diterapkan: ${String(error)}`
            });
            vscode.window.showErrorMessage(`Gagal menerapkan timer: ${String(error)}`);
        }
    }

    public dispose(): void {
        SettingsWebviewPanel.currentPanel = undefined;
        this.panel.dispose();
        this.disposables.forEach(disposable => disposable.dispose());
        this.disposables = [];
    }

    private getHtmlContent(): string {
        return getSettingsModalWebviewHtml();
    }
}
