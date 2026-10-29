# Graph Report - vscode-discord-rpc  (2026-10-27)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 243 nodes · 342 edges · 23 communities (21 shown, 2 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22

## God Nodes (most connected - your core abstractions)
1. `DiscordRpcManager` - 25 edges
2. `ActivityDetector` - 22 edges
3. `ConfigurationHandler` - 21 edges
4. `compilerOptions` - 11 edges
5. `SettingsWebviewPanel` - 9 edges
6. `discordPresence.timer.mode` - 7 edges
7. `discordPresence.appearance.largeImageStyle` - 7 edges
8. `discordPresence.behavior.whenNoFileOpen` - 7 edges
9. `discordPresence.behavior.idleAction` - 7 edges
10. `activate()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `ActivityDetector` --references--> `ActivityPayload`  [EXTRACTED]
  src/activity/ActivityDetector.ts → src/rpc/DiscordRpcManager.ts
- `activate()` --calls--> `ConfigurationHandler`  [EXTRACTED]
  src/extension.ts → src/config/ConfigurationHandler.ts
- `activate()` --calls--> `ActivityDetector`  [EXTRACTED]
  src/extension.ts → src/activity/ActivityDetector.ts

## Import Cycles
- None detected.

## Communities (23 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (32): properties, title, configuration, default, description, enum, enumDescriptions, scope (+24 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (30): activationEvents, categories, contributes, commands, keybindings, dependencies, discord-rpc@^4.0.1, description (+22 more)

### Community 2 - "Community 2"
Cohesion: 0.17
Nodes (3): DiscordRpcManager, formatTemplate(), runSelfCheck()

### Community 4 - "Community 4"
Cohesion: 0.18
Nodes (8): FileIconInfo, PresenceAppearanceSettings, PresenceBehaviorSettings, PresenceFormattingSettings, PresencePrivacySettings, PresenceTimerSettings, ActivityPayload, ConnectionState

### Community 6 - "Community 6"
Cohesion: 0.15
Nodes (12): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, lib, module, outDir, rootDir, skipLibCheck (+4 more)

### Community 7 - "Community 7"
Cohesion: 0.29
Nodes (7): default, description, enum, enumDescriptions, scope, type, discordPresence.behavior.idleAction

### Community 8 - "Community 8"
Cohesion: 0.29
Nodes (7): default, description, enum, enumDescriptions, scope, type, discordPresence.behavior.whenNoFileOpen

### Community 9 - "Community 9"
Cohesion: 0.29
Nodes (7): default, description, items, scope, type, type, discordPresence.privacy.blacklistedWorkspaces

### Community 10 - "Community 10"
Cohesion: 0.40
Nodes (5): default, description, scope, type, discordPresence.appearance.showElapsedTime

### Community 11 - "Community 11"
Cohesion: 0.40
Nodes (5): default, description, scope, type, discordPresence.clientId

### Community 12 - "Community 12"
Cohesion: 0.40
Nodes (5): default, description, scope, type, discordPresence.formatting.detailsDebugging

### Community 13 - "Community 13"
Cohesion: 0.40
Nodes (5): default, description, scope, type, discordPresence.formatting.detailsIdle

### Community 14 - "Community 14"
Cohesion: 0.40
Nodes (5): default, description, scope, type, discordPresence.formatting.stateDebugging

### Community 15 - "Community 15"
Cohesion: 0.40
Nodes (5): default, description, scope, type, discordPresence.formatting.stateEditing

### Community 16 - "Community 16"
Cohesion: 0.40
Nodes (5): default, description, scope, type, discordPresence.formatting.stateIdle

### Community 17 - "Community 17"
Cohesion: 0.40
Nodes (5): default, description, scope, type, discordPresence.formatting.stateNoFile

### Community 18 - "Community 18"
Cohesion: 0.40
Nodes (5): default, description, scope, type, discordPresence.idleTimeoutSeconds

### Community 19 - "Community 19"
Cohesion: 0.40
Nodes (5): default, description, scope, type, discordPresence.privacy.showDebugStatus

### Community 20 - "Community 20"
Cohesion: 0.40
Nodes (5): default, description, scope, type, discordPresence.privacy.showFileName

### Community 21 - "Community 21"
Cohesion: 0.40
Nodes (5): default, description, scope, type, discordPresence.privacy.showWorkspaceName

### Community 22 - "Community 22"
Cohesion: 0.40
Nodes (5): default, description, scope, type, discordPresence.timer.customOffsetMinutes

## Knowledge Gaps
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `properties` connect `Community 0` to `Community 7`, `Community 8`, `Community 9`, `Community 10`, `Community 11`, `Community 12`, `Community 13`, `Community 14`, `Community 15`, `Community 16`, `Community 17`, `Community 18`, `Community 19`, `Community 20`, `Community 21`, `Community 22`?**
  _High betweenness centrality (0.665) - this node is a cross-community bridge._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._
- **Why does `contributes` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.457) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07526881720430108 - nodes in this community are weakly interconnected._
- **Why does `configuration` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.453) - this node is a cross-community bridge._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.13852813852813853 - nodes in this community are weakly interconnected._