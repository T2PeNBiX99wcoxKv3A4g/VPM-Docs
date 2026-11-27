# ColorHex

`io.github.ykysnk.utils.NonUdon` · `public struct ColorHex`

`Color` とその HTML 16 進表記を一緒に持つ構造体で、色をテキストとしてシリアライズしたり確認したりできます。

両方のフィールドを同時に更新するのは演算子だけです。`color` または `hex` を直接代入すると、もう一方のフィールドはそのまま残るため、2 つの値がずれることがあります。既定値で初期化した構造体では `hex` が null になり、その場合の変換は `color` からテキストを生成します。

## color

```csharp
public Color color;
```

`hex` が表している色の値です。代入しても `hex` は書き換わらないため、次に変換か演算子を通るまで 2 つのフィールドは食い違ったままになります。

## hex

```csharp
public string hex;
```

先頭の `#` を含む `#RRGGBBAA` 形式の色です。フィールドからそのまま読まれるため、既定値で初期化した構造体では null になり得ます。その場合の変換は `color` にフォールバックします。

## ToString

```csharp
public override string ToString()
```

両方のフィールドを `Color: …, Hex: …` として表します。`hex` が null のときは `color` から 16 進表記を生成します。

## implicit operator string(ColorHex)

```csharp
public static implicit operator string(ColorHex colorHex)
```

16 進表記のテキストを返すため、色の文字列が期待される場所でこの構造体をそのまま使えます。`hex` が null のときは `color` から生成するので、結果が null になることはありません。

## implicit operator Color(ColorHex)

```csharp
public static implicit operator Color(ColorHex colorHex)
```

`color` を返すため、この構造体をそのまま色として使えます。読み取られるのは `color` フィールドだけです。

## implicit operator ColorHex(string)

```csharp
public static implicit operator ColorHex(string hex)
```

HTML の色文字列を解析します。`ColorUtility.TryParseHtmlString` が受け付けない入力はエラーではなく白になり、`hex` は解析後の色から書き直されるため、保存されるテキストは元のままではなく正規化されます。

```csharp
ColorHex tint = "#FF8000";
```

## implicit operator ColorHex(Color)

```csharp
public static implicit operator ColorHex(Color color)
```

色を受け取り、アルファチャンネルも含めた `#RRGGBBAA` のテキストを生成します。

```csharp
ColorHex tint = Color.red;
```
