# HashUtils

`io.github.ykysnk.utils.NonUdon` · `public static class HashUtils`

Text hashing helpers. Every digest comes back as a lowercase hexadecimal string, so results can be compared or stored as plain text.

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

The algorithms `ComputeHash` accepts: 128-bit MD5, 160-bit SHA-1, 256-bit SHA-256 and 512-bit SHA-512. MD5 and SHA-1 are fast but not collision resistant.

## ComputeHash

```csharp
public static string ComputeHash(string input, HashType type)
public static string ComputeHash<T>(IEnumerable<T> input, HashType type)
```

Hashes the UTF-8 bytes of `input` with `type`. The generic overload joins the items with `|` and hashes that text, which is the same form [`ListString`](#liststring) produces; because the separator is not escaped, two different splits of the same text give the same digest, so it suits cache keys rather than signatures. The digest is lowercase hexadecimal with two characters per byte — 32 characters for MD5 and 128 for SHA-512. A null string is rejected by `Encoding.UTF8`, and a value outside `HashType` throws `ArgumentException`.

```csharp
var digest = HashUtils.ComputeHash("hello", HashUtils.HashType.SHA256);
```

## ListString

```csharp
public static string ListString<T>(this IEnumerable<T> enumerable)
```

Joins the items with `|` and no escaping, in enumeration order. This is the text form `ComputeHash` hashes, so it is useful when the joined string has to be inspected or compared.
