# 菜单与扩展

## MenuItemObject

`io.github.ykysnk.utils.Editor` · `public class MenuItemObject`

由 `MenuExtensions` 保持注册的菜单项描述：路径、快捷键、勾选状态、排序优先级以及 Unity 所需的回调。

### MenuItemObject(string name, string shortcut, bool @checked, int priority, Action execute, Func&lt;bool&gt;? validate)

```csharp
public MenuItemObject(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
```

创建菜单项的完整描述。`name` 是菜单路径，按 Unity 清理特性声明路径的同样方式清理，因此两类菜单项最终会落在同一
路径下。`validate` 决定该项是否可用；null 表示始终可用。

### MenuItemObject(string name, string shortcut, int priority, Action execute)

```csharp
public MenuItemObject(string name, string shortcut, int priority, Action execute)
```

创建一个未勾选、且没有校验回调的菜单项。

### MenuItemObject(string name, int priority, Action execute)

```csharp
public MenuItemObject(string name, int priority, Action execute)
```

创建一个未勾选、没有快捷键和校验回调的菜单项。

### MenuItemObject(string name, Action execute)

```csharp
public MenuItemObject(string name, Action execute)
```

创建使用该类默认优先级的菜单项：`GameObject/Create Other` 下为 10，其他位置为 1000，与 Unity 自身的排序一致。

### Name

```csharp
public string Name { get; private set; }
```

清理后的菜单路径；这是跟踪该项所用的键。

### Shortcut

```csharp
public string Shortcut { get; private set; }
```

传给 Unity 的快捷键字符串，例如 `#%g`；没有快捷键时为空。

### Checked

```csharp
public bool Checked { get; private set; }
```

Unity 是否以勾选标记绘制该项。

### Priority

```csharp
public int Priority { get; private set; }
```

子菜单内的排序顺序；较小的值先绘制。

### Execute

```csharp
public Action Execute { get; private set; }
```

选择该项时运行的动作。

### Validate

```csharp
public Func<bool>? Validate { get; private set; }
```

决定该项是否可用的谓词；始终可用时为 null。

## MenuWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuWrap`

对编辑器菜单栏背后的 `UnityEditor.Menu` 内部部分的反射包装。这些成员是未文档化的编辑器内部实现，并非公开
API，因此 Unity 可能在任意版本中重命名或移除它们；正是这个包装让菜单项能够在运行时被添加、更改和移除。

### SetHotkey(string menuPath, string hotkey)

```csharp
public static void SetHotkey(string menuPath, string hotkey)
```

设置显示在现有菜单项旁的快捷键。

### ExtractSubmenus(string menuPath)

```csharp
public static string[] ExtractSubmenus(string menuPath)
```

列出给定路径下存在的子菜单；没有子菜单时为空。

### AddMenuItem(string name, string shortcut, bool @checked, int priority, Action execute, Func&lt;bool&gt;? validate)

```csharp
public static void AddMenuItem(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
```

在运行时注册菜单项，无需 `MenuItem` 特性。

### AddSeparator(string name, int priority)

```csharp
public static void AddSeparator(string name, int priority)
```

在给定的路径和优先级添加一条分隔条目。

### RemoveMenuItem(string name)

```csharp
public static void RemoveMenuItem(string name)
```

移除在给定路径下注册的菜单项。

### RebuildAllMenus()

```csharp
public static void RebuildAllMenus()
```

由已注册的菜单项重建整个菜单栏。

### MenuItemExists(string menuPath)

```csharp
public static bool MenuItemExists(string menuPath)
```

当前是否在给定路径下注册了菜单项。

## MenuServiceWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuServiceWrap`

对内部 `UnityEditor.MenuService` 类的反射包装。这些成员不是公开 API，因此 Unity 可能在任意版本中重命名或移除
它们。

### SanitizeMenuItemName(string menuName)

```csharp
public static string SanitizeMenuItemName(string menuName)
```

