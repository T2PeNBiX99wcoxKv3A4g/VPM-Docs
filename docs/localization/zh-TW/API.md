# API

## 命名空間

| 命名空間 | 程式集 | 範圍 |
| --- | --- | --- |
| `io.github.ykysnk.Localization` | `io.github.ykysnk.localization` | 執行階段 |
| `io.github.ykysnk.Localization.Editor` | `io.github.ykysnk.localization.Editor` | 僅編輯器 |

`BasicLocalization` 與 `BasicTranslate` 位於執行階段命名空間；本頁其他型別都只在編輯器中提供。

## LocalizationPackageAttribute

```csharp
[AttributeUsage(AttributeTargets.Assembly)]
public sealed class LocalizationPackageAttribute : Attribute
```

宣告程式集的編輯器 UI 使用哪一個在地化。每個程式集宣告一次，放在 `using` 指示詞旁；之後 `LocalizationExtensions` 會自行解析正確的輔助物件，因此程式集既不需要包裝類別，也不需要輔助欄位。

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

指派時會切換語言，並改寫每個透過 `UILocalize` 或 `UpdateRegister` 在地化的元素。若這個 ID 沒有載入任何資產，getter 會拋出 `ArgumentException`；若語言不在 `Languages` 中，setter 也會拋出例外。

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

