# Utils

`io.github.ykysnk.utils` · `public static class Utils`

Udon から安全に呼べる小さなヘルパー群です。色付き接頭辞でのログ出力と、いくつかの状態チェックがあります。

接頭辞は `[prefix]` として `#D771C0` で描画されます。ログとアサーションのすべてのメンバーには `[HideInCallstack]` が付いているため、コンソールの項目はこのファイルではなく呼び出し元を指します。

## Log

```csharp
public static void Log(string prefix, object message)
public static void Log(string prefix, object message, UnityEngine.Object context)
```

`Debug.Log` で `[prefix] message` を書き出します。`prefix` が色付きの部分で、`message` が null の場合は空の値が記録されます。`context` を取るオーバーロードは、コンソールの項目をクリックしたときにそのオブジェクトを強調表示します。

```csharp
Utils.Log(nameof(MyWindow), "Opened");
```

## LogWarning

```csharp
public static void LogWarning(string prefix, object message)
public static void LogWarning(string prefix, object message, UnityEngine.Object context)
```

`Debug.LogWarning` で接頭辞付きのメッセージを書き出します。`context` を取るオーバーロードは、コンソールの項目をクリックしたときにそのオブジェクトを強調表示します。

## LogError

```csharp
public static void LogError(string prefix, object message)
public static void LogError(string prefix, object message, UnityEngine.Object context)
```

`Debug.LogError` で接頭辞付きのメッセージを書き出します。`context` を取るオーバーロードは、コンソールの項目をクリックしたときにそのオブジェクトを強調表示します。

## LogAssert

```csharp
[Obsolete("Use Assert(bool condition, string prefix, object message) instead")]
public static void LogAssert(bool condition, string prefix, object message)

[Obsolete("Use Assert(bool condition, string prefix, object message, Object context) instead")]
public static void LogAssert(bool condition, string prefix, object message, UnityEngine.Object context)
```

互換性のために残されています。接頭辞付きのメッセージを `Debug.Assert` に渡すだけです。[`Assert`](#assert) を使用してください。

## Assert

```csharp
public static void Assert(bool condition, string prefix, object message)
public static void Assert(bool condition, string prefix, object message, UnityEngine.Object context)
```

`Debug.Assert` で `condition` をアサートし、失敗したときは色付き接頭辞付きのメッセージを報告します。`context` を取るオーバーロードは、コンソールの項目をクリックしたときにそのオブジェクトを強調表示します。

```csharp
Utils.Assert(path != null, nameof(MyWindow), "Path must be set");
```

## IsMoved

```csharp
public static bool IsMoved(float value)
```

1 フレームの差分が移動とみなされるかどうか、つまり `value < -0.05f || value > 0.05f` です。しきい値は厳密比較なので、差分がちょうど `0.05f` の場合は移動になりません。

## IsInPrefab2

```csharp
public static bool IsInPrefab2()
```

エディターが現在プレハブ編集モードかどうか。プレイヤーでは常に false です。Udon 内で安全に使える名前です。

## IsPlaying2

```csharp
public static bool IsPlaying2()
```

プレイモードが有効、または開始されようとしているかどうか。プレイヤーでは常に true です。Udon 内で安全に使える名前です。

## IsInPrefab

```csharp
public static bool IsInPrefab { get; }
```

`IsInPrefab2` のプロパティ形式です。`PrefabStageUtility` に依存するため、`COMPILER_UDONSHARP` が定義されているときはコンパイルされません。

## IsPlaying

```csharp
public static bool IsPlaying { get; }
```

`IsPlaying2` のプロパティ形式です。`EditorApplication` に依存するため、`COMPILER_UDONSHARP` が定義されているときはコンパイルされません。

## ToLayer

```csharp
public static int ToLayer(LayerMask mask)
```

単一レイヤーのマスクのレイヤーインデックス、つまり最上位に立っているビットの位置を返します。マスクが 0 の場合は 31 を返します。これはビット走査の結果です。

```csharp
var layer = Utils.ToLayer(LayerMask.GetMask("Water"));
```