执行 Unity 自己的菜单路径清理，因此在运行时添加的路径会按 Unity 从 `MenuItem` 特性注册时的完全相同方式注册。
返回 Unity 注册该项所用的路径。

### ValidateMethodForMenuCommand(MethodInfo methodInfo)

```csharp
public static bool ValidateMethodForMenuCommand(MethodInfo methodInfo)
```

使用 Unity 对 `MenuItem` 方法所采用的同一套规则，询问 Unity 某个方法能否用作菜单命令。

## EditorUtilityWrap

`io.github.ykysnk.utils.Editor` · `public static class EditorUtilityWrap`

对 `EditorUtility` 内部部分的反射包装。该成员不是公开 API，因此 Unity 可能在任意版本中重命名或移除它。

### Internal_UpdateAllMenus

```csharp
public static readonly WrapAction Internal_UpdateAllMenus;
```

内部的 `EditorUtility.Internal_UpdateAllMenus` 方法，它让 Unity 重建其菜单。在运行时添加菜单项之后需要它。

## MenuExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class MenuExtensions`

在编辑器重建菜单期间，保持运行时添加的菜单项仍然注册。当层级结构变化时，已不再存在的项会通过 `MenuWrap` 重新
添加，随后运行 `EditorUtilityWrap.Internal_UpdateAllMenus`。

### AddMenuItem(MenuItemObject menuItemObject)

```csharp
public static bool AddMenuItem(MenuItemObject menuItemObject)
```

让菜单项在菜单重建之间保持注册。当相同路径的菜单项已注册时返回 false。

```csharp
MenuExtensions.AddMenuItem(new MenuItemObject("Tools/My Tool/Do Something", "#%g", 1000, DoSomething));
```

### RemoveMenuItem(string name)

```csharp
public static MenuItemObject? RemoveMenuItem(string name)
```

不再让给定路径的菜单项保持注册，并返回该项。菜单条目本身不会被移除；这只会阻止它在重建后再次被添加。

## RequestExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class RequestExtensions`

把包管理器请求转换为在编辑器循环中完成的任务，因此等待的代码可以留在主线程上。

### AsTask&lt;T&gt;(this T request)

```csharp
public static Task<T> AsTask<T>(this T request) where T : Request
```

等待一个包管理器请求。请求通过 `EditorApplication.update` 轮询，任务随后在 `EditorApplication.delayCall` 中
完成，因此等待的延续会在主线程上以较浅的调用栈恢复。具体请求类型会被保留，因此调用方可以读取其 `Result`。

### AsTask&lt;T&gt;(this T request, CancellationToken token)

```csharp
public static Task<T> AsTask<T>(this T request, CancellationToken token) where T : Request
```

与无参数重载相同，但在标记被取消时停止等待。请求本身不会被取消，只是不再被观察。

## TaskExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class TaskExtensions`

通过 `EditorApplication.update` 轮询任务，并通过回调报告结果，供无法使用 await 的调用方（例如检视器和菜单
代码）使用。

### WaitEditor(this Task task, Action onCompleted, Action&lt;Exception&gt;? onError = null)

```csharp
public static void WaitEditor(this Task task, Action onCompleted, Action<Exception>? onError = null)
```

任务完成后在编辑器循环中调用 `onCompleted`。出错的任务会把实际抛出的异常（聚合包装会被解包）传给 `onError`，
被取消的任务则传入 `TaskCanceledException`。`onError` 为 null 时失败会被静默处理。

### WaitEditor&lt;T&gt;(this Task&lt;T&gt; task, Action&lt;T&gt; onCompleted, Action&lt;Exception&gt;? onError = null)

```csharp
public static void WaitEditor<T>(this Task<T> task, Action<T> onCompleted, Action<Exception>? onError = null)
```

与非泛型重载相同，但会把任务的结果传给 `onCompleted`。
