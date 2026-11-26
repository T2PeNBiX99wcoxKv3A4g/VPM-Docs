# API

套件包含三個程式集。以下列出的成員都是公開的；已被取代的成員也一併收錄，因為它們仍可編譯。

| 程式集                            | 命名空間                                       | 內容                                                |
|-----------------------------------|------------------------------------------------|-----------------------------------------------------|
| `io.github.ykysnk.utils`          | `io.github.ykysnk.utils`                       | `Utils`、`IUtilsEditorOnly`、`BasicEditorComponent` |
| `io.github.ykysnk.utils.non-udon` | `io.github.ykysnk.utils.NonUdon`               | `BooleanVector3`、`ColorHex`                        |
| `io.github.ykysnk.utils.Editor`   | `io.github.ykysnk.utils.Editor` 及其子命名空間 | 檢視器基底、GUI 輔助工具、選單、UPM 用戶端、繪製器  |

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

## BasicEditor

`io.github.ykysnk.utils.Editor` · `public abstract class BasicEditor : UnityEditor.Editor`

自訂檢視器的基底類別，會把繪製程式碼包在 try/catch 中，並在拋出例外時顯示一致的錯誤 UI，同時支援 IMGUI 與 UI Toolkit 檢視器。

```csharp
[CustomEditor(typeof(MyBehaviour))]
public class MyBehaviourEditor : BasicEditor
{
    protected override void OnErrorHandleInspectorGUI()
    {
        EditorGUILayout.LabelField("Hello");
    }
}
```

### ErrorEvent

```csharp
public delegate void ErrorEvent(Exception e, Type type);
```

接收從檢視器主體逸出的例外。

### Type

```csharp
public enum Type
{
    UGUI,
    UIToolkit
}
```

失敗的是哪一種檢視器技術：傳統 IMGUI 檢視器，或在 `CreateInspectorGUI` 中建置的 UI Toolkit 檢視器。

### OnErrorEvent

```csharp
public static event ErrorEvent? OnErrorEvent;
```

在例外被攔截、錯誤 UI 繪製完成後觸發，供想要回報的工具使用。

### IsBaseOnOldInspectorGUI

```csharp
protected virtual bool IsBaseOnOldInspectorGUI { get; }
```

`OnInspectorGUI` 是否在自訂主體之前繪製 Unity 的預設檢視器。預設為 false。

### ConsoleLog

```csharp
protected virtual bool ConsoleLog { get; }
```

攔截到的例外是否也以 `Debug.LogException` 寫出。預設為 false；無論如何都會顯示錯誤 UI。

### OnEnable()

```csharp
protected virtual void OnEnable()
```

用於初始化的 Unity 回呼。它沒有加上防護，因此這裡拋出的例外不會被基底類別攔截。

### OnInspectorGUI()

```csharp
public override void OnInspectorGUI()
```

更新序列化物件、在設定 `IsBaseOnOldInspectorGUI` 時繪製基底檢視器，接著在 `Try.Run` 中執行 `OnErrorHandleInspectorGUI`
。失敗時會視設定記錄、呼叫 `OnError` 與 `OnErrorEvent`，並繪製 IMGUI 錯誤 UI。當主體回報有變更時，`OnChange` 會在套用修改過的屬性之前執行。

### CreateInspectorGUI()

```csharp
public override VisualElement? CreateInspectorGUI()
```

在 `Try.Run` 中建置 `CreateErrorHandleInspectorGUI`。失敗時會回報例外，並傳回 `BasicEditorErrorUI.uxml` 提供的 UI Toolkit
錯誤 UI；該資產無法載入時則傳回 `CreateUxmlImportErrorUI()`。

### CreateUxmlImportErrorUI()

```csharp
public static VisualElement CreateUxmlImportErrorUI()
```

`BasicEditorErrorUI.uxml` 本身無法載入時使用的錯誤 UI。

### CreateInfoUI(string errorMessage)

