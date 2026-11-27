# Runtime

The package ships three assemblies. Everything listed below is public; obsolete members are included because they still
compile.

| Assembly                          | Namespace                                              | Contents                                                |
|-----------------------------------|--------------------------------------------------------|---------------------------------------------------------|
| `io.github.ykysnk.utils`          | `io.github.ykysnk.utils`                               | `Utils`, `IUtilsEditorOnly`, `BasicEditorComponent`     |
| `io.github.ykysnk.utils.non-udon` | `io.github.ykysnk.utils.NonUdon`                       | `BooleanVector3`, `ColorHex`                            |
| `io.github.ykysnk.utils.Editor`   | `io.github.ykysnk.utils.Editor` and its sub-namespaces | Inspector base, GUI helpers, menus, UPM client, drawers |

## Utils

`io.github.ykysnk.utils` · `public static class Utils`

Small helpers that are safe to call from Udon: logging with a coloured prefix and a few state checks.

The prefix is drawn as `[prefix]` in `#D771C0`. Every logging and assertion member carries `[HideInCallstack]`, so the
console entry points at the caller instead of this file.

### Log(string prefix, object message)

```csharp
public static void Log(string prefix, object message)
```

Writes `[prefix] message` with `Debug.Log`. `prefix` is the coloured part; a null `message` logs an empty value.

```csharp
Utils.Log(nameof(MyWindow), "Opened");
```

### Log(string prefix, object message, Object context)

```csharp
public static void Log(string prefix, object message, UnityEngine.Object context)
```

Same as the two-argument overload, with `context` highlighted when the console entry is clicked.

### LogWarning(string prefix, object message)

```csharp
public static void LogWarning(string prefix, object message)
```

Writes the prefixed message with `Debug.LogWarning`.

### LogWarning(string prefix, object message, Object context)

```csharp
public static void LogWarning(string prefix, object message, UnityEngine.Object context)
```

Warning overload that highlights `context` when the console entry is clicked.

### LogError(string prefix, object message)

```csharp
public static void LogError(string prefix, object message)
```

Writes the prefixed message with `Debug.LogError`.

### LogError(string prefix, object message, Object context)

```csharp
public static void LogError(string prefix, object message, UnityEngine.Object context)
```

Error overload that highlights `context` when the console entry is clicked.

### LogAssert(bool condition, string prefix, object message)

```csharp
[Obsolete("Use Assert(bool condition, string prefix, object message) instead")]
public static void LogAssert(bool condition, string prefix, object message)
```

Kept for compatibility; it only forwards to `Debug.Assert` with the prefixed message. Use `Assert` instead.

### LogAssert(bool condition, string prefix, object message, Object context)

```csharp
[Obsolete("Use Assert(bool condition, string prefix, object message, Object context) instead")]
public static void LogAssert(bool condition, string prefix, object message, UnityEngine.Object context)
```

Kept for compatibility; use `Assert` instead.

### Assert(bool condition, string prefix, object message)

```csharp
public static void Assert(bool condition, string prefix, object message)
```

Asserts `condition` through `Debug.Assert`, reporting the message with the coloured prefix when it fails.

```csharp
Utils.Assert(path != null, nameof(MyWindow), "Path must be set");
```

### Assert(bool condition, string prefix, object message, Object context)

```csharp
public static void Assert(bool condition, string prefix, object message, UnityEngine.Object context)
```

Same as the three-argument overload, with `context` highlighted when the console entry is clicked.

### IsMoved(float value)

```csharp
public static bool IsMoved(float value)
```

Whether a per-frame delta counts as movement: `value < -0.05f || value > 0.05f`. The threshold is strict, so a delta of
exactly `0.05f` is not movement.

### IsInPrefab2()

```csharp
public static bool IsInPrefab2()
```

Whether the editor is in prefab editing mode. Always false in the player. This is the name that is safe inside Udon.

### IsPlaying2()

```csharp
public static bool IsPlaying2()
```

Whether play mode is active or about to start. Always true in the player. This is the name that is safe inside Udon.

### IsInPrefab

```csharp
public static bool IsInPrefab { get; }
```

Property form of `IsInPrefab2`. Not compiled when `COMPILER_UDONSHARP` is defined, because it relies on
`PrefabStageUtility`.

### IsPlaying

```csharp
public static bool IsPlaying { get; }
```

Property form of `IsPlaying2`. Not compiled when `COMPILER_UDONSHARP` is defined, because it relies on
`EditorApplication`.

### ToLayer(LayerMask mask)

```csharp
public static int ToLayer(LayerMask mask)
```

Returns the layer index of a single-layer mask, i.e. the position of its highest set bit. A mask of zero returns 31,
which is what the bit walk produces.

```csharp
var layer = Utils.ToLayer(LayerMask.GetMask("Water"));
```

## IUtilsEditorOnly

`io.github.ykysnk.utils` · `public interface IUtilsEditorOnly`

Marker interface for behaviours that should be stripped from the build. It declares no members; it extends
`nadena.dev.ndmf.INDMFEditorOnly` when `UTILS_NDMF` is defined, `VRC.SDKBase.IEditorOnly` when `UTILS_VRC_SDK3_BASE` is
defined, and is an empty marker otherwise.

## BasicEditorComponent

`io.github.ykysnk.utils` · `public abstract class BasicEditorComponent : MonoBehaviour, IUtilsEditorOnly`

Empty base class for helper behaviours that must not survive into the uploaded avatar or world. It adds no members of
its own; derive from it and the build pipeline removes the component through `IUtilsEditorOnly`.

