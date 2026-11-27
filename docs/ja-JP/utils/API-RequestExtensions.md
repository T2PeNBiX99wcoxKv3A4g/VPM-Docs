# RequestExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class RequestExtensions`

パッケージマネージャーのリクエストを、エディタループ上で完了するタスクに変換するので、await するコードはメインスレッドに留まれます。

## AsTask

```csharp
public static Task<T> AsTask<T>(this T request) where T : Request
public static Task<T> AsTask<T>(this T request, CancellationToken token) where T : Request
```

パッケージマネージャーのリクエストを await します。リクエストは `EditorApplication.update` からポーリングされ、タスクは後で `EditorApplication.delayCall` から完了するため、await の継続は浅いコールスタックでメインスレッド上に再開します。これにより `UnityEditor` の API を安全に呼べます。具体的なリクエスト型が保持されるので、呼び出し側はその `Result` を読めます。

`CancellationToken` を取るオーバーロードは、トークンがキャンセルされたときに待機を止めます。リクエスト自体はキャンセルされず、監視が止まるだけで、返されたタスクはそのトークンでキャンセルされます。

```csharp
var request = await Client.Add("io.github.ykysnk.utils").AsTask();
if (request.Status == StatusCode.Success) Refresh();
```
