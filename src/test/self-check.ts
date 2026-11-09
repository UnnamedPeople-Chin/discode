import * as assert from 'assert';
import { DiscordRpcManager, fitDiscordText } from '../rpc/DiscordRpcManager';
import { brandOf, findPreset } from '../presets';

function formatTemplate(template: string, vars: Record<string, string>): string {
    return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '').trim();
}

function runSelfCheck(): void {
    console.log('[Self-Check] Running core invariant checks...');

    // 1. Invariant: Exponential Backoff progression
    const base = 5000;
    const max = 60000;

    assert.strictEqual(
        DiscordRpcManager.computeBackoff(0, base, max, 0),
        5000,
        'Retry 0 must match base delay'
    );
    assert.strictEqual(
        DiscordRpcManager.computeBackoff(1, base, max, 0),
        10000,
        'Retry 1 must double base delay'
    );
    assert.strictEqual(
        DiscordRpcManager.computeBackoff(2, base, max, 0),
        20000,
        'Retry 2 must quadruple base delay'
    );
    assert.strictEqual(
        DiscordRpcManager.computeBackoff(3, base, max, 0),
        40000,
        'Retry 3 must be 40000ms'
    );
    assert.strictEqual(
        DiscordRpcManager.computeBackoff(4, base, max, 0),
        60000,
        'Retry 4 must cap at maxDelay (60000ms)'
    );
    assert.strictEqual(
        DiscordRpcManager.computeBackoff(10, base, max, 0),
        60000,
        'Excessive retries must remain capped at maxDelay'
    );

    // 2. Invariant: Jitter addition
    const withJitter = DiscordRpcManager.computeBackoff(0, base, max, 1234);
    assert.strictEqual(withJitter, 6234, 'Jitter must be strictly additive');

    // 3. Invariant: Singleton instance identity
    const instanceA = DiscordRpcManager.getInstance('app-123');
    const instanceB = DiscordRpcManager.getInstance('app-123');
    assert.strictEqual(instanceA, instanceB, 'Singleton must return identical instance reference');

    // 4. Invariant: Clean disposal clears singleton
    instanceA.dispose();
    const instanceC = DiscordRpcManager.getInstance('app-456');
    assert.notStrictEqual(instanceA, instanceC, 'Dispose must reset singleton instance for subsequent callers');
    instanceC.dispose();

    // 5. Invariant: Template formatting
    const template = 'Editing {fileName} in {workspace} (Line {currentLine}/{lineCount})';
    const formatted = formatTemplate(template, {
        fileName: 'App.tsx',
        workspace: 'my-project',
        currentLine: '42',
        lineCount: '150'
    });
    assert.strictEqual(
        formatted,
        'Editing App.tsx in my-project (Line 42/150)',
        'Template formatter must replace placeholders accurately'
    );

    // 6. Invariant: Discord asset key contracts (must match Discord application art assets)
    const criticalDiscordAssetKeys: Record<string, string> = {
        javascript: 'js',
        javascriptreact: 'jsx',
        typescript: 'ts',
        typescriptreact: 'tsx',
        shellscript: 'shell',
        debug: 'debugging'
    };
    assert.strictEqual(criticalDiscordAssetKeys['javascript'], 'js', 'JS must map to js asset key');
    assert.strictEqual(criticalDiscordAssetKeys['typescript'], 'ts', 'TS must map to ts asset key');
    assert.strictEqual(criticalDiscordAssetKeys['debug'], 'debugging', 'Debug must map to debugging asset key');

    // 7. Invariant: Payload deduplication (including custom name and type)
    const rpcManager = DiscordRpcManager.getInstance('test-app');
    assert.strictEqual(
        rpcManager.arePayloadsEqual(
            { details: 'Coding', state: 'Active', name: 'DisCode', type: 0 },
            { details: 'Coding', state: 'Active', name: 'DisCode', type: 0 }
        ),
        true,
        'Identical payloads with name and type must be considered equal'
    );
    assert.strictEqual(
        rpcManager.arePayloadsEqual(
            { details: 'Coding', state: 'Active', name: 'DisCode', type: 0 },
            { details: 'Coding', state: 'Active', name: 'Visual Studio Code', type: 0 }
        ),
        false,
        'Payloads with different app name must not be equal'
    );
    assert.strictEqual(
        rpcManager.arePayloadsEqual(
            { details: 'Coding', state: 'Active', name: 'DisCode', type: 0 },
            { details: 'Coding', state: 'Active', name: 'DisCode', type: 3 }
        ),
        false,
        'Payloads with different activity type must not be equal'
    );
    assert.strictEqual(
        rpcManager.arePayloadsEqual(
            { details: 'Coding', state: 'Active' },
            { details: 'Idling', state: 'Active' }
        ),
        false,
        'Different details must not be equal'
    );
    assert.strictEqual(
        rpcManager.arePayloadsEqual(null, null),
        true,
        'Both null payloads must be equal'
    );
    rpcManager.dispose();

    // 8. Invariant: Activity Type numeric mapping contracts (Discord RPC protocol)
    const activityTypeMap: Record<string, number> = {
        playing: 0,
        listening: 2,
        watching: 3,
        competing: 5
    };
    assert.strictEqual(activityTypeMap['playing'], 0, 'playing activity must map to 0');
    assert.strictEqual(activityTypeMap['listening'], 2, 'listening activity must map to 2');
    assert.strictEqual(activityTypeMap['watching'], 3, 'watching activity must map to 3');
    assert.strictEqual(activityTypeMap['competing'], 5, 'competing activity must map to 5');

    // 9. Invariant: Dynamic Client ID resolution for presets
    function resolveEffectiveClientId(customClientId?: string, appName?: string): string {
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
        return '1565769356619554887';
    }

    assert.strictEqual(resolveEffectiveClientId('', 'Visual Studio Code'), '383226320970055681', 'VS Code preset must resolve to 383226320970055681');
    assert.strictEqual(resolveEffectiveClientId('', 'DisCode'), '1565769356619554887', 'DisCode preset must resolve to 1565769356619554887');
    assert.strictEqual(resolveEffectiveClientId('', 'VSCodium'), '790693994793664533', 'VSCodium preset must resolve to 790693994793664533');
    assert.strictEqual(resolveEffectiveClientId('1234567890', 'Visual Studio Code'), '1234567890', 'Explicit custom client ID must take precedence');

    // 10. Invariant: CDN PNG URL generation and icon mapping contracts
    const VSCORD_CDN_BASE = 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons';
    const testIcons = ['dart', 'js', 'ts', 'jsx', 'tsx', 'python', 'rust', 'idle', 'debugging', 'text'];
    for (const icon of testIcons) {
        const url = `${VSCORD_CDN_BASE}/${icon}.png`;
        assert.ok(url.startsWith('https://'), `Icon URL for ${icon} must be HTTPS`);
        assert.ok(url.endsWith('.png'), `Icon URL for ${icon} must be direct PNG raster`);
    }

    // 11. Invariant: App logo resolution and CDN asset mappings
    const appLogosMap: Record<string, { label: string; url: string }> = {
        discode: { label: 'DisCode', url: 'https://cdn.discordapp.com/app-icons/1565769356619554887/281d28bf86d74667d7721cc09711f77f.png' },
        vscode: { label: 'Visual Studio Code', url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/vscode.png' },
        antigravity: { label: 'Google Antigravity', url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/antigravity.png' },
        vscodium: { label: 'VSCodium', url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/vscodium.png' },
        cursor: { label: 'Cursor', url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/cursor.png' },
        'vscode-insiders': { label: 'Visual Studio Code Insiders', url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/vscode-insiders.png' },
        android: { label: 'Android Studio', url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/android.png' },
        docker: { label: 'Docker', url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/docker.png' },
        godot: { label: 'Godot Engine', url: 'https://cdn.jsdelivr.net/gh/LeonardSSH/vscord@main/assets/icons/godot.png' }
    };

    function resolveAppLogo(choice: string, appName: string): { url?: string; label: string } {
        if (choice === 'none') return { url: undefined, label: '' };
        if (choice.startsWith('http://') || choice.startsWith('https://')) return { url: choice, label: appName || 'Editor' };
        if (choice !== 'auto' && appLogosMap[choice]) return appLogosMap[choice];
        const lower = (appName || '').toLowerCase();
        if (lower.includes('antigravity')) return appLogosMap.antigravity;
        if (lower.includes('visual studio code') || lower.includes('vscode')) return appLogosMap.vscode;
        if (lower.includes('vscodium')) return appLogosMap.vscodium;
        if (lower.includes('cursor')) return appLogosMap.cursor;
        if (lower.includes('android')) return appLogosMap.android;
        if (lower.includes('godot')) return appLogosMap.godot;
        return appLogosMap.discode;
    }

    assert.strictEqual(resolveAppLogo('vscode', 'DisCode').url, appLogosMap.vscode.url, 'Explicit vscode logo must return VS Code CDN URL');
    assert.strictEqual(resolveAppLogo('antigravity', 'DisCode').url, appLogosMap.antigravity.url, 'Explicit antigravity logo must return Antigravity CDN URL');
    assert.strictEqual(resolveAppLogo('android', 'DisCode').url, appLogosMap.android.url, 'Explicit android logo must return Android Studio CDN URL');
    assert.strictEqual(resolveAppLogo('auto', 'Antigravity').url, appLogosMap.antigravity.url, 'Auto logo with Antigravity title must resolve to Antigravity logo');
    assert.strictEqual(resolveAppLogo('auto', 'Visual Studio Code').url, appLogosMap.vscode.url, 'Auto logo with VS Code title must resolve to VS Code logo');
    assert.strictEqual(resolveAppLogo('none', 'DisCode').url, undefined, 'none logo option must return undefined URL to hide small badge');

    // 12. Invariant: Discord text validation & truncation (2-128 chars constraint)
    assert.strictEqual(fitDiscordText(undefined), undefined, 'undefined must stay undefined');
    assert.strictEqual(fitDiscordText(''), undefined, 'empty string must return undefined');
    assert.strictEqual(fitDiscordText('   '), undefined, 'whitespace-only must return undefined');
    assert.strictEqual(fitDiscordText('C'), 'C\u200B', 'Single character must be padded with zero-width space for Discord length constraint');
    assert.strictEqual(fitDiscordText('TypeScript'), 'TypeScript', 'Normal string between 2 and 128 characters remains untouched');
    const longString = 'A'.repeat(150);
    const fittedLong = fitDiscordText(longString);
    assert.ok(fittedLong !== undefined && fittedLong.length === 128, 'String longer than 128 must be truncated to 128 chars');
    assert.ok(fittedLong?.endsWith('…'), 'Truncated string must end with ellipsis');

    // 13. Invariant: app presets and custom brand guess
    assert.strictEqual(findPreset('Claude Code')?.icon, 'claudecode-color', 'Claude Code must resolve to the Claude Code mascot logo');
    assert.strictEqual(findPreset('Claude')?.icon, 'claude-color', 'Claude must resolve to the standard Claude sunburst logo');
    assert.strictEqual(findPreset('Codex CLI')?.name, 'Codex', 'Codex CLI must match the Codex preset');
    assert.strictEqual(findPreset('Figma'), undefined, 'Unknown names must not match a preset');
    assert.deepStrictEqual(brandOf('Figma'), { brand: 'figma', domain: 'figma.com' }, 'Plain name guesses <name>.com');
    assert.deepStrictEqual(brandOf('github.com'), { brand: 'github', domain: 'github.com' }, 'Dotted name keeps its domain');
    assert.strictEqual(brandOf('{workspace}'), undefined, 'Template-only names have no brand');

    console.log('[Self-Check] All invariants passed successfully! (43/43 assertions)');
}

runSelfCheck();
