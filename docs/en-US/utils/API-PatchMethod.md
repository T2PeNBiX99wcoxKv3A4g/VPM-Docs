# PatchMethod

`io.github.ykysnk.utils.Editor.Patches` · `public abstract class PatchMethod<T> : IPatchMethod, ILogger where T : PatchMethod<T>, new()`

One Harmony patch set: a target method plus the prefix, postfix, transpiler and finalizer that belong to it. Instances are the classes nested inside a [`Patch`](./API-Patch.md) group.

`T` is the concrete patch class. It satisfies `IPatchMethod` and `ILogger`, and the `new()` constraint lets the framework and the lazy `Instance` create it. `TargetMethod` and the `Target*` properties are virtual, `Prepare` and `Cleanup` are virtual hooks with default implementations, and no member is abstract.

```csharp
private sealed class HideHandle : PatchMethod<HideHandle>
{
    public override MethodInfo? TargetMethod { get; } =
        AccessTools.Method(typeof(UnityEditor.Editor), "DrawHeader");

    private static void Prefix() => EditorGUI.BeginDisabledGroup(true);
    private static void Postfix() => EditorGUI.EndDisabledGroup();
}
```

## Instance

```csharp
public static T Instance { get; }
```

Lazily created instance, for callers outside the patching pass; the framework instantiates the patch set itself.

## ThisType

```csharp
public static Type ThisType { get; }
```

The patch type; it is the type whose methods are reflected and it names the log prefix.

## PrefixMethod

```csharp
public virtual string PrefixMethod { get; }
```

Name of the nested method used as the prefix, `"Prefix"` by default; override it to use a different name.

## PostfixMethod

```csharp
public virtual string PostfixMethod { get; }
```

Name of the nested method used as the postfix, `"Postfix"` by default; override it to use a different name.

## TranspilerMethod

```csharp
public virtual string TranspilerMethod { get; }
```

Name of the nested method used as the transpiler, `"Transpiler"` by default; override it to use a different name.

## FinalizerMethod

```csharp
public virtual string FinalizerMethod { get; }
```

Name of the nested method used as the finalizer, `"Finalizer"` by default; override it to use a different name.

## QualifiedName

```csharp
public virtual string QualifiedName { get; }
```

Unique name of the patch, used for logging and error reporting. It defaults to the full type name, or the short name when there is none.

## DisplayName

```csharp
public virtual string DisplayName { get; }
```

Short name of the patch, used as the prefix of every log entry it writes. It defaults to the type name.

## Enabled

```csharp
public virtual bool Enabled { get; }
```

Whether the patch is applied. It is true by default, and a disabled patch is skipped without touching Harmony.

## TargetMethod

```csharp
public virtual MethodInfo? TargetMethod { get; }
```

The method to patch. The base value is `null`, so every concrete patch class overrides it, usually by resolving the method with `AccessTools.Method`; when it stays `null` nothing is applied and a warning is logged.

## TargetPrefix

```csharp
public virtual MethodInfo? TargetPrefix { get; }
```

The nested method named `PrefixMethod`, or `null` when it does not exist. It is looked up by name only, through `Method`.

## TargetPostfix

```csharp
public virtual MethodInfo? TargetPostfix { get; }
```

The nested method named `PostfixMethod`, or `null` when it does not exist. It is looked up by name only, through `Method`.

## TargetTranspiler

```csharp
public virtual MethodInfo? TargetTranspiler { get; }
```

The nested method named `TranspilerMethod`, or `null` when it does not exist. It is looked up by name only, through `Method`.

## TargetFinalizer

```csharp
public virtual MethodInfo? TargetFinalizer { get; }
```

The nested method named `FinalizerMethod`, or `null` when it does not exist. It is looked up by name only, through `Method`.

## Priority

```csharp
public virtual int Priority { get; }
```

Harmony priority given to every patch method of this set. The default -1 means no priority is set explicitly.

## Before

```csharp
public virtual string[]? Before { get; }
```

Harmony ids this patch must run before, or `null` for no ordering constraint.

## After

```csharp
public virtual string[]? After { get; }
```

Harmony ids this patch must run after, or `null` for no ordering constraint.

## Debug

```csharp
public virtual bool? Debug { get; }
```

Harmony debug flag of the patch methods, or `null` to leave it unset.

## Prepare

```csharp
protected virtual bool Prepare(MethodInfo? original, Harmony harmony)
```

Runs just before the patch is applied, for state the patch methods need while they run. Returns true by default; false skips patching this time, in which case nothing is applied or cleaned up.

## Cleanup

```csharp
protected virtual Exception? Cleanup(Exception? exception, Harmony harmony, MethodInfo? original)
```

Runs in the `finally` block of the patch attempt, whether or not patching succeeded. The base implementation passes `exception` through unchanged, and a non-null result is logged as an error.

## Method

```csharp
protected static MethodInfo? Method(string name)
```

Resolves a method of the patch class by name only, and returns `null` when the class has no such method. Results are cached by the patching core, and names that do not resolve are remembered so the failed reflection lookup happens only once.

## Patch

```csharp
void IPatchMethod.Patch(Harmony harmony)
```

Applies the patch, including `Prepare` and `Cleanup`: it returns when `Enabled` is false or when `TargetMethod` is missing, warns when no patch method exists at all, then passes every resolved patch method to `Harmony.Patch` as a `HarmonyMethod` built from `Priority`, `Before`, `After` and `Debug`. It is reachable through `IPatchMethod` only, which is how the group runs it.

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
