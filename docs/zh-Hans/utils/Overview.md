# 概览

其他包所依赖的共享库：一些小型的编辑器与运行时辅助工具，否则它们会被复制进每个项目。它本身不提供任何 UI。

## 包中包含什么

| 领域       | 内容                                                                                          |
|------------|-----------------------------------------------------------------------------------------------|
| Runtime    | `Utils` 的日志与断言、`IsInPrefab` / `IsPlaying`、`ToLayer`、`BasicEditorComponent`           |
| 检视器基类 | `BasicEditor`，在 try/catch 中运行自定义检视器，并显示统一的错误 UI                           |
| GUI 辅助   | `EditorGUILayoutUtility`、`EditorGUIUtils`、`EditorUtils`、`CustomDialogWindow`、`EditorTask` |
| 绘制器     | `BooleanVector3Drawer`、`ColorHexDrawer`                                                      |
| 菜单       | `MenuItemObject`、`MenuWrap`、`MenuServiceWrap`，用于以统一方式构建菜单路径                   |
| 包处理     | `UpmInstaller`，YKY Toolkit 安装窗口使用的 UPM 客户端                                         |

## 何时使用

当某个包需要检视器基类、GUI 辅助工具或 UPM 客户端时，可以把它添加为依赖。它是 [本地化](../localization/Overview.md)
和 [YKYToolKit](../yky-toolkit/Overview.md) 的 VPM 依赖，因此安装其中任意一个都会自动引入它。
