# 查詢與更新

## LocalizationHelper

```csharp
public class LocalizationHelper
```

為一個在地化 ID 查詢鍵，並在語言或資料變更時讓 UI 元素保持最新。請用 `For` 取得，它會從程式集屬性讀取 ID。

### LocalizationHelper(string localizationID)

```csharp
public LocalizationHelper(string localizationID)
```

為一個在地化 ID 建立輔助物件。建議改用 `For(Assembly)` 或 `For(Type)`，它們會從 `LocalizationPackageAttribute` 讀取 ID。

### For(Assembly)

```csharp
public static LocalizationHelper For(Assembly assembly)
```

由 `assembly` 的 `LocalizationPackageAttribute` 宣告的輔助物件，每個程式集快取一份。沒有屬性時會記錄警告，並傳回共用的未繫結輔助物件。

### For(Type)

```csharp
public static LocalizationHelper For(Type type)
```

`For(type.Assembly)`；也就是包含 `type` 之程式集的輔助物件。

### SelectedLanguage

```csharp
public string SelectedLanguage { get; set; }
```

目前選取的語言 ID，例如 `ja-JP`。這個值會保存在 `EditorPrefs` 的 `{localizationID}_Language` 下，預設為 `en-US`。

指派時會切換語言，並改寫每個透過 `UILocalize` 或 `UpdateRegister` 在地化的元素。若這個 ID 沒有載入任何資產，getter 會拋出
`ArgumentException`；若語言不在 `Languages` 中，setter 也會拋出例外。

```csharp
helper.SelectedLanguage = "ja-JP";
```

### SetLanguage(string)

```csharp
public void SetLanguage(string language)
```

等同於指派 `SelectedLanguage`。

### Languages

```csharp
public IReadOnlyList<string> Languages { get; }
```

這個在地化的語言 ID，依顯示順序排列。ID 就是 `BasicLocalization` 資產的檔名（`en-US`、`ja-JP`）；清單依顯示名稱排序，在資產載入前為空。

### LanguageNames

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

### S(string, string?)

```csharp
public string S(string key, string? defaultValue = null)
```

`key` 在所選語言中的文字。會依序後備到 `en-US` 的文字、`defaultValue`，最後是鍵本身，因此缺少翻譯時永遠不會拋出例外。所選語言中的空文字同樣會後備到英文。

```csharp
label.text = helper.S("label.my_window.title");
```

### S(string, out string?)

```csharp
public bool S(string key, out string? localizationString)
```

查詢 `key`，但不會後備到鍵本身；沒有任何語言有它的文字時傳回 false。此時 `localizationString` 為 null。

```csharp
if (helper.S("unity:label.position", out var text))
    label.text = L10n.Tr(text!);
```

### S(SerializedProperty)

```csharp
public string S(SerializedProperty property)
```

