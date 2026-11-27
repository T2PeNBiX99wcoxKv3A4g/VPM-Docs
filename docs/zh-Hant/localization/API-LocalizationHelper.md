# LocalizationHelper

`io.github.ykysnk.Localization.Editor` · `public class LocalizationHelper`

為一個在地化 ID 查詢鍵，並在語言或資料變更時讓 UI 元素保持最新。請用 `For` 取得，它會從程式集屬性讀取 ID。

輔助物件只保存 ID：所有查詢與註冊都交給 [`GlobalLocalization`](./API-GlobalLocalization.md) 的載入器處理，因此同一個 ID 的兩個輔助物件看到的是同一份資料與同一個選取的語言。

## Constructors

```csharp
public LocalizationHelper(string localizationID)
```

為一個在地化 ID 建立輔助物件。建議改用 `For(Assembly)` 或 `For(Type)`，它們會從 `LocalizationPackageAttribute` 讀取 ID；手動建立的輔助物件不會依程式集快取，也不會在該 ID 從未載入時發出警告。

## SelectedLanguage

```csharp
public string SelectedLanguage { get; set; }
```

目前選取的語言 ID，例如 `ja-JP`。這個值會保存在 `EditorPrefs` 的 `{localizationID}_Language` 下，預設為 `en-US`。

指派時會切換語言、改寫每個透過 `UILocalize` 或 `UpdateRegister` 在地化的元素，然後觸發 `OnLocalizationChanged`。若這個 ID 沒有載入任何資產，getter 會拋出 `ArgumentException`；若語言不在 `Languages` 中，setter 也會拋出例外。

```csharp
helper.SelectedLanguage = "ja-JP";
```

## Languages

```csharp
public IReadOnlyList<string> Languages { get; }
```

這個在地化的語言 ID，依顯示順序排列。ID 就是 `BasicLocalization` 資產的檔名（`en-US`、`ja-JP`）；清單依顯示名稱以不變文化比較子排序，在資產載入前為空。

## LanguageNames

```csharp
public IReadOnlyList<string> LanguageNames { get; }
```

與 `Languages` 逐項對應的顯示名稱。

```csharp
var ids = helper.Languages;
for (var i = 0; i < ids.Count; i++)
{
    var id = ids[i];
    menu.AppendAction(helper.LanguageNames[i], _ => helper.SetLanguage(id));
}
```

## OnLocalizationChanged

```csharp
public event LocalizationChanged? OnLocalizationChanged
```

這個在地化的選取語言變更時，會以新語言觸發。輔助物件只在第一個處理常式掛上時訂閱 `GlobalLocalization.OnLocalizationChanged`，並在最後一個處理常式移除時取消訂閱，因此僅用於查詢的輔助物件不會增加監聽者。

## LocalizationChanged

```csharp
public delegate void LocalizationChanged(string newLanguage)
```

`OnLocalizationChanged` 的處理常式型別：它接收剛選取的語言，不含在地化 ID。

## LocalizationUpdated

```csharp
public delegate void LocalizationUpdated()
```

與 `LocalizationChanged` 一同宣告的無引數委派型別。`LocalizationHelper` 不提供這種事件；重新載入通知來自 `GlobalLocalization.OnLocalizationReload`。

## For

```csharp
public static LocalizationHelper For(Assembly assembly)
public static LocalizationHelper For(Type type)
```

`For(assembly)` 傳回由 `assembly` 的 `LocalizationPackageAttribute` 宣告的輔助物件，每個程式集快取一份。沒有屬性的程式集會記錄警告，並取得共用的未繫結輔助物件；它的 ID 為空，因此會原樣顯示每個鍵。`For(type)` 等同 `For(type.Assembly)`，也就是包含 `type` 之程式集的輔助物件。

```csharp
var helper = LocalizationHelper.For(typeof(MyWindow));
```

## SetLanguage

```csharp
public void SetLanguage(string language)
```

等同於指派 `SelectedLanguage`。

## CreateLanguagePicker

```csharp
public LanguagePicker CreateLanguagePicker()
```

為這個在地化建立新的 `LanguagePicker`，可直接加入樹狀結構。控制項附加後的行為請見 [`LanguagePicker`](./API-LanguagePicker.md)。

```csharp
settingsCard.Add(helper.CreateLanguagePicker());
```

## SelectLanguageGUI

```csharp
public void SelectLanguageGUI()
```

以 `EditorGUILayout.Popup` 繪製 IMGUI 語言選擇器，標籤為 `label.language` 及其工具提示。已儲存的語言不在清單中時會選取第一個項目，變更則經過與 `SetLanguage` 相同的路徑。

## SelectLanguageElement

```csharp
public void SelectLanguageElement(VisualElement element, int spaceHeight = 8)
```

在 `element` 之後附加 `spaceHeight` 的間隔與 UI Toolkit 語言彈出選單。延遲的首次載入尚未執行時會當場載入資產；已儲存的語言不存在時會後備到第一個語言，並在不觸發變更事件的情況下修正該偏好設定。彈出選單離開面板時，標籤註冊會被處置。

若需要控制項的位置或樣式，建議改用 `CreateLanguagePicker`。

## UpdateRegister

```csharp
public UpdateHelper UpdateRegister(string localizeKey, UpdateHelper.Callback callback)
public UpdateHelper UpdateRegister(SerializedProperty property, UpdateHelper.Callback callback)
```

