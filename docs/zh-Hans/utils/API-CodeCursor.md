# CodeCursor

`io.github.ykysnk.utils.Editor.HarmonyUtilities` · `public sealed class CodeCursor : IDisposable`

Harmony 转译器指令的流式游标。

它让你在只枚举序列一次的情况下取得当前指令、单条指令的预览、已访问的指令与当前索引，因此不需要用 `ToList()` 具体化序列。

## Constructors

```csharp
public CodeCursor(IEnumerable<CodeInstruction> instructions)
```

创建遍历 `instructions` 的游标。请勿在其他地方枚举该序列，因为游标拥有唯一的枚举器。

## Index

```csharp
public int Index { get; }
```

`Current` 的零基位置；第一次 `MoveNext` 之前为 -1。

## Current

```csharp
public CodeInstruction? Current { get; }
```

游标所指的指令；第一次移动前与结束后为 `null`。

## Next

```csharp
public CodeInstruction? Next { get; }
```

下一条指令的预览；游标位于最后一条时为 `null`。

## IsFirst

```csharp
public bool IsFirst { get; }
```

游标是否位于第一条指令。

## IsLast

```csharp
public bool IsLast { get; }
```

游标是否位于最后一条指令，也就是没有可预览的内容。第一次 `MoveNext` 之前为 false，即使此时 `Next` 仍是 `null`。

## this[int offset]

```csharp
public CodeInstruction? this[int offset] { get; }
```

相对于 `Current` 查找指令：负值回到历史、`0` 返回当前指令、`1` 返回 `Next`。偏移大于 1 时抛出 `NotSupportedException`，因为流式游标无法预览更后面。

## Dispose

```csharp
public void Dispose()
```

释放底层枚举器。

## MoveNext

```csharp
public bool MoveNext()
```

前进到下一条指令，并为 `Next` 缓冲再下一条；第一次调用会移到第一条指令，而不是越过它。游标越过最后一条指令后返回 false，此时 `Current` 与 `Next` 也为 `null`。

## Previous

```csharp
public CodeInstruction? Previous(int distance = 1)
```

返回已访问的指令：`Previous(1)` 是 `Current` 的前一条，`Previous(2)` 是再前一条，依此类推。历史不够深时返回 `null`，`distance` 为零或负数时抛出 `ArgumentOutOfRangeException`。`MoveNext` 返回 false 之后，最后一条指令仍在历史中，因此 `Previous(1)` 仍会返回它。
