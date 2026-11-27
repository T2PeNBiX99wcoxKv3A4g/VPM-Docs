# TaskExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class TaskExtensions`

通过 `EditorApplication.update` 轮询任务，并通过回调报告结果，供无法使用 await 的调用方（例如检视器和菜单代码）使用。

两个重载在任务完成后都会立即从 `EditorApplication.update` 摘下自己，因此每次调用只观察一个任务。出错的任务报告它实际抛出的异常，而不是 `Task.Exception` 暴露的 `AggregateException` 包装；`onError` 为 null 时失败会被静默处理。

## WaitEditor

```csharp
public static void WaitEditor(this Task task, Action onCompleted, Action<Exception>? onError = null)
public static void WaitEditor<T>(this Task<T> task, Action<T> onCompleted, Action<Exception>? onError = null)
```

任务完成后在编辑器循环中调用 `onCompleted`。出错的任务把内部异常传给 `onError`，被取消的任务则传入 `TaskCanceledException`。泛型重载会把任务的结果传给 `onCompleted`。

```csharp
UpmInstaller.UpdateAsync().WaitEditor(packages => Repaint(), Debug.LogException);
```
