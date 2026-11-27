# Unit

`io.github.ykysnk.utils.NonUdon` · `public readonly struct Unit : IEquatable<Unit>`

在需要型別參數的地方代替 `void`，因此沒有傳回值的作業也能產生 [`Result`](./API-Result.md)。

所有執行個體都相等，因此成功的 `Result<Unit>` 除了成功旗標之外不攜帶任何資訊。

## Value

```csharp
public static readonly Unit Value;
```

沒有傳回值的呼叫成功時用於傳回的執行個體。

## TaskValue

```csharp
public static readonly Task<Unit> TaskValue;
```

攜帶 `Value` 的已完成工作，供需要 `Task<Unit>` 的 API 使用。

## Equals

```csharp
public bool Equals(Unit other)
public override bool Equals(object? obj)
```

對另一個 `Unit` 永遠為 true，因為每個執行個體都表示同一個空值；`object` 多載對任何其他型別傳回 false。

## GetHashCode

```csharp
public override int GetHashCode()
```

永遠為 0，因為所有執行個體都相等。

## ToString

```csharp
public override string ToString()
```

傳回常數名稱 `Unit`。

## operator ==

```csharp
public static bool operator ==(Unit left, Unit right)
```

比較兩個執行個體，它們永遠相等，因此結果永遠為 true。

## operator !=

```csharp
public static bool operator !=(Unit left, Unit right)
```

比較兩個執行個體，它們永遠不會不相等，因此結果永遠為 false。
