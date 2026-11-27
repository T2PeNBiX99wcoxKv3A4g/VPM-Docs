# 檢視器與繪製器

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
