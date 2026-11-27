# BasicLocalizationEditor

`io.github.ykysnk.Localization.Editor` · `[CustomEditor(typeof(BasicLocalization))] [CanEditMultipleObjects] public class BasicLocalizationEditor : BasicEditor`

`BasicLocalization` 資產的檢視器：資產設定、格式轉換工具以及翻譯項目清單。它是 UI Toolkit 檢視器，繼承 [`BasicEditor`](../utils/API-BasicEditor.md)，因此建構樹時擲出的例外會被該類別替換為錯誤 UI。

樹是編輯器 `uxml` 欄位（一個 `[SerializeField]`）所持有的 UXML 資產。它會先以 `UILocalize(false)` 在地化——這個參數讓語言選擇器不會被附加到結尾，因此由檢視器自己放進設定卡片的 `languageSlot` 元素——然後繫結到序列化物件。`jsonFile` 只接受 `TextAsset`，`poFile` 只接受 `LocalizationAsset`，分別對應兩種附屬檔案格式。

`translates` 清單由資產填入，每一列以 [`BasicTranslateDrawer`](./API-BasicTranslateDrawer.md) 建構。搜尋欄位在最後一次按鍵 150 ms 後依鍵、譯文與工具提示篩選；篩選中時拖曳調整順序會關閉，因為可見順序不再對應陣列索引。選取後按右鍵可複製、貼上與移除，貼上僅在 [`TranslateClipboard`](./API-TranslateClipboard.md) 中有項目時可用。新增按鈕會在結尾附加一筆空白項目、清除篩選讓新資料列可見並捲動到它；移除按鈕僅在選取項目時可用，數量標籤顯示總數，篩選中時顯示 `visible/total`。

格式轉換摺疊區的開關狀態保存在 `EditorPrefs` 的 `io.github.ykysnk.Localization.BasicLocalizationEditor.convert`。匯出 JSON 與匯出 PO 會寫出與資產同名的附屬檔案、將它指派給對應欄位並記錄路徑；匯入會讀取已指派的檔案並依鍵合併，未指派檔案時改用資產旁邊的路徑。`…` 按鈕會先把挑選的檔案複製到資產旁邊，因為參照只能指向專案內部。

## CreateErrorHandleInspectorGUI

```csharp
protected override VisualElement? CreateErrorHandleInspectorGUI()
```

建構整個檢視器並傳回它。上述所有行為都在這裡接線：複製的樹、在地化呼叫、繫結、語言選擇器、兩種檔案類型、清單回呼與每個按鈕。清單高度在樹附加到面板後調整：由外層 `ScrollView` 的可視區域與樹的位置算出樹下方剩餘的空間，清單依該差值增高，且不低於 140 像素，因此自訂 GUI 會填滿視窗，而不是讓下方留空。
