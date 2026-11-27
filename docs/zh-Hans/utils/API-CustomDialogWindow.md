# CustomDialogWindow

`io.github.ykysnk.utils.Editor` · `public class CustomDialogWindow : EditorWindow`

带自定义主体、Ok 按钮和可选 Cancel 按钮的浮动工具窗口，由 [`EditorUtils`](./API-EditorUtils.md) 使用。它不是模态的：窗口通过回调报告结果并自行关闭，文本可以从上下文菜单复制。

窗口大小取自主体的 [`Size`](./API-DialogContent.md)，居中显示在主编辑器窗口上，并用 `ShowUtility` 打开。已有对话框打开时再打开新的，会先关闭旧的，其挂起的结果按取消报告；未按按钮就关闭窗口同样算作取消。设置 `waitTime` 后，Ok 的标题每秒倒计时，按钮在倒计时归零前保持禁用，因此较长的消息无法被未读就关闭。`CopyText` 不为空的主体会在上下文菜单中多出 `Copy` 项。

该类声明的所有成员都是 private 或 internal，因此对话框通过 `EditorUtils.DisplayDialog` 或 `EditorUtils.DisplayDialogAsync` 创建，参数会被原样传入。
