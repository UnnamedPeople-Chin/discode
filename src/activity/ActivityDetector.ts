import * as path from 'path';
import * as vscode from 'vscode';
import { ConfigurationHandler } from '../config/ConfigurationHandler';
import { ActivityPayload, DiscordRpcManager } from '../rpc/DiscordRpcManager';

interface FileIconInfo {
    iconKey: string;
    label: string;
}

export class ActivityDetector implements vscode.Disposable {
    private disposables: vscode.Disposable[] = [];
    private idleTimer: NodeJS.Timeout | null = null;
    private isIdle = false;

    private readonly sessionStartTimestamp: number;
    private fileStartTimestamp: number;
    private manualStartTimestamp: number;
    private lastFileName = '';
    private lastActiveFilePayload: ActivityPayload | null = null;
    private currentPayload: ActivityPayload | null = null;

    private readonly onActivityChangeEmitter = new vscode.EventEmitter<{
        payload: ActivityPayload | null;
        previewData: {
            fileName: string;
            language: string;
            workspace: string;
            gitBranch: string;
            lineCount: string;
            currentLine: string;
            startTimestamp?: number;
        };
    }>();
    public readonly onDidChangeActivity = this.onActivityChangeEmitter.event;

    constructor(
        private readonly rpcManager: DiscordRpcManager,
        private readonly configHandler: ConfigurationHandler
    ) {
        const nowSec = Math.floor(Date.now() / 1000);
        this.sessionStartTimestamp = nowSec;
        this.fileStartTimestamp = nowSec;
        this.manualStartTimestamp = nowSec;

        this.registerListeners();
        this.resetIdleTimer();
        this.evaluateState();
    }

    private registerListeners(): void {
        this.disposables.push(
            vscode.window.onDidChangeActiveTextEditor(() => this.onUserActivity(true)),
            vscode.window.onDidChangeTextEditorSelection(() => this.onUserActivity(false)),
            vscode.workspace.onDidChangeTextDocument(e => {
                if (e.contentChanges.length > 0) {
                    this.onUserActivity(false);
                }
            }),
            vscode.window.onDidChangeWindowState(state => {
                if (state.focused) {
                    this.onUserActivity(false);
                } else {
                    this.evaluateState();
                }
            }),
            vscode.debug.onDidStartDebugSession(() => this.evaluateState()),
            vscode.debug.onDidTerminateDebugSession(() => this.evaluateState()),
            vscode.workspace.onDidChangeWorkspaceFolders(() => this.evaluateState())
        );
    }

    private onUserActivity(isFileSwitch: boolean): void {
        if (this.isIdle) {
            this.isIdle = false;
        }

        if (isFileSwitch) {
            const currentDoc = vscode.window.activeTextEditor?.document;
            const currentFileName = currentDoc ? path.basename(currentDoc.fileName) : '';
            if (currentFileName && currentFileName !== this.lastFileName) {
                this.fileStartTimestamp = Math.floor(Date.now() / 1000);
                this.lastFileName = currentFileName;
            }
        }

        this.resetIdleTimer();
        this.evaluateState();
    }

    private resetIdleTimer(): void {
        if (this.idleTimer) {
            clearTimeout(this.idleTimer);
        }
        const timeoutMs = this.configHandler.idleTimeoutSeconds * 1000;
        this.idleTimer = setTimeout(() => {
            this.isIdle = true;
            this.evaluateState();
        }, timeoutMs);
    }

    public resetTimer(): void {
        const nowSec = Math.floor(Date.now() / 1000);
        this.manualStartTimestamp = nowSec;
        this.fileStartTimestamp = nowSec;
        this.evaluateState(true);
    }

    public forceSync(): void {
        this.evaluateState(true);
    }

    private resolveStartTimestamp(): number | undefined {
        if (!this.configHandler.appearance.showElapsedTime) {
            return undefined;
        }
        const offsetSec = (this.configHandler.timer.customOffsetMinutes || 0) * 60;
        const mode = this.configHandler.timer.mode;
        let base = this.sessionStartTimestamp;
        if (mode === 'file') {
            base = this.fileStartTimestamp;
        } else if (mode === 'manual') {
            base = this.manualStartTimestamp;
        }
        return base - offsetSec;
    }

