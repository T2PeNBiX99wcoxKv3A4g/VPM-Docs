# RequestExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class RequestExtensions`

把包管理器请求转换为在编辑器循环中完成的任务，因此等待的代码可以留在主线程上。

## AsTask

```csharp
public static Task<T> AsTask<T>(this T request) where T : Request
public static Task<T> AsTask<T>(this T request, CancellationToken token) where T : Request
```

等待一个包管理器请求。请求通过 `EditorApplication.update` 轮询，任务随后在 `EditorApplication.delayCall` 中完成，因此等待的延续会在主线程上以较浅的调用栈恢复，这正是它能安全调用 `UnityEditor` API 的原因。具体请求类型会被保留，因此调用方可以读取其 `Result`。

带 `CancellationToken` 的重载在标记被取消时停止等待：请求本身不会被取消，只是不再被观察，返回的任务会以该标记被取消。

```csharp
var request = await Client.Add("io.github.ykysnk.utils").AsTask();
if (request.Status == StatusCode.Success) Refresh();
```
