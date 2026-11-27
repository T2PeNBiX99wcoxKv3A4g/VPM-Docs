# DictionaryExtensions

`io.github.ykysnk.utils.Extensions` · `public static class DictionaryExtensions`

キーが無いことを例外ではなく既定値として扱うディクショナリのヘルパーです。

## GetValueOrDefault

```csharp
public static TValue GetValueOrDefault<TKey, TValue>(this IDictionary<TKey, TValue> dict, TKey key)
```

`key` に格納されている値、キーが無いときは `default(TValue)` です（参照型なら `null`、値型なら 0 か `false`）。ディクショナリは変更しません。null キーは保護していないため、`Dictionary<TKey, TValue>` では例外になります。

```csharp
var label = labels.GetValueOrDefault(id) ?? "unnamed";
```
