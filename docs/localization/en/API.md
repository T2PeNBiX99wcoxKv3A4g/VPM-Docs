# API

Everything lives in the `io.github.ykysnk.Localization.Editor` namespace and is editor-only.

## Get a helper

The helper is resolved from the calling assembly's `[LocalizationPackage]`, so a package usually never creates one:

```csharp
using io.github.ykysnk.Localization.Editor;

var helper = LocalizationHelper.For(typeof(MyEditorWindow));
```

`LocalizationHelper.For(Assembly)` and `For(Type)` cache one helper per assembly. An assembly without the attribute
logs a warning and shows keys unchanged.

## Extension methods

| Call | Result |
| --- | --- |
| `"label.my_window.title".S()` | Text in the selected language. |
| `"label.count".Sf(count)` | The text run through `string.Format`. |
| `"label.my_window.title".G()` | `GUIContent` with the text and its tooltip. |
| `"label.my_window.title".Tooltip()` | The tooltip text. |
| `property.S()` / `property.G()` / `property.Tooltip()` | Same, for the key derived from a `SerializedProperty` (`label.{Type}.{field}`). |
| `tree.UILocalize()` | Replaces keys in the tree and keeps them up to date. |
| `"label.my_window.title".Register(callback)` | Registration for a single key. |

`UILocalize` localizes `text`, `label` and `headerTitle` attributes (plus tooltips), runs **before** the first frame
and repeats after the binding pass, and returns after adding the language picker unless
`addLanguagePopup: false` is passed.

## Language selection

```csharp
helper.SelectedLanguage;          // "ja-JP"
helper.SetLanguage("en-US");      // switches and updates every localized element
helper.Languages;                 // ["en-US", "ja-JP", ...]
helper.LanguageNames;             // ["English", "日本語", ...]
```

## The picker control

```csharp
var picker = helper.CreateLanguagePicker();
settingsCard.Add(picker);
```

`LanguagePicker` is a `VisualElement` that builds its own `PopupField`. It rebuilds when the localization assets are
reloaded, follows switches made elsewhere, and can be styled through the `language-picker` class. The older helpers
`SelectLanguageElement(element, spaceHeight)` and `SelectLanguageGUI()` still exist.

## Keep a value in sync

```csharp
var registration = helper.UpdateRegister("label.my_window.title", (text, tooltip) =>
{
    label.text = text;
    label.tooltip = tooltip;
});

label.RegisterCallback<DetachFromPanelEvent>(_ => registration.Dispose());
```

The callback runs immediately and again whenever the language changes or the assets are reloaded. Always dispose the
handle when the element goes away; the registrations are weak by construction, but the callback holds the element.

## Data and conversion

| Type | Use |
| --- | --- |
| `BasicLocalization` | One language asset: id, display name and the list of entries. |
| `BasicTranslate` | One entry: `key`, `translate`, `useTooltip`, `tooltip`, `tooltipSuffix`. |
| `LocalizationConverter` | `ToJson` / `ToPo` and `TryImportJson` / `TryImportPo`, used by the inspector buttons. |
| `TranslateClipboard` | `TryRead` / `HasEntry` for the copy/paste buttons. |

## Custom pickers

Read the data and switch through the helper; nothing else is needed:

```csharp
foreach (var index in Enumerable.Range(0, helper.Languages.Count))
{
    var id = helper.Languages[index];
    menu.AppendAction(helper.LanguageNames[index], _ => helper.SetLanguage(id));
}
```
