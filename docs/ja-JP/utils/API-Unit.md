# Unit

`io.github.ykysnk.utils.NonUdon` · `public readonly struct Unit : IEquatable<Unit>`

型引数が必要な場所で `void` の代わりに使う構造体です。戻り値のない処理でも [`Result`](./API-Result.md) を返せます。

すべてのインスタンスが等しいと判定されるため、成功した `Result<Unit>` は成功したという事実以外の情報を持ちません。

## Value

```csharp
public static readonly Unit Value;
```

値を返さない呼び出しが成功したときに返すインスタンスです。

## TaskValue

```csharp
public static readonly Task<Unit> TaskValue;
```

`Value` を運ぶ完了済みのタスクで、`Task<Unit>` を求める API 向けです。

## Equals

```csharp
public bool Equals(Unit other)
public override bool Equals(object? obj)
```

別の `Unit` に対しては常に true です。どのインスタンスも同じ空の値を表すためです。`object` を取るオーバーロードは、他の型に対して false を返します。

## GetHashCode

```csharp
public override int GetHashCode()
```

すべてのインスタンスが等しいため、常に 0 です。

## ToString

```csharp
public override string ToString()
```

定数名 `Unit` を返します。

## operator ==

```csharp
public static bool operator ==(Unit left, Unit right)
```

2 つのインスタンスを比較します。常に等しいため、結果は常に true です。

## operator !=

```csharp
public static bool operator !=(Unit left, Unit right)
```

2 つのインスタンスを比較します。等しくならないことはないため、結果は常に false です。
