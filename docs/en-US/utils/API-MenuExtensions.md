# MenuExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class MenuExtensions`

Keeps menu items that were added at runtime registered while the editor rebuilds its menus.

lilEditorToolbox's `MenuItemModifier` only picks up methods carrying a `MenuItem` attribute when it rebuilds every menu, so items added through `AddMenuItem` would disappear. The class is marked `[InitializeOnLoad]` and hooks `EditorApplication.hierarchyChanged`; on every change each tracked item that is no longer registered is added again through [`MenuWrap`](./API-MenuWrap.md), then [`EditorUtilityWrap`](./API-EditorUtilityWrap.md) rebuilds the menus. Items registered by that modifier are not touched.

## AddMenuItem

```csharp
public static bool AddMenuItem(MenuItemObject menuItemObject)
```

Keeps a menu item registered across menu rebuilds. The item's `Name` is both the menu path and the key. Returns `false` when a menu item with the same path is already tracked.

```csharp
MenuExtensions.AddMenuItem(new MenuItemObject("Tools/My Tool/Do Something", "#%g", 1000, DoSomething));
```

## RemoveMenuItem

```csharp
public static MenuItemObject? RemoveMenuItem(string name)
```

Stops keeping the menu item with the given path registered and returns it, or `null` when no item is tracked under that path. The menu entry itself is not removed; this only prevents it from being added again after a rebuild.
