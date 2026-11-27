# TransformExtensions

`io.github.ykysnk.utils.Extensions` · `public static class TransformExtensions`

用于 Transform 的层级名称、世界/本地缩放转换、忽略缩放的坐标转换与距离判断的辅助方法。位置始终是世界位置，因此父级 Transform 会影响每个结果。

## FullName

```csharp
public static string FullName(this Transform transform)
```

Transform 的完整层级路径，向上构建到根节点并用 `/` 连接，例如 `Root/Child/Name`。没有前导斜杠，没有父级的 Transform 返回自己的名称。

```csharp
var path = selection.activeTransform.FullName();
```

## GetWorldScale

```csharp
[Obsolete("Use Transform.lossyScale instead.")]
public static Vector3 GetWorldScale(this Transform transform)
```

Transform 的世界缩放，与 `Transform.lossyScale` 相同：Transform 自身与其所有父级合成的缩放。只为源码兼容而保留，请改读 `lossyScale`。

## GetLocalScaleFollowWorldScale

```csharp
public static Vector3 GetLocalScaleFollowWorldScale(this Transform transform)
```

使 Transform 的世界缩放等于 (1, 1, 1) 的本地缩放，也就是父级 lossy scale 的倒数。没有父级的 Transform 返回 (1, 1, 1)。

## GetTargetLocalScale

```csharp
public static Vector3 GetTargetLocalScale(this Transform transform, Transform other)
public static Vector3 GetTargetLocalScale(this Transform transform, GameObject other)
```

把对方的世界缩放按轴除以该 Transform 的世界缩放，也就是对方在每个轴上大多少倍。两者缩放相同的轴结果为 1。`GameObject` 重载读取 `other.transform`；两者都未对另一方做 null 检查。

## GetLocalScaleFromLossyScale

```csharp
public static Vector3 GetLocalScaleFromLossyScale(this Transform transform, Vector3 lossyScale)
```

把期望的世界缩放转换为能产生它的本地缩放，方法是除以父级的 lossy scale。非等比缩放的父级带来的旋转与切变不会被补偿，因此只有父级等比缩放时结果才是精确的。没有父级的 Transform 原样返回 `lossyScale`。

## SetLossyScale

```csharp
public static void SetLossyScale(this Transform transform, Vector3 lossyScale)
```

赋上能得到期望世界缩放的本地缩放，并且不改动父级 Transform。它和 [`GetLocalScaleFromLossyScale`](#getlocalscalefromlossyscale) 有相同的限制。

## SetLossyScaleInPlace

```csharp
public static void SetLossyScaleInPlace(this Transform transform, Vector3 lossyScale)
```

与 [`SetLossyScale`](#setlossyscale) 完全相同：赋上能得到期望世界缩放的本地缩放，并且不改动父级 Transform。

## TransformPointUnscaled

```csharp
public static Vector3 TransformPointUnscaled(this Transform transform, Vector3 position)
```

忽略缩放，把本地空间的点转换为世界空间：点会乘以用缩放 1 构建的平移与旋转矩阵。父级缩放仍会移动结果，因为它移动了 Transform 的位置，但本地偏移本身永远不会被缩放。

## InverseTransformPointUnscaled

```csharp
public static Vector3 InverseTransformPointUnscaled(this Transform transform, Vector3 position)
```

忽略缩放，把世界位置转换为 Transform 的本地空间，是 [`TransformPointUnscaled`](#transformpointunscaled) 的逆运算。结果是相对于 Transform 的位置，不除以它的缩放。

## Distance

```csharp
public static float Distance(this Transform transform, Transform other)
public static float Distance(this Transform transform, Vector3 other)
```

两个世界位置在三个轴上的距离，以 Unity 单位表示的非负值。`Vector3` 重载从 Transform 的 `position` 量到给定的世界点。

## Distance2D

```csharp
public static float Distance2D(this Transform transform, Transform other)
public static float Distance2D(this Transform transform, Vector3 other)
```

两个世界位置在 XZ 平面上的距离，Y 方向的差被忽略，因此高度不影响结果。`Vector3` 重载从 Transform 的 `position` 量到给定的世界点。

## IsCloseRange

```csharp
public static bool IsCloseRange(this Transform transform, Transform other, float distance)
```

在三个轴上比较两个世界位置。判断使用严格小于 `distance`，因此正好相距该距离的对象不算靠近。

```csharp
if (handle.IsCloseRange(anchor, 0.01f)) Snap();
```

## IsCloseRange2D

```csharp
public static bool IsCloseRange2D(this Transform transform, Transform other, float distance)
```

在 XZ 平面上比较两个世界位置，因此高度差被忽略，与 `distance` 的比较同样严格。

## IsPlayerCloseRange

```csharp
public static bool IsPlayerCloseRange(this Transform transform, float distance)
```

仅限 VRChat。在三个轴上把本地玩家的世界位置与 Transform 的位置比较，并与 `distance` 做严格比较。没有有效的本地玩家时返回 `false`。它只在定义 `UTILS_UDONSHARP` 时存在，该文件从 `UTILS_VRC_SDK3_BASE` 或 `COMPILER_UDONSHARP` 推导出这个定义，因此 VRChat 与 UdonSharp 构建中才有它。

## IsPlayerCloseRange2D

```csharp
public static bool IsPlayerCloseRange2D(this Transform transform, float distance)
```

仅限 VRChat。在 XZ 平面上做与 [`IsPlayerCloseRange`](#isplayercloserange) 相同的判断，因此高度差被忽略。它只在定义 `UTILS_UDONSHARP` 时存在。
