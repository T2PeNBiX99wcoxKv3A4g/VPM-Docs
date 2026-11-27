# BasicLocalizationEditor

`io.github.ykysnk.Localization.Editor` · `[CustomEditor(typeof(BasicLocalization))] [CanEditMultipleObjects] public class BasicLocalizationEditor : BasicEditor`

`BasicLocalization` 资源的检视器：资源设置、格式转换工具以及翻译条目列表。它是 UI Toolkit 检视器，继承 [`BasicEditor`](../utils/API-BasicEditor.md)，因此构建树时抛出的异常会被该类替换为错误 UI。

树是编辑器 `uxml` 字段（一个 `[SerializeField]`）所持有的 UXML 资源。它先用 `UILocalize(false)` 本地化——该参数使语言选择器不会被附加到末尾，因此由检视器自己放进设置卡片的 `languageSlot` 元素——然后绑定到序列化对象。`jsonFile` 只接受 `TextAsset`，`poFile` 只接受 `LocalizationAsset`，分别对应两种旁挂文件格式。

`translates` 列表由资源填充，每一行用 [`BasicTranslateDrawer`](./API-BasicTranslateDrawer.md) 构建。搜索框在最后一次按键 150 ms 后按键、译文和工具提示过滤；过滤生效时拖动重新排序会关闭，因为可见顺序不再对应数组索引。选中后右键可复制、粘贴和删除，粘贴仅在 [`TranslateClipboard`](./API-TranslateClipboard.md) 中有条目时可用。添加按钮在末尾追加一个空条目，清除过滤以便新行可见并滚动到它；删除按钮仅在选中内容时可用，计数标签显示总数，过滤生效时显示 `visible/total`。

格式转换折叠面板的开关状态保存在 `EditorPrefs` 的 `io.github.ykysnk.Localization.BasicLocalizationEditor.convert` 下。导出 JSON 与导出 PO 写出与资源同名的旁挂文件、把它赋给对应字段并记录路径；导入读取已分配的文件并按键合并，未分配文件时改用资源旁边的路径。`…` 按钮会先把选中的文件复制到资源旁边，因为引用只能指向项目内部。

## CreateErrorHandleInspectorGUI

```csharp
protected override VisualElement? CreateErrorHandleInspectorGUI()
```

构建整个检视器并返回它。上文描述的一切都在这里接线：克隆的树、本地化调用、绑定、语言选择器、两种文件类型、列表回调和每一个按钮。列表高度在树挂到面板后调整：由外层 `ScrollView` 的视口与树的位置算出树下方剩余的空间，列表按该差值增高，且不低于 140 像素，因此自定义 GUI 会填满窗口，而不是让下方留空。
