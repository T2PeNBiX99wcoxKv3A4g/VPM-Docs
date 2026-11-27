# GameObjectExtensions

`io.github.ykysnk.utils.Extensions` · `public static class GameObjectExtensions`

用于 GameObject 的层级路径、距离判断与按索引访问组件的辅助方法。需要位置或缩放的部分都经过 GameObject 的 Transform，因此结果与同名的 [`TransformExtensions`](./API-TransformExtensions.md) 成员相同。

## FullName

```csharp
public static string FullName(this GameObject obj)
```

GameObject 的完整层级路径，例如 `Root/Child/Name`，不带前导斜杠。路径从 GameObject 的 Transform 一直构建到层级根节点。

## IsCloseRange

```csharp
public static bool IsCloseRange(this GameObject obj, GameObject other, float distance)
```

在三个轴上以 Unity 单位比较两个世界位置。判断使用严格小于 `distance`，因此正好相距该距离的对象不算靠近。

## IsCloseRange2D

```csharp
public static bool IsCloseRange2D(this GameObject obj, GameObject other, float distance)
```

只在 XZ 平面上比较两个世界位置，因此高度差被忽略。判断同样使用严格小于 `distance`。

## GetWorldScale

```csharp
[Obsolete("Use Transform.lossyScale instead.")]
public static Vector3 GetWorldScale(this GameObject obj)
```

GameObject 的世界缩放，与 `Transform.lossyScale` 相同。只为源码兼容而保留，请改读 `obj.transform.lossyScale`。

## GetLocalScaleFollowWorldScale

```csharp
public static Vector3 GetLocalScaleFollowWorldScale(this GameObject obj)
```

使 GameObject 的世界缩放等于 (1, 1, 1) 的本地缩放，也就是父级 lossy scale 的倒数。没有父级的 GameObject 返回 (1, 1, 1)。

## GetTargetLocalScale

```csharp
public static Vector3 GetTargetLocalScale(this GameObject obj, GameObject other)
```

把对方的世界缩放按轴除以该 GameObject 的世界缩放，也就是对方在每个轴上大多少倍。两者缩放相同的轴结果为 1。对方的 Transform 未做 null 检查即被读取。

## TryGetComponentAtIndex

```csharp
public static bool TryGetComponentAtIndex(this GameObject obj, int index, out Component component)
```

读取 GameObject 组件列表中指定索引处的组件。负数或超出末尾的索引返回 `false`，并把 `component` 设为 `null`。

## GetComponentAtIndexOrDefault

```csharp
public static Component GetComponentAtIndexOrDefault(this GameObject obj, int index)
```

该索引处的组件，索引超出范围时为 `null`。

## GetComponents

```csharp
public static Component[] GetComponents(this GameObject obj)
```

GameObject 的所有组件，按组件顺序排列。结果不按类型过滤，因此可能包含多个相同类型的组件。

## ComponentsForeach

```csharp
public static void ComponentsForeach(this GameObject obj, Action<int, Component> componentAction)
```

对 GameObject 的每个组件，以索引和组件为参数调用 `componentAction`。组件数量在循环前只读取一次，因此在回调内添加或销毁的组件只影响剩余的索引。定义 `COMPILER_UDONSHARP` 时不会编译。

## ComponentsSelect

```csharp
public static T[] ComponentsSelect<T>(this GameObject obj, Func<int, Component, T> selector)
```

把 GameObject 的每个组件传给 `selector`，并保持组件顺序。数组长度是循环前读取的组件数量。定义 `COMPILER_UDONSHARP` 时不会编译。

## IsSceneObject

```csharp
public static bool IsSceneObject(this GameObject obj)
```

当 GameObject 属于已加载的场景且编辑器不在预制体隔离模式时为 true，也就是 `obj.scene.IsValid() && !Utils.IsInPrefab`。预制体检查读取的是编辑器的全局状态，而不是这个对象。定义 `COMPILER_UDONSHARP` 时，该方法切换为另一个主体，始终返回 `false`。

## IsPlayerCloseRange

```csharp
public static bool IsPlayerCloseRange(this GameObject obj, float distance)
```

仅限 VRChat。在三个轴上把本地玩家的世界位置与该 GameObject 的轴心比较，并与 `distance` 做严格比较。没有有效的本地玩家时返回 `false`。它只在定义 `UTILS_UDONSHARP` 时存在，该文件从 `UTILS_VRC_SDK3_BASE` 或 `COMPILER_UDONSHARP` 推导出这个定义。

## IsPlayerCloseRange2D

```csharp
public static bool IsPlayerCloseRange2D(this GameObject obj, float distance)
```

仅限 VRChat。在 XZ 平面上做与 [`IsPlayerCloseRange`](#isplayercloserange) 相同的判断，因此高度差被忽略。它只在定义 `UTILS_UDONSHARP` 时存在。
