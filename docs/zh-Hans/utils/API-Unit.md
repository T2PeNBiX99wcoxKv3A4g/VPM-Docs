# Unit

`io.github.ykysnk.utils.NonUdon` · `public readonly struct Unit : IEquatable<Unit>`

在需要类型参数的地方代替 `void`，因此没有返回值的操作也能产生 [`Result`](./API-Result.md)。

所有实例都相等，因此成功的 `Result<Unit>` 除了成功标志之外不携带任何信息。

## Value

```csharp
public static readonly Unit Value;
```

没有返回值的调用成功时用于返回的实例。

## TaskValue

```csharp
public static readonly Task<Unit> TaskValue;
```

携带 `Value` 的已完成任务，供需要 `Task<Unit>` 的 API 使用。

## Equals

```csharp
public bool Equals(Unit other)
public override bool Equals(object? obj)
```

对另一个 `Unit` 始终为 true，因为每个实例都表示同一个空值；`object` 重载对任何其他类型返回 false。

## GetHashCode

```csharp
public override int GetHashCode()
```

始终为 0，因为所有实例都相等。

## ToString

```csharp
public override string ToString()
```

返回常量名称 `Unit`。

## operator ==

```csharp
public static bool operator ==(Unit left, Unit right)
```

比较两个实例，它们始终相等，因此结果始终为 true。

## operator !=

```csharp
public static bool operator !=(Unit left, Unit right)
```

比较两个实例，它们永远不会不相等，因此结果始终为 false。
