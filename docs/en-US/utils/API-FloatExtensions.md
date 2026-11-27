# FloatExtensions

`io.github.ykysnk.utils.Extensions` · `public static class FloatExtensions`

Numeric helpers for single values: noise removal, tolerance tests, clamping and rounding.

## Clean

```csharp
public static float Clean(this float value, float threshold = 0.0001f)
```

Replaces the value with `0` when its absolute value is below `threshold`, which removes floating-point noise. The comparison is strict, so a value exactly at the threshold is kept; otherwise the original value comes back unchanged.

## IsNearly

```csharp
public static bool IsNearly(this float value, float target, float threshold = 0.0001f)
```

Whether the value differs from `target` by less than `threshold`, using the absolute difference with a strict comparison.

```csharp
if (position.x.IsNearly(0f)) position.x = 0f;
```

## IsNearlyZero

```csharp
public static bool IsNearlyZero(this float value, float threshold = 0.0001f)
```

Whether the value's absolute value is below `threshold`, that is `IsNearly(0f, threshold)` with the same strict comparison.

## Clamp

```csharp
public static float Clamp(this float value, float min, float max)
```

Clamps the value into `[min, max]` with `Mathf.Clamp`. `min` is expected to be at or below `max`.

## Clamp01

```csharp
public static float Clamp01(this float value)
```

Clamps the value to `[0, 1]`; values outside that range are pulled back to the nearest end.

## Round

```csharp
public static float Round(this float value, int digits, MidpointRounding mode)
public static float Round(this float value, int digits)
public static float Round(this float value, MidpointRounding mode)
public static float Round(this float value)
```

Rounds to `digits` fractional digits, using `mode` to resolve midpoints such as 0.5. `digits` must be 0 to 15; any other value throws `ArgumentOutOfRangeException`. The overload without `mode` rounds midpoints to the nearest even digit (`MidpointRounding.ToEven`, so 0.5 becomes 0 and 1.5 becomes 2); the overload without `digits` keeps no fractional digits; the parameterless overload is the same with `ToEven`. The input is never modified.

## Approximately

```csharp
public static bool Approximately(this float value, float target)
```

Whether two values are approximately equal using a tolerance that grows with their magnitude: 1e-6 times the larger absolute value, but never less than `Mathf.Epsilon * 8`. That floor is denormal-small, so values near zero must match almost exactly; use [`IsNearly`](#isnearly) when an absolute tolerance is needed.
