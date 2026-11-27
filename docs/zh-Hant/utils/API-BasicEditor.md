# BasicEditor

`io.github.ykysnk.utils.Editor` · `public abstract class BasicEditor : UnityEditor.Editor`

自訂檢視器的基底類別：在 try/catch 中執行繪製程式碼，並在擲出例外時顯示一致的錯誤 UI，同時支援 IMGUI 與 UI Toolkit 檢視器。

IMGUI 檢視器請覆寫 `OnErrorHandleInspectorGUI`，UI Toolkit 檢視器請覆寫 `CreateErrorHandleInspectorGUI`；兩者的主體都受到保護。`OnInspectorGUI` 仍負責更新序列化物件、套用已修改的屬性並回報變更，因此主體只需負責繪製。

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

## ErrorEvent

```csharp
public delegate void ErrorEvent(Exception e, Type type);
```

接收從檢視器主體中逸出的例外，以及擲出它的檢視器技術。透過 `OnErrorEvent` 訂閱。

## Type

```csharp
public enum Type
{
    UGUI,
    UIToolkit
}
```

失敗的是哪種檢視器技術：`UGUI` 是傳統的 IMGUI 檢視器，`UIToolkit` 是 `CreateInspectorGUI` 中建構的 UI Toolkit 檢視器。

## OnErrorEvent

```csharp
public static event ErrorEvent? OnErrorEvent;
```

在例外被攔截並繪製錯誤 UI 之後引發，供需要回報的工具使用。它是 static 的，因此套件內所有檢視器共用同一批訂閱者。

## OnEnable

```csharp
protected virtual void OnEnable()
```

Unity 回呼。覆寫它以初始化檢視器；主體不受保護，因此這裡擲出的例外不會被本類別攔截。

## OnInspectorGUI

```csharp
public override void OnInspectorGUI()
```

更新序列化物件，在設定 `IsBaseOnOldInspectorGUI` 時先繪製 Unity 的預設檢視器，然後在 `Try.Run` 中執行 `OnErrorHandleInspectorGUI`。失敗時可選擇寫入記錄、呼叫 `OnError` 與 `OnErrorEvent`，並繪製 IMGUI 錯誤 UI。主體回報了變更時，先執行 `OnChange`，然後套用已修改的屬性。

## CreateInspectorGUI

```csharp
public override VisualElement? CreateInspectorGUI()
```

在 `Try.Run` 中建構 `CreateErrorHandleInspectorGUI`。失敗時回報例外並傳回 `BasicEditorErrorUI.uxml` 的 UI Toolkit 錯誤 UI，其中顯示訊息、例外類型、可複製的堆疊追蹤和 Copy 按鈕。若該資產無法載入，則改為傳回 `CreateUxmlImportErrorUI()`。

## OnErrorHandleInspectorGUI

```csharp
protected virtual void OnErrorHandleInspectorGUI()
```

繪製 IMGUI 檢視器主體。請覆寫它而不是 `OnInspectorGUI`：例外會被攔截並取代為錯誤 UI。

## CreateErrorHandleInspectorGUI

```csharp
protected virtual VisualElement? CreateErrorHandleInspectorGUI()
```

建構 UI Toolkit 檢視器主體。請覆寫它：例外會被攔截並取代為錯誤 UI。預設傳回 `null`，此時保留 Unity 內建的檢視器。

## OnChange

```csharp
protected virtual void OnChange()
```

在檢視器主體回報變更之後、套用已修改的屬性之前呼叫。僅在 IMGUI 下執行，因為 UI Toolkit 路徑沒有自己的變更檢查。

## OnError

```csharp
protected virtual void OnError(Exception e, Type type)
```

對從檢視器主體攔截到的每個例外，在繪製錯誤 UI 之前呼叫。覆寫它以加入自訂記錄或復原處理。

## DrawErrorUI

```csharp
protected virtual void DrawErrorUI(Exception e)
```

繪製 IMGUI 錯誤 UI，結構與 `BasicEditorErrorUI.uxml` 一致：`HelpBox` 中只有訊息、帶例外類型和 Copy 按鈕的表頭列，以及可捲動、可選取的詳細資料方塊。方塊會隨內容成長，達到 140 像素後開始捲動；Details 摺疊項預設為展開。

## IsBaseOnOldInspectorGUI

```csharp
protected virtual bool IsBaseOnOldInspectorGUI { get; }
```

`OnInspectorGUI` 是否在自訂主體之前繪製 Unity 的預設檢視器。預設為 false。

## ConsoleLog

```csharp
protected virtual bool ConsoleLog { get; }
```

攔截到的例外是否同時以 `Debug.LogException` 寫入主控台。預設為 false；無論哪種情況都會顯示錯誤 UI。

## ErrorTitle

```csharp
protected static string ErrorTitle(Exception e)
```

錯誤 UI 中顯示的單行標題：`Editor Error: {message}`。

## ErrorDetails

```csharp
protected static string ErrorDetails(Exception e)
```

可複製的錯誤文字：訊息後接原始堆疊追蹤。

## CreateUxmlImportErrorUI

```csharp
public static VisualElement CreateUxmlImportErrorUI()
```

`BasicEditorErrorUI.uxml` 本身無法載入時使用的錯誤 UI。它是一個內容為 `Failed to load uxml assets, please reimport the package to fix this issue.` 的錯誤說明方塊。

## CreateHelpUI

```csharp
public static VisualElement CreateHelpUI(string message, HelpBoxMessageType type = HelpBoxMessageType.Info)
```

建構只包含一個 `HelpBox` 的視覺元素樹，訊息與類型由參數指定。

```csharp
var ui = BasicEditor.CreateHelpUI("Nothing to configure yet.");
```

## CreateInfoUI

```csharp
public static VisualElement CreateInfoUI(string errorMessage)
```

建構帶資訊訊息的 UI Toolkit 說明方塊。

## CreateErrorUI

```csharp
public static VisualElement CreateErrorUI(string errorMessage)
```

建構帶錯誤訊息的 UI Toolkit 說明方塊。

## CreateWarningUI

```csharp
public static VisualElement CreateWarningUI(string errorMessage)
```

建構帶警告訊息的 UI Toolkit 說明方塊。