為 `localizeKey` 註冊 `callback`。它會收到該鍵的標籤與 `:tooltip` 文字，並在語言變更或資產重新載入時執行。`SerializedProperty` 多載使用由屬性推導出的鍵。它所更新的元素消失時，請處置這個控制代碼；詳見 [`UpdateHelper`](./API-UpdateHelper.md)。

```csharp
var registration = helper.UpdateRegister("label.my_window.title", (text, tooltip) =>
{
    title.text = text;
    title.tooltip = tooltip;
});

title.RegisterCallback<DetachFromPanelEvent>(_ => registration.Dispose());
```

## GetLanguageLocalization

```csharp
public Dictionary<string, string> GetLanguageLocalization(string language)
```

某一語言所有鍵與文字的快照，以新的字典傳回。在地化 ID 或語言未知時會拋出 `ArgumentException`。

## S

```csharp
public string S(string key, string? defaultValue = null)
public bool S(string key, out string? localizationString)
public string S(SerializedProperty property)
```

`S(key, defaultValue)` 傳回 `key` 在所選語言中的文字，會依序後備到 `en-US` 的文字、`defaultValue`，最後是鍵本身，因此缺少翻譯時永遠不會拋出例外。所選語言中的空文字同樣會後備到英文。

`S(key, out localizationString)` 會先查所選語言，再查 `en-US`，但不會後備到鍵本身。兩者都沒有項目時傳回 false，`localizationString` 保持為 null，`unity:` 鍵與一般文字正是靠這一點區分。

`S(property)` 使用由 `property` 推導出的鍵 `label.{Type}.{field}`，其中 `Type` 是 `property.serializedObject.targetObject` 的型別名稱，兩部分都依相同規則轉換（`UIText` 變成 `ui_text`，`HPBar` 變成 `hp_bar`，`localizationID` 變成 `localization_id`，符號與標點變成 `_`）。因此 `MyWindow` 上的 `displayName` 欄位就是 `label.my_window.display_name`。

```csharp
label.text = helper.S("label.my_window.title");
```

## Sf

```csharp
public string Sf(string key, params object?[] args)
```

把 `S(key)` 的結果交給 `string.Format`。格式字串與引數不符時，會傳回 `text(arg1, arg2)` 而不是拋出例外。

```csharp
var text = helper.Sf("label.found_count", 3);   // "3 assets found"
```

## G

```csharp
public GUIContent G(string key)
public GUIContent G(string key, Texture? image)
public GUIContent G(string key, Texture? image, string? tooltip)
public GUIContent G(SerializedProperty property)
```

`G(key)` 是以 `key` 的文字與其 `:tooltip` 項目作為工具提示的 `GUIContent`。帶 `image` 的多載會加上圖示，三引數多載改從 `tooltip` 鍵讀取工具提示（沒有該項目時為空），`G(property)` 則使用推導出的 `label.{Type}.{field}` 鍵。

```csharp
GUILayout.Button(helper.G("label.browse", icon), GUILayout.Width(80));
```

每個在地化 ID 與鍵會快取一個 `GUIContent`，並在每次呼叫時改寫，因此單靠切換語言不會更新它；下一次呼叫 `G` 時才會刷新。

## Tooltip

```csharp
public string Tooltip(string key, string? defaultValue = null)
public bool Tooltip(string key, out string? tooltip)
public string Tooltip(SerializedProperty property)
```

`key` 的工具提示，也就是以 `:tooltip` 後綴儲存的項目。`defaultValue` 的行為與 `S(string, string?)` 相同，因此沒有項目也沒有預設值時，傳回的文字是 `{key}:tooltip`。

帶 `out` 的多載完全不做後備，項目不存在時傳回 false；`Tooltip(property)` 在這種情況下傳回空字串。

## UILocalize

```csharp
public void UILocalize(VisualElement elem, bool addLanguagePopup = true, int spaceHeight = 8)
```

把 `elem` 樹狀結構中的鍵替換成對應的翻譯，並讓它們保持最新。對每個元素，會取 `text`、`label`、`headerTitle` 中第一個有 setter 的屬性作為鍵讀取，再寫回翻譯後的文字，工具提示則由該鍵的 `:tooltip` 項目填入。帶 `unity:` 前綴的鍵保存的是 `L10n.Tr` 要翻譯的英文文字，因此會先解析再交給 `L10n.Tr`；這類標籤只翻譯一次、不會註冊，而沒有項目的鍵會記錄一次警告並保留原始鍵。

樹狀結構會立即在地化，因此鍵永遠不會出現在畫面上；在下一個排程器 tick 還會再執行一次，因為 `UILocalize` 之後執行的繫結可能把鍵寫回去。只有第一輪處理會註冊，因此文字不是已知鍵的元素會維持原樣，第二輪只改寫第一輪註冊過的元素。元素從面板卸離時，註冊會被處置。設定 `addLanguagePopup` 時，語言選擇器會附加在 `spaceHeight` 的間隔下方。

會略過：名為 `unity-text-input` 或 `unity-content` 的子元素（含其子樹）、任何帶有 `localize-skip` 類別的子樹，以及帶有 `unity-base-field__inspector-field` 或 `unity-object-field-display__label` 的元素——後兩者只略過元素本身，仍會處理其子元素。帶有 `localize-tooltip` 類別的元素不會從其標籤鍵取得工具提示；它現有的 `tooltip` 會被視為鍵，自行在地化並單獨保持註冊。

```csharp
var root = uxml.CloneTree();
helper.UILocalize(root);
```
