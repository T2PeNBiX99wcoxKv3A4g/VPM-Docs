# Result

`io.github.ykysnk.utils.NonUdon` · `public readonly struct Result<T>`

可能失敗的作業結果：不是值，就是中止它的例外。

成功旗標是明確保存的，而不是從值推斷，因此 `Result<int>` 可以攜帶真正的 0 並仍然回報成功。建構函式是 private；請用 `Success`、`Failure` 或 [`Try.Run`](./API-Try.md) 建立結果。

## Value

```csharp
public T? Value { get; }
```

委派傳回的值本身。失敗時為 `T` 的預設值；成功的結果帶有 null 值也是允許的，不算錯誤。

## Exception

```csharp
public Exception? Exception { get; }
```

擷取到的例外，保留原始堆疊追蹤；成功時為 null。

## IsSuccess

```csharp
public bool IsSuccess { get; }
```

呼叫是否未擲回例外就完成，也就是 `Exception` 是否為 null。

## Success

```csharp
public static Result<T> Success(T value)
```

建構成功的結果，並清除 `Exception`。null 值同樣允許，仍算成功。

## Failure

```csharp
public static Result<T> Failure(Exception exception)
```

建構失敗的結果，原樣攜帶 `exception`（不展開、不重新擲回），`Value` 設為 `T` 的預設值。

## Deconstruct

```csharp
public void Deconstruct(out bool isSuccess, out T? value, out Exception? exception)
```

把結果拆成三個可讀部分，解構指派呼叫的就是它。

```csharp
var (success, value, error) = Try.Run(() => int.Parse(text));
```

## operator true

```csharp
public static bool operator true(Result<T> r)
```

回報成功，因此結果可以直接用在條件判斷中。

```csharp
if (result)
    Use(result.Value);
```

## operator false

```csharp
public static bool operator false(Result<T> r)
```

回報失敗。為了能用於條件判斷，編譯器要求它與 `true` 運算子一起提供。

## ToString

```csharp
public override string ToString()
```

把結果呈現為 `Success(value)` 或 `Failure(exception)`，例外使用自身的 `ToString()`。