```csharp
public static VisualElement CreateInfoUI(string errorMessage)
```

建置帶資訊訊息的 UI Toolkit 說明方塊。

### CreateErrorUI(string errorMessage)

```csharp
public static VisualElement CreateErrorUI(string errorMessage)
```

建置帶錯誤訊息的 UI Toolkit 說明方塊。

### CreateWarningUI(string errorMessage)

```csharp
public static VisualElement CreateWarningUI(string errorMessage)
```

建置帶警告訊息的 UI Toolkit 說明方塊。

### CreateHelpUI(string message, HelpBoxMessageType type = HelpBoxMessageType.Info)

```csharp
public static VisualElement CreateHelpUI(string message, HelpBoxMessageType type = HelpBoxMessageType.Info)
```

建置只含一個 `HelpBox` 的視覺樹。

### ErrorTitle(Exception e)

```csharp
protected static string ErrorTitle(Exception e)
```

錯誤 UI 中顯示的單行標題：`Editor Error: {message}`。

### ErrorDetails(Exception e)

```csharp
protected static string ErrorDetails(Exception e)
```

可複製的錯誤文字：訊息加上原始堆疊追蹤。

### DrawErrorUI(Exception e)

```csharp
protected virtual void DrawErrorUI(Exception e)
```

繪製 IMGUI 錯誤 UI，對應 `BasicEditorErrorUI.uxml`：訊息放在 `HelpBox` 中，標頭列帶有例外型別與 Copy
按鈕，詳細資料則放在可選取的方塊中，會隨內容成長，達到 140 像素後開始捲動。

### OnChange()

```csharp
protected virtual void OnChange()
```

在檢視器主體回報變更之後、套用修改過的屬性之前呼叫。

### OnError(Exception e, Type type)

```csharp
protected virtual void OnError(Exception e, Type type)
```

對每個從檢視器主體攔截到的例外呼叫，且在繪製錯誤 UI 之前。可覆寫以加入自訂記錄或復原處理。

### OnErrorHandleInspectorGUI()

```csharp
protected virtual void OnErrorHandleInspectorGUI()
```

繪製 IMGUI 檢視器主體。請覆寫這個方法而不是 `OnInspectorGUI`：例外會被攔截並以錯誤 UI 取代。

### CreateErrorHandleInspectorGUI()

```csharp
protected virtual VisualElement? CreateErrorHandleInspectorGUI()
```

建置 UI Toolkit 檢視器主體。請覆寫這個方法：例外會被攔截並以錯誤 UI 取代。

## EditorGUILayoutUtility

`io.github.ykysnk.utils.Editor` · `public static class EditorGUILayoutUtility`

套件檢視器共用的快取標籤樣式與版面輔助工具。

### BoldLabel

```csharp
public static GUIStyle BoldLabel { get; }
```

用於區段標題的 15pt 粗體標籤。首次存取時建立，因此會保留當時作用中的編輯器外觀。

### BoldLabel2

```csharp
public static GUIStyle BoldLabel2 { get; }
```

較小的 12pt 粗體標籤，用於 `BoldLabel` 下的子標題。

### Label(string text, string? textTip = null)

```csharp
public static GUIContent Label(string text, string? textTip = null)
```

由文字與選用工具提示建立標籤內容。結果可以傳給任何 `EditorGUILayout` 控制項。

### Line(Color color, float space = 20f, float lineHeight = 1f)

```csharp
public static void Line(Color color, float space = 20f, float lineHeight = 1f)
```

以 `color` 繪製水平線，`space` 的上半在線上方、下半在線下方，因此垂直總空間永遠是 `space`。`lineHeight` 是線條的高度（像素）。

### Line(float space = 20f, float lineHeight = 1f)

```csharp
public static void Line(float space = 20f, float lineHeight = 1f)
```

繪製灰色分隔線；大多數檢視器使用的捷徑。

