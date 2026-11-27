# ReversePatchMethod

`io.github.ykysnk.utils.Editor.Patches` · `public abstract class ReversePatchMethod<T> : IReversePatchMethod, ILogger where T : ReversePatchMethod<T>, new()`

1 件のリバースパッチです。別のメソッドの本体を呼び出せるコピーを受け取るスタブメソッドで、必要に応じて transpiler を通します。インスタンスは [`Patch`](./API-Patch.md) グループの中に入れ子になったクラスです。

`T` は具体的なリバースパッチクラスです。`IReversePatchMethod` と `ILogger` を実装し、`new()` 制約によってフレームワークと遅延生成の `Instance` がインスタンスを作れます。`TargetMethod` と各 `Target*` プロパティは virtual、`Prepare` と `Cleanup` は既定の実装を持つ virtual のフックで、抽象メンバーはありません。

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

パッチ適用の外から使うための、遅延生成されるインスタンスです。リバースパッチ自体はフレームワークが生成します。

## ThisType

```csharp
public static Type ThisType { get; }
```

リバースパッチの型です。リフレクションの対象になる型であり、ログの接頭辞の名前にもなります。

## ReverseMethod

```csharp
public virtual string ReverseMethod { get; }
```

コピーされた本体を受け取るネストされたスタブメソッドの名前で、既定値は `"Reverse"` です。別の名前にするときはオーバーライドしてください。

## TranspilerMethod

```csharp
public virtual string TranspilerMethod { get; }
```

transpiler として使うネストメソッドの名前で、既定値は `"Transpiler"` です。別の名前にするときはオーバーライドしてください。

## QualifiedName

```csharp
public virtual string QualifiedName { get; }
```

リバースパッチの一意な名前で、ログとエラー報告に使われます。既定値は完全な型名で、無ければ短い名前です。

## DisplayName

```csharp
public virtual string DisplayName { get; }
```

リバースパッチの短い名前で、書き出すすべてのログ項目の接頭辞になります。既定値は型名です。

## Enabled

```csharp
public virtual bool Enabled { get; }
```

リバースパッチを適用するかどうかです。既定値は true で、無効なものは Harmony に触れずにスキップされます。

## TargetMethod

```csharp
public virtual MethodInfo? TargetMethod { get; }
```

本体をコピーするメソッドです。基底の値は `null` なので、すべての具象リバースパッチクラスがオーバーライドします。`null` のままなら何も適用されず、警告がログに記録されます。

## TargetReverse

```csharp
public virtual MethodInfo? TargetReverse { get; }
```

コピーされた本体を受け取るスタブメソッド、つまり `ReverseMethod` という名前のネストメソッドで、存在しなければ `null` です。シグネチャは `TargetMethod` と一致している必要があります。

## TargetTranspiler

```csharp
public virtual MethodInfo? TargetTranspiler { get; }
```

コピーされた本体に適用する transpiler です。`TranspilerMethod` という名前のネストメソッドか、`null` の場合はスタブのローカル関数として宣言された transpiler にフォールバックします。そのフォールバックは、スタブの名前を持つ `IEnumerable<CodeInstruction>` 戻り値の生成メソッドです。

## Priority

```csharp
public virtual int Priority { get; }
```

このリバースパッチに与える Harmony の優先度です。既定値の -1 は、優先度を明示しないことを意味します。

## Before

```csharp
public virtual string[]? Before { get; }
```

このリバースパッチより先に実行する必要がある Harmony ID です。`null` なら順序の制約はありません。

## After

```csharp
public virtual string[]? After { get; }
```

このリバースパッチより後に実行する必要がある Harmony ID です。`null` なら順序の制約はありません。

## Debug

```csharp
public virtual bool? Debug { get; }
```

リバースパッチの Harmony デバッグフラグです。`null` なら設定しません。

## Prepare

```csharp
protected virtual bool Prepare(MethodInfo? original, Harmony harmony)
```

リバースパッチを適用する直前に実行し、スタブの実行中に必要な状態を用意します。既定では true を返し、false を返すとリバースパッチをスキップします。その場合、適用も後片付けも行われません。

## Cleanup

```csharp
protected virtual Exception? Cleanup(Exception? exception, Harmony harmony, MethodInfo? original)
```

リバースパッチを試みる `finally` ブロックで、成功したかどうかに関係なく実行されます。基底の実装は `exception` をそのまま返し、null 以外の結果はエラーとしてログに記録されます。

## Method

```csharp
protected static MethodInfo? Method(string name)
```

リバースパッチクラスのメソッドを名前だけで解決し、その名前のメソッドが無ければ `null` を返します。結果はパッチのコアがキャッシュし、解決できなかった名前も記憶されるので、失敗したリフレクション検索は 1 回だけで済みます。

## Patch

```csharp
void IReversePatchMethod.Patch(Harmony harmony)
```

`Prepare` と `Cleanup` を含めてリバースパッチを適用します。`Enabled` が false の場合や、スタブと `TargetMethod` のどちらかが無い場合は戻ります。その後、`Priority`、`Before`、`After`、`Debug` から作った `HarmonyMethod` と、`TargetTranspiler` またはローカル関数のフォールバックを使って `Harmony.ReversePatch` を呼びます。`IReversePatchMethod` 経由でしか呼べず、グループはそのように実行します。

## Log

```csharp
public void Log(object? message)
public void Log(object? message, Object context)
```

`Debug.Log` でメッセージを書き出し、`DisplayName` を接頭辞にします。`context` を取るオーバーロードは、コンソールの項目をクリックしたときにその Unity オブジェクトを強調表示します。

## LogWarning

```csharp
public void LogWarning(object? message)
public void LogWarning(object? message, Object context)
```

`Debug.LogWarning` でメッセージを書き出し、`DisplayName` を接頭辞にします。`context` を取るオーバーロードは、コンソールの項目をクリックしたときにその Unity オブジェクトを強調表示します。

## LogError

```csharp
public void LogError(object? message)
public void LogError(object? message, Object context)
```

`Debug.LogError` でメッセージを書き出し、`DisplayName` を接頭辞にします。`context` を取るオーバーロードは、コンソールの項目をクリックしたときにその Unity オブジェクトを強調表示します。

## Assert

```csharp
public void Assert(bool condition, object? message)
public void Assert(bool condition, object? message, Object context)
```

`Debug.Assert` で `condition` をアサートし、失敗したときは `DisplayName` を接頭辞にしたメッセージを報告します。`context` を取るオーバーロードは、コンソールの項目をクリックしたときにその Unity オブジェクトを強調表示します。

## Log2

```csharp
public static void Log2(object? message)
public static void Log2(object? message, Object context)
```

`Log` と同じですが、静的メンバーから使います。インスタンスが無いため、接頭辞は `ThisType.Name` になります。

## LogWarning2

```csharp
public static void LogWarning2(object? message)
public static void LogWarning2(object? message, Object context)
```

`LogWarning` と同じですが、静的メンバーから使い、接頭辞は型名になります。

## LogError2

```csharp
public static void LogError2(object? message)
public static void LogError2(object? message, Object context)
```

`LogError` と同じですが、静的メンバーから使い、接頭辞は型名になります。

## Assert2

```csharp
public static void Assert2(bool condition, object? message)
public static void Assert2(bool condition, object? message, Object context)
```

`Assert` と同じですが、静的メンバーから使い、接頭辞は型名になります。
