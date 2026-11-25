# API

## Namespaces

| Namespace | Assembly | Scope |
| --- | --- | --- |
| `io.github.ykysnk.Localization` | `io.github.ykysnk.localization` | runtime |
| `io.github.ykysnk.Localization.Editor` | `io.github.ykysnk.localization.Editor` | editor only |

`BasicLocalization` and `BasicTranslate` live in the runtime namespace; every other type on this page is editor-only.

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

## LocalizationHelper

```csharp
public class LocalizationHelper
```

Looks keys up for one localization id and keeps UI elements up to date when the language or the data changes. Obtain
it with `For`, which reads the id from the assembly attribute.

### LocalizationHelper(string localizationID)

```csharp
public LocalizationHelper(string localizationID)
```

Creates a helper for one localization id. Prefer `For(Assembly)` or `For(Type)`, which read the id from the
`LocalizationPackageAttribute`.

### For(Assembly)

```csharp
public static LocalizationHelper For(Assembly assembly)
```

Helper declared by `assembly`'s `LocalizationPackageAttribute`, cached one per assembly. Without the attribute it logs
a warning and returns the shared unbound helper.

### For(Type)

```csharp
public static LocalizationHelper For(Type type)
```

`For(type.Assembly)`; the helper of the assembly that contains `type`.

### SelectedLanguage

```csharp
public string SelectedLanguage { get; set; }
```

Language id selected now, for example `ja-JP`. The value is persisted in `EditorPrefs` under
`{localizationID}_Language` with `en-US` as the default.

Assigning switches the language and rewrites every element localized through `UILocalize` or `UpdateRegister`. The
getter throws `ArgumentException` when the id has no assets loaded; the setter also throws when the language is not in
`Languages`.

```csharp
helper.SelectedLanguage = "ja-JP";
```

### SetLanguage(string)

```csharp
public void SetLanguage(string language)
```

Same as assigning `SelectedLanguage`.

### Languages

```csharp
public IReadOnlyList<string> Languages { get; }
```

Language ids of this localization in display order. An id is the file name of a `BasicLocalization` asset (`en-US`,
`ja-JP`); the list is sorted by display name and is empty until the assets are loaded.

### LanguageNames

```csharp
public IReadOnlyList<string> LanguageNames { get; }
```

Display names matching `Languages` index for index.

```csharp
var ids = helper.Languages;
for (var i = 0; i < ids.Count; i++)
{
    var id = ids[i];
    menu.AppendAction(helper.LanguageNames[i], _ => helper.SetLanguage(id));
}
```

### S(string, string?)

```csharp
public string S(string key, string? defaultValue = null)
```

Text of `key` in the selected language. Falls back to the `en-US` text, then to `defaultValue`, then to the key itself,
so a missing translation never throws. An empty text in the selected language also falls back to English.

```csharp
label.text = helper.S("label.my_window.title");
```

### S(string, out string?)

```csharp
public bool S(string key, out string? localizationString)
```

Looks up `key` without falling back to the key itself; returns false when no language has text for it.
`localizationString` is null in that case.

```csharp
if (helper.S("unity:label.position", out var text))
    label.text = L10n.Tr(text!);
```

### S(SerializedProperty)

```csharp
public string S(SerializedProperty property)
```

