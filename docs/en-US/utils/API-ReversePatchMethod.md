# ReversePatchMethod

`io.github.ykysnk.utils.Editor.Patches` · `public abstract class ReversePatchMethod<T> : IReversePatchMethod, ILogger where T : ReversePatchMethod<T>, new()`

One reverse patch: a stub method that receives a callable copy of another method's body, optionally run through a transpiler. Instances are the classes nested inside a [`Patch`](./API-Patch.md) group.

`T` is the concrete reverse patch class. It satisfies `IReversePatchMethod` and `ILogger`, and the `new()` constraint lets the framework and the lazy `Instance` create it. `TargetMethod` and the `Target*` properties are virtual, `Prepare` and `Cleanup` are virtual hooks with default implementations, and no member is abstract.

```csharp
private sealed class ReadSettings : ReversePatchMethod<ReadSettings>
{
    public override MethodInfo? TargetMethod { get; } = AccessTools.Method(typeof(SomeEditor), "ReadSettings");

    // Receives the copied body; the signature must match TargetMethod.
    private static void Reverse() { }
}
```

## Instance

```csharp
public static T Instance { get; }
```

Lazily created instance, for callers outside the patching pass; the framework instantiates the reverse patch itself.

## ThisType

```csharp
public static Type ThisType { get; }
```

The reverse patch type; it is the type whose methods are reflected and it names the log prefix.

## ReverseMethod

```csharp
public virtual string ReverseMethod { get; }
```

Name of the nested stub method that receives the copied body, `"Reverse"` by default; override it to use a different name.

## TranspilerMethod

```csharp
public virtual string TranspilerMethod { get; }
```

Name of the nested method used as the transpiler, `"Transpiler"` by default; override it to use a different name.

## QualifiedName

```csharp
public virtual string QualifiedName { get; }
```

Unique name of the reverse patch, used for logging and error reporting. It defaults to the full type name, or the short name when there is none.

## DisplayName

```csharp
public virtual string DisplayName { get; }
```

Short name of the reverse patch, used as the prefix of every log entry it writes. It defaults to the type name.

## Enabled

```csharp
public virtual bool Enabled { get; }
```

Whether the reverse patch is applied. It is true by default, and a disabled one is skipped without touching Harmony.

## TargetMethod

```csharp
public virtual MethodInfo? TargetMethod { get; }
```

The method whose body is copied. The base value is `null`, so every concrete reverse patch class overrides it; when it stays `null` nothing is applied and a warning is logged.

## TargetReverse

```csharp
public virtual MethodInfo? TargetReverse { get; }
```

The stub method that receives the copied body, i.e. the nested method named `ReverseMethod`, or `null` when it does not exist. Its signature must match `TargetMethod`.

## TargetTranspiler

```csharp
public virtual MethodInfo? TargetTranspiler { get; }
```

The transpiler applied to the copied body: the nested method named `TranspilerMethod`, or `null` to fall back to a transpiler declared as a local function of the stub. That fallback is a generated method named after the stub that returns `IEnumerable<CodeInstruction>`.

## Priority

```csharp
public virtual int Priority { get; }
```

Harmony priority given to this reverse patch. The default -1 means no priority is set explicitly.

## Before

```csharp
public virtual string[]? Before { get; }
```

Harmony ids this reverse patch must run before, or `null` for no ordering constraint.

## After

```csharp
public virtual string[]? After { get; }
```

Harmony ids this reverse patch must run after, or `null` for no ordering constraint.

## Debug

```csharp
public virtual bool? Debug { get; }
```

Harmony debug flag of the reverse patch, or `null` to leave it unset.

## Prepare

```csharp
protected virtual bool Prepare(MethodInfo? original, Harmony harmony)
```

Runs just before the reverse patch is applied, for state the stub needs while it runs. Returns true by default; false skips the reverse patch, in which case nothing is applied or cleaned up.

## Cleanup

```csharp
protected virtual Exception? Cleanup(Exception? exception, Harmony harmony, MethodInfo? original)
```

Runs in the `finally` block of the reverse patch attempt, whether or not it succeeded. The base implementation passes `exception` through unchanged, and a non-null result is logged as an error.

## Method

```csharp
protected static MethodInfo? Method(string name)
```

Resolves a method of the reverse patch class by name only, and returns `null` when the class has no such method. Results are cached by the patching core, and names that do not resolve are remembered so the failed reflection lookup happens only once.

## Patch

```csharp
void IReversePatchMethod.Patch(Harmony harmony)
```

Applies the reverse patch, including `Prepare` and `Cleanup`: it returns when `Enabled` is false or when either the stub or `TargetMethod` is missing, then calls `Harmony.ReversePatch` with a `HarmonyMethod` built from `Priority`, `Before`, `After` and `Debug` and with `TargetTranspiler` or the local-function fallback. It is reachable through `IReversePatchMethod` only, which is how the group runs it.

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
