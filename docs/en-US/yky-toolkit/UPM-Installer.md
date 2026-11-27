# UPM Installer

**Tools &gt; YKYToolkit &gt; UPM Installer** installs, removes and updates UPM packages without leaving the editor.

## The two columns

The left column is the package list of the current operation; the right column holds the saved package lists and the
list maker.

## Toolbar

| Button                                      | Action                                                                |
|---------------------------------------------|-----------------------------------------------------------------------|
| Install                                     | Installs every package in the left list.                              |
| Remove                                      | Removes the packages in the left list.                                |
| Update                                      | Queries the registry and adds the packages that have a newer version. |
| Clear                                       | Empties the left list.                                                |
| Check update then upgrade all UPM packages  | Upgrades every installed package.                                     |
| Import to maker                             | Copies the left list into the maker on the right.                     |

The button text follows the language chosen in [Preferences](./Preferences.md); the names above are the English ones.

## Saved package lists

A saved list has a name and any number of `name@version` entries.

- Expand a row to open its **Packages** foldout and edit the entries.
- **Import** adds the selected list to the left column.
- **Remove Selected** removes it.
- Right-click a row to copy it as JSON or delete it.
- Lists are stored per project in `EditorPrefs`, so they survive restarts but stay out of version control.

## The maker

The maker is the working list for a new saved list: add package entries, then type a name in **Package List Name** and
press **Create and copy**. The list is saved and copied to the clipboard as JSON, so it can be shared or committed to a
repository.

## How a package version is written

Entries are `packageName` plus an optional `version`. An empty version means the newest compatible one; a version pins
that exact release. The list accepts packages from the registry, from Git and from local paths, as UPM does.
