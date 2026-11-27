# Patch

`io.github.ykysnk.utils.Editor.Patches` · `public abstract class Patch<T> : IPatch, ILogger where T : Patch<T>, new()`

[`PatchLoader`](./API-PatchLoader.md) が 1 つの単位として適用するパッチのグループです。実装するクラスがコンテナーになり、まず自身の `Execute` が実行され、続いてその中に入れ子になったすべてのパッチメソッドが実行されます。

`T` は具体的なグループです。`IPatch` と `ILogger` を実装し、`new()` 制約によってフレームワークと遅延生成の `Instance` がインスタンスを作れます。抽象メンバーは `Execute` だけで、`QualifiedName`、`DisplayName`、`Enabled` は既定値を持つ virtual で、`Run` はオーバーライドできません。

```csharp
internal sealed class MyGroup : Patch<MyGroup>
{
    protected override void Execute(Harmony harmony)
    {
        // Optional: patches the group applies by hand, before the nested ones.
    }

    private sealed class HideHandle : PatchMethod<HideHandle>
    {
        // ...
    }
}
```

## Instance

```csharp
public static T Instance { get; }
```

パッチ適用の外から使うための、遅延生成されるインスタンスです。グループを適用するときにフレームワークは独自のインスタンスを作ります。

## ThisType

```csharp
public static Type ThisType { get; }
```

パッチグループの型です。そのネスト型が `Run` で適用されるパッチになります。

## ThisHarmony

```csharp
protected Harmony? ThisHarmony { get; set; }
```

所有するローダーの Harmony インスタンスです。グループの実行前に `IPatch.ThisHarmony` 経由で割り当てられ、それまでは `null` です。

## QualifiedName

```csharp
public virtual string QualifiedName { get; }
```

グループの安定した識別子で、適用するパッチを報告するときに使います。既定値は完全な型名で、無ければ短い名前です。

## DisplayName

```csharp
public virtual string DisplayName { get; }
```

グループの短い名前で、書き出すすべてのログ項目の接頭辞になります。既定値は型名です。

## Enabled

```csharp
public virtual bool Enabled { get; }
```

グループを適用するかどうかです。既定値は true で、無効なグループは Harmony に触れずにスキップされます。

## Execute

```csharp
protected abstract void Execute(Harmony harmony)
```

このグループ自身が宣言するパッチを適用します。入れ子のパッチメソッドより先に実行されます。すべての具象グループがオーバーライドする必要があり、中身は空でもかまいません。

## Run

```csharp
void IPatch.Run(Harmony harmony)
```

グループ全体を適用します。`Enabled` が false ならすぐに戻り、そうでなければ `Execute` を呼び、続いてネストされたすべての [`PatchMethod`](./API-PatchMethod.md) と [`ReversePatchMethod`](./API-ReversePatchMethod.md) を実行します。`IPatch` 経由でしか呼べず、ローダーはそのように呼びます。

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
