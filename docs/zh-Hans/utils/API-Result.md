# Result

`io.github.ykysnk.utils.NonUdon` · `public readonly struct Result<T>`

可能失败的操作的结果：要么是值，要么是中止它的异常。

成功标志是显式的，而不是从值推断，因此 `Result<int>` 可以携带真正的 0 并仍然报告成功。构造函数是 private；请用 `Success`、`Failure` 或 [`Try.Run`](./API-Try.md) 创建结果。

## Value

```csharp
public T? Value { get; }
```

委托返回的值本身。失败时为 `T` 的默认值；成功的结果带有 null 值也是允许的，不算错误。

## Exception

```csharp
public Exception? Exception { get; }
```

捕获到的异常，保留原始堆栈跟踪；成功时为 null。

## IsSuccess

```csharp
public bool IsSuccess { get; }
```

调用是否未抛出异常就完成，也就是 `Exception` 是否为 null。

## Success

```csharp
public static Result<T> Success(T value)
```

构建成功的结果，并清除 `Exception`。null 值同样允许，仍算成功。

## Failure

```csharp
public static Result<T> Failure(Exception exception)
```

构建失败的结果，原样携带 `exception`（不展开、不重新抛出），`Value` 设为 `T` 的默认值。

## Deconstruct

```csharp
public void Deconstruct(out bool isSuccess, out T? value, out Exception? exception)
```

把结果拆成三个可读部分，解构赋值调用的就是它。

```csharp
var (success, value, error) = Try.Run(() => int.Parse(text));
```

## operator true

```csharp
public static bool operator true(Result<T> r)
```

报告成功，因此结果可以直接用在条件判断中。

```csharp
if (result)
    Use(result.Value);
```

## operator false

```csharp
public static bool operator false(Result<T> r)
```

报告失败。为了能用于条件判断，编译器要求它与 `true` 运算符一起提供。

## ToString

```csharp
public override string ToString()
```

把结果呈现为 `Success(value)` 或 `Failure(exception)`，异常使用自身的 `ToString()`。
