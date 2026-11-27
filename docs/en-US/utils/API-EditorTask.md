# EditorTask

`io.github.ykysnk.utils.Editor` · `public static class EditorTask`

Adapts a .NET task to the editor loop: the returned task is completed from `EditorApplication.update`, so awaiting it resumes on the main thread where UnityEditor APIs are allowed.

The wrapped task is polled once per editor update and the poll unsubscribes as soon as it completes, so awaiting the returned task never blocks the editor and the continuation runs where Unity APIs are safe.

## Run

```csharp
public static Task Run(Task task)
public static Task<T> Run<T>(Task<T> task)
```

Returns a task that finishes after the editor loop sees `task` complete. Fault and cancel states are forwarded to the returned task instead of being thrown, so the caller decides how to handle them; the non-generic overload discards any result it may have, the generic one carries it over. A faulted task without an exception is reported as `Unknown error`.

```csharp
await EditorTask.Run(File.WriteAllTextAsync(path, text));
```
