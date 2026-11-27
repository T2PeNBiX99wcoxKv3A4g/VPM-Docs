# Features

Everything the toolkit adds, grouped by where it appears. The linked pages document the details.

## Windows

- [**UPM Installer**](./UPM-Installer.md) — installs, removes and updates UPM packages; saved package lists per
  project; a maker that copies a list as JSON; an update check that adds only packages with a newer version.
- [**Import Watcher**](./Import-Watcher.md) — one log per editor session of the assets Unity imported, grouped by date
  and time; search, refresh and clear; missing assets are shown in red.
- [**Import Watcher Settings**](./Import-Watcher.md) — highlight colour and duration, per-extension colours and the
  size of the history.
- [**Delete History**](./Import-Watcher.md) — paths deleted or recreated during the session, with path, GUID,
  extension and time; copy either value; a configurable record limit.
- [**Unity Resource Monitor**](./Tools.md) — seven live counters, refreshed every 100 ms.
- [**Transform Expression Help**](./Transform-Inspector.md) — searchable cheat sheet of every expression, with
  click-to-copy examples.
- [**Preferences**](./Preferences.md) — language, accent colour, the general toggles, delete protection and the
  limits of both histories.

## Tools menu

- **Clear Shader Cache** — deletes Unity's compiled shader cache.
- **Force Clear Temp Files** — deletes the project's `Temp` folder; Unity rebuilds it.
- **Clear Empty Folder** — removes empty folders after a confirmation and a count.
- **Allow Async Compilation** — background shader compilation; the check mark shows the state.
- **Set Object and Tag** — switches the selection between normal and editor-only objects.
- **Discord SDK Initialize / Restart / Shutdown** — controls the optional editor rich presence.

## Assets menu

- **Asset Backup** — copies the selected assets to a timestamped backup folder.
- **Asset GUID Copy** — copies the GUIDs of the selected assets.
- **Delete Selected** — deletes through the confirmation dialog and records the paths in the delete history.

## GameObject and component menu

- **Set Object and Tag** — deactivates the object and tags it `EditorOnly`, remembering the previous tag and active
  state; running it again restores both.
- **Copy All Components** / **Paste All Components** — moves every component of one object to another.
- **Paste All Components With Transform** — the same, and the transform as well.
- **Copy Transform Tree** / **Paste Transform Tree** — a whole hierarchy with its transforms and components.
- **Convert Unity Constraint To VRC Constraint** / **Convert VRC Constraint To Unity Constraint** — swaps the two
  constraint types while keeping the settings.
- **Delete Selected** — the same delete action as in the Assets menu.

## Transform inspector

The default Transform inspector is replaced by an enhanced one:

- **Local Space** and **World Space** cards, each with position, rotation and scale.
- Arithmetic in every field: `2 + 3`, `10 / 4`, `1.5 * 2`; the result is applied to every selected object.
- Expression suggestions while typing, with `↑`/`↓`, Enter and Tab.
- Copy, paste, random and reset for a whole card and for a single property.
- A link button on the scale that toggles constrained proportions.
- Alignment: a reference mode (pivot, bottom, centre), **Align to Parent**, **Align to Ground** by raycast, and
  **Clear Parent**.
- **Transform Lock**, which disables the whole inspector for that object.
- **Hierarchy Path** with a copy button.
- **Decimal places** for position, rotation and scale (`-1` turns rounding off).
- **Default UI**, which unfolds Unity's own inspector for prefab overrides.
- Multi-object editing with a shared value and `—` for differences, and every change goes through `Undo`.

## Project window

- Imported assets are painted with the highlight colour for a moment and fade out.
- Each file extension can have its own colour, shown as a frame in the icon view and as an underline in the list
  view.
- Folders that received files are highlighted too.

## Editor behaviour

- **Delete protection**: `Assets` and `Packages` always refuse deletion, and extra directories can be added in
  [Preferences](./Preferences.md).
- **Delete confirmation**: the dialog lists what will be removed and can be turned off.
- **Background shader compilation** can be toggled from the menu or from Preferences.
- **Discord rich presence** shows the project and the current scene, and can be turned off completely.
- **Translated windows**: English, Japanese, Simplified Chinese and Traditional Chinese, switched in Preferences.
- **Accent colour**: one colour for section titles, highlights and buttons across every window and the Transform
  inspector.
