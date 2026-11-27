# Tools

Small actions that are otherwise several menu levels away.

## Maintenance

| Menu                                                                                          | What it does                                                                                              |
|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| Tools &gt; YKYToolkit &gt; Clear Shader Cache                                                 | Deletes Unity's compiled shader cache.                                                                    |
| Tools &gt; YKYToolkit &gt; Force Clear Temp Files                                             | Deletes the project's `Temp` folder (Unity rebuilds it).                                                  |
| Tools &gt; YKYToolkit &gt; Clear Empty Folder                                                 | Removes empty folders from the project.                                                                   |
| Tools &gt; YKYToolkit &gt; Allow Async Compilation                                            | Toggles background shader compilation; the check mark shows the current state.                             |
| Assets &gt; YKYToolkit &gt; Asset Backup                                                      | Copies the selected assets to a timestamped backup folder.                                                |
| Assets &gt; YKYToolkit &gt; Asset GUID Copy                                                   | Copies the GUID of the selected assets to the clipboard.                                                  |
| Assets &gt; YKYToolkit &gt; Delete Selected / GameObject &gt; YKYToolkit &gt; Delete Selected | Deletes the selection and records it in the delete history; protected directories are refused, not deleted. |

## Objects

**Set Object and Tag** (GameObject and Tools menu) assigns an object asset and a tag to the selection in one step,
including prefab stage objects.

## Components

| Menu                                       | What it does                                                           |
|--------------------------------------------|------------------------------------------------------------------------|
| Copy All Components                        | Copies every component of the selected object.                         |
| Paste All Components                       | Pastes them onto another object.                                       |
| Paste All Components With Transform        | The same, and also applies the copied transform.                       |
| Copy Transform Tree / Paste Transform Tree | Copies or pastes a whole hierarchy with its transforms and components. |

The copied data goes through the clipboard, so it can move between scenes and prefabs.

## Constraints

| Menu                                       | What it does                                            |
|--------------------------------------------|---------------------------------------------------------|
| Convert Unity Constraint To VRC Constraint | Replaces Unity constraints with the VRChat equivalents. |
| Convert VRC Constraint To Unity Constraint | The reverse, for prototyping outside VRChat.            |

Both actions are undoable and keep the constraint settings.

## Unity Resource Monitor

**Tools &gt; YKYToolkit &gt; Unity Resource Monitor** shows the editor process live: managed and native memory, GC
collections, CPU time and the render thread. It samples once per second and is meant to stay open while testing.

## Discord Rich Presence

The Discord SDK actions (**Initialize / Restart / Shutdown**) control the optional editor rich presence: the editor
status shows the project and the current scene. The SDK is shipped editor-only and never enters a build, and
**Enable Discord Rich Presence** in [Preferences](./Preferences.md) turns the connection off entirely.

## Settings

- **Tools &gt; YKYToolkit &gt; Preferences** holds the language, the accent colour, delete protection and the limits of
  the histories. See [Preferences](./Preferences.md).
- **Tools &gt; YKYToolkit &gt; Import Watcher Settings** opens the import highlight settings on their own. See
  [Import Watcher](./Import-Watcher.md).
