# Assets

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
