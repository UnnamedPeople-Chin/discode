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
exports.ConfigurationHandler = void 0;
exports.resolveEffectiveClientId = resolveEffectiveClientId;
const vscode = __importStar(require("vscode"));
function resolveEffectiveClientId(customClientId, appName) {
    if (customClientId && customClientId.trim().length > 0) {
        return customClientId.trim();
    }
    const normalized = (appName || '').trim().toLowerCase();
    if (normalized.includes('visual studio code') || normalized.includes('vscode')) {
        return '383226320970055681';
    }
    if (normalized.includes('vscodium')) {
        return '790693994793664533';
    }
    if (normalized.includes('code - oss') || normalized.includes('oss')) {
        return '782685898163617802';
    }
    return '1565769356619554887'; // Default: DisCode
}
class ConfigurationHandler {
    section = 'discordPresence';
    disposables = [];
    _privacySettings;
    _appearanceSettings;
    _timerSettings;
    _behaviorSettings;
    _formattingSettings;
    _idleTimeoutSeconds;
    _clientId;
    _enabled;
    onDidChangeSettingsEmitter = new vscode.EventEmitter();
    onDidChangeSettings = this.onDidChangeSettingsEmitter.event;
    constructor() {
        this.loadSettings();
        this.disposables.push(vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration(this.section)) {
                this.loadSettings();
                this.onDidChangeSettingsEmitter.fire();
            }
        }));
    }
    loadSettings() {
        const config = vscode.workspace.getConfiguration(this.section);
        this._enabled = config.get('enabled', true);
        this._privacySettings = {
            showFileName: config.get('privacy.showFileName', true),
            showWorkspaceName: config.get('privacy.showWorkspaceName', true),
            showGitBranch: config.get('privacy.showGitBranch', false),
            showDebugStatus: config.get('privacy.showDebugStatus', true),
            blacklistedWorkspaces: config.get('privacy.blacklistedWorkspaces', [])
        };
        this._appearanceSettings = {
            largeImageStyle: config.get('appearance.largeImageStyle', 'fileIcon'),
            showElapsedTime: config.get('appearance.showElapsedTime', true),
            activityType: config.get('appearance.activityType', 'playing'),
            appLogo: config.get('appearance.appLogo', 'auto')
        };
        this._timerSettings = {
            mode: config.get('timer.mode', 'session'),
            customOffsetMinutes: Math.max(0, config.get('timer.customOffsetMinutes', 0))
        };
        this._behaviorSettings = {
            whenNoFileOpen: config.get('behavior.whenNoFileOpen', 'keepLastFile'),
            idleAction: config.get('behavior.idleAction', 'showIdle')
        };
        this._formattingSettings = {
            appName: config.get('formatting.appName', 'DisCode'),
            detailsEditing: config.get('formatting.detailsEditing', 'Editing {fileName}'),
            stateEditing: config.get('formatting.stateEditing', 'Workspace: {workspace}'),
            detailsIdle: config.get('formatting.detailsIdle', 'Idling'),
            stateIdle: config.get('formatting.stateIdle', 'Workspace: {workspace}'),
            detailsDebugging: config.get('formatting.detailsDebugging', 'Debugging ({debugType})'),
            stateDebugging: config.get('formatting.stateDebugging', '{debugSession}'),
            detailsNoFile: config.get('formatting.detailsNoFile', 'In Workspace'),
            stateNoFile: config.get('formatting.stateNoFile', '{workspace}')
        };
        this._idleTimeoutSeconds = Math.max(30, config.get('idleTimeoutSeconds', 300));
        this._clientId = config.get('clientId', '').trim();
    }
    get privacy() {
        return this._privacySettings;
    }
    get appearance() {
        return this._appearanceSettings;
    }
    get timer() {
        return this._timerSettings;
    }
    get behavior() {
        return this._behaviorSettings;
    }
    get formatting() {
        return this._formattingSettings;
    }
    get idleTimeoutSeconds() {
        return this._idleTimeoutSeconds;
    }
    get customClientId() {
        return this._clientId;
    }
    get effectiveClientId() {
        return resolveEffectiveClientId(this._clientId, this._formattingSettings.appName);
    }
    get enabled() {
        return this._enabled;
    }
    isWorkspaceAllowed(workspaceName) {
        if (!workspaceName)
            return true;
        return !this._privacySettings.blacklistedWorkspaces.includes(workspaceName);
    }
    applyInMemory(settings) {
        if (settings.enabled !== undefined) {
            this._enabled = Boolean(settings.enabled);
        }
        if (settings.idleTimeoutSeconds !== undefined) {
            this._idleTimeoutSeconds = Math.max(30, Number(settings.idleTimeoutSeconds) || 300);
        }
        if (typeof settings.clientId === 'string') {
            this._clientId = settings.clientId.trim();
        }
        // Appearance
        if (settings['appearance.largeImageStyle'] !== undefined) {
            this._appearanceSettings.largeImageStyle = settings['appearance.largeImageStyle'];
        }
        if (settings['appearance.showElapsedTime'] !== undefined) {
            this._appearanceSettings.showElapsedTime = Boolean(settings['appearance.showElapsedTime']);
        }
        if (settings['appearance.activityType'] !== undefined) {
            this._appearanceSettings.activityType = settings['appearance.activityType'];
        }
        if (settings['appearance.appLogo'] !== undefined) {
            this._appearanceSettings.appLogo = String(settings['appearance.appLogo']);
        }
        // Timer
        if (settings['timer.mode'] !== undefined) {
            this._timerSettings.mode = settings['timer.mode'];
        }
        if (settings['timer.customOffsetMinutes'] !== undefined) {
            this._timerSettings.customOffsetMinutes = Math.max(0, Number(settings['timer.customOffsetMinutes']) || 0);
        }
        // Behavior
        if (settings['behavior.whenNoFileOpen'] !== undefined) {
            this._behaviorSettings.whenNoFileOpen = settings['behavior.whenNoFileOpen'];
        }
        if (settings['behavior.idleAction'] !== undefined) {
            this._behaviorSettings.idleAction = settings['behavior.idleAction'];
        }
        // Formatting
        if (settings['formatting.appName'] !== undefined) {
            this._formattingSettings.appName = String(settings['formatting.appName']);
        }
        if (settings['formatting.detailsEditing'] !== undefined) {
            this._formattingSettings.detailsEditing = String(settings['formatting.detailsEditing']);
        }
        if (settings['formatting.stateEditing'] !== undefined) {
            this._formattingSettings.stateEditing = String(settings['formatting.stateEditing']);
        }
        if (settings['formatting.detailsIdle'] !== undefined) {
            this._formattingSettings.detailsIdle = String(settings['formatting.detailsIdle']);
        }
        if (settings['formatting.stateIdle'] !== undefined) {
            this._formattingSettings.stateIdle = String(settings['formatting.stateIdle']);
        }
        if (settings['formatting.detailsDebugging'] !== undefined) {
            this._formattingSettings.detailsDebugging = String(settings['formatting.detailsDebugging']);
        }
        if (settings['formatting.stateDebugging'] !== undefined) {
            this._formattingSettings.stateDebugging = String(settings['formatting.stateDebugging']);
        }
        if (settings['formatting.detailsNoFile'] !== undefined) {
            this._formattingSettings.detailsNoFile = String(settings['formatting.detailsNoFile']);
        }
        if (settings['formatting.stateNoFile'] !== undefined) {
            this._formattingSettings.stateNoFile = String(settings['formatting.stateNoFile']);
        }
        // Privacy
        if (settings['privacy.showFileName'] !== undefined) {
            this._privacySettings.showFileName = Boolean(settings['privacy.showFileName']);
        }
        if (settings['privacy.showWorkspaceName'] !== undefined) {
            this._privacySettings.showWorkspaceName = Boolean(settings['privacy.showWorkspaceName']);
        }
        if (settings['privacy.showGitBranch'] !== undefined) {
            this._privacySettings.showGitBranch = Boolean(settings['privacy.showGitBranch']);
        }
        if (settings['privacy.showDebugStatus'] !== undefined) {
            this._privacySettings.showDebugStatus = Boolean(settings['privacy.showDebugStatus']);
        }
        this.onDidChangeSettingsEmitter.fire();
    }
    async persistSettings(settings, target = vscode.ConfigurationTarget.Global) {
        const config = vscode.workspace.getConfiguration(this.section);
        for (const [key, value] of Object.entries(settings)) {
            const current = config.get(key);
            if (current !== value) {
                await config.update(key, value, target);
            }
        }
    }
    async updateSetting(key, value, target = vscode.ConfigurationTarget.Global) {
        this.applyInMemory({ [key]: value });
        const config = vscode.workspace.getConfiguration(this.section);
        if (config.get(key) !== value) {
            await config.update(key, value, target);
        }
    }
    getAllSettingsAsObject() {
        return {
            enabled: this._enabled,
            'appearance.largeImageStyle': this._appearanceSettings.largeImageStyle,
            'appearance.showElapsedTime': this._appearanceSettings.showElapsedTime,
            'appearance.activityType': this._appearanceSettings.activityType,
            'appearance.appLogo': this._appearanceSettings.appLogo,
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
    dispose() {
        this.disposables.forEach(d => d.dispose());
        this.disposables = [];
    }
}
exports.ConfigurationHandler = ConfigurationHandler;
//# sourceMappingURL=ConfigurationHandler.js.map