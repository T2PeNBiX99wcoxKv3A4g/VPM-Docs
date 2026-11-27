# LocalizationConverter

`io.github.ykysnk.Localization.Editor` · `public static class LocalizationConverter`

Converts a `BasicLocalization` to and from the flat formats translation tools use. Every entry becomes `"key" = "translate"`; an entry that uses a tooltip adds a second pair under `key + tooltipSuffix`. Entries with an empty key are left out.

Import merges by key and never deletes entries: new keys are appended, existing ones get the imported text. A key ending in a tooltip suffix is only read back as a tooltip when its base key exists in the file or the asset; otherwise it stays a normal entry, which keeps keys such as `label.basic_translate.tooltip` intact. The text is parsed completely before anything is written, so a failed import leaves the asset unchanged.

## TooltipSuffixes

```csharp
public static readonly string[] TooltipSuffixes = { BasicTranslate.DefaultTooltipSuffix, ".tooltip", "_tooltip" };
```

Suffixes recognised when a key is read back as a tooltip entry, tried in this order. The first one is [`BasicTranslate.DefaultTooltipSuffix`](./API-BasicTranslate.md), so `:tooltip` is the preferred spelling.

## ToJson

```csharp
public static string ToJson(BasicLocalization localization)
```

Flat JSON object: key to text, plus one tooltip key per entry that uses a tooltip. Keys keep the order of `translates`, every pair sits on its own two-space indented line, and the text ends with a newline.

## ToPo

```csharp
public static string ToPo(BasicLocalization localization)
```

PO file with one `msgid`/`msgstr` pair per key, tooltips included. The header carries `Language: {asset name}` — the asset file name, which is the language id — because Unity's own PO importer rejects a file without it and leaves only an import error behind.

## TryImportJson

```csharp
public static bool TryImportJson(BasicLocalization localization, string? text, out Exception? exception)
```

Reads a flat JSON object into `localization`. Returns false and puts the parse error in `exception`; a null text is treated as `""`, which is not a JSON object and therefore fails. Values have to be strings, so a number, a nested object or trailing text fails with a `FormatException`.

## TryImportPo

```csharp
public static bool TryImportPo(BasicLocalization localization, string? text, out Exception? exception)
```

Reads a PO file into `localization`. Returns false and puts the parse error in `exception`; a null text is treated as empty and imports nothing. Comment lines, `msgctxt` and `msgid_plural` are ignored, a string spread over several lines is joined, only the first plural form (`msgstr[0]`) is used, and the header entry with its empty `msgid` is dropped. A line the parser does not understand fails the import instead of being skipped.
