# ILogger

`io.github.ykysnk.utils.NonUdon.Logger` · `public interface ILogger`

本包所依赖的日志接口，便于调用方替换实现。它与 `Debug` 对应，每个条目都带有前缀。

本包提供的实现是 [`Logger`](./API-Logger.md)。消息由 Unity 转换为文本，因此 null 负载会记录为空消息。

## Log

```csharp
void Log(object? message)
void Log(object? message, Object context)
```

以 info 级别写出消息。带 `context` 的重载会把条目链接到该对象，便于在控制台中定位；接受 null context，但无法被选中。

## LogWarning

```csharp
void LogWarning(object? message)
void LogWarning(object? message, Object context)
```

把消息作为警告写出，执行继续。带 `context` 的重载会把条目链接到该对象，便于在控制台中定位。

## LogError

```csharp
void LogError(object? message)
void LogError(object? message, Object context)
```

把消息作为错误写出，执行继续。带 `context` 的重载会把条目链接到该对象，便于在控制台中定位。

## Assert

```csharp
void Assert(bool condition, object? message)
void Assert(bool condition, object? message, Object context)
```

`condition` 为 false 时报告消息；否则不写出任何内容。带 `context` 的重载会把条目链接到该对象，便于在控制台中定位。
