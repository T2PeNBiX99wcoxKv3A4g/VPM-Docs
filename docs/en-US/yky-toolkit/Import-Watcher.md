# Import Watcher

**Tools &gt; YKYToolkit &gt; Import Watcher** records which assets Unity imports while it runs, one session per editor
run, grouped by date and time.

## The log

The left column lists the dates of the session, the middle one the import times, and the selected time shows its assets
in a tree on the right.

- **Search** filters the log by name or path.
- **Refresh** re-reads the current session.
- **Clear** empties the import log after a confirmation.
- **Settings** opens the settings window described below.
- Each date row shows how many entries it holds.
- An asset is shown with its icon and name; the tooltip holds the full path, and an entry whose asset no longer exists
  is painted red.
- Right-click a row to copy the path or remove it.

## Highlight

An imported asset is painted in the Project window for a moment, so a large import can be followed without watching the
log:

- **Highlight Color** is the wash drawn over the asset.
- **Highlight Duration** is how long it stays, in milliseconds; the default is 120 and the slider stops at 500.
- **Highlight colors for file extensions** gives each extension its own colour, so a `.unitypackage` import looks
  different from a `.cs` file. The list is reorderable, **Reset to defaults** restores the shipped set, and an extension
  without an entry uses the default colour.

The icon view frames the whole cell with the extension colour, the list view draws an underline under the row instead.
Folders that received files are highlighted too, and the wash fades out instead of disappearing at once.

## Settings

**Tools &gt; YKYToolkit &gt; Import Watcher Settings** opens a small window with these settings; the same values are in
**Edit &gt; Preferences &gt; YKY Toolkit &gt; Import Watcher**.

| Setting                              | Effect                                                               |
|--------------------------------------|----------------------------------------------------------------------|
| Highlight Color                      | Colour painted over an imported asset in the Project window.         |
| Highlight Duration                   | How long the highlight stays, in milliseconds.                       |
| Max History Sessions                 | How many editor sessions the history keeps.                          |
| Highlight colors for file extensions | Per-extension colours used by the highlight, with a count and reset. |

The reset button next to the section title restores the shipped values. Everything is stored per user in `EditorPrefs`,
so it is not committed.

## Delete history

Unity deletes assets without telling anyone. The Delete History window lists paths that were deleted (or deleted and
recreated) during the session, so a deleted `.meta` or a moved folder can be found again. **Tools &gt; YKYToolkit &gt;
Delete History** opens it; **Max Records** in [Preferences](./Preferences.md) caps how many entries are kept.
