"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSettingsModalWebviewHtml = getSettingsModalWebviewHtml;
const ICONS = {
    terminal: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`,
    schedule: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    palette: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z"></path></svg>`,
    shield: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
    memory: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
    hub: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"></circle><circle cx="6" cy="19" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="12" y1="8" x2="12" y2="12"></line><path d="M6 16v-1a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v1"></path></svg>`,
    close: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    bolt: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
    check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    visibility: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
    code: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
    edit: `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>`,
    discodeLogo: `<svg viewBox="0 0 512 512" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="discodeSunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FF2E36"/>
      <stop offset="100%" stop-color="#D70014"/>
    </linearGradient>
    <clipPath id="discodeSunClip">
      <circle cx="256" cy="256" r="200"/>
    </clipPath>
  </defs>
  <circle cx="256" cy="256" r="200" fill="url(#discodeSunGrad)"/>
  <g clip-path="url(#discodeSunClip)">
    <rect x="56" y="356" width="400" height="10" fill="#0D0E11"/>
    <rect x="56" y="378" width="400" height="10" fill="#0D0E11"/>
    <rect x="56" y="400" width="400" height="10" fill="#0D0E11"/>
    <rect x="56" y="422" width="400" height="10" fill="#0D0E11"/>
  </g>
  <g transform="translate(256, 240) scale(0.68) translate(-256, -260)">
    <path d="M374.5 152C347.8 139.7 319.2 130.8 289.4 126C285.8 132.4 281.7 141 278.8 147.8C247.1 143.1 215.7 143.1 184.4 147.8C181.5 141 177.3 132.4 173.8 126C143.9 130.8 115.3 139.8 88.6 152.1C35.1 231.4 20.6 308.7 27.9 384.8C63.4 410.9 97.8 426.8 131.7 437.3C140.1 426 147.5 413.9 153.8 401.1C141.6 396.5 129.9 390.6 118.8 383.6C121.8 381.4 124.7 379.1 127.5 376.8C194.8 407.7 268.4 407.7 334.8 376.8C337.6 379.1 340.5 381.5 343.5 383.6C332.3 390.7 320.6 396.6 308.3 401.2C314.7 413.9 322.1 426.1 330.5 437.4C364.5 426.9 398.9 411 434.4 384.8C442.8 296.8 420.4 220 374.5 152Z" fill="#0D0E11" stroke="#FFFFFF" stroke-width="18" stroke-linejoin="round"/>
    <circle cx="162" cy="272" r="24" fill="#FF2E36"/>
    <circle cx="350" cy="272" r="24" fill="#FF2E36"/>
    <path d="M 230 226 C 208 226, 202 240, 202 254 C 202 264, 188 270, 180 270 C 188 270, 202 276, 202 286 C 202 300, 208 314, 230 314" fill="none" stroke="#FFFFFF" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 282 226 C 304 226, 310 240, 310 254 C 310 264, 324 270, 332 270 C 324 270, 310 276, 310 286 C 310 300, 304 314, 282 314" fill="none" stroke="#FFFFFF" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`
};
function getSettingsModalWebviewHtml(nonce, cspSource, bannerUri = '') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>DisCode Settings & Live Preview</title>
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${cspSource} https: data:; style-src 'unsafe-inline'; font-src 'none'; script-src 'nonce-${nonce}';"/>
    <style>
        :root {
            --bg-base: #111214;
            --bg-sidebar: #141619;
            --bg-card: #1e1f22;
            --bg-input: #111214;
            --bg-hover: #2b2d31;
            --border-subtle: #2b2d31;
            --border-focus: #e02444;
            --accent: #e02444;
            --accent-hover: #ff3b5c;
            --blurple: #5865f2;
            --blurple-hover: #4752c4;
            --green: #23a55a;
            --amber: #f0b232;
            --text-normal: #dbdee1;
            --text-muted: #949ba4;
            --text-heading: #f2f3f5;
            --font-ui: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            --font-mono: "Cascadia Code", Consolas, "Courier New", monospace;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; width: 100%; overflow: hidden; font-family: var(--font-ui); background: var(--bg-base); color: var(--text-normal); font-size: 13px; line-height: 1.5; }
        
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg-base); }
        ::-webkit-scrollbar-thumb { background: #262a36; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--accent); }

        .app-layout { display: flex; flex-direction: column; height: 100vh; }
        
        /* Top Navigation Bar */
        .top-bar {
            height: 48px;
            background: #0d0e11;
            border-bottom: 1px solid var(--border-subtle);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            flex-shrink: 0;
            user-select: none;
        }
        .brand-badge {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .brand-icon {
            width: 30px;
            height: 30px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(224, 36, 68, 0.4);
            flex-shrink: 0;
            background: #0d0e11;
        }
        .brand-icon svg {
            width: 100%;
            height: 100%;
            display: block;
        }
        .brand-name {
            font-weight: 700;
            color: var(--text-heading);
            font-size: 14px;
            letter-spacing: 0.3px;
        }
        .brand-version {
            background: #202227;
            color: var(--text-muted);
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: var(--font-mono);
            font-weight: 600;
        }
        .brand-tagline {
            color: var(--text-muted);
            font-size: 12px;
            margin-left: 6px;
            display: inline-block;
        }
        .top-right {
            display: flex;
            align-items: center;
            gap: 14px;
        }
        .connection-pill {
            display: flex;
            align-items: center;
            gap: 7px;
            background: #18191c;
            padding: 4px 10px;
            border-radius: 12px;
            border: 1px solid var(--border-subtle);
            font-size: 11px;
            font-weight: 600;
        }
        .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--amber);
        }
        .status-dot.online {
            background: var(--green);
            box-shadow: 0 0 6px rgba(35, 165, 90, 0.6);
        }
        .btn-close {
            background: none;
            border: none;
            color: var(--text-muted);
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.15s, background 0.15s;
        }
        .btn-close:hover {
            color: var(--text-heading);
            background: rgba(255, 255, 255, 0.08);
        }

        /* 3-Column Main Body */
        .main-container {
            flex: 1;
            display: flex;
            overflow: hidden;
        }

        /* Left Sidebar Tabs */
        .sidebar {
            width: 220px;
            background: var(--bg-sidebar);
            border-right: 1px solid var(--border-subtle);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-shrink: 0;
            padding: 12px 8px;
            user-select: none;
        }
        .nav-tabs {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .nav-tab-btn {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 9px 12px;
            background: transparent;
            border: none;
            border-radius: 6px;
            color: var(--text-muted);
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            text-align: left;
            transition: all 0.15s ease;
        }
        .nav-tab-btn:hover {
            background: var(--bg-hover);
            color: var(--text-heading);
        }
        .nav-tab-btn.active {
            background: #252830;
            color: #fff;
            font-weight: 600;
            box-shadow: inset 3px 0 0 var(--accent);
        }
        .sidebar-footer {
            background: #111214;
            padding: 10px;
            border-radius: 6px;
            border: 1px solid var(--border-subtle);
            font-size: 11px;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .sidebar-footer-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .sidebar-footer-row .lbl { color: var(--text-muted); }
        .sidebar-footer-row .val { color: var(--green); font-weight: 600; font-family: var(--font-mono); }

        /* Middle Configuration Canvas */
        .canvas {
            flex: 1;
            overflow-y: auto;
            padding: 24px 32px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            min-width: 0;
        }
        .section-header {
            margin-bottom: 6px;
        }
        .section-title {
            font-size: 18px;
            font-weight: 700;
            color: var(--text-heading);
            margin-bottom: 4px;
        }
        .section-desc {
            font-size: 12px;
            color: var(--text-muted);
        }

        .card {
            background: var(--bg-card);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 20px 22px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
            transition: border-color 0.2s ease;
        }
        .card:hover {
            border-color: rgba(255, 255, 255, 0.1);
        }
        .field-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .field-label {
            font-size: 12px;
            font-weight: 600;
            color: var(--text-heading);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .field-sub {
            font-size: 11px;
            color: var(--text-muted);
            font-weight: normal;
        }
        .input-text {
            background: var(--bg-input);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 8px;
            color: var(--text-heading);
            padding: 9px 13px;
            font-size: 13px;
            font-family: var(--font-mono);
            outline: none;
            transition: all 0.15s ease;
            width: 100%;
        }
        .input-text:focus {
            border-color: var(--accent);
            box-shadow: 0 0 0 2px rgba(255, 82, 93, 0.2);
        }
        .select-input {
            background: var(--bg-input);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 8px;
            color: var(--text-heading);
            padding: 9px 13px;
            font-size: 13px;
            outline: none;
            cursor: pointer;
            width: 100%;
            transition: all 0.15s ease;
        }
        .select-input:focus {
            border-color: var(--accent);
            box-shadow: 0 0 0 2px rgba(255, 82, 93, 0.2);
        }

        /* Token buttons row */
        .token-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 4px;
        }
        .token-btn {
            background: #1e2025;
            border: 1px solid rgba(255, 255, 255, 0.08);
            color: var(--text-normal);
            font-family: var(--font-mono);
            font-size: 11px;
            padding: 4px 10px;
            border-radius: 9999px;
            cursor: pointer;
            transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
            user-select: none;
        }
        .token-btn:hover {
            background: rgba(255, 82, 93, 0.15);
            border-color: rgba(255, 82, 93, 0.5);
            color: #ffb3b2;
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(255, 82, 93, 0.2);
        }
        .token-btn:active {
            transform: scale(0.96);
        }

        /* Toggle switches */
        .toggle-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 4px 0;
        }
        .toggle-info {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
        .toggle-title {
            font-size: 13px;
            font-weight: 500;
            color: var(--text-heading);
        }
        .toggle-desc {
            font-size: 11px;
            color: var(--text-muted);
        }
        .switch {
            position: relative;
            display: inline-block;
            width: 42px;
            height: 24px;
            flex-shrink: 0;
        }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider {
            position: absolute;
            cursor: pointer;
            inset: 0;
            background-color: #353942;
            transition: .2s;
            border-radius: 24px;
        }
        .slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: .2s;
            border-radius: 50%;
        }
        input:checked + .slider {
            background-color: var(--accent);
        }
        input:checked + .slider:before {
            transform: translateX(18px);
        }

        /* Quick offset buttons */
        .quick-btn-row {
            display: flex;
            gap: 8px;
            margin-top: 4px;
        }
        .btn-quick {
            flex: 1;
            padding: 7px 10px;
            background: #252830;
            border: 1px solid var(--border-subtle);
            border-radius: 6px;
            color: var(--text-heading);
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.15s;
        }
        .btn-quick:hover {
            background: var(--accent);
            border-color: var(--accent);
            color: #fff;
        }
        .btn-apply-instant {
            width: 100%;
            padding: 9px;
            background: #23272e;
            border: 1px solid #3c424d;
            border-radius: 6px;
            color: var(--text-heading);
            font-weight: 600;
            font-size: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            transition: all 0.15s;
        }
        .btn-apply-instant:hover {
            background: var(--accent);
            border-color: var(--accent);
            color: #fff;
        }

        /* Canvas Footer */
        .canvas-footer {
            margin-top: auto;
            padding-top: 16px;
            border-top: 1px solid var(--border-subtle);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-shrink: 0;
        }
        .btn-secondary {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            color: var(--text-muted);
            padding: 9px 16px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.08);
            color: var(--text-heading);
            transform: translateY(-1px);
        }
        .btn-secondary:active {
            transform: scale(0.98);
        }
        .footer-right {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .save-status {
            font-size: 12px;
            color: var(--green);
            font-weight: 600;
            opacity: 0;
            transition: opacity 0.2s;
        }
        .btn-primary {
            background: linear-gradient(135deg, #ff525d 0%, #b20024 100%);
            border: none;
            color: #fff;
            padding: 9px 22px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 14px rgba(224, 36, 68, 0.35);
        }
        .btn-primary:hover {
            background: linear-gradient(135deg, #ff6b75 0%, #c9002a 100%);
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(255, 82, 93, 0.45);
        }
        .btn-primary:active {
            transform: scale(0.98);
        }

        /* Right Live Preview Column */
        .preview-col {
            width: 340px;
            background: var(--bg-sidebar);
            border-left: 1px solid var(--border-subtle);
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
            padding: 20px 16px;
            gap: 16px;
            overflow-y: auto;
        }
        .preview-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            user-select: none;
        }
        .preview-heading {
            display: flex;
            align-items: center;
            gap: 7px;
            font-weight: 700;
            font-size: 12px;
            color: var(--text-heading);
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }
        .preview-sync-pill {
            display: flex;
            align-items: center;
            gap: 5px;
            background: #18191c;
            padding: 3px 8px;
            border-radius: 10px;
            font-size: 10px;
            font-weight: 600;
            color: var(--green);
        }
        .pulse-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--green);
            animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
            0% { opacity: 0.5; transform: scale(0.9); }
            50% { opacity: 1; transform: scale(1.2); }
            100% { opacity: 0.5; transform: scale(0.9); }
        }

        /* Authentic Discord Profile Card */
        .discord-card {
            background: #18191c;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
            border: 1px solid #232428;
            display: flex;
            flex-direction: column;
        }
        .discord-banner {
            height: 88px;
            background: linear-gradient(135deg, #190509 0%, #4a0d18 100%);
            position: relative;
            overflow: hidden;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
        }
        .discord-banner-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center 25%;
            display: block;
            filter: brightness(0.95);
        }
        .discord-banner-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(24, 25, 28, 0.8) 100%);
        }
        .discord-profile-body {
            padding: 0 14px 14px 14px;
            display: flex;
            flex-direction: column;
        }
        .discord-avatar-row {
            margin-top: -34px;
            margin-bottom: 10px;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
        }
        .discord-avatar-wrap {
            position: relative;
            width: 68px;
            height: 68px;
            border-radius: 50%;
            border: 5px solid #18191c;
            background: #2b2d31;
            overflow: visible;
        }
        .discord-avatar-img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
            display: block;
        }
        .discord-avatar-fallback {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            background: #313338;
            color: #fff;
        }
        .discord-online-dot {
            position: absolute;
            bottom: 0px;
            right: 0px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: var(--green);
            border: 3px solid #18191c;
        }
        .discord-badges {
            display: flex;
            align-items: center;
            gap: 4px;
            background: #111214;
            padding: 3px 6px;
            border-radius: 8px;
            margin-bottom: 6px;
            color: var(--blurple);
        }
        .discord-user-details {
            margin-bottom: 12px;
        }
        .discord-display-name {
            font-size: 16px;
            font-weight: 700;
            color: #fff;
            line-height: 1.2;
            word-break: break-all;
        }
        .discord-username {
            font-size: 12px;
            color: var(--text-muted);
            font-weight: 500;
        }
        
        .discord-divider {
            height: 1px;
            background: #2b2d31;
            margin-bottom: 12px;
        }

        /* Activity Section inside Profile Card */
        .discord-activity-box {
            background: #1e1f22;
            border-radius: 8px;
            padding: 12px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            border: 1px solid rgba(255, 255, 255, 0.04);
        }
        .discord-act-header {
            font-size: 11px;
            font-weight: 700;
            color: #b5bac1;
            letter-spacing: 0.4px;
            text-transform: uppercase;
        }
        .discord-act-main {
            display: flex;
            align-items: flex-start;
            gap: 10px;
        }
        .discord-icon-container {
            position: relative;
            width: 48px;
            height: 48px;
            flex-shrink: 0;
            border-radius: 8px;
            background: #2b2d31;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: visible;
        }
        .discord-large-badge {
            font-weight: 800;
            color: #fff;
            font-size: 15px;
            font-family: var(--font-mono);
        }
        .discord-small-badge {
            position: absolute;
            bottom: -4px;
            right: -4px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid #1e1f22;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            background: #0d0e11;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
        }
        .discord-small-badge svg {
            width: 100%;
            height: 100%;
            display: block;
        }
        .discord-act-text {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            line-height: 1.35;
        }
        .discord-act-app {
            font-size: 13px;
            font-weight: 700;
            color: #fff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .discord-act-line1 {
            font-size: 12px;
            color: #dbdee1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .discord-act-line2 {
            font-size: 11px;
            color: #949ba4;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .discord-act-timer {
            font-size: 11px;
            color: #949ba4;
            display: flex;
            align-items: center;
            gap: 4px;
            margin-top: 2px;
        }
        .discord-btn-action {
            width: 100%;
            padding: 7px 12px;
            background: #2b2d31;
            border: none;
            border-radius: 4px;
            color: #fff;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.15s;
        }
        .discord-btn-action:hover {
            background: #35373c;
        }

        /* Viewport Mode Switch & Telemetry */
        .preview-telemetry {
            background: #111214;
            border: 1px solid var(--border-subtle);
            border-radius: 6px;
            padding: 10px 12px;
            display: flex;
            flex-direction: column;
            gap: 6px;
            font-size: 11px;
        }
        .telemetry-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .telemetry-row .lbl { color: var(--text-muted); }
        .telemetry-row .val { color: var(--text-heading); font-family: var(--font-mono); }
        
        .mode-switch-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 11px;
            color: var(--text-muted);
            user-select: none;
        }
        .mode-btn-group {
            display: flex;
            background: #111214;
            border-radius: 4px;
            padding: 2px;
            border: 1px solid var(--border-subtle);
        }
        .btn-mode {
            background: none;
            border: none;
            color: var(--text-muted);
            font-size: 10px;
            font-weight: 600;
            padding: 3px 8px;
            border-radius: 3px;
            cursor: pointer;
        }
        .btn-mode.active {
            background: var(--accent);
            color: #fff;
        }

        .hidden { display: none !important; }
    </style>
