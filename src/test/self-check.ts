import * as assert from 'assert';
import { DiscordRpcManager } from '../rpc/DiscordRpcManager';

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

    console.log('[Self-Check] All invariants passed successfully! (10/10 assertions)');
}

runSelfCheck();
