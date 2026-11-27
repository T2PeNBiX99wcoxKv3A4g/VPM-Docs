# ResultExtensions

`io.github.ykysnk.utils.NonUdon.Extensions` · `public static class ResultExtensions`

对 [`Result`](./API-Result.md) 的链式操作，以及针对结果的 `Task` 的同一套方法。

调用短路时会原样传递原始异常，而不是替换它。下面每个名称在源码声明的地方都有 `Result<T>` 形式和 `Task<Result<T>>` 形式；任务形式会先等待结果，并接受异步回调，内部所有 `await` 都使用 `ConfigureAwait(false)`。

## OnSuccess

```csharp
public static Result<T> OnSuccess<T>(this Result<T> result, Action<T> action)
public static Task<Result<T>> OnSuccess<T>(this Task<Result<T>> task, Func<T, Task> action)
```

调用成功时用值运行 `action`；失败时不会执行。两种形式都返回同一个结果，因此可以继续链式调用，而 `action` 抛出的异常不会被捕获。任务形式会等待回调完成后再返回。

## OnFailure

```csharp
public static Result<T> OnFailure<T>(this Result<T> result, Action<Exception> action)
public static Task<Result<T>> OnFailure<T>(this Task<Result<T>> task, Func<Exception, Task> action)
```

调用失败时用异常运行 `action`；成功时不会执行。回调只接收异常，既不消耗也不清除它，原始结果会被返回。

## OnFinally

```csharp
public static Result<T> OnFinally<T>(this Result<T> result, Action action)
public static Task<Result<T>> OnFinally<T>(this Task<Result<T>> task, Func<Task> action)
```

无论结果如何都运行 `action`，相当于 `finally` 块。它不与失败路径绑定——那种情况请用 `OnFailure`——回调既不接收值也不接收异常。

## Match

```csharp
public static TResult Match<T, TResult>(this Result<T> result, Func<T, TResult> onSuccess, Func<Exception, TResult> onFailure)
public static Task<TResult> Match<T, TResult>(this Task<Result<T>> task, Func<T, Task<TResult>> onSuccess, Func<Exception, Task<TResult>> onFailure)
```

只运行两个回调中的一个，把结果折叠成单个值。

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

成功时是值，否则是 `T` 的默认值，不抛出也不记录异常。对值类型 `T` 来说该默认值与真实值无法区分，因此当 0 或 `false` 是可能的结果时请用 [`TryGet`](#tryget)。

## TryGet

```csharp
public static bool TryGet<T>(this Result<T> result, [MaybeNullWhen(false)] out T value)
public static Task<(bool Success, T? Value)> TryGet<T>(this Task<Result<T>> task)
```

调用是否成功，以及它的值。与 `GetOrNull` 不同，它对值类型也能报告失败，因为无约束类型参数上的 `T?` 仍然是 `T`。任务形式用元组返回这一对值，而不是用无法跨 `await` 的 `out` 参数。

```csharp
if (result.TryGet(out var value))
    Use(value);
```

## GetOrElse

```csharp
public static T GetOrElse<T>(this Result<T> result, Func<Exception, T> onFailure)
public static Task<T> GetOrElse<T>(this Task<Result<T>> task, Func<Exception, Task<T>> onFailure)
```

成功时是值，否则是 `onFailure` 从异常构建的值；回调只在失败时运行。

## GetOrThrow

```csharp
public static T GetOrThrow<T>(this Result<T> result)
public static Task<T> GetOrThrow<T>(this Task<Result<T>> task)
```

成功时是值；失败时重新抛出保存的异常，并保留原始堆栈跟踪。它通过 `ExceptionDispatchInfo` 重新抛出，而不是简单的 `throw`，后者会把跟踪重置到这一行。

## Select

```csharp
public static Result<TU> Select<T, TU>(this Result<T> result, Func<T, TU> selector)
public static Task<Result<TU>> Select<T, TU>(this Task<Result<T>> task, Func<T, TU> selector)
```

调用成功时把值映射为 `TU`；失败会保留异常并原样传递。两种形式的选择器都是同步的，因此当映射本身是异步时请链式调用 `SelectMany`。

## SelectMany

```csharp
public static Result<TU> SelectMany<T, TU>(this Result<T> result, Func<T, Result<TU>> binder)
public static Result<TV> SelectMany<T, TU, TV>(this Result<T> result, Func<T, Result<TU>> binder, Func<T, TU, TV> projector)
public static Task<Result<TU>> SelectMany<T, TU>(this Task<Result<T>> task, Func<T, Task<Result<TU>>> binder)
public static Task<Result<TV>> SelectMany<T, TU, TV>(this Task<Result<T>> task, Func<T, Task<Result<TU>>> binder, Func<T, TU, TV> projector)
public static Task<Result<TV>> SelectMany<T, TU, TV>(this Task<Result<T>> task, Func<T, Task<Result<TU>>> binder, Func<T, TU, Task<TV>> projector)
```

查询语法调用的绑定步骤。binder 在值上运行，其结果成为整个调用的结果；失败时会短路，不运行 binder。三参数重载还接受 `projector`，把原始值与绑定后的值组合起来，最后一个重载允许该投影是异步的。

```csharp
var parsed = Result<string>.Success("42")
    .SelectMany(text => Try.Run(() => int.Parse(text)));
```
