# ListExtensions

`io.github.ykysnk.utils.Extensions` · `public static class ListExtensions`

供清單、陣列與其他集合使用的邊界檢查索引存取與就地編輯輔助方法。

## TryGetValue

```csharp
public static bool TryGetValue<T>(this IList<T> list, int index, out T value)
public static bool TryGetValue<T>(this T[] array, int index, out T value)
```

不擲回例外地讀取指定索引處的元素。負數或超出末尾的索引傳回 `false`，並把 `value` 設為 `default(T)`。`IList<T>` 多載以 `Count` 為邊界，陣列多載以 `Length` 為邊界。陣列多載沒有宣告條件約束，因此適用於任意元素型別的陣列；對陣列接收者而言，陣列會以恆等轉換轉為 `T[]`，所以會選中這個多載。

```csharp
if (frames.TryGetValue(0, out var first)) Use(first);
```

## GetValueOrDefault

```csharp
public static T GetValueOrDefault<T>(this IList<T> list, int index)
public static T GetValueOrDefault<T>(this T[] array, int index)
```

指定索引處的元素，索引超出範圍時傳回 `default(T)` 而不是擲回例外。兩個多載都轉送給對應的 [`TryGetValue`](#trygetvalue)。

## TrySetValue

```csharp
public static bool TrySetValue<T>(this IList<T> list, int index, T value)
public static bool TrySetValue<T>(this T[] array, int index, T value)
```

不擲回例外地覆寫指定索引處的元素。超出範圍的索引不修改集合，並傳回 `false`；有效索引透過索引子寫入並傳回 `true`。唯讀清單仍會由索引子擲回例外，陣列多載則就地修改陣列。

## Rebuild

```csharp
public static void Rebuild<T>(this ICollection<T> collection)
public static void Rebuild<T>(this ICollection<T> collection, Func<T, bool> removeAll)
```

就地移除重複項，保留每個值第一次出現的位置以及其餘元素的相對順序（使用預設相等比較子）。集合會被清空後重新填入，因此必須支援 `Clear` 與 `Add`，呼叫前開始的列舉都會失效；陣列等固定大小的集合會擲回例外。第二個多載先移除 `removeAll` 傳回 true 的元素，再像無參數多載一樣去重。

## AddRange

```csharp
public static void AddRange<T>(this ICollection<T> collection, IEnumerable<T> items)
```

逐項加入元素，因為 `ICollection<T>` 本身沒有批次加入。空序列不做任何事。

## RemoveAll

```csharp
public static void RemoveAll<T>(this ICollection<T> collection, Func<T, bool> match)
```

移除所有符合的元素。符合的項目會先收集到暫存清單，因此在修改集合時不會列舉它，每個符合項依相等性移除一次。
