# 编辑器工具

## LocalizationPackageAttribute

```csharp
[AttributeUsage(AttributeTargets.Assembly)]
public sealed class LocalizationPackageAttribute : Attribute
```

声明一个程序集的编辑器 UI 使用哪个本地化。每个程序集声明一次，紧挨 `using` 指令；之后 `LocalizationExtensions`
会自行解析正确的辅助实例，因此该程序集既不需要包装类，也不需要辅助字段。

```csharp
[assembly: LocalizationPackage("io.github.ykysnk.yky-toolkit")]
```

没有该特性的程序集仍可编译。`LocalizationHelper.For` 会为它记录一条警告，并返回一个共享的未绑定辅助实例，该实例
会把每个键原样显示。

### LocalizationPackageAttribute(string localizationID)

```csharp
public LocalizationPackageAttribute(string localizationID)
```

为一个本地化 id 创建特性，并将其存入 `LocalizationID`。

### LocalizationID

```csharp
public string LocalizationID { get; }
```

资源中保存着该程序集翻译的本地化 id。

## LanguagePicker

```csharp
public class LanguagePicker : VisualElement
```

现成的 UI Toolkit 语言选择器。它列出一个本地化 id 的所有语言，在更改时切换选中项，并带有 `language-picker`
类以便设置样式。用 `LocalizationHelper.CreateLanguagePicker` 创建，或用 `Languages` 和 `SetLanguage` 自行构建
自定义控件。

列表按显示名称排序。本地化资源重新加载时，选择器会自我重建，因此在延迟的首次加载之前创建的选择器会在之后补全
内容，并且会跟随其他地方发起的切换。当已存储的语言被重命名或删除时，它会回退到第一个语言并修复该偏好设置。弹出
菜单的标签是 `label.language` 条目及其工具提示；选择器离开面板时注册会被释放。

### LanguagePicker(string localizationID)

```csharp
public LanguagePicker(string localizationID)
```

为一个本地化 id 创建选择器。优先使用 `LocalizationHelper.CreateLanguagePicker`。

```csharp
var picker = new LanguagePicker("io.github.ykysnk.yky-toolkit");
settingsCard.Add(picker);
```

### SelectedLanguage

```csharp
public string SelectedLanguage { get; set; }
```

当前选中的语言 id。赋值会切换语言，从而更新所有通过 `UILocalize` 本地化的元素。

## LocalizationConverter

```csharp
public static class LocalizationConverter
```

在 `BasicLocalization` 与翻译工具使用的扁平格式之间进行相互转换。每条记录贡献其键与文本；使用工具提示的条目还会
在追加 `tooltipSuffix` 的键下增加第二对。导入按键合并且从不删除条目：新键被追加，已有键获得导入的文本。

以工具提示后缀结尾的键，只有在其基础键存在于文件或资源中时才会被读回为工具提示；否则它仍是一条普通条目。这样
`label.basic_translate.tooltip` 这类键就能保持原样。

### TooltipSuffixes

```csharp
public static readonly string[] TooltipSuffixes = { ":tooltip", ".tooltip", "_tooltip" };
```

把键读回为工具提示条目时所识别的后缀。

### ToJson

```csharp
public static string ToJson(BasicLocalization localization)
```

扁平 JSON 对象：键到文本，并为每个使用工具提示的条目额外提供一个工具提示键。

### ToPo

```csharp
public static string ToPo(BasicLocalization localization)
```

PO 文件，每个键一对 `msgid`/`msgstr`，包含工具提示。文件头带有 `Language: {asset name}`，因为 Unity 自带的
PO 导入器会拒绝缺少该行的文件，只留下一个导入错误。

### TryImportJson

```csharp
public static bool TryImportJson(BasicLocalization localization, string? text, out Exception? exception)
```

把扁平 JSON 对象读入 `localization`。返回 false 并把解析错误放入 `exception`；null 文本会被当作 `""`，它不是
JSON 对象，因此会失败。

### TryImportPo

```csharp
public static bool TryImportPo(BasicLocalization localization, string? text, out Exception? exception)
```

把 PO 文件读入 `localization`。返回 false 并把解析错误放入 `exception`；null 文本会被当作空内容，不导入任何
东西。

## TranslateClipboard

```csharp
public static class TranslateClipboard
```

翻译条目的剪贴板处理，供检视器和行绘制器共用。

### HasEntry()

```csharp
public static bool HasEntry()
```

剪贴板当前是否存放着翻译条目。结果会针对剪贴板文本缓存，因此按钮可以频繁询问而不必再次解析 JSON。

### TryRead(out BasicTranslate?, out Exception?)

```csharp
public static bool TryRead([NotNullWhen(true)] out BasicTranslate? basicTranslate, out Exception? exception)
```

尝试从剪贴板读取 `BasicTranslate`。文本必须能解析为 JSON 且带有非空 `key`，因此空剪贴板或无关的 JSON 对象会被
拒绝，而不会用空值覆盖该行。

方法返回 true 时 `basicTranslate` 是解析出的条目，否则为 null。`exception` 是解析或校验错误；若剪贴板本身就是
空的则为 null。

```csharp
if (TranslateClipboard.TryRead(out var entry, out var error))
    Paste(entry);
else if (error != null)
    Debug.LogWarning(error.Message);
```
