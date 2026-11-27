# BasicTranslate

`io.github.ykysnk.Localization` · `[Serializable] public class BasicTranslate`

One translation entry: the key, its text, and the optional tooltip. Entries are serialized inside `translates` of a [`BasicLocalization`](./API-BasicLocalization.md) asset, so they are edited in the inspector rather than as assets of their own.

Tooltips are opt-in. When `useTooltip` is false the text in `tooltip` is kept in the asset but not loaded or shown; `tooltipSuffix` selects the key suffix used for the tooltip entry (`:tooltip` by default, matching the other packages in this project).

## DefaultTooltipSuffix

```csharp
public const string DefaultTooltipSuffix = ":tooltip";
```

Suffix appended to `key` unless an entry overrides it. It is the starting value of `tooltipSuffix` and the first entry of `LocalizationConverter.TooltipSuffixes`.

## key

```csharp
public string key = "";
```

Key that identifies the translation, for example `label.language`. The loader skips an entry with an empty key and logs a warning, so an entry without a key never reaches the UI.

## translate

```csharp
public string translate = "";
```

Translated text for `key`. An empty text in the selected language falls back to the English text of the same key.

## tooltip

```csharp
public string tooltip = "";
```

Tooltip text, used only when `useTooltip` is true. With `useTooltip` off it stays in the asset and is never loaded or shown.

## useTooltip

```csharp
public bool useTooltip;
```

Whether the tooltip takes part in loading and in the editor UI. Off by default, so a new entry publishes no tooltip until it is enabled.

## tooltipSuffix

```csharp
public string tooltipSuffix = DefaultTooltipSuffix;
```

Suffix appended to `key` to publish the tooltip, for example `label.language:tooltip`. Leave it at `DefaultTooltipSuffix` unless a plugin expects another spelling such as `.tooltip`; for such an entry the loader keeps `:tooltip` resolvable as well, so `Tooltip(key)` works either way.
