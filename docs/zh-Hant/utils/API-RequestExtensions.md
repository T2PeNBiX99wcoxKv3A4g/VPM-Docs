# RequestExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class RequestExtensions`

把套件管理員要求轉成在編輯器迴圈完成的工作，讓等待中的程式碼能留在主執行緒。

## AsTask

```csharp
public static Task<T> AsTask<T>(this T request) where T : Request
public static Task<T> AsTask<T>(this T request, CancellationToken token) where T : Request
```

等待套件管理員要求。要求會從 `EditorApplication.update` 輪詢，工作則稍後在 `EditorApplication.delayCall` 中完成，因此等待端的續行會以較淺的呼叫堆疊回到主執行緒，這正是它能安全呼叫 `UnityEditor` API 的原因。具體的要求型別會被保留，讓呼叫端可以讀取它的 `Result`。

帶 `CancellationToken` 的多載會在權杖取消時停止等待：要求本身不會被取消，只是不再被觀察，傳回的工作則以該權杖取消。

```csharp
var request = await Client.Add("io.github.ykysnk.utils").AsTask();
if (request.Status == StatusCode.Success) Refresh();
```
