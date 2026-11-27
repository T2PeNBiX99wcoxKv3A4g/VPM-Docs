# Patch

`io.github.ykysnk.utils.Editor.Patches` · `public abstract class Patch<T> : IPatch, ILogger where T : Patch<T>, new()`

由 [`PatchLoader`](./API-PatchLoader.md) 作为一个单位应用的补丁分组。实现的类就是容器：它自己的 `Execute` 先运行，然后才是嵌套在其中的每个补丁方法。

`T` 是具体的分组。它实现 `IPatch` 与 `ILogger`，`new()` 约束让框架与延迟创建的 `Instance` 能创建它。`Execute` 是唯一的抽象成员：`QualifiedName`、`DisplayName` 与 `Enabled` 都是带默认值的 virtual，而 `Run` 不可重写。

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

延迟创建的实例，供补丁流程之外的调用方使用；框架在应用分组时会创建自己的实例。

## ThisType

```csharp
public static Type ThisType { get; }
```

补丁分组类型；它的嵌套类型就是 `Run` 所应用的补丁。

## ThisHarmony

```csharp
protected Harmony? ThisHarmony { get; set; }
```

所属加载器的 Harmony 实例，会在分组运行前通过 `IPatch.ThisHarmony` 赋值；在那之前为 `null`。

## QualifiedName

```csharp
public virtual string QualifiedName { get; }
```

分组的稳定标识，用于报告它所应用的补丁。默认为完整类型名称，没有完整名称时则为简短名称。

## DisplayName

```csharp
public virtual string DisplayName { get; }
```

分组的简短名称，作为它写出的每个日志条目的前缀。默认为类型名称。

## Enabled

```csharp
public virtual bool Enabled { get; }
```

分组是否应被应用。默认为 true，禁用的分组会被跳过而不接触 Harmony。

## Execute

```csharp
protected abstract void Execute(Harmony harmony)
```

应用此分组自己声明的补丁；它会在嵌套补丁方法之前运行。每个具体分组都必须重写它，重写内容可以为空。

## Run

```csharp
void IPatch.Run(Harmony harmony)
```

应用整个分组：`Enabled` 为 false 时立即返回，否则调用 `Execute`，再运行每个嵌套的 [`PatchMethod`](./API-PatchMethod.md) 与 [`ReversePatchMethod`](./API-ReversePatchMethod.md)。它只能通过 `IPatch` 访问，加载器就是这样调用它。

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
