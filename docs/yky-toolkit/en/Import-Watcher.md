# Import Watcher

**Tools > YKYToolkit > Import Watcher** records what Unity imports while it runs: the asset, the package it came from,
the file extension and whether the import succeeded.

## The log

The window keeps one session per editor run. Each row shows the time, the asset path and its status.

- **検索** filters the log by path or package.
- The add/remove buttons at the bottom of the list control the history size.
- Right-click a row to copy the path or remove it.
- **Refresh** re-reads the current session; **Delete History** opens the window that lists deleted assets.

## Colors

Each file extension can have its own color, so a `.unitypackage` import stands out from a `.cs` file:

1. Open **Import Watcher Settings**.
2. Add an extension and pick a color.
3. The log and the hierarchy highlight use that color from the next import on.

## Settings

| Setting | Effect |
| --- | --- |
| Max sessions | How many editor sessions are kept in the history. |
| Colors | Per-extension colors for the log. |

The settings live in the project's `EditorPrefs`; they are not committed.

## Delete history

Unity deletes assets without telling anyone. The Delete History window lists paths that were deleted (or deleted and
recreated) during the session, so a deleted `.meta` or a moved folder can be found again. **Tools > YKYToolkit >
Delete History** opens it.
