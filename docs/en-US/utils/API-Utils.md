# Utils

`io.github.ykysnk.utils` · `public static class Utils`

Small helpers that are safe to call from Udon: logging with a coloured prefix and a few state checks.

The prefix is drawn as `[prefix]` in `#D771C0`. Every logging and assertion member carries `[HideInCallstack]`, so the
console entry points at the caller instead of this file.

## Log

```csharp
public static void Log(string prefix, object message)
public static void Log(string prefix, object message, UnityEngine.Object context)
```

Writes `[prefix] message` with `Debug.Log`. `prefix` is the coloured part; a null `message` logs an empty value. The
`context` overload also highlights that object when the console entry is clicked.

```csharp
Utils.Log(nameof(MyWindow), "Opened");
```

## LogWarning

```csharp
public static void LogWarning(string prefix, object message)
public static void LogWarning(string prefix, object message, UnityEngine.Object context)
```

Writes the prefixed message with `Debug.LogWarning`. The `context` overload highlights that object when the console
entry is clicked.

## LogError

```csharp
public static void LogError(string prefix, object message)
public static void LogError(string prefix, object message, UnityEngine.Object context)
```

Writes the prefixed message with `Debug.LogError`. The `context` overload highlights that object when the console entry
is clicked.

## LogAssert

```csharp
[Obsolete("Use Assert(bool condition, string prefix, object message) instead")]
public static void LogAssert(bool condition, string prefix, object message)

[Obsolete("Use Assert(bool condition, string prefix, object message, Object context) instead")]
public static void LogAssert(bool condition, string prefix, object message, UnityEngine.Object context)
```

Kept for compatibility; they only forward the prefixed message to `Debug.Assert`. Use [`Assert`](#assert) instead.

## Assert

```csharp
public static void Assert(bool condition, string prefix, object message)
public static void Assert(bool condition, string prefix, object message, UnityEngine.Object context)
```

Asserts `condition` through `Debug.Assert`, reporting the message with the coloured prefix when it fails. The
`context` overload highlights that object when the console entry is clicked.

```csharp
Utils.Assert(path != null, nameof(MyWindow), "Path must be set");
```

## IsMoved

```csharp
public static bool IsMoved(float value)
```

Whether a per-frame delta counts as movement: `value < -0.05f || value > 0.05f`. The threshold uses a strict
comparison, so a delta of exactly `0.05f` does not count.

## IsInPrefab2

```csharp
public static bool IsInPrefab2()
```

Whether the editor is currently in prefab editing mode. Always false in the player. This is the name that is safe to
use inside Udon.

## IsPlaying2

```csharp
public static bool IsPlaying2()
```

Whether play mode is active or about to start. Always true in the player. This is the name that is safe to use inside
Udon.

## IsInPrefab

```csharp
public static bool IsInPrefab { get; }
```

Property form of `IsInPrefab2`. Not compiled when `COMPILER_UDONSHARP` is defined, because it relies on
`PrefabStageUtility`.

## IsPlaying

```csharp
public static bool IsPlaying { get; }
```

Property form of `IsPlaying2`. Not compiled when `COMPILER_UDONSHARP` is defined, because it relies on
`EditorApplication`.

## ToLayer

```csharp
public static int ToLayer(LayerMask mask)
```

Returns the layer index of a single-layer mask, i.e. the position of its highest set bit. A mask of zero returns 31,
which is what the bit walk produces.

```csharp
var layer = Utils.ToLayer(LayerMask.GetMask("Water"));
```
