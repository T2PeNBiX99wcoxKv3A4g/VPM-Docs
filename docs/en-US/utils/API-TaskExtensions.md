# TaskExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class TaskExtensions`

Polls a task from `EditorApplication.update` and reports the outcome through callbacks, for callers that cannot await, such as inspector and menu code.

Both overloads detach themselves from `EditorApplication.update` as soon as the task is completed, so each call observes a task once. A faulted task reports the exception it actually threw rather than the `AggregateException` wrapper that `Task.Exception` exposes, and a null `onError` makes the failure silent.

## WaitEditor

```csharp
public static void WaitEditor(this Task task, Action onCompleted, Action<Exception>? onError = null)
public static void WaitEditor<T>(this Task<T> task, Action<T> onCompleted, Action<Exception>? onError = null)
```

Invokes `onCompleted` on the editor loop once the task finishes. A faulted task calls `onError` with the inner exception, a canceled one with a `TaskCanceledException`. The generic overload passes the task's result to `onCompleted`.

```csharp
UpmInstaller.UpdateAsync().WaitEditor(packages => Repaint(), Debug.LogException);
```
