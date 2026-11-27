# FloatExtensions

`io.github.ykysnk.utils.Extensions` · `public static class FloatExtensions`

単一の値に対する数値ヘルパーです。ノイズ除去、許容誤差の判定、クランプ、丸めがあります。

## Clean

```csharp
public static float Clean(this float value, float threshold = 0.0001f)
```

絶対値が `threshold` より小さいとき値を `0` に置き換え、浮動小数点のノイズを取り除きます。比較は厳密なので、しきい値ちょうどの値はそのまま残ります。それ以外は元の値がそのまま返ります。

## IsNearly

```csharp
public static bool IsNearly(this float value, float target, float threshold = 0.0001f)
```

値と `target` の差が `threshold` より小さいかどうかを、絶対差と厳密比較で判定します。

```csharp
if (position.x.IsNearly(0f)) position.x = 0f;
```

## IsNearlyZero

```csharp
public static bool IsNearlyZero(this float value, float threshold = 0.0001f)
```

値の絶対値が `threshold` より小さいかどうか、つまり同じ厳密比較での `IsNearly(0f, threshold)` です。

## Clamp

```csharp
public static float Clamp(this float value, float min, float max)
```

`Mathf.Clamp` で値を `[min, max]` にクランプします。`min` は `max` 以下が前提です。

## Clamp01

```csharp
public static float Clamp01(this float value)
```

値を `[0, 1]` にクランプします。範囲外の値は近い側の端に引き戻されます。

## Round

```csharp
public static float Round(this float value, int digits, MidpointRounding mode)
public static float Round(this float value, int digits)
public static float Round(this float value, MidpointRounding mode)
public static float Round(this float value)
```

`digits` 桁の小数に丸め、0.5 のような中間値は `mode` で決めます。`digits` は 0〜15 で、それ以外は `ArgumentOutOfRangeException` を投げます。`mode` を取らないオーバーロードは中間値を最も近い偶数に丸め（`MidpointRounding.ToEven` なので 0.5 は 0、1.5 は 2）、`digits` を取らないオーバーロードは小数を残さず、引数なしのオーバーロードは同じ動作で `ToEven` です。入力は変更しません。

## Approximately

```csharp
public static bool Approximately(this float value, float target)
```

大きさに応じて広がる許容誤差で 2 つの値がほぼ等しいかを判定します。誤差は大きい方の絶対値の 1e-6 倍で、最小でも `Mathf.Epsilon * 8` です。この下限は非正規化数レベルなので、0 付近の値はほぼ完全に一致する必要があります。絶対的な許容誤差が必要な場合は [`IsNearly`](#isnearly) を使ってください。
