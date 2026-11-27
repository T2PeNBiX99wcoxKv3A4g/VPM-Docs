# Preferences

**Tools &gt; YKYToolkit &gt; Preferences** opens the toolkit settings, which also live under **Edit &gt; Preferences &gt;
YKY Toolkit**. They are stored per user in `EditorPrefs`, so they follow the Unity installation rather than the project
and are not committed.

## Language

The picker at the top switches the language of the toolkit windows: English, Japanese, Simplified Chinese or Traditional
Chinese. The text inside every window follows it immediately; the menu paths under **Tools &gt; YKYToolkit** stay in
English.

## Appearance

| Setting      | Effect                                                                                               |
|--------------|------------------------------------------------------------------------------------------------------|
| Accent Color | Colour of section titles, highlights and buttons across the toolkit and the Transform inspector.      |

The reset button in the section header restores the shipped accent colour.

## General

| Setting                            | Effect                                                                                     |
|------------------------------------|--------------------------------------------------------------------------------------------|
| Allow Async Compilation            | Lets Unity compile shaders in the background while the editor keeps running. On by default. |
| Warning Window for Delete Selected | Shows the confirmation dialog before **Delete Selected** removes assets.                    |
| Enable Discord Rich Presence       | Shows the project and the current scene in the Discord status. On by default.               |

The reset button restores all three toggles.

## Delete protection

`Assets` and `Packages` are always protected. **Extra protected directories** adds more: press `+`, type a path, and the
delete action refuses any selection that contains it, listing the blocked directories instead of deleting.

The footer of the list adds and removes entries, and its reset button clears the extra directories.

## Delete History

| Setting     | Effect                                                    |
|-------------|-----------------------------------------------------------|
| Max Records | How many deleted assets the delete history keeps (1–1000). |

## Import Watcher

| Setting                              | Effect                                                                |
|--------------------------------------|-----------------------------------------------------------------------|
| Highlight Color                      | Colour painted over an imported asset in the Project window.          |
| Highlight Duration                   | How long the highlight stays, in milliseconds (up to 500).            |
| Max History Sessions                 | How many editor sessions the import history keeps (1–1000).           |
| Highlight colors for file extensions | Per-extension colours used by the highlight, with a count and reset.  |

These are the same values as **Tools &gt; YKYToolkit &gt; Import Watcher Settings**; the reset button restores them. See
[Import Watcher](./Import-Watcher.md) for what the highlight does.

## Not in this page

The Transform inspector keeps its own per-object values: **Transform Lock** and the decimal places are stored in a hidden
component on the object, not here. See [Transform Inspector](./Transform-Inspector.md).
