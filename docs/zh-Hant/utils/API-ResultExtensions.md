# ResultExtensions

`io.github.ykysnk.utils.NonUdon.Extensions` · `public static class ResultExtensions`

對 [`Result`](./API-Result.md) 的連鎖操作，以及針對結果的 `Task` 的同一套方法。

呼叫短路時會原樣傳遞原始例外，而不是替換它。下面每個名稱在原始碼宣告的地方都有 `Result<T>` 形式與 `Task<Result<T>>` 形式；工作形式會先等待結果，並接受非同步回呼，內部所有 `await` 都使用 `ConfigureAwait(false)`。

## OnSuccess

```csharp
public static Result<T> OnSuccess<T>(this Result<T> result, Action<T> action)
public static Task<Result<T>> OnSuccess<T>(this Task<Result<T>> task, Func<T, Task> action)
```

呼叫成功時以值執行 `action`；失敗時不會執行。兩種形式都傳回同一個結果，因此可以繼續連鎖，而 `action` 擲回的例外不會被擷取。工作形式會等待回呼完成後才傳回。

## OnFailure

```csharp
public static Result<T> OnFailure<T>(this Result<T> result, Action<Exception> action)
public static Task<Result<T>> OnFailure<T>(this Task<Result<T>> task, Func<Exception, Task> action)
```

呼叫失敗時以例外執行 `action`；成功時不會執行。回呼只接收例外，既不消耗也不清除它，原始結果會被傳回。

## OnFinally

```csharp
public static Result<T> OnFinally<T>(this Result<T> result, Action action)
public static Task<Result<T>> OnFinally<T>(this Task<Result<T>> task, Func<Task> action)
```

無論結果如何都執行 `action`，相當於 `finally` 區塊。它不與失敗路徑綁定——那種情況請用 `OnFailure`——回呼既不接收值也不接收例外。

## Match

```csharp
public static TResult Match<T, TResult>(this Result<T> result, Func<T, TResult> onSuccess, Func<Exception, TResult> onFailure)
public static Task<TResult> Match<T, TResult>(this Task<Result<T>> task, Func<T, Task<TResult>> onSuccess, Func<Exception, Task<TResult>> onFailure)
```

只執行兩個回呼中的一個，把結果摺疊成單一值。

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

成功時是值，否則為 `T` 的預設值，不擲回也不記錄例外。對值型別 `T` 而言該預設值與真實值無法區分，因此當 0 或 `false` 是可能的結果時請用 [`TryGet`](#tryget)。

## TryGet

```csharp
public static bool TryGet<T>(this Result<T> result, [MaybeNullWhen(false)] out T value)
public static Task<(bool Success, T? Value)> TryGet<T>(this Task<Result<T>> task)
```

呼叫是否成功，以及它的值。與 `GetOrNull` 不同，它對值型別也能回報失敗，因為無限制型別參數上的 `T?` 仍然是 `T`。工作形式以元組傳回這一對值，而不是用無法跨 `await` 的 `out` 參數。

```csharp
if (result.TryGet(out var value))
    Use(value);
```

## GetOrElse

```csharp
public static T GetOrElse<T>(this Result<T> result, Func<Exception, T> onFailure)
public static Task<T> GetOrElse<T>(this Task<Result<T>> task, Func<Exception, Task<T>> onFailure)
```

成功時是值，否則為 `onFailure` 從例外建構的值；回呼只在失敗時執行。

## GetOrThrow

```csharp
public static T GetOrThrow<T>(this Result<T> result)
public static Task<T> GetOrThrow<T>(this Task<Result<T>> task)
```

成功時是值；失敗時重新擲回保存的例外，並保留原始堆疊追蹤。它透過 `ExceptionDispatchInfo` 重新擲回，而不是單純的 `throw`，後者會把追蹤重設到這一行。

## Select

```csharp
public static Result<TU> Select<T, TU>(this Result<T> result, Func<T, TU> selector)
public static Task<Result<TU>> Select<T, TU>(this Task<Result<T>> task, Func<T, TU> selector)
```

呼叫成功時把值映射為 `TU`；失敗會保留例外並原樣傳遞。兩種形式的選擇子都是同步的，因此當映射本身是非同步時請連鎖呼叫 `SelectMany`。

## SelectMany

```csharp
public static Result<TU> SelectMany<T, TU>(this Result<T> result, Func<T, Result<TU>> binder)
public static Result<TV> SelectMany<T, TU, TV>(this Result<T> result, Func<T, Result<TU>> binder, Func<T, TU, TV> projector)
public static Task<Result<TU>> SelectMany<T, TU>(this Task<Result<T>> task, Func<T, Task<Result<TU>>> binder)
public static Task<Result<TV>> SelectMany<T, TU, TV>(this Task<Result<T>> task, Func<T, Task<Result<TU>>> binder, Func<T, TU, TV> projector)
public static Task<Result<TV>> SelectMany<T, TU, TV>(this Task<Result<T>> task, Func<T, Task<Result<TU>>> binder, Func<T, TU, Task<TV>> projector)
```

查詢語法呼叫的綁定步驟。binder 在值上執行，其結果成為整個呼叫的結果；失敗時會短路，不執行 binder。三參數多載還接受 `projector`，把原始值與綁定後的值組合起來，最後一個多載允許該投影是非同步的。

```csharp
var parsed = Result<string>.Success("42")
    .SelectMany(text => Try.Run(() => int.Parse(text)));
```
