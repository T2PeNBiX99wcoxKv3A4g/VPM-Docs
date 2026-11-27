# MenuItemObject

`io.github.ykysnk.utils.Editor` · `public class MenuItemObject`

由 [`MenuExtensions`](./API-MenuExtensions.md) 保持注册的菜单项描述：菜单路径、快捷键、勾选状态、排序优先级，以及 Unity 所需的回调。

每个构造函数都会用 [`MenuServiceWrap`](./API-MenuServiceWrap.md) 清理名称，因此在运行时添加的项，会与用 `MenuItem` 特性声明的项注册在同一路径下。`Name` 保存清理后的路径，也是跟踪该项所用的键。

## Constructors

```csharp
public MenuItemObject(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
public MenuItemObject(string name, string shortcut, int priority, Action execute)
public MenuItemObject(string name, int priority, Action execute)
public MenuItemObject(string name, Action execute)
```

第一个形式接受所有字段：`shortcut` 可以是空字符串，`validate` 决定该项是否可用，`null` 表示始终可用。较短的形式会填入默认值：不勾选、没有快捷键（`""`）、没有校验回调，且都会转发到完整形式。

最后一个形式没有 `priority` 参数，会按项的种类选择默认值：路径以 `GameObject/Create Other` 开头时为 10，其他路径为 1000，与 Unity 自身的排序一致。

```csharp
MenuExtensions.AddMenuItem(new MenuItemObject("Tools/My Tool/Do Something", "#%g", 1000, DoSomething));
```

## Name

```csharp
public string Name { get; private set; }
```

清理后的菜单路径；这是跟踪该项所用的键，因此可能与传入构造函数的字符串不同。

## Shortcut

```csharp
public string Shortcut { get; private set; }
```

传给 Unity 的快捷键字符串，例如 `#%g`；没有快捷键时为空。

## Checked

```csharp
public bool Checked { get; private set; }
```

Unity 是否以勾选标记绘制该项。

## Priority

```csharp
public int Priority { get; private set; }
```

子菜单内的排序顺序；较小的值先绘制。

## Execute

```csharp
public Action Execute { get; private set; }
```

选择该项时运行的动作。

## Validate

```csharp
public Func<bool>? Validate { get; private set; }
```

决定该项是否可用的谓词；始终可用时为 `null`。
