# TaskExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class TaskExtensions`

從 `EditorApplication.update` 輪詢工作並透過回呼回報結果，供無法使用 await 的呼叫端（例如檢視器與選單程式碼）使用。

兩個多載在工作完成後都會立刻從 `EditorApplication.update` 摘除自己，因此每次呼叫只觀察一個工作。失敗的工作回報它實際擲回的例外，而不是 `Task.Exception` 曝露的 `AggregateException` 包裝；`onError` 為 null 時失敗會被靜默忽略。

## WaitEditor

```csharp
public static void WaitEditor(this Task task, Action onCompleted, Action<Exception>? onError = null)
public static void WaitEditor<T>(this Task<T> task, Action<T> onCompleted, Action<Exception>? onError = null)
```

工作完成後在編輯器迴圈呼叫 `onCompleted`。失敗的工作以內部例外呼叫 `onError`，取消的工作則以 `TaskCanceledException` 呼叫。泛型多載會把工作的結果傳給 `onCompleted`。

```csharp
UpmInstaller.UpdateAsync().WaitEditor(packages => Repaint(), Debug.LogException);
```