```csharp
EditorGUILayoutUtility.Line();
```

## EditorGUILayoutUtilityExtensions

`io.github.ykysnk.utils.Editor` · `public static class EditorGUILayoutUtilityExtensions`

讓標籤內容可以直接由字串建立，因此不必寫出 `EditorGUILayoutUtility.Label` 就能附上工具提示。

### Label(this string text, string? textTip = null)

```csharp
public static GUIContent Label(this string text, string? textTip = null)
```

為這段文字建立標籤內容，可選擇附上工具提示。

```csharp
EditorGUILayout.LabelField("Strength".Label("Damage multiplier"));
```

## EditorGUIUtils

`io.github.ykysnk.utils.Editor` · `public static class EditorGUIUtils`

建置會跟隨作用中編輯器外觀的編輯器內容與圖示，讓自訂檢視器顯示與內建檢視器相同的圖示。

### IconContent(string name)

```csharp
public static GUIContent IconContent(string name)
```

依名稱載入內建的編輯器圖示。在深色外觀下，名稱會加上 `d_` 前置字串，這是 Unity 存放淺色版變體的地方。名稱無法解析時，內容的影像為
null。

### IconContent(string text, string name)

```csharp
public static GUIContent IconContent(string text, string name)
```

建立把 `text` 顯示在內建編輯器圖示旁的標籤內容。

### IconTexture(string name)

```csharp
public static Texture IconTexture(string name)
```

只傳回內建編輯器圖示的材質，名稱無法解析時為 null。

## EditorUtils

`io.github.ykysnk.utils.Editor` · `public static class EditorUtils`

包裝 `CustomDialogWindow` 的訊息對話框輔助工具。

### DisplayDialogAsync(string title, string message, string ok = "OK", string cancel = "", int waitTime = 0)

```csharp
public static Task<bool> DisplayDialogAsync(string title, string message,
    string ok = "OK", string cancel = "", int waitTime = 0)
```

顯示對話框並傳回工作；按下 Ok 時結果為 true，按下 Cancel 或在未選擇的情況下關閉視窗時為 false。`waitTime` 是 Ok
按鈕保持停用的秒數；零會關閉延遲。

```csharp
var confirmed = await EditorUtils.DisplayDialogAsync("Delete", "Remove the folder?", "Delete", "Cancel");
```

### DisplayDialog(string title, string message, string ok = "OK", string cancel = "", Action? onOk = null, Action? onCancel = null, int waitTime = 0)

```csharp
public static void DisplayDialog(string title, string message, string ok = "OK", string cancel = "",
    Action? onOk = null, Action? onCancel = null, int waitTime = 0)
```

顯示對話框並透過回呼而不是工作回報答案。未按下按鈕就關閉視窗視為取消。`cancel` 為空時會隱藏 Cancel 按鈕。

## EditorTask

`io.github.ykysnk.utils.Editor` · `public static class EditorTask`

把 .NET 工作調整到編輯器迴圈：傳回的工作會在 `EditorApplication.update` 中完成，因此等待它時會回到允許使用 UnityEditor API
的主執行緒。

### Run(Task task)

```csharp
public static Task Run(Task task)
```

傳回一個在編輯器迴圈看到 `task` 完成後才結束的工作。失敗與取消狀態會被轉送而不是拋出，讓呼叫端自行決定如何處理；任何結果都會被捨棄。

```csharp
await EditorTask.Run(File.WriteAllTextAsync(path, text));
```

### Run<T>(Task<T> task)

```csharp
public static Task<T> Run<T>(Task<T> task)
```

與非泛型多載相同，但會把 `task` 的結果帶到傳回的工作。

## CustomDialogWindow

`io.github.ykysnk.utils.Editor` · `public class CustomDialogWindow : EditorWindow`

帶有訊息、Ok 按鈕與選用 Cancel 按鈕的浮動工具視窗，由 `EditorUtils` 使用。它不是模態：視窗透過回呼回報結果並自行關閉，其文字可以從右鍵選單複製。

