# RequestExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class RequestExtensions`

Turns package manager requests into tasks that complete on the editor loop, so awaiting code can stay on the main thread.

## AsTask

```csharp
public static Task<T> AsTask<T>(this T request) where T : Request
public static Task<T> AsTask<T>(this T request, CancellationToken token) where T : Request
```

Awaits a package manager request. The request is polled from `EditorApplication.update` and the task is completed later from `EditorApplication.delayCall`, so the awaiting continuation resumes on the main thread with a shallow call stack, which is what lets it call `UnityEditor` APIs safely. The concrete request type is preserved, so the caller can read its `Result`.

The overload with a `CancellationToken` stops waiting when the token is cancelled: the request itself is not cancelled, it just stops being observed, and the returned task is cancelled with that token.

```csharp
var request = await Client.Add("io.github.ykysnk.utils").AsTask();
if (request.Status == StatusCode.Success) Refresh();
```
