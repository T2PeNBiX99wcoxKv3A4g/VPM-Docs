# Try

`io.github.ykysnk.utils.NonUdon` · `public static class Try`

デリゲートを実行し、投げられたものを [`Result`](./API-Result.md) に変えるクラスです。呼び出し側は `try` ブロックなしで失敗を調べられます。

例外はスローされた場所のスタック トレースを保ちます。どのオーバーロードにも `[HideInCallstack]` と `[MethodImpl(MethodImplOptions.NoInlining)]` が付いているため、失敗はこのファイルではなくデリゲートを指します。

## Run

```csharp
public static Result<T> Run<T>(Func<T> func)
public static Result<Unit> Run(Action action)
public static Task<Result<T>> Run<T>(Func<Task<T>> func)
public static Task<Result<Unit>> Run(Func<Task> func)
```

デリゲートを 1 回呼び、戻り値かスローされた例外を捕捉します。最初の 2 つのオーバーロードは呼び出し元のスレッドで同期的に実行され、すぐに戻ります。`Task` を返す 2 つは処理を開始し、完了まで待って結果を返すタスクを返します。`Action` と `Func<Task>` のオーバーロードは、値の代わりに [`Unit.Value`](./API-Unit.md) で成功を報告します。

非同期のオーバーロードは `ConfigureAwait(false)` で待機するため、継続は Unity のコンテキストを捕捉せずに実行されます。await の後に Unity のオブジェクトへ触れてはいけません。継続側では `Debug.Log`、`transform` などの Unity API に頼ることもできません。

```csharp
var result = Try.Run(() => int.Parse(text));
if (result)
    Debug.Log(result.Value);
```
