# Wrapper

`io.github.ykysnk.utils.NonUdon` · `public static class Wrapper`

可序列化包裝器的入口。[`ListWrapper`](./API-ListWrapper.md) 與 [`DictionaryWrapper`](./API-DictionaryWrapper.md) 的存在，是因為 Unity 無法直接序列化字典，也無法序列化以介面為型別的成員。

它們的建構函式是 internal，因此呼叫端要從這裡、或從這些型別上的隱含轉換取得執行個體。兩個成員都會複製來源，包裝器不會以參照保留傳入的集合。

## Create

```csharp
public static ListWrapper<T> Create<T>(IEnumerable<T> source)
public static DictionaryWrapper<TK, TV> Create<TK, TV>(IDictionary<TK, TV> source)
```

把 `source` 複製到新的包裝器中。清單多載依列舉順序保留項目；字典多載同時擷取鍵與值，使內部兩個清單保持對齊。`source` 為 null 時，會在建立底層清單的過程中擲回例外。

```csharp
var names = Wrapper.Create(new[] { "a", "b" });
```
