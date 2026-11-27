# Unit

`io.github.ykysnk.utils.NonUdon` · `public readonly struct Unit : IEquatable<Unit>`

Stand-in for `void` where a type argument is required, so an operation with no return value can still produce a [`Result`](./API-Result.md).

All instances compare equal, so a successful `Result<Unit>` carries no information beyond its success flag.

## Value

```csharp
public static readonly Unit Value;
```

The instance to return from a successful call that has no value.

## TaskValue

```csharp
public static readonly Task<Unit> TaskValue;
```

A completed task carrying `Value`, for APIs that want a `Task<Unit>`.

## Equals

```csharp
public bool Equals(Unit other)
public override bool Equals(object? obj)
```

Always true for another `Unit`, because every instance represents the same empty value; the `object` overload returns false for any other type.

## GetHashCode

```csharp
public override int GetHashCode()
```

Always 0, because all instances are equal.

## ToString

```csharp
public override string ToString()
```

Returns the constant name `Unit`.

## operator ==

```csharp
public static bool operator ==(Unit left, Unit right)
```

Compares two instances, which are always equal, so the result is always true.

## operator !=

```csharp
public static bool operator !=(Unit left, Unit right)
```

Compares two instances, which are never unequal, so the result is always false.
