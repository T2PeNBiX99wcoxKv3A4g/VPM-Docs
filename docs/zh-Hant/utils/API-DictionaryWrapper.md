# DictionaryWrapper

`io.github.ykysnk.utils.NonUdon` · `public sealed class DictionaryWrapper<TKey, TValue> : IReadOnlyDictionary<TKey, TValue>`

以兩個並列清單保存的字典形狀資料，因為 Unity 能序列化清單，但不能序列化 `Dictionary<TKey, TValue>`。

查詢會線性掃描 `keys`，因此這個型別面向必須撐過序列化的小型集合，而不是高頻路徑。已序列化或手動編輯過的資料可能讓 `keys` 與 `values` 長度不同，這裡沒有任何成員會修復或驗證這一點。建構函式是 internal；請用 [`Wrapper.Create`](./API-Wrapper.md)，或透過從字典的隱含轉換建立執行個體。

## keys

```csharp
public List<TKey> keys;
```

依保存順序排列的鍵。每個鍵的值位於 `values` 的相同索引處。

## values

```csharp
public List<TValue> values;
```

與 `keys` 對齊的值。還原序列化或手動編輯之後，兩個清單的長度可能不同；沒有成員修復這一點，而讀取超過 `values` 尾端時會像其他清單存取一樣失敗。

## Count

```csharp
public int Count { get; }
```

項目數量，取自 `keys`，與實際保存了多少個值無關。

## TryGetValue

```csharp
public bool TryGetValue(TKey key, out TValue value)
```

掃描 `keys` 找到鍵，然後讀取該索引處的值。鍵不存在時傳回 false，並把 `value` 設為 `TValue` 的預設值。

```csharp
if (map.TryGetValue("tint", out var tint))
    Apply(tint);
```

## this[TKey key]

```csharp
public TValue this[TKey key] { get; }
```

`key` 對應的值；鍵重複時使用第一個相符項。鍵未保存時擲回 `KeyNotFoundException`。

## Keys

```csharp
public IEnumerable<TKey> Keys { get; }
```

依保存順序排列的鍵。交出的是實際的 `keys` 清單而不是複本，因此對它的修改在這裡可見。

## Values

```csharp
public IEnumerable<TValue> Values { get; }
```

依保存順序排列的值。交出的是實際的 `values` 清單而不是複本，因此對它的修改在這裡可見。

## GetEnumerator

```csharp
public IEnumerator<KeyValuePair<TKey, TValue>> GetEnumerator()
IEnumerator IEnumerable.GetEnumerator()
```

把每個鍵與相同索引處的值配對。配對會在列舉程式前進時建立，因此它一邊走訪一邊讀取清單；明確介面實作會轉送到泛型版本。

## ContainsKey

```csharp
public bool ContainsKey(TKey key)
```

`keys` 是否包含 `key`，使用 `TKey` 的預設相等比較子。

## ContainsValue

```csharp
public bool ContainsValue(TValue value)
```

`values` 是否包含 `value`，使用 `TValue` 的預設相等比較子；結果與該索引處的鍵是否有效無關。

## ToDictionary

```csharp
public Dictionary<TKey, TValue> ToDictionary()
```

把配對複製到依 `Count` 決定大小、依清單順序填入的新字典中。之後任何一側的修改都不共用，`keys` 中重複的鍵會合併為最後一個值。

## implicit operator Dictionary

```csharp
public static implicit operator Dictionary<TKey, TValue>(DictionaryWrapper<TKey, TValue> wrapper)
```

以複製方式轉換，與 `ToDictionary` 相同；包裝器本身不受影響。

## implicit operator DictionaryWrapper

```csharp
public static implicit operator DictionaryWrapper<TKey, TValue>(Dictionary<TKey, TValue> dictionary)
```

把字典複製到新的包裝器中，鍵與值依字典的列舉順序排列。字典不會以參照保留，因此之後修改它不會影響包裝器。
