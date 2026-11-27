# Editor tools

## LocalizationPackageAttribute

```csharp
[AttributeUsage(AttributeTargets.Assembly)]
public sealed class LocalizationPackageAttribute : Attribute
```

Declares which localization an assembly's editor UI uses. Declare it once per assembly, next to the `using`
directives; after that `LocalizationExtensions` resolves the right helper on its own, so the assembly needs neither a
wrapper class nor a helper field.

```csharp
[assembly: LocalizationPackage("io.github.ykysnk.yky-toolkit")]
```

An assembly without the attribute still compiles. `LocalizationHelper.For` logs a warning for it and returns a shared
unbound helper that displays every key unchanged.

### LocalizationPackageAttribute(string localizationID)

```csharp
public LocalizationPackageAttribute(string localizationID)
```

Creates the attribute for one localization id and stores it in `LocalizationID`.

### LocalizationID

```csharp
public string LocalizationID { get; }
```

Localization id whose assets hold this assembly's translations.

## LanguagePicker

```csharp
public class LanguagePicker : VisualElement
```

Ready-made UI Toolkit language picker. It lists every language of one localization id, switches the selected one on
change, and carries the `language-picker` class so it can be styled. Create it with
`LocalizationHelper.CreateLanguagePicker`, or build a custom control from `Languages` and `SetLanguage`.

The list is ordered by display name. The picker rebuilds itself when the localization assets are reloaded, so one
created before the delayed first load fills in later, and it follows switches made elsewhere. When the stored language
was renamed or removed it falls back to the first language and repairs the preference. The popup label is the
`label.language` entry and its tooltip; the registration is disposed when the picker leaves the panel.

### LanguagePicker(string localizationID)

```csharp
public LanguagePicker(string localizationID)
```

Creates the picker for one localization id. Prefer `LocalizationHelper.CreateLanguagePicker`.

```csharp
var picker = new LanguagePicker("io.github.ykysnk.yky-toolkit");
settingsCard.Add(picker);
```

### SelectedLanguage

```csharp
public string SelectedLanguage { get; set; }
```

Language id selected now. Assigning switches the language, which updates every element localized through `UILocalize`.

## LocalizationConverter

```csharp
public static class LocalizationConverter
```

Converts a `BasicLocalization` to and from the flat formats translation tools use. Every entry contributes its key and
text; an entry that uses a tooltip adds a second pair under the key with `tooltipSuffix` appended. Import merges by key
and never deletes entries: new keys are appended, existing ones get the imported text.

A key ending in a tooltip suffix is only read back as a tooltip when its base key exists in the file or the asset;
otherwise it stays a normal entry. That keeps keys such as `label.basic_translate.tooltip` intact.

### TooltipSuffixes

```csharp
public static readonly string[] TooltipSuffixes = { ":tooltip", ".tooltip", "_tooltip" };
```

Suffixes recognised when a key is read back as a tooltip entry.

### ToJson

```csharp
public static string ToJson(BasicLocalization localization)
```

Flat JSON object: key to text, plus one tooltip key per entry that uses a tooltip.

### ToPo

```csharp
public static string ToPo(BasicLocalization localization)
```

PO file with one `msgid`/`msgstr` pair per key, tooltips included. The header carries `Language: {asset name}`, because
Unity's own PO importer rejects a file without it and leaves only an import error behind.

### TryImportJson

```csharp
public static bool TryImportJson(BasicLocalization localization, string? text, out Exception? exception)
```

Reads a flat JSON object into `localization`. Returns false and puts the parse error in `exception`; a null text is
treated as `""`, which is not a JSON object and therefore fails.

### TryImportPo

```csharp
public static bool TryImportPo(BasicLocalization localization, string? text, out Exception? exception)
```

Reads a PO file into `localization`. Returns false and puts the parse error in `exception`; a null text is treated as
empty and imports nothing.

## TranslateClipboard

```csharp
public static class TranslateClipboard
```

Clipboard handling for translation entries, shared by the inspector and the row drawer.

### HasEntry()

```csharp
public static bool HasEntry()
```

Whether the clipboard currently holds a translation entry. The answer is cached for the clipboard text, so a button can
ask often without parsing the JSON again.

### TryRead(out BasicTranslate?, out Exception?)

```csharp
public static bool TryRead([NotNullWhen(true)] out BasicTranslate? basicTranslate, out Exception? exception)
```

Tries to read a `BasicTranslate` from the clipboard. The text must parse as JSON and carry a non-empty `key`, so an
empty clipboard or an unrelated JSON object is rejected instead of overwriting the row with empty values.

`basicTranslate` is the parsed entry when the method returns true, otherwise null. `exception` is the parse or
validation error, or null when the clipboard was simply empty.

```csharp
if (TranslateClipboard.TryRead(out var entry, out var error))
    Paste(entry);
else if (error != null)
    Debug.LogWarning(error.Message);
```