視窗固定為 500×250，置中於主編輯器視窗上方，並以 `ShowUtility` 顯示。仍開著的對話框會先被關閉，其待處理結果會以取消回報；未按下按鈕就關閉視窗也視為取消。設定
`waitTime` 時，Ok 的標題會倒數，按鈕會保持停用直到歸零。

這個類別宣告的每個成員都是 private 或 internal，因此對話框需透過 `EditorUtils.DisplayDialog` 或
`EditorUtils.DisplayDialogAsync` 建立，它們會把視窗的引數直接傳入。

## MenuItemObject

`io.github.ykysnk.utils.Editor` · `public class MenuItemObject`

由 `MenuExtensions` 保持註冊的選單項目描述：路徑、快速鍵、勾選狀態、排序優先順序，以及 Unity 所需的回呼。

### MenuItemObject(string name, string shortcut, bool @checked, int priority, Action execute, Func<bool>? validate)

```csharp
public MenuItemObject(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
```

建立選單項目的完整描述。`name` 是選單路徑，會以 Unity 清理屬性宣告路徑的相同方式清理，因此兩種項目最後會落在同一個路徑下。
`validate` 決定項目是否啟用；null 表示永遠啟用。

### MenuItemObject(string name, string shortcut, int priority, Action execute)

```csharp
public MenuItemObject(string name, string shortcut, int priority, Action execute)
```

建立未勾選、且沒有驗證回呼的選單項目。

### MenuItemObject(string name, int priority, Action execute)

```csharp
public MenuItemObject(string name, int priority, Action execute)
```

建立未勾選、且沒有快速鍵或驗證回呼的選單項目。

### MenuItemObject(string name, Action execute)

```csharp
public MenuItemObject(string name, Action execute)
```

以其種類的預設優先順序建立選單項目：`GameObject/Create Other` 下為 10，其他位置為 1000，與 Unity 自身的排序一致。

### Name

```csharp
public string Name { get; private set; }
```

清理後的選單路徑；這是追蹤項目所用的鍵。

### Shortcut

```csharp
public string Shortcut { get; private set; }
```

傳給 Unity 的快速鍵字串，例如 `#%g`；項目沒有快速鍵時為空字串。

### Checked

```csharp
public bool Checked { get; private set; }
```

Unity 是否以勾號繪製該項目。

### Priority

```csharp
public int Priority { get; private set; }
```

子選單內的排序；數值較小者先繪製。

### Execute

```csharp
public Action Execute { get; private set; }
```

選擇該項目時執行的動作。

### Validate

```csharp
public Func<bool>? Validate { get; private set; }
```

決定項目是否啟用的述詞，永遠啟用時為 null。

## MenuWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuWrap`

對 `UnityEditor.Menu` 內部部分的反射包裝，該類別是編輯器選單列背後的實作。這些成員是未記載的編輯器內部實作，並非公開 API，因此
Unity 可能在任何版本重新命名或移除它們；這個包裝讓選單項目能在執行階段新增、變更與移除。

### SetHotkey(string menuPath, string hotkey)

```csharp
public static void SetHotkey(string menuPath, string hotkey)
```

指派顯示在既有選單項目旁的快速鍵。

### ExtractSubmenus(string menuPath)

```csharp
public static string[] ExtractSubmenus(string menuPath)
```

列出指定路徑下存在的子選單；沒有時為空陣列。

### AddMenuItem(string name, string shortcut, bool @checked, int priority, Action execute, Func<bool>? validate)

```csharp
public static void AddMenuItem(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
```

在執行階段註冊選單項目，不需要 `MenuItem` 屬性。

### AddSeparator(string name, int priority)

```csharp
public static void AddSeparator(string name, int priority)
```

在指定路徑與優先順序加入分隔項目。

### RemoveMenuItem(string name)

```csharp
public static void RemoveMenuItem(string name)
```

