# Try

`io.github.ykysnk.utils.NonUdon` · `public static class Try`

執行委派，並把它擲回的任何東西變成 [`Result`](./API-Result.md)，因此呼叫端不需要 `try` 區塊就能檢查失敗。

例外保留擲回處的堆疊追蹤。每個多載都帶有 `[HideInCallstack]` 與 `[MethodImpl(MethodImplOptions.NoInlining)]`，因此失敗會指向委派，而不是這個檔案。

## Run

```csharp
public static Result<T> Run<T>(Func<T> func)
public static Result<Unit> Run(Action action)
public static Task<Result<T>> Run<T>(Func<Task<T>> func)
public static Task<Result<Unit>> Run(Func<Task> func)
```

呼叫委派一次，擷取它的傳回值或它擲回的例外。前兩個多載在呼叫執行緒上同步執行並立即傳回；兩個 `Task` 多載會啟動工作、等待完成，並傳回產出結果的工作。`Action` 與 `Func<Task>` 多載用 [`Unit.Value`](./API-Unit.md) 而不是值來回報成功。

非同步多載以 `ConfigureAwait(false)` 等待，因此續體在沒有擷取 Unity 內容的情況下執行：await 之後不得接觸 Unity 物件，續體一側也不能依賴 `Debug.Log`、`transform` 或任何其他 Unity API。

```csharp
var result = Try.Run(() => int.Parse(text));
if (result)
    Debug.Log(result.Value);
```
