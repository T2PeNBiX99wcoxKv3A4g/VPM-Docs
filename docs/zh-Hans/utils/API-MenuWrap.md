# MenuWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuWrap`

对编辑器菜单栏背后的 `UnityEditor.Menu` 内部部分的反射包装。

被包装的成员是未文档化的 Unity 编辑器内部实现，并非公开 API，因此 Unity 可能在任意版本中重命名或移除它们。正是这个包装让菜单项能够在运行时被添加、更改和移除；若成员消失，调用会抛出 `MissingMethodException`，而不是静默失败。

## SetHotkey

```csharp
public static void SetHotkey(string menuPath, string hotkey)
```

设置显示在现有菜单项旁的快捷键。`menuPath` 是该项的完整路径，例如 `Tools/My Tool/Item`，`hotkey` 则是 `#%g` 之类的字符串。

## ExtractSubmenus

```csharp
public static string[] ExtractSubmenus(string menuPath)
```

列出给定路径（例如 `Tools`）下存在的子菜单；没有子菜单时为空。

## AddMenuItem

```csharp
public static void AddMenuItem(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
```

在运行时注册菜单项，无需 `MenuItem` 特性。`shortcut` 可以是空字符串，`priority` 决定父菜单内的顺序（较小者在前），`validate` 决定该项是否可用，`null` 表示始终可用。

## AddSeparator

```csharp
public static void AddSeparator(string name, int priority)
```

在给定的路径和优先级添加一条分隔条目。

## RemoveMenuItem

```csharp
public static void RemoveMenuItem(string name)
```

移除在给定路径下注册的菜单项。如果不确定路径是否存在，请先使用 [`MenuItemExists`](#menuitemexists)。

## RebuildAllMenus

```csharp
public static void RebuildAllMenus()
```

由已注册的菜单项重建整个菜单栏。

## MenuItemExists

```csharp
public static bool MenuItemExists(string menuPath)
```

给定路径下当前是否注册了菜单项。
