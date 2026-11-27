# LocalizationExtensions

`io.github.ykysnk.Localization.Editor` · `public static class LocalizationExtensions`

編輯器 UI 的語法糖：`"label.some_key".S()`、`tree.UILocalize()` 等。輔助物件取自發出呼叫之程式集的 `LocalizationPackageAttribute`，因此套件只需宣告一次該屬性，不需要自己的包裝類別。

每個方法都標記了 `[MethodImpl(MethodImplOptions.NoInlining)]`，下方的簽章也如實標出：呼叫一旦被內嵌，`Assembly.GetCallingAssembly` 回報的就會是這個程式集，而不是取用者，而選擇在地化的正是這個程式集。

## S

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static string S(this string key)
[MethodImpl(MethodImplOptions.NoInlining)]
public static string S(this SerializedProperty property)
```

`key` 在呼叫端程式集之在地化中的文字，後備順序與 `LocalizationHelper.S` 相同：所選語言、英文、鍵本身，因此缺少翻譯也不會拋出例外。`SerializedProperty` 多載會以目標型別名稱與欄位名稱組成 `label.{Type}.{field}`，兩者都轉成小寫加底線的形式，因此 `MyWindow` 上的 `displayName` 欄位就是 `label.my_window.display_name`。

```csharp
label.text = "label.my_window.title".S();
```

## Sf

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static string Sf(this string key, params object?[] args)
```

把 `key` 的文字交給 `string.Format`。與引數不符的格式字串不會拋出例外，而是以 `text(arg1, arg2)` 的形式傳回。

```csharp
label.text = "label.found_count".Sf(count);
```

## G

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static GUIContent G(this string key)
[MethodImpl(MethodImplOptions.NoInlining)]
public static GUIContent G(this SerializedProperty property)
```

以 `key` 的文字、以及儲存在 `key + ":tooltip"` 的項目作為工具提示的 `GUIContent`，沒有工具提示時為空；`SerializedProperty` 多載使用由該屬性推導出的鍵。`GUIContent` 依在地化 ID 與鍵各快取一個，每次呼叫都會重寫，因此僅切換語言不會更新它，下一次 `G` 呼叫才會刷新。

```csharp
GUILayout.Label("label.my_window.title".G());
```

## Tooltip

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static string Tooltip(this string key)
[MethodImpl(MethodImplOptions.NoInlining)]
public static string Tooltip(this SerializedProperty property)
```

`key` 的工具提示，也就是以 `:tooltip` 後綴儲存的項目。項目不存在時會走與 `S` 相同的後備，因此 `Tooltip("label.foo")` 在沒有任何內容時傳回 `label.foo:tooltip`；`SerializedProperty` 多載查詢推導出的鍵，不存在時傳回空字串。

## UILocalize

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static void UILocalize(this VisualElement element, bool addLanguagePopup = true, int spaceHeight = 8)
```

把 `element` 樹狀結構中的鍵替換成對應翻譯並保持最新。請在繫結樹狀結構之前呼叫：樹狀結構會立即在地化，因此鍵不會出現在畫面上；繫結可能把鍵寫回去，所以繫結之後會再執行一次。設定 `addLanguagePopup` 時，語言選擇器會附加在 `spaceHeight` 的間隔下方；元素離開面板時註冊會被處置。它讀取的屬性、略過的元素與第二輪處理請見 [`LocalizationHelper`](./API-LocalizationHelper.md)。

```csharp
root.UILocalize();
```

## Register

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static UpdateHelper Register(this string localizeKey, UpdateHelper.Callback callback)
[MethodImpl(MethodImplOptions.NoInlining)]
public static UpdateHelper Register(this SerializedProperty property, UpdateHelper.Callback callback)
```

為 `localizeKey` 註冊 `callback`，並傳回用來取消註冊的控制代碼。回呼會收到標籤與 `:tooltip` 文字，在下次語言切換或重新載入時執行，而不是在 `Register` 中執行。它所更新的元素消失時請處置控制代碼；`SerializedProperty` 多載註冊由該屬性推導出的鍵。
