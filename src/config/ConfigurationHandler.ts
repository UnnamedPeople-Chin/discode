import * as vscode from 'vscode';

export interface PresencePrivacySettings {
    showFileName: boolean;
    showWorkspaceName: boolean;
    showGitBranch: boolean;
    showDebugStatus: boolean;
    blacklistedWorkspaces: string[];
}

export interface PresenceAppearanceSettings {
    largeImageStyle: 'fileIcon' | 'editorIcon';
    showElapsedTime: boolean;
    activityType: 'playing' | 'watching' | 'listening' | 'competing';
}

export interface PresenceTimerSettings {
    mode: 'session' | 'file' | 'manual';
    customOffsetMinutes: number;
}

export interface PresenceBehaviorSettings {
    whenNoFileOpen: 'keepLastFile' | 'showWorkspace' | 'idle' | 'clear';
    idleAction: 'showIdle' | 'keepFile' | 'clear';
}

export interface PresenceFormattingSettings {
    appName: string;
    detailsEditing: string;
    stateEditing: string;
    detailsIdle: string;
    stateIdle: string;
    detailsDebugging: string;
    stateDebugging: string;
    detailsNoFile: string;
    stateNoFile: string;
}

export class ConfigurationHandler implements vscode.Disposable {
    private readonly section = 'discordPresence';
    private disposables: vscode.Disposable[] = [];
    private _privacySettings!: PresencePrivacySettings;
    private _appearanceSettings!: PresenceAppearanceSettings;
    private _timerSettings!: PresenceTimerSettings;
    private _behaviorSettings!: PresenceBehaviorSettings;
    private _formattingSettings!: PresenceFormattingSettings;
    private _idleTimeoutSeconds!: number;
    private _clientId!: string;
    private _enabled!: boolean;

    constructor() {
        this.loadSettings();
        this.disposables.push(
            vscode.workspace.onDidChangeConfiguration(e => {
                if (e.affectsConfiguration(this.section)) {
                    this.loadSettings();
                }
            })
        );
    }

    private loadSettings(): void {
        const config = vscode.workspace.getConfiguration(this.section);
        this._enabled = config.get<boolean>('enabled', true);

        this._privacySettings = {
            showFileName: config.get<boolean>('privacy.showFileName', true),
            showWorkspaceName: config.get<boolean>('privacy.showWorkspaceName', true),
            showGitBranch: config.get<boolean>('privacy.showGitBranch', false),
            showDebugStatus: config.get<boolean>('privacy.showDebugStatus', true),
            blacklistedWorkspaces: config.get<string[]>('privacy.blacklistedWorkspaces', [])
        };

        this._appearanceSettings = {
            largeImageStyle: config.get<'fileIcon' | 'editorIcon'>('appearance.largeImageStyle', 'fileIcon'),
            showElapsedTime: config.get<boolean>('appearance.showElapsedTime', true),
            activityType: config.get<'playing' | 'watching' | 'listening' | 'competing'>('appearance.activityType', 'playing')
        };

        this._timerSettings = {
            mode: config.get<'session' | 'file' | 'manual'>('timer.mode', 'session'),
            customOffsetMinutes: Math.max(0, config.get<number>('timer.customOffsetMinutes', 0))
        };

        this._behaviorSettings = {
            whenNoFileOpen: config.get<'keepLastFile' | 'showWorkspace' | 'idle' | 'clear'>('behavior.whenNoFileOpen', 'keepLastFile'),
            idleAction: config.get<'showIdle' | 'keepFile' | 'clear'>('behavior.idleAction', 'showIdle')
        };

        this._formattingSettings = {
            appName: config.get<string>('formatting.appName', 'DisCode'),
            detailsEditing: config.get<string>('formatting.detailsEditing', 'Editing {fileName}'),
            stateEditing: config.get<string>('formatting.stateEditing', 'Workspace: {workspace}'),
            detailsIdle: config.get<string>('formatting.detailsIdle', 'Idling'),
            stateIdle: config.get<string>('formatting.stateIdle', 'Workspace: {workspace}'),
            detailsDebugging: config.get<string>('formatting.detailsDebugging', 'Debugging ({debugType})'),
            stateDebugging: config.get<string>('formatting.stateDebugging', '{debugSession}'),
            detailsNoFile: config.get<string>('formatting.detailsNoFile', 'In Workspace'),
            stateNoFile: config.get<string>('formatting.stateNoFile', '{workspace}')
        };

        this._idleTimeoutSeconds = Math.max(30, config.get<number>('idleTimeoutSeconds', 300));
        this._clientId = config.get<string>('clientId', '').trim();
    }

    public get privacy(): PresencePrivacySettings {
        return this._privacySettings;
    }

    public get appearance(): PresenceAppearanceSettings {
        return this._appearanceSettings;
    }

    public get timer(): PresenceTimerSettings {
        return this._timerSettings;
    }

    public get behavior(): PresenceBehaviorSettings {
        return this._behaviorSettings;
    }

    public get formatting(): PresenceFormattingSettings {
        return this._formattingSettings;
    }

    public get idleTimeoutSeconds(): number {
        return this._idleTimeoutSeconds;
    }

    public get customClientId(): string {
        return this._clientId;
    }

    public get enabled(): boolean {
        return this._enabled;
    }

    public isWorkspaceAllowed(workspaceName?: string): boolean {
        if (!workspaceName) return true;
        return !this._privacySettings.blacklistedWorkspaces.includes(workspaceName);
    }

    public async updateSetting(key: string, value: unknown, target = vscode.ConfigurationTarget.Global): Promise<void> {
        const config = vscode.workspace.getConfiguration(this.section);
        await config.update(key, value, target);
        this.loadSettings();
    }

    public getAllSettingsAsObject(): Record<string, unknown> {
        return {
            enabled: this._enabled,
            'appearance.largeImageStyle': this._appearanceSettings.largeImageStyle,
            'appearance.showElapsedTime': this._appearanceSettings.showElapsedTime,
            'appearance.activityType': this._appearanceSettings.activityType,
            'timer.mode': this._timerSettings.mode,
            'timer.customOffsetMinutes': this._timerSettings.customOffsetMinutes,
            'behavior.whenNoFileOpen': this._behaviorSettings.whenNoFileOpen,
            'behavior.idleAction': this._behaviorSettings.idleAction,
            'idleTimeoutSeconds': this._idleTimeoutSeconds,
            'formatting.appName': this._formattingSettings.appName,
            'formatting.detailsEditing': this._formattingSettings.detailsEditing,
            'formatting.stateEditing': this._formattingSettings.stateEditing,
            'formatting.detailsIdle': this._formattingSettings.detailsIdle,
            'formatting.stateIdle': this._formattingSettings.stateIdle,
            'privacy.showFileName': this._privacySettings.showFileName,
            'privacy.showWorkspaceName': this._privacySettings.showWorkspaceName,
            'privacy.showGitBranch': this._privacySettings.showGitBranch,
            'privacy.showDebugStatus': this._privacySettings.showDebugStatus
        };
    }

    public dispose(): void {
        this.disposables.forEach(d => d.dispose());
        this.disposables = [];
    }
}
