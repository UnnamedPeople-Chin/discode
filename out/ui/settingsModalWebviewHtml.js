"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSettingsModalWebviewHtml = getSettingsModalWebviewHtml;
function getSettingsModalWebviewHtml() {
    return String.raw `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Discord Presence Settings</title>
    <style>
        :root {
            /* Reference direction: desktop-app settings modal, near-black surfaces, violet action state. */
            --canvas: #050505;
            --modal: #090909;
            --sidebar: #0d0d0e;
            --surface: #111112;
            --surface-hover: #171719;
            --surface-input: #151516;
            --discord-card: #2b2d31;
            --discord-card-soft: #383a40;
            --line: rgba(255, 255, 255, 0.12);
            --line-soft: rgba(255, 255, 255, 0.08);
            --text: #f3f3f4;
            --text-soft: #b6b6bd;
            --text-muted: #85858d;
            --accent: #9b4dff;
            --accent-bright: #b979ff;
            --accent-soft: rgba(155, 77, 255, 0.16);
            --success: #57d38c;
            --danger: #ff7474;
            --font: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
            --radius-sm: 8px;
            --radius-md: 12px;
            --radius-lg: 18px;
            --radius-xl: 22px;
        }

        * { box-sizing: border-box; }
        html, body { width: 100%; height: 100%; min-width: 0; min-height: 0; overflow: hidden; }
        html { background: var(--canvas); }
        body {
            margin: 0;
            height: 100%;
            overflow: hidden;
            background: rgba(0, 0, 0, 0.86);
            color: var(--text);
            font-family: var(--font);
            font-size: 14px;
            line-height: 1.45;
        }

        body,
        button,
        input,
        select { font-family: var(--font); }

        button,
        input,
        select { font-size: inherit; }
        button { color: inherit; }
        button:focus-visible,
        input:focus-visible,
        select:focus-visible {
            outline: 2px solid var(--accent-bright);
            outline-offset: 2px;
        }

        .modal-stage {
            display: grid;
            place-items: center;
            width: 100vw;
            height: 100%;
            min-height: 0;
            padding: 14px clamp(10px, 3vw, 36px);
        }

        .settings-modal {
            display: grid;
            grid-template-columns: 248px minmax(390px, 1fr) minmax(330px, 0.78fr);
            width: min(1280px, 100%);
            height: min(790px, 100%);
            max-height: 100%;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: var(--radius-xl);
            background: var(--modal);
            box-shadow: 0 26px 80px rgba(0, 0, 0, 0.58);
        }

        .settings-sidebar {
            display: flex;
            flex-direction: column;
            min-width: 0;
            padding: 24px 14px 18px;
            border-right: 1px solid var(--line-soft);
            background: var(--sidebar);
        }

        .settings-title {
            padding: 0 14px 22px;
            color: var(--text);
            font-size: 20px;
            font-weight: 750;
            letter-spacing: -0.03em;
        }

        .settings-nav {
            display: grid;
            gap: 4px;
        }

        .nav-button {
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;
            min-height: 44px;
            padding: 9px 13px;
            border: 1px solid transparent;
            border-radius: 10px;
            background: transparent;
            color: var(--text-soft);
            cursor: pointer;
            text-align: left;
            transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease;
        }

        .nav-button:hover { background: rgba(255, 255, 255, 0.06); color: var(--text); }
        .nav-button.is-active {
            border-color: rgba(155, 77, 255, 0.45);
            background: var(--accent-soft);
            color: var(--text);
        }

        .nav-button.is-active .nav-icon { color: var(--accent-bright); }
        .nav-icon { display: grid; place-items: center; width: 20px; height: 20px; color: var(--text-muted); }
        .nav-icon svg,
        .section-icon svg,
        .header-icon svg,
        .button-icon svg,
        .hint-icon svg,
        .close-button svg,
        .preview-label svg {
            width: 18px;
            height: 18px;
            fill: none;
            stroke: currentColor;
            stroke-width: 1.75;
            stroke-linecap: round;
            stroke-linejoin: round;
        }

        .sidebar-footer {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: auto;
            padding: 18px 14px 0;
            border-top: 1px solid var(--line-soft);
            color: var(--text-muted);
            font-size: 12px;
        }

        .sidebar-footer strong { color: var(--text-soft); font-weight: 600; }

        .settings-main {
            display: flex;
            flex-direction: column;
            min-width: 0;
            min-height: 0;
            background: var(--modal);
        }

        kbd {
            padding: 4px 7px;
            border: 1px solid #424245;
            border-radius: 6px;
            background: #18181a;
            color: var(--text-soft);
            font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
            font-size: 11px;
        }

        .main-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            min-height: 74px;
            padding: 17px 24px 15px;
            border-bottom: 1px solid var(--line-soft);
        }

        .main-header h1 { margin: 0; color: var(--text); font-size: 17px; line-height: 1.2; }
        .main-header p { margin: 3px 0 0; color: var(--text-muted); font-size: 12px; }

        .header-actions { display: flex; align-items: center; gap: 8px; flex: 0 0 auto; }

        .language-picker {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            min-height: 36px;
            padding: 0 10px;
            border: 1px solid var(--line-soft);
            border-radius: 8px;
            background: var(--surface-input);
            color: var(--text-soft);
        }

        .language-picker:hover { border-color: #646468; color: var(--text); }
        .language-picker select { min-width: 94px; border: 0; outline: 0; background: transparent; color: inherit; cursor: pointer; font-size: 12px; }
        .language-picker option { background: var(--surface-input); color: var(--text); }
        .language-flag { position: relative; display: block; width: 18px; height: 12px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 2px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25); }
        .language-flag.flag-en { background: repeating-linear-gradient(0deg, #c8102e 0 2px, #fff 2px 4px); }
        .language-flag.flag-en::before { content: ""; position: absolute; inset: 0 auto auto 0; width: 8px; height: 7px; background: #012169; }
        .language-flag.flag-id { background: linear-gradient(#e31d3b 0 50%, #fff 50%); }
        .language-flag.flag-ja { background: #fff; }
        .language-flag.flag-ja::after { content: ""; position: absolute; top: 2px; left: 6px; width: 6px; height: 6px; border-radius: 50%; background: #bc002d; }
        .language-flag.flag-es { background: linear-gradient(#aa151b 0 25%, #f1bf00 25% 75%, #aa151b 75%); }

        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        .close-button {
            display: grid;
            place-items: center;
            flex: 0 0 auto;
            width: 36px;
            height: 36px;
            border: 1px solid transparent;
            border-radius: 8px;
            background: transparent;
            color: var(--text-soft);
            cursor: pointer;
        }

        .close-button:hover { border-color: var(--line); background: var(--surface-hover); color: var(--text); }

        .main-scroll {
            flex: 1;
            min-height: 0;
            overflow: auto;
            padding: 24px 28px 26px;
            scrollbar-color: #454548 transparent;
            scrollbar-width: thin;
        }

        .setting-view { display: none; max-width: 640px; margin: 0 auto; }
        .setting-view.is-active { display: block; animation: view-in 150ms ease-out; }
        @keyframes view-in { from { opacity: 0.55; transform: translateY(3px); } to { opacity: 1; transform: translateY(0); } }

        .view-heading { margin-bottom: 22px; }
        .view-heading h2 { margin: 0; color: var(--text); font-size: 19px; letter-spacing: -0.025em; }
        .view-heading p { max-width: 58ch; margin: 5px 0 0; color: var(--text-muted); font-size: 13px; }

        .setting-card {
            overflow: hidden;
            margin-bottom: 22px;
            border: 1px solid var(--line);
            border-radius: 16px;
            background: var(--surface);
        }

        .setting-card-title {
            padding: 17px 19px 13px;
            color: var(--text-muted);
            font-size: 11px;
            font-weight: 750;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        .setting-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            min-height: 76px;
            padding: 15px 19px;
            border-top: 1px solid var(--line-soft);
        }

        .setting-row:first-of-type { border-top: 0; }
        .setting-row.is-stack { display: block; }
        .setting-copy { min-width: 0; }
        .setting-label { display: block; color: var(--text); font-size: 14px; font-weight: 650; }
        .setting-description { max-width: 55ch; margin-top: 4px; color: var(--text-muted); font-size: 12px; line-height: 1.45; }

        .control,
        input.control,
        select.control {
            width: 240px;
            min-height: 40px;
            padding: 8px 12px;
            border: 1px solid #424245;
            border-radius: 999px;
            background: var(--surface-input);
            color: var(--text);
        }

        .control:hover { border-color: #646468; }
        select.control { cursor: pointer; }
        input.control { border-radius: 9px; }
        .setting-row.is-stack input.control { width: 100%; margin-top: 12px; }

        .toggle {
            position: relative;
            display: block;
            flex: 0 0 auto;
            width: 42px;
            height: 24px;
        }

        .toggle input { position: absolute; width: 1px; height: 1px; opacity: 0; }
        .toggle-track {
            position: absolute;
            inset: 0;
            display: block;
            border: 1px solid #424245;
            border-radius: 999px;
            background: #242426;
        }

        .toggle-track::after {
            content: "";
            position: absolute;
            top: 3px;
            left: 3px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #bfc0c6;
            transition: transform 150ms ease, background-color 150ms ease;
        }

        .toggle input:checked + .toggle-track { border-color: var(--accent); background: var(--accent); }
        .toggle input:checked + .toggle-track::after { transform: translateX(18px); background: #fff; }
        .toggle input:focus-visible + .toggle-track { outline: 2px solid var(--accent-bright); outline-offset: 2px; }

        .button-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
        .button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            min-height: 40px;
            padding: 8px 13px;
            border: 1px solid #424245;
            border-radius: 9px;
            background: var(--surface-input);
            color: var(--text-soft);
            cursor: pointer;
            font-size: 12px;
            font-weight: 650;
        }

        .button:hover:not(:disabled) { border-color: #6b6b70; color: var(--text); }
        .button.primary { border-color: var(--accent); background: var(--accent); color: #0b0314; }
        .button.primary:hover:not(:disabled) { border-color: var(--accent-bright); background: var(--accent-bright); }
        .button:disabled { cursor: default; opacity: 0.42; }
        .button-icon { display: grid; place-items: center; }
        .button-icon svg { width: 15px; height: 15px; }

        .token-list { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
        .token {
            min-height: 32px;
            padding: 5px 9px;
            border: 1px solid #444448;
            border-radius: 7px;
            background: #19191b;
            color: var(--text-soft);
            cursor: pointer;
            font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
            font-size: 11px;
        }

        .token:hover { border-color: var(--accent); background: var(--accent-soft); color: var(--text); }

        .hint-box {
            display: flex;
            align-items: flex-start;
            gap: 9px;
            margin-top: 14px;
            padding: 12px 13px;
            border: 1px solid var(--line-soft);
            border-radius: 10px;
            color: var(--text-muted);
            font-size: 12px;
        }

        .hint-icon { display: grid; place-items: center; flex: 0 0 auto; color: var(--accent-bright); }
        .hint-icon svg { width: 15px; height: 15px; }
        .action-status { min-height: 18px; margin-top: 12px; color: var(--text-muted); font-size: 12px; }
        .action-status[data-state="success"] { color: var(--success); }
        .action-status[data-state="error"] { color: var(--danger); }

        .settings-preview {
            display: flex;
            flex-direction: column;
            min-width: 0;
            min-height: 0;
            padding: 22px 20px 18px;
            border-left: 1px solid var(--line-soft);
            background: #0b0b0c;
        }

        .preview-label {
            display: flex;
            align-items: center;
            gap: 9px;
            min-height: 26px;
            color: var(--text-muted);
            font-size: 11px;
            font-weight: 750;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        .preview-label .status { display: inline-flex; align-items: center; gap: 5px; color: var(--text-soft); font-weight: 600; letter-spacing: 0; text-transform: none; }
        .status-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--text-muted); }
        .preview-label[data-state="ready"] .status-dot { background: var(--success); }
        .preview-label[data-state="ready"] .status { color: var(--success); }
        .preview-label[data-state="error"] .status-dot { background: var(--danger); }
        .preview-label[data-state="error"] .status { color: var(--danger); }

        .preview-heading { margin: 10px 0 12px; color: var(--text-muted); font-size: 12px; }
        .discord-card-wrap { min-width: 0; }
        .discord-profile-card {
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            background: #1e1f22;
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.22);
            transition: opacity 150ms ease, filter 150ms ease;
        }

        .discord-profile-card.is-disabled { opacity: 0.62; filter: saturate(0.55); }

        .discord-banner {
            position: relative;
            height: 82px;
            background: linear-gradient(135deg, #3c2b61 0%, #6950af 52%, #3b315e 100%);
        }

        .discord-avatar {
            position: absolute;
            bottom: -22px;
            left: 17px;
            display: grid;
            place-items: center;
            width: 62px;
            height: 62px;
            border: 5px solid var(--discord-card);
            border-radius: 50%;
            background: radial-gradient(circle at 35% 30%, #8c68ff, #cf5fce 52%, #4a3b92);
            color: #fff;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 0.03em;
        }

        .discord-avatar::after {
            content: "";
            position: absolute;
            right: -1px;
            bottom: -1px;
            width: 13px;
            height: 13px;
            border: 3px solid var(--discord-card);
            border-radius: 50%;
            background: var(--success);
        }

        .discord-card-body { padding: 39px 15px 15px; }
        .discord-name { color: #fff; font-size: 16px; font-weight: 750; }
        .discord-handle { color: #c1c2c8; font-size: 11px; margin-top: 2px; }
        .discord-badges { display: flex; align-items: center; gap: 4px; margin-top: 9px; }
        .discord-badge { display: grid; place-items: center; width: 20px; height: 20px; border-radius: 5px; background: #383a40; color: #c9b7ff; font-size: 10px; font-weight: 800; }
        .discord-bio { margin: 10px 0 0; color: #e0e1e5; font-size: 11px; line-height: 1.35; }
        .discord-divider { height: 1px; margin: 14px 0; background: rgba(255, 255, 255, 0.1); }
        .discord-section-label { color: #d4d5d9; font-size: 10px; font-weight: 800; letter-spacing: 0.07em; text-transform: uppercase; }

        .discord-activity {
            display: grid;
            grid-template-columns: 58px minmax(0, 1fr);
            gap: 11px;
            margin-top: 11px;
            padding: 11px;
            border-radius: 9px;
            background: var(--discord-card-soft);
        }

        .discord-image {
            display: grid;
            place-items: center;
            width: 58px;
            height: 58px;
            border-radius: 8px;
            background: #23252a;
            color: #bfb4ff;
            font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
            font-size: 15px;
            font-weight: 800;
            transition: opacity 150ms ease, background-color 150ms ease;
        }

        .discord-app-row { display: flex; align-items: center; gap: 6px; min-width: 0; }
        .discord-app-icon { display: grid; place-items: center; width: 18px; height: 18px; border-radius: 5px; background: #5665a7; color: #fff; font-size: 7px; font-weight: 800; transition: background-color 150ms ease; }
        .discord-app-name { overflow: hidden; color: #fff; font-size: 11px; font-weight: 750; text-overflow: ellipsis; white-space: nowrap; }
        .discord-details { overflow: hidden; margin-top: 6px; color: #fff; font-size: 13px; font-weight: 700; text-overflow: ellipsis; white-space: nowrap; }
        .discord-state { overflow: hidden; margin-top: 2px; color: #d2d3d7; font-size: 11px; text-overflow: ellipsis; white-space: nowrap; }
        .discord-elapsed { margin-top: 6px; color: #bfc0c6; font-size: 10px; font-variant-numeric: tabular-nums; }
        .discord-disabled { margin-top: 10px; color: #bfc0c6; font-size: 11px; }

        .member-heading { margin: 22px 0 9px; color: #c8c9ce; font-size: 10px; font-weight: 800; letter-spacing: 0.07em; text-transform: uppercase; }
        .member-row { display: flex; align-items: center; gap: 9px; padding: 9px 10px; border-radius: 8px; background: var(--discord-card-soft); }
        .member-avatar { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #a55dff, #5d6fff); color: #fff; font-size: 10px; font-weight: 800; }
        .member-name { color: #fff; font-size: 12px; font-weight: 750; }
        .member-state { color: #bfc0c6; font-size: 10px; }

        .preview-note { margin-top: 12px; color: var(--text-muted); font-size: 11px; line-height: 1.45; }
        .preview-footer { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: auto; padding-top: 18px; }
        .preview-footer .button { border: 0; background: transparent; padding-left: 0; color: var(--text-soft); }
        .preview-footer .button:hover { background: transparent; color: var(--text); }

        .main-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            min-height: 70px;
            padding: 12px 24px;
            border-top: 1px solid var(--line-soft);
            background: #0c0c0d;
        }

        .footer-status { min-width: 0; color: var(--text-muted); font-size: 12px; }
        .footer-status strong { display: block; color: var(--text-soft); font-size: 12px; }
        .footer-actions { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; }

        @media (max-width: 1100px) {
            .settings-modal { grid-template-columns: 210px minmax(360px, 1fr) 300px; }
            .settings-sidebar { padding-inline: 10px; }
            .main-scroll { padding-inline: 20px; }
        }

        @media (max-width: 860px) {
            html, body { height: auto; min-height: 100%; overflow: auto; }
            body { overflow: auto; }
            .modal-stage { display: block; width: 100%; height: auto; min-height: 100vh; padding: 0; overflow-x: hidden; }
            .settings-modal { grid-template-columns: 190px minmax(0, 1fr); width: 100%; max-width: 100%; min-height: 100vh; height: auto; border: 0; border-radius: 0; }
            .settings-preview { display: none; }
        }

        @media (max-width: 560px) {
            .settings-modal { display: block; width: 100%; max-width: 100%; min-width: 0; }
            .settings-sidebar,
            .settings-main { width: 100%; max-width: 100%; min-width: 0; }
            .settings-sidebar { padding: 14px 12px 12px; border-right: 0; border-bottom: 1px solid var(--line-soft); }
            .settings-title { padding: 5px 8px 12px; font-size: 18px; }
            .settings-nav { width: 100%; grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .nav-button { min-height: 42px; justify-content: center; gap: 6px; padding: 7px 5px; font-size: 11px; }
            .nav-button .nav-icon { width: 17px; height: 17px; }
            .sidebar-footer { display: none; }
            .main-header { padding-inline: 16px; }
            .main-scroll { padding: 20px 14px 24px; }
            .setting-row { align-items: flex-start; flex-direction: column; gap: 11px; padding: 14px; }
            .control, input.control, select.control { width: 100%; }
            .main-footer { align-items: stretch; flex-direction: column; padding: 13px 16px; }
            .footer-actions { justify-content: stretch; }
            .footer-actions .button { flex: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; scroll-behavior: auto !important; }
        }
    </style>
</head>
<body>
    <div class="modal-stage">
        <div class="settings-modal" role="dialog" aria-modal="true" aria-labelledby="settings-heading">
            <aside class="settings-sidebar">
                <div class="settings-title" data-i18n="app.settings">Settings</div>
                <nav class="settings-nav" aria-label="Settings sections">
                    <button class="nav-button" type="button" data-section="general"><span class="nav-icon" data-icon="settings" aria-hidden="true"></span><span data-i18n="nav.general">General</span></button>
                    <button class="nav-button" type="button" data-section="appearance"><span class="nav-icon" data-icon="palette" aria-hidden="true"></span><span data-i18n="nav.appearance">Appearance</span></button>
                    <button class="nav-button" type="button" data-section="activity"><span class="nav-icon" data-icon="activity" aria-hidden="true"></span><span data-i18n="nav.activity">Activity</span></button>
                    <button class="nav-button" type="button" data-section="behavior"><span class="nav-icon" data-icon="route" aria-hidden="true"></span><span data-i18n="nav.behavior">Behavior</span></button>
                    <button class="nav-button" type="button" data-section="privacy"><span class="nav-icon" data-icon="shield" aria-hidden="true"></span><span data-i18n="nav.privacy">Privacy</span></button>
                    <button class="nav-button is-active" type="button" data-section="discord"><span class="nav-icon" data-icon="discord" aria-hidden="true"></span><span data-i18n="nav.discord">Discord</span></button>
                </nav>
                <div class="sidebar-footer"><span>v1.2.0</span><strong data-i18n="app.richPresence">Rich Presence</strong></div>
            </aside>

            <main class="settings-main">
                <header class="main-header">
                    <div><h1 id="settings-heading">Discord</h1><p id="section-description">How your Rich Presence card looks.</p></div>
                    <div class="header-actions">
                        <label class="language-picker">
                            <span class="language-flag flag-en" id="languageFlag" aria-hidden="true"></span>
                            <span class="sr-only" data-i18n="language.label">Language</span>
                            <select id="languageSelect" aria-label="Language" data-i18n-aria="language.label">
                                <option value="en">English</option>
                                <option value="id">Bahasa Indonesia</option>
                                <option value="ja">日本語</option>
                                <option value="es">Español</option>
                            </select>
                        </label>
                        <button class="close-button" id="btnClose" type="button" aria-label="Close settings" data-i18n-aria="closeSettings"><span data-icon="close" aria-hidden="true"></span></button>
                    </div>
                </header>

                <div class="main-scroll">
                    <section class="setting-view" data-view="general">
                        <div class="view-heading"><h2 data-i18n="view.general">General</h2><p data-i18n="view.generalDescription">Connection details and shortcuts for this workspace.</p></div>
                        <div class="setting-card">
                            <div class="setting-card-title" data-i18n="card.extension">Extension</div>
                            <div class="setting-row"><div class="setting-copy"><span class="setting-label" data-i18n="general.presence">Discord Rich Presence</span><span class="setting-description" data-i18n="general.presenceDescription">Show your coding activity on Discord through local IPC.</span></div><span class="header-icon" data-icon="discord" aria-hidden="true"></span></div>
                            <div class="setting-row"><div class="setting-copy"><span class="setting-label" data-i18n="general.openSettings">Open settings</span><span class="setting-description" data-i18n="general.openSettingsDescription">Use the Command Palette or press Ctrl + Alt + D anytime.</span></div><kbd>Ctrl + Alt + D</kbd></div>
                        </div>
                        <div class="hint-box"><span class="hint-icon" data-icon="info" aria-hidden="true"></span><span data-i18n="general.saveHint">Changes are saved to VS Code settings when you click Save changes.</span></div>
                    </section>

                    <section class="setting-view" data-view="appearance">
                        <div class="view-heading"><h2 data-i18n="view.appearance">Appearance</h2><p data-i18n="view.appearanceDescription">Choose how icons and time appear on your Rich Presence card.</p></div>
                        <div class="setting-card">
                            <div class="setting-card-title" data-i18n="card.presenceCard">Presence card</div>
                            <div class="setting-row"><div class="setting-copy"><span class="setting-label" data-i18n="appearance.mainIcon">Main icon</span><span class="setting-description" data-i18n="appearance.mainIconDescription">Use the file or language icon as the large Discord image.</span></div><select class="control" id="largeImageStyle"><option value="fileIcon" data-i18n-option="image.fileIcon">File or language</option><option value="editorIcon" data-i18n-option="image.editorIcon">Visual Studio Code logo</option></select></div>
                            <label class="setting-row" for="showElapsedTime"><span class="setting-copy"><span class="setting-label" data-i18n="appearance.showDuration">Show elapsed time</span><span class="setting-description" data-i18n="appearance.showDurationDescription">Show your active coding time on Discord.</span></span><span class="toggle"><input id="showElapsedTime" type="checkbox" checked><span class="toggle-track"></span></span></label>
                        </div>
                    </section>

                    <section class="setting-view" data-view="activity">
                        <div class="view-heading"><h2 data-i18n="view.activity">Activity text</h2><p data-i18n="view.activityDescription">Set the text Discord shows while you edit a file.</p></div>
                        <div class="setting-card">
                            <div class="setting-card-title" data-i18n="card.editingState">Editing state</div>
                            <div class="setting-row is-stack"><label class="setting-label" for="detailsEditing" data-i18n="activity.detailsLabel">Details line</label><span class="setting-description" data-i18n="activity.detailsDescription">Example: Editing App.tsx</span><input class="control" id="detailsEditing" type="text" value="Editing {fileName}" autocomplete="off"><div class="token-list"><button class="token" type="button" data-input="detailsEditing" data-token="{fileName}">{fileName}</button><button class="token" type="button" data-input="detailsEditing" data-token="{language}">{language}</button><button class="token" type="button" data-input="detailsEditing" data-token="{workspace}">{workspace}</button><button class="token" type="button" data-input="detailsEditing" data-token="{gitBranch}">{gitBranch}</button></div></div>
                            <div class="setting-row is-stack"><label class="setting-label" for="stateEditing" data-i18n="activity.stateLabel">State line</label><span class="setting-description" data-i18n="activity.stateDescription">Example: Workspace: project-name</span><input class="control" id="stateEditing" type="text" value="Workspace: {workspace}" autocomplete="off"><div class="token-list"><button class="token" type="button" data-input="stateEditing" data-token="{workspace}">{workspace}</button><button class="token" type="button" data-input="stateEditing" data-token="{lineCount}">{lineCount}</button><button class="token" type="button" data-input="stateEditing" data-token="{currentLine}">{currentLine}</button><button class="token" type="button" data-input="stateEditing" data-token="{gitBranch}">{gitBranch}</button></div></div>
                        </div>
                    </section>

                    <section class="setting-view" data-view="behavior">
                        <div class="view-heading"><h2 data-i18n="view.behavior">Behavior</h2><p data-i18n="view.behaviorDescription">Choose what happens when files close or the editor is idle.</p></div>
                        <div class="setting-card">
                            <div class="setting-card-title" data-i18n="card.editorChanges">When the editor changes</div>
                            <div class="setting-row"><div class="setting-copy"><label class="setting-label" for="whenNoFileOpen" data-i18n="behavior.noFileLabel">No file is open</label><span class="setting-description" data-i18n="behavior.noFileDescription">Choose the status that replaces the last file.</span></div><select class="control" id="whenNoFileOpen"><option value="keepLastFile" data-i18n-option="behavior.keepLastFile">Keep last file</option><option value="showWorkspace" data-i18n-option="behavior.showWorkspace">Show workspace</option><option value="idle" data-i18n-option="behavior.showIdle">Show idle status</option><option value="clear" data-i18n-option="behavior.clearPresence">Clear presence</option></select></div>
                            <div class="setting-row"><div class="setting-copy"><label class="setting-label" for="idleAction" data-i18n="behavior.idleLabel">When idle</label><span class="setting-description" data-i18n="behavior.idleDescription">Choose what happens after the idle timeout.</span></div><select class="control" id="idleAction"><option value="showIdle" data-i18n-option="behavior.showIdle">Show idle status</option><option value="keepFile" data-i18n-option="behavior.keepFile">Keep active file</option><option value="clear" data-i18n-option="behavior.clearPresence">Clear presence</option></select></div>
                            <div class="setting-row"><div class="setting-copy"><label class="setting-label" for="idleTimeoutSeconds" data-i18n="behavior.timeoutLabel">Idle timeout</label><span class="setting-description" data-i18n="behavior.timeoutDescription">At least 30 seconds before idle status starts.</span></div><input class="control" id="idleTimeoutSeconds" type="number" min="30" max="86400" value="300" inputmode="numeric"></div>
                        </div>
                    </section>

                    <section class="setting-view" data-view="privacy">
                        <div class="view-heading"><h2 data-i18n="view.privacy">Privacy</h2><p data-i18n="view.privacyDescription">Choose which workspace details can appear on Discord.</p></div>
                        <div class="setting-card">
                            <div class="setting-card-title" data-i18n="card.activityDetails">Activity details</div>
                            <label class="setting-row" for="showFileName"><span class="setting-copy"><span class="setting-label" data-i18n="privacy.fileName">File name</span><span class="setting-description" data-i18n="privacy.fileNameDescription">Allow the active file name in your presence.</span></span><span class="toggle"><input id="showFileName" type="checkbox" checked><span class="toggle-track"></span></span></label>
                            <label class="setting-row" for="showWorkspaceName"><span class="setting-copy"><span class="setting-label" data-i18n="privacy.workspaceName">Workspace name</span><span class="setting-description" data-i18n="privacy.workspaceNameDescription">Allow the project name in your presence.</span></span><span class="toggle"><input id="showWorkspaceName" type="checkbox" checked><span class="toggle-track"></span></span></label>
                            <label class="setting-row" for="showGitBranch"><span class="setting-copy"><span class="setting-label" data-i18n="privacy.gitBranch">Git branch</span><span class="setting-description" data-i18n="privacy.gitBranchDescription">Show the active branch from the Git repository.</span></span><span class="toggle"><input id="showGitBranch" type="checkbox"><span class="toggle-track"></span></span></label>
                            <label class="setting-row" for="showDebugStatus"><span class="setting-copy"><span class="setting-label" data-i18n="privacy.debugStatus">Debug status</span><span class="setting-description" data-i18n="privacy.debugStatusDescription">Allow a debug session to replace the editing status.</span></span><span class="toggle"><input id="showDebugStatus" type="checkbox" checked><span class="toggle-track"></span></span></label>
                        </div>
                    </section>

                    <section class="setting-view is-active" data-view="discord">
                        <div class="view-heading"><h2 data-i18n="view.discord">Discord</h2><p data-i18n="view.discordDescription">How your Rich Presence card looks.</p></div>
                        <div class="setting-card">
                            <div class="setting-card-title" data-i18n="card.richPresence">Rich Presence</div>
                            <label class="setting-row" for="presenceEnabled"><span class="setting-copy"><span class="setting-label" data-i18n="discord.presence">Rich Presence</span><span class="setting-description" data-i18n="discord.presenceDescription">Show your coding activity on your Discord profile.</span></span><span class="toggle"><input id="presenceEnabled" type="checkbox" checked><span class="toggle-track"></span></span></label>
                            <label class="setting-row" for="showElapsedTimeDiscord"><span class="setting-copy"><span class="setting-label" data-i18n="discord.showElapsed">Show elapsed time</span><span class="setting-description" data-i18n="discord.showElapsedDescription">Keep a timer visible while you work on a file.</span></span><span class="toggle"><input id="showElapsedTimeDiscord" type="checkbox" checked><span class="toggle-track"></span></span></label>
                            <div class="setting-row"><div class="setting-copy"><label class="setting-label" for="timerMode" data-i18n="discord.timerMode">Timer mode</label><span class="setting-description" data-i18n="discord.timerModeDescription">Choose when the timer starts.</span></div><select class="control" id="timerMode"><option value="session" data-i18n-option="timer.session">VS Code session</option><option value="file" data-i18n-option="timer.file">Reset when switching files</option><option value="manual" data-i18n-option="timer.manual">Manual</option></select></div>
                            <div class="setting-row"><div class="setting-copy"><span class="setting-label" data-i18n="discord.initialDuration">Initial duration</span><span class="setting-description" data-i18n="discord.initialDurationDescription">Add previous coding time to the timer.</span></div><div style="display:flex;gap:8px;width:240px"><input class="control" id="timerHours" type="number" min="0" max="999" value="0" aria-label="Initial hours"><input class="control" id="timerMinutes" type="number" min="0" max="59" value="0" aria-label="Initial minutes"></div></div>
                            <div class="setting-row"><div class="setting-copy"><span class="setting-label" data-i18n="discord.timerActions">Timer actions</span><span class="setting-description" data-i18n="discord.timerActionsDescription">Reset or apply the timer without saving other changes.</span></div><div class="button-row" style="margin-top:0"><button class="button" id="btnResetTimer" type="button"><span class="button-icon" data-icon="reset" aria-hidden="true"></span><span data-i18n="button.reset">Reset</span></button><button class="button" id="btnApplyTimer" type="button"><span class="button-icon" data-icon="clock" aria-hidden="true"></span><span data-i18n="button.apply">Apply</span></button></div></div>
                        </div>
                    </section>

                    <div class="action-status" id="actionStatus" role="status" aria-live="polite"></div>
                </div>
                <footer class="main-footer">
                    <div class="footer-status"><strong id="changeTitle" data-i18n="footer.noChanges">No unsaved changes</strong><span id="saveStatus" data-i18n="footer.notSaved">Your changes are saved when you click Save changes.</span></div>
                    <div class="footer-actions"><button class="button" id="btnResetDefaults" type="button"><span class="button-icon" data-icon="reset" aria-hidden="true"></span><span data-i18n="button.resetDefaults">Reset to defaults</span></button><button class="button primary" id="btnSave" type="button" disabled><span class="button-icon" data-icon="save" aria-hidden="true"></span><span data-i18n="button.save">Save changes</span></button></div>
                </footer>
            </main>

            <aside class="settings-preview" aria-label="Discord preview">
                <div class="preview-label" id="previewStatus" data-state="loading"><span data-i18n="preview.label">PREVIEW</span><span class="status"><span class="status-dot" aria-hidden="true"></span><span id="previewStatusText">Waiting for VS Code</span></span></div>
                <div class="preview-heading" data-i18n="preview.profileCard">Profile card</div>
                <div class="discord-card-wrap">
                    <div class="discord-profile-card" id="discordProfileCard">
                        <div class="discord-banner"><div class="discord-avatar" id="discordAvatar">VS</div></div>
                        <div class="discord-card-body">
                            <div class="discord-name">Alexios Mercer</div>
                            <div class="discord-handle">evrt. · UnnamedPeople™</div>
                            <div class="discord-badges"><span class="discord-badge">✦</span><span class="discord-badge">✚</span><span class="discord-badge">◆</span></div>
                            <p class="discord-bio">I'm out here coding and building what comes next.</p>
                            <div class="discord-divider"></div>
                            <div class="discord-section-label" data-i18n="preview.playing">Playing Visual Studio Code</div>
                            <div class="discord-activity">
                                <div class="discord-image" id="previewImage">TS</div>
                                <div>
                                    <div class="discord-app-row"><div class="discord-app-icon" id="previewAppIcon">VS</div><div class="discord-app-name">Visual Studio Code</div></div>
                                    <div class="discord-details" id="previewDetails">Editing App.tsx</div>
                                    <div class="discord-state" id="previewState">Workspace: current project</div>
                                    <div class="discord-elapsed" id="previewElapsed">00:42 elapsed</div>
                                </div>
                            </div>
                            <div class="discord-disabled" id="previewDisabledMessage" data-i18n="preview.presenceOff" hidden>Rich Presence is off</div>
                        </div>
                    </div>
                </div>
                <div class="preview-note" data-i18n="preview.note">This card follows the active editor and the settings you are changing.</div>
                <div class="preview-footer"><button class="button" id="btnResetPreview" type="button"><span class="button-icon" data-icon="reset" aria-hidden="true"></span><span data-i18n="button.resetPreview">Reset preview</span></button></div>
            </aside>
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        const formIds = ['presenceEnabled', 'largeImageStyle', 'showElapsedTime', 'showElapsedTimeDiscord', 'timerMode', 'timerHours', 'timerMinutes', 'detailsEditing', 'stateEditing', 'whenNoFileOpen', 'idleAction', 'idleTimeoutSeconds', 'showFileName', 'showWorkspaceName', 'showGitBranch', 'showDebugStatus'];
        const english = {
            'app.settings': 'Settings', 'app.richPresence': 'Rich Presence',
            'nav.general': 'General', 'nav.appearance': 'Appearance', 'nav.activity': 'Activity', 'nav.behavior': 'Behavior', 'nav.privacy': 'Privacy', 'nav.discord': 'Discord',
            'language.label': 'Language', closeSettings: 'Close settings',
            'view.general': 'General', 'view.generalDescription': 'Connection details and shortcuts for this workspace.',
            'view.appearance': 'Appearance', 'view.appearanceDescription': 'Choose how icons and time appear on your Rich Presence card.',
            'view.activity': 'Activity text', 'view.activityDescription': 'Set the text Discord shows while you edit a file.',
            'view.behavior': 'Behavior', 'view.behaviorDescription': 'Choose what happens when files close or the editor is idle.',
            'view.privacy': 'Privacy', 'view.privacyDescription': 'Choose which workspace details can appear on Discord.',
            'view.discord': 'Discord', 'view.discordDescription': 'How your Rich Presence card looks.',
            'card.extension': 'Extension', 'card.presenceCard': 'Presence card', 'card.editingState': 'Editing state', 'card.editorChanges': 'When the editor changes', 'card.activityDetails': 'Activity details', 'card.richPresence': 'Rich Presence',
            'general.presence': 'Discord Rich Presence', 'general.presenceDescription': 'Show your coding activity on Discord through local IPC.', 'general.openSettings': 'Open settings', 'general.openSettingsDescription': 'Use the Command Palette or press Ctrl + Alt + D anytime.', 'general.saveHint': 'Changes are saved to VS Code settings when you click Save changes.',
            'appearance.mainIcon': 'Main icon', 'appearance.mainIconDescription': 'Use the file or language icon as the large Discord image.', 'appearance.showDuration': 'Show elapsed time', 'appearance.showDurationDescription': 'Show your active coding time on Discord.',
            'image.fileIcon': 'File or language', 'image.editorIcon': 'Visual Studio Code logo',
            'activity.detailsLabel': 'Details line', 'activity.detailsDescription': 'Example: Editing App.tsx', 'activity.stateLabel': 'State line', 'activity.stateDescription': 'Example: Workspace: project-name',
            'behavior.noFileLabel': 'No file is open', 'behavior.noFileDescription': 'Choose the status that replaces the last file.', 'behavior.idleLabel': 'When idle', 'behavior.idleDescription': 'Choose what happens after the idle timeout.', 'behavior.timeoutLabel': 'Idle timeout', 'behavior.timeoutDescription': 'At least 30 seconds before idle status starts.', 'behavior.keepLastFile': 'Keep last file', 'behavior.showWorkspace': 'Show workspace', 'behavior.showIdle': 'Show idle status', 'behavior.clearPresence': 'Clear presence', 'behavior.keepFile': 'Keep active file',
            'privacy.fileName': 'File name', 'privacy.fileNameDescription': 'Allow the active file name in your presence.', 'privacy.workspaceName': 'Workspace name', 'privacy.workspaceNameDescription': 'Allow the project name in your presence.', 'privacy.gitBranch': 'Git branch', 'privacy.gitBranchDescription': 'Show the active branch from the Git repository.', 'privacy.debugStatus': 'Debug status', 'privacy.debugStatusDescription': 'Allow a debug session to replace the editing status.',
            'discord.presence': 'Rich Presence', 'discord.presenceDescription': 'Show your coding activity on your Discord profile.', 'discord.showElapsed': 'Show elapsed time', 'discord.showElapsedDescription': 'Keep a timer visible while you work on a file.', 'discord.timerMode': 'Timer mode', 'discord.timerModeDescription': 'Choose when the timer starts.', 'discord.initialDuration': 'Initial duration', 'discord.initialDurationDescription': 'Add previous coding time to the timer.', 'discord.timerActions': 'Timer actions', 'discord.timerActionsDescription': 'Reset or apply the timer without saving other changes.',
            'timer.session': 'VS Code session', 'timer.file': 'Reset when switching files', 'timer.manual': 'Manual',
            'button.reset': 'Reset', 'button.apply': 'Apply', 'button.resetDefaults': 'Reset to defaults', 'button.save': 'Save changes', 'button.resetPreview': 'Reset preview',
            'footer.noChanges': 'No unsaved changes', 'footer.notSaved': 'Your changes are saved when you click Save changes.',
            'preview.label': 'PREVIEW', 'preview.profileCard': 'Profile card', 'preview.playing': 'Playing Visual Studio Code', 'preview.memberList': 'Member list', 'preview.you': 'You', 'preview.note': 'This card follows the active editor and the settings you are changing.', 'preview.presenceOff': 'Rich Presence is off',
            'status.waiting': 'Waiting for VS Code', 'status.live': 'Live', 'status.sync': 'Synchronized with VS Code.', 'status.checkPreview': 'Review the preview, then save when it looks right.', 'status.saving': 'Saving settings...', 'status.unsaved': 'Unsaved changes', 'status.noChanges': 'No unsaved changes', 'status.defaults': 'Restoring default settings...', 'status.previewReset': 'Preview reset.', 'status.timerReset': 'Timer reset to 00:00.', 'status.timerApplied': 'Timer applied.', 'status.done': 'Done.', 'status.actionFailed': 'Action failed.'
        };
        const translations = {
            en: english,
            id: { ...english,
                'app.settings': 'Pengaturan', 'app.richPresence': 'Rich Presence', 'nav.general': 'Umum', 'nav.appearance': 'Tampilan', 'nav.activity': 'Aktivitas', 'nav.behavior': 'Perilaku', 'nav.privacy': 'Privasi', 'nav.discord': 'Discord', 'language.label': 'Bahasa', closeSettings: 'Tutup pengaturan',
                'view.general': 'Umum', 'view.generalDescription': 'Detail koneksi dan shortcut untuk workspace ini.', 'view.appearance': 'Tampilan', 'view.appearanceDescription': 'Pilih tampilan ikon dan waktu di kartu Rich Presence.', 'view.activity': 'Teks aktivitas', 'view.activityDescription': 'Atur teks yang ditampilkan Discord saat kamu mengedit file.', 'view.behavior': 'Perilaku', 'view.behaviorDescription': 'Atur respons saat file ditutup atau editor idle.', 'view.privacy': 'Privasi', 'view.privacyDescription': 'Pilih detail workspace yang boleh tampil di Discord.', 'view.discordDescription': 'Atur tampilan kartu Rich Presence kamu.',
                'card.extension': 'Extension', 'card.presenceCard': 'Kartu presence', 'card.editingState': 'Status editing', 'card.editorChanges': 'Saat editor berubah', 'card.activityDetails': 'Detail aktivitas', 'general.presenceDescription': 'Tampilkan aktivitas coding kamu di Discord melalui IPC lokal.', 'general.openSettings': 'Buka pengaturan', 'general.openSettingsDescription': 'Gunakan Command Palette atau tekan Ctrl + Alt + D kapan saja.', 'general.saveHint': 'Perubahan disimpan ke pengaturan VS Code saat kamu menekan Simpan perubahan.', 'appearance.mainIcon': 'Ikon utama', 'appearance.mainIconDescription': 'Gunakan ikon file atau bahasa sebagai gambar besar Discord.', 'appearance.showDuration': 'Tampilkan durasi', 'appearance.showDurationDescription': 'Tampilkan waktu coding aktif kamu di Discord.', 'image.fileIcon': 'File atau bahasa', 'image.editorIcon': 'Logo Visual Studio Code', 'activity.detailsLabel': 'Baris detail', 'activity.detailsDescription': 'Contoh: Editing App.tsx', 'activity.stateLabel': 'Baris status', 'activity.stateDescription': 'Contoh: Workspace: project-name', 'behavior.noFileLabel': 'Tidak ada file terbuka', 'behavior.noFileDescription': 'Pilih status pengganti file terakhir.', 'behavior.idleLabel': 'Saat idle', 'behavior.idleDescription': 'Pilih aksi setelah batas idle tercapai.', 'behavior.timeoutLabel': 'Batas idle', 'behavior.timeoutDescription': 'Minimal 30 detik sebelum status idle dimulai.', 'behavior.keepLastFile': 'Pertahankan file terakhir', 'behavior.showWorkspace': 'Tampilkan workspace', 'behavior.showIdle': 'Tampilkan status idle', 'behavior.clearPresence': 'Hapus presence', 'behavior.keepFile': 'Pertahankan file aktif', 'privacy.fileName': 'Nama file', 'privacy.fileNameDescription': 'Izinkan nama file aktif tampil di presence.', 'privacy.workspaceName': 'Nama workspace', 'privacy.workspaceNameDescription': 'Izinkan nama project tampil di presence.', 'privacy.gitBranch': 'Branch Git', 'privacy.gitBranchDescription': 'Tampilkan branch aktif dari repository Git.', 'privacy.debugStatus': 'Status debugging', 'privacy.debugStatusDescription': 'Izinkan sesi debug menggantikan status editing.', 'discord.presenceDescription': 'Tampilkan aktivitas coding kamu di profil Discord.', 'discord.showElapsedDescription': 'Tampilkan timer saat kamu mengerjakan file.', 'discord.timerMode': 'Mode timer', 'discord.timerModeDescription': 'Pilih kapan timer dimulai.', 'discord.initialDuration': 'Durasi awal', 'discord.initialDurationDescription': 'Tambahkan waktu coding sebelumnya ke timer.', 'discord.timerActions': 'Aksi timer', 'discord.timerActionsDescription': 'Reset atau terapkan timer tanpa menyimpan perubahan lain.', 'timer.session': 'Sesi VS Code', 'timer.file': 'Reset saat pindah file', 'timer.manual': 'Manual', 'button.resetDefaults': 'Reset ke default', 'button.save': 'Simpan perubahan', 'button.resetPreview': 'Reset preview', 'footer.noChanges': 'Tidak ada perubahan', 'footer.notSaved': 'Perubahan disimpan saat kamu menekan Simpan perubahan.', 'preview.profileCard': 'Kartu profil', 'preview.playing': 'Menjalankan Visual Studio Code', 'preview.memberList': 'Daftar anggota', 'preview.you': 'Kamu', 'preview.note': 'Kartu ini mengikuti editor aktif dan pengaturan yang sedang kamu ubah.', 'preview.presenceOff': 'Rich Presence sedang nonaktif', 'status.waiting': 'Menunggu VS Code', 'status.live': 'Live', 'status.sync': 'Tersinkron dengan VS Code.', 'status.checkPreview': 'Periksa preview, lalu simpan jika sudah sesuai.', 'status.saving': 'Menyimpan pengaturan...', 'status.unsaved': 'Ada perubahan yang belum disimpan', 'status.noChanges': 'Belum ada perubahan', 'status.defaults': 'Mengembalikan pengaturan default...', 'status.previewReset': 'Preview di-reset.', 'status.timerReset': 'Timer di-reset ke 00:00.', 'status.timerApplied': 'Timer diterapkan.', 'status.done': 'Selesai.', 'status.actionFailed': 'Aksi gagal.'
            },
            ja: { ...english, 'app.settings': '設定', 'nav.general': '一般', 'nav.appearance': '外観', 'nav.activity': 'アクティビティ', 'nav.behavior': '動作', 'nav.privacy': 'プライバシー', 'nav.discord': 'Discord', 'language.label': '言語', closeSettings: '設定を閉じる', 'view.general': '一般', 'view.generalDescription': 'このワークスペースの接続情報とショートカット。', 'view.appearance': '外観', 'view.appearanceDescription': 'Rich Presence カードに表示するアイコンと時間を選択します。', 'view.activity': 'アクティビティテキスト', 'view.activityDescription': 'ファイル編集中に Discord に表示するテキストを設定します。', 'view.behavior': '動作', 'view.behaviorDescription': 'ファイルを閉じた時やアイドル時の動作を選択します。', 'view.privacy': 'プライバシー', 'view.privacyDescription': 'Discord に表示するワークスペース情報を選択します。', 'view.discordDescription': 'Rich Presence カードの表示を設定します。', 'card.extension': '拡張機能', 'card.presenceCard': 'Presence カード', 'card.editingState': '編集中の状態', 'card.editorChanges': 'エディターの変更時', 'card.activityDetails': 'アクティビティ詳細', 'general.presenceDescription': 'ローカル IPC を通じてコーディング状況を Discord に表示します。', 'general.openSettings': '設定を開く', 'general.openSettingsDescription': 'コマンドパレットまたは Ctrl + Alt + D を使用します。', 'general.saveHint': '「変更を保存」を押すと VS Code の設定に保存されます。', 'appearance.mainIcon': 'メインアイコン', 'appearance.mainIconDescription': 'ファイルまたは言語アイコンを Discord の大きな画像に使用します。', 'appearance.showDuration': '経過時間を表示', 'appearance.showDurationDescription': '作業中の時間を Discord に表示します。', 'image.fileIcon': 'ファイルまたは言語', 'image.editorIcon': 'Visual Studio Code ロゴ', 'activity.detailsLabel': '詳細行', 'activity.detailsDescription': '例: Editing App.tsx', 'activity.stateLabel': '状態行', 'activity.stateDescription': '例: Workspace: project-name', 'behavior.noFileLabel': 'ファイルが開かれていない時', 'behavior.noFileDescription': '最後のファイルの代わりに表示する状態を選択します。', 'behavior.idleLabel': 'アイドル時', 'behavior.idleDescription': 'アイドル時間を超えた後の動作を選択します。', 'behavior.timeoutLabel': 'アイドル時間', 'behavior.timeoutDescription': 'アイドル状態になるまでの時間です。', 'behavior.keepLastFile': '最後のファイルを維持', 'behavior.showWorkspace': 'ワークスペースを表示', 'behavior.showIdle': 'アイドル状態を表示', 'behavior.clearPresence': 'Presence を消去', 'behavior.keepFile': 'アクティブなファイルを維持', 'privacy.fileName': 'ファイル名', 'privacy.fileNameDescription': 'アクティブなファイル名を Presence に表示します。', 'privacy.workspaceName': 'ワークスペース名', 'privacy.workspaceNameDescription': 'プロジェクト名を Presence に表示します。', 'privacy.gitBranch': 'Git ブランチ', 'privacy.gitBranchDescription': 'Git リポジトリのアクティブなブランチを表示します。', 'privacy.debugStatus': 'デバッグ状態', 'privacy.debugStatusDescription': 'デバッグ中の状態を編集状態の代わりに表示します。', 'discord.presenceDescription': 'コーディング状況を Discord プロフィールに表示します。', 'discord.showElapsedDescription': 'ファイル作業中にタイマーを表示します。', 'discord.timerMode': 'タイマーモード', 'discord.timerModeDescription': 'タイマーを開始するタイミングを選択します。', 'discord.initialDuration': '初期時間', 'discord.initialDurationDescription': '以前の作業時間をタイマーに追加します。', 'discord.timerActions': 'タイマー操作', 'discord.timerActionsDescription': '他の変更を保存せずにタイマーをリセットまたは適用します。', 'timer.session': 'VS Code セッション', 'timer.file': 'ファイル切り替え時にリセット', 'timer.manual': '手動', 'button.resetDefaults': 'デフォルトに戻す', 'button.save': '変更を保存', 'button.resetPreview': 'プレビューをリセット', 'footer.noChanges': '未保存の変更はありません', 'footer.notSaved': '「変更を保存」を押すと変更が保存されます。', 'preview.profileCard': 'プロフィールカード', 'preview.playing': 'Visual Studio Code をプレイ中', 'preview.memberList': 'メンバーリスト', 'preview.you': 'あなた', 'preview.note': 'このカードはアクティブなエディターと変更中の設定に従います。', 'status.waiting': 'VS Code を待機中', 'status.live': 'ライブ', 'status.sync': 'VS Code と同期しました。', 'status.checkPreview': 'プレビューを確認して、問題なければ保存してください。', 'status.saving': '設定を保存中...', 'status.unsaved': '未保存の変更があります', 'status.noChanges': '未保存の変更はありません', 'status.defaults': 'デフォルト設定に戻しています...', 'status.previewReset': 'プレビューをリセットしました。', 'status.timerReset': 'タイマーを 00:00 にリセットしました。', 'status.timerApplied': 'タイマーを適用しました。', 'status.done': '完了しました。', 'status.actionFailed': '操作に失敗しました。' },
            es: { ...english, 'app.settings': 'Configuración', 'nav.general': 'General', 'nav.appearance': 'Apariencia', 'nav.activity': 'Actividad', 'nav.behavior': 'Comportamiento', 'nav.privacy': 'Privacidad', 'nav.discord': 'Discord', 'language.label': 'Idioma', closeSettings: 'Cerrar configuración', 'view.general': 'General', 'view.generalDescription': 'Detalles de conexión y accesos directos para este espacio de trabajo.', 'view.appearance': 'Apariencia', 'view.appearanceDescription': 'Elige cómo aparecen los iconos y el tiempo en tu tarjeta Rich Presence.', 'view.activity': 'Texto de actividad', 'view.activityDescription': 'Define el texto que Discord muestra mientras editas un archivo.', 'view.behavior': 'Comportamiento', 'view.behaviorDescription': 'Elige qué ocurre al cerrar archivos o cuando el editor está inactivo.', 'view.privacy': 'Privacidad', 'view.privacyDescription': 'Elige qué detalles del espacio de trabajo pueden aparecer en Discord.', 'view.discordDescription': 'Configura el aspecto de tu tarjeta Rich Presence.', 'card.extension': 'Extensión', 'card.presenceCard': 'Tarjeta de presencia', 'card.editingState': 'Estado de edición', 'card.editorChanges': 'Cuando cambia el editor', 'card.activityDetails': 'Detalles de actividad', 'general.presenceDescription': 'Muestra tu actividad de código en Discord mediante IPC local.', 'general.openSettings': 'Abrir configuración', 'general.openSettingsDescription': 'Usa la paleta de comandos o pulsa Ctrl + Alt + D.', 'general.saveHint': 'Los cambios se guardan en la configuración de VS Code al pulsar Guardar cambios.', 'appearance.mainIcon': 'Icono principal', 'appearance.mainIconDescription': 'Usa el icono del archivo o lenguaje como imagen grande de Discord.', 'appearance.showDuration': 'Mostrar tiempo transcurrido', 'appearance.showDurationDescription': 'Muestra tu tiempo activo de código en Discord.', 'image.fileIcon': 'Archivo o lenguaje', 'image.editorIcon': 'Logotipo de Visual Studio Code', 'activity.detailsLabel': 'Línea de detalles', 'activity.detailsDescription': 'Ejemplo: Editing App.tsx', 'activity.stateLabel': 'Línea de estado', 'activity.stateDescription': 'Ejemplo: Workspace: project-name', 'behavior.noFileLabel': 'No hay ningún archivo abierto', 'behavior.noFileDescription': 'Elige el estado que reemplaza al último archivo.', 'behavior.idleLabel': 'Cuando está inactivo', 'behavior.idleDescription': 'Elige qué ocurre tras el tiempo de inactividad.', 'behavior.timeoutLabel': 'Tiempo de inactividad', 'behavior.timeoutDescription': 'Al menos 30 segundos antes de iniciar el estado inactivo.', 'behavior.keepLastFile': 'Mantener último archivo', 'behavior.showWorkspace': 'Mostrar espacio de trabajo', 'behavior.showIdle': 'Mostrar estado inactivo', 'behavior.clearPresence': 'Borrar presencia', 'behavior.keepFile': 'Mantener archivo activo', 'privacy.fileName': 'Nombre del archivo', 'privacy.fileNameDescription': 'Permite mostrar el nombre del archivo activo en tu presencia.', 'privacy.workspaceName': 'Nombre del espacio de trabajo', 'privacy.workspaceNameDescription': 'Permite mostrar el nombre del proyecto en tu presencia.', 'privacy.gitBranch': 'Rama de Git', 'privacy.gitBranchDescription': 'Muestra la rama activa del repositorio Git.', 'privacy.debugStatus': 'Estado de depuración', 'privacy.debugStatusDescription': 'Permite que una sesión de depuración reemplace el estado de edición.', 'discord.presenceDescription': 'Muestra tu actividad de código en tu perfil de Discord.', 'discord.showElapsedDescription': 'Mantén visible un temporizador mientras trabajas en un archivo.', 'discord.timerMode': 'Modo del temporizador', 'discord.timerModeDescription': 'Elige cuándo comienza el temporizador.', 'discord.initialDuration': 'Duración inicial', 'discord.initialDurationDescription': 'Añade tiempo de código anterior al temporizador.', 'discord.timerActions': 'Acciones del temporizador', 'discord.timerActionsDescription': 'Restablece o aplica el temporizador sin guardar otros cambios.', 'timer.session': 'Sesión de VS Code', 'timer.file': 'Restablecer al cambiar de archivo', 'timer.manual': 'Manual', 'button.resetDefaults': 'Restablecer valores', 'button.save': 'Guardar cambios', 'button.resetPreview': 'Restablecer vista previa', 'footer.noChanges': 'No hay cambios sin guardar', 'footer.notSaved': 'Los cambios se guardan al pulsar Guardar cambios.', 'preview.profileCard': 'Tarjeta de perfil', 'preview.playing': 'Usando Visual Studio Code', 'preview.memberList': 'Lista de miembros', 'preview.you': 'Tú', 'preview.note': 'Esta tarjeta sigue el editor activo y la configuración que estás cambiando.', 'status.waiting': 'Esperando a VS Code', 'status.live': 'En vivo', 'status.sync': 'Sincronizado con VS Code.', 'status.checkPreview': 'Revisa la vista previa y guarda cuando esté lista.', 'status.saving': 'Guardando configuración...', 'status.unsaved': 'Hay cambios sin guardar', 'status.noChanges': 'No hay cambios sin guardar', 'status.defaults': 'Restaurando configuración predeterminada...', 'status.previewReset': 'Vista previa restablecida.', 'status.timerReset': 'Temporizador restablecido a 00:00.', 'status.timerApplied': 'Temporizador aplicado.', 'status.done': 'Listo.', 'status.actionFailed': 'La acción falló.' }
        };
        const sectionKeys = { general: ['view.general', 'view.generalDescription'], appearance: ['view.appearance', 'view.appearanceDescription'], activity: ['view.activity', 'view.activityDescription'], behavior: ['view.behavior', 'view.behaviorDescription'], privacy: ['view.privacy', 'view.privacyDescription'], discord: ['view.discord', 'view.discordDescription'] };
        let currentLanguage = 'en';
        let hydrated = false;
        let savedSnapshot = '';
        let elapsedSeconds = 42;
        let previewData = { fileName: 'App.tsx', language: 'React (TypeScript)', workspace: 'current project', gitBranch: 'main', lineCount: '128', currentLine: '42' };

        const iconPaths = {
            settings: '<path d="M12 3.5 13.2 5.7a6.8 6.8 0 0 1 1.7.7l2.4-.7 1.8 1.8-.7 2.4c.3.5.5 1.1.7 1.7l2.2 1.2v2.5l-2.2 1.2a6.8 6.8 0 0 1-.7 1.7l.7 2.4-1.8 1.8-2.4-.7a6.8 6.8 0 0 1-1.7.7L12 21h-2.5l-1.2-2.2a6.8 6.8 0 0 1-1.7-.7l-2.4.7-1.8-1.8.7-2.4a6.8 6.8 0 0 1-.7-1.7L.2 11.7V9.2l2.2-1.2a6.8 6.8 0 0 1 .7-1.7l-.7-2.4 1.8-1.8 2.4.7a6.8 6.8 0 0 1 1.7-.7L9.5.9H12Z" transform="scale(.78) translate(3.3 3.3)"/><circle cx="11.8" cy="12.5" r="2.8"/>',
            palette: '<path d="M12 3a9 9 0 1 0 0 18h1.5a2 2 0 0 0 0-4H12a2 2 0 0 1 0-4h3a6 6 0 0 0 0-12Z"/><circle cx="7.3" cy="10" r=".8"/><circle cx="9" cy="6.8" r=".8"/><circle cx="13" cy="6.4" r=".8"/>',
            activity: '<path d="M3 12h4l2-7 4 14 2-7h6"/>',
            route: '<circle cx="6" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><path d="M6 7v5a4 4 0 0 0 4 4h6"/><path d="M18 17v-5a4 4 0 0 0-4-4h-2"/>',
            shield: '<path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z"/><path d="m9 12 2 2 4-4"/>',
            discord: '<path d="M8.2 8.4c1.2-.7 2.4-1 3.8-1s2.6.3 3.8 1"/><path d="M6.5 7.8C4.7 8.8 3.7 11 3.7 14c0 2.4 1.7 4.4 4 4.7l.8-1.2"/><path d="M17.5 7.8c1.8 1 2.8 3.2 2.8 6.2 0 2.4-1.7 4.4-4 4.7l-.8-1.2"/><circle cx="9.5" cy="13" r="1"/><circle cx="14.5" cy="13" r="1"/>',
            globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
            close: '<path d="m6 6 12 12M18 6 6 18"/>',
            info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
            reset: '<path d="M4 12a8 8 0 0 1 13.7-5.7L20 8"/><path d="M20 4v4h-4"/><path d="M20 12a8 8 0 0 1-13.7 5.7L4 16"/><path d="M4 20v-4h4"/>',
            clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
            save: '<path d="M5 4h12l3 3v13H4V4h1Z"/><path d="M8 4v5h7V4"/><path d="M8 20v-6h8v6"/>'
        };

        function mountIcons() {
            document.querySelectorAll('[data-icon]').forEach(element => {
                const path = iconPaths[element.dataset.icon];
                if (path) element.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + path + '</svg>';
            });
        }
        function element(id) { return document.getElementById(id); }
        function value(id) { return element(id)?.value || ''; }
        function checked(id) { return !!element(id)?.checked; }
        function setValue(id, next) { if (element(id)) element(id).value = next; }
        function setChecked(id, next) { if (element(id)) element(id).checked = !!next; }

        function offsetSeconds() {
            return Math.max(0, Number.parseInt(value('timerHours'), 10) || 0) * 3600 + Math.min(59, Math.max(0, Number.parseInt(value('timerMinutes'), 10) || 0)) * 60;
        }
        function readForm() {
            return JSON.stringify({
                enabled: checked('presenceEnabled'), largeImageStyle: value('largeImageStyle'), showElapsedTime: checked('showElapsedTime'), showElapsedTimeDiscord: checked('showElapsedTimeDiscord'), timerMode: value('timerMode'), timerHours: value('timerHours'), timerMinutes: value('timerMinutes'), detailsEditing: value('detailsEditing'), stateEditing: value('stateEditing'), whenNoFileOpen: value('whenNoFileOpen'), idleAction: value('idleAction'), idleTimeoutSeconds: value('idleTimeoutSeconds'), showFileName: checked('showFileName'), showWorkspaceName: checked('showWorkspaceName'), showGitBranch: checked('showGitBranch'), showDebugStatus: checked('showDebugStatus')
            });
        }
        function t(key) { return (translations[currentLanguage] || english)[key] || english[key] || key; }
        function applyLanguage(language) {
            currentLanguage = translations[language] ? language : 'en';
            document.documentElement.lang = currentLanguage;
            const locale = translations[currentLanguage] || english;
            element('languageFlag').className = 'language-flag flag-' + currentLanguage;
            document.querySelectorAll('[data-i18n]').forEach(node => { const text = locale[node.dataset.i18n] || english[node.dataset.i18n]; if (text) node.textContent = text; });
            document.querySelectorAll('[data-i18n-option]').forEach(node => { const text = locale[node.dataset.i18nOption] || english[node.dataset.i18nOption]; if (text) node.textContent = text; });
            document.querySelectorAll('[data-i18n-aria]').forEach(node => { const text = locale[node.dataset.i18nAria] || english[node.dataset.i18nAria]; if (text) node.setAttribute('aria-label', text); });
            const activeSection = document.querySelector('.nav-button.is-active')?.dataset.section || 'discord';
            activateSection(activeSection);
            updateDirtyState();
        }
        function setActionStatus(message, state, key) { const displayMessage = key ? t(key) : message; element('actionStatus').textContent = displayMessage; element('actionStatus').dataset.state = state || ''; element('saveStatus').textContent = displayMessage || t('footer.notSaved'); }
        function updateDirtyState() {
            const dirty = hydrated && readForm() !== savedSnapshot;
            element('btnSave').disabled = !dirty;
            element('changeTitle').textContent = dirty ? t('status.unsaved') : t('status.noChanges');
            if (dirty && !element('actionStatus').dataset.state) setActionStatus('', '', 'status.checkPreview');
        }
        function setPreviewStatus(message, state, key) { element('previewStatusText').textContent = key ? t(key) : message; element('previewStatus').dataset.state = state || 'loading'; }
        function format(template, vars) { return String(template || '').replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '').trim(); }
        function languageMark(language) { const text = String(language || 'File'); if (text.includes('TypeScript')) return 'TS'; if (text.includes('JavaScript')) return 'JS'; if (text.includes('Python')) return 'PY'; if (text.includes('Rust')) return 'RS'; if (text.includes('React')) return 'R'; return text.slice(0, 2).toUpperCase(); }
        function duration(seconds) { const s = Math.max(0, Math.floor(seconds)); const h = Math.floor(s / 3600); const m = Math.floor((s % 3600) / 60); const r = s % 60; const pad = n => String(n).padStart(2, '0'); return (h ? pad(h) + ':' : '') + pad(m) + ':' + pad(r); }
        function renderPreview() {
            const vars = { fileName: checked('showFileName') ? previewData.fileName : 'a file', fileExt: previewData.fileExt || '', language: previewData.language, workspace: checked('showWorkspaceName') ? previewData.workspace : '', gitBranch: checked('showGitBranch') ? previewData.gitBranch : '', lineCount: previewData.lineCount, currentLine: previewData.currentLine };
            const details = format(value('detailsEditing') || 'Editing {fileName}', vars) || 'Editing code';
            const state = format(value('stateEditing') || 'Workspace: {workspace}', vars);
            const useEditorIcon = value('largeImageStyle') === 'editorIcon';
            const largeImage = useEditorIcon ? 'VS' : languageMark(previewData.language);
            const smallImage = useEditorIcon ? languageMark(previewData.language) : 'VS';
            const presenceEnabled = checked('presenceEnabled');
            element('previewDetails').textContent = details;
            element('previewState').textContent = state || ' ';
            element('previewImage').textContent = largeImage;
            element('previewAppIcon').textContent = smallImage;
            element('previewElapsed').hidden = !checked('showElapsedTime') && !checked('showElapsedTimeDiscord');
            element('previewElapsed').textContent = duration(elapsedSeconds + offsetSeconds()) + ' elapsed';
            element('discordProfileCard').classList.toggle('is-disabled', !presenceEnabled);
            element('previewDisabledMessage').hidden = presenceEnabled;
            element('previewImage').style.opacity = presenceEnabled ? '1' : '0.38';
            element('previewDetails').style.opacity = presenceEnabled ? '1' : '0.45';
            element('discordAvatar').style.opacity = presenceEnabled ? '1' : '0.55';
        }

        function activateSection(section) {
            document.querySelectorAll('.nav-button').forEach(button => button.classList.toggle('is-active', button.dataset.section === section));
            document.querySelectorAll('.setting-view').forEach(view => view.classList.toggle('is-active', view.dataset.view === section));
            const keys = sectionKeys[section] || sectionKeys.discord;
            document.getElementById('settings-heading').textContent = t(keys[0]);
            document.getElementById('section-description').textContent = t(keys[1]);
        }
        function applySettings(settings) {
            if (!settings) return;
            setChecked('presenceEnabled', settings.enabled !== false);
            setValue('largeImageStyle', settings['appearance.largeImageStyle'] || 'fileIcon');
            setChecked('showElapsedTime', settings['appearance.showElapsedTime'] !== false);
            setChecked('showElapsedTimeDiscord', settings['appearance.showElapsedTime'] !== false);
            setValue('timerMode', settings['timer.mode'] || 'session');
            const offset = Math.max(0, Number(settings['timer.customOffsetMinutes']) || 0);
            setValue('timerHours', Math.floor(offset / 60)); setValue('timerMinutes', offset % 60);
            setValue('detailsEditing', settings['formatting.detailsEditing'] || 'Editing {fileName}');
            setValue('stateEditing', settings['formatting.stateEditing'] || 'Workspace: {workspace}');
            setValue('whenNoFileOpen', settings['behavior.whenNoFileOpen'] || 'keepLastFile');
            setValue('idleAction', settings['behavior.idleAction'] || 'showIdle');
            setValue('idleTimeoutSeconds', settings.idleTimeoutSeconds || 300);
            setChecked('showFileName', settings['privacy.showFileName'] !== false); setChecked('showWorkspaceName', settings['privacy.showWorkspaceName'] !== false); setChecked('showGitBranch', settings['privacy.showGitBranch'] === true); setChecked('showDebugStatus', settings['privacy.showDebugStatus'] !== false);
            savedSnapshot = readForm(); hydrated = true; setPreviewStatus('', 'ready', 'status.live'); setActionStatus('', 'success', 'status.sync'); updateDirtyState(); renderPreview();
        }
        function insertToken(inputId, token) { const input = element(inputId); if (!input) return; const start = input.selectionStart ?? input.value.length; const end = input.selectionEnd ?? input.value.length; input.value = input.value.slice(0, start) + token + input.value.slice(end); input.focus(); input.setSelectionRange(start + token.length, start + token.length); renderPreview(); updateDirtyState(); }
        function postSave() {
            element('btnSave').disabled = true; setActionStatus('', '', 'status.saving');
            vscode.postMessage({ command: 'saveSettings', settings: { enabled: checked('presenceEnabled'), 'appearance.largeImageStyle': value('largeImageStyle'), 'appearance.showElapsedTime': checked('showElapsedTimeDiscord') || checked('showElapsedTime'), 'timer.mode': value('timerMode'), 'timer.customOffsetMinutes': offsetSeconds() / 60, 'formatting.detailsEditing': value('detailsEditing'), 'formatting.stateEditing': value('stateEditing'), 'behavior.whenNoFileOpen': value('whenNoFileOpen'), 'behavior.idleAction': value('idleAction'), idleTimeoutSeconds: Number(value('idleTimeoutSeconds')) || 300, 'privacy.showFileName': checked('showFileName'), 'privacy.showWorkspaceName': checked('showWorkspaceName'), 'privacy.showGitBranch': checked('showGitBranch'), 'privacy.showDebugStatus': checked('showDebugStatus') } });
        }

        window.addEventListener('message', event => {
            const message = event.data || {};
            if (message.command === 'init') { applySettings(message.settings); if (message.previewData) { previewData = { ...previewData, ...message.previewData }; elapsedSeconds = message.previewData.startTimestamp ? Math.max(0, Math.floor(Date.now() / 1000) - message.previewData.startTimestamp - offsetSeconds()) : 42; renderPreview(); } return; }
            if (message.command === 'actionResult') {
                if (message.ok && message.action === 'save') { savedSnapshot = readForm(); updateDirtyState(); }
                if (message.ok && message.action === 'reset') { elapsedSeconds = 0; renderPreview(); }
                const resultKey = message.ok ? (message.action === 'reset' ? 'status.timerReset' : message.action === 'timer' ? 'status.timerApplied' : message.action === 'save' ? 'status.sync' : 'status.done') : 'status.actionFailed';
                setActionStatus(message.message || '', message.ok ? 'success' : 'error', resultKey); if (!message.ok) setPreviewStatus('', 'error', 'status.actionFailed');
            }
        });

        document.querySelectorAll('.nav-button').forEach(button => button.addEventListener('click', () => activateSection(button.dataset.section)));
        document.querySelectorAll('[data-input][data-token]').forEach(button => button.addEventListener('click', () => insertToken(button.dataset.input, button.dataset.token)));
        formIds.forEach(id => { const control = element(id); if (!control) return; control.addEventListener('input', () => { if (id === 'showElapsedTimeDiscord') setChecked('showElapsedTime', control.checked); if (id === 'showElapsedTime') setChecked('showElapsedTimeDiscord', control.checked); renderPreview(); updateDirtyState(); }); control.addEventListener('change', () => { if (id === 'showElapsedTimeDiscord') setChecked('showElapsedTime', control.checked); if (id === 'showElapsedTime') setChecked('showElapsedTimeDiscord', control.checked); renderPreview(); updateDirtyState(); }); });
        element('languageSelect').addEventListener('change', event => applyLanguage(event.target.value));
        element('btnClose').addEventListener('click', () => vscode.postMessage({ command: 'close' }));
        element('btnSave').addEventListener('click', postSave);
        element('btnResetDefaults').addEventListener('click', () => { vscode.postMessage({ command: 'resetDefaults' }); setActionStatus('', '', 'status.defaults'); });
        element('btnResetPreview').addEventListener('click', () => { elapsedSeconds = 42; renderPreview(); setActionStatus('', 'success', 'status.previewReset'); });
        element('btnResetTimer').addEventListener('click', () => { elapsedSeconds = 0; renderPreview(); vscode.postMessage({ command: 'resetTimer' }); setActionStatus('', 'success', 'status.timerReset'); });
        element('btnApplyTimer').addEventListener('click', () => { vscode.postMessage({ command: 'applyTimer', settings: { 'timer.mode': value('timerMode'), 'timer.customOffsetMinutes': offsetSeconds() / 60, 'appearance.showElapsedTime': checked('showElapsedTimeDiscord') } }); setActionStatus('', 'success', 'status.timerApplied'); });
        document.addEventListener('keydown', event => { if (event.key === 'Escape') vscode.postMessage({ command: 'close' }); });
        mountIcons(); applyLanguage('en'); activateSection('discord'); renderPreview(); setInterval(() => { elapsedSeconds += 1; renderPreview(); }, 1000); vscode.postMessage({ command: 'ready' });
    </script>
</body>
</html>`;
}
//# sourceMappingURL=settingsModalWebviewHtml.js.map