# ResultExtensions

`io.github.ykysnk.utils.NonUdon.Extensions` · `public static class ResultExtensions`

Chainable operations on [`Result`](./API-Result.md), plus the same set again for a `Task` of a result.

When a call short-circuits, it carries the original exception through rather than replacing it. Each name below has both a `Result<T>` form and a `Task<Result<T>>` form where the source declares it; the task form awaits the result first and takes asynchronous callbacks, and every `await` inside it uses `ConfigureAwait(false)`.

## OnSuccess

```csharp
public static Result<T> OnSuccess<T>(this Result<T> result, Action<T> action)
public static Task<Result<T>> OnSuccess<T>(this Task<Result<T>> task, Func<T, Task> action)
```

Runs `action` with the value when the call succeeded; a failure leaves it unexecuted. Both forms return the same result, so calls can be chained, and exceptions thrown by `action` are not captured. The task form awaits the callback before returning.

## OnFailure

```csharp
public static Result<T> OnFailure<T>(this Result<T> result, Action<Exception> action)
public static Task<Result<T>> OnFailure<T>(this Task<Result<T>> task, Func<Exception, Task> action)
```

Runs `action` with the exception when the call failed; a success leaves it unexecuted. The callback receives the exception without consuming or clearing it, and the original result is returned.

## OnFinally

```csharp
public static Result<T> OnFinally<T>(this Result<T> result, Action action)
public static Task<Result<T>> OnFinally<T>(this Task<Result<T>> task, Func<Task> action)
```

Runs `action` whatever the outcome, the way a `finally` block would. It is not tied to the failure path — use `OnFailure` for that — and the callback receives no value or exception.

## Match

```csharp
public static TResult Match<T, TResult>(this Result<T> result, Func<T, TResult> onSuccess, Func<Exception, TResult> onFailure)
public static Task<TResult> Match<T, TResult>(this Task<Result<T>> task, Func<T, Task<TResult>> onSuccess, Func<Exception, Task<TResult>> onFailure)
```

Collapses the outcome into one value by running exactly one of the two callbacks.

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

The value on success, otherwise the default of `T`, with no exception thrown or logged. For a value type `T` that default is indistinguishable from a real value, so use [`TryGet`](#tryget) when 0 or `false` are plausible results.

## TryGet

```csharp
public static bool TryGet<T>(this Result<T> result, [MaybeNullWhen(false)] out T value)
public static Task<(bool Success, T? Value)> TryGet<T>(this Task<Result<T>> task)
```

Whether the call succeeded, and its value. Unlike `GetOrNull` this can report failure for a value type, because `T?` on an unconstrained parameter stays `T`. The task form returns the pair as a tuple instead of an `out` parameter, which cannot cross an `await`.

```csharp
if (result.TryGet(out var value))
    Use(value);
```

## GetOrElse

```csharp
public static T GetOrElse<T>(this Result<T> result, Func<Exception, T> onFailure)
public static Task<T> GetOrElse<T>(this Task<Result<T>> task, Func<Exception, Task<T>> onFailure)
```

The value on success, otherwise whatever `onFailure` builds from the exception; the callback runs only on failure.

## GetOrThrow

```csharp
public static T GetOrThrow<T>(this Result<T> result)
public static Task<T> GetOrThrow<T>(this Task<Result<T>> task)
```

The value on success; on failure the stored exception is rethrown with its original stack trace. It is rethrown through `ExceptionDispatchInfo` rather than a plain `throw`, which would reset the trace to this line.

## Select

```csharp
public static Result<TU> Select<T, TU>(this Result<T> result, Func<T, TU> selector)
public static Task<Result<TU>> Select<T, TU>(this Task<Result<T>> task, Func<T, TU> selector)
```

Maps the value to `TU` when the call succeeded; a failure is passed on unchanged, keeping its exception. The selector is synchronous in both forms, so chain `SelectMany` when the mapping itself is asynchronous.

## SelectMany

```csharp
public static Result<TU> SelectMany<T, TU>(this Result<T> result, Func<T, Result<TU>> binder)
public static Result<TV> SelectMany<T, TU, TV>(this Result<T> result, Func<T, Result<TU>> binder, Func<T, TU, TV> projector)
public static Task<Result<TU>> SelectMany<T, TU>(this Task<Result<T>> task, Func<T, Task<Result<TU>>> binder)
public static Task<Result<TV>> SelectMany<T, TU, TV>(this Task<Result<T>> task, Func<T, Task<Result<TU>>> binder, Func<T, TU, TV> projector)
public static Task<Result<TV>> SelectMany<T, TU, TV>(this Task<Result<T>> task, Func<T, Task<Result<TU>>> binder, Func<T, TU, Task<TV>> projector)
```

The bind step query syntax calls. The binder runs on the value and its result becomes the result of the call; a failure short-circuits without running it. The three-argument overloads also take a `projector` that combines the original value with the bound one, and the last one lets that projection be asynchronous.

```csharp
var parsed = Result<string>.Success("42")
    .SelectMany(text => Try.Run(() => int.Parse(text)));
```
