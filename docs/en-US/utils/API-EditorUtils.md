# EditorUtils

`io.github.ykysnk.utils.Editor` · `public static class EditorUtils`

Message dialog helpers that wrap `CustomDialogWindow`.

Both families pass their arguments straight through to the window, so they differ only in how the answer comes back: a task or two callbacks. Closing the window without pressing a button counts as cancel, and a `title` is also used for the title bar icon.

## DisplayDialog

```csharp
public static void DisplayDialog(string title, string message, string ok = "OK", string cancel = "",
    Action? onOk = null, Action? onCancel = null, int waitTime = 0)
public static void DisplayDialog(string title, DialogContent content, string ok = "OK", string cancel = "",
    Action? onOk = null, Action? onCancel = null, int waitTime = 0)
```

Shows the dialog and reports the answer through callbacks instead of a task. The `message` overload wraps the text in a [`MessageDialogContent`](./API-DialogContent.md), the `content` overload shows a body of your own. An empty `cancel` hides the Cancel button, `waitTime` is the number of seconds the Ok button stays disabled, and a `null` callback is ignored.

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

Shows the dialog and returns a task that resolves to `true` when Ok is pressed and `false` when Cancel is pressed or the window is closed without a choice.

```csharp
var confirmed = await EditorUtils.DisplayDialogAsync("Delete", "Remove the folder?", "Delete", "Cancel");
```
