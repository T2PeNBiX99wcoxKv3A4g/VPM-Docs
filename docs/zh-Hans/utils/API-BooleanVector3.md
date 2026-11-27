# BooleanVector3

`io.github.ykysnk.utils.NonUdon` · `public struct BooleanVector3 : IEquatable<BooleanVector3>`

三个独立的 bool 值以可直接序列化的字段保存，并通过 `Flags` 视图把它们打包成一个位掩码，便于做类似 switch 的判断。

给 `Flags` 赋值会同时改写三个分量，因此掩码未包含的分量会被清除，而不是保持原样。`Add` 与 `Remove` 成员只改动它们指定的位，而 `Set` 会替换整个掩码。

## x

```csharp
public bool x;
```

X 分量是否已设置。它是普通字段，可以单独赋值和序列化。

## y

```csharp
public bool y;
```

Y 分量是否已设置。

## z

```csharp
public bool z;
```

Z 分量是否已设置。

## Flags

```csharp
public int Flags { get; set; }
```

把三个分量表示为 `Flag` 值的位掩码。读取时合成当前已设置分量的位；赋值会覆盖全部三个分量，`Flag.All` 之外的位不指向任何分量，因此会被丢弃。

```csharp
var vector = new BooleanVector3();
vector.Flags = (int)(BooleanVector3.Flag.X | BooleanVector3.Flag.Z);
```

## HasFlag

```csharp
public bool HasFlag(Flag flag)
```

`flag` 的每一位是否都已设置。`Flag.None` 不要求任何位，因此始终匹配。

## HasFlags

```csharp
public bool HasFlags(params Flag[] flags)
```

`flags` 覆盖的每一位是否都已设置；数组会先合并成一个掩码。空数组匹配一切。

## AddFlag

```csharp
public void AddFlag(Flag flag)
```

设置 `flag` 的位，其余分量保持不变。

## AddFlags

```csharp
public void AddFlags(params Flag[] flags)
```

设置 `flags` 覆盖的位，其余分量保持不变。空数组不会产生任何改变。

## RemoveFlag

```csharp
public void RemoveFlag(Flag flag)
```

清除 `flag` 的位，其余分量保持不变。

## RemoveFlags

```csharp
public void RemoveFlags(params Flag[] flags)
```

清除 `flags` 覆盖的位，其余分量保持不变。空数组不会产生任何改变。

## SetFlag

```csharp
public void SetFlag(Flag flag)
```

用 `flag` 替换整个掩码，因此行为等同赋值，未包含的分量会被清除。

## SetFlags

```csharp
public void SetFlags(params Flag[] flags)
```

用 `flags` 的并集替换整个掩码。空数组会清除全部三个分量。

## Set

```csharp
public void Set(bool x2, bool y2, bool z2)
public void Set(BooleanVector3 other)
```

一次调用赋值全部三个分量；第二个重载从 `other` 复制，`other` 只被读取，因此复制到自身也没有问题。

```csharp
var vector = new BooleanVector3();
vector.Set(true, false, true);
```

## SetAll

```csharp
public void SetAll(bool value)
```

把同一个值赋给 X、Y 和 Z。

## Invert

```csharp
public void Invert()
```

就地反转每个分量。

## SetX

```csharp
public void SetX(bool value)
```

只赋值 X 分量。

## SetY

```csharp
public void SetY(bool value)
```

只赋值 Y 分量。

## SetZ

```csharp
public void SetZ(bool value)
```

只赋值 Z 分量。

## SetTrue

```csharp
public void SetTrue()
```

设置全部三个分量，等同 `SetAll(true)`。

## SetFalse

```csharp
public void SetFalse()
```

清除全部三个分量，等同 `SetAll(false)`。

## True

```csharp
public static BooleanVector3 True { get; }
```

X、Y、Z 全为 `true` 的新向量。每次读取都会新建，因此这是全新的副本，而不是共享实例。

## False

```csharp
public static BooleanVector3 False { get; }
```

X、Y、Z 全为 `false` 的新向量，与 `default` 的值相同。

## operator !

```csharp
public static BooleanVector3 operator !(BooleanVector3 booleanVector3)
```

返回取反后的副本；操作数按值传入，不会被修改。

## operator true

```csharp
public static bool operator true(BooleanVector3 booleanVector3)
```

仅当三个分量都已设置时为 `true`，因此对向量做条件判断相当于三路 AND，而不是「任一分量已设置」的测试。

```csharp
if (vector)
    // only reached when x, y and z are all set
```

## operator false

```csharp
public static bool operator false(BooleanVector3 booleanVector3)
```

只要有一个分量被清除就为 `true`。当该类型参与 `&&` 或 `||` 时，编译器要求它与 `operator true` 一起提供。

## Flag

```csharp
public enum Flag
{
    X = 1 << 0,
    Y = 1 << 1,
    Z = 1 << 2,
    None = 0,
    All = X | Y | Z
}
```

用于选择一个分量或它们组合的位选择器：`X`、`Y`、`Z` 表示单个分量，`None` 表示没有分量，`All` 表示三者一起。取值就是普通的位，因此可以用 `|` 组合。

## Equals

```csharp
public bool Equals(BooleanVector3 other)
public override bool Equals(object? obj)
```

逐分量比较相等。`object` 重载对任何非 `BooleanVector3` 类型返回 false。

## GetHashCode

```csharp
public override int GetHashCode()
```

用 `HashCode.Combine` 从三个分量构建的哈希值，与 `Equals` 保持一致。

## ToString

```csharp
public override string ToString()
```

把分量呈现为 `BooleanVector3(x:…,y:…,z:…)`，值以纯文本写出，不涉及区域设置相关的格式化。
