# ColorHex

`io.github.ykysnk.utils.NonUdon` · `public struct ColorHex`

一个 `Color` 连同它的 HTML 十六进制形式，让颜色可以作为文本被序列化和查看。

只有运算符会同时更新两个字段。直接给 `color` 或 `hex` 赋值会保持另一个字段不变，因此两者可能不同步；默认初始化的结构体中 `hex` 为 null，此时转换会从 `color` 推导文本。

## color

```csharp
public Color color;
```

`hex` 所表示的颜色值。给它赋值不会重写 `hex`，因此在下次转换或使用运算符之前，两个字段可能互相矛盾。

## hex

```csharp
public string hex;
```

以 `#RRGGBBAA` 表示的颜色，包含开头的 `#`。它直接从字段读取，因此在默认初始化的结构体中可能为 null；此时转换会回退到 `color`。

## ToString

```csharp
public override string ToString()
```

把两个字段呈现为 `Color: …, Hex: …`，`hex` 为 null 时从 `color` 推导十六进制文本。

## implicit operator string(ColorHex)

```csharp
public static implicit operator string(ColorHex colorHex)
```

返回十六进制文本，因此凡是需要颜色字符串的地方都可以直接使用该结构体。`hex` 为 null 时会从 `color` 推导，所以结果永远不为 null。

## implicit operator Color(ColorHex)

```csharp
public static implicit operator Color(ColorHex colorHex)
```

返回 `color`，因此该结构体可以直接当作颜色使用。只读取 `color` 字段。

## implicit operator ColorHex(string)

```csharp
public static implicit operator ColorHex(string hex)
```

解析 HTML 颜色字符串。`ColorUtility.TryParseHtmlString` 拒绝的输入会变成白色而不是报错，随后 `hex` 会按解析后的颜色重写，因此保存的文本是规范化后的结果，而不是原样保留。

```csharp
ColorHex tint = "#FF8000";
```

## implicit operator ColorHex(Color)

```csharp
public static implicit operator ColorHex(Color color)
```

包装一个颜色，并从中推导 `#RRGGBBAA` 文本，包含 Alpha 通道。

```csharp
ColorHex tint = Color.red;
```
