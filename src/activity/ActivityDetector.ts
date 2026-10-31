import * as path from 'path';
import * as vscode from 'vscode';
import { ConfigurationHandler } from '../config/ConfigurationHandler';
import { ActivityPayload, DiscordRpcManager } from '../rpc/DiscordRpcManager';

interface FileIconInfo {
    iconKey: string;
    label: string;
}

const DISCODE_OFFICIAL_ICON = 'https://cdn.discordapp.com/app-icons/1565769356619554887/281d28bf86d74667d7721cc09711f77f.png';
const VSCORD_CDN_BASE = 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons';

export const APP_LOGOS: Record<string, { label: string; url: string }> = {
    discode: {
        label: 'DisCode',
        url: 'https://cdn.discordapp.com/app-icons/1565769356619554887/281d28bf86d74667d7721cc09711f77f.png'
    },
    vscode: {
        label: 'Visual Studio Code',
        url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/vscode.png'
    },
    'vscode-insiders': {
        label: 'Visual Studio Code Insiders',
        url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/vscode-insiders.png'
    },
    antigravity: {
        label: 'Google Antigravity',
        url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/antigravity.png'
    },
    cursor: {
        label: 'Cursor',
        url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/cursor.png'
    },
    vscodium: {
        label: 'VSCodium',
        url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/vscodium.png'
    },
    'vscodium-insiders': {
        label: 'VSCodium Insiders',
        url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/vscodium-insiders.png'
    },
    android: {
        label: 'Android Studio',
        url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/android.png'
    },
    arduino: {
        label: 'Arduino IDE',
        url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/arduino.png'
    },
    jupyter: {
        label: 'Jupyter Notebook',
        url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/jupyter.png'
    },
    godot: {
        label: 'Godot Engine',
        url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/godot.png'
    },
    git: {
        label: 'Git',
        url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/git.png'
    },
    gitlab: {
        label: 'GitLab',
        url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/gitlab.png'
    },
    docker: {
        label: 'Docker',
        url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/docker.png'
    },
    firebase: {
        label: 'Google Firebase',
        url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/firebase.png'
    },
    vercel: {
        label: 'Vercel',
        url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/vercel.png'
    }
};