移除註冊在指定路徑下的選單項目。

### RebuildAllMenus()

```csharp
public static void RebuildAllMenus()
```

由已註冊的項目重建整個選單列。

### MenuItemExists(string menuPath)

```csharp
public static bool MenuItemExists(string menuPath)
```

指定路徑下目前是否註冊了選單項目。

## MenuServiceWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuServiceWrap`

對內部 `UnityEditor.MenuService` 類別的反射包裝。這些成員不是公開 API，因此 Unity 可能在任何版本重新命名或移除它們。

### SanitizeMenuItemName(string menuName)

```csharp
public static string SanitizeMenuItemName(string menuName)
```

執行 Unity 自己的選單路徑清理，讓執行階段加入的路徑能與 Unity 從 `MenuItem` 屬性註冊時完全相同。傳回 Unity 註冊該項目所用的路徑。

### ValidateMethodForMenuCommand(MethodInfo methodInfo)

```csharp
public static bool ValidateMethodForMenuCommand(MethodInfo methodInfo)
```

詢問 Unity 某個方法是否可作為選單命令，使用它套用於 `MenuItem` 方法的相同規則。

## EditorUtilityWrap

`io.github.ykysnk.utils.Editor` · `public static class EditorUtilityWrap`

對 `EditorUtility` 內部部分的反射包裝。該成員不是公開 API，因此 Unity 可能在任何版本重新命名或移除它。

### Internal_UpdateAllMenus

```csharp
public static readonly WrapAction Internal_UpdateAllMenus;
```

內部的 `EditorUtility.Internal_UpdateAllMenus` 方法，會讓 Unity 重建其選單。在執行階段加入選單項目後需要使用。

## MenuExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class MenuExtensions`

在編輯器重建選單時，讓執行階段加入的選單項目保持註冊。階層變更時，已不存在的項目會透過 `MenuWrap` 重新加入，接著執行
`EditorUtilityWrap.Internal_UpdateAllMenus`。

### AddMenuItem(MenuItemObject menuItemObject)

```csharp
public static bool AddMenuItem(MenuItemObject menuItemObject)
```

讓選單項目在選單重建後仍保持註冊。已有相同路徑的選單項目註冊時傳回 false。

```csharp
MenuExtensions.AddMenuItem(new MenuItemObject("Tools/My Tool/Do Something", "#%g", 1000, DoSomething));
```

### RemoveMenuItem(string name)

```csharp
public static MenuItemObject? RemoveMenuItem(string name)
```

停止讓指定路徑的選單項目保持註冊，並將其傳回。選單項目本身不會被移除；這只會防止它在重建後再次被加入。

## RequestExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class RequestExtensions`

把套件管理員要求轉成在編輯器迴圈完成的工作，讓等待中的程式碼能留在主執行緒。

### AsTask<T>(this T request)

```csharp
public static Task<T> AsTask<T>(this T request) where T : Request
```

等待套件管理員要求。要求會從 `EditorApplication.update` 輪詢，工作則稍後在 `EditorApplication.delayCall`
中完成，因此等待端的續行會以較淺的呼叫堆疊回到主執行緒。具體的要求型別會被保留，讓呼叫端可以讀取它的 `Result`。

### AsTask<T>(this T request, CancellationToken token)

```csharp
public static Task<T> AsTask<T>(this T request, CancellationToken token) where T : Request
```

與無參數多載相同，但會在權杖取消時停止等待。要求本身不會被取消，只是不再被觀察。

## TaskExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class TaskExtensions`

從 `EditorApplication.update` 輪詢工作並透過回呼回報結果，供無法使用 await 的呼叫端（例如檢視器與選單程式碼）使用。

### WaitEditor(this Task task, Action onCompleted, Action<Exception>? onError = null)

```csharp
public static void WaitEditor(this Task task, Action onCompleted, Action<Exception>? onError = null)
```

