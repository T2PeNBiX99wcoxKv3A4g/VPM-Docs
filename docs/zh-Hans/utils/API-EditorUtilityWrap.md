# EditorUtilityWrap

`io.github.ykysnk.utils.Editor` · `public static class EditorUtilityWrap`

对 `EditorUtility` 内部部分的反射包装。

被包装的成员是未文档化的 Unity 编辑器内部实现，并非公开 API，因此 Unity 可能在任意版本中重命名或移除它。它会在静态字段初始化时解析一次，因此成员不存在时会在这里失败，而不是在每次调用时才失败。

## Internal_UpdateAllMenus

```csharp
public static readonly WrapAction Internal_UpdateAllMenus;
```

内部的 `EditorUtility.Internal_UpdateAllMenus` 方法，绑定为无参数的 `WrapAction`，会让 Unity 重建其菜单。[`MenuExtensions`](./API-MenuExtensions.md) 在重新添加它所保持注册的项之后会调用它，而在运行时添加菜单项之后也需要它。

```csharp
EditorUtilityWrap.Internal_UpdateAllMenus();
```
