# ListExtensions

`io.github.ykysnk.utils.Extensions` · `public static class ListExtensions`

面向列表、数组与其他集合的带边界检查的索引访问与就地编辑辅助方法。

## TryGetValue

```csharp
public static bool TryGetValue<T>(this IList<T> list, int index, out T value)
public static bool TryGetValue<T>(this T[] array, int index, out T value)
```

不抛出异常地读取指定索引处的元素。负数或超出末尾的索引返回 `false`，并把 `value` 设为 `default(T)`。`IList<T>` 重载以 `Count` 为边界，数组重载以 `Length` 为边界。数组重载没有声明约束，因此适用于任意元素类型的数组；对数组接收者来说，数组会以恒等转换转为 `T[]`，所以会选中这个重载。

```csharp
if (frames.TryGetValue(0, out var first)) Use(first);
```

## GetValueOrDefault

```csharp
public static T GetValueOrDefault<T>(this IList<T> list, int index)
public static T GetValueOrDefault<T>(this T[] array, int index)
```

指定索引处的元素，索引超出范围时返回 `default(T)` 而不是抛出异常。两个重载都转发给对应的 [`TryGetValue`](#trygetvalue)。

## TrySetValue

```csharp
public static bool TrySetValue<T>(this IList<T> list, int index, T value)
public static bool TrySetValue<T>(this T[] array, int index, T value)
```

不抛出异常地覆盖指定索引处的元素。超出范围的索引不修改集合并返回 `false`；有效索引通过索引器写入并返回 `true`。只读列表仍会由索引器抛出异常，数组重载就地修改数组。

## Rebuild

```csharp
public static void Rebuild<T>(this ICollection<T> collection)
public static void Rebuild<T>(this ICollection<T> collection, Func<T, bool> removeAll)
```

就地移除重复项，保留每个值的第一次出现以及其余元素的相对顺序（使用默认相等比较器）。集合会被清空后重新填充，因此必须支持 `Clear` 与 `Add`，调用前开始的枚举都会失效；数组等固定大小的集合会抛出异常。第二个重载先移除 `removeAll` 返回 true 的元素，然后像无参数重载一样去重。

## AddRange

```csharp
public static void AddRange<T>(this ICollection<T> collection, IEnumerable<T> items)
```

逐个添加元素，因为 `ICollection<T>` 本身没有批量添加。空序列不做任何事。

## RemoveAll

```csharp
public static void RemoveAll<T>(this ICollection<T> collection, Func<T, bool> match)
```

移除所有匹配的元素。匹配项先收集到临时列表，因此在修改集合时不会枚举它，每个匹配项按相等性移除一次。
