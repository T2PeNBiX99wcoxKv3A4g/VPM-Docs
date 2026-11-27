# PatchLoader

`io.github.ykysnk.utils.Editor.Patches` · `public abstract class PatchLoader<T> : IPatchLoader, ILogger where T : PatchLoader<T>, new()`

The entry point of one assembly: it receives the Harmony instance created for that assembly and applies its [`Patch`](./API-Patch.md) groups. [`ExportsPatchLoader`](./API-ExportsPatchLoader.md) names the implementations to load.

`T` is the concrete loader. It satisfies `IPatchLoader` and `ILogger`, and the `new()` constraint lets the framework and the lazy `Instance` create it. `Load` is the only abstract member; `Unload`, `QualifiedName`, `DisplayName` and `Enabled` are virtual.

```csharp
[assembly: ExportsPatchLoader(typeof(MyLoader))]

internal sealed class MyLoader : PatchLoader<MyLoader>
{
    public override void Load(Harmony harmony)
    {
        Run(MyGroup.Instance);
    }
}
```

## Instance

```csharp
public static T Instance { get; }
```

Lazily created instance, for callers outside the patching pass; the framework creates its own instance when it loads the assembly.

## ThisType

```csharp
public static Type ThisType { get; }
```

The loader type, used for the log prefix and as the default name of the loader.

## ThisHarmony

```csharp
protected Harmony? ThisHarmony { get; set; }
```

The Harmony instance of this loader, assigned through `IPatchLoader.ThisHarmony` before `Load` is called, or `null` before the framework assigns it.

## QualifiedName

```csharp
public virtual string QualifiedName { get; }
```

Unique name of the loader, which is also the Harmony id of its instance and therefore the key used to remove its patches again. It defaults to the full type name, or the short name when there is none.

## DisplayName

```csharp
public virtual string DisplayName { get; }
```

Short name of the loader, used in log entries and error reports. It defaults to the type name.

## Enabled

```csharp
public virtual bool Enabled { get; }
```

Whether the loader runs at all. It is true by default, and a disabled loader is never loaded and never unloaded.

## Load

```csharp
public abstract void Load(Harmony harmony)
```

Applies every patch of the assembly; this is where its patch groups are run, normally through `Run`. Every concrete loader must override it.

## Unload

```csharp
public virtual void Unload(Harmony harmony)
```

Called right before the assemblies are reloaded, while patches still exist. The base implementation does nothing, because the framework removes the Harmony patches itself; override it to release state owned by the loader. The Harmony instance is the same one that was passed to `Load`.

## Run

```csharp
protected void Run(IPatch patch)
```

Runs a patch group with this loader's Harmony instance, so the group does not have to hold the instance itself; the group's `IPatch.ThisHarmony` is overwritten here. Throws `InvalidOperationException` when the loader has no Harmony instance yet, i.e. when it is used before the framework loaded it.

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