Text for the key derived from `property`: `label.{Type}.{field}`. See
[Keys from a SerializedProperty](#keys-from-a-serializedproperty).

### Sf(string, params object?[])

```csharp
public string Sf(string key, params object?[] args)
```

`S(key)` run through `string.Format`. A format string that does not match the arguments is returned as
`text(arg1, arg2)` instead of throwing.

```csharp
var text = helper.Sf("label.found_count", 3);   // "3 assets found"
```

### G(string)

```csharp
public GUIContent G(string key)
```

`GUIContent` with the text of `key` and its `:tooltip` entry as the tooltip.

### G(string, Texture?)

```csharp
public GUIContent G(string key, Texture? image)
```

Same as `G(string)`, with the icon `image`.

### G(string, Texture?, string?)

```csharp
public GUIContent G(string key, Texture? image, string? tooltip)
```

Text of `key`, the icon `image`, and the text stored under the key `tooltip`.

```csharp
GUILayout.Button(helper.G("label.browse", icon), GUILayout.Width(80));
```

One `GUIContent` is cached per localization id and key and rewritten on every call, so it is not updated by a language
change alone; the next `G` call refreshes it.

### G(SerializedProperty)

```csharp
public GUIContent G(SerializedProperty property)
```

`GUIContent` for the key derived from `property`.

### Tooltip(string, string?)

```csharp
public string Tooltip(string key, string? defaultValue = null)
```

Tooltip of `key`, that is the entry stored with the `:tooltip` suffix. `defaultValue` works as in `S(string, string?)`,
so without an entry and without a default the text returned is `{key}:tooltip`.

### Tooltip(string, out string?)

```csharp
public bool Tooltip(string key, out string? tooltip)
```

Tooltip lookup without a fallback; false when the tooltip entry does not exist.

### Tooltip(SerializedProperty)

```csharp
public string Tooltip(SerializedProperty property)
```

Tooltip for the key derived from `property`; empty when there is none.

### UpdateRegister(string, UpdateHelper.Callback)

```csharp
public UpdateHelper UpdateRegister(string localizeKey, UpdateHelper.Callback callback)
```

Registers `callback` for `localizeKey`. It receives the label and the `:tooltip` text of the key, and runs whenever the
language changes or the assets are reloaded. Dispose the handle when the element it updates goes away.

```csharp
var registration = helper.UpdateRegister("label.my_window.title", (text, tooltip) =>
{
    title.text = text;
    title.tooltip = tooltip;
});

title.RegisterCallback<DetachFromPanelEvent>(_ => registration.Dispose());
```

### UpdateRegister(SerializedProperty, UpdateHelper.Callback)

```csharp
public UpdateHelper UpdateRegister(SerializedProperty property, UpdateHelper.Callback callback)
```

Same as `UpdateRegister(string, UpdateHelper.Callback)` for the key derived from `property`.

### UILocalize(VisualElement, bool, int)

```csharp
public void UILocalize(VisualElement elem, bool addLanguagePopup = true, int spaceHeight = 8)
```

Replaces the keys in the tree of `elem` with their translations and keeps them up to date. For every element the first
of `text`, `label` and `headerTitle` that has a setter is read as the key and written back translated, and the tooltip
is filled from the key's `:tooltip` entry.

The tree is localized immediately, so keys never reach the screen, and once more after the binding pass because
bindings can put the key back. Registrations are disposed when an element is detached from the panel. With
`addLanguagePopup` the language picker is appended below a gap of `spaceHeight`.

Skipped: children named `unity-text-input` or `unity-content` (with their subtree), any subtree carrying the
`localize-skip` class, and elements with `unity-base-field__inspector-field` or `unity-object-field-display__label`.
An element with the `localize-tooltip` class is not given a tooltip from its label key; its existing `tooltip` is
treated as a key and localized itself.

### GetLanguageLocalization(string)

```csharp
public Dictionary<string, string> GetLanguageLocalization(string language)
```

Snapshot of every key and text of one language, returned as a new dictionary. Throws `ArgumentException` when the
localization id or the language is unknown.

### CreateLanguagePicker()

```csharp
public LanguagePicker CreateLanguagePicker()
```

A new `LanguagePicker` for this localization, ready to be added to a tree.

```csharp
settingsCard.Add(helper.CreateLanguagePicker());
```

### SelectLanguageElement(VisualElement, int)

```csharp
public void SelectLanguageElement(VisualElement element, int spaceHeight = 8)
```

Appends a gap of `spaceHeight` and a UI Toolkit language popup to `element`. Prefer `CreateLanguagePicker` when the
control has to be placed or styled.

### SelectLanguageGUI()

```csharp
public void SelectLanguageGUI()
```

Draws the IMGUI language picker with `EditorGUILayout.Popup`, labelled with `label.language` and its tooltip.

### OnLocalizationChanged

```csharp
public event LocalizationChanged? OnLocalizationChanged

public delegate void LocalizationChanged(string newLanguage)
```

Raised with the new language when the selected language of this localization changes. The helper subscribes to
`GlobalLocalization.OnLocalizationChanged` only while a handler is attached and unsubscribes with the last one.

### LocalizationUpdated

```csharp
public delegate void LocalizationUpdated()
```

No-argument delegate type declared alongside `LocalizationChanged`. `LocalizationHelper` exposes no event of this type;
reload notifications come from `GlobalLocalization.OnLocalizationReload`.

## LocalizationExtensions

```csharp
public static class LocalizationExtensions
```

The editor UI sugar: `"label.some_key".S()`, `tree.UILocalize()` and friends. Each method resolves the helper from the
`LocalizationPackageAttribute` of the assembly that makes the call, so a package needs no wrapper class of its own.

Every method is marked `[MethodImpl(MethodImplOptions.NoInlining)]`, because `Assembly.GetCallingAssembly` reports this
assembly instead of the consumer as soon as the call is inlined.

### S(this string)

```csharp
public static string S(this string key)
```

Text of `key` in the calling assembly's localization.

```csharp
label.text = "label.my_window.title".S();
```

### S(this SerializedProperty)

```csharp
public static string S(this SerializedProperty property)
```

Text for the key derived from `property`.

### Sf(this string, params object?[])

```csharp
public static string Sf(this string key, params object?[] args)
```

Text of `key` run through `string.Format`.

```csharp
label.text = "label.found_count".Sf(count);
```

### G(this string)

```csharp
public static GUIContent G(this string key)
```

`GUIContent` with the text of `key` and its tooltip.

```csharp
GUILayout.Label("label.my_window.title".G());
```

### G(this SerializedProperty)

```csharp
public static GUIContent G(this SerializedProperty property)
```

`GUIContent` for the key derived from `property`.

### Tooltip(this string)

```csharp
public static string Tooltip(this string key)
```

Tooltip of `key`, the entry stored with the `:tooltip` suffix.

### Tooltip(this SerializedProperty)

```csharp
public static string Tooltip(this SerializedProperty property)
```

Tooltip for the key derived from `property`.

### UILocalize(this VisualElement, bool, int)

```csharp
public static void UILocalize(this VisualElement element, bool addLanguagePopup = true, int spaceHeight = 8)
```

Replaces the keys in `element`'s tree with their translations and keeps them up to date. Call it before binding the
tree. See `LocalizationHelper.UILocalize` for the attributes, skips and the second pass.

```csharp
root.UILocalize();
```

### Register(this string, UpdateHelper.Callback)

```csharp
public static UpdateHelper Register(this string localizeKey, UpdateHelper.Callback callback)
```

Registers `callback` for `localizeKey`; dispose the handle when the element it updates goes away.

### Register(this SerializedProperty, UpdateHelper.Callback)

```csharp
public static UpdateHelper Register(this SerializedProperty property, UpdateHelper.Callback callback)
```

Registers `callback` for the key derived from `property`.

### Keys from a SerializedProperty

`S(property)`, `G(property)`, `Tooltip(property)` and `Register(property, ...)` build `label.{Type}.{field}`. `Type` is
the type name of `property.serializedObject.targetObject`; both parts are converted by the same rule:

- an upper-case letter starts a new word at a lower-to-upper boundary or before the last capital of an acronym:
  `UIText` becomes `ui_text`, `HPBar` becomes `hp_bar`, `localizationID` becomes `localization_id`;
- symbols and punctuation become `_`.

So a `displayName` field on `MyWindow` is `label.my_window.display_name`.

## UpdateHelper

```csharp
public class UpdateHelper : IDisposable
```

Keeps one label and tooltip pair up to date when the localization is reloaded or the language changes. Every
registration is independent, so several elements can share the same key.

### UpdateHelper.Callback

```csharp
public delegate void Callback(string newLabel, string newTooltip)
```

Receives the new label and tooltip of the registered key.

### Register(string, string, Callback)

```csharp
public static UpdateHelper Register(string localizationID, string localizeKey, Callback callback)
```

Registers `callback` for one key of one localization id and returns the handle that unregisters it. The callback is not
invoked by `Register` itself; it runs on the next language change or reload, so set the initial text with `S` and
`Tooltip`.

### Register(string, SerializedProperty, Callback)

```csharp
public static UpdateHelper Register(string localizationID, SerializedProperty property, Callback callback)
```

Registers the key a label property would use, derived from its type and field name.

### Dispose()

```csharp
public void Dispose()
```

Stops updating the callback and removes the registration. Call it when the element it updates is removed; after that
the callback is never invoked again.

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

## BasicLocalization

```csharp
[CreateAssetMenu(fileName = "en-US", menuName = "Localization/Basic Localization")]
public class BasicLocalization : ScriptableObject
```

One localization set: the translations of one language. The asset's file name is the language id used in `Languages`
and `SetLanguage`; `localizationID` groups the languages of one package. `jsonFile` and `poFile` optionally point at
the sidecar files written by the inspector, so the same text can be edited with external tools.

### localizationID

```csharp
public string localizationID = "";
```

Group id shared by every language of the same localization. An asset with an empty id is skipped with a warning when
the assets are loaded.

### displayName

```csharp
public string displayName = "English";
```

Name shown in the language picker. `OnValidate` restores `English` when the field is empty.

### translates

```csharp
public List<BasicTranslate> translates = new();
```

All translations of this language. A new asset starts with the `label.language` entry.

### jsonFile

```csharp
public Object? jsonFile;
```

Sidecar JSON written by `Export JSON` in the inspector.

### poFile

```csharp
public Object? poFile;
```

Sidecar PO written by `Export PO` in the inspector.

### OnLocalizationFileUpdated

```csharp
public static event LocalizationFileUpdated? OnLocalizationFileUpdated

public delegate void LocalizationFileUpdated(string localizationID, string localizationName)
```

Raised from `OnValidate` after any asset changed, with its localization id and asset name. `GlobalLocalization` uses
it to schedule a reload.

## BasicTranslate

```csharp
[Serializable]
public class BasicTranslate
```

One translation entry: the key, its text and the optional tooltip. Tooltips are opt-in; with `useTooltip` false the
text in `tooltip` stays in the asset but is not loaded or shown.

### DefaultTooltipSuffix

```csharp
public const string DefaultTooltipSuffix = ":tooltip";
```

Suffix appended to `key` unless an entry overrides it.

### key

```csharp
public string key = "";
```

Key that identifies the translation, for example `label.language`.

### translate

```csharp
public string translate = "";
```

Translated text for `key`.

### tooltip

```csharp
public string tooltip = "";
```

Tooltip text, used only when `useTooltip` is true.

### useTooltip

```csharp
public bool useTooltip;
```

Whether the tooltip takes part in loading and in the editor UI. Off by default.

### tooltipSuffix

```csharp
public string tooltipSuffix = DefaultTooltipSuffix;
```

Suffix appended to `key` to publish the tooltip, for example `label.language:tooltip`. Leave it at the default unless a
plugin expects another spelling such as `.tooltip`; the loader keeps `:tooltip` resolvable for such an entry as well.

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

## GlobalLocalization

```csharp
[InitializeOnLoad]
public static class GlobalLocalization
```

Loads every `BasicLocalization` asset in the project, keeps the per-id language dictionaries and the selected language,
and refreshes the registrations. Lookups go through `LocalizationHelper`; this type exposes only its events and
delegates.

The load is deferred to the first editor tick and coalesced with a 250 ms delay after an asset changes, so typing in a
translation asset does not rescan the project on every keystroke. `Tools > Localization > Reload Localizations` forces
a reload. The selected language is stored per id in `EditorPrefs` under `{localizationID}_Language`.

### OnLocalizationReload

```csharp
public static event LocalizationUpdated? OnLocalizationReload

public delegate void LocalizationUpdated()
```

Raised after the assets were loaded again, once every registration has been refreshed. Use it for UI that is not kept
up to date by `UILocalize` or `UpdateRegister`.

### OnLocalizationChanged

```csharp
public static event LocalizationChanged? OnLocalizationChanged

public delegate void LocalizationChanged(string localizationID, string newLanguage)
```

Raised when the selected language of one localization changes, with the localization id and the new language.
Registrations are refreshed before the event is raised. A reload does not raise it.

## Unity keys

A key that starts with `unity:` holds the English text of a Unity editor string, and Unity translates that text through
`L10n.Tr` instead of the package translating the key. The package only resolves the key to its source text:

```csharp
var key = "unity:label.position";
var source = helper.S(key, out var localized) ? localized : key;
label.text = L10n.Tr(source);
```

`UILocalize` performs the same steps: it looks the key up in the selected language and then in `en-US`, passes the
result (or the raw key) to `L10n.Tr`, and treats the tooltip the same way. Elements with a `unity:` key are not
registered for live updates, because their text follows Unity's editor language, not the selected language of the
package; changing Unity's language requires a restart and the label is resolved again when the tree is rebuilt.

Keep the English text in the `en-US` asset. The loader warns when a `unity:` key is missing from `en-US` or its English
text is empty. Once the assets are loaded, `UILocalize` warns once per key that resolves nowhere, and the label shows
the raw key. See [Unity-Keys](Unity-Keys).
