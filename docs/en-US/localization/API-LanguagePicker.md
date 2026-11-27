# LanguagePicker

`io.github.ykysnk.Localization.Editor` · `public class LanguagePicker : VisualElement`

Ready-made UI Toolkit language picker. It lists every language of one localization id, switches the selected one on change, and carries the `language-picker` class so it can be styled. Create it with `LocalizationHelper.CreateLanguagePicker`, or build a custom control from `Languages` and `SetLanguage`.

The list is ordered by display name. The picker rebuilds itself when the localization assets are reloaded, so one created before the delayed first load fills in later, and it follows switches made elsewhere. When the stored language was renamed or removed it falls back to the first language and repairs the preference. The popup label is the `label.language` entry and its tooltip; the registration is disposed when the picker leaves the panel.

The control is a plain `VisualElement` holding a single `PopupField` whose entries are indices, so two languages with the same display name stay distinct. The global handlers are attached on `AttachToPanelEvent` and released together with the label registration on `DetachFromPanelEvent`.

## Constructors

```csharp
public LanguagePicker(string localizationID)
```

Creates the picker for one localization id and loads the assets on the spot if the delayed first load has not run yet. Prefer `LocalizationHelper.CreateLanguagePicker`, which passes the id of the helper's localization.

```csharp
var picker = new LanguagePicker("io.github.ykysnk.yky-toolkit");
settingsCard.Add(picker);
```

## SelectedLanguage

```csharp
public string SelectedLanguage { get; set; }
```

Language id selected now, for example `ja-JP`. Reading it forwards to the loader, so it throws `ArgumentException` when the localization has no assets loaded. Assigning switches the language, which updates every element localized through `UILocalize`, and moves the popup to the new entry without raising its change callback.
