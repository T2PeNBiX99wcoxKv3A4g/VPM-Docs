# LocalizationConverter

`io.github.ykysnk.Localization.Editor` · `public static class LocalizationConverter`

在 `BasicLocalization` 与翻译工具使用的扁平格式之间相互转换。每条记录变成 `"key" = "translate"`；使用工具提示的条目还会在 `key + tooltipSuffix` 下增加第二对。键为空的条目不会输出。

导入按键合并且从不删除条目：新键被追加，已有键获得导入的文本。以工具提示后缀结尾的键，只有在其基础键存在于文件或资源中时才会被读回为工具提示；否则它仍是一条普通条目，这样 `label.basic_translate.tooltip` 这类键就能保持原样。导入会先解析完整文本再写入，因此失败的导入不会改动资源。

## TooltipSuffixes

```csharp
public static readonly string[] TooltipSuffixes = { BasicTranslate.DefaultTooltipSuffix, ".tooltip", "_tooltip" };
```

把键读回为工具提示条目时所识别的后缀，按此顺序尝试。第一项是 [`BasicTranslate.DefaultTooltipSuffix`](./API-BasicTranslate.md)，因此 `:tooltip` 是首选写法。

## ToJson

```csharp
public static string ToJson(BasicLocalization localization)
```

扁平 JSON 对象：键到文本，并为每个使用工具提示的条目额外提供一个工具提示键。键保持 `translates` 的顺序，每一对占一行并缩进两个空格，末尾带一个换行。

## ToPo

```csharp
public static string ToPo(BasicLocalization localization)
```

PO 文件，每个键一对 `msgid`/`msgstr`，包含工具提示。文件头带有 `Language: {asset name}`（资源文件名，也就是语言 id），因为 Unity 自带的 PO 导入器会拒绝缺少该行的文件，只留下一个导入错误。

## TryImportJson

```csharp
public static bool TryImportJson(BasicLocalization localization, string? text, out Exception? exception)
```

把扁平 JSON 对象读入 `localization`。返回 false 并把解析错误放入 `exception`；null 文本会被当作 `""`，它不是 JSON 对象，因此会失败。值必须是字符串：数字、嵌套对象或多余的后置文本都会以 `FormatException` 失败。

## TryImportPo

```csharp
public static bool TryImportPo(BasicLocalization localization, string? text, out Exception? exception)
```

把 PO 文件读入 `localization`。返回 false 并把解析错误放入 `exception`；null 文本会被当作空内容，不导入任何东西。注释行、`msgctxt` 与 `msgid_plural` 会被忽略，多行字符串会拼接，复数只取第一个 `msgstr[0]`；`msgid` 为空的文件头条目会被丢弃。无法解析的行不会被跳过，而会让整次导入失败。
