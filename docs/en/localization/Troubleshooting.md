# Troubleshooting

## The UI shows the key instead of the text

1. Does the asset have an entry for that exact key?
2. Is the asset's `localizationID` the same as the one in the `[assembly: LocalizationPackage("...")]` attribute?
3. Is the asset's file name the language id (`en-US`), so the fallback can find it?
4. Is the element localized through `UILocalize`? Plain `new Label("label.x")` without it is never rewritten.

The same message is logged when a `unity:` key has no entry at all - see [Unity-Keys](./Unity-Keys.md).

## The text is empty

An entry with an empty `translate` counts as translated: English fallback does not kick in. Fill the English asset
first; the other languages fall back to it automatically.

## The tooltip is empty

Tooltips only load when `useTooltip` is on. The stored tooltip is ignored otherwise, and the `{key}:tooltip` entry is
what the UI reads.

## The language picker is empty

The language list is built from the assets that share the id. Give every language asset the same `localizationID`
and name the file after the language id.

## Changes do not show up

Changing a translation asset reloads the data 250 ms after the last edit. If the console shows an exception from a
custom inspector, the reload may have been skipped; run **Tools &gt; Localization &gt; Reload Localizations**.

## Import replaced nothing

Import merges by key: entries that exist only in the asset are kept, and only keys present in the file are updated.
Check that the file uses the same `msgid`/keys as the asset.

## The editor is slow while typing translations

The inspector debounces the reload and the search. If a project with many assets still feels slow, check that no
script updates the asset every frame; `OnValidate` runs per change and schedules one reload, not one per keystroke.
