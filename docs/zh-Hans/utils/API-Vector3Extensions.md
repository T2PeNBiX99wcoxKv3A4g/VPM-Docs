# Vector3Extensions

`io.github.ykysnk.utils.Extensions` · `public static class Vector3Extensions`

针对 `Vector3` 的逐轴辅助方法：距离、逐分量运算、舍入、限幅，以及 [`FloatExtensions`](./API-FloatExtensions.md) 为单个数值提供的抗噪声比较。

## Distance

```csharp
public static float Distance(this Vector3 a, Vector3 b)
public static float Distance(this Vector3 a, Transform b)
```

两点之间的世界单位距离，两点重合时为 0。`Transform` 重载量到 `b.position`，Transform 为 null 时抛出 `NullReferenceException`。

```csharp
if (player.position.Distance(spawn) < 2f) Return();
```

## Distance2D

```csharp
public static float Distance2D(this Vector3 a, Vector3 b)
public static float Distance2D(this Vector3 a, Transform b)
```

两点投影到 XZ 平面后的世界单位距离，Y 轴被忽略；X 与 Z 相同时为 0。`Transform` 重载量到 `b.position`，Transform 为 null 时抛出 `NullReferenceException`。

## Divide

```csharp
public static Vector3 Divide(this Vector3 a, Vector3 b)
```

把 `a` 的每个分量除以 `b` 的对应分量。`b` 的分量为 0 时该轴得到无穷大或 NaN，而不是抛出异常。

## Multiply

```csharp
public static Vector3 Multiply(this Vector3 a, Vector3 b)
```

把 `a` 的每个分量乘以 `b` 的对应分量，也就是按轴合成缩放的方式。

## Round

```csharp
public static Vector3 Round(this Vector3 a, int digits, MidpointRounding mode)
public static Vector3 Round(this Vector3 a, int digits)
public static Vector3 Round(this Vector3 a, MidpointRounding mode)
public static Vector3 Round(this Vector3 a)
```

把每个分量独立舍入到 `digits` 位小数，像 0.5 这样的中点由 `mode` 决定。`digits` 必须为 0 到 15，其他值抛出 `ArgumentOutOfRangeException`。不带 `mode` 的重载把中点舍入到最近的偶数（`ToEven`，因此 0.5 变成 0、1.5 变成 2）；不带 `digits` 的重载舍入到整数；无参数重载行为相同，也使用 `ToEven`。

## DeltaAngle

```csharp
public static Vector3 DeltaAngle(this Vector3 a, float current)
public static Vector3 DeltaAngle(this Vector3 a)
```

对每个分量返回它与 `current` 之间以度为单位的带符号最短差，并折到 [-180, 180] 范围内。无参数重载以 0 为参考角，因此是把角度本身折回。

## ClampMagnitude

```csharp
public static Vector3 ClampMagnitude(this Vector3 vector, float maxLength)
```

把向量的长度限制为 `maxLength`。已经不超过该长度的向量原样返回；更长的向量按 `normalized * maxLength` 缩短，因此方向保持不变。`maxLength` 为负时，过长的向量方向会翻转；零向量仍为 `Vector3.zero`。

## Abs

```csharp
public static Vector3 Abs(this Vector3 vector)
```

每个分量取绝对值后的新向量。

## Min

```csharp
public static Vector3 Min(this Vector3 a, Vector3 b)
```

由每对对应分量中较小的值组成的新向量。

## Max

```csharp
public static Vector3 Max(this Vector3 a, Vector3 b)
```

由每对对应分量中较大的值组成的新向量。

## Clamp

```csharp
public static Vector3 Clamp(this Vector3 vector, Vector3 min, Vector3 max)
```

把每个分量独立限制在 `min` 与 `max` 的对应分量之间。`min` 在每个轴上应不大于 `max`。

## Clamp01

```csharp
public static Vector3 Clamp01(this Vector3 vector)
```

把每个分量限制在 [0, 1] 范围内。

## DirectionTo

```csharp
public static Vector3 DirectionTo(this Vector3 from, Vector3 to)
```

从 `from` 指向 `to` 的归一化方向，两点重合时为 `Vector3.zero`。

## InverseDirectionTo

```csharp
public static Vector3 InverseDirectionTo(this Vector3 from, Vector3 to)
```

