# Result

`io.github.ykysnk.utils.NonUdon` · `public readonly struct Result<T>`

失敗し得る処理の結果です。値か、その処理を止めた例外のどちらかを持ちます。

成功したかどうかは値から推測せず明示的に保持するため、`Result<int>` は本物の 0 を運びながら成功を報告できます。コンストラクターは private なので、`Success`、`Failure`、または [`Try.Run`](./API-Try.md) で結果を作ります。

## Value

```csharp
public T? Value { get; }
```

デリゲートが返した値そのものです。失敗時は `T` の既定値になります。成功した結果の値が null でも問題なく、エラーではありません。

## Exception

```csharp
public Exception? Exception { get; }
```

捕捉された例外で、元のスタック トレースを保ちます。成功時は null です。

## IsSuccess

```csharp
public bool IsSuccess { get; }
```

呼び出しが例外を投げずに完了したかどうか、つまり `Exception` が null かどうかです。

## Success

```csharp
public static Result<T> Success(T value)
```

`Exception` をクリアした成功の結果を作ります。null の値も許可され、成功として扱われます。

## Failure

```csharp
public static Result<T> Failure(Exception exception)
```

`exception` をそのまま運ぶ失敗の結果を作ります。展開や再スローは行わず、`Value` は `T` の既定値になります。

## Deconstruct

```csharp
public void Deconstruct(out bool isSuccess, out T? value, out Exception? exception)
```

結果を 3 つの読み取り可能な部分に分解します。分解代入が呼ぶのはこれです。

```csharp
var (success, value, error) = Try.Run(() => int.Parse(text));
```

## operator true

```csharp
public static bool operator true(Result<T> r)
```

成功を報告するため、結果をそのまま条件式で使えます。

```csharp
if (result)
    Use(result.Value);
```

## operator false

```csharp
public static bool operator false(Result<T> r)
```

失敗を報告します。条件式で使うため、コンパイラーは `true` 演算子と対でこれを要求します。

## ToString

```csharp
public override string ToString()
```

結果を `Success(value)` または `Failure(exception)` として表します。例外は自身の `ToString()` で文字列化されます。
