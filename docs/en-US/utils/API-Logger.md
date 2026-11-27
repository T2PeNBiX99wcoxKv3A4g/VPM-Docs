# Logger

`io.github.ykysnk.utils.NonUdon.Logger` · `public class Logger<T> : ILogger`

Logger that prefixes every entry with the name of `T`, so a console line names the type it came from without the prefix being written at each call site. One instance is shared per `T`.

The prefix is `typeof(T).Name`, read once when the type is first used, and the entries are written through [`Utils`](./API-Utils.md), so they get the same coloured `[prefix]` form and `[HideInCallstack]` behaviour as a direct call.

## Instance

```csharp
public static Logger<T> Instance { get; }
```

The shared logger for `T`, created on first use and reused afterwards. It is a thread-safe singleton built on `Lazy<Logger<T>>` with `LazyThreadSafetyMode.ExecutionAndPublication`, so logging from several threads reaches the same instance.

```csharp
Logger<MyWindow>.Instance.Log("Opened");
```

## Log

```csharp
public void Log(object? message)
public void Log(object? message, Object context)
```

Writes an info-level message prefixed with the type name. The `context` overload also highlights that object when the console entry is clicked.

## LogWarning

```csharp
public void LogWarning(object? message)
public void LogWarning(object? message, Object context)
```

Writes a warning prefixed with the type name and lets execution continue. The `context` overload also highlights that object when the console entry is clicked.

## LogError

```csharp
public void LogError(object? message)
public void LogError(object? message, Object context)
```

Writes an error prefixed with the type name and lets execution continue. The `context` overload also highlights that object when the console entry is clicked.

## Assert

```csharp
public void Assert(bool condition, object? message)
public void Assert(bool condition, object? message, Object context)
```

Reports the prefixed message when `condition` is false; nothing is written otherwise. The `context` overload also highlights that object when the console entry is clicked.
