# CodeCursor

`io.github.ykysnk.utils.Editor.HarmonyUtilities` · `public sealed class CodeCursor : IDisposable`

Harmony のトランスパイラーが扱う命令列のストリーミングカーソルです。

シーケンスを 1 回だけ列挙しながら、現在の命令、1 命令先の覗き見、通過済みの命令、現在のインデックスにアクセスできます。`ToList()` で具体化する必要はありません。

## Constructors

```csharp
public CodeCursor(IEnumerable<CodeInstruction> instructions)
```

`instructions` をたどるカーソルを作ります。カーソルが唯一の列挙子を持つので、シーケンスを他の場所で列挙しないでください。

## Index

```csharp
public int Index { get; }
```

`Current` の 0 始まりの位置です。最初の `MoveNext` より前は -1 です。

## Current

```csharp
public CodeInstruction? Current { get; }
```

カーソルが指している命令です。最初の移動前と終端より後では `null` です。

## Next

```csharp
public CodeInstruction? Next { get; }
```

次の命令の覗き見です。最後の命令にいるときは `null` です。

## IsFirst

```csharp
public bool IsFirst { get; }
```

カーソルが最初の命令にいるかどうかです。

## IsLast

```csharp
public bool IsLast { get; }
```

カーソルが最後の命令にいるかどうか、つまり覗き見るものが残っていないかどうかです。最初の `MoveNext` より前は、まだ `Next` が `null` でも false になります。

## this[int offset]

```csharp
public CodeInstruction? this[int offset] { get; }
```

`Current` を基準に命令を探します。負の値は履歴をさかのぼり、`0` は現在の命令、`1` は `Next` を返します。1 より大きいオフセットでは `NotSupportedException` をスローします。ストリーミングカーソルはそれ以上先を覗けないためです。

## Dispose

```csharp
public void Dispose()
```

背後の列挙子を解放します。

## MoveNext

```csharp
public bool MoveNext()
```

次の命令に進み、その次を `Next` 用にバッファーします。最初の呼び出しでは最後の命令を越えるのではなく、最初の命令に移ります。最後の命令を越えたあとは false を返し、そのとき `Current` と `Next` も `null` になります。

## Previous

```csharp
public CodeInstruction? Previous(int distance = 1)
```

通過済みの命令を返します。`Previous(1)` は `Current` の 1 つ前、`Previous(2)` はそのまた前という具合です。履歴が足りなければ `null` を返し、`distance` が 0 以下なら `ArgumentOutOfRangeException` をスローします。`MoveNext` が false を返したあとも最後の命令は履歴に残るので、`Previous(1)` はそれを返します。
