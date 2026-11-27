# TransformExtensions

`io.github.ykysnk.utils.Extensions` · `public static class TransformExtensions`

Transform のための、階層名、ワールド/ローカルスケール変換、スケールを無視した座標変換、距離判定のヘルパーです。位置は常にワールド位置なので、親の Transform がすべての結果に影響します。

## FullName

```csharp
public static string FullName(this Transform transform)
```

Transform の完全な階層パスです。ルートに向かって組み立てて `/` で連結し、例えば `Root/Child/Name` になります。先頭にスラッシュは付かず、親が無い Transform は自分の名前を返します。

```csharp
var path = selection.activeTransform.FullName();
```

## GetWorldScale

```csharp
[Obsolete("Use Transform.lossyScale instead.")]
public static Vector3 GetWorldScale(this Transform transform)
```

Transform のワールドスケールで、`Transform.lossyScale` と同じです。Transform 自身とすべての親を合わせたスケールです。ソース互換性のためだけに残されているので、`lossyScale` を読んでください。

## GetLocalScaleFollowWorldScale

```csharp
public static Vector3 GetLocalScaleFollowWorldScale(this Transform transform)
```

Transform のワールドスケールを (1, 1, 1) にするローカルスケール、つまり親の lossy scale の逆数です。親が無い Transform は (1, 1, 1) を返します。

## GetTargetLocalScale

```csharp
public static Vector3 GetTargetLocalScale(this Transform transform, Transform other)
public static Vector3 GetTargetLocalScale(this Transform transform, GameObject other)
```

相手のワールドスケールをこの Transform のワールドスケールで軸ごとに割った値、つまり相手が軸ごとに何倍大きいかです。両方が同じスケールの軸では 1 になります。`GameObject` のオーバーロードは `other.transform` を読み、どちらも相手側を null チェックなしで読みます。

## GetLocalScaleFromLossyScale

```csharp
public static Vector3 GetLocalScaleFromLossyScale(this Transform transform, Vector3 lossyScale)
```

望むワールドスケールを、それを実現するローカルスケールに変換します。親の lossy scale で割って求めます。一様でないスケールの親による回転やせん断は補正されないため、結果が正確なのは親が一様スケールのときだけです。親が無い Transform は `lossyScale` をそのまま返します。

## SetLossyScale

```csharp
public static void SetLossyScale(this Transform transform, Vector3 lossyScale)
```

望むワールドスケールになるローカルスケールを代入し、親の Transform は変更しません。[`GetLocalScaleFromLossyScale`](#getlocalscalefromlossyscale) と同じ制限があります。

## SetLossyScaleInPlace

```csharp
public static void SetLossyScaleInPlace(this Transform transform, Vector3 lossyScale)
```

[`SetLossyScale`](#setlossyscale) と同一です。望むワールドスケールになるローカルスケールを代入し、親の Transform は変更しません。

## TransformPointUnscaled

```csharp
public static Vector3 TransformPointUnscaled(this Transform transform, Vector3 position)
```

スケールを無視して、ローカル空間の点をワールド空間に変換します。点はスケール 1 で作った移動と回転の行列で乗算されます。親のスケールは Transform の位置を動かすため結果も動きますが、ローカルのオフセット自体はスケールされません。

## InverseTransformPointUnscaled

```csharp
public static Vector3 InverseTransformPointUnscaled(this Transform transform, Vector3 position)
```

スケールを無視して、ワールド位置を Transform のローカル空間に変換します。[`TransformPointUnscaled`](#transformpointunscaled) の逆変換です。結果は Transform からの相対位置で、スケールでは割りません。

## Distance

```csharp
public static float Distance(this Transform transform, Transform other)
public static float Distance(this Transform transform, Vector3 other)
```

2 つのワールド位置の 3 軸すべてでの距離を、Unity 単位の非負の値で返します。`Vector3` のオーバーロードは Transform の `position` から指定したワールド位置までを測ります。

## Distance2D

```csharp
public static float Distance2D(this Transform transform, Transform other)
public static float Distance2D(this Transform transform, Vector3 other)
```

2 つのワールド位置の XZ 平面上での距離です。Y の差は無視されるため高さは関係しません。`Vector3` のオーバーロードは Transform の `position` から指定したワールド位置までを測ります。

## IsCloseRange

```csharp
public static bool IsCloseRange(this Transform transform, Transform other, float distance)
```

2 つのワールド位置を 3 軸すべてで比較します。判定は `distance` より厳密に小さい場合だけなので、ちょうどその距離だけ離れたオブジェクトは近いとみなされません。

```csharp
if (handle.IsCloseRange(anchor, 0.01f)) Snap();
```

## IsCloseRange2D

```csharp
public static bool IsCloseRange2D(this Transform transform, Transform other, float distance)
```

2 つのワールド位置を XZ 平面で比較するため高さの差は無視され、`distance` との比較は同じく厳密です。

## IsPlayerCloseRange

```csharp
public static bool IsPlayerCloseRange(this Transform transform, float distance)
```

VRChat 専用です。ローカルプレイヤーのワールド位置と Transform の位置を 3 軸すべてで比較し、`distance` と厳密に比較します。有効なローカルプレイヤーがいない場合は `false` を返します。`UTILS_UDONSHARP` が定義されているときだけ存在し、このファイルは `UTILS_VRC_SDK3_BASE` または `COMPILER_UDONSHARP` からそれを定義します。そのため VRChat と UdonSharp のビルドにだけ含まれます。

## IsPlayerCloseRange2D

```csharp
public static bool IsPlayerCloseRange2D(this Transform transform, float distance)
```

VRChat 専用です。[`IsPlayerCloseRange`](#isplayercloserange) を XZ 平面で行うため、高さの差は無視されます。`UTILS_UDONSHARP` が定義されているときだけ存在します。
