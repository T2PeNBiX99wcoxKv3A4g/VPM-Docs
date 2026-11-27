# Try

`io.github.ykysnk.utils.NonUdon` · `public static class Try`

Runs a delegate and turns anything it throws into a [`Result`](./API-Result.md), so callers can inspect a failure without a `try` block.

The exception keeps the stack trace of the throw site. Every overload carries `[HideInCallstack]` and `[MethodImpl(MethodImplOptions.NoInlining)]`, so the failure points at the delegate instead of this file.

## Run

```csharp
public static Result<T> Run<T>(Func<T> func)
public static Result<Unit> Run(Action action)
public static Task<Result<T>> Run<T>(Func<Task<T>> func)
public static Task<Result<Unit>> Run(Func<Task> func)
```

Calls the delegate once and captures its return value or the exception it throws. The first two overloads run synchronously on the calling thread and return at once; the two `Task` overloads start the work, await it to completion and return a task that yields the result. The `Action` and `Func<Task>` overloads report success with [`Unit.Value`](./API-Unit.md) instead of a value.

The asynchronous overloads await with `ConfigureAwait(false)`, so the continuation runs without a captured Unity context: Unity objects must not be touched after the await, and nothing on the continuation side may rely on `Debug.Log`, `transform` or any other Unity API.

```csharp
var result = Try.Run(() => int.Parse(text));
if (result)
    Debug.Log(result.Value);
```
