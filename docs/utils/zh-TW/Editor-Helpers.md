# 編輯器輔助工具

## BasicEditor

`BasicEditor` 是這裡每個套件都使用的檢視器基底類別。它把 UI Toolkit 或 IMGUI 內容包在 `try`/`catch` 中，回報例外並繪製一致的錯誤方塊，而不是留下一個壞掉的檢視器。

```csharp
using io.github.ykysnk.utils.Editor;

[CustomEditor(typeof(MyBehaviour))]
public class MyBehaviourEditor : BasicEditor
{
    protected override VisualElement? CreateErrorHandleInspectorGUI()
    {
        var tree = uxml.CloneTree();
        tree.Bind(serializedObject);
        return tree;
    }
}
```

UI Toolkit 請覆寫 `CreateErrorHandleInspectorGUI`，IMGUI 請覆寫 `OnErrorHandleInspectorGUI`。`OnError` 與 `OnChange` 是記錄，以及在內容成功後套用變更的掛鉤。

## GUI 輔助工具

| 輔助工具 | 用途 |
| --- | --- |
| `EditorGUILayoutUtility` | 視窗使用的小型版面輔助（列、分隔線、帶標籤的欄位）。 |
| `EditorGUILayoutUtilityExtensions` | 同樣的輔助工具，以擴充方法形式提供。 |
| `EditorGUIUtils` | 圖示、說明方塊，以及視窗標題使用的 `IconContent` 輔助工具。 |
| `EditorUtils` | 視窗共用的資產與選取輔助工具。 |
| `CustomDialogWindow` | 小型模態提示（標題、訊息、按鈕），不需要自訂編輯器。 |
| `EditorTask` | 執行非同步編輯器工作，並在同一處回報進度與失敗。 |

## 繪製器

| 繪製器 | 繪製內容 |
| --- | --- |
| `BooleanVector3Drawer` | 每個軸各自有開關的 `Vector3`，用於逐軸設定。 |
| `ColorHexDrawer` | 顏色欄位，旁邊顯示其 `#RRGGBB` 值。 |

兩者都會在符合型別的欄位上自動生效，或透過包裝型別上的 `[CustomPropertyDrawer]` 套用。

## 選單

`MenuItemObject`、`MenuWrap` 與 `MenuServiceWrap` 會用驗證函式與一致的優先順序建構 `Tools/...`、`GameObject/...` 與 `Assets/...` 項目，讓套件的選單路徑集中在一處。

## UPM 用戶端

`UpmInstaller` 是 YKY Toolkit 安裝視窗背後的 UPM 包裝：

```csharp
UpmInstaller.Install("io.github.ykysnk.localization");
UpmInstaller.Remove("io.github.ykysnk.localization@0.11.0");
UpmInstaller.UpdateAsync().WaitEditor(packages => { /* installed versions */ });
```

它會與 `UnityEditor.PackageManager.Client` 溝通，並透過編輯器工作輔助工具回報進度。
