# MenuWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuWrap`

Reflection wrapper over the internal parts of `UnityEditor.Menu`, the class behind the editor menu bar.

The wrapped members are undocumented Unity editor internals and not public API, so Unity can rename or remove them in any version. This wrapper is what lets menu items be added, changed and removed at runtime; if a member disappears, the call throws `MissingMethodException` instead of failing silently.

## SetHotkey

```csharp
public static void SetHotkey(string menuPath, string hotkey)
```

Assigns the shortcut shown next to an existing menu item. `menuPath` is the full path of the item, e.g. `Tools/My Tool/Item`, and `hotkey` is a string such as `#%g`.

## ExtractSubmenus

```csharp
public static string[] ExtractSubmenus(string menuPath)
```

Lists the sub menus that exist below the given path, e.g. `Tools`; empty when it has none.

## AddMenuItem

```csharp
public static void AddMenuItem(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
```

Registers a menu item at runtime, without a `MenuItem` attribute. `shortcut` may be an empty string, `priority` decides the order within the parent menu (lower first), and `validate` decides whether the item is enabled, with `null` meaning always enabled.

## AddSeparator

```csharp
public static void AddSeparator(string name, int priority)
```

Adds a separator entry at the given path and priority.

## RemoveMenuItem

```csharp
public static void RemoveMenuItem(string name)
```

Removes the menu item registered under the given path. Use [`MenuItemExists`](#menuitemexists) when the path may not exist.

## RebuildAllMenus

```csharp
public static void RebuildAllMenus()
```

Rebuilds the whole menu bar from the registered items.

## MenuItemExists

```csharp
public static bool MenuItemExists(string menuPath)
```

Whether a menu item is currently registered under the given path.
