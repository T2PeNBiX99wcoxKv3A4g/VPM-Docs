# LocalizationHelper

`io.github.ykysnk.Localization.Editor` · `public class LocalizationHelper`

Looks keys up for one localization id and keeps UI elements up to date when the language or the data changes. Obtain it with `For`, which reads the id from the assembly attribute.

The helper holds nothing but the id: every lookup and every registration is forwarded to the loader described in [`GlobalLocalization`](./API-GlobalLocalization.md), so two helpers for the same id see the same data and the same selected language.

## Constructors

```csharp
public LocalizationHelper(string localizationID)
```

Creates a helper for one localization id. Prefer `For(Assembly)` or `For(Type)`, which read the id from the `LocalizationPackageAttribute`; a helper built by hand is not cached per assembly and does not warn when the id never loads.

## SelectedLanguage

```csharp
public string SelectedLanguage { get; set; }
```

Language id selected now, for example `ja-JP`. The value is persisted in `EditorPrefs` under `{localizationID}_Language` with `en-US` as the default.

Assigning switches the language, rewrites every element localized through `UILocalize` or `UpdateRegister` and then raises `OnLocalizationChanged`. The getter throws `ArgumentException` when the id has no assets loaded; the setter also throws when the language is not in `Languages`.

```csharp
helper.SelectedLanguage = "ja-JP";
```

## Languages

```csharp
public IReadOnlyList<string> Languages { get; }
```

Language ids of this localization in display order. An id is the file name of a `BasicLocalization` asset (`en-US`, `ja-JP`); the list is sorted by display name with an invariant comparer and is empty until the assets are loaded.

## LanguageNames

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

## OnLocalizationChanged

```csharp
public event LocalizationChanged? OnLocalizationChanged
```

Raised with the new language when the selected language of this localization changes. The helper subscribes to `GlobalLocalization.OnLocalizationChanged` while the first handler is attached and unsubscribes with the last one, so a helper that is only used for lookups adds no listener.

## LocalizationChanged

```csharp
public delegate void LocalizationChanged(string newLanguage)
```

Handler type of `OnLocalizationChanged`: it receives the language that was just selected, without the localization id.

## LocalizationUpdated

```csharp
public delegate void LocalizationUpdated()
```

No-argument delegate type declared alongside `LocalizationChanged`. `LocalizationHelper` exposes no event of this type; reload notifications come from `GlobalLocalization.OnLocalizationReload`.

## For

```csharp
public static LocalizationHelper For(Assembly assembly)
public static LocalizationHelper For(Type type)
```

`For(assembly)` returns the helper declared by `assembly`'s `LocalizationPackageAttribute`, cached one per assembly. An assembly without the attribute logs a warning and gets the shared unbound helper, which has an empty id and therefore shows every key unchanged. `For(type)` is `For(type.Assembly)`, the helper of the assembly that contains `type`.

```csharp
var helper = LocalizationHelper.For(typeof(MyWindow));
```

## SetLanguage

```csharp
public void SetLanguage(string language)
```

Same as assigning `SelectedLanguage`.

## CreateLanguagePicker

```csharp
public LanguagePicker CreateLanguagePicker()
```

A new `LanguagePicker` for this localization, ready to be added to a tree. See [`LanguagePicker`](./API-LanguagePicker.md) for what the control does once it is attached.

```csharp
settingsCard.Add(helper.CreateLanguagePicker());
```

## SelectLanguageGUI

```csharp
public void SelectLanguageGUI()
```

Draws the IMGUI language picker with `EditorGUILayout.Popup`, labelled with `label.language` and its tooltip. A stored language that is no longer listed selects the first entry, and a change goes through the same path as `SetLanguage`.

## SelectLanguageElement

```csharp
public void SelectLanguageElement(VisualElement element, int spaceHeight = 8)
```

Appends a gap of `spaceHeight` and a UI Toolkit language popup to `element`. The assets are loaded on the spot when the delayed first load has not run yet, and a stored language that no longer exists falls back to the first language and repairs the preference without raising a change event. The label registration is disposed when the popup leaves the panel.

Prefer `CreateLanguagePicker` when the control has to be placed or styled.

## UpdateRegister

```csharp
public UpdateHelper UpdateRegister(string localizeKey, UpdateHelper.Callback callback)
public UpdateHelper UpdateRegister(SerializedProperty property, UpdateHelper.Callback callback)
```

Registers `callback` for `localizeKey`; it receives the label and the `:tooltip` text of the key and runs whenever the language changes or the assets are reloaded. The `SerializedProperty` overload uses the key derived from the property. Dispose the handle when the element it updates goes away; see [`UpdateHelper`](./API-UpdateHelper.md).

