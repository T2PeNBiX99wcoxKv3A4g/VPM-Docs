# UPM Installer

**Tools > YKYToolkit > UPM Installer** installs, removes and updates UPM packages without leaving the editor.

## The two columns

The left column is the package list of the current operation; the right column holds the saved package lists and the
list maker.

## Toolbar

| Button                                                                      | Action                                                                |
|-----------------------------------------------------------------------------|-----------------------------------------------------------------------|
| インストール (Install)                                                      | Installs every package in the left list.                              |
| 削除 (Remove)                                                               | Removes the packages in the left list.                                |
| 更新 (Update)                                                               | Queries the registry and adds the packages that have a newer version. |
| クリア (Clear)                                                              | Empties the left list.                                                |
| 更新を確認し、すべてのUPMパッケージをアップグレードする (Check and upgrade) | Upgrades every installed package.                                     |
| メーカーにインポートする (Import to maker)                                  | Copies the left list into the maker on the right.                     |

## Saved package lists

A saved list has a name and any number of `name@version` entries.

- Expand a row to see and edit its packages.
- **インポート** adds the selected list to the left column.
- **選択した項目を削除** removes it.
- Right-click a row to copy it as JSON or delete it.
- Lists are stored per project in `EditorPrefs`, so they survive restarts but stay out of version control.

## The maker

The maker is the working list for a new saved list: add package entries, then type a name and press **作成してコピー**
(Create and copy). The list is saved and copied to the clipboard as JSON, so it can be shared or
committed to a repository.

## How a package version is written

Entries are `packageName` plus an optional `version`. An empty version means the newest compatible one; a version pins
that exact release. The list accepts packages from the registry, from Git and from local paths, as UPM does.
