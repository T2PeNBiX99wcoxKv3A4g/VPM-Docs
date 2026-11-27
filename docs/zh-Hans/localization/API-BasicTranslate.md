# BasicTranslate

`io.github.ykysnk.Localization` · `[Serializable] public class BasicTranslate`

一条翻译记录：键、文本以及可选的工具提示。条目序列化在 [`BasicLocalization`](./API-BasicLocalization.md) 资源的 `translates` 中，因此要在检视器中编辑，而不是作为独立资源。

工具提示需要主动启用。当 `useTooltip` 为 false 时，`tooltip` 中的文本仍保留在资源中，但不会被加载或显示；`tooltipSuffix` 选择工具提示条目所用的键后缀（默认 `:tooltip`，与本项目的其他包一致）。

## DefaultTooltipSuffix

```csharp
public const string DefaultTooltipSuffix = ":tooltip";
```

除非条目另行覆盖，否则追加到 `key` 的后缀。它既是 `tooltipSuffix` 的初始值，也是 `LocalizationConverter.TooltipSuffixes` 的第一项。

## key

```csharp
public string key = "";
```

标识该翻译的键，例如 `label.language`。键为空的条目会被加载器跳过并给出警告，因此没有键的条目不会到达 UI。

## translate

```csharp
public string translate = "";
```

`key` 对应的翻译文本。所选语言中为空时，会回退到同一键的英文文本。

## tooltip

```csharp
public string tooltip = "";
```

工具提示文本，仅在 `useTooltip` 为 true 时使用。`useTooltip` 关闭时它只留在资源中，不会被加载或显示。

## useTooltip

```csharp
public bool useTooltip;
```

工具提示是否参与加载以及编辑器 UI。默认关闭，因此新条目在启用之前不会发布工具提示。

## tooltipSuffix

```csharp
public string tooltipSuffix = DefaultTooltipSuffix;
```

发布工具提示时追加到 `key` 的后缀，例如 `label.language:tooltip`。除非某个插件期望别的写法（如 `.tooltip`），否则请保持 `DefaultTooltipSuffix`；对这样的条目，加载器仍会让 `:tooltip` 可以解析，因此不论哪种写法 `Tooltip(key)` 都能用。