export const KNOWN_CDN_ICONS: Set<string> = new Set([
    'agda', 'ahk', 'android', 'angular', 'ansible', 'antigravity', 'applescript',
    'appveyor', 'arduino', 'asciidoc', 'asp', 'assembly', 'astro', 'astroconfig',
    'autoit', 'babel', 'bat', 'bazel', 'bower', 'brainfuck', 'c', 'c3', 'cargo',
    'circleci', 'clojure', 'cmake', 'cobol', 'coffee', 'cpp', 'crystal', 'csharp',
    'css', 'cuda', 'cursor', 'cython', 'd', 'dart', 'debugging', 'delphi', 'docker',
    'editorconfig', 'ejs', 'elixir', 'elm', 'env', 'erlang', 'eslint', 'firebase',
    'fortran', 'fsharp', 'gatsbyjs', 'git', 'gitlab', 'gleam', 'glsl', 'go',
    'godot', 'gradle', 'graphql', 'groovy', 'gulp', 'handlebars', 'haskell', 'haxe',
    'html', 'http', 'idle', 'jar', 'java', 'jest', 'jinja', 'js', 'json', 'jsx',
    'julia', 'jupyter', 'kivy', 'kotlin', 'laravel', 'less', 'lisp', 'log', 'lua',
    'makefile', 'markdown', 'matlab', 'metal', 'mojo', 'nim', 'nix', 'nodemon',
    'npm', 'objective-c', 'ocaml', 'odin', 'pascal', 'perl', 'php', 'plantuml',
    'postcss', 'powershell', 'prettier', 'prisma', 'processing', 'pug', 'purescript',
    'python', 'qml', 'r', 'racket', 'razor', 'renpy', 'ruby', 'rust', 'scala',
    'scss', 'shell', 'solidity', 'sql', 'svelte', 'svg', 'swift', 'tailwind',
    'terraform', 'tex', 'text', 'toml', 'ts', 'tsx', 'turbo', 'twig', 'typst',
    'v', 'vala', 'vb', 'vercel', 'vue', 'wasm',
    'webpack', 'xml', 'yaml', 'yarn', 'zig'
]);

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
            iconUrl?: string;
            smallIconUrl?: string;
            appName?: string;
            activityType?: string;
            appLogo?: string;
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

    private selectionDebounceTimer: NodeJS.Timeout | null = null;

    private registerListeners(): void {
        this.disposables.push(
            vscode.window.onDidChangeActiveTextEditor(() => this.onUserActivity(true)),
            vscode.window.onDidChangeTextEditorSelection(() => this.onEditorContentOrSelectionChange()),
            vscode.workspace.onDidChangeTextDocument(e => {
                if (e.contentChanges.length > 0) {
                    this.onEditorContentOrSelectionChange();
                }
            }),
            vscode.window.onDidChangeWindowState(state => {
                if (state.focused) {
                    this.onUserActivity(false);
                } else {
                    this.evaluateState();
                }
            }),
            vscode.debug.onDidStartDebugSession(() => this.evaluateState(true)),
            vscode.debug.onDidTerminateDebugSession(() => this.evaluateState(true)),
            vscode.workspace.onDidChangeWorkspaceFolders(() => this.evaluateState(true)),
            this.configHandler.onDidChangeSettings(() => this.forceSync())
        );
    }

    private onEditorContentOrSelectionChange(): void {
        if (this.isIdle) {
            this.isIdle = false;
        }
        this.resetIdleTimer();
        if (this.selectionDebounceTimer) {
            clearTimeout(this.selectionDebounceTimer);
        }
        this.selectionDebounceTimer = setTimeout(() => {
            this.selectionDebounceTimer = null;
            this.evaluateState(false);
        }, 1500);
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
            this.resetIdleTimer();
            // Switching file is an immediate explicit user transition: force sync instantly!
            this.evaluateState(true);
            return;
        }

        this.resetIdleTimer();
        this.evaluateState(false);
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
        const editorLogo = this.resolveEditorLogoInfo();
        const startTimestamp = this.resolveStartTimestamp();
        const appNameTemplate = this.configHandler.formatting.appName || 'DisCode';
        const activityType = this.getActivityTypeNumber(this.configHandler.appearance.activityType);

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
                const appName = this.formatTemplate(appNameTemplate, templateVars).trim() || 'DisCode';

                dispatch({
                    name: appName,
                    type: activityType,
                    details: details || undefined,
                    state: state || undefined,
                    startTimestamp,
                    largeImageKey: editorLogo.url || DISCODE_OFFICIAL_ICON,
                    largeImageText: editorLogo.label || editorInfo.label,
                    smallImageKey: this.resolvePresenceImage('idle', false),
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
            const appName = this.formatTemplate(appNameTemplate, templateVars).trim() || 'DisCode';

            dispatch({
                name: appName,
                type: activityType,
                details: details || undefined,
                state: state || undefined,
                startTimestamp,
                largeImageKey: editorLogo.url || DISCODE_OFFICIAL_ICON,
                largeImageText: editorLogo.label || editorInfo.label,
                smallImageKey: this.resolvePresenceImage('debugging', false),
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
            const appName = this.formatTemplate(appNameTemplate, templateVars).trim() || 'DisCode';

            const isFileIconLarge = this.configHandler.appearance.largeImageStyle === 'fileIcon';
            const largeKey = isFileIconLarge
                ? this.resolvePresenceImage(fileInfo.iconKey, false)
                : (editorLogo.url || DISCODE_OFFICIAL_ICON);
            const smallKey = isFileIconLarge
                ? editorLogo.url
                : this.resolvePresenceImage(fileInfo.iconKey, false);
            const largeText = isFileIconLarge ? fileInfo.label : (editorLogo.label || editorInfo.label);
            const smallText = isFileIconLarge ? (editorLogo.label || undefined) : fileInfo.label;

            const payload: ActivityPayload = {
                name: appName,
                type: activityType,
                details: details || undefined,
                state: state || undefined,
                startTimestamp,
                largeImageKey: largeKey,
                largeImageText: largeText,
                smallImageKey: smallKey,
                smallImageText: smallKey ? smallText : undefined,
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
            const appName = this.formatTemplate(appNameTemplate, templateVars).trim() || 'DisCode';

            dispatch({
                name: appName,
                type: activityType,
                details: details || undefined,
                state: state || undefined,
                startTimestamp,
                largeImageKey: editorLogo.url || DISCODE_OFFICIAL_ICON,
                largeImageText: editorLogo.label || editorInfo.label,
                smallImageKey: this.resolvePresenceImage('idle', false),
                smallImageText: 'Idle',
                instance: false
            });
            return;
        }

        const templateVars = this.buildTemplateVars(workspaceName);
        const details = this.formatTemplate(this.configHandler.formatting.detailsNoFile, templateVars);
        const state = this.formatTemplate(this.configHandler.formatting.stateNoFile, templateVars);
        const appName = this.formatTemplate(appNameTemplate, templateVars).trim() || 'DisCode';

        dispatch({
            name: appName,
            type: activityType,
            details: details || undefined,
            state: state || undefined,
            startTimestamp,
            largeImageKey: editorLogo.url || DISCODE_OFFICIAL_ICON,
            largeImageText: editorLogo.label || editorInfo.label,
            instance: false
        });
    }

    public getActivityTypeNumber(type?: string): number {
        switch (type) {
            case 'watching':
                return 3;
            case 'listening':
                return 2;
            case 'competing':
                return 5;
            case 'playing':
            default:
                return 0;
        }
    }

    public resolvePresenceImage(key: string, isEditor = false): string | undefined {
        if (isEditor) {
            return this.resolveEditorLogoInfo().url;
        }
        if (!key) {
            return `${VSCORD_CDN_BASE}/text.png`;
        }
        if (key.startsWith('http://') || key.startsWith('https://')) {
            return key;
        }
        const normalized = key.toLowerCase();
        if (KNOWN_CDN_ICONS.has(normalized)) {
            return `${VSCORD_CDN_BASE}/${normalized}.png`;
        }
        if (this.configHandler.customClientId) {
            return key;
        }
        return `${VSCORD_CDN_BASE}/text.png`;
    }

    public resolveEditorLogoInfo(): { url?: string; label: string } {
        const appLogo = this.configHandler.appearance.appLogo || 'auto';
        if (appLogo === 'none') {
            return { url: undefined, label: '' };
        }
        if (appLogo.startsWith('http://') || appLogo.startsWith('https://')) {
            return { url: appLogo, label: this.configHandler.formatting.appName || 'Editor' };
        }
        if (appLogo !== 'auto' && APP_LOGOS[appLogo]) {
            return { url: APP_LOGOS[appLogo].url, label: APP_LOGOS[appLogo].label };
        }

        // Auto mode: check formatting appName first, then environment appName
        const customAppName = (this.configHandler.formatting.appName || '').toLowerCase();
        if (customAppName.includes('antigravity')) return APP_LOGOS['antigravity'];
        if (customAppName.includes('visual studio code') || customAppName.includes('vscode')) return APP_LOGOS['vscode'];
        if (customAppName.includes('vscodium')) return APP_LOGOS['vscodium'];
        if (customAppName.includes('cursor')) return APP_LOGOS['cursor'];
        if (customAppName.includes('insiders')) return APP_LOGOS['vscode-insiders'];
        if (customAppName.includes('android')) return APP_LOGOS['android'];
        if (customAppName.includes('arduino')) return APP_LOGOS['arduino'];
        if (customAppName.includes('jupyter')) return APP_LOGOS['jupyter'];
        if (customAppName.includes('godot')) return APP_LOGOS['godot'];
        if (customAppName.includes('discode')) return APP_LOGOS['discode'];

        // Fallback to editor environment if title is custom
        const envName = (vscode.env.appName || '').toLowerCase();
        if (envName.includes('antigravity')) return APP_LOGOS['antigravity'];
        if (envName.includes('codium')) return APP_LOGOS['vscodium'];
        if (envName.includes('cursor')) return APP_LOGOS['cursor'];
        if (envName.includes('insiders')) return APP_LOGOS['vscode-insiders'];
        if (envName.includes('visual studio code')) return APP_LOGOS['vscode'];

        return APP_LOGOS['discode'];
    }

    public resolveFileIcon(languageId: string, ext: string, fileName: string): FileIconInfo {
        const lowerName = fileName.toLowerCase();
        const lowerExt = ext.toLowerCase().replace(/^\./, '');
        const lowerLang = (languageId || '').toLowerCase();

        // Skenario file khusus
        if (lowerName === 'dockerfile' || lowerName.startsWith('dockerfile.')) {
            return { iconKey: 'docker', label: 'Docker' };
        }
        if (lowerName === 'package.json') {
            return { iconKey: 'json', label: 'Node Package Manifest' };
        }
        if (lowerName.includes('.git') || lowerName === '.gitignore') {
            return { iconKey: 'git', label: 'Git' };
        }
        if (lowerName === 'cargo.toml') {
            return { iconKey: 'cargo', label: 'Cargo Manifest' };
        }
        if (lowerName.startsWith('readme')) {
            return { iconKey: 'markdown', label: 'Markdown' };
        }

        const map: Record<string, FileIconInfo> = {
            typescript: { iconKey: 'ts', label: 'TypeScript' },
            typescriptreact: { iconKey: 'tsx', label: 'React (TypeScript)' },
            javascript: { iconKey: 'js', label: 'JavaScript' },
            javascriptreact: { iconKey: 'jsx', label: 'React (JavaScript)' },
            python: { iconKey: 'python', label: 'Python' },
            rust: { iconKey: 'rust', label: 'Rust' },
            go: { iconKey: 'go', label: 'Go' },
            cpp: { iconKey: 'cpp', label: 'C++' },
            c: { iconKey: 'c', label: 'C' },
            csharp: { iconKey: 'csharp', label: 'C#' },
            html: { iconKey: 'html', label: 'HTML' },
            css: { iconKey: 'css', label: 'CSS' },
            scss: { iconKey: 'scss', label: 'SCSS' },
            sass: { iconKey: 'scss', label: 'Sass' },
            less: { iconKey: 'less', label: 'Less' },
            vue: { iconKey: 'vue', label: 'Vue' },
            svelte: { iconKey: 'svelte', label: 'Svelte' },
            json: { iconKey: 'json', label: 'JSON' },
            jsonc: { iconKey: 'json', label: 'JSON with Comments' },
            markdown: { iconKey: 'markdown', label: 'Markdown' },
            php: { iconKey: 'php', label: 'PHP' },
            ruby: { iconKey: 'ruby', label: 'Ruby' },
            java: { iconKey: 'java', label: 'Java' },
            kotlin: { iconKey: 'kotlin', label: 'Kotlin' },
            swift: { iconKey: 'swift', label: 'Swift' },
            dart: { iconKey: 'dart', label: 'Dart' },
            lua: { iconKey: 'lua', label: 'Lua' },
            sql: { iconKey: 'sql', label: 'SQL' },
            shellscript: { iconKey: 'shell', label: 'Shell' },
            powershell: { iconKey: 'powershell', label: 'PowerShell' },
            dockerfile: { iconKey: 'docker', label: 'Docker' },
            yaml: { iconKey: 'yaml', label: 'YAML' },
            xml: { iconKey: 'xml', label: 'XML' },
            toml: { iconKey: 'toml', label: 'TOML' },
            graphql: { iconKey: 'graphql', label: 'GraphQL' },
            astro: { iconKey: 'astro', label: 'Astro' },
            prisma: { iconKey: 'prisma', label: 'Prisma' },
            solidity: { iconKey: 'solidity', label: 'Solidity' },
            bat: { iconKey: 'bat', label: 'Batch' },

            // Extension mappings & aliases
            ts: { iconKey: 'ts', label: 'TypeScript' },
            tsx: { iconKey: 'tsx', label: 'React (TypeScript)' },
            js: { iconKey: 'js', label: 'JavaScript' },
            mjs: { iconKey: 'js', label: 'JavaScript' },
            cjs: { iconKey: 'js', label: 'JavaScript' },
            jsx: { iconKey: 'jsx', label: 'React (JavaScript)' },
            py: { iconKey: 'python', label: 'Python' },
            pyw: { iconKey: 'python', label: 'Python' },
            rs: { iconKey: 'rust', label: 'Rust' },
            cc: { iconKey: 'cpp', label: 'C++' },
            cxx: { iconKey: 'cpp', label: 'C++' },
            hpp: { iconKey: 'cpp', label: 'C++ Header' },
            h: { iconKey: 'c', label: 'C Header' },
            cs: { iconKey: 'csharp', label: 'C#' },
            htm: { iconKey: 'html', label: 'HTML' },
            md: { iconKey: 'markdown', label: 'Markdown' },
            rb: { iconKey: 'ruby', label: 'Ruby' },
            kt: { iconKey: 'kotlin', label: 'Kotlin' },
            kts: { iconKey: 'kotlin', label: 'Kotlin Script' },
            sh: { iconKey: 'shell', label: 'Shell' },
            bash: { iconKey: 'shell', label: 'Bash' },
            zsh: { iconKey: 'shell', label: 'Zsh' },
            ps1: { iconKey: 'powershell', label: 'PowerShell' },
            psm1: { iconKey: 'powershell', label: 'PowerShell Module' },
            yml: { iconKey: 'yaml', label: 'YAML' },
            svg: { iconKey: 'svg', label: 'SVG' },
            env: { iconKey: 'env', label: 'Environment' },
            cmd: { iconKey: 'bat', label: 'Command Script' },
            txt: { iconKey: 'text', label: 'Plain Text' },
            log: { iconKey: 'log', label: 'Log' }
        };

        if (map[lowerLang]) {
            return map[lowerLang];
        }
        if (map[lowerExt]) {
            return map[lowerExt];
        }
        if (KNOWN_CDN_ICONS.has(lowerExt)) {
            return { iconKey: lowerExt, label: lowerExt.toUpperCase() };
        }
        return { iconKey: 'text', label: languageId || 'File' };
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
        iconUrl?: string;
        smallIconUrl?: string;
        appName?: string;
        activityType?: string;
        appLogo?: string;
        startTimestamp?: number;
    } {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        const workspaceName = workspaceFolder ? workspaceFolder.name : 'my-workspace';
        const doc = vscode.window.activeTextEditor?.document;
        const fileName = doc ? path.basename(doc.fileName) : 'App.tsx';
        const ext = path.extname(fileName).replace('.', '') || 'tsx';
        const fileInfo = this.resolveFileIcon(doc?.languageId || 'typescriptreact', ext, fileName);
        const editorLogo = this.resolveEditorLogoInfo();
        const isFileIconLarge = this.configHandler.appearance.largeImageStyle === 'fileIcon';
        const iconUrl = isFileIconLarge
            ? this.resolvePresenceImage(fileInfo.iconKey, false)
            : (editorLogo.url || DISCODE_OFFICIAL_ICON);
        const smallIconUrl = isFileIconLarge
            ? editorLogo.url
            : this.resolvePresenceImage(fileInfo.iconKey, false);

        const templateVars = this.buildTemplateVars(workspaceName, {
            fileName,
            fileExt: ext,
            language: fileInfo.label,
            lineCount: String(doc?.lineCount || 128),
            currentLine: String((vscode.window.activeTextEditor?.selection.active.line || 0) + 1)
        });
        const appNameTemplate = this.configHandler.formatting.appName || 'DisCode';
        const appName = this.formatTemplate(appNameTemplate, templateVars).trim() || 'DisCode';

        return {
            fileName,
            language: fileInfo.label,
            workspace: workspaceName,
            gitBranch: this.getGitBranch() || 'main',
            lineCount: String(doc?.lineCount || 128),
            currentLine: String((vscode.window.activeTextEditor?.selection.active.line || 0) + 1),
            iconUrl,
            smallIconUrl,
            appName,
            activityType: this.configHandler.appearance.activityType,
            appLogo: this.configHandler.appearance.appLogo || 'auto',
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
        if (this.selectionDebounceTimer) {
            clearTimeout(this.selectionDebounceTimer);
            this.selectionDebounceTimer = null;
        }
        this.onActivityChangeEmitter.dispose();
        this.disposables.forEach(d => d.dispose());
        this.disposables = [];
        this.lastActiveFilePayload = null;
        this.currentPayload = null;
    }
}
