# HashUtils

`io.github.ykysnk.utils.NonUdon` · `public static class HashUtils`

文本哈希辅助工具。每个摘要都以小写十六进制字符串返回，因此结果可以直接比较或作为文本保存。

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

`ComputeHash` 接受的算法：128 位 MD5、160 位 SHA-1、256 位 SHA-256 和 512 位 SHA-512。MD5 与 SHA-1 很快，但不具备抗碰撞性。

## ComputeHash

```csharp
public static string ComputeHash(string input, HashType type)
public static string ComputeHash<T>(IEnumerable<T> input, HashType type)
```

用 `type` 对 `input` 的 UTF-8 字节做哈希。泛型重载先把项目用 `|` 连接再哈希该文本，这正是 [`ListString`](#liststring) 产生的形式；由于分隔符不做转义，同一段文本的不同切分会产生相同摘要，因此它适合做缓存键而不是签名。摘要是小写十六进制，每字节两个字符——MD5 为 32 个字符，SHA-512 为 128 个字符。null 字符串会被 `Encoding.UTF8` 拒绝，`HashType` 之外的值会抛出 `ArgumentException`。

```csharp
var digest = HashUtils.ComputeHash("hello", HashUtils.HashType.SHA256);
```

## ListString

```csharp
public static string ListString<T>(this IEnumerable<T> enumerable)
```

按枚举顺序用 `|` 连接项目，不做转义。这正是 `ComputeHash` 所哈希的文本形式，因此在需要查看或比较连接结果时很有用。
