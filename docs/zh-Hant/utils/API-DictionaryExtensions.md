# DictionaryExtensions

`io.github.ykysnk.utils.Extensions` · `public static class DictionaryExtensions`

把缺少的鍵當作預設值而不是擲回例外之字典輔助方法。

## GetValueOrDefault

```csharp
public static TValue GetValueOrDefault<TKey, TValue>(this IDictionary<TKey, TValue> dict, TKey key)
```

`key` 下儲存的值，鍵缺少時為 `default(TValue)`：參考型別為 `null`，實值型別為零或 `false`。字典不會被修改。null 鍵沒有被保護，因此對 `Dictionary<TKey, TValue>` 會擲回例外。

```csharp
var label = labels.GetValueOrDefault(id) ?? "unnamed";
```
