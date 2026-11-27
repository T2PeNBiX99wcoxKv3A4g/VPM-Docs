# 资产

## BasicLocalization

```csharp
[CreateAssetMenu(fileName = "en-US", menuName = "Localization/Basic Localization")]
public class BasicLocalization : ScriptableObject
```

一个本地化集合：一种语言的翻译。资源的文件名就是 `Languages` 和 `SetLanguage` 中使用的语言 id；
`localizationID` 把同一个包的各种语言归到一组。`jsonFile` 和 `poFile` 可选择指向检视器写出的旁挂文件，这样同一
份文本也能用外部工具编辑。

### localizationID

```csharp
public string localizationID = "";
```

同一本地化下所有语言共享的分组 id。加载资源时，id 为空的资源会被跳过并给出警告。

### displayName

```csharp
public string displayName = "English";
```

语言选择器中显示的名称。字段为空时，`OnValidate` 会恢复为 `English`。

### translates

```csharp
public List<BasicTranslate> translates = new();
```

该语言的全部翻译。新资源以 `label.language` 条目开始。

### jsonFile

```csharp
public Object? jsonFile;
```

由检视器中的 `Export JSON` 写出的旁挂 JSON。

### poFile

```csharp
public Object? poFile;
```

由检视器中的 `Export PO` 写出的旁挂 PO。

### OnLocalizationFileUpdated

```csharp
public static event LocalizationFileUpdated? OnLocalizationFileUpdated

public delegate void LocalizationFileUpdated(string localizationID, string localizationName)
```

任何资源更改后从 `OnValidate` 触发，携带其本地化 id 和资源名称。`GlobalLocalization` 用它来安排重新加载。

## BasicTranslate

```csharp
[Serializable]
public class BasicTranslate
```

一条翻译记录：键、文本以及可选的工具提示。工具提示需要主动启用；当 `useTooltip` 为 false 时，`tooltip` 中的
文本仍保留在资源中，但不会被加载或显示。

### DefaultTooltipSuffix

```csharp
public const string DefaultTooltipSuffix = ":tooltip";
```

除非条目另行覆盖，否则追加到 `key` 的后缀。

### key

```csharp
public string key = "";
```

标识该翻译的键，例如 `label.language`。

### translate

```csharp
public string translate = "";
```

`key` 对应的翻译文本。

### tooltip

```csharp
public string tooltip = "";
```

工具提示文本，仅在 `useTooltip` 为 true 时使用。

### useTooltip

```csharp
public bool useTooltip;
```

工具提示是否参与加载以及编辑器 UI。默认关闭。

### tooltipSuffix

```csharp
public string tooltipSuffix = DefaultTooltipSuffix;
```

发布工具提示时追加到 `key` 的后缀，例如 `label.language:tooltip`。除非某个插件期望别的写法（如 `.tooltip`），
否则请保持默认值；对于这样的条目，加载器仍会保证 `:tooltip` 可以解析。
