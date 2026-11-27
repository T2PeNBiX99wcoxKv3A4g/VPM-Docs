# Patch

`io.github.ykysnk.utils.Editor.Patches` · `public abstract class Patch<T> : IPatch, ILogger where T : Patch<T>, new()`

A group of patches that a [`PatchLoader`](./API-PatchLoader.md) applies as a unit. The implementing class is the container: its own `Execute` runs first, then every patch method nested inside it.

`T` is the concrete group. It satisfies `IPatch` and `ILogger`, and the `new()` constraint lets the framework and the lazy `Instance` create it. `Execute` is the only abstract member: `QualifiedName`, `DisplayName` and `Enabled` are virtual with defaults, and `Run` is not overridable.

```csharp
internal sealed class MyGroup : Patch<MyGroup>
{
    protected override void Execute(Harmony harmony)
    {
        // Optional: patches the group applies by hand, before the nested ones.
    }

    private sealed class HideHandle : PatchMethod<HideHandle>
    {
        // ...
    }
}
```

## Instance

```csharp
public static T Instance { get; }
```

Lazily created instance, for callers outside the patching pass; the framework creates its own instance when it applies the group.

## ThisType

```csharp
public static Type ThisType { get; }
```

The patch group type; its nested types are the patches applied by `Run`.

## ThisHarmony

```csharp
protected Harmony? ThisHarmony { get; set; }
```

The Harmony instance of the owning loader, assigned through `IPatch.ThisHarmony` before the group runs, or `null` before that.

## QualifiedName

```csharp
public virtual string QualifiedName { get; }
```

Stable identity of the group, used when reporting the patches it applies. It defaults to the full type name, or the short name when there is none.

## DisplayName

```csharp
public virtual string DisplayName { get; }
```

Short name of the group, used as the prefix of every log entry it writes. It defaults to the type name.

## Enabled

```csharp
public virtual bool Enabled { get; }
```

Whether the group should be applied. It is true by default, and a disabled group is skipped without touching Harmony.

## Execute

```csharp
protected abstract void Execute(Harmony harmony)
```

Applies the patches this group declares itself; it runs before the nested patch methods. Every concrete group must override it, and the override may be empty.

## Run

```csharp
void IPatch.Run(Harmony harmony)
```

Applies the whole group: it returns immediately when `Enabled` is false, otherwise it calls `Execute` and then every nested [`PatchMethod`](./API-PatchMethod.md) and [`ReversePatchMethod`](./API-ReversePatchMethod.md). It is reachable through `IPatch` only, which is how the loader calls it.

## Log

```csharp
public void Log(object? message)
public void Log(object? message, Object context)
```

Writes the message with `Debug.Log`, prefixed with `DisplayName`. The `context` overload also highlights that Unity object when the console entry is clicked.

## LogWarning

```csharp
public void LogWarning(object? message)
public void LogWarning(object? message, Object context)
```

Writes the message with `Debug.LogWarning`, prefixed with `DisplayName`. The `context` overload also highlights that Unity object when the console entry is clicked.

## LogError

```csharp
public void LogError(object? message)
public void LogError(object? message, Object context)
```

Writes the message with `Debug.LogError`, prefixed with `DisplayName`. The `context` overload also highlights that Unity object when the console entry is clicked.

## Assert

```csharp
public void Assert(bool condition, object? message)
public void Assert(bool condition, object? message, Object context)
```

Asserts `condition` through `Debug.Assert`, reporting the message with the `DisplayName` prefix when it fails. The `context` overload also highlights that Unity object when the console entry is clicked.

## Log2

```csharp
public static void Log2(object? message)
public static void Log2(object? message, Object context)
```

Same as `Log`, for use from static members: the prefix is `ThisType.Name`, because no instance is available there.

## LogWarning2

```csharp
public static void LogWarning2(object? message)
public static void LogWarning2(object? message, Object context)
```

Same as `LogWarning`, for use from static members, with the type name as prefix.

## LogError2

```csharp
public static void LogError2(object? message)
public static void LogError2(object? message, Object context)
```

Same as `LogError`, for use from static members, with the type name as prefix.

## Assert2

```csharp
public static void Assert2(bool condition, object? message)
public static void Assert2(bool condition, object? message, Object context)
```

Same as `Assert`, for use from static members, with the type name as prefix.