    public evaluateState(forceSync = false): void {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        const workspaceName = workspaceFolder ? workspaceFolder.name : '';

        const clear = () => {
            this.currentPayload = null;
            this.rpcManager.clearActivity();
            this.onActivityChangeEmitter.fire({
                payload: null,
                previewData: this.getCurrentPreviewData()
            });
        };

        if (!this.configHandler.enabled) {
            clear();
            return;
        }

        if (!this.configHandler.isWorkspaceAllowed(workspaceName)) {
            clear();
            return;
        }

        const editorInfo = this.getEditorAppInfo();
        const startTimestamp = this.resolveStartTimestamp();

        const dispatch = (payload: ActivityPayload) => {
            this.currentPayload = payload;
            if (forceSync) {
                this.rpcManager.forceSendActivity(payload);
            } else {
                this.rpcManager.updateActivity(payload);
            }
            this.onActivityChangeEmitter.fire({
                payload,
                previewData: this.getCurrentPreviewData()
            });
        };

        // 1. Skenario Idle
        if (this.isIdle) {
            const idleAction = this.configHandler.behavior.idleAction;
            if (idleAction === 'clear') {
                clear();
                return;
            }
            if (idleAction === 'showIdle') {
                const templateVars = this.buildTemplateVars(workspaceName);
                const details = this.formatTemplate(this.configHandler.formatting.detailsIdle, templateVars);
                const state = this.formatTemplate(this.configHandler.formatting.stateIdle, templateVars);

                dispatch({
                    details: details || undefined,
                    state: state || undefined,
                    startTimestamp,
                    largeImageKey: editorInfo.icon,
                    largeImageText: editorInfo.label,
                    smallImageKey: 'idle',
                    smallImageText: 'Idle',
                    instance: false
                });
                return;
            }
        }

        // 2. Skenario Debugging
        const debugSession = vscode.debug.activeDebugSession;
        if (debugSession && this.configHandler.privacy.showDebugStatus) {
            const templateVars = this.buildTemplateVars(workspaceName, {
                debugType: debugSession.type,
                debugSession: debugSession.name
            });
            const details = this.formatTemplate(this.configHandler.formatting.detailsDebugging, templateVars);
            const state = this.formatTemplate(this.configHandler.formatting.stateDebugging, templateVars);

            dispatch({
                details: details || undefined,
                state: state || undefined,
                startTimestamp,
                largeImageKey: editorInfo.icon,
                largeImageText: editorInfo.label,
                smallImageKey: 'debug',
                smallImageText: `Debugging: ${debugSession.name}`,
                instance: false
            });
            return;
        }

        // 3. Skenario File Aktif Terbuka
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor && activeEditor.document) {
            const doc = activeEditor.document;
            const fullFileName = path.basename(doc.fileName);
            const ext = path.extname(fullFileName).replace('.', '');
            const lineCount = String(doc.lineCount);
            const currentLine = String(activeEditor.selection.active.line + 1);
            const fileInfo = this.resolveFileIcon(doc.languageId, ext, fullFileName);

            const templateVars = this.buildTemplateVars(workspaceName, {
                fileName: fullFileName,
                fileExt: ext,
                language: fileInfo.label,
                lineCount,
                currentLine
            });

            const details = this.formatTemplate(this.configHandler.formatting.detailsEditing, templateVars);
            const state = this.formatTemplate(this.configHandler.formatting.stateEditing, templateVars);

            const isFileIconLarge = this.configHandler.appearance.largeImageStyle === 'fileIcon';
            const largeKey = isFileIconLarge ? fileInfo.iconKey : editorInfo.icon;
            const largeText = isFileIconLarge ? fileInfo.label : editorInfo.label;
            const smallKey = isFileIconLarge ? editorInfo.icon : fileInfo.iconKey;
            const smallText = isFileIconLarge ? editorInfo.label : fileInfo.label;

            const payload: ActivityPayload = {
                details: details || undefined,
                state: state || undefined,
                startTimestamp,
                largeImageKey: largeKey,
                largeImageText: largeText,
                smallImageKey: smallKey,
                smallImageText: smallText,
                instance: false
            };

            this.lastActiveFilePayload = payload;
            dispatch(payload);
            return;
        }

