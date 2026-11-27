# EditorTask

`io.github.ykysnk.utils.Editor` · `public static class EditorTask`

.NET のタスクをエディターループに適合させます。返されるタスクは `EditorApplication.update` から完了されるため、await すると UnityEditor の API が使えるメインスレッドで再開します。

対象のタスクはエディターの更新ごとに 1 回ポーリングされ、完了するとすぐに購読が解除されます。そのため、返されたタスクの await がエディターをブロックすることはなく、継続は Unity の API を安全に使える場所で実行されます。

## Run

```csharp
public static Task Run(Task task)
public static Task<T> Run<T>(Task<T> task)
```

エディターループが `task` の完了を確認した後に完了するタスクを返します。失敗とキャンセルの状態は例外として投げられず、返されたタスクに転送されるため、扱い方は呼び出し側が決めます。非ジェネリックのオーバーロードは結果があっても破棄し、ジェネリックのオーバーロードは結果を引き継ぎます。例外を持たない失敗したタスクは `Unknown error` として報告されます。

```csharp
await EditorTask.Run(File.WriteAllTextAsync(path, text));
```
