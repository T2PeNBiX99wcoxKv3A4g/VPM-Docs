# GlobalLocalization

`io.github.ykysnk.Localization.Editor` · `[InitializeOnLoad] public static class GlobalLocalization`

Loads every `BasicLocalization` asset in the project, keeps the per-id language dictionaries and the selected language, and refreshes the registrations. Lookups go through [`LocalizationHelper`](./API-LocalizationHelper.md); this type exposes only its events and the two delegates, everything else is internal.

The load is deferred to the first editor tick, and an inspector that is built before that tick gets the data on demand through the same loader. After an asset changes, or after a UI Toolkit inspector throws, a reload is coalesced with a 250 ms delay, so typing in a translation asset does not rescan the project on every keystroke. `Tools > Localization > Reload Localizations` forces a reload. The selected language is stored per id in `EditorPrefs` under `{localizationID}_Language`, with `en-US` as the default.

Each asset contributes its localization id, its file name as the language id and its display name; the first value seen for a key wins, and languages are ordered by display name with an invariant comparer. A reload warns about `unity:` keys that are missing from the `en-US` asset or have an empty text there, because `L10n.Tr` can only translate the English text. After a reload every live registration is refreshed before the event is raised.

## OnLocalizationReload

```csharp
public static event LocalizationUpdated? OnLocalizationReload
```

Raised after the assets were loaded again, once every registration has been refreshed. Use it for UI that is not kept up to date by `UILocalize` or `UpdateRegister`, for example a control that builds its own entries from `Languages`. A language change does not raise it.

## OnLocalizationChanged

```csharp
public static event LocalizationChanged? OnLocalizationChanged
```

Raised when the selected language of one localization changes, with the localization id and the new language. Registrations of that localization are refreshed before the event is raised, and a reload does not raise it.

## LocalizationChanged

```csharp
public delegate void LocalizationChanged(string localizationID, string newLanguage)
```

Handler type of `OnLocalizationChanged`: the localization whose language changed, and the language that is selected now.

## LocalizationUpdated

```csharp
public delegate void LocalizationUpdated()
```

Handler type of `OnLocalizationReload`, without arguments. The name also appears on `LocalizationHelper`, which declares the same delegate but exposes no event of it.