工作完成後在編輯器迴圈呼叫 `onCompleted`。失敗的工作會以它實際拋出的例外呼叫 `onError`（會拆開彙總包裝），取消的工作則以
`TaskCanceledException` 呼叫。`onError` 為 null 時失敗會被靜默忽略。

### WaitEditor<T>(this Task<T> task, Action<T> onCompleted, Action<Exception>? onError = null)

```csharp
public static void WaitEditor<T>(this Task<T> task, Action<T> onCompleted, Action<Exception>? onError = null)
```

與非泛型多載相同，但會把工作的結果傳給 `onCompleted`。

## UpmInstaller

`io.github.ykysnk.utils.Editor` · `public static class UpmInstaller`

從編輯器程式碼安裝、移除與更新 Unity Package Manager
套件。每個操作都會顯示固定在編輯器上的進度條，其取消按鈕可中止操作，除非編輯器當下正在編譯或更新。安裝、移除與升級共用同一把鎖，因此一次只會執行其中一個；第二次呼叫會直接傳回而不做任何事。

### Install(string[] packages)

```csharp
public static void Install(string[] packages)
```

開始安裝指定的套件並立即傳回。項目格式為 `name` 或 `name@version`。

```csharp
UpmInstaller.Install(new[] { "io.github.ykysnk.localization@0.11.0" });
```

### InstallAsync(string[] packages)

```csharp
public static Task InstallAsync(string[] packages)
```

安裝指定的套件，並在全部處理完成後結束。

### InstallAsync(string[] packages, CancellationToken token)

```csharp
public static Task InstallAsync(string[] packages, CancellationToken token)
```

安裝指定的套件。已安裝在所要求版本的項目會被略過；失敗的項目會被記錄，其餘項目仍會處理。取消 `token`
會停止操作而不拋出例外，進度條則以取消狀態關閉。

### Remove(string[] packages)

```csharp
public static void Remove(string[] packages)
```

開始移除指定的套件並立即傳回。

### RemoveAsync(string[] packages)

```csharp
public static Task RemoveAsync(string[] packages)
```

移除指定的套件，並在全部處理完成後結束。

### RemoveAsync(string[] packages, CancellationToken token)

```csharp
public static Task RemoveAsync(string[] packages, CancellationToken token)
```

移除指定的套件。失敗的套件會被記錄，其餘套件仍會處理。取消 `token` 會停止操作而不拋出例外。

### UpdateAsync()

```csharp
public static Task<string[]> UpdateAsync()
```

只檢查從登錄（registry）安裝的套件，並列出版本較新的項目。內建、內嵌與本機套件沒有登錄更新，因此會略過。搜尋會平行執行，
單一搜尋超過 5 秒會被放棄。傳回 `name@version` 形式的項目，沒有任何項目過期時為空陣列。

### UpdateAsync(CancellationToken token)

```csharp
public static Task<string[]> UpdateAsync(CancellationToken token)
```

與無參數多載相同；權杖會停止檢查，進行中的搜尋不會被中止。失敗前找到的項目仍會傳回。

### Upgrade()

```csharp
public static void Upgrade()
```

檢查更新並開始安裝，然後立即傳回。

### UpgradeAsync()

```csharp
public static Task UpgradeAsync()
```

檢查更新並安裝。所有套件都是最新時不做任何事。

### UpgradeAsync(CancellationToken token)

```csharp
public static Task UpgradeAsync(CancellationToken token)
```

檢查更新並安裝。所有套件都是最新，或已有安裝／移除正在執行時，不做任何事。權杖會停止更新檢查或後續的安裝而不拋出例外。

## BooleanVector3Drawer

`io.github.ykysnk.utils.Editor` · `public class BooleanVector3Drawer : PropertyDrawer`

重用內建的多屬性欄位，把 `BooleanVector3` 繪製成同一列的 X/Y/Z 三個開關，就像 Unity 繪製 `Vector3` 的方式。以
`[CustomPropertyDrawer(typeof(BooleanVector3))]` 註冊。

