# ListWrapper

`io.github.ykysnk.utils.NonUdon` · `public sealed class ListWrapper<T> : IReadOnlyList<T>`

シリアライズされるフィールド 1 つでリストを表すクラスです。`IReadOnlyList<T>` などのインターフェース型のメンバーでも、Unity が保存しインスペクターに表示できる実体を持てます。

コンストラクターは internal です。[`Wrapper.Create`](./API-Wrapper.md) を使うか、暗黙の変換で `List<T>` を代入してインスタンスを作ります。追加や削除のメンバーはなく読み取り専用なので、変更は `items` リストを通して行います。

## items

```csharp
public List<T> items;
```

保存されている項目を順序どおりに持ちます。ラッパーのシリアライズ対象はこのフィールドだけなので、インスペクターに表示され編集されるのもこのリストです。

## Count

```csharp
public int Count { get; }
```

保存されている項目数、つまり `items` の長さです。

## this[int index]

```csharp
public T this[int index] { get; }
```

`index` にある項目を内部リストから読み取ります。範囲外のインデックスは、内部リストと同じように失敗します。

```csharp
var first = wrapper[0];
```

## GetEnumerator

```csharp
public IEnumerator<T> GetEnumerator()
IEnumerator IEnumerable.GetEnumerator()
```

`items` をコピーせずにそのまま列挙します。明示的なインターフェース実装はジェネリック版に転送され、`foreach` が使うのはこちらです。

## Contains

```csharp
public bool Contains(T item)
```

`items` に `item` が含まれるかどうかです。比較には `T` の既定の等値比較子を使います。

## implicit operator List

```csharp
public static implicit operator List<T>(ListWrapper<T> wrapper)
```

内部リストそのものを返します。コピーではないので、返されたリストへの変更はラッパーにも反映されます。

## implicit operator ListWrapper

```csharp
public static implicit operator ListWrapper<T>(List<T> list)
```

リストを新しいラッパーにコピーします。そのため、後から `list` を変更してもこちらには影響しません。list が null の場合は、内部リストを作る際に例外がスローされます。
