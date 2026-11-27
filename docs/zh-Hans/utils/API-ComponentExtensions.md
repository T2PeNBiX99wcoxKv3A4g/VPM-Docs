# ComponentExtensions

`io.github.ykysnk.utils.Extensions` · `public static class ComponentExtensions`

GameObject 与 Transform 辅助方法的组件版本。每个成员都转发给组件所属的 GameObject，因此组件类型无关紧要，结果与在 `component.gameObject` 上调用同名的 [`GameObjectExtensions`](./API-GameObjectExtensions.md) 成员相同。

## FullName

```csharp
public static string FullName(this Component component)
```

组件所属 GameObject 的完整层级路径，例如 `Root/Child/Name`，不带前导斜杠。

```csharp
var path = someComponent.FullName();
```

## TryGetComponentAtIndex

```csharp
public static bool TryGetComponentAtIndex(this Component component, int index, out Component component2)
```

读取所属 GameObject 组件列表中指定索引处的组件，顺序与 [`GetComponents`](#getcomponents) 返回的相同。负数或超出末尾的索引返回 `false`，并把 `component2` 设为 `null`。

## GetComponentAtIndexOrDefault

```csharp
public static Component GetComponentAtIndexOrDefault(this Component component, int index)
```

所属 GameObject 中该索引处的组件，索引超出范围时为 `null`。

## GetComponents

```csharp
public static Component[] GetComponents(this Component component)
```

所属 GameObject 的所有组件，按 GameObject 的组件顺序排列。结果不按类型过滤，因此可能包含多个相同类型的组件。

## ComponentsForeach

```csharp
public static void ComponentsForeach(this Component component, Action<int, Component> componentAction)
```

对所属 GameObject 的每个组件，以索引和组件为参数调用 `componentAction`。组件数量在循环前只读取一次，因此在回调内添加或销毁的组件只影响剩余的索引。定义 `COMPILER_UDONSHARP` 时不会编译。

## ComponentsSelect

```csharp
public static T[] ComponentsSelect<T>(this Component component, Func<int, Component, T> selector)
```

把所属 GameObject 的每个组件传给 `selector`，并保持组件顺序。数组长度是循环前读取的组件数量，因此在选择器中添加或销毁的组件只影响剩余的索引。定义 `COMPILER_UDONSHARP` 时不会编译。
