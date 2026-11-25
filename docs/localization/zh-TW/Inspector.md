# 檢視器

開啟 `BasicLocalization` 資產即可編輯一種語言。檢視器由套件本身翻譯，因此標籤會跟著所選語言改變；本頁以欄位的作用來說明，必要時附上它在
`BasicLocalization` / `BasicTranslate` 中的名稱。

## 設定卡片

- **Localization id**（`localizationID`）－ 套件中所有語言共用的 ID。
- **Display name**（`displayName`）－ 語言選擇器中顯示的名稱。
- **Language** － 這個 ID 目前選取的語言，在所有編輯器視窗中都相同。

選擇器就是現成的 `LanguagePicker` 控制項；切換它會同時更新所有已開啟的檢視器與視窗。

## 格式轉換

摺疊區收納附屬檔案：

| 欄位                    | 內容                                        |
|-------------------------|---------------------------------------------|
| JSON file（`jsonFile`） | 與資產一起匯出的扁平 `key: text` 物件。     |
| PO file（`poFile`）     | Gettext 檔案，每個鍵一組 `msgid`/`msgstr`。 |

`…` 按鈕會把磁碟上的檔案複製到資產旁邊。匯出會寫出目前的資產，匯入則依鍵把檔案合併回來。這兩個欄位只接受 `TextAsset`（JSON）與
`LocalizationAsset`（PO）。

## 翻譯清單

清單上方的工具列包含搜尋欄位、項目數量，以及新增／移除按鈕。

- 搜尋會依鍵、文字或工具提示篩選，並在你停止輸入後才執行。
- 篩選中時，數量會顯示為 `filtered/total`。
- 新增會在結尾附加一筆空白項目；移除則刪除選取的項目。
- 在資料列上按右鍵即可複製、貼上與移除。
- 拖曳資料列可調整順序（僅在沒有篩選時可用）。

## 翻譯資料列

| 欄位            | 備註                                         |
|-----------------|----------------------------------------------|
| `key`           | 鍵，例如 `label.my_window.title`。           |
| `translate`     | 文字，可為多行。                             |
| `useTooltip`    | 開啟後會儲存工具提示，下方兩個欄位才會出現。 |
| `tooltipSuffix` | 工具提示鍵的後綴，預設為 `:tooltip`。        |
| `tooltip`       | 工具提示的文字。                             |

複製按鈕會把整筆項目以 JSON 放到剪貼簿；貼上則把複製的項目寫回資料列。剪貼簿中有翻譯項目時，貼上才會啟用。

## 腳本圖示

`BasicLocalization` 與 `BasicTranslate` 各自附有腳本圖示（`Runtime/Icons`）。SVG 是原始檔，Unity 匯入的是 256 px 的 PNG。
