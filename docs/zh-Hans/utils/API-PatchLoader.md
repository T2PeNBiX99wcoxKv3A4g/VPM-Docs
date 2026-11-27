# PatchLoader

`io.github.ykysnk.utils.Editor.Patches` · `public abstract class PatchLoader<T> : IPatchLoader, ILogger where T : PatchLoader<T>, new()`

单个程序集的入口点：它接收为该程序集创建的 Harmony 实例，并应用其 [`Patch`](./API-Patch.md) 分组。[`ExportsPatchLoader`](./API-ExportsPatchLoader.md) 会指出要加载的实现。

`T` 是具体的加载器。它实现 `IPatchLoader` 与 `ILogger`，`new()` 约束让框架与延迟创建的 `Instance` 能创建它。`Load` 是唯一的抽象成员；`Unload`、`QualifiedName`、`DisplayName` 与 `Enabled` 都是 virtual。

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

延迟创建的实例，供补丁流程之外的调用方使用；框架在加载程序集时会创建自己的实例。

## ThisType

```csharp
public static Type ThisType { get; }
```

加载器类型，用于日志前缀，也是加载器的默认名称。

## ThisHarmony

```csharp
protected Harmony? ThisHarmony { get; set; }
```

此加载器的 Harmony 实例，会在 `Load` 被调用前通过 `IPatchLoader.ThisHarmony` 赋值；在框架赋值之前为 `null`。

## QualifiedName

```csharp
public virtual string QualifiedName { get; }
```

加载器的唯一名称，同时也是其实例的 Harmony ID，因此也是再次移除其补丁时所用的键。默认为完整类型名称，没有完整名称时则为简短名称。

## DisplayName

```csharp
public virtual string DisplayName { get; }
```

加载器的简短名称，用于日志条目与错误报告。默认为类型名称。

## Enabled

```csharp
public virtual bool Enabled { get; }
```

加载器是否运行。默认为 true，禁用的加载器永远不会被加载，也不会被卸载。

## Load

```csharp
public abstract void Load(Harmony harmony)
```

应用程序集的每个补丁；这里会运行它的补丁分组，通常是通过 `Run`。每个具体加载器都必须重写它。

## Unload

```csharp
public virtual void Unload(Harmony harmony)
```

在程序集重载前、补丁仍存在时调用。基实现不做任何事，因为框架会自行移除 Harmony 补丁；重写它以释放加载器拥有的状态。Harmony 实例与传给 `Load` 的是同一个。

## Run

```csharp
protected void Run(IPatch patch)
```

用此加载器的 Harmony 实例运行补丁分组，因此分组不必自己持有该实例；分组的 `IPatch.ThisHarmony` 会在这里被覆盖。加载器尚未取得 Harmony 实例时（也就是在框架加载它之前使用）会抛出 `InvalidOperationException`。

## Log

```csharp
public void Log(object? message)
public void Log(object? message, Object context)
```

用 `Debug.Log` 写出消息，并加上 `DisplayName` 前缀。带 `context` 的重载在点击控制台条目时会高亮该 Unity 对象。

## LogWarning

```csharp
public void LogWarning(object? message)
public void LogWarning(object? message, Object context)
```

用 `Debug.LogWarning` 写出消息，并加上 `DisplayName` 前缀。带 `context` 的重载在点击控制台条目时会高亮该 Unity 对象。

## LogError

```csharp
public void LogError(object? message)
public void LogError(object? message, Object context)
```

用 `Debug.LogError` 写出消息，并加上 `DisplayName` 前缀。带 `context` 的重载在点击控制台条目时会高亮该 Unity 对象。

## Assert

```csharp
public void Assert(bool condition, object? message)
public void Assert(bool condition, object? message, Object context)
```

通过 `Debug.Assert` 断言 `condition`，失败时以 `DisplayName` 前缀报告消息。带 `context` 的重载在点击控制台条目时会高亮该 Unity 对象。

## Log2

```csharp
public static void Log2(object? message)
public static void Log2(object? message, Object context)
```

与 `Log` 相同，供静态成员使用：前缀是 `ThisType.Name`，因为那里没有实例可用。

## LogWarning2

```csharp
public static void LogWarning2(object? message)
public static void LogWarning2(object? message, Object context)
```

与 `LogWarning` 相同，供静态成员使用，并以类型名称作为前缀。

## LogError2

```csharp
public static void LogError2(object? message)
public static void LogError2(object? message, Object context)
```

与 `LogError` 相同，供静态成员使用，并以类型名称作为前缀。

## Assert2

```csharp
public static void Assert2(bool condition, object? message)
public static void Assert2(bool condition, object? message, Object context)
```

与 `Assert` 相同，供静态成员使用，并以类型名称作为前缀。
