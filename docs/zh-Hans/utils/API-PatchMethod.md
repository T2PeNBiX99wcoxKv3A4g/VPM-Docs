# PatchMethod

`io.github.ykysnk.utils.Editor.Patches` · `public abstract class PatchMethod<T> : IPatchMethod, ILogger where T : PatchMethod<T>, new()`

一组 Harmony 补丁：目标方法，以及属于它的 prefix、postfix、transpiler 与 finalizer。实例是嵌套在 [`Patch`](./API-Patch.md) 分组中的类。

`T` 是具体的补丁类。它实现 `IPatchMethod` 与 `ILogger`，`new()` 约束让框架与延迟创建的 `Instance` 能创建它。`TargetMethod` 与各 `Target*` 属性是 virtual，`Prepare` 与 `Cleanup` 是带默认实现的 virtual 钩子，没有任何成员是抽象。

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

延迟创建的实例，供补丁流程之外的调用方使用；框架会自行实例化这组补丁。

## ThisType

```csharp
public static Type ThisType { get; }
```

补丁类型；它是被反射方法的类型，也是日志前缀的名称。

## PrefixMethod

```csharp
public virtual string PrefixMethod { get; }
```

作为 prefix 的嵌套方法名称，默认为 `"Prefix"`；重写它以改用其他名称。

## PostfixMethod

```csharp
public virtual string PostfixMethod { get; }
```

作为 postfix 的嵌套方法名称，默认为 `"Postfix"`；重写它以改用其他名称。

## TranspilerMethod

```csharp
public virtual string TranspilerMethod { get; }
```

作为 transpiler 的嵌套方法名称，默认为 `"Transpiler"`；重写它以改用其他名称。

## FinalizerMethod

```csharp
public virtual string FinalizerMethod { get; }
```

作为 finalizer 的嵌套方法名称，默认为 `"Finalizer"`；重写它以改用其他名称。

## QualifiedName

```csharp
public virtual string QualifiedName { get; }
```

补丁的唯一名称，用于日志与错误报告。默认为完整类型名称，没有完整名称时则为简短名称。

## DisplayName

```csharp
public virtual string DisplayName { get; }
```

补丁的简短名称，作为它写出的每个日志条目的前缀。默认为类型名称。

## Enabled

```csharp
public virtual bool Enabled { get; }
```

补丁是否被应用。默认为 true，禁用的补丁会被跳过而不接触 Harmony。

## TargetMethod

```csharp
public virtual MethodInfo? TargetMethod { get; }
```

要打补丁的方法。基值为 `null`，因此每个具体补丁类都会重写它，通常用 `AccessTools.Method` 解析；若保持 `null`，就不会应用任何内容并记录警告。

## TargetPrefix

```csharp
public virtual MethodInfo? TargetPrefix { get; }
```

名为 `PrefixMethod` 的嵌套方法，不存在时为 `null`。它只按名称通过 `Method` 查找。

## TargetPostfix

```csharp
public virtual MethodInfo? TargetPostfix { get; }
```

名为 `PostfixMethod` 的嵌套方法，不存在时为 `null`。它只按名称通过 `Method` 查找。

## TargetTranspiler

```csharp
public virtual MethodInfo? TargetTranspiler { get; }
```

名为 `TranspilerMethod` 的嵌套方法，不存在时为 `null`。它只按名称通过 `Method` 查找。

## TargetFinalizer

```csharp
public virtual MethodInfo? TargetFinalizer { get; }
```

名为 `FinalizerMethod` 的嵌套方法，不存在时为 `null`。它只按名称通过 `Method` 查找。

## Priority

```csharp
public virtual int Priority { get; }
```

应用于此集合中每个补丁方法的 Harmony 优先级。默认值 -1 表示未显式设置优先级。

## Before

```csharp
public virtual string[]? Before { get; }
```

此补丁必须在其之前运行的 Harmony ID，`null` 表示没有顺序约束。

## After

```csharp
public virtual string[]? After { get; }
```

此补丁必须在其之后运行的 Harmony ID，`null` 表示没有顺序约束。

## Debug

```csharp
public virtual bool? Debug { get; }
```

补丁方法的 Harmony 调试标志，`null` 表示不设置。

## Prepare

```csharp
protected virtual bool Prepare(MethodInfo? original, Harmony harmony)
```

在应用补丁之前运行，用于补丁方法执行时所需的状态。默认返回 true；返回 false 会跳过这次打补丁，此时不会应用或清理任何内容。

## Cleanup

```csharp
protected virtual Exception? Cleanup(Exception? exception, Harmony harmony, MethodInfo? original)
```

在打补丁尝试的 `finally` 块中运行，不论补丁是否成功。基实现会原样返回 `exception`，非 null 的结果会记录为错误。

## Method

```csharp
protected static MethodInfo? Method(string name)
```

仅按名称解析补丁类的方法，类没有该方法时返回 `null`。结果由补丁核心缓存，无法解析的名称也会被记住，因此失败的反射查询只会发生一次。

## Patch

```csharp
void IPatchMethod.Patch(Harmony harmony)
```

应用补丁，包含 `Prepare` 与 `Cleanup`：`Enabled` 为 false 或缺少 `TargetMethod` 时返回，完全没有补丁方法时记录警告，然后把每个已解析的补丁方法以 `Priority`、`Before`、`After` 与 `Debug` 构建的 `HarmonyMethod` 传给 `Harmony.Patch`。它只能通过 `IPatchMethod` 访问，分组就是这样运行它。

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
