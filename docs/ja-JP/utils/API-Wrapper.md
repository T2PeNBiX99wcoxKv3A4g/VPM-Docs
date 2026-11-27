# Wrapper

`io.github.ykysnk.utils.NonUdon` · `public static class Wrapper`

シリアライズ可能なラッパーへの入口です。[`ListWrapper`](./API-ListWrapper.md) と [`DictionaryWrapper`](./API-DictionaryWrapper.md) は、Unity が辞書やインターフェース型のメンバーを直接シリアライズできないために存在します。

これらのコンストラクターは internal なので、利用側はここか、それらの型の暗黙の変換からインスタンスを取得します。どちらのメンバーも元のコレクションをコピーし、参照として保持することはありません。

## Create

```csharp
public static ListWrapper<T> Create<T>(IEnumerable<T> source)
public static DictionaryWrapper<TK, TV> Create<TK, TV>(IDictionary<TK, TV> source)
```

`source` を新しいラッパーにコピーします。リスト版は列挙順のまま項目を保持し、辞書版はキーと値を取り込んで内部の 2 つのリストを互いに揃えます。`source` が null の場合は、内部のリストを作る際に例外がスローされます。

```csharp
var names = Wrapper.Create(new[] { "a", "b" });
```
