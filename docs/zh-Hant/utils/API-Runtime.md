# 執行階段

## Utils

`io.github.ykysnk.utils` · `public static class Utils`

可在 Udon 中安全呼叫的小型輔助工具：帶彩色前置字串的記錄，以及幾個狀態檢查。

前置字串會以 `#D771C0` 的 `[prefix]` 形式呈現。每個記錄與斷言成員都帶有 `[HideInCallstack]`，因此主控台項目會指向呼叫端，而不是這個檔案。

### Log(string prefix, object message)

```csharp
public static void Log(string prefix, object message)
```

以 `Debug.Log` 寫出 `[prefix] message`。`prefix` 是著色的部分；`message` 為 null 時會記錄空值。

```csharp
Utils.Log(nameof(MyWindow), "Opened");
```

### Log(string prefix, object message, Object context)

```csharp
public static void Log(string prefix, object message, UnityEngine.Object context)
```

與雙引數多載相同，並在點擊主控台項目時醒目提示 `context`。

### LogWarning(string prefix, object message)

```csharp
public static void LogWarning(string prefix, object message)
```

以 `Debug.LogWarning` 寫出帶前置字串的訊息。

### LogWarning(string prefix, object message, Object context)

```csharp
public static void LogWarning(string prefix, object message, UnityEngine.Object context)
```

警告多載，會在點擊主控台項目時醒目提示 `context`。

### LogError(string prefix, object message)

```csharp
public static void LogError(string prefix, object message)
```

以 `Debug.LogError` 寫出帶前置字串的訊息。

### LogError(string prefix, object message, Object context)

```csharp
public static void LogError(string prefix, object message, UnityEngine.Object context)
```

錯誤多載，會在點擊主控台項目時醒目提示 `context`。

### LogAssert(bool condition, string prefix, object message)

```csharp
[Obsolete("Use Assert(bool condition, string prefix, object message) instead")]
public static void LogAssert(bool condition, string prefix, object message)
```

為了相容性而保留；它只是把帶前置字串的訊息轉給 `Debug.Assert`。請改用 `Assert`。

### LogAssert(bool condition, string prefix, object message, Object context)

```csharp
[Obsolete("Use Assert(bool condition, string prefix, object message, Object context) instead")]
public static void LogAssert(bool condition, string prefix, object message, UnityEngine.Object context)
```

為了相容性而保留；請改用 `Assert`。

### Assert(bool condition, string prefix, object message)

```csharp
public static void Assert(bool condition, string prefix, object message)
```

透過 `Debug.Assert` 斷言 `condition`，失敗時以彩色前置字串回報訊息。

```csharp
Utils.Assert(path != null, nameof(MyWindow), "Path must be set");
```

### Assert(bool condition, string prefix, object message, Object context)

```csharp
public static void Assert(bool condition, string prefix, object message, UnityEngine.Object context)
```

與三引數多載相同，並在點擊主控台項目時醒目提示 `context`。

### IsMoved(float value)

```csharp
public static bool IsMoved(float value)
```

每幀的差值是否算作移動：`value < -0.05f || value > 0.05f`。門檻使用嚴格比較，因此差值正好為 `0.05f` 不算移動。

### IsInPrefab2()

```csharp
public static bool IsInPrefab2()
```

編輯器是否處於預製體編輯模式。在播放器中永遠為 false。這是可在 Udon 內安全使用的名稱。

### IsPlaying2()

```csharp
public static bool IsPlaying2()
```

播放模式是否已啟用或即將開始。在播放器中永遠為 true。這是可在 Udon 內安全使用的名稱。

### IsInPrefab

```csharp
public static bool IsInPrefab { get; }
```

`IsInPrefab2` 的屬性形式。定義 `COMPILER_UDONSHARP` 時不會編譯，因為它依賴 `PrefabStageUtility`。

### IsPlaying

```csharp
public static bool IsPlaying { get; }
```

`IsPlaying2` 的屬性形式。定義 `COMPILER_UDONSHARP` 時不會編譯，因為它依賴 `EditorApplication`。

### ToLayer(LayerMask mask)

```csharp
public static int ToLayer(LayerMask mask)
```

傳回單層遮罩的層索引，也就是其最高已設定位元的位置。遮罩為零時傳回 31，這是位元走訪所產生的結果。

```csharp
var layer = Utils.ToLayer(LayerMask.GetMask("Water"));
```

## IUtilsEditorOnly

`io.github.ykysnk.utils` · `public interface IUtilsEditorOnly`

標記介面，用於應從組建中移除的行為。它不宣告任何成員；定義 `UTILS_NDMF` 時會擴充 `nadena.dev.ndmf.INDMFEditorOnly`，定義
`UTILS_VRC_SDK3_BASE` 時會擴充 `VRC.SDKBase.IEditorOnly`，其餘情況則是空的標記。

## BasicEditorComponent

`io.github.ykysnk.utils` · `public abstract class BasicEditorComponent : MonoBehaviour, IUtilsEditorOnly`

空的基底類別，用於不應殘留到上傳模型或世界中的輔助行為。它不新增任何成員；繼承它，組建流程就會透過 `IUtilsEditorOnly` 移除該元件。

## BooleanVector3

`io.github.ykysnk.utils.NonUdon` · `public struct BooleanVector3 : IEquatable<BooleanVector3>`

三個各自獨立的布林值，以單純的可序列化欄位保存，並提供 `Flags` 檢視把它們打包成單一位元遮罩，方便做類似開關的判斷。

### x, y, z

```csharp
public bool x;
public bool y;
public bool z;
```

X、Y、Z 分量是否已設定。

### Flags

