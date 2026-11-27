# GameObjectExtensions

`io.github.ykysnk.utils.Extensions` · `public static class GameObjectExtensions`

GameObject helpers for hierarchy paths, distance checks and index based component access. Anything that needs a position or a scale goes through the GameObject's Transform, so the results match the [`TransformExtensions`](./API-TransformExtensions.md) members of the same name.

## FullName

```csharp
public static string FullName(this GameObject obj)
```

Full hierarchy path of the GameObject, for example `Root/Child/Name`, without a leading slash. The path is built from the GameObject's Transform up to the root of the hierarchy.

## IsCloseRange

```csharp
public static bool IsCloseRange(this GameObject obj, GameObject other, float distance)
```

Compares the two world positions in Unity units, on all three axes. The check is strictly less than `distance`, so objects exactly that far apart do not count as close.

## IsCloseRange2D

```csharp
public static bool IsCloseRange2D(this GameObject obj, GameObject other, float distance)
```

Compares the two world positions on the XZ plane only, so height differences are ignored. The check is strictly less than `distance`.

## GetWorldScale

```csharp
[Obsolete("Use Transform.lossyScale instead.")]
public static Vector3 GetWorldScale(this GameObject obj)
```

World scale of the GameObject, identical to `Transform.lossyScale`. It is kept for source compatibility only; read `obj.transform.lossyScale` instead.

## GetLocalScaleFollowWorldScale

```csharp
public static Vector3 GetLocalScaleFollowWorldScale(this GameObject obj)
```

Local scale that makes the GameObject's world scale equal to (1, 1, 1), i.e. one divided by the parent's lossy scale. A GameObject without a parent returns (1, 1, 1).

## GetTargetLocalScale

```csharp
public static Vector3 GetTargetLocalScale(this GameObject obj, GameObject other)
```

Component-wise division of the other object's world scale by this GameObject's world scale, i.e. how many times larger the other object is per axis. The ratio is 1 where both objects are equally scaled. The other object's Transform is read without a null check.

## TryGetComponentAtIndex

```csharp
public static bool TryGetComponentAtIndex(this GameObject obj, int index, out Component component)
```

Reads the component at the given index of the GameObject's component list. A negative index or one past the end returns `false` and sets `component` to `null`.

## GetComponentAtIndexOrDefault

```csharp
public static Component GetComponentAtIndexOrDefault(this GameObject obj, int index)
```

The component at that index, or `null` when the index is out of range.

## GetComponents

```csharp
public static Component[] GetComponents(this GameObject obj)
```

Every component of the GameObject in component order. The result is not filtered by type, so it can hold several components of the same type.

## ComponentsForeach

```csharp
public static void ComponentsForeach(this GameObject obj, Action<int, Component> componentAction)
```

Calls `componentAction` with the index and component for every component of the GameObject. The component count is read once before the loop, so components added or destroyed inside the callback only affect the remaining indices. Not compiled when `COMPILER_UDONSHARP` is defined.

## ComponentsSelect

```csharp
public static T[] ComponentsSelect<T>(this GameObject obj, Func<int, Component, T> selector)
```

Projects every component of the GameObject through `selector`, keeping component order. The array length is the component count read before the loop. Not compiled when `COMPILER_UDONSHARP` is defined.

## IsSceneObject

```csharp
public static bool IsSceneObject(this GameObject obj)
```

True when the GameObject belongs to a loaded scene and the editor is not in prefab isolation mode, i.e. `obj.scene.IsValid() && !Utils.IsInPrefab`. The prefab check reads the global editor state rather than this object. Under `COMPILER_UDONSHARP` the method has a separate body that always returns `false`.

## IsPlayerCloseRange

```csharp
public static bool IsPlayerCloseRange(this GameObject obj, float distance)
```

VRChat only. Compares the local player's world position with this GameObject's pivot on all three axes, with a strict comparison against `distance`. It returns `false` when no valid local player exists, and it only exists when `UTILS_UDONSHARP` is defined, which the file derives from `UTILS_VRC_SDK3_BASE` or `COMPILER_UDONSHARP`.

## IsPlayerCloseRange2D

```csharp
public static bool IsPlayerCloseRange2D(this GameObject obj, float distance)
```

VRChat only. Same as [`IsPlayerCloseRange`](#isplayercloserange) on the XZ plane, so height differences are ignored. It only exists when `UTILS_UDONSHARP` is defined.
