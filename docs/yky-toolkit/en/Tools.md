# Tools

Small actions that are otherwise several menu levels away.

## Maintenance

| Menu | What it does |
| --- | --- |
| Tools > YKYToolkit > Clear Shader Cache | Deletes Unity's compiled shader cache. |
| Tools > YKYToolkit > Force Clear Temp Files | Deletes the project's `Temp` folder (Unity rebuilds it). |
| Tools > YKYToolkit > Clear Empty Folder | Removes empty folders from the project. |
| Assets > YKYToolkit > Asset Backup | Copies the selected assets to a timestamped backup folder. |
| Assets > YKYToolkit > Asset GUID Copy | Copies the GUID of the selected assets to the clipboard. |
| Assets > YKYToolkit > Delete Selected / GameObject > YKYToolkit > Delete Selected | Deletes the selection and records it in the delete history. |

## Objects

**Set Object and Tag** (GameObject and Tools menu) assigns an object asset and a tag to the selection in one step,
including prefab stage objects.

## Components

| Menu | What it does |
| --- | --- |
| Copy All Components | Copies every component of the selected object. |
| Paste All Components | Pastes them onto another object. |
| Paste All Components With Transform | The same, and also applies the copied transform. |
| Copy Transform Tree / Paste Transform Tree | Copies or pastes a whole hierarchy with its transforms and components. |

The copied data goes through the clipboard, so it can move between scenes and prefabs.

## Constraints

| Menu | What it does |
| --- | --- |
| Convert Unity Constraint To VRC Constraint | Replaces Unity constraints with the VRChat equivalents. |
| Convert VRC Constraint To Unity Constraint | The reverse, for prototyping outside VRChat. |

Both actions are undoable and keep the constraint settings.

## Unity Resource Monitor

**Tools > YKYToolkit > Unity Resource Monitor** shows the editor process live: managed and native memory, GC
collections, CPU time and the render thread. It samples once per second and is meant to stay open while testing.

## Discord Rich Presence

The Discord SDK actions (**Initialize / Restart / Shutdown**) control the optional editor rich presence: the editor
status shows the project and the current scene. The SDK is shipped editor-only and never enters a build.
