# PatchLoader

`io.github.ykysnk.utils.Editor.Patches` · `public abstract class PatchLoader<T> : IPatchLoader, ILogger where T : PatchLoader<T>, new()`

1 つのアセンブリの入口です。そのアセンブリ用に作られた Harmony インスタンスを受け取り、[`Patch`](./API-Patch.md) グループを適用します。どの実装を読み込むかは [`ExportsPatchLoader`](./API-ExportsPatchLoader.md) が指定します。

`T` は具体的なローダーです。`IPatchLoader` と `ILogger` を実装し、`new()` 制約によってフレームワークと遅延生成の `Instance` がインスタンスを作れます。抽象メンバーは `Load` だけで、`Unload`、`QualifiedName`、`DisplayName`、`Enabled` は virtual です。

```csharp
[assembly: ExportsPatchLoader(typeof(MyLoader))]

internal sealed class MyLoader : PatchLoader<MyLoader>
{
    public override void Load(Harmony harmony)
    {
        Run(MyGroup.Instance);
    }
}
```

## Instance

```csharp
public static T Instance { get; }
```

パッチ適用の外から使うための、遅延生成されるインスタンスです。アセンブリを読み込むときにフレームワークは独自のインスタンスを作ります。

## ThisType

```csharp
public static Type ThisType { get; }
```

ローダーの型で、ログの接頭辞とローダーの既定の名前に使われます。

## ThisHarmony

```csharp
protected Harmony? ThisHarmony { get; set; }
```

このローダーの Harmony インスタンスです。`Load` が呼ばれる前に `IPatchLoader.ThisHarmony` 経由で割り当てられ、フレームワークが割り当てるまでは `null` です。

## QualifiedName

```csharp
public virtual string QualifiedName { get; }
```

ローダーの一意な名前で、そのインスタンスの Harmony ID にもなります。そのためパッチを再び取り除くときのキーでもあります。既定値は完全な型名で、無ければ短い名前です。

## DisplayName

```csharp
public virtual string DisplayName { get; }
```

ローダーの短い名前で、ログ項目とエラー報告に使われます。既定値は型名です。

## Enabled

```csharp
public virtual bool Enabled { get; }
```

ローダーを実行するかどうかです。既定値は true で、無効なローダーは読み込まれず、アンロードもされません。

## Load

```csharp
public abstract void Load(Harmony harmony)
```

アセンブリのすべてのパッチを適用します。ここでパッチグループを実行し、通常は `Run` を使います。すべての具象ローダーがオーバーライドする必要があります。

## Unload

```csharp
public virtual void Unload(Harmony harmony)
```

アセンブリを再読み込みする直前、パッチがまだ存在するときに呼ばれます。基底の実装は何もしません。Harmony のパッチはフレームワーク自身が取り除くためです。ローダーが持つ状態を解放したいときにオーバーライドしてください。Harmony インスタンスは `Load` に渡されたものと同じです。

## Run

```csharp
protected void Run(IPatch patch)
```

このローダーの Harmony インスタンスでパッチグループを実行します。グループがインスタンスを自分で持つ必要はありません。グループの `IPatch.ThisHarmony` はここで上書きされます。ローダーがまだ Harmony インスタンスを持っていない場合（フレームワークが読み込む前に使った場合）は `InvalidOperationException` をスローします。

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
