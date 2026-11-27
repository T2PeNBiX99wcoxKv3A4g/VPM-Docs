# StringExtensions

`io.github.ykysnk.utils.Extensions` · `public static class StringExtensions`

Slicing helpers for delimited strings such as `Folder/Name/Extension`. Every path helper returns `null` when its separator does not occur, and none of them validate the receiver.

## FirstPath

```csharp
public static string FirstPath(this string str, char value)
public static string FirstPath(this string str, string value)
```

Text before the last occurrence of the separator, separator excluded: `a/b/c` with `/` returns `a/b`. Both overloads cut at the last occurrence. The char overload uses `LastIndexOf(char)`; the string overload compares ordinally with `StringComparison.Ordinal`, so `a::b::c` with `::` returns `a::b`. A separator that only occurs at index 0 yields an empty string, one that does not occur yields `null`. A null or empty separator string throws.

## LastPath

```csharp
public static string LastPath(this string str, char value)
public static string LastPath(this string str, string value)
```

Text after the first occurrence of the separator, separator excluded: `a/b/c` with `/` returns `b/c`. The char overload skips one character, the string overload skips the whole separator matched ordinally. A separator that is the last character yields an empty string, one that does not occur yields `null`. An empty separator string matches at index 0 and returns the input.

## MiddlePath

```csharp
public static string MiddlePath(this string str, char first, char last)
public static string MiddlePath(this string str, string first, string last)
public static string MiddlePath(this string str, char first, string last)
public static string MiddlePath(this string str, string first, char last)
```

The segment between the two separators: the tail is cut at the last occurrence of `last`, then the head at the first occurrence of `first` in what remains, so `Folder/Name/Sub` with `/` for both returns `Name`. All four overloads are `FirstPath(last)?.LastPath(first)`, so each combination of a char and a string separator is supported and the result is `null` as soon as either separator is missing.

```csharp
var folder = "Assets/Prefabs/Thing.prefab".MiddlePath('/', '/'); // "Prefabs"
```

## TryGetValue

```csharp
public static bool TryGetValue(this string str, int index, out char? value)
```

Reads the character at the given index without throwing. A negative index or one past the end returns `false` and sets `value` to `null`.

## GetValueOrDefault

```csharp
public static char? GetValueOrDefault(this string str, int index)
```

The character at the given index, or `null` when the index is out of range.
