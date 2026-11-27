# Wrapper

`io.github.ykysnk.utils.NonUdon` · `public static class Wrapper`

可序列化包装器的入口。[`ListWrapper`](./API-ListWrapper.md) 与 [`DictionaryWrapper`](./API-DictionaryWrapper.md) 的存在，是因为 Unity 无法直接序列化字典，也无法序列化以接口为类型的成员。

它们的构造函数是 internal，因此调用方要从这里、或从这些类型上的隐式转换取得实例。两个成员都会复制来源，包装器不会按引用保留传入的集合。

## Create

```csharp
public static ListWrapper<T> Create<T>(IEnumerable<T> source)
public static DictionaryWrapper<TK, TV> Create<TK, TV>(IDictionary<TK, TV> source)
```

把 `source` 复制到新的包装器中。列表重载按枚举顺序保留项目；字典重载同时捕获键和值，使内部两个列表保持对齐。`source` 为 null 时，会在创建底层列表的过程中抛出异常。

```csharp
var names = Wrapper.Create(new[] { "a", "b" });
```
