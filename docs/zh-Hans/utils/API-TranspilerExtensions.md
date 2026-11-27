# TranspilerExtensions

`io.github.ykysnk.utils.Editor.HarmonyUtilities` · `public static class TranspilerExtensions`

Harmony 转译器的辅助方法，让你能连同前后邻居一起遍历指令列表，因此补丁可以匹配短指令序列，而不必自己跟踪索引。

## WithContext

```csharp
public static IEnumerable<InstructionContext> WithContext(this IEnumerable<CodeInstruction> instructions)
```

按顺序产出每条指令及其前一条与后一条。序列只会延迟枚举一次，因此请勿在其他地方枚举它；空列表不会产出任何内容。对于较大的列表，[`CodeCursor`](./API-CodeCursor.md) 以更廉价的单指令预览提供相同的前后关系。

```csharp
foreach (var context in instructions.WithContext())
{
    if (context.Is(OpCodes.Ldstr) && context.Next?.opcode == OpCodes.Call)
        context.Current.opcode = OpCodes.Nop;
}
```

## InstructionContext

`io.github.ykysnk.utils.Editor.HarmonyUtilities` · `public readonly struct InstructionContext`

转译器指令列表中的一条指令，以及它的位置与前后邻居。它由 `WithContext` 创建。

### Constructors

```csharp
public InstructionContext(int index, CodeInstruction? previous, CodeInstruction current, CodeInstruction? next)
```

用位置、前一条指令、指令本身与后一条指令创建单条指令的上下文。

### Index

```csharp
public int Index { get; }
```

`Current` 在原始列表中的位置，从零开始。

### Previous

```csharp
public CodeInstruction? Previous { get; }
```

`Current` 的前一条指令，它是第一条时为 `null`。

### Current

```csharp
public CodeInstruction Current { get; }
```

这个上下文所描述的指令。

### Next

```csharp
public CodeInstruction? Next { get; }
```

`Current` 的后一条指令，它是最后一条时为 `null`。

### IsFirst

```csharp
public bool IsFirst { get; }
```

`Current` 是否为列表的第一条指令。

### IsLast

```csharp
public bool IsLast { get; }
```

`Current` 是否为列表的最后一条指令。

### Is

```csharp
public bool Is(OpCode opcode)
```

`Current` 是否具有指定的操作码。

### Calls

```csharp
public bool Calls(MethodInfo method)
```

`Current` 是否为指定方法或构造函数的调用，使用 Harmony 自身的比对。
