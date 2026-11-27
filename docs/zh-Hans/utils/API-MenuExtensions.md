# MenuExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class MenuExtensions`

在编辑器重建菜单期间，保持在运行时添加的菜单项仍然注册。

lilEditorToolbox 的 `MenuItemModifier` 在重建所有菜单时只会挑选带有 `MenuItem` 特性的方法，因此通过 `AddMenuItem` 添加的项会消失。此类标记了 `[InitializeOnLoad]` 并挂上 `EditorApplication.hierarchyChanged`；每次变化时，每个已不再注册的跟踪项会通过 [`MenuWrap`](./API-MenuWrap.md) 重新添加，随后由 [`EditorUtilityWrap`](./API-EditorUtilityWrap.md) 重建菜单。由该修改器注册的项不会被改动。

## AddMenuItem

```csharp
public static bool AddMenuItem(MenuItemObject menuItemObject)
```

让菜单项在菜单重建之间保持注册。该项的 `Name` 同时是菜单路径和键。当相同路径的菜单项已在跟踪时返回 `false`。

```csharp
MenuExtensions.AddMenuItem(new MenuItemObject("Tools/My Tool/Do Something", "#%g", 1000, DoSomething));
```

## RemoveMenuItem

```csharp
public static MenuItemObject? RemoveMenuItem(string name)
```

不再让给定路径的菜单项保持注册并返回该项；该路径没有跟踪任何项时返回 `null`。菜单条目本身不会被移除；这只会阻止它在重建后再次被添加。
