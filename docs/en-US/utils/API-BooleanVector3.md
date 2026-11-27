# BooleanVector3

`io.github.ykysnk.utils.NonUdon` · `public struct BooleanVector3 : IEquatable<BooleanVector3>`

Three independent boolean values kept as plain serializable fields, with a `Flags` view that packs them into a single bitmask for switch-like tests.

Assigning `Flags` rewrites all three components at once, so a component the mask does not name is cleared rather than left alone. The `Add` and `Remove` members change only the bits they name, while `Set` replaces the whole mask.

## x

```csharp
public bool x;
```

Whether the X component is set. It is a plain field, so it can be assigned and serialized on its own.

## y

```csharp
public bool y;
```

Whether the Y component is set.

## z

```csharp
public bool z;
```

Whether the Z component is set.

## Flags

```csharp
public int Flags { get; set; }
```

The three components as a bitmask of `Flag` values. Reading combines the bits of the components that are currently set; assigning overwrites all three, and bits outside `Flag.All` are dropped because they name no component.

```csharp
var vector = new BooleanVector3();
vector.Flags = (int)(BooleanVector3.Flag.X | BooleanVector3.Flag.Z);
```

## HasFlag

```csharp
public bool HasFlag(Flag flag)
```

Whether every bit of `flag` is currently set. `Flag.None` always matches, because it asks for no bits.

## HasFlags

```csharp
public bool HasFlags(params Flag[] flags)
```

Whether every bit covered by `flags` is currently set; the array is reduced to one mask first. An empty array matches everything.

## AddFlag

```csharp
public void AddFlag(Flag flag)
```

Sets the bits of `flag` and leaves the other components untouched.

## AddFlags

```csharp
public void AddFlags(params Flag[] flags)
```

Sets the bits covered by `flags` and leaves the other components untouched. An empty array changes nothing.

## RemoveFlag

```csharp
public void RemoveFlag(Flag flag)
```

Clears the bits of `flag` and leaves the other components untouched.

## RemoveFlags

```csharp
public void RemoveFlags(params Flag[] flags)
```

Clears the bits covered by `flags` and leaves the other components untouched. An empty array changes nothing.

## SetFlag

```csharp
public void SetFlag(Flag flag)
```

Replaces the whole mask with `flag`, so it behaves like an assignment and components it does not name are cleared.

## SetFlags

```csharp
public void SetFlags(params Flag[] flags)
```

Replaces the whole mask with the union of `flags`. An empty array clears all three components.

## Set

```csharp
public void Set(bool x2, bool y2, bool z2)
public void Set(BooleanVector3 other)
```

Assigns all three components in one call; the second overload copies them from `other`, which is read only, so copying onto itself is harmless.

```csharp
var vector = new BooleanVector3();
vector.Set(true, false, true);
```

## SetAll

```csharp
public void SetAll(bool value)
```

Assigns the same value to X, Y and Z.

## Invert

```csharp
public void Invert()
```

Negates every component in place.

## SetX

```csharp
public void SetX(bool value)
```

Assigns the X component only.

## SetY

```csharp
public void SetY(bool value)
```

Assigns the Y component only.

## SetZ

```csharp
public void SetZ(bool value)
```

Assigns the Z component only.

## SetTrue

```csharp
public void SetTrue()
```

Sets all three components, the same as `SetAll(true)`.

## SetFalse

```csharp
public void SetFalse()
```

Clears all three components, the same as `SetAll(false)`.

## True

```csharp
public static BooleanVector3 True { get; }
```

A new vector whose X, Y and Z are all `true`. It is built on every read, so this is a fresh copy rather than a shared instance.

## False

```csharp
public static BooleanVector3 False { get; }
```

A new vector whose X, Y and Z are all `false`, which is the same value as `default`.

## operator !

```csharp
public static BooleanVector3 operator !(BooleanVector3 booleanVector3)
```

Returns a negated copy; the operand is passed by value and is not modified.

## operator true

```csharp
public static bool operator true(BooleanVector3 booleanVector3)
```

`true` only when all three components are set, so a conditional on the vector acts as a three-way AND rather than an "any component set" test.

```csharp
if (vector)
    // only reached when x, y and z are all set
```

## operator false

```csharp
public static bool operator false(BooleanVector3 booleanVector3)
```

`true` whenever at least one component is cleared. The compiler requires it alongside `operator true` whenever the type takes part in `&&` or `||`.

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

Bit selector for one component or a combination of them: `X`, `Y` and `Z` for the single components, `None` for no component, and `All` for the three together. The values are ordinary bits, so they can be combined with `|`.

## Equals

```csharp
public bool Equals(BooleanVector3 other)
public override bool Equals(object? obj)
```

Component-wise equality. The `object` overload returns false for anything that is not a `BooleanVector3`.

## GetHashCode

```csharp
public override int GetHashCode()
```

A hash built from the three components with `HashCode.Combine`, consistent with `Equals`.

## ToString

```csharp
public override string ToString()
```

Renders the components as `BooleanVector3(x:…,y:…,z:…)`, with the values as plain text and no culture-specific formatting involved.
