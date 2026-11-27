# EditorUtils

`io.github.ykysnk.utils.Editor` · `public static class EditorUtils`

包装 `CustomDialogWindow` 的消息对话框辅助方法。

两个系列都把参数原样传给窗口，区别只在于答案的返回方式：任务或两个回调。未按按钮就关闭窗口视为取消，`title` 同时用于标题栏图标。

## DisplayDialog

```csharp
public static void DisplayDialog(string title, string message, string ok = "OK", string cancel = "",
    Action? onOk = null, Action? onCancel = null, int waitTime = 0)
public static void DisplayDialog(string title, DialogContent content, string ok = "OK", string cancel = "",
    Action? onOk = null, Action? onCancel = null, int waitTime = 0)
```

显示对话框，用回调而不是任务报告答案。`message` 重载把文本包进 [`MessageDialogContent`](./API-DialogContent.md)，`content` 重载显示自定义主体。`cancel` 为空会隐藏 Cancel 按钮，`waitTime` 是 Ok 按钮保持禁用的秒数，`null` 回调会被忽略。

```csharp
EditorUtils.DisplayDialog("Delete", "Remove the folder?", "Delete", "Cancel",
    () => DeleteFolder(), () => Utils.Log("Delete", "Cancelled"));
```

## DisplayDialogAsync

```csharp
public static Task<bool> DisplayDialogAsync(string title, string message,
    string ok = "OK", string cancel = "", int waitTime = 0)
public static async Task<bool> DisplayDialogAsync(string title, DialogContent content,
    string ok = "OK", string cancel = "", int waitTime = 0)
```

显示对话框并返回任务：按下 Ok 时解析为 `true`，按下 Cancel 或未做选择就关闭窗口时解析为 `false`。

```csharp
var confirmed = await EditorUtils.DisplayDialogAsync("Delete", "Remove the folder?", "Delete", "Cancel");
```
