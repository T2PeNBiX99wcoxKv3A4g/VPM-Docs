# BasicTranslateDrawer

`io.github.ykysnk.Localization.Editor` · `[CustomPropertyDrawer(typeof(BasicTranslate))] public class BasicTranslateDrawer : PropertyDrawer`

绘制单条 `BasicTranslate` 条目的 UI Toolkit 绘制器：键、译文、工具提示开关及其两个字段，以及复制/粘贴按钮。检视器的翻译列表用这个绘制器构建每一行。

布局是 GUID 为 `666a4a69b697dcd45bfe25da3d5636a6` 的 UXML 资源，只查找一次并缓存。它先用 `UILocalize(false)` 本地化，再用 `BindProperty` 绑定到该字段。`useTooltip` 关闭时两个工具提示字段保持隐藏；由于绑定在 `CreatePropertyGUI` 返回之后才写入初始值，可见状态会由调度器再应用一次。工具提示开关的输入元素被移到标签之前，使该行读作复选框加标签。复制把整个条目以 JSON 写入 `EditorGUIUtility.systemCopyBuffer`，粘贴通过 [`TranslateClipboard`](./API-TranslateClipboard.md) 读回，仅在剪贴板存放条目时可用，并在行构建时和指针进入该行时各检查一次。

## CreatePropertyGUI

```csharp
public override VisualElement CreatePropertyGUI(SerializedProperty property)
```

构建单条翻译条目的 UI。无法加载 UXML 资源时，它返回 `BasicEditor.CreateUxmlImportErrorUI()` 而不是一行，该错误框会要求重新导入包；否则返回克隆的树，其中字段绑定到 `property`、工具提示可见状态已应用、两个按钮已接线。粘贴失败时通过 `Utils.LogWarning` 记录警告。
