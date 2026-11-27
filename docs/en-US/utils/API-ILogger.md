# ILogger

`io.github.ykysnk.utils.NonUdon.Logger` · `public interface ILogger`

The logging surface this package codes against, so callers can swap the implementation. It mirrors `Debug`, with a prefix attached to every entry.

[`Logger`](./API-Logger.md) is the implementation the package ships. Messages are converted to text by Unity, so a null payload logs as an empty message.

## Log

```csharp
void Log(object? message)
void Log(object? message, Object context)
```

Writes the message at info level. The `context` overload links the entry to that object for console navigation; a null context is accepted but cannot be selected.

## LogWarning

```csharp
void LogWarning(object? message)
void LogWarning(object? message, Object context)
```

Writes the message as a warning and lets execution continue. The `context` overload links the entry to that object for console navigation.

## LogError

```csharp
void LogError(object? message)
void LogError(object? message, Object context)
```

Writes the message as an error and lets execution continue. The `context` overload links the entry to that object for console navigation.

## Assert

```csharp
void Assert(bool condition, object? message)
void Assert(bool condition, object? message, Object context)
```

Reports the message when `condition` is false; nothing is written otherwise. The `context` overload links the entry to that object for console navigation.
