# StringExtensions

`io.github.ykysnk.utils.Extensions` · `public static class StringExtensions`

面向 `Folder/Name/Extension` 这类分隔字符串的截取辅助方法。所有路径辅助方法在分隔符不出现时返回 `null`，而且都不校验接收者。

## FirstPath

```csharp
public static string FirstPath(this string str, char value)
public static string FirstPath(this string str, string value)
```

分隔符最后一次出现之前的文本，不含分隔符：`a/b/c` 用 `/` 截取得到 `a/b`。两个重载都在最后一次出现处截断。char 重载使用 `LastIndexOf(char)`；string 重载使用 `StringComparison.Ordinal` 按序号比较，因此 `a::b::c` 用 `::` 截取得到 `a::b`。分隔符只出现在索引 0 时得到空字符串，不出现时得到 `null`。为 null 或空的分隔字符串会抛出异常。

## LastPath

```csharp
public static string LastPath(this string str, char value)
public static string LastPath(this string str, string value)
```

分隔符第一次出现之后的文本，不含分隔符：`a/b/c` 用 `/` 截取得到 `b/c`。char 重载跳过一个字符，string 重载跳过按序号匹配的整个分隔符。分隔符是最后一个字符时得到空字符串，不出现时得到 `null`。空的分隔字符串在索引 0 处匹配，并原样返回输入。

## MiddlePath

```csharp
public static string MiddlePath(this string str, char first, char last)
public static string MiddlePath(this string str, string first, string last)
public static string MiddlePath(this string str, char first, string last)
public static string MiddlePath(this string str, string first, char last)
```

两个分隔符之间的片段：先在 `last` 的最后一次出现处截去尾部，再在剩余部分的 `first` 第一次出现处截去头部，因此 `Folder/Name/Sub` 两端都用 `/` 得到 `Name`。四个重载都是 `FirstPath(last)?.LastPath(first)`，所以 char 与 string 分隔符的任意组合都支持，任一分隔符缺失时结果为 `null`。

```csharp
var folder = "Assets/Prefabs/Thing.prefab".MiddlePath('/', '/'); // "Prefabs"
```

## TryGetValue

```csharp
public static bool TryGetValue(this string str, int index, out char? value)
```

不抛出异常地读取指定索引处的字符。负数或超出末尾的索引返回 `false`，并把 `value` 设为 `null`。

## GetValueOrDefault

```csharp
public static char? GetValueOrDefault(this string str, int index)
```

指定索引处的字符，索引超出范围时为 `null`。