由 `property` 推導出的鍵所對應的文字：`label.{Type}.{field}`
。請見 [從 SerializedProperty 推導鍵](#keys-from-a-serializedproperty)。

### Sf(string, params object?[])

```csharp
public string Sf(string key, params object?[] args)
```

把 `S(key)` 的結果交給 `string.Format`。格式字串與引數不符時，會傳回 `text(arg1, arg2)` 而不是拋出例外。

```csharp
var text = helper.Sf("label.found_count", 3);   // "3 assets found"
```

### G(string)

```csharp
public GUIContent G(string key)
```

以 `key` 的文字與其 `:tooltip` 項目作為工具提示的 `GUIContent`。

### G(string, Texture?)

```csharp
public GUIContent G(string key, Texture? image)
```

與 `G(string)` 相同，並加上圖示 `image`。

### G(string, Texture?, string?)

```csharp
public GUIContent G(string key, Texture? image, string? tooltip)
```

`key` 的文字、圖示 `image`，以及儲存在 `tooltip` 鍵下的文字。

```csharp
GUILayout.Button(helper.G("label.browse", icon), GUILayout.Width(80));
```

每個在地化 ID 與鍵會快取一個 `GUIContent`，並在每次呼叫時改寫，因此單靠切換語言不會更新它；下一次呼叫 `G` 時才會刷新。

### G(SerializedProperty)

```csharp
public GUIContent G(SerializedProperty property)
```

由 `property` 推導出的鍵所對應的 `GUIContent`。

### Tooltip(string, string?)

```csharp
public string Tooltip(string key, string? defaultValue = null)
```

`key` 的工具提示，也就是以 `:tooltip` 後綴儲存的項目。`defaultValue` 的行為與 `S(string, string?)` 相同，因此沒有項目也沒有預設值時，傳回的文字是
`{key}:tooltip`。

### Tooltip(string, out string?)

```csharp
public bool Tooltip(string key, out string? tooltip)
```

不帶後備的工具提示查詢；工具提示項目不存在時傳回 false。

### Tooltip(SerializedProperty)

```csharp
public string Tooltip(SerializedProperty property)
```

由 `property` 推導出的鍵所對應的工具提示；沒有時為空字串。

### UpdateRegister(string, UpdateHelper.Callback)

```csharp
public UpdateHelper UpdateRegister(string localizeKey, UpdateHelper.Callback callback)
```

為 `localizeKey` 註冊 `callback`。它會收到該鍵的標籤與 `:tooltip` 文字，並在語言變更或資產重新載入時執行。它所更新的元素消失時，請處置（dispose）這個控制代碼。

```csharp
var registration = helper.UpdateRegister("label.my_window.title", (text, tooltip) =>
{
    title.text = text;
    title.tooltip = tooltip;
});

title.RegisterCallback<DetachFromPanelEvent>(_ => registration.Dispose());
```

### UpdateRegister(SerializedProperty, UpdateHelper.Callback)

```csharp
public UpdateHelper UpdateRegister(SerializedProperty property, UpdateHelper.Callback callback)
```

與 `UpdateRegister(string, UpdateHelper.Callback)` 相同，只是改用由 `property` 推導出的鍵。

### UILocalize(VisualElement, bool, int)

```csharp
public void UILocalize(VisualElement elem, bool addLanguagePopup = true, int spaceHeight = 8)
```

把 `elem` 樹狀結構中的鍵替換成對應的翻譯，並讓它們保持最新。對每個元素，會取 `text`、`label`、`headerTitle` 中第一個有 setter
的屬性作為鍵讀取，再寫回翻譯後的文字，工具提示則由該鍵的 `:tooltip` 項目填入。

樹狀結構會立即在地化，因此鍵永遠不會出現在畫面上；繫結階段之後會再執行一次，因為繫結可能把鍵寫回去。元素從面板卸離時，註冊會被處置。設定
`addLanguagePopup` 時，語言選擇器會附加在 `spaceHeight` 的間隔下方。

會略過：名為 `unity-text-input` 或 `unity-content` 的子元素（含其子樹）、任何帶有 `localize-skip` 類別的子樹，以及帶有
`unity-base-field__inspector-field` 或 `unity-object-field-display__label` 的元素。帶有 `localize-tooltip`
類別的元素不會從其標籤鍵取得工具提示；它現有的 `tooltip` 會被視為鍵並自行在地化。

### GetLanguageLocalization(string)

```csharp
public Dictionary<string, string> GetLanguageLocalization(string language)
```

某一語言所有鍵與文字的快照，以新的字典傳回。在地化 ID 或語言未知時會拋出 `ArgumentException`。

### CreateLanguagePicker()

```csharp
public LanguagePicker CreateLanguagePicker()
```

為這個在地化建立新的 `LanguagePicker`，可直接加入樹狀結構。

```csharp
settingsCard.Add(helper.CreateLanguagePicker());
```

### SelectLanguageElement(VisualElement, int)

```csharp
public void SelectLanguageElement(VisualElement element, int spaceHeight = 8)
```

在 `element` 之後附加 `spaceHeight` 的間隔與 UI Toolkit 語言彈出選單。若需要控制項的位置或樣式，建議改用
`CreateLanguagePicker`。

### SelectLanguageGUI()

```csharp
public void SelectLanguageGUI()
```

以 `EditorGUILayout.Popup` 繪製 IMGUI 語言選擇器，標籤為 `label.language` 及其工具提示。

### OnLocalizationChanged

```csharp
public event LocalizationChanged? OnLocalizationChanged

public delegate void LocalizationChanged(string newLanguage)
```

這個在地化的選取語言變更時，會以新語言觸發。只有在有處理常式掛上時，輔助物件才會訂閱
`GlobalLocalization.OnLocalizationChanged`，並在最後一個處理常式移除時取消訂閱。

### LocalizationUpdated

```csharp
public delegate void LocalizationUpdated()
```

與 `LocalizationChanged` 一同宣告的無引數委派型別。`LocalizationHelper` 不提供這種事件；重新載入通知來自
`GlobalLocalization.OnLocalizationReload`。

## LocalizationExtensions

```csharp
public static class LocalizationExtensions
```

編輯器 UI 的語法糖：`"label.some_key".S()`、`tree.UILocalize()` 等。每個方法都會從發出呼叫之程式集的
`LocalizationPackageAttribute` 解析輔助物件，因此套件不需要自己的包裝類別。

每個方法都標記了 `[MethodImpl(MethodImplOptions.NoInlining)]`，因為呼叫一旦被內嵌，`Assembly.GetCallingAssembly`
回報的就會是這個程式集，而不是取用者。

### S(this string)

```csharp
public static string S(this string key)
```

`key` 在呼叫端程式集之在地化中的文字。

```csharp
label.text = "label.my_window.title".S();
```

### S(this SerializedProperty)

```csharp
public static string S(this SerializedProperty property)
```

由 `property` 推導出的鍵所對應的文字。

### Sf(this string, params object?[])

```csharp
public static string Sf(this string key, params object?[] args)
```

把 `key` 的文字交給 `string.Format`。

```csharp
label.text = "label.found_count".Sf(count);
```

### G(this string)

```csharp
public static GUIContent G(this string key)
```

以 `key` 的文字與其工具提示組成的 `GUIContent`。

```csharp
GUILayout.Label("label.my_window.title".G());
```

### G(this SerializedProperty)

```csharp
public static GUIContent G(this SerializedProperty property)
```

由 `property` 推導出的鍵所對應的 `GUIContent`。

### Tooltip(this string)

```csharp
public static string Tooltip(this string key)
```

`key` 的工具提示，也就是以 `:tooltip` 後綴儲存的項目。

### Tooltip(this SerializedProperty)

```csharp
public static string Tooltip(this SerializedProperty property)
```

由 `property` 推導出的鍵所對應的工具提示。

### UILocalize(this VisualElement, bool, int)

```csharp
public static void UILocalize(this VisualElement element, bool addLanguagePopup = true, int spaceHeight = 8)
```

把 `element` 樹狀結構中的鍵替換成對應的翻譯，並讓它們保持最新。請在繫結樹狀結構之前呼叫。關於使用的屬性、略過規則與第二輪處理，請見
`LocalizationHelper.UILocalize`。

```csharp
root.UILocalize();
```

### Register(this string, UpdateHelper.Callback)

```csharp
public static UpdateHelper Register(this string localizeKey, UpdateHelper.Callback callback)
```

為 `localizeKey` 註冊 `callback`；它所更新的元素消失時，請處置這個控制代碼。

### Register(this SerializedProperty, UpdateHelper.Callback)

```csharp
public static UpdateHelper Register(this SerializedProperty property, UpdateHelper.Callback callback)
```

為由 `property` 推導出的鍵註冊 `callback`。

### 從 SerializedProperty 推導鍵

`S(property)`、`G(property)`、`Tooltip(property)` 與 `Register(property, ...)` 會組成 `label.{Type}.{field}`。`Type` 是
`property.serializedObject.targetObject` 的型別名稱；兩部分都依相同規則轉換：

- 大寫字母會在小寫轉大寫的交界處，或縮寫的最後一個大寫字母之前，開始一個新詞：`UIText` 變成 `ui_text`，`HPBar` 變成
  `hp_bar`，`localizationID` 變成 `localization_id`；
- 符號與標點會變成 `_`。

因此 `MyWindow` 上的 `displayName` 欄位就是 `label.my_window.display_name`。

## UpdateHelper

```csharp
public class UpdateHelper : IDisposable
```

在在地化重新載入或語言變更時，讓一組標籤與工具提示保持最新。每個註冊都各自獨立，因此多個元素可以共用同一個鍵。

### UpdateHelper.Callback

```csharp
public delegate void Callback(string newLabel, string newTooltip)
```

接收所註冊鍵的新標籤與工具提示。

### Register(string, string, Callback)

```csharp
public static UpdateHelper Register(string localizationID, string localizeKey, Callback callback)
```

為某個在地化 ID 的某個鍵註冊 `callback`，並傳回可取消註冊的控制代碼。`Register` 本身不會呼叫
callback；它會在下次語言變更或重新載入時執行，因此請先用 `S` 與 `Tooltip` 設定初始文字。

### Register(string, SerializedProperty, Callback)

```csharp
public static UpdateHelper Register(string localizationID, SerializedProperty property, Callback callback)
```

註冊標籤屬性會使用的鍵，該鍵由其型別與欄位名稱推導而來。

### Dispose()

```csharp
public void Dispose()
```

停止更新 callback 並移除註冊。它所更新的元素被移除時請呼叫它；之後 callback 就永遠不會再被呼叫。

## GlobalLocalization

```csharp
[InitializeOnLoad]
public static class GlobalLocalization
```

載入專案中所有 `BasicLocalization` 資產、維護各 ID 的語言字典與所選語言，並刷新註冊。查詢會經過 `LocalizationHelper`
；這個型別只公開它的事件與委派。

載入會延後到編輯器的第一次 tick，並在資產變更後以 250 ms 的延遲合併處理，因此在翻譯資產中輸入時，不會每按一鍵就重新掃描整個專案。
`Tools > Localization > Reload Localizations` 會強制重新載入。所選語言會依 ID 儲存在 `EditorPrefs` 的
`{localizationID}_Language` 下。

### OnLocalizationReload

```csharp
public static event LocalizationUpdated? OnLocalizationReload

public delegate void LocalizationUpdated()
```

在資產重新載入、且每個註冊都已刷新之後觸發。適合用於無法由 `UILocalize` 或 `UpdateRegister` 保持最新的 UI。

### OnLocalizationChanged

```csharp
public static event LocalizationChanged? OnLocalizationChanged

public delegate void LocalizationChanged(string localizationID, string newLanguage)
```

某個在地化的所選語言變更時觸發，附上在地化 ID 與新語言。事件觸發前會先刷新註冊。重新載入不會觸發它。
