# Inspector

Open a `BasicLocalization` asset to edit one language.

## Settings card

- **ローカライゼーションID** - the id shared by every language of the package.
- **表示名** - the name shown in the language picker.
- **言語** - the language this site (and the editor) currently shows in every package with the same id.

The picker is the ready-made `LanguagePicker` control; switching it updates every open inspector and window at once.

## Format conversion

The foldout holds the sidecar files:

| Field | Contents |
| --- | --- |
| JSON ファイル | Flat `key: text` object exported next to the asset. |
| PO ファイル | Gettext file, one `msgid`/`msgstr` pair per key. |

The `…` buttons copy a file from disk next to the asset. **Export** writes the current asset, **Import** merges a file
back by key. Only `TextAsset` and `LocalizationAsset` files are accepted in the two fields.

## Translation list

The toolbar above the list contains the search field, the entry count, and the add/remove buttons.

- The search filters by key, text or tooltip. It runs after you stop typing.
- The count shows `filtered/total` while a filter is active.
- **+** adds an empty entry at the end; **-** removes the selected entries.
- Right-click a row for copy, paste and remove.
- Drag a row to reorder it (only while no filter is active).

## Translation row

| Field | Notes |
| --- | --- |
| 翻訳ID | The key, for example `label.my_window.title`. |
| 翻訳 | The text. Multiline. |
| ツールチップを使う | Turn on to store a tooltip; the two fields below appear. |
| ツールチップの接尾辞 | Suffix for the tooltip key, `:tooltip` by default. |
| ツールチップ | The tooltip text. |

**コピー** puts the whole entry on the clipboard as JSON, **ペースト** writes a copied entry back into the row. The
paste button is enabled when the clipboard holds an entry.

## Script icons

`BasicLocalization` and `BasicTranslate` ship with their own script icon (`Runtime/Icons`). The SVGs are the sources;
the 256 px PNGs are what Unity imports.
