# CodeCursor

`io.github.ykysnk.utils.Editor.HarmonyUtilities` · `public sealed class CodeCursor : IDisposable`

Harmony 轉譯器指令的串流游標。

它讓你能在只列舉序列一次的情況下取得目前指令、單一指令的預覽、已走訪的指令與目前索引，因此不需要用 `ToList()` 具體化序列。

## Constructors

```csharp
public CodeCursor(IEnumerable<CodeInstruction> instructions)
```

建立走訪 `instructions` 的游標。請勿在其他地方列舉該序列，因為游標擁有唯一的列舉器。

## Index

```csharp
public int Index { get; }
```

`Current` 的零基底位置；第一次 `MoveNext` 之前為 -1。

## Current

```csharp
public CodeInstruction? Current { get; }
```

游標所指的指令；第一次移動前與結束後為 `null`。

## Next

```csharp
public CodeInstruction? Next { get; }
```

下一條指令的預覽；游標位於最後一條時為 `null`。

## IsFirst

```csharp
public bool IsFirst { get; }
```

游標是否位於第一條指令。

## IsLast

```csharp
public bool IsLast { get; }
```

游標是否位於最後一條指令，也就是沒有可預覽的項目。第一次 `MoveNext` 之前為 false，即使此時 `Next` 仍是 `null`。

## this[int offset]

```csharp
public CodeInstruction? this[int offset] { get; }
```

相對於 `Current` 尋找指令：負值回到歷程、`0` 傳回目前指令、`1` 傳回 `Next`。偏移大於 1 時擲回 `NotSupportedException`，因為串流游標無法預覽更後面。

## Dispose

```csharp
public void Dispose()
```

釋放底層列舉器。

## MoveNext

```csharp
public bool MoveNext()
```

前進到下一條指令，並為 `Next` 緩衝再下一條；第一次呼叫會移到第一條指令，而不是越過它。游標越過最後一條指令後傳回 false，此時 `Current` 與 `Next` 也為 `null`。

## Previous

```csharp
public CodeInstruction? Previous(int distance = 1)
```

傳回已走訪的指令：`Previous(1)` 是 `Current` 的前一條，`Previous(2)` 是再前一條，依此類推。歷程不夠深時傳回 `null`，`distance` 為零或負數時擲回 `ArgumentOutOfRangeException`。`MoveNext` 傳回 false 之後，最後一條指令仍在歷程中，因此 `Previous(1)` 仍會傳回它。
