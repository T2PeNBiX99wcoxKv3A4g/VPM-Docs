# HashUtils

`io.github.ykysnk.utils.NonUdon` · `public static class HashUtils`

テキストのハッシュ用ヘルパーです。ダイジェストはすべて小文字の 16 進文字列で返るため、そのまま比較したりテキストとして保存したりできます。

## HashType

```csharp
public enum HashType
{
    MD5,
    SHA1,
    SHA256,
    SHA512
}
```

`ComputeHash` が受け付けるアルゴリズムです。128 ビットの MD5、160 ビットの SHA-1、256 ビットの SHA-256、512 ビットの SHA-512 があります。MD5 と SHA-1 は高速ですが、衝突耐性はありません。

## ComputeHash

```csharp
public static string ComputeHash(string input, HashType type)
public static string ComputeHash<T>(IEnumerable<T> input, HashType type)
```

`input` の UTF-8 バイト列を `type` でハッシュします。ジェネリック版は項目を `|` で連結したテキストをハッシュし、これは [`ListString`](#liststring) が作る形式と同じです。区切り文字はエスケープされないため、同じテキストを別の位置で分割しても同じダイジェストになり、署名ではなくキャッシュキーに向いています。ダイジェストは 1 バイトあたり 2 文字の小文字 16 進表記で、MD5 は 32 文字、SHA-512 は 128 文字になります。null の文字列は `Encoding.UTF8` に拒否され、`HashType` の範囲外の値は `ArgumentException` をスローします。

```csharp
var digest = HashUtils.ComputeHash("hello", HashUtils.HashType.SHA256);
```

## ListString

```csharp
public static string ListString<T>(this IEnumerable<T> enumerable)
```

項目を列挙順に、エスケープなしで `|` で連結します。`ComputeHash` がハッシュするテキスト形式そのものなので、連結結果を確認したり比較したりしたいときに使えます。
