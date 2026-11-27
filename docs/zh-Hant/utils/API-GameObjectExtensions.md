# GameObjectExtensions

`io.github.ykysnk.utils.Extensions` · `public static class GameObjectExtensions`

用於 GameObject 的階層路徑、距離判斷與依索引存取元件的輔助方法。需要位置或縮放的部分都經過 GameObject 的 Transform，因此結果與同名的 [`TransformExtensions`](./API-TransformExtensions.md) 成員相同。

## FullName

```csharp
public static string FullName(this GameObject obj)
```

GameObject 的完整階層路徑，例如 `Root/Child/Name`，不含前置斜線。路徑從 GameObject 的 Transform 一路建構到階層根節點。

## IsCloseRange

```csharp
public static bool IsCloseRange(this GameObject obj, GameObject other, float distance)
```

在三個軸上以 Unity 單位比較兩個世界位置。判斷使用嚴格小於 `distance`，因此正好相距該距離的物件不算靠近。

## IsCloseRange2D

```csharp
public static bool IsCloseRange2D(this GameObject obj, GameObject other, float distance)
```

只在 XZ 平面上比較兩個世界位置，因此高度差被忽略。判斷同樣使用嚴格小於 `distance`。

## GetWorldScale

```csharp
[Obsolete("Use Transform.lossyScale instead.")]
public static Vector3 GetWorldScale(this GameObject obj)
```

GameObject 的世界縮放，與 `Transform.lossyScale` 相同。只為原始碼相容而保留，請改讀 `obj.transform.lossyScale`。

## GetLocalScaleFollowWorldScale

```csharp
public static Vector3 GetLocalScaleFollowWorldScale(this GameObject obj)
```

讓 GameObject 的世界縮放等於 (1, 1, 1) 的本機縮放，也就是父層 lossy scale 的倒數。沒有父層的 GameObject 傳回 (1, 1, 1)。

## GetTargetLocalScale

```csharp
public static Vector3 GetTargetLocalScale(this GameObject obj, GameObject other)
```

把對方的世界縮放逐軸除以該 GameObject 的世界縮放，也就是對方在每個軸上大多少倍。兩者縮放相同的軸結果為 1。對方的 Transform 未做 null 檢查即被讀取。

## TryGetComponentAtIndex

```csharp
public static bool TryGetComponentAtIndex(this GameObject obj, int index, out Component component)
```

讀取 GameObject 元件清單中指定索引處的元件。負數或超出末尾的索引傳回 `false`，並把 `component` 設為 `null`。

## GetComponentAtIndexOrDefault

```csharp
public static Component GetComponentAtIndexOrDefault(this GameObject obj, int index)
```

該索引處的元件，索引超出範圍時為 `null`。

## GetComponents

```csharp
public static Component[] GetComponents(this GameObject obj)
```

GameObject 的所有元件，依元件順序排列。結果不依型別篩選，因此可能包含多個相同型別的元件。

## ComponentsForeach

```csharp
public static void ComponentsForeach(this GameObject obj, Action<int, Component> componentAction)
```

對 GameObject 的每個元件，以索引與元件為參數呼叫 `componentAction`。元件數量在迴圈前只讀取一次，因此在回呼內新增或銷毀的元件只影響剩餘的索引。定義 `COMPILER_UDONSHARP` 時不會編譯。

## ComponentsSelect

```csharp
public static T[] ComponentsSelect<T>(this GameObject obj, Func<int, Component, T> selector)
```

把 GameObject 的每個元件傳給 `selector`，並保持元件順序。陣列長度是迴圈前讀取的元件數量。定義 `COMPILER_UDONSHARP` 時不會編譯。

## IsSceneObject

```csharp
public static bool IsSceneObject(this GameObject obj)
```

GameObject 屬於已載入的場景且編輯器不在預製體隔離模式時為 true，也就是 `obj.scene.IsValid() && !Utils.IsInPrefab`。預製體檢查讀取的是編輯器的全域狀態，而不是這個物件。定義 `COMPILER_UDONSHARP` 時，此方法會切換成另一個主體，永遠傳回 `false`。

## IsPlayerCloseRange

```csharp
public static bool IsPlayerCloseRange(this GameObject obj, float distance)
```

僅限 VRChat。在三個軸上把本機玩家的世界位置與該 GameObject 的軸心比較，並與 `distance` 做嚴格比較。沒有有效的本機玩家時傳回 `false`。它只在定義 `UTILS_UDONSHARP` 時存在，該檔案從 `UTILS_VRC_SDK3_BASE` 或 `COMPILER_UDONSHARP` 推導出這個定義。

## IsPlayerCloseRange2D

```csharp
public static bool IsPlayerCloseRange2D(this GameObject obj, float distance)
```

僅限 VRChat。在 XZ 平面上做與 [`IsPlayerCloseRange`](#isplayercloserange) 相同的判斷，因此高度差被忽略。它只在定義 `UTILS_UDONSHARP` 時存在。
