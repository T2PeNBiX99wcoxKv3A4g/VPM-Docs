# LanguagePicker

`io.github.ykysnk.Localization.Editor` · `public class LanguagePicker : VisualElement`

現成的 UI Toolkit 語言選擇器。它會列出一個在地化 ID 的所有語言、在變更時切換所選語言，並帶有 `language-picker` 類別以便套用樣式。請用 `LocalizationHelper.CreateLanguagePicker` 建立，或從 `Languages` 與 `SetLanguage` 自行組出控制項。

清單依顯示名稱排序。在地化資產重新載入時，選擇器會自行重建，因此較早建立、在延遲的首次載入之前就存在的選擇器之後也會補上內容，並會跟隨其他地方所做的切換。若已儲存的語言被重新命名或移除，它會後備到第一個語言並修正該偏好設定。彈出選單的標籤是 `label.language` 項目及其工具提示；選擇器離開面板時，該註冊會被處置。

控制項只是一個內含單一 `PopupField` 的 `VisualElement`，項目以索引表示，因此顯示名稱相同的兩個語言也能區分。全域處理常式在 `AttachToPanelEvent` 時掛上，並在 `DetachFromPanelEvent` 時連同標籤註冊一起解除。

## Constructors

```csharp
public LanguagePicker(string localizationID)
```

為一個在地化 ID 建立選擇器，並在延遲的首次載入尚未執行時當場載入資產。建議改用 `LocalizationHelper.CreateLanguagePicker`，它會傳入該輔助物件的在地化 ID。

```csharp
var picker = new LanguagePicker("io.github.ykysnk.yky-toolkit");
settingsCard.Add(picker);
```

## SelectedLanguage

```csharp
public string SelectedLanguage { get; set; }
```

目前選取的語言 ID，例如 `ja-JP`。讀取會轉交給載入器，因此當在地化沒有載入任何資產時會拋出 `ArgumentException`。指派時會切換語言，更新每個透過 `UILocalize` 在地化的元素，並在不觸發變更 callback 的情況下把彈出選單移到新項目。