从 `to` 指回 `from` 的归一化方向，是 [`DirectionTo`](#directionto) 的反向，两点重合时为 `Vector3.zero`。

## LerpUnclamped

```csharp
public static Vector3 LerpUnclamped(this Vector3 a, Vector3 b, float t)
```

从 `a` 到 `b` 线性插值且不限制 `t`，因此小于 0 或大于 1 的值会沿同一直线外推。

## Lerp

```csharp
public static Vector3 Lerp(this Vector3 a, Vector3 b, float t)
```

从 `a` 到 `b` 线性插值，先把 `t` 限制在 [0, 1]，因此结果不会越过任一输入。

## MoveTowards

```csharp
public static Vector3 MoveTowards(this Vector3 current, Vector3 target, float maxDistanceDelta)
```

把 `current` 朝 `target` 移动最多 `maxDistanceDelta` 个世界单位，不会越过目标。增量为 0 时原样返回 `current`，为负时远离 `target`，进入一步之内后结果等于 `target`。

## RotateTowards

```csharp
public static Vector3 RotateTowards(this Vector3 current, Vector3 target, float maxRadiansDelta, float maxMagnitudeDelta)
```

把 `current` 朝 `target` 旋转最多 `maxRadiansDelta` 弧度，同时长度变化最多 `maxMagnitudeDelta`。两个限制按每次调用分别应用，都达到后结果等于 `target`。

## ProjectOnPlane

```csharp
public static Vector3 ProjectOnPlane(this Vector3 vector, Vector3 planeNormal)
```

把向量投影到过原点、具有给定法线的平面上，实现内部会对法线归一化。沿法线的分量被移除，法线为零时向量原样返回。

## Project

```csharp
public static Vector3 Project(this Vector3 vector, Vector3 onNormal)
```

把向量投影到 `onNormal` 定义的直线上，只保留与该方向平行的分量。`onNormal` 不需要归一化；为零时返回 `Vector3.zero`。

## Reflect

```csharp
public static Vector3 Reflect(this Vector3 inDirection, Vector3 inNormal)
```

按法线定义的平面反射向量。`inNormal` 必须是单位长度，否则反射的缩放会出错；结果长度与 `inDirection` 相同。

## Clean

```csharp
public static Vector3 Clean(this Vector3 vector, float threshold = 0.0001f)
```

返回向量的副本，其中绝对值小于 `threshold` 的分量被替换为 0。比较是严格的，因此正好等于阈值的分量会被保留，每个分量单独判断。

## IsNearly

```csharp
public static bool IsNearly(this Vector3 vector, Vector3 target, float threshold = 0.0001f)
```

判断每个分量与 `target` 对应分量的差是否都小于 `threshold`，使用绝对差与严格比较。

## IsNearlyZero

```csharp
public static bool IsNearlyZero(this Vector3 vector, float threshold = 0.0001f)
```

判断每个分量的绝对值是否都小于 `threshold`，也就是向量是否足够接近原点。

## CopyFrom

```csharp
public static void CopyFrom(this ref Vector3 self, Vector3 other)
```

用 `other` 的值覆盖 `self` 的每个分量。`Vector3` 是结构体，因此 `self` 以引用传递，必须是字段、数组元素或局部变量这类可作为 `ref` 的变量，不能是临时值。

## CleanInPlace

```csharp
public static void CleanInPlace(this ref Vector3 self, float threshold = 0.0001f)
```

就地清零 `self` 中绝对值小于 `threshold` 的分量，比较是严格的。与 [`CopyFrom`](#copyfrom) 一样以引用取得 `self`，因此调用方能看到改动。

## ToFullString

```csharp
public static string ToFullString(this Vector3 v)
```

把向量格式化为 `(x, y, z)`，每个分量使用往返格式 `R` 写出，因此把文本解析回来能得到相同的 float 值。

```csharp
var text = transform.position.ToFullString(); // "(1.5, 0, -2.25)"
```

## Approximately

```csharp
public static bool Approximately(this Vector3 self, Vector3 other)
```

判断三个分量是否都近似相等，使用 [`FloatExtensions.Approximately`](./API-FloatExtensions.md#approximately) 的相对 epsilon：较大值的 1e-6 倍，下限为 `Mathf.Epsilon * 8`。
