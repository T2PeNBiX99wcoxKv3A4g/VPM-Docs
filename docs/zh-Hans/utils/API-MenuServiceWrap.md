# MenuServiceWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuServiceWrap`

对内部 `UnityEditor.MenuService` 类的反射包装。

被包装的成员是未文档化的 Unity 编辑器内部实现，并非公开 API，因此 Unity 可能在任意版本中重命名或移除它们；若成员已不存在，调用会抛出 `MissingMethodException`。

## SanitizeMenuItemName

```csharp
public static string SanitizeMenuItemName(string menuName)
```

执行 Unity 自己的菜单路径清理，因此在运行时添加的路径，会按 Unity 从 `MenuItem` 特性注册时的完全相同方式注册。返回 Unity 注册该项所用的路径，也就是 [`MenuItemObject`](./API-MenuItemObject.md) 保存为 `Name` 的路径。

## ValidateMethodForMenuCommand

```csharp
public static bool ValidateMethodForMenuCommand(MethodInfo methodInfo)
```

用 Unity 应用于 `MenuItem` 方法的同一套规则，询问 Unity 某个方法能否用作菜单命令。