        // 4. Skenario Tidak Ada File Terbuka
        const whenNoFileOpen = this.configHandler.behavior.whenNoFileOpen;

        if (whenNoFileOpen === 'keepLastFile' && this.lastActiveFilePayload) {
            dispatch(this.lastActiveFilePayload);
            return;
        }

        if (whenNoFileOpen === 'clear') {
            clear();
            return;
        }

        if (whenNoFileOpen === 'idle') {
            const templateVars = this.buildTemplateVars(workspaceName);
            const details = this.formatTemplate(this.configHandler.formatting.detailsIdle, templateVars);
            const state = this.formatTemplate(this.configHandler.formatting.stateIdle, templateVars);

            dispatch({
                details: details || undefined,
                state: state || undefined,
                startTimestamp,
                largeImageKey: editorInfo.icon,
                largeImageText: editorInfo.label,
                smallImageKey: 'idle',
                smallImageText: 'Idle',
                instance: false
            });
            return;
        }

        const templateVars = this.buildTemplateVars(workspaceName);
        const details = this.formatTemplate(this.configHandler.formatting.detailsNoFile, templateVars);
        const state = this.formatTemplate(this.configHandler.formatting.stateNoFile, templateVars);

        dispatch({
            details: details || undefined,
            state: state || undefined,
            startTimestamp,
            largeImageKey: editorInfo.icon,
            largeImageText: editorInfo.label,
            instance: false
        });
    }

    public resolveFileIcon(languageId: string, ext: string, fileName: string): FileIconInfo {
        const lowerName = fileName.toLowerCase();
        const lowerExt = ext.toLowerCase();

        if (lowerName === 'dockerfile' || lowerName.startsWith('dockerfile.')) {
            return { iconKey: 'docker', label: 'Docker' };
        }
        if (lowerName === 'package.json') {
            return { iconKey: 'json', label: 'Node Package Manifest' };
        }
        if (lowerName.includes('.git') || lowerName === '.gitignore') {
            return { iconKey: 'git', label: 'Git' };
        }

        const map: Record<string, FileIconInfo> = {
            typescript: { iconKey: 'typescript', label: 'TypeScript' },
            typescriptreact: { iconKey: 'react', label: 'React (TypeScript)' },
            javascript: { iconKey: 'javascript', label: 'JavaScript' },
            javascriptreact: { iconKey: 'react', label: 'React (JavaScript)' },
            python: { iconKey: 'python', label: 'Python' },
            rust: { iconKey: 'rust', label: 'Rust' },
            go: { iconKey: 'go', label: 'Go' },
            cpp: { iconKey: 'cpp', label: 'C++' },
            c: { iconKey: 'c', label: 'C' },
            csharp: { iconKey: 'csharp', label: 'C#' },
            html: { iconKey: 'html', label: 'HTML' },
            css: { iconKey: 'css', label: 'CSS' },
            scss: { iconKey: 'sass', label: 'SCSS' },
            sass: { iconKey: 'sass', label: 'Sass' },
            less: { iconKey: 'css', label: 'Less' },
            vue: { iconKey: 'vue', label: 'Vue' },
            svelte: { iconKey: 'svelte', label: 'Svelte' },
            json: { iconKey: 'json', label: 'JSON' },
            markdown: { iconKey: 'markdown', label: 'Markdown' },
            php: { iconKey: 'php', label: 'PHP' },
            ruby: { iconKey: 'ruby', label: 'Ruby' },
            java: { iconKey: 'java', label: 'Java' },
            kotlin: { iconKey: 'kotlin', label: 'Kotlin' },
            swift: { iconKey: 'swift', label: 'Swift' },
            dart: { iconKey: 'dart', label: 'Dart' },
            lua: { iconKey: 'lua', label: 'Lua' },
            sql: { iconKey: 'sql', label: 'SQL' },
            shellscript: { iconKey: 'bash', label: 'Shell' },
            powershell: { iconKey: 'powershell', label: 'PowerShell' },
            dockerfile: { iconKey: 'docker', label: 'Docker' },
            yaml: { iconKey: 'yaml', label: 'YAML' },
            xml: { iconKey: 'xml', label: 'XML' }
        };

        return map[languageId] || map[lowerExt] || { iconKey: 'text', label: languageId || 'File' };
    }

    public getEditorAppInfo(): { icon: string; label: string } {
        const appName = vscode.env.appName;
        const appLower = appName.toLowerCase();

        if (appLower.includes('insiders')) {
            return { icon: 'vscode-insiders', label: appName };
        }
        if (appLower.includes('codium')) {
            return { icon: 'vscodium', label: appName };
        }
        return { icon: 'vscode', label: appName };
    }

    public buildTemplateVars(workspaceName: string, extra: Record<string, string> = {}): Record<string, string> {
        const privacy = this.configHandler.privacy;
        const gitBranch = privacy.showGitBranch ? this.getGitBranch() : '';

        return {
            ...extra,
            workspace: privacy.showWorkspaceName ? workspaceName : '',
            fileName: privacy.showFileName ? (extra.fileName || '') : 'a file',
            fileExt: privacy.showFileName ? (extra.fileExt || '') : '',
            language: extra.language || '',
            lineCount: extra.lineCount || '1',
            currentLine: extra.currentLine || '1',
            gitBranch: gitBranch,
            debugType: privacy.showDebugStatus ? (extra.debugType || '') : '',
            debugSession: privacy.showDebugStatus ? (extra.debugSession || '') : ''
        };
    }

    public formatTemplate(template: string, vars: Record<string, string>): string {
        return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '').trim();
    }

    public getCurrentPreviewData(): {
        fileName: string;
        language: string;
        workspace: string;
        gitBranch: string;
        lineCount: string;
        currentLine: string;
        startTimestamp?: number;
    } {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        const workspaceName = workspaceFolder ? workspaceFolder.name : 'my-workspace';
        const doc = vscode.window.activeTextEditor?.document;
        const fileName = doc ? path.basename(doc.fileName) : 'App.tsx';
        const ext = path.extname(fileName).replace('.', '') || 'tsx';
        const fileInfo = this.resolveFileIcon(doc?.languageId || 'typescriptreact', ext, fileName);

        return {
            fileName,
            language: fileInfo.label,
            workspace: workspaceName,
            gitBranch: this.getGitBranch() || 'main',
            lineCount: String(doc?.lineCount || 128),
            currentLine: String((vscode.window.activeTextEditor?.selection.active.line || 0) + 1),
            startTimestamp: this.resolveStartTimestamp()
        };
    }

    private getGitBranch(): string {
        try {
            const gitExtension = vscode.extensions.getExtension('vscode.git')?.exports;
            const gitApi = gitExtension?.getAPI?.(1);
            const activeUri = vscode.window.activeTextEditor?.document?.uri
                ?? vscode.workspace.workspaceFolders?.[0]?.uri;
            if (!gitApi || !activeUri) return '';
            const repo = gitApi.getRepository(activeUri);
            return repo?.state?.HEAD?.name || '';
        } catch {
            return '';
        }
    }

    public getCurrentPayload(): ActivityPayload | null {
        return this.currentPayload || this.lastActiveFilePayload;
    }

    public dispose(): void {
        if (this.idleTimer) {
            clearTimeout(this.idleTimer);
            this.idleTimer = null;
        }
        this.onActivityChangeEmitter.dispose();
        this.disposables.forEach(d => d.dispose());
        this.disposables = [];
        this.lastActiveFilePayload = null;
        this.currentPayload = null;
    }
}
