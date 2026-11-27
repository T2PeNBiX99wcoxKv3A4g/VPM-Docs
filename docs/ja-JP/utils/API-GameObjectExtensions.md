# GameObjectExtensions

`io.github.ykysnk.utils.Extensions` · `public static class GameObjectExtensions`

GameObject のための、階層パス、距離判定、インデックスによるコンポーネントアクセスのヘルパーです。位置やスケールが必要なものは GameObject の Transform を通すため、結果は同名の [`TransformExtensions`](./API-TransformExtensions.md) メンバーと同じです。

## FullName

```csharp
public static string FullName(this GameObject obj)
```

GameObject の完全な階層パスです（例: `Root/Child/Name`）。先頭にスラッシュは付きません。GameObject の Transform から階層のルートまでを組み立てます。

## IsCloseRange

```csharp
public static bool IsCloseRange(this GameObject obj, GameObject other, float distance)
```

2 つのワールド位置を Unity 単位で 3 軸すべて比較します。判定は `distance` より厳密に小さい場合だけなので、ちょうどその距離だけ離れたオブジェクトは近いとみなされません。

## IsCloseRange2D

```csharp
public static bool IsCloseRange2D(this GameObject obj, GameObject other, float distance)
```

2 つのワールド位置を XZ 平面だけで比較するため、高さの差は無視されます。判定は `distance` より厳密に小さい場合だけです。

## GetWorldScale

```csharp
[Obsolete("Use Transform.lossyScale instead.")]
public static Vector3 GetWorldScale(this GameObject obj)
```

GameObject のワールドスケールで、`Transform.lossyScale` と同じです。ソース互換性のためだけに残されているので、`obj.transform.lossyScale` を読んでください。

## GetLocalScaleFollowWorldScale

```csharp
public static Vector3 GetLocalScaleFollowWorldScale(this GameObject obj)
```

GameObject のワールドスケールを (1, 1, 1) にするローカルスケール、つまり親の lossy scale の逆数です。親が無い GameObject は (1, 1, 1) を返します。

## GetTargetLocalScale

```csharp
public static Vector3 GetTargetLocalScale(this GameObject obj, GameObject other)
```

相手のワールドスケールをこの GameObject のワールドスケールで軸ごとに割った値、つまり相手が軸ごとに何倍大きいかです。両方が同じスケールの軸では 1 になります。相手の Transform は null チェックなしで読みます。

## TryGetComponentAtIndex

```csharp
public static bool TryGetComponentAtIndex(this GameObject obj, int index, out Component component)
```

GameObject のコンポーネント一覧の指定インデックスのコンポーネントを読みます。負の値や末尾を超えるインデックスは `false` を返し、`component` を `null` にします。

## GetComponentAtIndexOrDefault

```csharp
public static Component GetComponentAtIndexOrDefault(this GameObject obj, int index)
```

そのインデックスのコンポーネント、またはインデックスが範囲外のときは `null` です。

## GetComponents

```csharp
public static Component[] GetComponents(this GameObject obj)
```

GameObject のすべてのコンポーネントをコンポーネント順で返します。型で絞り込まないため、同じ型のコンポーネントが複数含まれることがあります。

## ComponentsForeach

```csharp
public static void ComponentsForeach(this GameObject obj, Action<int, Component> componentAction)
```

GameObject のすべてのコンポーネントについて、インデックスとコンポーネントを引数に `componentAction` を呼びます。コンポーネント数はループの前に一度だけ読むため、コールバック内で追加・破棄されたコンポーネントは残りのインデックスにだけ影響します。`COMPILER_UDONSHARP` が定義されているときはコンパイルされません。

## ComponentsSelect

```csharp
public static T[] ComponentsSelect<T>(this GameObject obj, Func<int, Component, T> selector)
```

GameObject のすべてのコンポーネントを `selector` に通し、コンポーネント順を保ちます。配列の長さはループの前に読んだコンポーネント数です。`COMPILER_UDONSHARP` が定義されているときはコンパイルされません。

## IsSceneObject

```csharp
public static bool IsSceneObject(this GameObject obj)
```

GameObject が読み込まれたシーンに属し、エディターがプレハブ分離モードでないとき true、つまり `obj.scene.IsValid() && !Utils.IsInPrefab` です。プレハブ判定はこのオブジェクトではなくエディターのグローバル状態を読みます。`COMPILER_UDONSHARP` が定義されているときは、常に `false` を返す別の本体に切り替わります。

## IsPlayerCloseRange

```csharp
public static bool IsPlayerCloseRange(this GameObject obj, float distance)
```

VRChat 専用です。ローカルプレイヤーのワールド位置とこの GameObject のピボットを 3 軸すべてで比較し、`distance` と厳密に比較します。有効なローカルプレイヤーがいない場合は `false` を返します。`UTILS_UDONSHARP` が定義されているときだけ存在し、このファイルは `UTILS_VRC_SDK3_BASE` または `COMPILER_UDONSHARP` からそれを定義します。

## IsPlayerCloseRange2D

```csharp
public static bool IsPlayerCloseRange2D(this GameObject obj, float distance)
```

VRChat 専用です。[`IsPlayerCloseRange`](#isplayercloserange) を XZ 平面で行うため、高さの差は無視されます。`UTILS_UDONSHARP` が定義されているときだけ存在します。