```csharp
var registration = helper.UpdateRegister("label.my_window.title", (text, tooltip) =>
{
    title.text = text;
    title.tooltip = tooltip;
});

title.RegisterCallback<DetachFromPanelEvent>(_ => registration.Dispose());
```

## GetLanguageLocalization

```csharp
public Dictionary<string, string> GetLanguageLocalization(string language)
```

Snapshot of every key and text of one language, returned as a new dictionary. Throws `ArgumentException` when the localization id or the language is unknown.

## S

```csharp
public string S(string key, string? defaultValue = null)
public bool S(string key, out string? localizationString)
public string S(SerializedProperty property)
```

`S(key, defaultValue)` returns the text of `key` in the selected language, falling back to the `en-US` text, then to `defaultValue`, then to the key itself, so a missing translation never throws. An empty text in the selected language also falls back to English.

`S(key, out localizationString)` looks the key up in the selected language and then in `en-US`, without falling back to the key itself. It returns false and leaves `localizationString` null when neither has an entry, which is how a `unity:` key is told apart from a literal text.

`S(property)` uses the key derived from the property: `label.{Type}.{field}`, where `Type` is the type name of `property.serializedObject.targetObject` and both parts go through the same name conversion (`UIText` becomes `ui_text`, `HPBar` becomes `hp_bar`, `localizationID` becomes `localization_id`, symbols and punctuation become `_`). A `displayName` field on `MyWindow` is therefore `label.my_window.display_name`.

```csharp
label.text = helper.S("label.my_window.title");
```

## Sf

```csharp
public string Sf(string key, params object?[] args)
```

`S(key)` run through `string.Format`. A format string that does not match the arguments is returned as `text(arg1, arg2)` instead of throwing.

```csharp
var text = helper.Sf("label.found_count", 3);   // "3 assets found"
```

## G

```csharp
public GUIContent G(string key)
public GUIContent G(string key, Texture? image)
public GUIContent G(string key, Texture? image, string? tooltip)
public GUIContent G(SerializedProperty property)
```

`G(key)` is a `GUIContent` with the text of `key` and its `:tooltip` entry as the tooltip. The `image` overload adds the icon, the three-argument overload reads the tooltip from the key `tooltip` instead and leaves it empty when there is no such entry, and `G(property)` uses the derived `label.{Type}.{field}` key.

```csharp
GUILayout.Button(helper.G("label.browse", icon), GUILayout.Width(80));
```

One `GUIContent` is cached per localization id and key and rewritten on every call, so it is not updated by a language change alone; the next `G` call refreshes it.

## Tooltip

```csharp
public string Tooltip(string key, string? defaultValue = null)
public bool Tooltip(string key, out string? tooltip)
public string Tooltip(SerializedProperty property)
```

Tooltip of `key`, that is the entry stored with the `:tooltip` suffix. `defaultValue` works as in `S(string, string?)`, so without an entry and without a default the text returned is `{key}:tooltip`.

The `out` overload does not fall back at all and returns false when the entry does not exist; `Tooltip(property)` returns an empty string in that case.

## UILocalize

```csharp
public void UILocalize(VisualElement elem, bool addLanguagePopup = true, int spaceHeight = 8)
```

Replaces the keys in the tree of `elem` with their translations and keeps them up to date. For every element the first of `text`, `label` and `headerTitle` that has a setter is read as the key and written back translated, and the tooltip is filled from the key's `:tooltip` entry. A key with the `unity:` prefix holds the English text that `L10n.Tr` translates, so it is resolved first and then passed through `L10n.Tr`; such a label is translated once and not registered, and a key without an entry logs a warning once and stays as the raw key.

The tree is localized immediately, so keys never reach the screen, and once more on the next scheduler tick because the bindings that run after `UILocalize` can put the key back. Only the first pass registers, so an element whose text is not a known key is left alone and the second pass only rewrites what the first one registered. Registrations are disposed when an element is detached from the panel. With `addLanguagePopup` the language picker is appended below a gap of `spaceHeight`.

Skipped: children named `unity-text-input` or `unity-content` (with their subtree), any subtree carrying the `localize-skip` class, and elements with `unity-base-field__inspector-field` or `unity-object-field-display__label`, which are skipped themselves but still have their children visited. An element with the `localize-tooltip` class is not given a tooltip from its label key; its existing `tooltip` is treated as a key, localized itself and kept registered on its own.

```csharp
var root = uxml.CloneTree();
helper.UILocalize(root);
```
