# EditorTask

`io.github.ykysnk.utils.Editor` · `public static class EditorTask`

把 .NET 工作適配到編輯器迴圈：傳回的工作由 `EditorApplication.update` 完成，因此 await 它之後會回到可使用 UnityEditor API 的主執行緒繼續。

被包裝的工作在每次編輯器更新時輪詢一次，完成時立即取消訂閱，因此 await 傳回的工作不會封鎖編輯器，後續程式碼也在可安全使用 Unity API 的地方執行。

## Run

```csharp
public static Task Run(Task task)
public static Task<T> Run<T>(Task<T> task)
```

傳回一個在編輯器迴圈看到 `task` 完成後才完成的工作。失敗與取消狀態會被轉送到傳回的工作而不是擲出，因此如何處理由呼叫端決定；非泛型多載捨棄結果，泛型多載保留結果。沒有例外的失敗工作會以 `Unknown error` 回報。

```csharp
await EditorTask.Run(File.WriteAllTextAsync(path, text));
```
