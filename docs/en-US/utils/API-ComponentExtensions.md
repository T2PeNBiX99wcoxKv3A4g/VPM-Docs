# ComponentExtensions

`io.github.ykysnk.utils.Extensions` · `public static class ComponentExtensions`

Component versions of the GameObject and Transform helpers. Every member forwards to the GameObject that owns the component, so the component type is irrelevant and the result is the same as calling the matching [`GameObjectExtensions`](./API-GameObjectExtensions.md) member on `component.gameObject`.

## FullName

```csharp
public static string FullName(this Component component)
```

Full hierarchy path of the GameObject that owns the component, for example `Root/Child/Name`, without a leading slash.

```csharp
var path = someComponent.FullName();
```

## TryGetComponentAtIndex

```csharp
public static bool TryGetComponentAtIndex(this Component component, int index, out Component component2)
```

Reads the component stored at the given index of the owning GameObject's component list, in the same order that [`GetComponents`](#getcomponents) returns. A negative index or one past the end returns `false` and sets `component2` to `null`.

## GetComponentAtIndexOrDefault

```csharp
public static Component GetComponentAtIndexOrDefault(this Component component, int index)
```

The component at that index of the owning GameObject, or `null` when the index is out of range.

## GetComponents

```csharp
public static Component[] GetComponents(this Component component)
```

Every component of the owning GameObject, in the GameObject's component order. The result is not filtered by type, so it can hold several components of the same type.

## ComponentsForeach

```csharp
public static void ComponentsForeach(this Component component, Action<int, Component> componentAction)
```

Calls `componentAction` with the index and component for every component of the owning GameObject. The component count is read once before the loop, so components added or destroyed inside the callback only affect the remaining indices. Not compiled when `COMPILER_UDONSHARP` is defined.

## ComponentsSelect

```csharp
public static T[] ComponentsSelect<T>(this Component component, Func<int, Component, T> selector)
```

Projects every component of the owning GameObject through `selector`, keeping component order. The array length is the component count read before the loop, so a component added or destroyed inside the selector only affects the remaining indices. Not compiled when `COMPILER_UDONSHARP` is defined.
