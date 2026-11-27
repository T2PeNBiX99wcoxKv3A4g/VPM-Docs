# BasicTranslateDrawer

`io.github.ykysnk.Localization.Editor` · `[CustomPropertyDrawer(typeof(BasicTranslate))] public class BasicTranslateDrawer : PropertyDrawer`

繪製單一 `BasicTranslate` 項目的 UI Toolkit 繪製器：鍵、譯文、工具提示開關及其兩個欄位，以及複製／貼上按鈕。檢視器的翻譯清單用這個繪製器建構每一列。

版面是 GUID 為 `666a4a69b697dcd45bfe25da3d5636a6` 的 UXML 資產，只查找一次並快取。它會先以 `UILocalize(false)` 在地化，再以 `BindProperty` 繫結到該欄位。`useTooltip` 關閉時兩個工具提示欄位保持隱藏；由於繫結在 `CreatePropertyGUI` 傳回之後才寫入初始值，可見狀態會由排程器再套用一次。工具提示開關的輸入元素會移到標籤之前，讓該列讀起來是核取方塊加標籤。複製會把整筆項目以 JSON 寫入 `EditorGUIUtility.systemCopyBuffer`，貼上則透過 [`TranslateClipboard`](./API-TranslateClipboard.md) 讀回，僅在剪貼簿存有項目時可用，並在資料列建構時與指標進入該列時各檢查一次。

## CreatePropertyGUI

```csharp
public override VisualElement CreatePropertyGUI(SerializedProperty property)
```

建構單一翻譯項目的 UI。無法載入 UXML 資產時，它傳回 `BasicEditor.CreateUxmlImportErrorUI()` 而不是一列，該錯誤方塊會要求重新匯入套件；否則傳回複製的樹，其中欄位繫結到 `property`、工具提示可見狀態已套用、兩個按鈕已接線。貼上失敗時透過 `Utils.LogWarning` 記錄警告。
