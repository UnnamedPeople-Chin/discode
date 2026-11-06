"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_PRESETS = exports.faviconTile = exports.presetLogoUrl = void 0;
exports.findPreset = findPreset;
exports.brandOf = brandOf;
exports.probeBrandLogo = probeBrandLogo;
const TILE_BG = '181a1f';
const LOBE = 'unpkg.com/@lobehub/icons-static-png@latest/dark';
// 512x512 LobeHub PNG centered inside an 840x840 dark tile (~20% padding around the logo).
const presetLogoUrl = (icon) => `https://wsrv.nl/?url=${LOBE}/${icon}.png&w=840&h=840&fit=contain&we&bg=${TILE_BG}&cbg=${TILE_BG}&output=png`;
exports.presetLogoUrl = presetLogoUrl;
// 256x256 Iconify SVG centered inside a 420x420 dark tile (~20% padding around the logo).
const svgTile = (svgUrl) => `https://wsrv.nl/?url=${encodeURIComponent(svgUrl)}&w=420&h=420&fit=contain&we&bg=${TILE_BG}&cbg=${TILE_BG}&output=png`;
// 128x128 site favicon centered inside a 220x220 dark tile.
const faviconTile = (domain) => `https://wsrv.nl/?url=${encodeURIComponent(`www.google.com/s2/favicons?domain=${domain}&sz=128`)}&w=220&h=220&fit=contain&we&bg=${TILE_BG}&cbg=${TILE_BG}&output=png`;
exports.faviconTile = faviconTile;
exports.APP_PRESETS = [
    { name: 'Visual Studio Code', keys: ['visual studio code', 'vscode'] },
    { name: 'DisCode', keys: ['discode'] },
    { name: 'VSCodium', keys: ['vscodium'] },
    { name: 'Antigravity', keys: ['antigravity'] },
    { name: 'Cursor', keys: ['cursor'] },
    { name: 'Claude Code', keys: ['claude code'], icon: 'claude-color' },
    { name: 'Claude', keys: ['claude'], icon: 'claude-color' },
    { name: 'Codex', keys: ['codex', 'chatgpt', 'openai'], icon: 'openai' },
    { name: 'Gemini CLI', keys: ['gemini'], icon: 'gemini-color' },
    { name: 'GitHub Copilot', keys: ['copilot'], icon: 'copilot-color' },
    { name: 'Windsurf', keys: ['windsurf'], icon: 'windsurf' },
    { name: 'Kiro', keys: ['kiro'], icon: 'kiro' },
    { name: 'Trae', keys: ['trae'], icon: 'trae-color' },
    { name: 'Cline', keys: ['cline'], icon: 'cline' },
    { name: 'Replit', keys: ['replit'], icon: 'replit-color' },
    { name: 'Lovable', keys: ['lovable'], icon: 'lovable-color' },
    { name: 'v0', keys: ['v0'], icon: 'v0' },
    { name: 'Qwen Code', keys: ['qwen'], icon: 'qwen-color' },
    { name: 'DeepSeek', keys: ['deepseek'], icon: 'deepseek-color' },
    { name: 'Kimi', keys: ['kimi'], icon: 'kimi-color' },
    { name: 'Perplexity', keys: ['perplexity'], icon: 'perplexity-color' },
    { name: 'Ollama', keys: ['ollama'], icon: 'ollama' },
    { name: 'Grok', keys: ['grok'], icon: 'grok' },
    { name: 'Mistral', keys: ['mistral'], icon: 'mistral-color' }
];
function findPreset(appName) {
    const n = appName.toLowerCase();
    return exports.APP_PRESETS.find(p => p.icon && p.keys.some(k => n.includes(k)));
}
/** Custom name -> brand slug and guessed domain ("Figma" -> figma / figma.com, "github.com" -> github / github.com). */
function brandOf(appName) {
    const slug = appName.toLowerCase().replace(/\{[^}]*\}/g, '').replace(/[^a-z0-9.]/g, '');
    if (slug.length < 2)
        return undefined;
    return { brand: slug.split('.')[0], domain: slug.includes('.') ? slug : `${slug}.com` };
}
async function exists(url) {
    try {
        const r = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(6000) });
        return r.ok;
    }
    catch {
        return false;
    }
}
/** First real vector/PNG brand logo found as a padded dark tile URL; dark-padded favicon is the last resort. */
async function probeBrandLogo(brand, domain) {
    for (const slug of [`${brand}-color`, brand]) {
        if (await exists(`https://${LOBE}/${slug}.png`))
            return (0, exports.presetLogoUrl)(slug);
    }
    for (const svg of [
        `api.iconify.design/logos/${brand}-icon.svg?height=256`,
        `api.iconify.design/devicon/${brand}.svg?height=256`,
        `api.iconify.design/simple-icons/${brand}.svg?height=256&color=%23ffffff`
    ]) {
        if (await exists(`https://${svg}`))
            return svgTile(svg);
    }
    return (0, exports.faviconTile)(domain);
}
//# sourceMappingURL=presets.js.map