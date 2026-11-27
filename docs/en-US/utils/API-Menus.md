# Menus and extensions

## MenuItemObject

`io.github.ykysnk.utils.Editor` · `public class MenuItemObject`

Description of a menu item kept registered by `MenuExtensions`: path, shortcut, checked state, sort priority and the
callbacks Unity needs.

### MenuItemObject(string name, string shortcut, bool @checked, int priority, Action execute, Func&lt;bool&gt;? validate)

```csharp
public MenuItemObject(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
```

Creates a full description of a menu item. `name` is the menu path, sanitized the same way Unity sanitizes attribute
declared paths, so both kinds of item end up under the same path. `validate` decides whether the item is enabled; null
means always enabled.

### MenuItemObject(string name, string shortcut, int priority, Action execute)

```csharp
public MenuItemObject(string name, string shortcut, int priority, Action execute)
```

Creates an unchecked menu item without a validation callback.

### MenuItemObject(string name, int priority, Action execute)

```csharp
public MenuItemObject(string name, int priority, Action execute)
```

Creates an unchecked menu item without a shortcut or validation callback.

### MenuItemObject(string name, Action execute)

```csharp
public MenuItemObject(string name, Action execute)
```

Creates a menu item with the default priority for its kind: 10 under `GameObject/Create Other`, 1000 everywhere else,
matching Unity's own ordering.

### Name

```csharp
public string Name { get; private set; }
```

Menu path after sanitizing; this is the key the item is tracked under.

### Shortcut

```csharp
public string Shortcut { get; private set; }
```

Shortcut string passed to Unity, such as `#%g`; empty when the item has none.

### Checked

```csharp
public bool Checked { get; private set; }
```

Whether Unity draws the item with a checkmark.

### Priority

```csharp
public int Priority { get; private set; }
```

Sort order within the submenu; lower values are drawn first.

### Execute

```csharp
public Action Execute { get; private set; }
```

Action run when the item is chosen.

### Validate

```csharp
public Func<bool>? Validate { get; private set; }
```

Predicate deciding whether the item is enabled, or null when it is always enabled.

## MenuWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuWrap`

Reflection wrapper over the internal parts of `UnityEditor.Menu`, the class behind the editor menu bar. Those members
are undocumented editor internals and not public API, so Unity can rename or remove them in any version; this wrapper is
what lets menu items be added, changed and removed at runtime.

### SetHotkey(string menuPath, string hotkey)

```csharp
public static void SetHotkey(string menuPath, string hotkey)
```

Assigns the shortcut shown next to an existing menu item.

### ExtractSubmenus(string menuPath)

```csharp
public static string[] ExtractSubmenus(string menuPath)
```

Lists the sub menus that exist below the given path; empty when it has none.

### AddMenuItem(string name, string shortcut, bool @checked, int priority, Action execute, Func&lt;bool&gt;? validate)

```csharp
public static void AddMenuItem(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
```

Registers a menu item at runtime, without a `MenuItem` attribute.

### AddSeparator(string name, int priority)

```csharp
public static void AddSeparator(string name, int priority)
```

Adds a separator entry at the given path and priority.

### RemoveMenuItem(string name)

```csharp
public static void RemoveMenuItem(string name)
```

Removes the menu item registered under the given path.

### RebuildAllMenus()

```csharp
public static void RebuildAllMenus()
```

Rebuilds the whole menu bar from the registered items.

### MenuItemExists(string menuPath)

```csharp
public static bool MenuItemExists(string menuPath)
```

Whether a menu item is currently registered under the given path.

## MenuServiceWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuServiceWrap`

Reflection wrapper over the internal `UnityEditor.MenuService` class. Those members are not public API, so Unity can
rename or remove them in any version.

### SanitizeMenuItemName(string menuName)

```csharp
public static string SanitizeMenuItemName(string menuName)
```

Runs Unity's own menu path cleanup, so a path added at runtime is registered exactly as Unity would register it from a
`MenuItem` attribute. Returns the path Unity registers the item under.

### ValidateMethodForMenuCommand(MethodInfo methodInfo)

```csharp
public static bool ValidateMethodForMenuCommand(MethodInfo methodInfo)
```

Asks Unity whether a method is usable as a menu command, using the same rules it applies to `MenuItem` methods.

## EditorUtilityWrap

`io.github.ykysnk.utils.Editor` · `public static class EditorUtilityWrap`

Reflection wrapper over the internal part of `EditorUtility`. That member is not public API, so Unity can rename or
remove it in any version.

### Internal_UpdateAllMenus

```csharp
public static readonly WrapAction Internal_UpdateAllMenus;
```

The internal `EditorUtility.Internal_UpdateAllMenus` method, which makes Unity rebuild its menus. Needed after adding
menu items at runtime.

## MenuExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class MenuExtensions`

Keeps menu items that were added at runtime registered while the editor rebuilds its menus. When the hierarchy changes,
items that are no longer present are re-added through `MenuWrap`, then `EditorUtilityWrap.Internal_UpdateAllMenus` runs.

### AddMenuItem(MenuItemObject menuItemObject)

```csharp
public static bool AddMenuItem(MenuItemObject menuItemObject)
```

Keeps a menu item registered across menu rebuilds. Returns false when a menu item with the same path is already
registered.

```csharp
MenuExtensions.AddMenuItem(new MenuItemObject("Tools/My Tool/Do Something", "#%g", 1000, DoSomething));
```

### RemoveMenuItem(string name)

```csharp
public static MenuItemObject? RemoveMenuItem(string name)
```

Stops keeping the menu item with the given path registered and returns it. The menu entry itself is not removed; this
only prevents it from being added again after a rebuild.

## RequestExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class RequestExtensions`

Turns package manager requests into tasks that complete on the editor loop, so awaiting code can stay on the main
thread.

### AsTask&lt;T&gt;(this T request)

```csharp
public static Task<T> AsTask<T>(this T request) where T : Request
```

Awaits a package manager request. The request is polled from `EditorApplication.update` and the task is completed later
from `EditorApplication.delayCall`, so the awaiting continuation resumes on the main thread with a shallow call stack.
The concrete request type is preserved, so the caller can read its `Result`.

### AsTask&lt;T&gt;(this T request, CancellationToken token)

```csharp
public static Task<T> AsTask<T>(this T request, CancellationToken token) where T : Request
```

Same as the parameterless overload, but stops waiting when the token is cancelled. The request itself is not cancelled,
it just stops being observed.

## TaskExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class TaskExtensions`

Polls a task from `EditorApplication.update` and reports the outcome through callbacks, for callers that cannot await,
such as inspector and menu code.

### WaitEditor(this Task task, Action onCompleted, Action&lt;Exception&gt;? onError = null)

```csharp
public static void WaitEditor(this Task task, Action onCompleted, Action<Exception>? onError = null)
```

Invokes `onCompleted` on the editor loop once the task finishes. A faulted task calls `onError` with the exception it
actually threw (the aggregate wrapper is unwrapped), a canceled one with a `TaskCanceledException`. A null `onError`
makes the failure silent.

### WaitEditor&lt;T&gt;(this Task&lt;T&gt; task, Action&lt;T&gt; onCompleted, Action&lt;Exception&gt;? onError = null)

```csharp
public static void WaitEditor<T>(this Task<T> task, Action<T> onCompleted, Action<Exception>? onError = null)
```

Same as the non-generic overload, but passes the task's result to `onCompleted`.
