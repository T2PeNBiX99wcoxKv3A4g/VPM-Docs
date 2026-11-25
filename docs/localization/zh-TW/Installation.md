# 安裝

套件以 VPM 套件形式發佈：`io.github.ykysnk.localization`。可用 ALCOM、VPM CLI 安裝，或把儲存庫加入專案的 VPM 清單。

它相依於 `io.github.ykysnk.utils`，由 VPM 自動解析。

## 建立語言資產

1. 透過 **Assets > Create > Localization > Basic Localization** 建立資產。
2. 把 **Localization ID** 設為套件使用的 ID，例如 `io.github.ykysnk.localization`。
3. 以語言 ID 命名檔案：`en-US`、`ja-JP`、`zh-Hant`……
4. 在 **Display Name** 填入語言選擇器顯示的名稱，例如 `English` 或 `日本語`。

同一個套件的每種語言都使用相同的 ID，並與其他資產放在一起，通常是在 `Editor/Localization` 資料夾。

> 檔名就是語言 ID。重新命名資產會改變它代表的語言，請保持穩定。

## 新增翻譯

在檢視器中按下翻譯清單的 **+**，然後填入：

| 欄位 | 意義 |
| --- | --- |
| 翻訳ID (`key`) | 程式碼查詢的鍵，例如 `label.my_window.title`。 |
| 翻訳 (`translate`) | 這個語言顯示的文字。 |
| ツールチップを使う (`useTooltip`) | 這筆項目是否同時儲存工具提示。 |
| ツールチップの接尾辞 (`tooltipSuffix`) | 工具提示鍵的後綴，預設為 `:tooltip`。 |
| ツールチップ (`tooltip`) | 工具提示的文字。 |

`en-US` 資產應包含**所有**鍵：它是其他語言的後備來源，也是 `unity:` 項目的原始文字。

## 連接套件

在想使用翻譯的套件編輯器程式集中，宣告一次 ID：

```csharp
using io.github.ykysnk.Localization.Editor;

[assembly: LocalizationPackage("io.github.ykysnk.my-package")]
```

接著在繫結之前先在地化 UI：

```csharp
var tree = uxml.CloneTree();
tree.UILocalize();          // replaces keys and keeps them up to date
tree.Bind(serializedObject);
rootVisualElement.Add(tree);
```

鍵直接寫在 UXML 屬性裡，因此不需要其他動作：

```xml
<ui:Label text="label.my_window.title"/>
<ui:Button text="label.my_window.apply"/>
```

## 匯入與匯出

**Format conversion** 摺疊區可以把資產匯出成 JSON 或 PO 檔並放在資產旁邊，也能把兩者匯入回來。匯入會依鍵合併，且從不刪除項目，因此對翻譯工具產生的檔案執行也很安全。

```json
{
  "label.my_window.title": "My window",
  "label.my_window.title:tooltip": "Opens the window"
}
```
