# DictionaryExtensions

`io.github.ykysnk.utils.Extensions` · `public static class DictionaryExtensions`

Dictionary helpers that treat a missing key as a default value instead of throwing.

## GetValueOrDefault

```csharp
public static TValue GetValueOrDefault<TKey, TValue>(this IDictionary<TKey, TValue> dict, TKey key)
```

The value stored under `key`, or `default(TValue)` when the key is missing: `null` for reference types, zero or `false` for value types. The dictionary is not modified. A null key is not guarded, so it throws for `Dictionary<TKey, TValue>`.

```csharp
var label = labels.GetValueOrDefault(id) ?? "unnamed";
```
