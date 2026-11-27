# CodeCursor

`io.github.ykysnk.utils.Editor.HarmonyUtilities` · `public sealed class CodeCursor : IDisposable`

A streaming cursor over the instructions of a Harmony transpiler.

It gives access to the current instruction, a one-instruction peek, the already visited instructions and the current index while enumerating the sequence only once, so there is no need to materialise it with `ToList()`.

## Constructors

```csharp
public CodeCursor(IEnumerable<CodeInstruction> instructions)
```

Creates a cursor over `instructions`. Do not enumerate the sequence anywhere else, because the cursor owns the only enumerator.

## Index

```csharp
public int Index { get; }
```

Zero-based position of `Current`, or -1 before the first `MoveNext`.

## Current

```csharp
public CodeInstruction? Current { get; }
```

The instruction the cursor points at, or `null` before the first step and after the end.

## Next

```csharp
public CodeInstruction? Next { get; }
```

Peek of the following instruction, or `null` when the cursor is on the last one.

## IsFirst

```csharp
public bool IsFirst { get; }
```

Whether the cursor is on the first instruction.

## IsLast

```csharp
public bool IsLast { get; }
```

Whether the cursor is on the last instruction, i.e. there is nothing left to peek. It is false before the first `MoveNext`, even though `Next` is still `null` at that point.

## this[int offset]

```csharp
public CodeInstruction? this[int offset] { get; }
```

Looks up an instruction relative to `Current`: a negative offset goes back in history, `0` returns the current instruction and `1` returns `Next`. Throws `NotSupportedException` for an offset larger than 1, because a streaming cursor cannot peek further ahead.

## Dispose

```csharp
public void Dispose()
```

Releases the underlying enumerator.

## MoveNext

```csharp
public bool MoveNext()
```

Advances to the next instruction and buffers the following one for `Next`; the first call moves onto the first instruction instead of past it. Returns false once the cursor has moved past the last instruction, which also leaves `Current` and `Next` `null`.

## Previous

```csharp
public CodeInstruction? Previous(int distance = 1)
```

Returns an already visited instruction: `Previous(1)` is the one before `Current`, `Previous(2)` the one before that, and so on. Returns `null` when the history is not deep enough, and throws `ArgumentOutOfRangeException` when `distance` is zero or negative. After `MoveNext` returned false, the last instruction is in the history, so `Previous(1)` still returns it.
