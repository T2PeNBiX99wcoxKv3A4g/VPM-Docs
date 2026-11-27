# BooleanVector3

`io.github.ykysnk.utils.NonUdon` · `public struct BooleanVector3 : IEquatable<BooleanVector3>`

3 つの独立した bool 値を、そのままシリアライズできるフィールドとして持つ構造体です。`Flags` ビューを使うと、それらを 1 つのビットマスクにまとめて switch のような判定に使えます。

`Flags` への代入は 3 つのコンポーネントをまとめて書き換えるため、マスクに含まれないコンポーネントはそのまま残らずクリアされます。`Add` と `Remove` のメンバーは指定したビットだけを変え、`Set` はマスク全体を置き換えます。

## x

```csharp
public bool x;
```

X コンポーネントが設定されているかどうかです。通常のフィールドなので、単独で代入したりシリアライズしたりできます。

## y

```csharp
public bool y;
```

Y コンポーネントが設定されているかどうかです。

## z

```csharp
public bool z;
```

Z コンポーネントが設定されているかどうかです。

## Flags

```csharp
public int Flags { get; set; }
```

3 つのコンポーネントを `Flag` 値のビットマスクとして表します。読み取りは現在設定されているコンポーネントのビットを合成し、代入は 3 つすべてを上書きします。`Flag.All` の外側のビットはどのコンポーネントも指さないため破棄されます。

```csharp
var vector = new BooleanVector3();
vector.Flags = (int)(BooleanVector3.Flag.X | BooleanVector3.Flag.Z);
```

## HasFlag

```csharp
public bool HasFlag(Flag flag)
```

`flag` のすべてのビットが現在設定されているかどうかです。`Flag.None` はビットを要求しないため、常に一致します。

## HasFlags

```csharp
public bool HasFlags(params Flag[] flags)
```

`flags` が含むすべてのビットが現在設定されているかどうかです。配列はまず 1 つのマスクにまとめられます。空の配列はすべてに一致します。

## AddFlag

```csharp
public void AddFlag(Flag flag)
```

`flag` のビットを設定し、他のコンポーネントは変更しません。

## AddFlags

```csharp
public void AddFlags(params Flag[] flags)
```

`flags` が含むビットを設定し、他のコンポーネントは変更しません。空の配列では何も変わりません。

## RemoveFlag

```csharp
public void RemoveFlag(Flag flag)
```

`flag` のビットをクリアし、他のコンポーネントは変更しません。

## RemoveFlags

```csharp
public void RemoveFlags(params Flag[] flags)
```

`flags` が含むビットをクリアし、他のコンポーネントは変更しません。空の配列では何も変わりません。

## SetFlag

```csharp
public void SetFlag(Flag flag)
```

マスク全体を `flag` に置き換えます。代入と同じ動作なので、含まれないコンポーネントはクリアされます。

## SetFlags

```csharp
public void SetFlags(params Flag[] flags)
```

マスク全体を `flags` の和集合に置き換えます。空の配列は 3 つのコンポーネントすべてをクリアします。

## Set

```csharp
public void Set(bool x2, bool y2, bool z2)
public void Set(BooleanVector3 other)
```

3 つのコンポーネントを 1 回の呼び出しで代入します。2 番目のオーバーロードは `other` からコピーします。`other` は読み取り専用なので、自分自身へのコピーも問題ありません。

```csharp
var vector = new BooleanVector3();
vector.Set(true, false, true);
```

## SetAll

```csharp
public void SetAll(bool value)
```

X、Y、Z に同じ値を代入します。

## Invert

```csharp
public void Invert()
```

すべてのコンポーネントをその場で反転します。

## SetX

```csharp
public void SetX(bool value)
```

X コンポーネントだけを代入します。

## SetY

```csharp
public void SetY(bool value)
```

Y コンポーネントだけを代入します。

## SetZ

```csharp
public void SetZ(bool value)
```

Z コンポーネントだけを代入します。

## SetTrue

```csharp
public void SetTrue()
```

3 つのコンポーネントをすべて設定します。`SetAll(true)` と同じです。

## SetFalse

```csharp
public void SetFalse()
```

3 つのコンポーネントをすべてクリアします。`SetAll(false)` と同じです。

## True

```csharp
public static BooleanVector3 True { get; }
```

X、Y、Z がすべて `true` の新しいベクトルです。読み取りのたびに生成されるため、共有インスタンスではなく毎回新しいコピーになります。

## False

```csharp
public static BooleanVector3 False { get; }
```

X、Y、Z がすべて `false` の新しいベクトルです。`default` と同じ値です。

## operator !

```csharp
public static BooleanVector3 operator !(BooleanVector3 booleanVector3)
```

反転したコピーを返します。オペランドは値渡しなので変更されません。

## operator true

```csharp
public static bool operator true(BooleanVector3 booleanVector3)
```

3 つのコンポーネントがすべて設定されているときだけ `true` になります。そのためベクトルに対する条件判定は「どれか 1 つでも設定されているか」ではなく、3 方向の AND として働きます。

```csharp
if (vector)
    // only reached when x, y and z are all set
```

## operator false

```csharp
public static bool operator false(BooleanVector3 booleanVector3)
```

少なくとも 1 つのコンポーネントがクリアされているときに `true` になります。`&&` や `||` にこの型が関与する場合、コンパイラーは `operator true` と対でこれを要求します。

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

1 つのコンポーネント、またはそれらの組み合わせを指すビット選択子です。単一のコンポーネントには `X`、`Y`、`Z`、どのコンポーネントも指さない場合は `None`、3 つまとめては `All` です。値は通常のビットなので `|` で組み合わせられます。

## Equals

```csharp
public bool Equals(BooleanVector3 other)
public override bool Equals(object? obj)
```

コンポーネントごとの等値判定です。`object` を取るオーバーロードは、`BooleanVector3` 以外の型に対して false を返します。

## GetHashCode

```csharp
public override int GetHashCode()
```

`HashCode.Combine` で 3 つのコンポーネントから作るハッシュ値で、`Equals` と整合します。

## ToString

```csharp
public override string ToString()
```

コンポーネントを `BooleanVector3(x:…,y:…,z:…)` として表します。値はそのままのテキストで、カルチャー依存の書式は使われません。
