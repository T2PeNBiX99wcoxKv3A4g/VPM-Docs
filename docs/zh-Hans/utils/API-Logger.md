# Logger

`io.github.ykysnk.utils.NonUdon.Logger` · `public class Logger<T> : ILogger`

给每个条目加上 `T` 名称前缀的日志器，因此控制台行本身就能说明它来自哪个类型，无需在每个调用点写前缀。每个 `T` 共用一个实例。

前缀是 `typeof(T).Name`，在类型首次使用时读取一次；条目通过 [`Utils`](./API-Utils.md) 写出，因此获得与直接调用相同的彩色 `[prefix]` 形式和 `[HideInCallstack]` 行为。

## Instance

```csharp
public static Logger<T> Instance { get; }
```

`T` 的共享日志器，首次使用时创建，之后复用。它是基于 `Lazy<Logger<T>>` 和 `LazyThreadSafetyMode.ExecutionAndPublication` 的线程安全单例，因此从多个线程记录会到达同一个实例。

```csharp
Logger<MyWindow>.Instance.Log("Opened");
```

## Log

```csharp
public void Log(object? message)
public void Log(object? message, Object context)
```

写出带类型名前缀的 info 级别消息。带 `context` 的重载在点击控制台条目时还会高亮该对象。

## LogWarning

```csharp
public void LogWarning(object? message)
public void LogWarning(object? message, Object context)
```

写出带类型名前缀的警告，执行继续。带 `context` 的重载在点击控制台条目时还会高亮该对象。

## LogError

```csharp
public void LogError(object? message)
public void LogError(object? message, Object context)
```

写出带类型名前缀的错误，执行继续。带 `context` 的重载在点击控制台条目时还会高亮该对象。

## Assert

```csharp
public void Assert(bool condition, object? message)
public void Assert(bool condition, object? message, Object context)
```

`condition` 为 false 时报告带前缀的消息；否则不写出任何内容。带 `context` 的重载在点击控制台条目时还会高亮该对象。
