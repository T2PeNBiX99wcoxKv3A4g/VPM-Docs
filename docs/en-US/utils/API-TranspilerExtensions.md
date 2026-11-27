# TranspilerExtensions

`io.github.ykysnk.utils.Editor.HarmonyUtilities` · `public static class TranspilerExtensions`

A Harmony transpiler helper for walking an instruction list with its neighbours, so a patch can match short instruction sequences without tracking indices itself.

## WithContext

```csharp
public static IEnumerable<InstructionContext> WithContext(this IEnumerable<CodeInstruction> instructions)
```

Yields each instruction together with the one before and after it, in order. The sequence is enumerated once, lazily, so it must not be enumerated anywhere else; an empty list yields nothing. For a large list, [`CodeCursor`](./API-CodeCursor.md) gives the same neighbours with a cheaper one-instruction peek.

```csharp
foreach (var context in instructions.WithContext())
{
    if (context.Is(OpCodes.Ldstr) && context.Next?.opcode == OpCodes.Call)
        context.Current.opcode = OpCodes.Nop;
}
```

## InstructionContext

`io.github.ykysnk.utils.Editor.HarmonyUtilities` · `public readonly struct InstructionContext`

An instruction plus its position and neighbours in a transpiler instruction list. It is created by `WithContext`.

### Constructors

```csharp
public InstructionContext(int index, CodeInstruction? previous, CodeInstruction current, CodeInstruction? next)
```

Creates a context for one instruction from its position, its predecessor, the instruction itself and its successor.

### Index

```csharp
public int Index { get; }
```

Position of `Current` in the original list, starting at zero.

### Previous

```csharp
public CodeInstruction? Previous { get; }
```

The instruction before `Current`, or `null` when it is the first one.

### Current

```csharp
public CodeInstruction Current { get; }
```

The instruction this context describes.

### Next

```csharp
public CodeInstruction? Next { get; }
```

The instruction after `Current`, or `null` when it is the last one.

### IsFirst

```csharp
public bool IsFirst { get; }
```

Whether `Current` is the first instruction of the list.

### IsLast

```csharp
public bool IsLast { get; }
```

Whether `Current` is the last instruction of the list.

### Is

```csharp
public bool Is(OpCode opcode)
```

Whether `Current` has the given opcode.

### Calls

```csharp
public bool Calls(MethodInfo method)
```

Whether `Current` is a call to the given method or constructor, using Harmony's own matching.
