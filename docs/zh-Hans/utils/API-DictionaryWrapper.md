# DictionaryWrapper

`io.github.ykysnk.utils.NonUdon` · `public sealed class DictionaryWrapper<TKey, TValue> : IReadOnlyDictionary<TKey, TValue>`

以两个并行列表保存的字典形状数据，因为 Unity 能序列化列表，但不能序列化 `Dictionary<TKey, TValue>`。

查找会线性扫描 `keys`，因此该类型面向必须经受序列化的小型集合，而不是高频路径。已序列化或手工编辑过的数据可能让 `keys` 与 `values` 长度不同，这里没有任何成员会修复或校验这一点。构造函数是 internal；请用 [`Wrapper.Create`](./API-Wrapper.md)，或通过从字典的隐式转换创建实例。

## keys

```csharp
public List<TKey> keys;
```

按保存顺序排列的键。每个键的值位于 `values` 的同一索引处。

## values

```csharp
public List<TValue> values;
```

与 `keys` 对齐的值。反序列化或手工编辑之后，两个列表的长度可能不同；没有成员修复这一点，而读取越过 `values` 末尾时会像其他列表访问一样失败。

## Count

```csharp
public int Count { get; }
```

条目数量，取自 `keys`，与实际保存了多少个值无关。

## TryGetValue

```csharp
public bool TryGetValue(TKey key, out TValue value)
```

扫描 `keys` 找到键，然后读取该索引处的值。键不存在时返回 false，并把 `value` 设为 `TValue` 的默认值。

```csharp
if (map.TryGetValue("tint", out var tint))
    Apply(tint);
```

## this[TKey key]

```csharp
public TValue this[TKey key] { get; }
```

`key` 对应的值；键重复时使用第一个匹配项。键未保存时抛出 `KeyNotFoundException`。

## Keys

```csharp
public IEnumerable<TKey> Keys { get; }
```

按保存顺序排列的键。交出的是实时的 `keys` 列表而不是副本，因此对它的修改在这里可见。

## Values

```csharp
public IEnumerable<TValue> Values { get; }
```

按保存顺序排列的值。交出的是实时的 `values` 列表而不是副本，因此对它的修改在这里可见。

## GetEnumerator

```csharp
public IEnumerator<KeyValuePair<TKey, TValue>> GetEnumerator()
IEnumerator IEnumerable.GetEnumerator()
```

把每个键与同一索引处的值配对。配对在枚举器前进时创建，因此它在遍历的同时读取列表；显式接口实现转发到泛型版本。

## ContainsKey

```csharp
public bool ContainsKey(TKey key)
```

`keys` 是否包含 `key`，使用 `TKey` 的默认相等比较器。

## ContainsValue

```csharp
public bool ContainsValue(TValue value)
```

`values` 是否包含 `value`，使用 `TValue` 的默认相等比较器；结果与该索引处的键是否有效无关。

## ToDictionary

```csharp
public Dictionary<TKey, TValue> ToDictionary()
```

把配对复制到按 `Count` 确定大小、按列表顺序填充的新字典中。之后任何一侧的修改都不共享，`keys` 中重复的键会合并为最后一个值。

## implicit operator Dictionary

```csharp
public static implicit operator Dictionary<TKey, TValue>(DictionaryWrapper<TKey, TValue> wrapper)
```

以复制方式转换，与 `ToDictionary` 相同；包装器本身不受影响。

## implicit operator DictionaryWrapper

```csharp
public static implicit operator DictionaryWrapper<TKey, TValue>(Dictionary<TKey, TValue> dictionary)
```

把字典复制到新的包装器中，键和值按字典的枚举顺序排列。字典不会按引用保留，因此之后修改它不会影响包装器。
