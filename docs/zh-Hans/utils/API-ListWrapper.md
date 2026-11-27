# ListWrapper

`io.github.ykysnk.utils.NonUdon` · `public sealed class ListWrapper<T> : IReadOnlyList<T>`

用单个序列化字段保存的列表，因此类型为 `IReadOnlyList<T>` 或其他接口的成员，也能拥有 Unity 可存储、可在检视器中显示的实际数据。

构造函数是 internal：请用 [`Wrapper.Create`](./API-Wrapper.md)，或通过隐式转换给 `List<T>` 赋值来创建实例。包装器是只读的——没有添加或移除成员——因此修改要通过实时的 `items` 列表进行。

## items

```csharp
public List<T> items;
```

按顺序保存的项目。这是包装器唯一的序列化字段，因此检视器显示和编辑的也是它。

## Count

```csharp
public int Count { get; }
```

已保存项目的数量，即 `items` 的长度。

## this[int index]

```csharp
public T this[int index] { get; }
```

从底层列表读取 `index` 处的项目。无效索引的失败方式与底层列表完全一致。

```csharp
var first = wrapper[0];
```

## GetEnumerator

```csharp
public IEnumerator<T> GetEnumerator()
IEnumerator IEnumerable.GetEnumerator()
```

直接枚举 `items`，不复制它。显式接口实现转发到泛型版本，`foreach` 使用的就是后者。

## Contains

```csharp
public bool Contains(T item)
```

`items` 是否包含 `item`，使用 `T` 的默认相等比较器。

## implicit operator List

```csharp
public static implicit operator List<T>(ListWrapper<T> wrapper)
```

交出底层列表本身，而不是副本，因此通过返回的列表所做的修改会影响包装器。

## implicit operator ListWrapper

```csharp
public static implicit operator ListWrapper<T>(List<T> list)
```

把列表复制到新的包装器中，因此之后对 `list` 的修改在这里不可见。list 为 null 时，会在创建底层列表的过程中抛出异常。
