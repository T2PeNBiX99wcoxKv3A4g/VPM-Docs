# Result

`io.github.ykysnk.utils.NonUdon` · `public readonly struct Result<T>`

Outcome of an operation that can fail: either a value or the exception that stopped it.

The success flag is explicit rather than inferred from the value, so `Result<int>` can carry a genuine 0 and still report success. The constructors are private; build results with `Success`, `Failure` or [`Try.Run`](./API-Try.md).

## Value

```csharp
public T? Value { get; }
```

Whatever the delegate returned. On failure this is the default of `T`; a null value on a successful result is allowed and is not an error.

## Exception

```csharp
public Exception? Exception { get; }
```

The captured exception with its original stack trace, or null on success.

## IsSuccess

```csharp
public bool IsSuccess { get; }
```

Whether the call completed without throwing, i.e. whether `Exception` is null.

## Success

```csharp
public static Result<T> Success(T value)
```

Builds a successful result with `Exception` cleared. A null value is allowed and still counts as success.

## Failure

```csharp
public static Result<T> Failure(Exception exception)
```

Builds a failed result carrying `exception` as-is, not unwrapped or rethrown, with `Value` set to the default of `T`.

## Deconstruct

```csharp
public void Deconstruct(out bool isSuccess, out T? value, out Exception? exception)
```

Splits the result into its three readable parts, which is what a deconstruction assignment calls.

```csharp
var (success, value, error) = Try.Run(() => int.Parse(text));
```

## operator true

```csharp
public static bool operator true(Result<T> r)
```

Reports success, so a result can be used directly in a conditional.

```csharp
if (result)
    Use(result.Value);
```

## operator false

```csharp
public static bool operator false(Result<T> r)
```

Reports failure. The compiler requires it alongside the `true` operator for conditional use.

## ToString

```csharp
public override string ToString()
```

Renders the outcome as `Success(value)` or `Failure(exception)`, using the exception's own `ToString()`.
