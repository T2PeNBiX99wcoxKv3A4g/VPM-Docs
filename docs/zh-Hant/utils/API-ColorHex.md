# ColorHex

`io.github.ykysnk.utils.NonUdon` · `public struct ColorHex`

一個 `Color` 連同它的 HTML 十六進位形式，讓顏色可以作為文字被序列化與檢視。

只有運算子會同時更新兩個欄位。直接指派 `color` 或 `hex` 會讓另一個欄位保持不變，因此兩者可能不同步；預設初始化的結構中 `hex` 為 null，此時轉換會從 `color` 推導文字。

## color

```csharp
public Color color;
```

`hex` 所表示的顏色值。指派它不會重寫 `hex`，因此在下次轉換或使用運算子之前，兩個欄位可能互相矛盾。

## hex

```csharp
public string hex;
```

以 `#RRGGBBAA` 表示的顏色，包含開頭的 `#`。它直接從欄位讀取，因此在預設初始化的結構中可能為 null；此時轉換會退回 `color`。

## ToString

```csharp
public override string ToString()
```

把兩個欄位呈現為 `Color: …, Hex: …`，`hex` 為 null 時從 `color` 推導十六進位文字。

## implicit operator string(ColorHex)

```csharp
public static implicit operator string(ColorHex colorHex)
```

傳回十六進位文字，因此凡是需要顏色字串的地方都可以直接使用這個結構。`hex` 為 null 時會從 `color` 推導，所以結果永遠不為 null。

## implicit operator Color(ColorHex)

```csharp
public static implicit operator Color(ColorHex colorHex)
```

傳回 `color`，因此這個結構可以直接當作顏色使用。只會讀取 `color` 欄位。

## implicit operator ColorHex(string)

```csharp
public static implicit operator ColorHex(string hex)
```

解析 HTML 顏色字串。`ColorUtility.TryParseHtmlString` 拒絕的輸入會變成白色而不是報錯，接著 `hex` 會依解析後的顏色重寫，因此儲存的文字是正規化後的結果，而不是原樣保留。

```csharp
ColorHex tint = "#FF8000";
```

## implicit operator ColorHex(Color)

```csharp
public static implicit operator ColorHex(Color color)
```

包裝一個顏色，並從中推導 `#RRGGBBAA` 文字，包含 Alpha 通道。

```csharp
ColorHex tint = Color.red;
```
