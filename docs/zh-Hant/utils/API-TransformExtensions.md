# TransformExtensions

`io.github.ykysnk.utils.Extensions` · `public static class TransformExtensions`

供 Transform 使用的階層名稱、世界/本機縮放轉換、忽略縮放的座標轉換與距離判斷輔助方法。位置一律是世界位置，因此父層 Transform 會影響每個結果。

## FullName

```csharp
public static string FullName(this Transform transform)
```

Transform 的完整階層路徑，向上建構到根節點並以 `/` 連接，例如 `Root/Child/Name`。沒有前置斜線，沒有父層的 Transform 傳回自己的名稱。

```csharp
var path = selection.activeTransform.FullName();
```

## GetWorldScale

```csharp
[Obsolete("Use Transform.lossyScale instead.")]
public static Vector3 GetWorldScale(this Transform transform)
```

Transform 的世界縮放，與 `Transform.lossyScale` 相同：Transform 自身與其所有父層合成的縮放。只為原始碼相容而保留，請改讀 `lossyScale`。

## GetLocalScaleFollowWorldScale

```csharp
public static Vector3 GetLocalScaleFollowWorldScale(this Transform transform)
```

讓 Transform 的世界縮放等於 (1, 1, 1) 的本機縮放，也就是父層 lossy scale 的倒數。沒有父層的 Transform 傳回 (1, 1, 1)。

## GetTargetLocalScale

```csharp
public static Vector3 GetTargetLocalScale(this Transform transform, Transform other)
public static Vector3 GetTargetLocalScale(this Transform transform, GameObject other)
```

把對方的世界縮放逐軸除以該 Transform 的世界縮放，也就是對方在每個軸上大多少倍。兩者縮放相同的軸結果為 1。`GameObject` 多載讀取 `other.transform`；兩者都未對另一方做 null 檢查。

## GetLocalScaleFromLossyScale

```csharp
public static Vector3 GetLocalScaleFromLossyScale(this Transform transform, Vector3 lossyScale)
```

把期望的世界縮放轉換成能產生它的本機縮放，方法是除以父層的 lossy scale。非等比縮放的父層帶來的旋轉與切變不會被補償，因此只有父層等比縮放時結果才精確。沒有父層的 Transform 原樣傳回 `lossyScale`。

## SetLossyScale

```csharp
public static void SetLossyScale(this Transform transform, Vector3 lossyScale)
```

指派能得到期望世界縮放的本機縮放，且不改動父層 Transform。它與 [`GetLocalScaleFromLossyScale`](#getlocalscalefromlossyscale) 有相同的限制。

## SetLossyScaleInPlace

```csharp
public static void SetLossyScaleInPlace(this Transform transform, Vector3 lossyScale)
```

與 [`SetLossyScale`](#setlossyscale) 完全相同：指派能得到期望世界縮放的本機縮放，且不改動父層 Transform。

## TransformPointUnscaled

```csharp
public static Vector3 TransformPointUnscaled(this Transform transform, Vector3 position)
```

忽略縮放，把本機空間的點轉換為世界空間：點會乘以用縮放 1 建構的平移與旋轉矩陣。父層縮放仍會移動結果，因為它移動了 Transform 的位置，但本機位移本身永遠不會被縮放。

## InverseTransformPointUnscaled

```csharp
public static Vector3 InverseTransformPointUnscaled(this Transform transform, Vector3 position)
```

忽略縮放，把世界位置轉換為 Transform 的本機空間，是 [`TransformPointUnscaled`](#transformpointunscaled) 的反運算。結果是相對於 Transform 的位置，不除以它的縮放。

## Distance

```csharp
public static float Distance(this Transform transform, Transform other)
public static float Distance(this Transform transform, Vector3 other)
```

兩個世界位置在三個軸上的距離，以 Unity 單位表示的非負值。`Vector3` 多載從 Transform 的 `position` 量到指定的世界點。

## Distance2D

```csharp
public static float Distance2D(this Transform transform, Transform other)
public static float Distance2D(this Transform transform, Vector3 other)
```

兩個世界位置在 XZ 平面上的距離，Y 方向的差被忽略，因此高度不影響結果。`Vector3` 多載從 Transform 的 `position` 量到指定的世界點。

## IsCloseRange

```csharp
public static bool IsCloseRange(this Transform transform, Transform other, float distance)
```

在三個軸上比較兩個世界位置。判斷使用嚴格小於 `distance`，因此正好相距該距離的物件不算靠近。

```csharp
if (handle.IsCloseRange(anchor, 0.01f)) Snap();
```

## IsCloseRange2D

```csharp
public static bool IsCloseRange2D(this Transform transform, Transform other, float distance)
```

在 XZ 平面上比較兩個世界位置，因此高度差被忽略，與 `distance` 的比較同樣嚴格。

## IsPlayerCloseRange

```csharp
public static bool IsPlayerCloseRange(this Transform transform, float distance)
```

僅限 VRChat。在三個軸上把本機玩家的世界位置與 Transform 的位置比較，並與 `distance` 做嚴格比較。沒有有效的本機玩家時傳回 `false`。它只在定義 `UTILS_UDONSHARP` 時存在，該檔案從 `UTILS_VRC_SDK3_BASE` 或 `COMPILER_UDONSHARP` 推導出這個定義，因此 VRChat 與 UdonSharp 組建中才有它。

## IsPlayerCloseRange2D

```csharp
public static bool IsPlayerCloseRange2D(this Transform transform, float distance)
```

僅限 VRChat。在 XZ 平面上做與 [`IsPlayerCloseRange`](#isplayercloserange) 相同的判斷，因此高度差被忽略。它只在定義 `UTILS_UDONSHARP` 時存在。
