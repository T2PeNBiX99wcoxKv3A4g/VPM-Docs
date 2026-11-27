# TransformExtensions

`io.github.ykysnk.utils.Extensions` · `public static class TransformExtensions`

Transform helpers for hierarchy names, world/local scale conversion, unscaled point conversion and distance checks. Positions are always world positions, so a parent transform affects every result.

## FullName

```csharp
public static string FullName(this Transform transform)
```

Full hierarchy path of the transform, built upwards to the root and joined with `/`, for example `Root/Child/Name`. There is no leading slash, and a transform without a parent returns its own name.

```csharp
var path = selection.activeTransform.FullName();
```

## GetWorldScale

```csharp
[Obsolete("Use Transform.lossyScale instead.")]
public static Vector3 GetWorldScale(this Transform transform)
```

World scale of the transform, identical to `Transform.lossyScale`: the combined scale of the transform and all of its parents. It is kept for source compatibility only, so read `lossyScale` instead.

## GetLocalScaleFollowWorldScale

```csharp
public static Vector3 GetLocalScaleFollowWorldScale(this Transform transform)
```

Local scale that makes the transform's world scale equal to (1, 1, 1), i.e. one divided by the parent's lossy scale. A transform without a parent returns (1, 1, 1).

## GetTargetLocalScale

```csharp
public static Vector3 GetTargetLocalScale(this Transform transform, Transform other)
public static Vector3 GetTargetLocalScale(this Transform transform, GameObject other)
```

Component-wise division of the other transform's world scale by this transform's world scale, i.e. how many times larger the other object is per axis. The ratio is 1 where both are equally scaled. The `GameObject` overload reads `other.transform`; both read the other side without a null check.

## GetLocalScaleFromLossyScale

```csharp
public static Vector3 GetLocalScaleFromLossyScale(this Transform transform, Vector3 lossyScale)
```

Converts a wanted world scale into the local scale that produces it, by dividing it by the parent's lossy scale. Rotation and shear from a non-uniformly scaled parent are not compensated, so the result is exact only for uniformly scaled parents. A transform without a parent returns `lossyScale` unchanged.

## SetLossyScale

```csharp
public static void SetLossyScale(this Transform transform, Vector3 lossyScale)
```

Assigns the local scale that yields the wanted world scale and leaves the parent transform untouched. It has the same limitation as [`GetLocalScaleFromLossyScale`](#getlocalscalefromlossyscale).

## SetLossyScaleInPlace

```csharp
public static void SetLossyScaleInPlace(this Transform transform, Vector3 lossyScale)
```

Identical to [`SetLossyScale`](#setlossyscale): assigns the local scale that yields the wanted world scale and leaves the parent transform untouched.

## TransformPointUnscaled

```csharp
public static Vector3 TransformPointUnscaled(this Transform transform, Vector3 position)
```

Converts a point from the transform's local space to world space while ignoring scale: the point is multiplied by a translation and rotation matrix built with a scale of one. Parent scaling still moves the result because it moves the transform's position, but the local offset itself is never scaled.

## InverseTransformPointUnscaled

```csharp
public static Vector3 InverseTransformPointUnscaled(this Transform transform, Vector3 position)
```

Converts a world position into the transform's local space while ignoring scale, the inverse of [`TransformPointUnscaled`](#transformpointunscaled). The result is the position relative to the transform, without dividing by its scale.

## Distance

```csharp
public static float Distance(this Transform transform, Transform other)
public static float Distance(this Transform transform, Vector3 other)
```

Distance between the two world positions on all three axes, as a non-negative number in Unity units. The `Vector3` overload measures from the transform's `position` to the given world point.

## Distance2D

```csharp
public static float Distance2D(this Transform transform, Transform other)
public static float Distance2D(this Transform transform, Vector3 other)
```

Distance between the two world positions on the XZ plane, so the Y difference is ignored and height does not count. The `Vector3` overload measures from the transform's `position` to the given world point.

## IsCloseRange

```csharp
public static bool IsCloseRange(this Transform transform, Transform other, float distance)
```

Compares the two world positions on all three axes. The check is strictly less than `distance`, so objects exactly that far apart do not count as close.

```csharp
if (handle.IsCloseRange(anchor, 0.01f)) Snap();
```

## IsCloseRange2D

```csharp
public static bool IsCloseRange2D(this Transform transform, Transform other, float distance)
```

Compares the two world positions on the XZ plane, so height differences are ignored, with the same strict comparison against `distance`.

## IsPlayerCloseRange

```csharp
public static bool IsPlayerCloseRange(this Transform transform, float distance)
```

VRChat only. Compares the local player's world position with the transform's position on all three axes, with a strict comparison against `distance`. It returns `false` when no valid local player exists. It only exists when `UTILS_UDONSHARP` is defined, which the file derives from `UTILS_VRC_SDK3_BASE` or `COMPILER_UDONSHARP`, so the VRChat and UdonSharp builds have it and other builds do not.

## IsPlayerCloseRange2D

```csharp
public static bool IsPlayerCloseRange2D(this Transform transform, float distance)
```

VRChat only. Same as [`IsPlayerCloseRange`](#isplayercloserange) on the XZ plane, so height differences are ignored. It only exists when `UTILS_UDONSHARP` is defined.
