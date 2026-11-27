# EditorUtils

`io.github.ykysnk.utils.Editor` · `public static class EditorUtils`

包裝 `CustomDialogWindow` 的訊息對話框輔助方法。

兩個系列都把參數原樣傳給視窗，差別只在於答案的回傳方式：工作或兩個回呼。未按按鈕就關閉視窗視為取消，`title` 同時用於標題列圖示。

## DisplayDialog

```csharp
public static void DisplayDialog(string title, string message, string ok = "OK", string cancel = "",
    Action? onOk = null, Action? onCancel = null, int waitTime = 0)
public static void DisplayDialog(string title, DialogContent content, string ok = "OK", string cancel = "",
    Action? onOk = null, Action? onCancel = null, int waitTime = 0)
```

顯示對話框，以回呼而不是工作回報答案。`message` 多載把文字包進 [`MessageDialogContent`](./API-DialogContent.md)，`content` 多載顯示自訂主體。`cancel` 為空會隱藏 Cancel 按鈕，`waitTime` 是 Ok 按鈕保持停用的秒數，`null` 回呼會被忽略。

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

顯示對話框並傳回工作：按下 Ok 時解析為 `true`，按下 Cancel 或未做選擇就關閉視窗時解析為 `false`。

```csharp
var confirmed = await EditorUtils.DisplayDialogAsync("Delete", "Remove the folder?", "Delete", "Cancel");
```