```csharp
public int Flags { get; set; }
```

三個分量以 `Flag` 值的遮罩表示。指派遮罩會覆寫全部三個分量，因此遮罩未指名的分量會被清除。指派時會丟棄 `Flag.All` 之外的位元。

### Flag

```csharp
public enum Flag
{
    X = 1 << 0,
    Y = 1 << 1,
    Z = 1 << 2,
    None = 0,
    All = X | Y | Z
}
```

單一分量或其組合的位元選擇器。

### HasFlag(Flag flag)

```csharp
public bool HasFlag(Flag flag)
```

`flag` 的每個位元目前是否都已設定。`Flag.None` 永遠符合。

### HasFlags(params Flag[] flags)

```csharp
public bool HasFlags(params Flag[] flags)
```

`flags` 涵蓋的每個位元是否都已設定。空陣列符合所有情況。

### AddFlag(Flag flag)

```csharp
public void AddFlag(Flag flag)
```

設定 `flag` 的位元，其他分量保持不變。

### AddFlags(params Flag[] flags)

```csharp
public void AddFlags(params Flag[] flags)
```

設定 `flags` 涵蓋的位元，其他分量保持不變。空陣列不會造成變更。

### RemoveFlag(Flag flag)

```csharp
public void RemoveFlag(Flag flag)
```

清除 `flag` 的位元，其他分量保持不變。

### RemoveFlags(params Flag[] flags)

```csharp
public void RemoveFlags(params Flag[] flags)
```

清除 `flags` 涵蓋的位元，其他分量保持不變。空陣列不會造成變更。

### SetFlag(Flag flag)

```csharp
public void SetFlag(Flag flag)
```

以 `flag` 取代整個遮罩，因此它未指名的分量會被清除。

### SetFlags(params Flag[] flags)

```csharp
public void SetFlags(params Flag[] flags)
```

以 `flags` 的聯集取代整個遮罩。空陣列會清除全部三個分量。

### Set(bool x2, bool y2, bool z2)

```csharp
public void Set(bool x2, bool y2, bool z2)
```

一次指派全部三個分量。

### Set(BooleanVector3 other)

```csharp
public void Set(BooleanVector3 other)
```

從 `other` 複製全部三個分量。

### SetAll(bool value)

```csharp
public void SetAll(bool value)
```

把相同的值指派給 X、Y 與 Z。

### Invert()

```csharp
public void Invert()
```

就地對每個分量取反。

### SetX(bool value), SetY(bool value), SetZ(bool value)

```csharp
public void SetX(bool value)
public void SetY(bool value)
public void SetZ(bool value)
```

指派單一分量。

### SetTrue(), SetFalse()

```csharp
public void SetTrue()
public void SetFalse()
```

`SetAll(true)` 與 `SetAll(false)`。

### True, False

```csharp
public static BooleanVector3 True { get; }
public static BooleanVector3 False { get; }
```

三個分量全部設定，或全部清除的新向量。

### ToString()

```csharp
public override string ToString()
```

呈現為 `BooleanVector3(x:…,y:…,z:…)`。

### operator !(BooleanVector3)

```csharp
public static BooleanVector3 operator !(BooleanVector3 booleanVector3)
```

傳回取反後的副本；運算元以傳值方式傳入，不會被修改。

### operator true, operator false

```csharp
public static bool operator true(BooleanVector3 booleanVector3)
public static bool operator false(BooleanVector3 booleanVector3)
```

只有在三個分量全部設定時才為 `true`，因此 `if (vector)` 等同三方 AND。至少一個分量被清除時為 `false`；為了 `&&` 與 `||`
，編譯器要求它與 `operator true` 成對存在。

### Equals(BooleanVector3), Equals(object), GetHashCode()

```csharp
public bool Equals(BooleanVector3 other)
public override bool Equals(object? obj)
public override int GetHashCode()
```

逐分量比較相等，並由三個欄位組成雜湊碼。

## ColorHex

`io.github.ykysnk.utils.NonUdon` · `public struct ColorHex`

`Color` 及其 HTML 十六進位形式，讓顏色能以文字序列化與檢視。只有運算子會同時更新兩個欄位；直接指派其中一個欄位不會改變另一個，而預設初始化的結構在
`hex` 為 null 時會從 `color` 推導其文字。

### color

```csharp
public Color color;
```

`hex` 所表示的顏色值。

### hex

```csharp
public string hex;
```

以 `#RRGGBBAA` 表示的顏色，包含開頭的 `#`。直接讀取欄位，因此預設初始化的結構中可能為 null；此時轉換會後備到 `color`。

### ToString()

```csharp
public override string ToString()
```

把兩個欄位呈現為 `Color: …, Hex: …`，`hex` 為 null 時會從 `color` 推導十六進位值。

### implicit operator string(ColorHex)

```csharp
public static implicit operator string(ColorHex colorHex)
```

傳回十六進位文字，因此在需要顏色字串的地方都能直接使用這個結構。永遠不為 null。

### implicit operator Color(ColorHex)

```csharp
public static implicit operator Color(ColorHex colorHex)
```

傳回 `color`，因此這個結構可以直接當作顏色使用。

### implicit operator ColorHex(string)

```csharp
public static implicit operator ColorHex(string hex)
```

解析 HTML 顏色字串。`ColorUtility.TryParseHtmlString` 拒絕的文字會變成白色而不是錯誤，且 `hex`
會由解析後的顏色改寫，因此儲存的文字會被正規化，而不是原樣保留。

### implicit operator ColorHex(Color)

```csharp
public static implicit operator ColorHex(Color color)
```

包裝顏色並推導其 `#RRGGBBAA` 文字。
