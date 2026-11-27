# TaskExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class TaskExtensions`

`EditorApplication.update` からタスクをポーリングし、結果をコールバックで報告します。await できない呼び出し元（インスペクターやメニューのコードなど）向けです。

どちらのオーバーロードも、タスクが完了するとすぐに `EditorApplication.update` から自分を外すため、1 回の呼び出しは 1 つのタスクを監視します。失敗したタスクは `Task.Exception` が返す `AggregateException` の包みではなく実際に投げた例外を報告し、`onError` が null の場合は失敗を黙って無視します。

## WaitEditor

```csharp
public static void WaitEditor(this Task task, Action onCompleted, Action<Exception>? onError = null)
public static void WaitEditor<T>(this Task<T> task, Action<T> onCompleted, Action<Exception>? onError = null)
```

タスクが終わったらエディタループ上で `onCompleted` を呼びます。失敗したタスクは内部の例外で、キャンセルされたタスクは `TaskCanceledException` で `onError` を呼びます。ジェネリック版はタスクの結果を `onCompleted` に渡します。

```csharp
UpmInstaller.UpdateAsync().WaitEditor(packages => Repaint(), Debug.LogException);
```
