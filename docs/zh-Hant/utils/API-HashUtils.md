# HashUtils

`io.github.ykysnk.utils.NonUdon` · `public static class HashUtils`

文字雜湊輔助工具。每個摘要都以小寫十六進位字串傳回，因此結果可以直接比較或作為文字保存。

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

`ComputeHash` 接受的演算法：128 位元 MD5、160 位元 SHA-1、256 位元 SHA-256 與 512 位元 SHA-512。MD5 與 SHA-1 很快，但不具抗碰撞性。

## ComputeHash

```csharp
public static string ComputeHash(string input, HashType type)
public static string ComputeHash<T>(IEnumerable<T> input, HashType type)
```

以 `type` 對 `input` 的 UTF-8 位元組做雜湊。泛型多載先用 `|` 連接項目再雜湊該文字，這正是 [`ListString`](#liststring) 產生的形式；由於分隔符號不做轉義，同一段文字的不同切分會產生相同摘要，因此它適合做快取鍵而不是簽章。摘要是小寫十六進位，每個位元組兩個字元——MD5 為 32 個字元，SHA-512 為 128 個字元。null 字串會被 `Encoding.UTF8` 拒絕，`HashType` 之外的值會擲回 `ArgumentException`。

```csharp
var digest = HashUtils.ComputeHash("hello", HashUtils.HashType.SHA256);
```

## ListString

```csharp
public static string ListString<T>(this IEnumerable<T> enumerable)
```

依列舉順序用 `|` 連接項目，不做轉義。這正是 `ComputeHash` 所雜湊的文字形式，因此在需要檢視或比較連接結果時很有用。