### OnGUI(Rect position, SerializedProperty property, GUIContent label)

```csharp
public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
```

繪製標籤，接著是三個分量開關，並透過序列化屬性寫回編輯。檢視寬度約低於 332 像素時，開關會佔滿整個控制項矩形，因為加上前置字串的矩形容納不下它們。

## ColorHexDrawer

`io.github.ykysnk.utils.Editor` · `public class ColorHexDrawer : PropertyDrawer`

把 `ColorHex` 繪製成 Unity 的顏色色票，並把選取的顏色一併寫回序列化的十六進位字串，讓透過色票所做的編輯能保持兩個欄位同步。以
`[CustomPropertyDrawer(typeof(ColorHex))]` 註冊。

### OnGUI(Rect position, SerializedProperty property, GUIContent label)

```csharp
public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
```

繪製標籤，接著是顏色色票。變更會以 `#RRGGBBAA` 形式同時寫入 `color` 與 `hex` 兩個子屬性。

## ReflectionUtils

`io.github.ykysnk.utils.NonUdon` · `public static class ReflectionUtils`

以記錄代替擲回例外的反射輔助方法：找不到的成員會回傳 `null` / `default`，因此可以直接用來探測選用依賴是否存在。

查詢結果依型別與名稱快取，找不到的結果也會保留，因此重複呼叫只需一次字典查詢。`FindType` 只快取已解析的名稱，
因為組件可能稍後才載入。

### Instantiate<T>(Type type)

```csharp
public static T? Instantiate<T>(Type type)
```

用無參數建構子建立實例並轉型為 `T`；失敗時記錄警告並回傳 `default`。

### GetNestedMethods(Type? type)

```csharp
public static IEnumerable<MethodInfo> GetNestedMethods(Type? type)
```

延遲列舉 `type` 的巢狀型別所宣告的所有方法（不論是否 public）。執行階段無法列舉的巢狀型別會被略過。

### GetNestedMethod(Type? type, string name, string? searchName = null)

```csharp
public static MethodInfo? GetNestedMethod(Type? type, string name, string? searchName = null)
```

回傳名稱包含 `searchName` 的第一個巢狀方法。`searchName` 預設為 `<name>`，也就是編譯器給名為 `name` 的成員的
lambda、async 本體或區域函式所產生的名稱。

### FindType(string? typeName)

```csharp
public static Type? FindType(string? typeName)
```

在已載入的組件中解析完整名稱（或組件限定名稱）；找不到時回傳 `null`。

### FindMethod(Type? type, string name)

```csharp
public static MethodInfo? FindMethod(Type? type, string name)
```

回傳該名稱的第一個方法，不論 public、static 或繼承而來；沒有時回傳 `null`。僅依名稱比對，有多載時回傳先找到的
那一個。

### FindProperty(Type? type, string name)

```csharp
public static PropertyInfo? FindProperty(Type? type, string name)
```

回傳該名稱的屬性（不論是否 public）；沒有時回傳 `null`。

### GetDeclaredMethods(Type? type)

```csharp
public static IEnumerable<MethodInfo> GetDeclaredMethods(Type? type)
```

回傳該型別自身宣告的所有方法（不含巢狀型別的），不論是否 public。

## Type index

上述頁面之外的公開型別，依命名空間分組。用途文字取自各型別自身的摘要。

### io.github.ykysnk.utils.Extensions

