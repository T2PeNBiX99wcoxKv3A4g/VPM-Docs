# DictionaryExtensions

`io.github.ykysnk.utils.Extensions` · `public static class DictionaryExtensions`

把缺失的键当作默认值而不是抛出异常的字典辅助方法。

## GetValueOrDefault

```csharp
public static TValue GetValueOrDefault<TKey, TValue>(this IDictionary<TKey, TValue> dict, TKey key)
```

`key` 下存储的值，键缺失时为 `default(TValue)`：引用类型为 `null`，值类型为零或 `false`。字典不会被修改。null 键没有被保护，因此对 `Dictionary<TKey, TValue>` 会抛出异常。

```csharp
var label = labels.GetValueOrDefault(id) ?? "unnamed";
```
