# DictionaryWrapper

`io.github.ykysnk.utils.NonUdon` · `public sealed class DictionaryWrapper<TKey, TValue> : IReadOnlyDictionary<TKey, TValue>`

辞書状のデータを 2 つの並列リストとして保存するクラスです。Unity はリストはシリアライズできますが、`Dictionary<TKey, TValue>` はシリアライズできません。

検索は `keys` を線形に走査するため、この型は高速な処理ではなく、シリアライズを生き残る必要がある小さなコレクション向けです。シリアライズ済みのデータや手で編集したデータでは `keys` と `values` の長さが揃わないことがあり、それを修復したり検証したりするメンバーはありません。コンストラクターは internal なので、[`Wrapper.Create`](./API-Wrapper.md) か、辞書からの暗黙の変換でインスタンスを作ります。

## keys

```csharp
public List<TKey> keys;
```

保存順のキーです。各キーの値は `values` の同じインデックスにあります。

## values

```csharp
public List<TValue> values;
```

`keys` と揃えた値です。逆シリアライズや手編集の後では 2 つのリストの長さが違うことがあり、それを修復するメンバーはありません。`values` の末尾を越えて読むと、他のリストアクセスと同じように失敗します。

## Count

```csharp
public int Count { get; }
```

エントリー数で、値がいくつ保存されているかに関係なく `keys` から取ります。

## TryGetValue

```csharp
public bool TryGetValue(TKey key, out TValue value)
```

`keys` を走査してキーを探し、そのインデックスの値を読み取ります。キーがない場合は false を返し、`value` には `TValue` の既定値を設定します。

```csharp
if (map.TryGetValue("tint", out var tint))
    Apply(tint);
```

## this[TKey key]

```csharp
public TValue this[TKey key] { get; }
```

`key` に対応する値です。キーが重複している場合は最初の一致を使います。キーが保存されていない場合は `KeyNotFoundException` をスローします。

## Keys

```csharp
public IEnumerable<TKey> Keys { get; }
```

保存順のキーです。コピーではなく `keys` リストそのものを返すため、そこへの変更はここにも反映されます。

## Values

```csharp
public IEnumerable<TValue> Values { get; }
```

保存順の値です。コピーではなく `values` リストそのものを返すため、そこへの変更はここにも反映されます。

## GetEnumerator

```csharp
public IEnumerator<KeyValuePair<TKey, TValue>> GetEnumerator()
IEnumerator IEnumerable.GetEnumerator()
```

各キーを同じインデックスの値と組み合わせます。ペアは列挙子が進むたびに作られるため、リストを走査しながら読み取ります。明示的なインターフェース実装はジェネリック版に転送されます。

## ContainsKey

```csharp
public bool ContainsKey(TKey key)
```

`keys` に `key` が含まれるかどうかです。比較には `TKey` の既定の等値比較子を使います。

## ContainsValue

```csharp
public bool ContainsValue(TValue value)
```

`values` に `value` が含まれるかどうかです。比較には `TValue` の既定の等値比較子を使い、そのインデックスのキーが有効かどうかには依存しません。

## ToDictionary

```csharp
public Dictionary<TKey, TValue> ToDictionary()
```

ペアを新しい辞書にコピーします。辞書は `Count` の大きさで作られ、リストの順に詰められます。どちら側への変更も共有されず、`keys` で重複するキーは最後の値にまとまります。

## implicit operator Dictionary

```csharp
public static implicit operator Dictionary<TKey, TValue>(DictionaryWrapper<TKey, TValue> wrapper)
```

`ToDictionary` と同じくコピーして変換します。ラッパーは変更されません。

## implicit operator DictionaryWrapper

```csharp
public static implicit operator DictionaryWrapper<TKey, TValue>(Dictionary<TKey, TValue> dictionary)
```

辞書を新しいラッパーにコピーします。キーと値は辞書の列挙順になります。辞書を参照として保持しないため、後から辞書を変更してもラッパーには影響しません。
