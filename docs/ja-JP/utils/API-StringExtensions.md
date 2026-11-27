# StringExtensions

`io.github.ykysnk.utils.Extensions` · `public static class StringExtensions`

`Folder/Name/Extension` のような区切り文字付き文字列の切り出しヘルパーです。パスのヘルパーは区切り文字が現れないとき `null` を返し、どれもレシーバーの検証はしません。

## FirstPath

```csharp
public static string FirstPath(this string str, char value)
public static string FirstPath(this string str, string value)
```

区切り文字の最後の出現より前の文字列で、区切り文字は含みません。`a/b/c` を `/` で切り出すと `a/b` です。どちらのオーバーロードも最後の出現で切ります。char 版は `LastIndexOf(char)`、string 版は `StringComparison.Ordinal` で比較するため、`a::b::c` を `::` で切り出すと `a::b` です。区切り文字がインデックス 0 にしか無い場合は空文字列、存在しない場合は `null` です。null または空の区切り文字列は例外になります。

## LastPath

```csharp
public static string LastPath(this string str, char value)
public static string LastPath(this string str, string value)
```

区切り文字の最初の出現より後の文字列で、区切り文字は含みません。`a/b/c` を `/` で切り出すと `b/c` です。char 版は 1 文字、string 版は序数で一致した区切り文字列全体を読み飛ばします。区切り文字が最後の文字の場合は空文字列、存在しない場合は `null` です。空の区切り文字列はインデックス 0 で一致し、入力をそのまま返します。

## MiddlePath

```csharp
public static string MiddlePath(this string str, char first, char last)
public static string MiddlePath(this string str, string first, string last)
public static string MiddlePath(this string str, char first, string last)
public static string MiddlePath(this string str, string first, char last)
```

2 つの区切り文字の間の部分です。まず `last` の最後の出現で末尾を切り、残りの先頭を `first` の最初の出現で切るため、`Folder/Name/Sub` を両方 `/` で切り出すと `Name` です。4 つのオーバーロードはすべて `FirstPath(last)?.LastPath(first)` なので、char と string のどの組み合わせでも使え、どちらかの区切り文字が無ければ `null` です。

```csharp
var folder = "Assets/Prefabs/Thing.prefab".MiddlePath('/', '/'); // "Prefabs"
```

## TryGetValue

```csharp
public static bool TryGetValue(this string str, int index, out char? value)
```

例外を投げずに指定インデックスの文字を読みます。負の値や末尾を超えるインデックスは `false` を返し、`value` を `null` にします。

## GetValueOrDefault

```csharp
public static char? GetValueOrDefault(this string str, int index)
```

指定インデックスの文字、またはインデックスが範囲外のときは `null` です。
