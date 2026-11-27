# PatchMethod

`io.github.ykysnk.utils.Editor.Patches` · `public abstract class PatchMethod<T> : IPatchMethod, ILogger where T : PatchMethod<T>, new()`

1 組分の Harmony パッチです。対象のメソッドと、それに属する prefix、postfix、transpiler、finalizer を持ちます。インスタンスは [`Patch`](./API-Patch.md) グループの中に入れ子になったクラスです。

`T` は具体的なパッチクラスです。`IPatchMethod` と `ILogger` を実装し、`new()` 制約によってフレームワークと遅延生成の `Instance` がインスタンスを作れます。`TargetMethod` と各 `Target*` プロパティは virtual、`Prepare` と `Cleanup` は既定の実装を持つ virtual のフックで、抽象メンバーはありません。

```csharp
private sealed class HideHandle : PatchMethod<HideHandle>
{
    public override MethodInfo? TargetMethod { get; } =
        AccessTools.Method(typeof(UnityEditor.Editor), "DrawHeader");

    private static void Prefix() => EditorGUI.BeginDisabledGroup(true);
    private static void Postfix() => EditorGUI.EndDisabledGroup();
}
```

## Instance

```csharp
public static T Instance { get; }
```

パッチ適用の外から使うための、遅延生成されるインスタンスです。パッチセット自体はフレームワークが生成します。

## ThisType

```csharp
public static Type ThisType { get; }
```

パッチの型です。リフレクションの対象になる型であり、ログの接頭辞の名前にもなります。

## PrefixMethod

```csharp
public virtual string PrefixMethod { get; }
```

prefix として使うネストメソッドの名前で、既定値は `"Prefix"` です。別の名前にするときはオーバーライドしてください。

## PostfixMethod

```csharp
public virtual string PostfixMethod { get; }
```

postfix として使うネストメソッドの名前で、既定値は `"Postfix"` です。別の名前にするときはオーバーライドしてください。

## TranspilerMethod

```csharp
public virtual string TranspilerMethod { get; }
```

transpiler として使うネストメソッドの名前で、既定値は `"Transpiler"` です。別の名前にするときはオーバーライドしてください。

## FinalizerMethod

```csharp
public virtual string FinalizerMethod { get; }
```

finalizer として使うネストメソッドの名前で、既定値は `"Finalizer"` です。別の名前にするときはオーバーライドしてください。

## QualifiedName

```csharp
public virtual string QualifiedName { get; }
```

パッチの一意な名前で、ログとエラー報告に使われます。既定値は完全な型名で、無ければ短い名前です。

## DisplayName

```csharp
public virtual string DisplayName { get; }
```

パッチの短い名前で、書き出すすべてのログ項目の接頭辞になります。既定値は型名です。

## Enabled

```csharp
public virtual bool Enabled { get; }
```

パッチを適用するかどうかです。既定値は true で、無効なパッチは Harmony に触れずにスキップされます。

## TargetMethod

```csharp
public virtual MethodInfo? TargetMethod { get; }
```

パッチを当てるメソッドです。基底の値は `null` なので、すべての具象パッチクラスがオーバーライドし、通常は `AccessTools.Method` で解決します。`null` のままなら何も適用されず、警告がログに記録されます。

## TargetPrefix

```csharp
public virtual MethodInfo? TargetPrefix { get; }
```

`PrefixMethod` という名前のネストメソッドで、存在しなければ `null` です。`Method` を通じて名前だけで探します。

## TargetPostfix

```csharp
public virtual MethodInfo? TargetPostfix { get; }
```

`PostfixMethod` という名前のネストメソッドで、存在しなければ `null` です。`Method` を通じて名前だけで探します。

## TargetTranspiler

```csharp
public virtual MethodInfo? TargetTranspiler { get; }
```

`TranspilerMethod` という名前のネストメソッドで、存在しなければ `null` です。`Method` を通じて名前だけで探します。

## TargetFinalizer

```csharp
public virtual MethodInfo? TargetFinalizer { get; }
```

`FinalizerMethod` という名前のネストメソッドで、存在しなければ `null` です。`Method` を通じて名前だけで探します。

## Priority

```csharp
public virtual int Priority { get; }
```

このセットのすべてのパッチメソッドに与える Harmony の優先度です。既定値の -1 は、優先度を明示しないことを意味します。

## Before

```csharp
public virtual string[]? Before { get; }
```

このパッチより先に実行する必要がある Harmony ID です。`null` なら順序の制約はありません。

## After

```csharp
public virtual string[]? After { get; }
```

このパッチより後に実行する必要がある Harmony ID です。`null` なら順序の制約はありません。

## Debug

```csharp
public virtual bool? Debug { get; }
```

パッチメソッドの Harmony デバッグフラグです。`null` なら設定しません。

## Prepare

```csharp
protected virtual bool Prepare(MethodInfo? original, Harmony harmony)
```

パッチを適用する直前に実行し、パッチメソッドの実行中に必要な状態を用意します。既定では true を返し、false を返すと今回はパッチを当てません。その場合、適用も後片付けも行われません。

## Cleanup

```csharp
protected virtual Exception? Cleanup(Exception? exception, Harmony harmony, MethodInfo? original)
```

パッチを試みる `finally` ブロックで、成功したかどうかに関係なく実行されます。基底の実装は `exception` をそのまま返し、null 以外の結果はエラーとしてログに記録されます。

## Method

```csharp
protected static MethodInfo? Method(string name)
```

パッチクラスのメソッドを名前だけで解決し、その名前のメソッドが無ければ `null` を返します。結果はパッチのコアがキャッシュし、解決できなかった名前も記憶されるので、失敗したリフレクション検索は 1 回だけで済みます。

## Patch

```csharp
void IPatchMethod.Patch(Harmony harmony)
```

`Prepare` と `Cleanup` を含めてパッチを適用します。`Enabled` が false の場合や `TargetMethod` が無い場合は戻り、パッチメソッドが 1 つも無ければ警告をログに記録します。その後、解決した各パッチメソッドを `Priority`、`Before`、`After`、`Debug` から作った `HarmonyMethod` として `Harmony.Patch` に渡します。`IPatchMethod` 経由でしか呼べず、グループはそのように実行します。

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