| 型別                   | 用途                                                             |
|------------------------|------------------------------------------------------------------|
| `ComponentExtensions`  | GameObject 與 Transform 輔助工具的元件版本。                     |
| `DictionaryExtensions` | 把缺少的鍵視為預設值的字典讀取。                                 |
| `FloatExtensions`      | `float` 的雜訊移除、容差檢查、限制範圍與四捨五入。               |
| `GameObjectExtensions` | 階層路徑、距離檢查與以索引存取元件。                             |
| `ListExtensions`       | 對清單與陣列提供邊界檢查的索引存取與就地編輯輔助工具。           |
| `StringExtensions`     | 對 `"Folder/Name/Extension"` 這類分隔字串的切片輔助工具。        |
| `Texture2DExtensions`  | 材質的 GPU 縮放與 alpha 修剪。                                   |
| `TransformExtensions`  | 階層名稱、世界／區域縮放轉換、未縮放點轉換與距離檢查。           |
| `Vector3Extensions`    | `Vector3` 的距離、逐分量算術、限制範圍、四捨五入與方向輔助工具。 |

### io.github.ykysnk.utils.NonUdon

| 型別                                                                                                   | 用途                                                             |
|--------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| `DictionaryWrapper<TKey, TValue>`                                                                      | 以兩個平行清單儲存的字典形式資料，用於 Unity 序列化。            |
| `HashUtils`, `HashType`                                                                                | 以小寫十六進位摘要進行的文字雜湊。                               |
| `JsonUtils`                                                                                            | `JsonUtility` 的包裝，會回報失敗而不是拋出例外或傳回 null。      |
| `ListWrapper<T>`                                                                                       | 藏在單一序列化欄位後面的清單，讓介面型別的成員也能儲存。         |
| `ReflectionUtils`, `ReflectionWrapper`, `Reflect`                                                      | 快取的反射查詢、編譯後的委派與可串接的成員存取。                 |
| `ReflectionAccess`, `FieldAccess`, `PropertyAccess`, `MethodAccess`                                    | 支撐 `Reflect` 的存取器型別。                                    |
| `Result<T>`, `ResultExtensions`, `Try`, `Unit`                                                         | 攜帶失敗的結果、串接輔助工具與不拋出例外的執行。                 |
| `Wrapper`                                                                                              | `ListWrapper<T>` 與 `DictionaryWrapper<TKey, TValue>` 的進入點。 |
| `ILogger`, `Logger<T>`                                                                                 | 套件程式碼所依據的記錄介面，及其依型別的實作。                   |
| `FieldGetter<T>`, `FieldSetter<T>`, `PropertyGetter<T>`, `PropertySetter<T>`, `WrapAction`, `WrapFunc` | 反射包裝所使用的委派。                                           |

### io.github.ykysnk.utils.Editor.Patches

| 型別                                           | 用途                                                                       |
|------------------------------------------------|----------------------------------------------------------------------------|
| `IPatch`, `Patch<T>`                           | 以單位套用的修補群組；子類別是其巢狀修補方法的容器。                       |
| `IPatchLoader`, `PatchLoader<T>`               | 每個程式集的進入點，接收其 Harmony 執行個體並執行其修補群組。              |
| `IPatchMethod`, `PatchMethod<T>`               | 一組 Harmony 修補：目標方法加上 prefix、postfix、transpiler 與 finalizer。 |
| `IReversePatchMethod`, `ReversePatchMethod<T>` | 反向修補，其虛設方法會接收另一個方法主體的可呼叫副本。                     |
| `ExportsPatchLoader`                           | 程式集屬性，宣告編輯器載入時要執行的修補載入器型別。                       |

### io.github.ykysnk.utils.Editor.HarmonyUtilities

| 型別                   | 用途                                                       |
|------------------------|------------------------------------------------------------|
| `CodeCursor`           | 對 transpiler 指令的串流游標，提供目前、下一個與歷程存取。 |
| `TranspilerExtensions` | 透過 `WithContext` 逐項產生每個指令及其鄰居。              |

### io.github.ykysnk.utils.Editor.UIElements

| 型別                  | 用途                                                                   |
|-----------------------|------------------------------------------------------------------------|
| `BooleanVector3Field` | 把 `BooleanVector3` 以三個開關編輯的 UI Toolkit 欄位；可從 UXML 建立。 |
