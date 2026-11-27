# EditorTask

`io.github.ykysnk.utils.Editor` · `public static class EditorTask`

把 .NET 任务适配到编辑器循环：返回的任务由 `EditorApplication.update` 完成，因此 await 它后会回到允许使用 UnityEditor API 的主线程继续。

被包装的任务在每次编辑器更新时轮询一次，完成时立即取消订阅，因此 await 返回的任务不会阻塞编辑器，后续代码也在可安全使用 Unity API 的地方执行。

## Run

```csharp
public static Task Run(Task task)
public static Task<T> Run<T>(Task<T> task)
```

返回一个在编辑器循环看到 `task` 完成后才完成的任务。失败与取消状态会被转发到返回的任务而不是抛出，因此如何处理由调用方决定；非泛型重载丢弃结果，泛型重载保留结果。没有异常的错误任务会以 `Unknown error` 报告。

```csharp
await EditorTask.Run(File.WriteAllTextAsync(path, text));
```