## BooleanVector3

`io.github.ykysnk.utils.NonUdon` · `public struct BooleanVector3 : IEquatable<BooleanVector3>`

Three independent boolean values kept as plain serializable fields, with a `Flags` view that packs them into a single
bitmask for switch-like tests.

### x, y, z

```csharp
public bool x;
public bool y;
public bool z;
```

Whether the X, Y and Z component is set.

### Flags

```csharp
public int Flags { get; set; }
```

The three components as a mask of `Flag` values. Assigning a mask overwrites all three components, so a component the
mask does not name is cleared. Bits outside `Flag.All` are dropped on assignment.

### Flag

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

Bit selector for one component or a combination of them.

### HasFlag(Flag flag)

```csharp
public bool HasFlag(Flag flag)
```

Whether every bit of `flag` is currently set. `Flag.None` always matches.

### HasFlags(params Flag[] flags)

```csharp
public bool HasFlags(params Flag[] flags)
```

Whether every bit covered by `flags` is set. An empty array matches everything.

### AddFlag(Flag flag)

```csharp
public void AddFlag(Flag flag)
```

Sets the bits of `flag` and leaves the other components untouched.

### AddFlags(params Flag[] flags)

```csharp
public void AddFlags(params Flag[] flags)
```

Sets the bits covered by `flags` and leaves the other components untouched. An empty array changes nothing.

### RemoveFlag(Flag flag)

```csharp
public void RemoveFlag(Flag flag)
```

Clears the bits of `flag` and leaves the other components untouched.

### RemoveFlags(params Flag[] flags)

```csharp
public void RemoveFlags(params Flag[] flags)
```

Clears the bits covered by `flags` and leaves the other components untouched. An empty array changes nothing.

### SetFlag(Flag flag)

```csharp
public void SetFlag(Flag flag)
```

Replaces the whole mask with `flag`, so components it does not name are cleared.

### SetFlags(params Flag[] flags)

```csharp
public void SetFlags(params Flag[] flags)
```

Replaces the whole mask with the union of `flags`. An empty array clears all three components.

### Set(bool x2, bool y2, bool z2)

```csharp
public void Set(bool x2, bool y2, bool z2)
```

Assigns all three components in one call.

### Set(BooleanVector3 other)

```csharp
public void Set(BooleanVector3 other)
```

Copies all three components from `other`.

### SetAll(bool value)

```csharp
public void SetAll(bool value)
```

Assigns the same value to X, Y and Z.

### Invert()

```csharp
public void Invert()
```

Negates every component in place.

### SetX(bool value), SetY(bool value), SetZ(bool value)

```csharp
public void SetX(bool value)
public void SetY(bool value)
public void SetZ(bool value)
```

Assigns a single component.

### SetTrue(), SetFalse()

```csharp
public void SetTrue()
public void SetFalse()
```

`SetAll(true)` and `SetAll(false)`.

### True, False

```csharp
public static BooleanVector3 True { get; }
public static BooleanVector3 False { get; }
```

New vectors with all three components set, or all three cleared.

### ToString()

```csharp
public override string ToString()
```

Renders `BooleanVector3(x:…,y:…,z:…)`.

### operator !(BooleanVector3)

```csharp
public static BooleanVector3 operator !(BooleanVector3 booleanVector3)
```

Returns a negated copy; the operand is passed by value and not modified.

### operator true, operator false

```csharp
public static bool operator true(BooleanVector3 booleanVector3)
public static bool operator false(BooleanVector3 booleanVector3)
```

`true` only when all three components are set, so `if (vector)` is a three-way AND. `false` when at least one component
is cleared; the compiler requires it alongside `operator true` for `&&` and `||`.

### Equals(BooleanVector3), Equals(object), GetHashCode()

```csharp
public bool Equals(BooleanVector3 other)
public override bool Equals(object? obj)
public override int GetHashCode()
```

Component-wise equality, and a hash code built from the three fields.

## ColorHex

`io.github.ykysnk.utils.NonUdon` · `public struct ColorHex`

A `Color` together with its HTML hex form, so a colour can be serialized and inspected as text. Only the operators
update both fields at once; assigning one field directly leaves the other unchanged, and a default-initialized struct
derives its text from `color` when `hex` is null.

### color

```csharp
public Color color;
```

The colour value that `hex` spells out.

### hex

```csharp
public string hex;
```

The colour as `#RRGGBBAA`, including the leading `#`. Read straight from the field, so it can be null on a
default-initialized struct; conversions fall back to `color` then.

### ToString()

```csharp
public override string ToString()
```

Renders both fields as `Color: …, Hex: …`, deriving the hex from `color` when `hex` is null.

### implicit operator string(ColorHex)

```csharp
public static implicit operator string(ColorHex colorHex)
```

Returns the hex text, so the struct can stand in wherever a colour string is expected. Never null.

### implicit operator Color(ColorHex)

```csharp
public static implicit operator Color(ColorHex colorHex)
```

Returns `color`, so the struct can be used directly as a colour.

### implicit operator ColorHex(string)

```csharp
public static implicit operator ColorHex(string hex)
```

Parses an HTML colour string. Text that `ColorUtility.TryParseHtmlString` rejects becomes white instead of an error, and
`hex` is rewritten from the parsed colour, so the stored text is normalized rather than kept verbatim.

### implicit operator ColorHex(Color)

```csharp
public static implicit operator ColorHex(Color color)
```

Wraps a colour and derives its `#RRGGBBAA` text.
