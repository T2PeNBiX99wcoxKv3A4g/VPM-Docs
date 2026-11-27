# Installation

Add `io.github.ykysnk.yky-toolkit` with ALCOM, the VPM CLI, or by adding the repository to the project. The package
depends on `io.github.ykysnk.utils` and `io.github.ykysnk.localization`, which VPM installs with it.

## After installing

The windows appear under **Tools &gt; YKYToolkit**:

- UPM Installer
- Import Watcher and Import Watcher Settings
- Delete History
- Unity Resource Monitor
- Transform Expression Help
- Preferences
- Clear Shader Cache, Force Clear Temp Files, Clear Empty Folder, Allow Async Compilation
- Discord SDK Initialize / Restart / Shutdown

Context actions are added to **GameObject &gt; YKYToolkit**, **Assets &gt; YKYToolkit** and the component menu.

## Optional: lilEditorToolbox

When `jp.lilxyzw.editortoolbox` is installed, the toolkit imports `.unitypackage` files through it. Without it the
toolkit falls back to Unity's own importer; nothing else changes.