</head>
<body>
    <div class="app-layout">
        
        <!-- Top App Header -->
        <header class="top-bar">
            <div class="brand-badge">
                <div class="brand-icon">
                    ${ICONS.discodeLogo}
                </div>
                <div>
                    <span class="brand-name">DisCode</span>
                    <span class="brand-version">v1.3.1</span>
                    <span class="brand-tagline">Discord Rich Presence</span>
                </div>
            </div>
            <div class="top-right">
                <div class="connection-pill">
                    <span class="status-dot" id="topStatusDot"></span>
                    <span id="topConnStatus">Connecting to Discord...</span>
                </div>
                <button id="topBtnClose" class="btn-close" title="Close" aria-label="Close">
                    ${ICONS.close}
                </button>
            </div>
        </header>

        <!-- Main Body Workspace -->
        <div class="main-container">

            <!-- Column 1: Left Navigation Sidebar -->
            <aside class="sidebar">
                <nav class="nav-tabs" id="navTabs">
                    <button class="nav-tab-btn active" data-section="activity" type="button">
                        ${ICONS.terminal}
                        <span>Activity Format</span>
                    </button>
                    <button class="nav-tab-btn" data-section="timer" type="button">
                        ${ICONS.schedule}
                        <span>Elapsed Timers</span>
                    </button>
                    <button class="nav-tab-btn" data-section="appearance" type="button">
                        ${ICONS.palette}
                        <span>Appearance & Icons</span>
                    </button>
                    <button class="nav-tab-btn" data-section="privacy" type="button">
                        ${ICONS.shield}
                        <span>Privacy Controls</span>
                    </button>
                    <button class="nav-tab-btn" data-section="behavior" type="button">
                        ${ICONS.memory}
                        <span>Behavior & Idle</span>
                    </button>
                    <button class="nav-tab-btn" data-section="general" type="button">
                        ${ICONS.hub}
                        <span>Connection & Client ID</span>
                    </button>
                </nav>

                <div class="sidebar-footer">
                    <div class="sidebar-footer-row">
                        <span class="lbl">Discord IPC</span>
                        <span class="val" id="kyotoRelayStatus">ONLINE</span>
                    </div>
                    <div class="sidebar-footer-row">
                        <span class="lbl">Socket Gateway</span>
                        <span class="val" style="color: var(--text-normal);">Local Pipe</span>
                    </div>
                </div>
            </aside>

            <!-- Column 2: Center Configuration Canvas -->
            <main class="canvas">
                
                <!-- SECTION 1: ACTIVITY -->
                <div class="setting-section" data-section="activity">
                    <div class="section-header">
                        <h2 class="section-title">Activity Format Strings</h2>
                        <p class="section-desc">Customize how your currently open workspace and file appear on your Discord profile.</p>
                    </div>

                    <div class="card">
                        <div class="field-group">
                            <label class="field-label" for="detailsEditing">
                                <span>Details Format (Line 1)</span>
                                <span class="field-sub">Default: Cooking {fileName}</span>
                            </label>
                            <input type="text" id="detailsEditing" class="input-text" placeholder="Cooking {fileName}"/>
                            <div class="token-row">
                                <button type="button" class="token-btn" data-target="detailsEditing" data-token="{fileName}">+ {fileName}</button>
                                <button type="button" class="token-btn" data-target="detailsEditing" data-token="{workspace}">+ {workspace}</button>
                                <button type="button" class="token-btn" data-target="detailsEditing" data-token="{gitBranch}">+ {gitBranch}</button>
                                <button type="button" class="token-btn" data-target="detailsEditing" data-token="{lineCount}">+ {lineCount}</button>
                                <button type="button" class="token-btn" data-target="detailsEditing" data-token="{currentLine}">+ {currentLine}</button>
                                <button type="button" class="token-btn" data-target="detailsEditing" data-token="{language}">+ {language}</button>
                            </div>
                        </div>

                        <div class="field-group">
                            <label class="field-label" for="stateEditing">
                                <span>State Format (Line 2)</span>
                                <span class="field-sub">Default: Workspace: {workspace}</span>
                            </label>
                            <input type="text" id="stateEditing" class="input-text" placeholder="Workspace: {workspace}"/>
                            <div class="token-row">
                                <button type="button" class="token-btn" data-target="stateEditing" data-token="{workspace}">+ {workspace}</button>
                                <button type="button" class="token-btn" data-target="stateEditing" data-token="{gitBranch}">+ {gitBranch}</button>
                                <button type="button" class="token-btn" data-target="stateEditing" data-token="{fileName}">+ {fileName}</button>
                                <button type="button" class="token-btn" data-target="stateEditing" data-token="{language}">+ {language}</button>
                            </div>
                        </div>

                        <div class="field-group">
                            <label class="field-label" for="detailsIdle">
                                <span>Idle Details Format</span>
                                <span class="field-sub">Displayed when AFK</span>
                            </label>
                            <input type="text" id="detailsIdle" class="input-text" placeholder="Idling"/>
                        </div>

                        <div class="field-group">
                            <label class="field-label" for="stateIdle">
                                <span>Idle State Format</span>
                            </label>
                            <input type="text" id="stateIdle" class="input-text" placeholder="Workspace: {workspace}"/>
                        </div>
                    </div>
                </div>

                <!-- SECTION 2: TIMERS -->
                <div class="setting-section hidden" data-section="timer">
                    <div class="section-header">
                        <h2 class="section-title">Elapsed Time & Timers</h2>
                        <p class="section-desc">Manage duration calculations and inject quick manual time offsets.</p>
                    </div>

                    <div class="card">
                        <div class="field-group">
                            <label class="field-label" for="timerMode">Calculation Mode</label>
                            <select id="timerMode" class="select-input">
                                <option value="session">Session - Count duration since VS Code was opened</option>
                                <option value="file">Per-File - Reset duration every time you switch files</option>
                                <option value="manual">Manual - Persistent timer controlled manually</option>
                            </select>
                        </div>

                        <div class="field-group">
                            <label class="field-label">Add Manual Offset</label>
                            <div style="display: flex; gap: 10px;">
                                <div style="flex: 1;">
                                    <span style="font-size: 11px; color: var(--text-muted);">Hours</span>
                                    <input type="number" id="timerHours" class="input-text" min="0" max="99" value="0"/>
                                </div>
                                <div style="flex: 1;">
                                    <span style="font-size: 11px; color: var(--text-muted);">Minutes</span>
                                    <input type="number" id="timerMinutes" class="input-text" min="0" max="59" value="0"/>
                                </div>
                            </div>
                            <div class="quick-btn-row">
                                <button type="button" id="btnPlus1" class="btn-quick">+1h</button>
                                <button type="button" id="btnPlus2" class="btn-quick">+2h</button>
                                <button type="button" id="btnPlus3" class="btn-quick">+3.5h</button>
                                <button type="button" id="btnResetTimer" class="btn-quick" style="background: #353942;">Reset to 00:00</button>
                            </div>
                        </div>

                        <button type="button" id="btnApplyTimer" class="btn-apply-instant">
                            ${ICONS.bolt}
                            <span>Apply Timer Instantly to Discord</span>
                        </button>
                    </div>
                </div>

                <!-- SECTION 3: APPEARANCE -->
                <div class="setting-section hidden" data-section="appearance">
                    <div class="section-header">
                        <h2 class="section-title">Visual Appearance</h2>
                        <p class="section-desc">Configure icons, badges, and presence timestamps.</p>
                    </div>

                    <div class="card">
                        <div class="field-group">
                            <label class="field-label" for="largeImageStyle">Large Image Display Style</label>
                            <select id="largeImageStyle" class="select-input">
                                <option value="fileIcon">Language File Icon (JavaScript, TypeScript, Python, etc.)</option>
                                <option value="editorIcon">DisCode Application Logo</option>
                            </select>
                        </div>

                        <div class="toggle-row">
                            <div class="toggle-info">
                                <span class="toggle-title">Show Elapsed Timestamp</span>
                                <span class="toggle-desc">Displays "XX:XX:XX elapsed" on your Discord Rich Presence card.</span>
                            </div>
                            <label class="switch">
                                <input type="checkbox" id="showElapsedTime" checked/>
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- SECTION 4: PRIVACY -->
                <div class="setting-section hidden" data-section="privacy">
                    <div class="section-header">
                        <h2 class="section-title">Privacy Controls</h2>
                        <p class="section-desc">Mask confidential file names, repos, or branches from public view.</p>
                    </div>

                    <div class="card">
                        <div class="toggle-row">
                            <div class="toggle-info">
                                <span class="toggle-title">Show Active File Name</span>
                                <span class="toggle-desc">If disabled, file names are masked as "a file".</span>
                            </div>
                            <label class="switch">
                                <input type="checkbox" id="showFileName" checked/>
                                <span class="slider"></span>
                            </label>
                        </div>

                        <div class="toggle-row">
                            <div class="toggle-info">
                                <span class="toggle-title">Show Workspace / Folder Name</span>
                                <span class="toggle-desc">If disabled, workspace names are masked as "Confidential Project".</span>
                            </div>
                            <label class="switch">
                                <input type="checkbox" id="showWorkspaceName" checked/>
                                <span class="slider"></span>
                            </label>
                        </div>

                        <div class="toggle-row">
                            <div class="toggle-info">
                                <span class="toggle-title">Show Git Branch</span>
                                <span class="toggle-desc">Display active git branch in templates.</span>
                            </div>
                            <label class="switch">
                                <input type="checkbox" id="showGitBranch"/>
                                <span class="slider"></span>
                            </label>
                        </div>

                        <div class="toggle-row">
                            <div class="toggle-info">
                                <span class="toggle-title">Show Debugging Session Status</span>
                                <span class="toggle-desc">Automatically display active debug sessions when running debuggers.</span>
                            </div>
                            <label class="switch">
                                <input type="checkbox" id="showDebugStatus" checked/>
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- SECTION 5: BEHAVIOR -->
                <div class="setting-section hidden" data-section="behavior">
                    <div class="section-header">
                        <h2 class="section-title">Behavior & Idle Detection</h2>
                        <p class="section-desc">Configure presence behavior when closing files or stepping away from your desk.</p>
                    </div>

                    <div class="card">
                        <div class="field-group">
                            <label class="field-label" for="whenNoFileOpen">When No File is Open</label>
                            <select id="whenNoFileOpen" class="select-input">
                                <option value="keepLastFile">Keep Last Active File</option>
                                <option value="idle">Switch to Idle Status</option>
                                <option value="noFile">Show Workspace with No File</option>
                                <option value="clear">Clear Presence Completely</option>
                            </select>
                        </div>

                        <div class="field-group">
                            <label class="field-label" for="idleAction">When User Goes Idle (AFK)</label>
                            <select id="idleAction" class="select-input">
                                <option value="showIdle">Show Idle Status</option>
                                <option value="keepLastFile">Keep Last File Presence</option>
                                <option value="clear">Clear Presence</option>
                            </select>
                        </div>

                        <div class="field-group">
                            <label class="field-label" for="idleTimeoutSeconds">Idle Threshold (Seconds)</label>
                            <input type="number" id="idleTimeoutSeconds" class="input-text" min="30" max="3600" value="300"/>
                        </div>
                    </div>
                </div>

                <!-- SECTION 6: CONNECTION -->
                <div class="setting-section hidden" data-section="general">
                    <div class="section-header">
                        <h2 class="section-title">Connection & Application ID</h2>
                        <p class="section-desc">Manage the Discord IPC gateway connection and application identity.</p>
                    </div>

                    <div class="card">
                        <div class="toggle-row">
                            <div class="toggle-info">
                                <span class="toggle-title">Enable Discord Rich Presence</span>
                                <span class="toggle-desc">Toggle the connection to the Discord desktop client on or off.</span>
                            </div>
                            <label class="switch">
                                <input type="checkbox" id="enabled" checked/>
                                <span class="slider"></span>
                            </label>
                        </div>

                        <div class="field-group">
                            <label class="field-label" for="clientId">
                                <span>Custom Discord Client ID</span>
                                <span class="field-sub">Leave blank to use official DisCode application</span>
                            </label>
                            <input type="text" id="clientId" class="input-text" placeholder="Default: 1565769356619554887 (Official DisCode)"/>
                        </div>
                    </div>
                </div>

                <!-- Bottom Sticky Footer Actions -->
                <footer class="canvas-footer">
                    <button id="btnResetDefaults" class="btn-secondary" type="button">Reset to Defaults</button>
                    <div class="footer-right">
                        <span id="saveStatus" class="save-status">Settings Saved</span>
                        <button id="btnSave" class="btn-primary" type="button">
                            ${ICONS.check}
                            <span>Save Settings</span>
                        </button>
                    </div>
                </footer>
            </main>

            <!-- Column 3: Right Live Preview Column -->
            <aside class="preview-col">
                <div class="preview-header">
                    <div class="preview-heading">
                        ${ICONS.visibility}
                        <span>Live Discord Preview</span>
                    </div>
                    <div class="preview-sync-pill">
                        <span class="pulse-dot"></span>
                        <span>Synced</span>
                    </div>
                </div>

                <!-- Authentic Discord User Profile Card -->
                <div class="discord-card">
                    <div class="discord-banner">
                        ${bannerUri ? `<img src="${bannerUri}" alt="Japanese Landscape Banner" class="discord-banner-img"/>` : ''}
                        <div class="discord-banner-overlay"></div>
                    </div>
                    <div class="discord-profile-body">
                        <div class="discord-avatar-row">
                            <div class="discord-avatar-wrap">
                                <img id="previewAvatarImg" class="discord-avatar-img" src="" alt="Avatar" onerror="this.style.display='none'; document.getElementById('previewAvatarFallback').style.display='flex';"/>
                                <div id="previewAvatarFallback" class="discord-avatar-fallback">👤</div>
                                <div id="previewStatusDot" class="discord-online-dot"></div>
                            </div>
                            <div class="discord-badges">
                                ${ICONS.code}
                                ${ICONS.bolt}
                            </div>
                        </div>

                        <div class="discord-user-details">
                            <div class="discord-display-name" id="previewProfileName">Detecting user...</div>
                            <div class="discord-username" id="previewUserTag">@discord</div>
                        </div>

                        <div class="discord-divider"></div>

                        <!-- Activity Box -->
                        <div class="discord-activity-box">
                            <div class="discord-act-header">PLAYING A GAME</div>
                            <div class="discord-act-main">
                                <div class="discord-icon-container" id="previewAppIconWrap">
                                    <span id="previewBadgeIcon" class="discord-large-badge">TS</span>
                                    <div class="discord-small-badge" title="DisCode Official">
                                        ${ICONS.discodeLogo}
                                    </div>
                                </div>
                                <div class="discord-act-text">
                                    <div class="discord-act-app" id="previewAppName">DisCode</div>
                                    <div class="discord-act-line1" id="previewLine1">Cooking Cantarella.js</div>
                                    <div class="discord-act-line2" id="previewLine2">Workspace: Pemrograman Web I</div>
                                    <div class="discord-act-timer" id="previewTimerRow">
                                        ${ICONS.schedule}
                                        <span id="previewTimerDigits">00:00:00 elapsed</span>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="discord-btn-action">View Repository</button>
                        </div>
                    </div>
                </div>

                <!-- Preview Controls & Telemetry -->
                <div class="mode-switch-row">
                    <span>Card View:</span>
                    <div class="mode-btn-group">
                        <button type="button" id="btnModeDetailed" class="btn-mode active">Detailed</button>
                        <button type="button" id="btnModeCompact" class="btn-mode">Compact</button>
                    </div>
                </div>

                <div class="preview-telemetry">
                    <div class="telemetry-row">
                        <span class="lbl">Discord Client</span>
                        <span class="val" id="previewFooterClient">IPC: Live</span>
                    </div>
                    <div class="telemetry-row">
                        <span class="lbl">Account ID</span>
                        <span class="val" id="previewFooterUserId">--</span>
                    </div>
                </div>
            </aside>
        </div>
    </div>

    <!-- Script Logic -->
    <script nonce="${nonce}">
        (function () {
            const vscode = acquireVsCodeApi();

            const detailsInput = document.getElementById('detailsEditing');
            const stateInput = document.getElementById('stateEditing');
            const previewLine1 = document.getElementById('previewLine1');
            const previewLine2 = document.getElementById('previewLine2');
            const previewTimerRow = document.getElementById('previewTimerRow');
            const previewTimerDigits = document.getElementById('previewTimerDigits');
            const showElapsedTime = document.getElementById('showElapsedTime');
            const showFileName = document.getElementById('showFileName');
            const showWorkspaceName = document.getElementById('showWorkspaceName');
            const showGitBranch = document.getElementById('showGitBranch');
            const timerMode = document.getElementById('timerMode');
            const timerHours = document.getElementById('timerHours');
            const timerMinutes = document.getElementById('timerMinutes');
            const btnSave = document.getElementById('btnSave');
            const saveStatus = document.getElementById('saveStatus');
            const tokenButtons = document.querySelectorAll('.token-btn');

            // Live Profile elements
            const previewAvatarImg = document.getElementById('previewAvatarImg');
            const previewAvatarFallback = document.getElementById('previewAvatarFallback');
            const previewProfileName = document.getElementById('previewProfileName');
            const previewUserTag = document.getElementById('previewUserTag');
            const previewStatusDot = document.getElementById('previewStatusDot');
            const previewFooterClient = document.getElementById('previewFooterClient');
            const previewFooterUserId = document.getElementById('previewFooterUserId');
            const previewBadgeIcon = document.getElementById('previewBadgeIcon');
            const topStatusDot = document.getElementById('topStatusDot');
            const topConnStatus = document.getElementById('topConnStatus');
            const kyotoRelayStatus = document.getElementById('kyotoRelayStatus');

            let currentDiscordUser = null;
            let realStartTimestamp = null;
            let livePreviewData = {
                fileName: 'Cantarella.js',
                workspace: 'Pemrograman Web I',
                gitBranch: 'main',
                lineCount: '128 lines',
                language: 'JavaScript'
            };

            function getLangBadge(lang) {
                if (!lang) return 'JS';
                const l = lang.toLowerCase();
                if (l.includes('react') && (l.includes('type') || l.includes('tsx'))) return 'TSX';
                if (l.includes('react') || l.includes('jsx')) return 'JSX';
                if (l.includes('typescript')) return 'TS';
                if (l.includes('javascript')) return 'JS';
                if (l.includes('python')) return 'PY';
                if (l.includes('rust')) return 'RS';
                if (l.includes('html')) return 'HTML';
                if (l.includes('css')) return 'CSS';
                if (l.includes('json')) return 'JSON';
                if (l.includes('shell') || l.includes('bash')) return 'SH';
                return lang.substring(0, 3).toUpperCase();
            }

            function formatTime(totalSec) {
                const hrs = String(Math.floor(totalSec / 3600)).padStart(2, '0');
                const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
                const secs = String(totalSec % 60).padStart(2, '0');
                return hrs + ':' + mins + ':' + secs + ' elapsed';
            }

            function updateDiscordAccount(user, connState) {
                if (user && user.id) {
                    currentDiscordUser = user;
                    previewProfileName.textContent = user.globalName || user.username;
                    previewUserTag.textContent = '@' + user.username + (user.discriminator && user.discriminator !== '0' ? '#' + user.discriminator : '');
                    if (user.avatarUrl) {
                        previewAvatarImg.src = user.avatarUrl;
                        previewAvatarImg.style.display = 'block';
                        previewAvatarFallback.style.display = 'none';
                    }
                    previewStatusDot.style.background = 'var(--green)';
                    topStatusDot.className = 'status-dot online';
                    topConnStatus.textContent = 'Connected: ' + (user.globalName || user.username);
                    previewFooterClient.textContent = 'IPC: ' + user.username.toUpperCase();
                    previewFooterUserId.textContent = user.id;
                    if (kyotoRelayStatus) kyotoRelayStatus.textContent = 'ONLINE';
                } else if (connState && connState.isConnected) {
                    previewProfileName.textContent = connState.user || 'Discord User';
                    previewUserTag.textContent = '@connected';
                    topStatusDot.className = 'status-dot online';
                    topConnStatus.textContent = 'Connected to Discord';
                    previewFooterClient.textContent = 'IPC: Connected';
                    previewFooterUserId.textContent = 'Active';
                    if (kyotoRelayStatus) kyotoRelayStatus.textContent = 'ONLINE';
                } else {
                    previewProfileName.textContent = 'Discord Offline';
                    previewUserTag.textContent = '@not-connected';
                    previewAvatarImg.style.display = 'none';
                    previewAvatarFallback.style.display = 'flex';
                    topStatusDot.className = 'status-dot';
                    topConnStatus.textContent = 'Connecting to Discord...';
                    previewFooterClient.textContent = 'IPC: Offline';
                    previewFooterUserId.textContent = '--';
                    if (kyotoRelayStatus) kyotoRelayStatus.textContent = 'CONNECTING';
                }
            }

            function syncPreview() {
                let dVal = detailsInput.value || 'Cooking {fileName}';
                let sVal = stateInput.value || 'Workspace: {workspace}';

                const curFile = showFileName.checked ? (livePreviewData.fileName || 'Cantarella.js') : 'a file';
                const curWs = showWorkspaceName.checked ? (livePreviewData.workspace || 'Pemrograman Web I') : 'Confidential Project';
                const curBranch = showGitBranch.checked ? (livePreviewData.gitBranch || 'main') : '';

                dVal = dVal
                    .replace(/\{fileName\}/g, curFile)
                    .replace(/\{workspace\}/g, curWs)
                    .replace(/\{gitBranch\}/g, curBranch)
                    .replace(/\{lineCount\}/g, livePreviewData.lineCount || '128 lines')
                    .replace(/\{currentLine\}/g, livePreviewData.currentLine || '1')
                    .replace(/\{language\}/g, livePreviewData.language || 'JavaScript');

                sVal = sVal
                    .replace(/\{fileName\}/g, curFile)
                    .replace(/\{workspace\}/g, curWs)
                    .replace(/\{gitBranch\}/g, curBranch)
                    .replace(/\{lineCount\}/g, livePreviewData.lineCount || '128 lines')
                    .replace(/\{currentLine\}/g, livePreviewData.currentLine || '1')
                    .replace(/\{language\}/g, livePreviewData.language || 'JavaScript');

                previewLine1.textContent = dVal;
                previewLine2.textContent = sVal;

                if (showElapsedTime.checked) {
                    previewTimerRow.style.display = 'flex';
                } else {
                    previewTimerRow.style.display = 'none';
                }
            }

            function tickTimer() {
                if (showElapsedTime.checked && realStartTimestamp) {
                    const nowSec = Math.floor(Date.now() / 1000);
                    const diffSec = Math.max(0, nowSec - realStartTimestamp);
                    previewTimerDigits.textContent = formatTime(diffSec);
                    previewTimerRow.style.display = 'flex';
                } else if (!showElapsedTime.checked) {
                    previewTimerRow.style.display = 'none';
                }
            }

            // Tab Switching
            function activateSection(secId) {
                document.querySelectorAll('.setting-section').forEach(sec => {
                    if (sec.dataset.section === secId) {
                        sec.classList.remove('hidden');
                    } else {
                        sec.classList.add('hidden');
                    }
                });
                document.querySelectorAll('.nav-tab-btn').forEach(btn => {
                    if (btn.dataset.section === secId) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            }

            document.querySelectorAll('.nav-tab-btn').forEach(btn => {
                btn.addEventListener('click', () => activateSection(btn.dataset.section));
            });

            // Input listeners
            detailsInput.addEventListener('input', syncPreview);
            stateInput.addEventListener('input', syncPreview);
            showElapsedTime.addEventListener('change', syncPreview);
            showFileName.addEventListener('change', syncPreview);
            showWorkspaceName.addEventListener('change', syncPreview);
            showGitBranch.addEventListener('change', syncPreview);

            // Dynamic Tokens
            tokenButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const token = btn.getAttribute('data-token');
                    const targetId = btn.getAttribute('data-target') || 'detailsEditing';
                    const targetEl = document.getElementById(targetId);
                    if (targetEl) {
                        targetEl.value = targetEl.value + ' ' + token;
                        syncPreview();
                        targetEl.focus();
                    }
                });
            });

            // Quick Offset Buttons
            document.getElementById('btnPlus1').addEventListener('click', () => {
                const cur = parseInt(timerHours.value || '0', 10);
                timerHours.value = cur + 1;
                if (!realStartTimestamp) realStartTimestamp = Math.floor(Date.now() / 1000);
                realStartTimestamp = Math.max(0, realStartTimestamp - 3600);
                tickTimer();
            });

            document.getElementById('btnPlus2').addEventListener('click', () => {
                const cur = parseInt(timerHours.value || '0', 10);
                timerHours.value = cur + 2;
                if (!realStartTimestamp) realStartTimestamp = Math.floor(Date.now() / 1000);
                realStartTimestamp = Math.max(0, realStartTimestamp - 7200);
                tickTimer();
            });

            document.getElementById('btnPlus3').addEventListener('click', () => {
                const curH = parseInt(timerHours.value || '0', 10);
                const curM = parseInt(timerMinutes.value || '0', 10);
                const totalM = curM + 30;
                timerHours.value = curH + 3 + Math.floor(totalM / 60);
                timerMinutes.value = totalM % 60;
                if (!realStartTimestamp) realStartTimestamp = Math.floor(Date.now() / 1000);
                realStartTimestamp = Math.max(0, realStartTimestamp - (3.5 * 3600));
                tickTimer();
            });

            document.getElementById('btnResetTimer').addEventListener('click', () => {
                timerHours.value = 0;
                timerMinutes.value = 0;
                realStartTimestamp = Math.floor(Date.now() / 1000);
                tickTimer();
                vscode.postMessage({ command: 'resetTimer' });
                showStatusBadge('Timer Reset to 00:00');
            });

            document.getElementById('btnApplyTimer').addEventListener('click', () => {
                const totalMinutes = (parseInt(timerHours.value || '0', 10) * 60) + parseInt(timerMinutes.value || '0', 10);
                vscode.postMessage({
                    command: 'applyTimer',
                    settings: {
                        'timer.mode': timerMode.value,
                        'timer.customOffsetMinutes': totalMinutes
                    }
                });
                showStatusBadge('Timer Applied');
            });

            function showStatusBadge(text) {
                saveStatus.textContent = text;
                saveStatus.style.opacity = '1';
                setTimeout(() => {
                    saveStatus.style.opacity = '0';
                }, 2500);
            }

            // Save Changes
            btnSave.addEventListener('click', () => {
                const totalMinutes = (parseInt(timerHours.value || '0', 10) * 60) + parseInt(timerMinutes.value || '0', 10);
                const newSettings = {
                    enabled: document.getElementById('enabled').checked,
                    'appearance.largeImageStyle': document.getElementById('largeImageStyle').value,
                    'appearance.showElapsedTime': showElapsedTime.checked,
                    'timer.mode': timerMode.value,
                    'timer.customOffsetMinutes': totalMinutes,
                    'formatting.detailsEditing': detailsInput.value,
                    'formatting.stateEditing': stateInput.value,
                    'formatting.detailsIdle': document.getElementById('detailsIdle').value,
                    'formatting.stateIdle': document.getElementById('stateIdle').value,
                    'behavior.whenNoFileOpen': document.getElementById('whenNoFileOpen').value,
                    'behavior.idleAction': document.getElementById('idleAction').value,
                    'idleTimeoutSeconds': parseInt(document.getElementById('idleTimeoutSeconds').value || '300', 10),
                    'privacy.showFileName': showFileName.checked,
                    'privacy.showWorkspaceName': showWorkspaceName.checked,
                    'privacy.showGitBranch': showGitBranch.checked,
                    'privacy.showDebugStatus': document.getElementById('showDebugStatus').checked,
                    clientId: document.getElementById('clientId').value.trim()
                };
                vscode.postMessage({ command: 'saveSettings', settings: newSettings });
                showStatusBadge('Settings Saved!');
            });

            // Reset to defaults
            document.getElementById('btnResetDefaults').addEventListener('click', () => {
                vscode.postMessage({ command: 'resetDefaults' });
                showStatusBadge('Defaults Restored');
            });

            // Close
            document.getElementById('topBtnClose').addEventListener('click', () => {
                vscode.postMessage({ command: 'close' });
            });

            // Viewport mode switch
            const btnDetailed = document.getElementById('btnModeDetailed');
            const btnCompact = document.getElementById('btnModeCompact');
            btnDetailed.addEventListener('click', () => {
                btnDetailed.classList.add('active');
                btnCompact.classList.remove('active');
                previewLine2.style.display = 'block';
                if (showElapsedTime.checked) previewTimerRow.style.display = 'flex';
            });

            btnCompact.addEventListener('click', () => {
                btnCompact.classList.add('active');
                btnDetailed.classList.remove('active');
                previewLine2.style.display = 'none';
                previewTimerRow.style.display = 'none';
            });

            // Handle incoming messages from extension
            window.addEventListener('message', event => {
                const message = event.data;
                if (message.command === 'init' && message.settings) {
                    const s = message.settings;
                    if (s.enabled !== undefined) document.getElementById('enabled').checked = Boolean(s.enabled);
                    if (s['formatting.detailsEditing']) detailsInput.value = s['formatting.detailsEditing'];
                    if (s['formatting.stateEditing']) stateInput.value = s['formatting.stateEditing'];
                    if (s['formatting.detailsIdle']) document.getElementById('detailsIdle').value = s['formatting.detailsIdle'];
                    if (s['formatting.stateIdle']) document.getElementById('stateIdle').value = s['formatting.stateIdle'];
                    if (s['appearance.largeImageStyle']) document.getElementById('largeImageStyle').value = s['appearance.largeImageStyle'];
                    if (s['appearance.showElapsedTime'] !== undefined) showElapsedTime.checked = Boolean(s['appearance.showElapsedTime']);
                    if (s['timer.mode']) timerMode.value = s['timer.mode'];
                    if (s['timer.customOffsetMinutes'] !== undefined) {
                        const totalM = parseInt(s['timer.customOffsetMinutes'], 10) || 0;
                        timerHours.value = Math.floor(totalM / 60);
                        timerMinutes.value = totalM % 60;
                    }
                    if (s['behavior.whenNoFileOpen']) document.getElementById('whenNoFileOpen').value = s['behavior.whenNoFileOpen'];
                    if (s['behavior.idleAction']) document.getElementById('idleAction').value = s['behavior.idleAction'];
                    if (s.idleTimeoutSeconds) document.getElementById('idleTimeoutSeconds').value = s.idleTimeoutSeconds;
                    if (s['privacy.showFileName'] !== undefined) showFileName.checked = Boolean(s['privacy.showFileName']);
                    if (s['privacy.showWorkspaceName'] !== undefined) showWorkspaceName.checked = Boolean(s['privacy.showWorkspaceName']);
                    if (s['privacy.showGitBranch'] !== undefined) showGitBranch.checked = Boolean(s['privacy.showGitBranch']);
                    if (s['privacy.showDebugStatus'] !== undefined) document.getElementById('showDebugStatus').checked = Boolean(s['privacy.showDebugStatus']);
                    if (s.clientId) document.getElementById('clientId').value = s.clientId;

                    if (message.previewData) {
                        livePreviewData = Object.assign(livePreviewData, message.previewData);
                        if (livePreviewData.language) {
                            previewBadgeIcon.textContent = getLangBadge(livePreviewData.language);
                        }
                        if (livePreviewData.startTimestamp) {
                            realStartTimestamp = livePreviewData.startTimestamp;
                        }
                    }

                    if (message.currentPresence && message.currentPresence.startTimestamp) {
                        realStartTimestamp = message.currentPresence.startTimestamp;
                    }

                    updateDiscordAccount(message.discordUser, message.connectionState);
                    syncPreview();
                    tickTimer();
                } else if (message.command === 'liveUpdate') {
                    if (message.discordUser) {
                        updateDiscordAccount(message.discordUser);
                    }
                    if (message.previewData) {
                        livePreviewData = Object.assign(livePreviewData, message.previewData);
                        if (livePreviewData.language) {
                            previewBadgeIcon.textContent = getLangBadge(livePreviewData.language);
                        }
                        if (livePreviewData.startTimestamp) {
                            realStartTimestamp = livePreviewData.startTimestamp;
                        }
                    }
                    if (message.presence && message.presence.startTimestamp) {
                        realStartTimestamp = message.presence.startTimestamp;
                    }
                    syncPreview();
                    tickTimer();
                } else if (message.command === 'connectionUpdate') {
                    updateDiscordAccount(message.discordUser, message.connectionState);
                } else if (message.command === 'actionResult') {
                    showStatusBadge(message.ok ? (message.message || 'Updated') : 'Error occurred');
                }
            });

            // Ambient 1-second timer tick
            setInterval(tickTimer, 1000);

            // Escape key to close
            document.addEventListener('keydown', e => {
                if (e.key === 'Escape') vscode.postMessage({ command: 'close' });
            });

            // Ready
            syncPreview();
            vscode.postMessage({ command: 'ready' });
        })();
    </script>
</body>
</html>`;
}
//# sourceMappingURL=settingsModalWebviewHtml.js.map