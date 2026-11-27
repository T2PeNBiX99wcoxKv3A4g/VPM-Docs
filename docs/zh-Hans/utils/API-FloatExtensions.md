# FloatExtensions

`io.github.ykysnk.utils.Extensions` · `public static class FloatExtensions`

针对单个数值的辅助方法：去除噪声、容差判断、限幅与舍入。

## Clean

```csharp
public static float Clean(this float value, float threshold = 0.0001f)
```

当绝对值小于 `threshold` 时把值替换为 `0`，从而去除浮点噪声。比较是严格的，因此正好等于阈值的值会被保留，其他情况原值原样返回。

## IsNearly

```csharp
public static bool IsNearly(this float value, float target, float threshold = 0.0001f)
```

判断该值与 `target` 的差是否小于 `threshold`，使用绝对差与严格比较。

```csharp
if (position.x.IsNearly(0f)) position.x = 0f;
```

## IsNearlyZero

```csharp
public static bool IsNearlyZero(this float value, float threshold = 0.0001f)
```

判断该值的绝对值是否小于 `threshold`，也就是使用同样严格比较的 `IsNearly(0f, threshold)`。

## Clamp

```csharp
public static float Clamp(this float value, float min, float max)
```

用 `Mathf.Clamp` 把值限制在 `[min, max]` 内。`min` 应不大于 `max`。

## Clamp01

```csharp
public static float Clamp01(this float value)
```

把值限制在 `[0, 1]` 内；超出范围的值会被拉回最近的一端。

## Round

```csharp
public static float Round(this float value, int digits, MidpointRounding mode)
public static float Round(this float value, int digits)
public static float Round(this float value, MidpointRounding mode)
public static float Round(this float value)
```

舍入到 `digits` 位小数，像 0.5 这样的中点由 `mode` 决定。`digits` 必须为 0 到 15，其他值抛出 `ArgumentOutOfRangeException`。不带 `mode` 的重载把中点舍入到最近的偶数（`MidpointRounding.ToEven`，因此 0.5 变成 0、1.5 变成 2）；不带 `digits` 的重载不保留小数；无参数重载行为相同，也使用 `ToEven`。输入不会被修改。

## Approximately

```csharp
public static bool Approximately(this float value, float target)
```

用随数值大小增长的容差判断两个值是否近似相等：取较大绝对值的 1e-6 倍，但永远不小于 `Mathf.Epsilon * 8`。这个下限是次正规数级别，因此接近零的值必须几乎完全一致；需要绝对容差时请使用 [`IsNearly`](#isnearly)。
