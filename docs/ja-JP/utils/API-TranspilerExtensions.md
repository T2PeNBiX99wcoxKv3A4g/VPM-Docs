# TranspilerExtensions

`io.github.ykysnk.utils.Editor.HarmonyUtilities` · `public static class TranspilerExtensions`

命令リストを前後の命令と一緒にたどるための Harmony トランスパイラーのヘルパーです。パッチが自分でインデックスを追わずに短い命令列を照合できます。

## WithContext

```csharp
public static IEnumerable<InstructionContext> WithContext(this IEnumerable<CodeInstruction> instructions)
```

各命令を、その前後の命令と一緒に順番に列挙します。シーケンスは遅延評価で 1 回だけ列挙されるので、他の場所で列挙しないでください。空のリストでは何も返しません。大きなリストでは、[`CodeCursor`](./API-CodeCursor.md) が同じ前後関係をより安価な 1 命令の覗き見で提供します。

```csharp
foreach (var context in instructions.WithContext())
{
    if (context.Is(OpCodes.Ldstr) && context.Next?.opcode == OpCodes.Call)
        context.Current.opcode = OpCodes.Nop;
}
```

## InstructionContext

`io.github.ykysnk.utils.Editor.HarmonyUtilities` · `public readonly struct InstructionContext`

トランスパイラーの命令リストにおける、命令とその位置・前後の命令です。`WithContext` が作成します。

### Constructors

```csharp
public InstructionContext(int index, CodeInstruction? previous, CodeInstruction current, CodeInstruction? next)
```

位置、前の命令、命令そのもの、次の命令から 1 命令分のコンテキストを作ります。

### Index

```csharp
public int Index { get; }
```

元のリストにおける `Current` の位置で、0 始まりです。

### Previous

```csharp
public CodeInstruction? Previous { get; }
```

`Current` の前の命令です。最初の命令なら `null` です。

### Current

```csharp
public CodeInstruction Current { get; }
```

このコンテキストが表す命令です。

### Next

```csharp
public CodeInstruction? Next { get; }
```

`Current` の次の命令です。最後の命令なら `null` です。

### IsFirst

```csharp
public bool IsFirst { get; }
```

`Current` がリストの最初の命令かどうかです。

### IsLast

```csharp
public bool IsLast { get; }
```

`Current` がリストの最後の命令かどうかです。

### Is

```csharp
public bool Is(OpCode opcode)
```

`Current` が指定したオペコードを持つかどうかです。

### Calls

```csharp
public bool Calls(MethodInfo method)
```

`Current` が指定したメソッドやコンストラクターの呼び出しかどうかを、Harmony 自身の照合で判定します。
