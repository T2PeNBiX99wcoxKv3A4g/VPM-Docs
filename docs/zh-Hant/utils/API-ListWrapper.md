# ListWrapper

`io.github.ykysnk.utils.NonUdon` · `public sealed class ListWrapper<T> : IReadOnlyList<T>`

以單一序列化欄位保存的清單，因此型別為 `IReadOnlyList<T>` 或其他介面的成員，也能擁有 Unity 可儲存、可在檢視器中顯示的實際資料。

建構函式是 internal：請用 [`Wrapper.Create`](./API-Wrapper.md)，或透過隱含轉換指派 `List<T>` 來建立執行個體。包裝器是唯讀的——沒有加入或移除成員——因此修改要透過實際的 `items` 清單進行。

## items

```csharp
public List<T> items;
```

依順序保存的項目。這是包裝器唯一的序列化欄位，因此檢視器顯示與編輯的也是它。

## Count

```csharp
public int Count { get; }
```

已保存項目的數量，即 `items` 的長度。

## this[int index]

```csharp
public T this[int index] { get; }
```

從底層清單讀取 `index` 處的項目。無效索引的失敗方式與底層清單完全相同。

```csharp
var first = wrapper[0];
```

## GetEnumerator

```csharp
public IEnumerator<T> GetEnumerator()
IEnumerator IEnumerable.GetEnumerator()
```

直接列舉 `items`，不複製它。明確介面實作會轉送到泛型版本，`foreach` 使用的就是後者。

## Contains

```csharp
public bool Contains(T item)
```

`items` 是否包含 `item`，使用 `T` 的預設相等比較子。

## implicit operator List

```csharp
public static implicit operator List<T>(ListWrapper<T> wrapper)
```

交出底層清單本身，而不是複本，因此透過傳回清單所做的修改會影響包裝器。

## implicit operator ListWrapper

```csharp
public static implicit operator ListWrapper<T>(List<T> list)
```

把清單複製到新的包裝器中，因此之後對 `list` 的修改在這裡不可見。list 為 null 時，會在建立底層清單的過程中擲回例外。
