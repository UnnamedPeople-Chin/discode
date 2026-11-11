# Change Log

All notable changes to the "DisCode - Visual Discord Rich Presence" extension will be documented in this file.

## [1.3.6] - 2026-11-09

### Added
- **Coding Agent & IDE Presets Dropdown:** Built-in presets for `Visual Studio Code`, `DisCode`, `VSCodium`, `Antigravity`, `Cursor`, `Claude Code` (with the official *Clawd* pixel mascot), `Claude`, `Codex`, `Gemini CLI`, `GitHub Copilot`, `Windsurf`, `Kiro`, `Trae`, `Cline`, `Replit`, `Lovable`, `v0`, `Qwen Code`, `DeepSeek`, `Kimi`, `Perplexity`, `Ollama`, `Grok`, and `Mistral`.
- **Universal Brand Logo Resolution:** Automatic dark-padded (`#181a1f`) vector/PNG logo resolution for any custom application or brand name typed by the user.
- **Activity Verb Customizer:** Support for `Playing`, `Watching`, `Listening to`, and `Competing in` activity types.
- **Expanded Badge Logo Selector:** Added 17+ explicit editor and developer tool badge logos plus `Auto` and `Hide Badge` modes.

### Changed
- Updated default Settings Dashboard shortcut to `Ctrl + Alt + Shift + D` (`Cmd + Alt + Shift + D` on macOS) to avoid conflicting with Flutter/Dart DevTools (`Ctrl + Alt + D`).
- Instant non-throttled RPC sync when switching active files or saving settings.

### Fixed
- Enforced Discord IPC 2–128 character string bounds (`fitDiscordText`) so single-letter languages (e.g. `C`) and long paths never get rejected by Discord.
- Guarded against stale client events on reconnect and prevented RPC payload validation errors from triggering socket reconnect loops.
- Fixed settings persistence race condition (`isPersisting`) and aligned Webview `<select>` enum values (`showWorkspace`, `keepFile`).

## [1.3.1] - 2026-10-30

### Added
- Interactive Webview GUI Settings Dashboard (`Ctrl + Alt + D`).
- Real-time live Discord profile card preview.
- Dynamic programming language branding and icons.
- Granular elapsed timer modes (Session, File, Manual) and custom duration offsets.
- Multi-workspace privacy toggles and folder masking.

### Changed
- Migrated build pipeline to single-file bundled distribution via esbuild.
- Hardened Webview Content Security Policy (CSP) with cryptographic nonces.
- Upgraded Discord IPC connection lifecycle with exponential backoff and socket error trapping.

### Security
- Zero remote telemetry, zero unbundled runtime dependencies.
- Fully offline-ready and privacy-compliant.
