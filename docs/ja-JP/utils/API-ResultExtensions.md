# ResultExtensions

`io.github.ykysnk.utils.NonUdon.Extensions` · `public static class ResultExtensions`

[`Result`](./API-Result.md) を連鎖させるための操作と、結果の `Task` に対する同じ一式です。

途中で短絡した場合、元の例外を置き換えずにそのまま引き継ぎます。以下の各メンバーには、ソースが宣言している範囲で `Result<T>` 版と `Task<Result<T>>` 版の両方があります。タスク版はまず結果を待機し、非同期のコールバックを受け取ります。内部の `await` はすべて `ConfigureAwait(false)` を使います。

## OnSuccess

```csharp
public static Result<T> OnSuccess<T>(this Result<T> result, Action<T> action)
public static Task<Result<T>> OnSuccess<T>(this Task<Result<T>> task, Func<T, Task> action)
```

呼び出しが成功したときに `action` を値とともに実行します。失敗した場合は実行されません。どちらの形式も同じ結果を返すので連鎖でき、`action` が投げた例外は捕捉されません。タスク版はコールバックの完了を待ってから戻ります。

## OnFailure

```csharp
public static Result<T> OnFailure<T>(this Result<T> result, Action<Exception> action)
public static Task<Result<T>> OnFailure<T>(this Task<Result<T>> task, Func<Exception, Task> action)
```

呼び出しが失敗したときに `action` を例外とともに実行します。成功した場合は実行されません。コールバックは例外を受け取るだけで、消費もクリアもしません。元の結果がそのまま返ります。

## OnFinally

```csharp
public static Result<T> OnFinally<T>(this Result<T> result, Action action)
public static Task<Result<T>> OnFinally<T>(this Task<Result<T>> task, Func<Task> action)
```

結果に関係なく `action` を実行します。`finally` ブロックに相当する動きです。失敗経路に限定されないので、それが必要な場合は `OnFailure` を使います。コールバックは値も例外も受け取りません。

## Match

```csharp
public static TResult Match<T, TResult>(this Result<T> result, Func<T, TResult> onSuccess, Func<Exception, TResult> onFailure)
public static Task<TResult> Match<T, TResult>(this Task<Result<T>> task, Func<T, Task<TResult>> onSuccess, Func<Exception, Task<TResult>> onFailure)
```

2 つのコールバックのうち必ず一方だけを実行して、結果を 1 つの値に畳み込みます。

```csharp
var text = result.Match(
    value => $"ok: {value}",
    error => $"failed: {error.Message}");
```

## GetOrNull

```csharp
public static T? GetOrNull<T>(this Result<T> result)
public static Task<T?> GetOrNull<T>(this Task<Result<T>> task)
```

成功時は値を、それ以外は `T` の既定値を返します。例外のスローもログ出力も行いません。値型の `T` ではその既定値が本物の値と区別できないため、0 や `false` が妥当な結果になり得る場合は [`TryGet`](#tryget) を使ってください。

## TryGet

```csharp
public static bool TryGet<T>(this Result<T> result, [MaybeNullWhen(false)] out T value)
public static Task<(bool Success, T? Value)> TryGet<T>(this Task<Result<T>> task)
```

呼び出しが成功したかどうかと、その値です。`GetOrNull` と違い、値型でも失敗を報告できます。制約のない型引数では `T?` が `T` のままになるためです。タスク版は `await` をまたげない `out` 引数の代わりに、組をタプルとして返します。

```csharp
if (result.TryGet(out var value))
    Use(value);
```

## GetOrElse

```csharp
public static T GetOrElse<T>(this Result<T> result, Func<Exception, T> onFailure)
public static Task<T> GetOrElse<T>(this Task<Result<T>> task, Func<Exception, Task<T>> onFailure)
```

成功時は値を、それ以外は `onFailure` が例外から組み立てた値を返します。コールバックは失敗したときだけ実行されます。

## GetOrThrow

```csharp
public static T GetOrThrow<T>(this Result<T> result)
public static Task<T> GetOrThrow<T>(this Task<Result<T>> task)
```

成功時は値を返します。失敗時は保存されている例外を、元のスタック トレースのまま再スローします。単純な `throw` ではなく `ExceptionDispatchInfo` を使うため、トレースがこの行にリセットされることはありません。

## Select

```csharp
public static Result<TU> Select<T, TU>(this Result<T> result, Func<T, TU> selector)
public static Task<Result<TU>> Select<T, TU>(this Task<Result<T>> task, Func<T, TU> selector)
```

呼び出しが成功したときに値を `TU` へ写像します。失敗は例外を保ったままそのまま渡されます。どちらの形式でもセレクターは同期なので、写像自体が非同期の場合は `SelectMany` を連ねてください。

## SelectMany

```csharp
public static Result<TU> SelectMany<T, TU>(this Result<T> result, Func<T, Result<TU>> binder)
public static Result<TV> SelectMany<T, TU, TV>(this Result<T> result, Func<T, Result<TU>> binder, Func<T, TU, TV> projector)
public static Task<Result<TU>> SelectMany<T, TU>(this Task<Result<T>> task, Func<T, Task<Result<TU>>> binder)
public static Task<Result<TV>> SelectMany<T, TU, TV>(this Task<Result<T>> task, Func<T, Task<Result<TU>>> binder, Func<T, TU, TV> projector)
public static Task<Result<TV>> SelectMany<T, TU, TV>(this Task<Result<T>> task, Func<T, Task<Result<TU>>> binder, Func<T, TU, Task<TV>> projector)
```

クエリ構文が呼ぶバインド処理です。binder は値に対して実行され、その結果が呼び出し全体の結果になります。失敗した場合は binder を実行せずに短絡します。引数 3 つのオーバーロードは、元の値とバインド後の値をまとめる `projector` も受け取ります。最後の 1 つはその射影を非同期にできます。

```csharp
var parsed = Result<string>.Success("42")
    .SelectMany(text => Try.Run(() => int.Parse(text)));
```
