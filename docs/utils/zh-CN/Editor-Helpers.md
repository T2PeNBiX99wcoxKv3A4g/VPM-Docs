# 编辑器辅助工具

## BasicEditor

`BasicEditor` 是本站每个包都在使用的检视器基类。它把 UI Toolkit 或 IMGUI 的主体包在 `try`/`catch` 中，报告异常并绘制统一的错误框，而不是留下一个坏掉的检视器。

```csharp
using io.github.ykysnk.utils.Editor;

[CustomEditor(typeof(MyBehaviour))]
public class MyBehaviourEditor : BasicEditor
{
    protected override VisualElement? CreateErrorHandleInspectorGUI()
    {
        var tree = uxml.CloneTree();
        tree.Bind(serializedObject);
        return tree;
    }
}
```

UI Toolkit 请重写 `CreateErrorHandleInspectorGUI`，IMGUI 请重写 `OnErrorHandleInspectorGUI`。`OnError` 和 `OnChange` 分别是用于记录日志、以及在主体执行成功后应用更改的钩子。

## GUI 辅助工具

| 辅助工具 | 用途 |
| --- | --- |
| `EditorGUILayoutUtility` | 各窗口使用的小型布局辅助（行、分隔线、带标签的字段）。 |
| `EditorGUILayoutUtilityExtensions` | 以扩展方法形式提供的同一组辅助。 |
| `EditorGUIUtils` | 图标、帮助框，以及窗口标题使用的 `IconContent` 辅助。 |
| `EditorUtils` | 各窗口共用的资源与选择辅助。 |
| `CustomDialogWindow` | 小型模态提示框（标题、消息、按钮），无需自定义编辑器。 |
| `EditorTask` | 执行异步编辑器任务，并在一处报告进度与失败。 |

## 绘制器

| 绘制器 | 绘制内容 |
| --- | --- |
| `BooleanVector3Drawer` | 每个轴各带开关的 `Vector3`，用于按轴设置。 |
| `ColorHexDrawer` | 颜色字段，旁边显示其 `#RRGGBB` 值。 |

两者都会自动应用于匹配类型的字段，也可通过包装类型上的 `[CustomPropertyDrawer]` 生效。

## 菜单

`MenuItemObject`、`MenuWrap` 和 `MenuServiceWrap` 用于构建 `Tools/...`、`GameObject/...` 和 `Assets/...` 菜单项，支持校验函数和统一的优先级，从而让包的菜单路径集中在一处。

## UPM 客户端

`UpmInstaller` 是 YKY Toolkit 安装窗口背后的 UPM 封装：

```csharp
UpmInstaller.Install("io.github.ykysnk.localization");
UpmInstaller.Remove("io.github.ykysnk.localization@0.11.0");
UpmInstaller.UpdateAsync().WaitEditor(packages => { /* installed versions */ });
```

它通过 `UnityEditor.PackageManager.Client` 与 Unity 通信，并借助编辑器任务辅助报告进度。
