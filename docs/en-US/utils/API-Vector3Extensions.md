# Vector3Extensions

`io.github.ykysnk.utils.Extensions` · `public static class Vector3Extensions`

Per-axis helpers for `Vector3`: distances, component-wise arithmetic, rounding, clamping and the noise-tolerant comparisons that [`FloatExtensions`](./API-FloatExtensions.md) provides for single values.

## Distance

```csharp
public static float Distance(this Vector3 a, Vector3 b)
public static float Distance(this Vector3 a, Transform b)
```

Distance in world units between two points, 0 when both coincide. The `Transform` overload measures to `b.position` and throws `NullReferenceException` for a null transform.

```csharp
if (player.position.Distance(spawn) < 2f) Return();
```

## Distance2D

```csharp
public static float Distance2D(this Vector3 a, Vector3 b)
public static float Distance2D(this Vector3 a, Transform b)
```

Distance in world units between two points projected onto the XZ plane, so the Y axis is ignored; 0 when both share the same X and Z. The `Transform` overload measures to `b.position` and throws `NullReferenceException` for a null transform.

## Divide

```csharp
public static Vector3 Divide(this Vector3 a, Vector3 b)
```

Divides each component of `a` by the matching component of `b`. A zero component of `b` yields infinity or NaN for that axis instead of throwing.

## Multiply

```csharp
public static Vector3 Multiply(this Vector3 a, Vector3 b)
```

Multiplies each component of `a` by the matching component of `b`, which is how scales are combined per axis.

## Round

```csharp
public static Vector3 Round(this Vector3 a, int digits, MidpointRounding mode)
public static Vector3 Round(this Vector3 a, int digits)
public static Vector3 Round(this Vector3 a, MidpointRounding mode)
public static Vector3 Round(this Vector3 a)
```

Rounds every component independently to `digits` fractional digits, using `mode` to resolve midpoints such as 0.5. `digits` must be 0 to 15; any other value throws `ArgumentOutOfRangeException`. The overload without `mode` rounds midpoints to the nearest even digit (`ToEven`, so 0.5 becomes 0 and 1.5 becomes 2), the overload without `digits` rounds to whole numbers, and the parameterless overload is the same with `ToEven`.

## DeltaAngle

```csharp
public static Vector3 DeltaAngle(this Vector3 a, float current)
public static Vector3 DeltaAngle(this Vector3 a)
```

For each component, the shortest signed difference in degrees between that component and `current`, wrapped into [-180, 180]. The parameterless overload uses 0 as the reference angle, so it wraps the angles themselves.

## ClampMagnitude

```csharp
public static Vector3 ClampMagnitude(this Vector3 vector, float maxLength)
```

Limits the magnitude to `maxLength`. A vector already at or below that magnitude is returned unchanged; a longer one is scaled down as `normalized * maxLength`, which keeps its direction. A negative `maxLength` flips the direction of an over-long vector, and a zero vector stays `Vector3.zero`.

## Abs

```csharp
public static Vector3 Abs(this Vector3 vector)
```

A new vector with the absolute value of each component.

## Min

```csharp
public static Vector3 Min(this Vector3 a, Vector3 b)
```

A new vector built from the smaller value of each pair of corresponding components.

## Max

```csharp
public static Vector3 Max(this Vector3 a, Vector3 b)
```

A new vector built from the larger value of each pair of corresponding components.

## Clamp

```csharp
public static Vector3 Clamp(this Vector3 vector, Vector3 min, Vector3 max)
```

Clamps each component independently between the matching components of `min` and `max`. `min` is expected to be at or below `max` per axis.

## Clamp01

```csharp
public static Vector3 Clamp01(this Vector3 vector)
```

Clamps each component to the range [0, 1].

## DirectionTo

```csharp
public static Vector3 DirectionTo(this Vector3 from, Vector3 to)
```

The normalized direction pointing from `from` to `to`, or `Vector3.zero` when both points are identical.

## InverseDirectionTo

```csharp
public static Vector3 InverseDirectionTo(this Vector3 from, Vector3 to)
```

