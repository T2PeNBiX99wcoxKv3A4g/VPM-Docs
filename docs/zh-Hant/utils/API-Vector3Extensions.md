# Vector3Extensions

`io.github.ykysnk.utils.Extensions` · `public static class Vector3Extensions`

針對 `Vector3` 的逐軸輔助方法：距離、逐分量運算、捨入、限制範圍，以及 [`FloatExtensions`](./API-FloatExtensions.md) 為單一數值提供的抗雜訊比較。

## Distance

```csharp
public static float Distance(this Vector3 a, Vector3 b)
public static float Distance(this Vector3 a, Transform b)
```

兩點之間的世界單位距離，兩點重合時為 0。`Transform` 多載量到 `b.position`，Transform 為 null 時擲回 `NullReferenceException`。

```csharp
if (player.position.Distance(spawn) < 2f) Return();
```

## Distance2D

```csharp
public static float Distance2D(this Vector3 a, Vector3 b)
public static float Distance2D(this Vector3 a, Transform b)
```

兩點投影到 XZ 平面後的世界單位距離，Y 軸被忽略；X 與 Z 相同時為 0。`Transform` 多載量到 `b.position`，Transform 為 null 時擲回 `NullReferenceException`。

## Divide

```csharp
public static Vector3 Divide(this Vector3 a, Vector3 b)
```

把 `a` 的每個分量除以 `b` 的對應分量。`b` 的分量為 0 時該軸得到無限大或 NaN，而不是擲回例外。

## Multiply

```csharp
public static Vector3 Multiply(this Vector3 a, Vector3 b)
```

把 `a` 的每個分量乘以 `b` 的對應分量，也就是逐軸合成縮放的方式。

## Round

```csharp
public static Vector3 Round(this Vector3 a, int digits, MidpointRounding mode)
public static Vector3 Round(this Vector3 a, int digits)
public static Vector3 Round(this Vector3 a, MidpointRounding mode)
public static Vector3 Round(this Vector3 a)
```

把每個分量獨立捨入到 `digits` 位小數，像 0.5 這樣的中點由 `mode` 決定。`digits` 必須為 0 到 15，其他值擲回 `ArgumentOutOfRangeException`。沒有 `mode` 的多載把中點捨入到最接近的偶數（`ToEven`，因此 0.5 變成 0、1.5 變成 2）；沒有 `digits` 的多載捨入到整數；無參數多載行為相同，也使用 `ToEven`。

## DeltaAngle

```csharp
public static Vector3 DeltaAngle(this Vector3 a, float current)
public static Vector3 DeltaAngle(this Vector3 a)
```

對每個分量傳回它與 `current` 之間以度為單位的最短帶正負號差，並折到 [-180, 180] 範圍內。無參數多載以 0 為參考角，因此是把角度本身折回。

## ClampMagnitude

```csharp
public static Vector3 ClampMagnitude(this Vector3 vector, float maxLength)
```

把向量的長度限制為 `maxLength`。已經不超過該長度的向量原樣傳回；更長的向量以 `normalized * maxLength` 縮短，因此方向保持不變。`maxLength` 為負時，過長的向量方向會翻轉；零向量仍為 `Vector3.zero`。

## Abs

```csharp
public static Vector3 Abs(this Vector3 vector)
```

每個分量取絕對值後的新向量。

## Min

```csharp
public static Vector3 Min(this Vector3 a, Vector3 b)
```

由每對對應分量中較小的值組成的新向量。

## Max

```csharp
public static Vector3 Max(this Vector3 a, Vector3 b)
```

由每對對應分量中較大的值組成的新向量。

## Clamp

```csharp
public static Vector3 Clamp(this Vector3 vector, Vector3 min, Vector3 max)
```

把每個分量獨立限制在 `min` 與 `max` 的對應分量之間。`min` 在每個軸上應不大於 `max`。

## Clamp01

```csharp
public static Vector3 Clamp01(this Vector3 vector)
```

把每個分量限制在 [0, 1] 範圍內。

## DirectionTo

```csharp
public static Vector3 DirectionTo(this Vector3 from, Vector3 to)
```

從 `from` 指向 `to` 的正規化方向，兩點重合時為 `Vector3.zero`。

## InverseDirectionTo

```csharp
public static Vector3 InverseDirectionTo(this Vector3 from, Vector3 to)
```

