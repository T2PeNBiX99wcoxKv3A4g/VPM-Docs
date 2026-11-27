# BooleanVector3

`io.github.ykysnk.utils.NonUdon` · `public struct BooleanVector3 : IEquatable<BooleanVector3>`

三個獨立的 bool 值以可直接序列化的欄位保存，並透過 `Flags` 檢視把它們打包成單一位元遮罩，方便做類似 switch 的判斷。

指派 `Flags` 會同時改寫三個分量，因此遮罩未包含的分量會被清除，而不是保持原樣。`Add` 與 `Remove` 成員只改動它們指名的位元，而 `Set` 會取代整個遮罩。

## x

```csharp
public bool x;
```

X 分量是否已設定。它是普通欄位，可以單獨指派與序列化。

## y

```csharp
public bool y;
```

Y 分量是否已設定。

## z

```csharp
public bool z;
```

Z 分量是否已設定。

## Flags

```csharp
public int Flags { get; set; }
```

把三個分量表示為 `Flag` 值的位元遮罩。讀取時合成目前已設定分量的位元；指派會覆寫全部三個分量，`Flag.All` 之外的位元不指向任何分量，因此會被捨棄。

```csharp
var vector = new BooleanVector3();
vector.Flags = (int)(BooleanVector3.Flag.X | BooleanVector3.Flag.Z);
```

## HasFlag

```csharp
public bool HasFlag(Flag flag)
```

`flag` 的每個位元是否都已設定。`Flag.None` 不要求任何位元，因此永遠符合。

## HasFlags

```csharp
public bool HasFlags(params Flag[] flags)
```

`flags` 涵蓋的每個位元是否都已設定；陣列會先合併成單一遮罩。空陣列符合一切。

## AddFlag

```csharp
public void AddFlag(Flag flag)
```

設定 `flag` 的位元，其餘分量保持不變。

## AddFlags

```csharp
public void AddFlags(params Flag[] flags)
```

設定 `flags` 涵蓋的位元，其餘分量保持不變。空陣列不會造成任何改變。

## RemoveFlag

```csharp
public void RemoveFlag(Flag flag)
```

清除 `flag` 的位元，其餘分量保持不變。

## RemoveFlags

```csharp
public void RemoveFlags(params Flag[] flags)
```

清除 `flags` 涵蓋的位元，其餘分量保持不變。空陣列不會造成任何改變。

## SetFlag

```csharp
public void SetFlag(Flag flag)
```

以 `flag` 取代整個遮罩，因此行為等同指派，未包含的分量會被清除。

## SetFlags

```csharp
public void SetFlags(params Flag[] flags)
```

以 `flags` 的聯集取代整個遮罩。空陣列會清除全部三個分量。

## Set

```csharp
public void Set(bool x2, bool y2, bool z2)
public void Set(BooleanVector3 other)
```

一次呼叫指派全部三個分量；第二個多載從 `other` 複製，`other` 只被讀取，因此複製到自身也沒有問題。

```csharp
var vector = new BooleanVector3();
vector.Set(true, false, true);
```

## SetAll

```csharp
public void SetAll(bool value)
```

把同一個值指派給 X、Y 與 Z。

## Invert

```csharp
public void Invert()
```

就地反轉每個分量。

## SetX

```csharp
public void SetX(bool value)
```

只指派 X 分量。

## SetY

```csharp
public void SetY(bool value)
```

只指派 Y 分量。

## SetZ

```csharp
public void SetZ(bool value)
```

只指派 Z 分量。

## SetTrue

```csharp
public void SetTrue()
```

設定全部三個分量，等同 `SetAll(true)`。

## SetFalse

```csharp
public void SetFalse()
```

清除全部三個分量，等同 `SetAll(false)`。

## True

```csharp
public static BooleanVector3 True { get; }
```

X、Y、Z 全為 `true` 的新向量。每次讀取都會新建，因此是全新的複本，而不是共用執行個體。

## False

```csharp
public static BooleanVector3 False { get; }
```

X、Y、Z 全為 `false` 的新向量，與 `default` 的值相同。

## operator !

```csharp
public static BooleanVector3 operator !(BooleanVector3 booleanVector3)
```

傳回反轉後的複本；運算元以傳值方式傳入，不會被修改。

## operator true

```csharp
public static bool operator true(BooleanVector3 booleanVector3)
```

僅在三個分量都已設定時為 `true`，因此對向量做條件判斷等同三向 AND，而不是「任一分量已設定」的測試。

```csharp
if (vector)
    // only reached when x, y and z are all set
```

## operator false

```csharp
public static bool operator false(BooleanVector3 booleanVector3)
```

只要有一個分量被清除就為 `true`。當型別參與 `&&` 或 `||` 時，編譯器要求它與 `operator true` 一起提供。

## Flag

```csharp
public enum Flag
{
    X = 1 << 0,
    Y = 1 << 1,
    Z = 1 << 2,
    None = 0,
    All = X | Y | Z
}
```

用於選擇單一分量或其組合的位元選擇子：`X`、`Y`、`Z` 表示單一分量，`None` 表示沒有分量，`All` 表示三者一起。取值就是普通的位元，因此可以用 `|` 組合。

## Equals

```csharp
public bool Equals(BooleanVector3 other)
public override bool Equals(object? obj)
```

逐分量比較是否相等。`object` 多載對任何非 `BooleanVector3` 型別傳回 false。

## GetHashCode

```csharp
public override int GetHashCode()
```

以 `HashCode.Combine` 從三個分量建構的雜湊值，與 `Equals` 保持一致。

## ToString

```csharp
public override string ToString()
```

把分量呈現為 `BooleanVector3(x:…,y:…,z:…)`，值以純文字寫出，不涉及地區設定相關的格式化。
