# ColorHex

`io.github.ykysnk.utils.NonUdon` · `public struct ColorHex`

A `Color` together with its HTML hex form, so a colour can be serialized and inspected as text.

Only the operators update both fields at once. Assigning `color` or `hex` directly leaves the other field unchanged, so the two can get out of sync; a default-initialized struct also has a null `hex`, and the conversions derive the text from `color` in that case.

## color

```csharp
public Color color;
```

The colour value that `hex` spells out. Assigning it does not rewrite `hex`, so the two fields can disagree until the next conversion or operator.

## hex

```csharp
public string hex;
```

The colour as `#RRGGBBAA`, including the leading `#`. It is read straight from the field, so it can be null on a default-initialized struct; conversions fall back to `color` then.

## ToString

```csharp
public override string ToString()
```

Renders both fields as `Color: …, Hex: …`, deriving the hex from `color` when `hex` is null.

## implicit operator string(ColorHex)

```csharp
public static implicit operator string(ColorHex colorHex)
```

Returns the hex text, so the struct can stand in wherever a colour string is expected. A null `hex` is derived from `color`, so the result is never null.

## implicit operator Color(ColorHex)

```csharp
public static implicit operator Color(ColorHex colorHex)
```

Returns `color`, so the struct can be used directly as a colour. Only the `color` field is read.

## implicit operator ColorHex(string)

```csharp
public static implicit operator ColorHex(string hex)
```

Parses an HTML colour string. Input that `ColorUtility.TryParseHtmlString` rejects becomes white instead of an error, and `hex` is then rewritten from the parsed colour, so the stored text is normalized rather than kept verbatim.

```csharp
ColorHex tint = "#FF8000";
```

## implicit operator ColorHex(Color)

```csharp
public static implicit operator ColorHex(Color color)
```

Wraps a colour and derives its `#RRGGBBAA` text from it, alpha channel included.

```csharp
ColorHex tint = Color.red;
```
