# Try

`io.github.ykysnk.utils.NonUdon` · `public static class Try`

运行委托，并把它抛出的任何东西变成 [`Result`](./API-Result.md)，因此调用方无需 `try` 块就能检查失败。

异常保留抛出点的堆栈跟踪。每个重载都带有 `[HideInCallstack]` 和 `[MethodImpl(MethodImplOptions.NoInlining)]`，因此失败指向委托，而不是本文件。

## Run

```csharp
public static Result<T> Run<T>(Func<T> func)
public static Result<Unit> Run(Action action)
public static Task<Result<T>> Run<T>(Func<Task<T>> func)
public static Task<Result<Unit>> Run(Func<Task> func)
```

调用委托一次，捕获它的返回值或它抛出的异常。前两个重载在调用线程上同步执行并立即返回；两个 `Task` 重载会启动工作、等待完成，并返回产出结果的任务。`Action` 与 `Func<Task>` 重载用 [`Unit.Value`](./API-Unit.md) 而不是值来报告成功。

异步重载以 `ConfigureAwait(false)` 等待，因此后续代码在没有捕获 Unity 上下文的情况下运行：await 之后不得接触 Unity 对象，续体一侧也不能依赖 `Debug.Log`、`transform` 或任何其他 Unity API。

```csharp
var result = Try.Run(() => int.Parse(text));
if (result)
    Debug.Log(result.Value);
```