The normalized direction pointing from `to` back to `from`, the opposite of [`DirectionTo`](#directionto), or `Vector3.zero` when both points are identical.

## LerpUnclamped

```csharp
public static Vector3 LerpUnclamped(this Vector3 a, Vector3 b, float t)
```

Interpolates linearly from `a` to `b` without clamping `t`, so values below 0 or above 1 extrapolate along the same line.

## Lerp

```csharp
public static Vector3 Lerp(this Vector3 a, Vector3 b, float t)
```

Interpolates linearly from `a` to `b`, clamping `t` to [0, 1] first so the result never passes either input.

## MoveTowards

```csharp
public static Vector3 MoveTowards(this Vector3 current, Vector3 target, float maxDistanceDelta)
```

Moves `current` towards `target` by at most `maxDistanceDelta` world units, never overshooting the target. A delta of 0 returns `current` unchanged, a negative one moves away from `target`, and the result equals `target` once it is within one step.

## RotateTowards

```csharp
public static Vector3 RotateTowards(this Vector3 current, Vector3 target, float maxRadiansDelta, float maxMagnitudeDelta)
```

Rotates `current` towards `target` by at most `maxRadiansDelta` radians while changing the magnitude by at most `maxMagnitudeDelta`. Both limits are applied per call; the result equals `target` when both are reached.

## ProjectOnPlane

```csharp
public static Vector3 ProjectOnPlane(this Vector3 vector, Vector3 planeNormal)
```

Projects the vector onto the plane that passes through the origin with the given normal, which the implementation normalizes internally. The component along the normal is removed, and a zero normal leaves the vector unchanged.

## Project

```csharp
public static Vector3 Project(this Vector3 vector, Vector3 onNormal)
```

Projects the vector onto the line defined by `onNormal`, keeping only the component parallel to that direction. `onNormal` does not need to be normalized; a zero value returns `Vector3.zero`.

## Reflect

```csharp
public static Vector3 Reflect(this Vector3 inDirection, Vector3 inNormal)
```

Reflects a vector off the plane defined by its normal. `inNormal` must be unit length, otherwise the reflection is scaled wrongly; the result keeps the magnitude of `inDirection`.

## Clean

```csharp
public static Vector3 Clean(this Vector3 vector, float threshold = 0.0001f)
```

A copy of the vector where every component whose absolute value is below `threshold` is replaced by 0. The comparison is strict, so a component exactly at the threshold is kept, and each component is tested on its own.

## IsNearly

```csharp
public static bool IsNearly(this Vector3 vector, Vector3 target, float threshold = 0.0001f)
```

Whether every component differs from the matching component of `target` by less than `threshold`, using absolute differences with a strict comparison.

## IsNearlyZero

```csharp
public static bool IsNearlyZero(this Vector3 vector, float threshold = 0.0001f)
```

Whether every component has an absolute value below `threshold`, that is, whether the vector is close enough to the origin.

## CopyFrom

```csharp
public static void CopyFrom(this ref Vector3 self, Vector3 other)
```

Overwrites every component of `self` with the value from `other`. Because `Vector3` is a struct, `self` is passed by reference, so it must be a `ref`-able variable such as a field, array element or local, not a temporary value.

## CleanInPlace

```csharp
public static void CleanInPlace(this ref Vector3 self, float threshold = 0.0001f)
```

Zeroes, in place, every component of `self` whose absolute value is below `threshold`, with a strict comparison. Like [`CopyFrom`](#copyfrom) it takes `self` by reference, so the caller observes the change.

## ToFullString

```csharp
public static string ToFullString(this Vector3 v)
```

Formats the vector as `(x, y, z)`, writing each component with the round-trip format `R` so parsing the text back yields the same float values.

```csharp
var text = transform.position.ToFullString(); // "(1.5, 0, -2.25)"
```

## Approximately

```csharp
public static bool Approximately(this Vector3 self, Vector3 other)
```

Whether all three components are approximately equal, using the relative epsilon of [`FloatExtensions.Approximately`](./API-FloatExtensions.md#approximately): 1e-6 times the larger magnitude, with a floor of `Mathf.Epsilon * 8`.