由 `property` 推導出的鍵所對應的文字：`label.{Type}.{field}`。請見 [從 SerializedProperty 推導鍵](#keys-from-a-serializedproperty)。

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

`key` 的工具提示，也就是以 `:tooltip` 後綴儲存的項目。`defaultValue` 的行為與 `S(string, string?)` 相同，因此沒有項目也沒有預設值時，傳回的文字是 `{key}:tooltip`。

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

把 `elem` 樹狀結構中的鍵替換成對應的翻譯，並讓它們保持最新。對每個元素，會取 `text`、`label`、`headerTitle` 中第一個有 setter 的屬性作為鍵讀取，再寫回翻譯後的文字，工具提示則由該鍵的 `:tooltip` 項目填入。

樹狀結構會立即在地化，因此鍵永遠不會出現在畫面上；繫結階段之後會再執行一次，因為繫結可能把鍵寫回去。元素從面板卸離時，註冊會被處置。設定 `addLanguagePopup` 時，語言選擇器會附加在 `spaceHeight` 的間隔下方。

會略過：名為 `unity-text-input` 或 `unity-content` 的子元素（含其子樹）、任何帶有 `localize-skip` 類別的子樹，以及帶有 `unity-base-field__inspector-field` 或 `unity-object-field-display__label` 的元素。帶有 `localize-tooltip` 類別的元素不會從其標籤鍵取得工具提示；它現有的 `tooltip` 會被視為鍵並自行在地化。

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

在 `element` 之後附加 `spaceHeight` 的間隔與 UI Toolkit 語言彈出選單。若需要控制項的位置或樣式，建議改用 `CreateLanguagePicker`。

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

這個在地化的選取語言變更時，會以新語言觸發。只有在有處理常式掛上時，輔助物件才會訂閱 `GlobalLocalization.OnLocalizationChanged`，並在最後一個處理常式移除時取消訂閱。

### LocalizationUpdated

```csharp
public delegate void LocalizationUpdated()
```

與 `LocalizationChanged` 一同宣告的無引數委派型別。`LocalizationHelper` 不提供這種事件；重新載入通知來自 `GlobalLocalization.OnLocalizationReload`。

## LocalizationExtensions

```csharp
public static class LocalizationExtensions
```

編輯器 UI 的語法糖：`"label.some_key".S()`、`tree.UILocalize()` 等。每個方法都會從發出呼叫之程式集的 `LocalizationPackageAttribute` 解析輔助物件，因此套件不需要自己的包裝類別。

每個方法都標記了 `[MethodImpl(MethodImplOptions.NoInlining)]`，因為呼叫一旦被內嵌，`Assembly.GetCallingAssembly` 回報的就會是這個程式集，而不是取用者。

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

把 `element` 樹狀結構中的鍵替換成對應的翻譯，並讓它們保持最新。請在繫結樹狀結構之前呼叫。關於使用的屬性、略過規則與第二輪處理，請見 `LocalizationHelper.UILocalize`。

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

`S(property)`、`G(property)`、`Tooltip(property)` 與 `Register(property, ...)` 會組成 `label.{Type}.{field}`。`Type` 是 `property.serializedObject.targetObject` 的型別名稱；兩部分都依相同規則轉換：

- 大寫字母會在小寫轉大寫的交界處，或縮寫的最後一個大寫字母之前，開始一個新詞：`UIText` 變成 `ui_text`，`HPBar` 變成 `hp_bar`，`localizationID` 變成 `localization_id`；
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

為某個在地化 ID 的某個鍵註冊 `callback`，並傳回可取消註冊的控制代碼。`Register` 本身不會呼叫 callback；它會在下次語言變更或重新載入時執行，因此請先用 `S` 與 `Tooltip` 設定初始文字。

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

## LanguagePicker

```csharp
public class LanguagePicker : VisualElement
```

現成的 UI Toolkit 語言選擇器。它會列出一個在地化 ID 的所有語言、在變更時切換所選語言，並帶有 `language-picker` 類別以便套用樣式。請用 `LocalizationHelper.CreateLanguagePicker` 建立，或從 `Languages` 與 `SetLanguage` 自行組出控制項。

清單依顯示名稱排序。在地化資產重新載入時，選擇器會自行重建，因此較早建立、在延遲的首次載入之前就存在的選擇器之後也會補上內容，並會跟隨其他地方所做的切換。若已儲存的語言被重新命名或移除，它會後備到第一個語言並修正該偏好設定。彈出選單的標籤是 `label.language` 項目及其工具提示；選擇器離開面板時，該註冊會被處置。

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

## BasicLocalization

```csharp
[CreateAssetMenu(fileName = "en-US", menuName = "Localization/Basic Localization")]
public class BasicLocalization : ScriptableObject
```

一個在地化集合：某一語言的翻譯。資產的檔名就是 `Languages` 與 `SetLanguage` 使用的語言 ID；`localizationID` 則把同一個套件的語言歸為一組。`jsonFile` 與 `poFile` 可選擇指向檢視器寫出的附屬檔案，讓同一份文字也能用外部工具編輯。

### localizationID

```csharp
public string localizationID = "";
```

同一個在地化所有語言共用的群組 ID。ID 為空的資產在載入時會被略過並記錄警告。

### displayName

```csharp
public string displayName = "English";
```

語言選擇器中顯示的名稱。欄位為空時，`OnValidate` 會還原為 `English`。

### translates

```csharp
public List<BasicTranslate> translates = new();
```

這個語言的所有翻譯。新資產會從 `label.language` 項目開始。

### jsonFile

```csharp
public Object? jsonFile;
```

由檢視器的 `Export JSON` 寫出的附屬 JSON 檔。

### poFile

```csharp
public Object? poFile;
```

由檢視器的 `Export PO` 寫出的附屬 PO 檔。

### OnLocalizationFileUpdated

```csharp
public static event LocalizationFileUpdated? OnLocalizationFileUpdated

public delegate void LocalizationFileUpdated(string localizationID, string localizationName)
```

任何資產變更後由 `OnValidate` 觸發，附上該資產的在地化 ID 與名稱。`GlobalLocalization` 用它來排程重新載入。

## BasicTranslate

```csharp
[Serializable]
public class BasicTranslate
```

一筆翻譯項目：鍵、文字與選用的工具提示。工具提示是選擇性的；`useTooltip` 為 false 時，`tooltip` 中的文字仍留在資產中，但不會被載入或顯示。

### DefaultTooltipSuffix

```csharp
public const string DefaultTooltipSuffix = ":tooltip";
```

附加到 `key` 的後綴，除非項目另有覆寫。

### key

```csharp
public string key = "";
```

識別這筆翻譯的鍵，例如 `label.language`。

### translate

```csharp
public string translate = "";
```

`key` 的翻譯文字。

### tooltip

```csharp
public string tooltip = "";
```

工具提示文字，僅在 `useTooltip` 為 true 時使用。

### useTooltip

```csharp
public bool useTooltip;
```

工具提示是否參與載入與編輯器 UI。預設為關閉。

### tooltipSuffix

```csharp
public string tooltipSuffix = DefaultTooltipSuffix;
```

附加到 `key` 以發佈工具提示的後綴，例如 `label.language:tooltip`。除非有外掛預期其他拼法（例如 `.tooltip`），否則請保持預設值；對這類項目，載入器仍會讓 `:tooltip` 可以被解析。

## LocalizationConverter

```csharp
public static class LocalizationConverter
```

在 `BasicLocalization` 與翻譯工具使用的扁平格式之間轉換。每筆項目都會貢獻它的鍵與文字；使用工具提示的項目會在附加 `tooltipSuffix` 的鍵下多加一組。匯入會依鍵合併且從不刪除項目：新的鍵會附加，既有的鍵則取得匯入的文字。

以工具提示後綴結尾的鍵，只有在檔案或資產中存在其基礎鍵時才會被讀回為工具提示；否則它仍是一般項目。這樣可以讓 `label.basic_translate.tooltip` 這類鍵保持完整。

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

每個鍵一組 `msgid`/`msgstr` 的 PO 檔，包含工具提示。標頭帶有 `Language: {asset name}`，因為 Unity 自己的 PO 匯入器會拒絕沒有它的檔案，只留下匯入錯誤。

### TryImportJson

```csharp
public static bool TryImportJson(BasicLocalization localization, string? text, out Exception? exception)
```

把扁平 JSON 物件讀入 `localization`。失敗時傳回 false 並把解析錯誤放入 `exception`；null 文字會被視為 `""`，它不是 JSON 物件，因此會失敗。

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

嘗試從剪貼簿讀取 `BasicTranslate`。文字必須能解析為 JSON 且帶有非空的 `key`，因此空白剪貼簿或不相關的 JSON 物件會被拒絕，而不會用空值覆寫資料列。

方法傳回 true 時，`basicTranslate` 是解析出的項目，否則為 null。`exception` 是解析或驗證錯誤，剪貼簿單純為空時則為 null。

```csharp
if (TranslateClipboard.TryRead(out var entry, out var error))
    Paste(entry);
else if (error != null)
    Debug.LogWarning(error.Message);
```

## GlobalLocalization

```csharp
[InitializeOnLoad]
public static class GlobalLocalization
```

載入專案中所有 `BasicLocalization` 資產、維護各 ID 的語言字典與所選語言，並刷新註冊。查詢會經過 `LocalizationHelper`；這個型別只公開它的事件與委派。

載入會延後到編輯器的第一次 tick，並在資產變更後以 250 ms 的延遲合併處理，因此在翻譯資產中輸入時，不會每按一鍵就重新掃描整個專案。`Tools > Localization > Reload Localizations` 會強制重新載入。所選語言會依 ID 儲存在 `EditorPrefs` 的 `{localizationID}_Language` 下。

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

## Unity 鍵

以 `unity:` 開頭的鍵存放的是某個 Unity 編輯器字串的英文文字，而由 Unity 透過 `L10n.Tr` 翻譯該文字，而不是由套件翻譯這個鍵。套件只負責把鍵解析成它的原始文字：

```csharp
var key = "unity:label.position";
var source = helper.S(key, out var localized) ? localized : key;
label.text = L10n.Tr(source);
```

`UILocalize` 會執行相同的步驟：先在所選語言中查詢該鍵，再到 `en-US` 查詢，把結果（或原始鍵）交給 `L10n.Tr`，工具提示也同樣處理。帶有 `unity:` 鍵的元素不會註冊即時更新，因為它們的文字跟隨的是 Unity 的編輯器語言，而不是套件所選的語言；切換 Unity 的語言需要重新啟動，標籤會在樹狀結構重建時重新解析。

請把英文文字放在 `en-US` 資產中。`unity:` 鍵在 `en-US` 中缺少，或其英文文字為空時，載入器會提出警告。資產載入後，`UILocalize` 會對每個完全解析不到的鍵警告一次，標籤則顯示原始鍵。請見 [Unity-Keys](Unity-Keys)。
