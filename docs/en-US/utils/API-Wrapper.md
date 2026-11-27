# Wrapper

`io.github.ykysnk.utils.NonUdon` · `public static class Wrapper`

Entry point for the serializable wrappers. [`ListWrapper`](./API-ListWrapper.md) and [`DictionaryWrapper`](./API-DictionaryWrapper.md) exist because Unity cannot serialize a dictionary or a member typed as an interface directly.

Their constructors are internal, so calling code gets instances from here or from the implicit conversions on those types. Both members copy their source; the wrapper never keeps the collection it was given by reference.

## Create

```csharp
public static ListWrapper<T> Create<T>(IEnumerable<T> source)
public static DictionaryWrapper<TK, TV> Create<TK, TV>(IDictionary<TK, TV> source)
```

Copies `source` into a new wrapper. The list overload keeps the items in enumeration order; the dictionary overload captures the keys and values so the two internal lists stay aligned with each other. A null `source` throws while the backing list is created.

```csharp
var names = Wrapper.Create(new[] { "a", "b" });
```
