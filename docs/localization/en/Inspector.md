# Inspector

Open a `BasicLocalization` asset to edit one language. The inspector is translated by the package itself, so the
labels follow the selected language; this page names the fields by what they do, with the field name in
`BasicLocalization` / `BasicTranslate` where it helps.

## Settings card

- **Localization id** (`localizationID`) - the id shared by every language of the package.
- **Display name** (`displayName`) - the name shown in the language picker.
- **Language** - the selected language of this id, the same in every editor window.

The picker is the ready-made `LanguagePicker` control; switching it updates every open inspector and window at once.

## Format conversion

The foldout holds the sidecar files:

| Field                  | Contents                                            |
|------------------------|-----------------------------------------------------|
| JSON file (`jsonFile`) | Flat `key: text` object exported next to the asset. |
| PO file (`poFile`)     | Gettext file, one `msgid`/`msgstr` pair per key.    |

The `…` buttons copy a file from disk next to the asset. Export writes the current asset, import merges a file back by
key. Only a `TextAsset` (JSON) and a `LocalizationAsset` (PO) can be assigned to the two fields.

## Translation list

The toolbar above the list contains the search field, the entry count, and the add/remove buttons.

- The search filters by key, text or tooltip. It runs after you stop typing.
- The count shows `filtered/total` while a filter is active.
- Add appends an empty entry at the end; remove deletes the selected entries.
- Right-click a row for copy, paste and remove.
- Drag a row to reorder it (only while no filter is active).

## Translation row

| Field           | Notes                                                    |
|-----------------|----------------------------------------------------------|
| `key`           | The key, for example `label.my_window.title`.            |
| `translate`     | The text. Multiline.                                     |
| `useTooltip`    | Turn on to store a tooltip; the two fields below appear. |
| `tooltipSuffix` | Suffix for the tooltip key, `:tooltip` by default.       |
| `tooltip`       | The tooltip text.                                        |

The copy button puts the whole entry on the clipboard as JSON; paste writes a copied entry back into the row. Paste is
enabled while the clipboard holds a translation entry.

## Script icons

`BasicLocalization` and `BasicTranslate` ship with their own script icon (`Runtime/Icons`). The SVGs are the sources;
the 256 px PNGs are what Unity imports.
