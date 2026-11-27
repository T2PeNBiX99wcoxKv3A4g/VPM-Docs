# 編輯器工具

## LocalizationPackageAttribute

```csharp
[AttributeUsage(AttributeTargets.Assembly)]
public sealed class LocalizationPackageAttribute : Attribute
```

宣告程式集的編輯器 UI 使用哪一個在地化。每個程式集宣告一次，放在 `using` 指示詞旁；之後 `LocalizationExtensions`
會自行解析正確的輔助物件，因此程式集既不需要包裝類別，也不需要輔助欄位。

```csharp
[assembly: LocalizationPackage("io.github.ykysnk.yky-toolkit")]
```

沒有這個屬性的程式集仍可編譯。`LocalizationHelper.For` 會為它記錄警告，並傳回共用的未繫結輔助物件，讓每個鍵都原樣顯示。

### LocalizationPackageAttribute(string localizationID)

```csharp
public LocalizationPackageAttribute(string localizationID)
```

為一個在地化 ID 建立屬性，並將其存入 `LocalizationID`。

### LocalizationID

```csharp
public string LocalizationID { get; }
```

其資產存放這個程式集翻譯的在地化 ID。

## LanguagePicker

```csharp
public class LanguagePicker : VisualElement
```

現成的 UI Toolkit 語言選擇器。它會列出一個在地化 ID 的所有語言、在變更時切換所選語言，並帶有 `language-picker` 類別以便套用樣式。請用
`LocalizationHelper.CreateLanguagePicker` 建立，或從 `Languages` 與 `SetLanguage` 自行組出控制項。

清單依顯示名稱排序。在地化資產重新載入時，選擇器會自行重建，因此較早建立、在延遲的首次載入之前就存在的選擇器之後也會補上內容，並會跟隨其他地方所做的切換。若已儲存的語言被重新命名或移除，它會後備到第一個語言並修正該偏好設定。彈出選單的標籤是
`label.language` 項目及其工具提示；選擇器離開面板時，該註冊會被處置。

### LanguagePicker(string localizationID)

```csharp
public LanguagePicker(string localizationID)
```

為一個在地化 ID 建立選擇器。建議改用 `LocalizationHelper.CreateLanguagePicker`。

```csharp
var picker = new LanguagePicker("io.github.ykysnk.yky-toolkit");
settingsCard.Add(picker);
```

### SelectedLanguage

```csharp
public string SelectedLanguage { get; set; }
```

目前選取的語言 ID。指派時會切換語言，並更新每個透過 `UILocalize` 在地化的元素。

## LocalizationConverter

```csharp
public static class LocalizationConverter
```

在 `BasicLocalization` 與翻譯工具使用的扁平格式之間轉換。每筆項目都會貢獻它的鍵與文字；使用工具提示的項目會在附加
`tooltipSuffix` 的鍵下多加一組。匯入會依鍵合併且從不刪除項目：新的鍵會附加，既有的鍵則取得匯入的文字。

以工具提示後綴結尾的鍵，只有在檔案或資產中存在其基礎鍵時才會被讀回為工具提示；否則它仍是一般項目。這樣可以讓
`label.basic_translate.tooltip` 這類鍵保持完整。

### TooltipSuffixes

```csharp
public static readonly string[] TooltipSuffixes = { ":tooltip", ".tooltip", "_tooltip" };
```

把鍵讀回為工具提示項目時所辨識的後綴。

### ToJson

```csharp
public static string ToJson(BasicLocalization localization)
```

扁平 JSON 物件：鍵對應到文字，並為每個使用工具提示的項目多加一個工具提示鍵。

### ToPo

```csharp
public static string ToPo(BasicLocalization localization)
```

每個鍵一組 `msgid`/`msgstr` 的 PO 檔，包含工具提示。標頭帶有 `Language: {asset name}`，因為 Unity 自己的 PO
匯入器會拒絕沒有它的檔案，只留下匯入錯誤。

### TryImportJson

```csharp
public static bool TryImportJson(BasicLocalization localization, string? text, out Exception? exception)
```

把扁平 JSON 物件讀入 `localization`。失敗時傳回 false 並把解析錯誤放入 `exception`；null 文字會被視為 `""`，它不是 JSON
物件，因此會失敗。

### TryImportPo

```csharp
public static bool TryImportPo(BasicLocalization localization, string? text, out Exception? exception)
```

把 PO 檔讀入 `localization`。失敗時傳回 false 並把解析錯誤放入 `exception`；null 文字會被視為空內容，不匯入任何東西。

## TranslateClipboard

```csharp
public static class TranslateClipboard
```

翻譯項目的剪貼簿處理，由檢視器與資料列繪製器共用。

### HasEntry()

```csharp
public static bool HasEntry()
```

剪貼簿目前是否存有翻譯項目。答案會依剪貼簿文字快取，因此按鈕可以頻繁詢問而不必再次解析 JSON。

### TryRead(out BasicTranslate?, out Exception?)

```csharp
public static bool TryRead([NotNullWhen(true)] out BasicTranslate? basicTranslate, out Exception? exception)
```

嘗試從剪貼簿讀取 `BasicTranslate`。文字必須能解析為 JSON 且帶有非空的 `key`，因此空白剪貼簿或不相關的 JSON
物件會被拒絕，而不會用空值覆寫資料列。

方法傳回 true 時，`basicTranslate` 是解析出的項目，否則為 null。`exception` 是解析或驗證錯誤，剪貼簿單純為空時則為 null。

```csharp
if (TranslateClipboard.TryRead(out var entry, out var error))
    Paste(entry);
else if (error != null)
    Debug.LogWarning(error.Message);
```
