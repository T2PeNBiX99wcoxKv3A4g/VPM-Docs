# FloatExtensions

`io.github.ykysnk.utils.Extensions` · `public static class FloatExtensions`

針對單一數值的輔助方法：去除雜訊、容差判斷、限制範圍與四捨五入。

## Clean

```csharp
public static float Clean(this float value, float threshold = 0.0001f)
```

絕對值小於 `threshold` 時把值換成 `0`，藉此去除浮點雜訊。比較是嚴格的，因此正好等於門檻的值會保留，其他情況原值原樣傳回。

## IsNearly

```csharp
public static bool IsNearly(this float value, float target, float threshold = 0.0001f)
```

判斷該值與 `target` 的差是否小於 `threshold`，使用絕對差與嚴格比較。

```csharp
if (position.x.IsNearly(0f)) position.x = 0f;
```

## IsNearlyZero

```csharp
public static bool IsNearlyZero(this float value, float threshold = 0.0001f)
```

判斷該值的絕對值是否小於 `threshold`，也就是使用同樣嚴格比較的 `IsNearly(0f, threshold)`。

## Clamp

```csharp
public static float Clamp(this float value, float min, float max)
```

以 `Mathf.Clamp` 把值限制在 `[min, max]` 內。`min` 應不大於 `max`。

## Clamp01

```csharp
public static float Clamp01(this float value)
```

把值限制在 `[0, 1]` 內；超出範圍的值會被拉回較近的一端。

## Round

```csharp
public static float Round(this float value, int digits, MidpointRounding mode)
public static float Round(this float value, int digits)
public static float Round(this float value, MidpointRounding mode)
public static float Round(this float value)
```

四捨五入到 `digits` 位小數，像 0.5 這樣的中點由 `mode` 決定。`digits` 必須為 0 到 15，其他值擲回 `ArgumentOutOfRangeException`。沒有 `mode` 的多載把中點捨入到最接近的偶數（`MidpointRounding.ToEven`，因此 0.5 變成 0、1.5 變成 2）；沒有 `digits` 的多載不保留小數；無參數多載行為相同，也使用 `ToEven`。輸入不會被修改。

## Approximately

```csharp
public static bool Approximately(this float value, float target)
```

以隨數值大小成長的容差判斷兩個值是否近似相等：取較大絕對值的 1e-6 倍，但永不小於 `Mathf.Epsilon * 8`。這個下限是次正規數等級，因此接近零的值必須幾乎完全一致；需要絕對容差時請使用 [`IsNearly`](#isnearly)。
