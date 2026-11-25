# API

所有內容都位於 `io.github.ykysnk.Localization.Editor` 命名空間，且僅在編輯器中使用。

## 取得 Helper

Helper 會從呼叫端程式集的 `[LocalizationPackage]` 解析，因此套件通常不需要自己建立一個：

```csharp
using io.github.ykysnk.Localization.Editor;

var helper = LocalizationHelper.For(typeof(MyEditorWindow));
```

`LocalizationHelper.For(Assembly)` 與 `For(Type)` 會為每個程式集快取一個 Helper。沒有這個屬性的程式集會記錄一則警告，並原樣顯示鍵。

## 擴充方法

| 呼叫 | 結果 |
| --- | --- |
| `"label.my_window.title".S()` | 選定語言中的文字。 |
| `"label.count".Sf(count)` | 把文字交給 `string.Format` 處理。 |
| `"label.my_window.title".G()` | 帶有文字及其工具提示的 `GUIContent`。 |
| `"label.my_window.title".Tooltip()` | 工具提示的文字。 |
| `property.S()` / `property.G()` / `property.Tooltip()` | 同上，用於從 `SerializedProperty` 衍生的鍵（`label.{Type}.{field}`）。 |
| `tree.UILocalize()` | 取代樹中的鍵，並保持同步更新。 |
| `"label.my_window.title".Register(callback)` | 註冊單一鍵。 |

`UILocalize` 會在地化 `text`、`label` 與 `headerTitle` 屬性（以及工具提示），在首幀**之前**執行，並在繫結流程之後再執行一次；除非傳入 `addLanguagePopup: false`，否則它會加入語言選擇器之後才傳回。

## 語言選擇

```csharp
helper.SelectedLanguage;          // "ja-JP"
helper.SetLanguage("en-US");      // switches and updates every localized element
helper.Languages;                 // ["en-US", "ja-JP", ...]
helper.LanguageNames;             // ["English", "日本語", ...]
```

## 選擇器控制項

```csharp
var picker = helper.CreateLanguagePicker();
settingsCard.Add(picker);
```

`LanguagePicker` 是一個會自行建立 `PopupField` 的 `VisualElement`。它會在在地化資產重新載入時重建、跟隨在其他地方進行的切換，並可透過 `language-picker` 類別設定樣式。較舊的 `SelectLanguageElement(element, spaceHeight)` 與 `SelectLanguageGUI()` 仍然存在。

## 讓數值保持同步

```csharp
var registration = helper.UpdateRegister("label.my_window.title", (text, tooltip) =>
{
    label.text = text;
    label.tooltip = tooltip;
});

label.RegisterCallback<DetachFromPanelEvent>(_ => registration.Dispose());
```

回呼會立即執行一次，之後每當語言變更或資產重新載入時再執行。元素消失時務必釋放控制代碼；這些註冊本身是弱式的，但回呼會持有該元素。

## 資料與轉換

| 型別 | 用途 |
| --- | --- |
| `BasicLocalization` | 單一語言資產：ID、顯示名稱與項目清單。 |
| `BasicTranslate` | 單一項目：`key`、`translate`、`useTooltip`、`tooltip`、`tooltipSuffix`。 |
| `LocalizationConverter` | `ToJson` / `ToPo` 與 `TryImportJson` / `TryImportPo`，供檢視器按鈕使用。 |
| `TranslateClipboard` | `TryRead` / `HasEntry`，供複製／貼上按鈕使用。 |

## 自訂選擇器

透過 Helper 讀取資料並切換即可，不需要其他東西：

```csharp
foreach (var index in Enumerable.Range(0, helper.Languages.Count))
{
    var id = helper.Languages[index];
    menu.AppendAction(helper.LanguageNames[index], _ => helper.SetLanguage(id));
}
```
