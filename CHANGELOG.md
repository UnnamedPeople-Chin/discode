# Change Log

All notable changes to the "DisCode - Visual Discord Rich Presence" extension will be documented in this file.

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
