# EditorUtils

`io.github.ykysnk.utils.Editor` · `public static class EditorUtils`

`CustomDialogWindow` を包むメッセージダイアログのヘルパーです。

どちらの系統も引数をそのままウィンドウに渡すため、違いは答えの受け取り方だけです。タスクか、2 つのコールバックかです。ボタンを押さずにウィンドウを閉じた場合はキャンセルとして扱われ、`title` はタイトルバーのアイコンにも使われます。

## DisplayDialog

```csharp
public static void DisplayDialog(string title, string message, string ok = "OK", string cancel = "",
    Action? onOk = null, Action? onCancel = null, int waitTime = 0)
public static void DisplayDialog(string title, DialogContent content, string ok = "OK", string cancel = "",
    Action? onOk = null, Action? onCancel = null, int waitTime = 0)
```

ダイアログを表示し、タスクではなくコールバックで答えを通知します。`message` のオーバーロードはテキストを [`MessageDialogContent`](./API-DialogContent.md) で包み、`content` のオーバーロードは独自の本体を表示します。`cancel` を空にすると Cancel ボタンが非表示になり、`waitTime` は Ok ボタンが無効のままになる秒数です。`null` のコールバックは無視されます。

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

ダイアログを表示し、Ok が押されたときは `true`、Cancel が押されたとき、または選択なしでウィンドウが閉じられたときは `false` に解決されるタスクを返します。

```csharp
var confirmed = await EditorUtils.DisplayDialogAsync("Delete", "Remove the folder?", "Delete", "Cancel");
```