從 `to` 指回 `from` 的正規化方向，是 [`DirectionTo`](#directionto) 的反向，兩點重合時為 `Vector3.zero`。

## LerpUnclamped

```csharp
public static Vector3 LerpUnclamped(this Vector3 a, Vector3 b, float t)
```

從 `a` 到 `b` 線性插值且不限制 `t`，因此小於 0 或大於 1 的值會沿同一直線外推。

## Lerp

```csharp
public static Vector3 Lerp(this Vector3 a, Vector3 b, float t)
```

從 `a` 到 `b` 線性插值，先把 `t` 限制在 [0, 1]，因此結果不會越過任一輸入。

## MoveTowards

```csharp
public static Vector3 MoveTowards(this Vector3 current, Vector3 target, float maxDistanceDelta)
```

把 `current` 朝 `target` 移動最多 `maxDistanceDelta` 個世界單位，不會越過目標。差值為 0 時原樣傳回 `current`，為負時遠離 `target`，進入一步之內後結果等於 `target`。

## RotateTowards

```csharp
public static Vector3 RotateTowards(this Vector3 current, Vector3 target, float maxRadiansDelta, float maxMagnitudeDelta)
```

把 `current` 朝 `target` 旋轉最多 `maxRadiansDelta` 弧度，同時長度變化最多 `maxMagnitudeDelta`。兩個限制都依每次呼叫套用，都達到後結果等於 `target`。

## ProjectOnPlane

```csharp
public static Vector3 ProjectOnPlane(this Vector3 vector, Vector3 planeNormal)
```

把向量投影到通過原點、具有指定法線的平面上，實作內部會正規化法線。沿法線的分量被移除，法線為零時向量原樣傳回。

## Project

```csharp
public static Vector3 Project(this Vector3 vector, Vector3 onNormal)
```

把向量投影到 `onNormal` 定義的直線上，只保留與該方向平行的分量。`onNormal` 不需要正規化；為零時傳回 `Vector3.zero`。

## Reflect

```csharp
public static Vector3 Reflect(this Vector3 inDirection, Vector3 inNormal)
```

依法線定義的平面反射向量。`inNormal` 必須是單位長度，否則反射的縮放會出錯；結果長度與 `inDirection` 相同。

## Clean

```csharp
public static Vector3 Clean(this Vector3 vector, float threshold = 0.0001f)
```

傳回向量的複本，其中絕對值小於 `threshold` 的分量被換成 0。比較是嚴格的，因此正好等於門檻的分量會保留，每個分量各自判斷。

## IsNearly

```csharp
public static bool IsNearly(this Vector3 vector, Vector3 target, float threshold = 0.0001f)
```

判斷每個分量與 `target` 對應分量的差是否都小於 `threshold`，使用絕對差與嚴格比較。

## IsNearlyZero

```csharp
public static bool IsNearlyZero(this Vector3 vector, float threshold = 0.0001f)
```

判斷每個分量的絕對值是否都小於 `threshold`，也就是向量是否夠接近原點。

## CopyFrom

```csharp
public static void CopyFrom(this ref Vector3 self, Vector3 other)
```

以 `other` 的值覆寫 `self` 的每個分量。`Vector3` 是結構，因此 `self` 以參照傳遞，必須是可作為 `ref` 的變數，例如欄位、陣列元素或區域變數，不能是暫存值。

## CleanInPlace

```csharp
public static void CleanInPlace(this ref Vector3 self, float threshold = 0.0001f)
```

就地把 `self` 中絕對值小於 `threshold` 的分量歸零，比較是嚴格的。與 [`CopyFrom`](#copyfrom) 一樣以參照取得 `self`，因此呼叫端能看到變更。

## ToFullString

```csharp
public static string ToFullString(this Vector3 v)
```

把向量格式化為 `(x, y, z)`，每個分量使用往返格式 `R` 寫出，因此把文字解析回來會得到相同的 float 值。

```csharp
var text = transform.position.ToFullString(); // "(1.5, 0, -2.25)"
```

## Approximately

```csharp
public static bool Approximately(this Vector3 self, Vector3 other)
```

判斷三個分量是否都近似相等，使用 [`FloatExtensions.Approximately`](./API-FloatExtensions.md#approximately) 的相對 epsilon：較大值的 1e-6 倍，下限為 `Mathf.Epsilon * 8`。
