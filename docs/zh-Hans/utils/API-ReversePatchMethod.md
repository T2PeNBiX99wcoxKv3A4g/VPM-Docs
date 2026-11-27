# ReversePatchMethod

`io.github.ykysnk.utils.Editor.Patches` · `public abstract class ReversePatchMethod<T> : IReversePatchMethod, ILogger where T : ReversePatchMethod<T>, new()`

一个反向补丁：一个接收另一个方法本体可调用副本的存根方法，可选择再经过 transpiler 处理。实例是嵌套在 [`Patch`](./API-Patch.md) 分组中的类。

`T` 是具体的反向补丁类。它实现 `IReversePatchMethod` 与 `ILogger`，`new()` 约束让框架与延迟创建的 `Instance` 能创建它。`TargetMethod` 与各 `Target*` 属性是 virtual，`Prepare` 与 `Cleanup` 是带默认实现的 virtual 钩子，没有任何成员是抽象。

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

延迟创建的实例，供补丁流程之外的调用方使用；框架会自行实例化这个反向补丁。

## ThisType

```csharp
public static Type ThisType { get; }
```

反向补丁类型；它是被反射方法的类型，也是日志前缀的名称。

## ReverseMethod

```csharp
public virtual string ReverseMethod { get; }
```

接收复制本体的嵌套存根方法名称，默认为 `"Reverse"`；重写它以改用其他名称。

## TranspilerMethod

```csharp
public virtual string TranspilerMethod { get; }
```

作为 transpiler 的嵌套方法名称，默认为 `"Transpiler"`；重写它以改用其他名称。

## QualifiedName

```csharp
public virtual string QualifiedName { get; }
```

反向补丁的唯一名称，用于日志与错误报告。默认为完整类型名称，没有完整名称时则为简短名称。

## DisplayName

```csharp
public virtual string DisplayName { get; }
```

反向补丁的简短名称，作为它写出的每个日志条目的前缀。默认为类型名称。

## Enabled

```csharp
public virtual bool Enabled { get; }
```

反向补丁是否被应用。默认为 true，禁用的反向补丁会被跳过而不接触 Harmony。

## TargetMethod

```csharp
public virtual MethodInfo? TargetMethod { get; }
```

要复制本体的方法。基值为 `null`，因此每个具体反向补丁类都会重写它；若保持 `null`，就不会应用任何内容并记录警告。

## TargetReverse

```csharp
public virtual MethodInfo? TargetReverse { get; }
```

接收复制本体的存根方法，也就是名为 `ReverseMethod` 的嵌套方法，不存在时为 `null`。它的签名必须与 `TargetMethod` 匹配。

## TargetTranspiler

```csharp
public virtual MethodInfo? TargetTranspiler { get; }
```

应用于复制本体的 transpiler：名为 `TranspilerMethod` 的嵌套方法，或 `null` 以退回声明为存根方法局部函数的 transpiler。该后备是按存根方法命名、返回 `IEnumerable<CodeInstruction>` 的生成方法。

## Priority

```csharp
public virtual int Priority { get; }
```

应用于此反向补丁的 Harmony 优先级。默认值 -1 表示未显式设置优先级。

## Before

```csharp
public virtual string[]? Before { get; }
```

此反向补丁必须在其之前运行的 Harmony ID，`null` 表示没有顺序约束。

## After

```csharp
public virtual string[]? After { get; }
```

此反向补丁必须在其之后运行的 Harmony ID，`null` 表示没有顺序约束。

## Debug

```csharp
public virtual bool? Debug { get; }
```

反向补丁的 Harmony 调试标志，`null` 表示不设置。

## Prepare

```csharp
protected virtual bool Prepare(MethodInfo? original, Harmony harmony)
```

在应用反向补丁之前运行，用于存根方法执行时所需的状态。默认返回 true；返回 false 会跳过反向补丁，此时不会应用或清理任何内容。

## Cleanup

```csharp
protected virtual Exception? Cleanup(Exception? exception, Harmony harmony, MethodInfo? original)
```

在反向补丁尝试的 `finally` 块中运行，不论是否成功。基实现会原样返回 `exception`，非 null 的结果会记录为错误。

## Method

```csharp
protected static MethodInfo? Method(string name)
```

仅按名称解析反向补丁类的方法，类没有该方法时返回 `null`。结果由补丁核心缓存，无法解析的名称也会被记住，因此失败的反射查询只会发生一次。

## Patch

```csharp
void IReversePatchMethod.Patch(Harmony harmony)
```

应用反向补丁，包含 `Prepare` 与 `Cleanup`：`Enabled` 为 false，或存根方法与 `TargetMethod` 任一缺少时返回，然后用 `Priority`、`Before`、`After` 与 `Debug` 构建的 `HarmonyMethod`，以及 `TargetTranspiler` 或局部函数后备，调用 `Harmony.ReversePatch`。它只能通过 `IReversePatchMethod` 访问，分组就是这样运行它。

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
