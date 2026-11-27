# TranspilerExtensions

`io.github.ykysnk.utils.Editor.HarmonyUtilities` · `public static class TranspilerExtensions`

Harmony 轉譯器的輔助方法，讓你能連同前後鄰居一起走訪指令清單，因此修補可以比對短指令序列，而不必自行追蹤索引。

## WithContext

```csharp
public static IEnumerable<InstructionContext> WithContext(this IEnumerable<CodeInstruction> instructions)
```

依序產生每條指令及其前一條與後一條。序列只會延遲列舉一次，因此請勿在其他地方列舉它；空清單不會產生任何項目。對於較大的清單，[`CodeCursor`](./API-CodeCursor.md) 以更便宜的單指令預覽提供相同的前後關係。

```csharp
foreach (var context in instructions.WithContext())
{
    if (context.Is(OpCodes.Ldstr) && context.Next?.opcode == OpCodes.Call)
        context.Current.opcode = OpCodes.Nop;
}
```

## InstructionContext

`io.github.ykysnk.utils.Editor.HarmonyUtilities` · `public readonly struct InstructionContext`

轉譯器指令清單中的一條指令，以及它的位置與前後鄰居。它由 `WithContext` 建立。

### Constructors

```csharp
public InstructionContext(int index, CodeInstruction? previous, CodeInstruction current, CodeInstruction? next)
```

以位置、前一條指令、指令本身與後一條指令建立單一指令的內容。

### Index

```csharp
public int Index { get; }
```

`Current` 在原始清單中的位置，從零開始。

### Previous

```csharp
public CodeInstruction? Previous { get; }
```

`Current` 的前一條指令，它是第一條時為 `null`。

### Current

```csharp
public CodeInstruction Current { get; }
```

這個內容所描述的指令。

### Next

```csharp
public CodeInstruction? Next { get; }
```

`Current` 的後一條指令，它是最後一條時為 `null`。

### IsFirst

```csharp
public bool IsFirst { get; }
```

`Current` 是否為清單的第一條指令。

### IsLast

```csharp
public bool IsLast { get; }
```

`Current` 是否為清單的最後一條指令。

### Is

```csharp
public bool Is(OpCode opcode)
```

`Current` 是否具有指定的作業碼。

### Calls

```csharp
public bool Calls(MethodInfo method)
```

`Current` 是否為指定方法或建構子的呼叫，使用 Harmony 自身的比對。
