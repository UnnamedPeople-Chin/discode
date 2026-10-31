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
exports.ActivityDetector = exports.KNOWN_CDN_ICONS = void 0;
const path = __importStar(require("path"));
const vscode = __importStar(require("vscode"));
const DISCODE_OFFICIAL_ICON = 'https://cdn.discordapp.com/app-icons/1565769356619554887/281d28bf86d74667d7721cc09711f77f.png';
const VSCORD_CDN_BASE = 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons';
exports.KNOWN_CDN_ICONS = new Set([
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
class ActivityDetector {
    rpcManager;
    configHandler;
    disposables = [];
    idleTimer = null;
    isIdle = false;
    sessionStartTimestamp;
    fileStartTimestamp;
    manualStartTimestamp;
    lastFileName = '';
    lastActiveFilePayload = null;
    currentPayload = null;
    onActivityChangeEmitter = new vscode.EventEmitter();
    onDidChangeActivity = this.onActivityChangeEmitter.event;
    constructor(rpcManager, configHandler) {
        this.rpcManager = rpcManager;
        this.configHandler = configHandler;
        const nowSec = Math.floor(Date.now() / 1000);
        this.sessionStartTimestamp = nowSec;
        this.fileStartTimestamp = nowSec;
        this.manualStartTimestamp = nowSec;
        this.registerListeners();
        this.resetIdleTimer();
        this.evaluateState();
    }
    registerListeners() {
        this.disposables.push(vscode.window.onDidChangeActiveTextEditor(() => this.onUserActivity(true)), vscode.window.onDidChangeTextEditorSelection(() => this.onUserActivity(false)), vscode.workspace.onDidChangeTextDocument(e => {
            if (e.contentChanges.length > 0) {
                this.onUserActivity(false);
            }
        }), vscode.window.onDidChangeWindowState(state => {
            if (state.focused) {
                this.onUserActivity(false);
            }
            else {
                this.evaluateState();
            }
        }), vscode.debug.onDidStartDebugSession(() => this.evaluateState()), vscode.debug.onDidTerminateDebugSession(() => this.evaluateState()), vscode.workspace.onDidChangeWorkspaceFolders(() => this.evaluateState()));
    }
    onUserActivity(isFileSwitch) {
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
    resetIdleTimer() {
        if (this.idleTimer) {
            clearTimeout(this.idleTimer);
        }
        const timeoutMs = this.configHandler.idleTimeoutSeconds * 1000;
        this.idleTimer = setTimeout(() => {
            this.isIdle = true;
            this.evaluateState();
        }, timeoutMs);
    }
    resetTimer() {
        const nowSec = Math.floor(Date.now() / 1000);
        this.manualStartTimestamp = nowSec;
        this.fileStartTimestamp = nowSec;
        this.evaluateState(true);
    }
    forceSync() {
        this.evaluateState(true);
    }
    resolveStartTimestamp() {
        if (!this.configHandler.appearance.showElapsedTime) {
            return undefined;
        }
        const offsetSec = (this.configHandler.timer.customOffsetMinutes || 0) * 60;
        const mode = this.configHandler.timer.mode;
        let base = this.sessionStartTimestamp;
        if (mode === 'file') {
            base = this.fileStartTimestamp;
        }
        else if (mode === 'manual') {
            base = this.manualStartTimestamp;
        }
        return base - offsetSec;
    }
    evaluateState(forceSync = false) {
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
        const appNameTemplate = this.configHandler.formatting.appName || 'DisCode';
        const activityType = this.getActivityTypeNumber(this.configHandler.appearance.activityType);
        const dispatch = (payload) => {
            this.currentPayload = payload;
            if (forceSync) {
                this.rpcManager.forceSendActivity(payload);
            }
            else {
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
                    largeImageKey: this.resolvePresenceImage(editorInfo.icon, true),
                    largeImageText: editorInfo.label,
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
                largeImageKey: this.resolvePresenceImage(editorInfo.icon, true),
                largeImageText: editorInfo.label,
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
            const rawLarge = isFileIconLarge ? fileInfo.iconKey : editorInfo.icon;
            const rawSmall = isFileIconLarge ? editorInfo.icon : fileInfo.iconKey;
            const largeKey = this.resolvePresenceImage(rawLarge, !isFileIconLarge);
            const smallKey = this.resolvePresenceImage(rawSmall, isFileIconLarge);
            const largeText = isFileIconLarge ? fileInfo.label : editorInfo.label;
            const smallText = isFileIconLarge ? editorInfo.label : fileInfo.label;
            const payload = {
                name: appName,
                type: activityType,
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
            const appName = this.formatTemplate(appNameTemplate, templateVars).trim() || 'DisCode';
            dispatch({
                name: appName,
                type: activityType,
                details: details || undefined,
                state: state || undefined,
                startTimestamp,
                largeImageKey: this.resolvePresenceImage(editorInfo.icon, true),
                largeImageText: editorInfo.label,
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
            largeImageKey: this.resolvePresenceImage(editorInfo.icon, true),
            largeImageText: editorInfo.label,
            instance: false
        });
    }
    getActivityTypeNumber(type) {
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
    resolvePresenceImage(key, isEditor = false) {
        if (!key) {
            return isEditor ? DISCODE_OFFICIAL_ICON : `${VSCORD_CDN_BASE}/text.png`;
        }
        if (this.configHandler.customClientId) {
            return key;
        }
        if (key.startsWith('http://') || key.startsWith('https://')) {
            return key;
        }
        if (isEditor || key === 'vscode' || key === 'vscodium' || key === 'vscode-insiders') {
            return DISCODE_OFFICIAL_ICON;
        }
        const normalized = key.toLowerCase();
        if (exports.KNOWN_CDN_ICONS.has(normalized)) {
            return `${VSCORD_CDN_BASE}/${normalized}.png`;
        }
        return `${VSCORD_CDN_BASE}/text.png`;
    }
    resolveFileIcon(languageId, ext, fileName) {
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
        const map = {
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
        if (exports.KNOWN_CDN_ICONS.has(lowerExt)) {
            return { iconKey: lowerExt, label: lowerExt.toUpperCase() };
        }
        return { iconKey: 'text', label: languageId || 'File' };
    }
    getEditorAppInfo() {
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
    buildTemplateVars(workspaceName, extra = {}) {
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
    formatTemplate(template, vars) {
        return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '').trim();
    }
    getCurrentPreviewData() {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        const workspaceName = workspaceFolder ? workspaceFolder.name : 'my-workspace';
        const doc = vscode.window.activeTextEditor?.document;
        const fileName = doc ? path.basename(doc.fileName) : 'App.tsx';
        const ext = path.extname(fileName).replace('.', '') || 'tsx';
        const fileInfo = this.resolveFileIcon(doc?.languageId || 'typescriptreact', ext, fileName);
        const isFileIconLarge = this.configHandler.appearance.largeImageStyle === 'fileIcon';
        const iconUrl = isFileIconLarge
            ? this.resolvePresenceImage(fileInfo.iconKey, false)
            : DISCODE_OFFICIAL_ICON;
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
            appName,
            activityType: this.configHandler.appearance.activityType,
            startTimestamp: this.resolveStartTimestamp()
        };
    }
    getGitBranch() {
        try {
            const gitExtension = vscode.extensions.getExtension('vscode.git')?.exports;
            const gitApi = gitExtension?.getAPI?.(1);
            const activeUri = vscode.window.activeTextEditor?.document?.uri
                ?? vscode.workspace.workspaceFolders?.[0]?.uri;
            if (!gitApi || !activeUri)
                return '';
            const repo = gitApi.getRepository(activeUri);
            return repo?.state?.HEAD?.name || '';
        }
        catch {
            return '';
        }
    }
    getCurrentPayload() {
        return this.currentPayload || this.lastActiveFilePayload;
    }
    dispose() {
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
exports.ActivityDetector = ActivityDetector;
//# sourceMappingURL=ActivityDetector.js.map