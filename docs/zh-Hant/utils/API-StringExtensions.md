# StringExtensions

`io.github.ykysnk.utils.Extensions` · `public static class StringExtensions`

供 `Folder/Name/Extension` 這類分隔字串使用的截取輔助方法。所有路徑輔助方法在分隔符號未出現時傳回 `null`，而且都不驗證接收者。

## FirstPath

```csharp
public static string FirstPath(this string str, char value)
public static string FirstPath(this string str, string value)
```

分隔符號最後一次出現之前的文字，不含分隔符號：`a/b/c` 以 `/` 截取得到 `a/b`。兩個多載都在最後一次出現處截斷。char 多載使用 `LastIndexOf(char)`；string 多載以 `StringComparison.Ordinal` 依序比較，因此 `a::b::c` 以 `::` 截取得到 `a::b`。分隔符號只出現在索引 0 時得到空字串，未出現時得到 `null`。為 null 或空的分隔字串會擲回例外。

## LastPath

```csharp
public static string LastPath(this string str, char value)
public static string LastPath(this string str, string value)
```

分隔符號第一次出現之後的文字，不含分隔符號：`a/b/c` 以 `/` 截取得到 `b/c`。char 多載跳過一個字元，string 多載跳過依序比對到的整個分隔字串。分隔符號是最後一個字元時得到空字串，未出現時得到 `null`。空的分隔字串會在索引 0 比對成功，並原樣傳回輸入。

## MiddlePath

```csharp
public static string MiddlePath(this string str, char first, char last)
public static string MiddlePath(this string str, string first, string last)
public static string MiddlePath(this string str, char first, string last)
public static string MiddlePath(this string str, string first, char last)
```

兩個分隔符號之間的片段：先在 `last` 的最後一次出現處截去尾部，再在剩餘部分的 `first` 第一次出現處截去頭部，因此 `Folder/Name/Sub` 兩端都用 `/` 得到 `Name`。四個多載都是 `FirstPath(last)?.LastPath(first)`，所以 char 與 string 分隔符號的任意組合都支援，任一分隔符號缺少時結果為 `null`。

```csharp
var folder = "Assets/Prefabs/Thing.prefab".MiddlePath('/', '/'); // "Prefabs"
```

## TryGetValue

```csharp
public static bool TryGetValue(this string str, int index, out char? value)
```

不擲回例外地讀取指定索引處的字元。負數或超出末尾的索引傳回 `false`，並把 `value` 設為 `null`。

## GetValueOrDefault

```csharp
public static char? GetValueOrDefault(this string str, int index)
```

指定索引處的字元，索引超出範圍時為 `null`。
