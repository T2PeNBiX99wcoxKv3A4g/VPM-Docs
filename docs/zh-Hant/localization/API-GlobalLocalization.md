# GlobalLocalization

`io.github.ykysnk.Localization.Editor` · `[InitializeOnLoad] public static class GlobalLocalization`

載入專案中所有 `BasicLocalization` 資產、維護各 ID 的語言字典與所選語言，並刷新註冊。查詢會經過 [`LocalizationHelper`](./API-LocalizationHelper.md)；這個型別只公開它的事件與兩個委派，其餘成員都是 internal。

載入會延後到編輯器的第一次 tick，在該 tick 之前建立的檢視器會透過同一個載入器按需取得資料。資產變更後，或 UI Toolkit 檢視器擲出例外後，重新載入會以 250 ms 的延遲合併處理，因此在翻譯資產中輸入時，不會每按一鍵就重新掃描整個專案。`Tools > Localization > Reload Localizations` 會強制重新載入。所選語言會依 ID 儲存在 `EditorPrefs` 的 `{localizationID}_Language` 下，預設為 `en-US`。

每個資產提供自己的在地化 ID、作為語言 ID 的檔名與顯示名稱；同一個鍵以最先讀到的值為準，語言則依顯示名稱以不變文化比較子排序。重新載入時，會針對 `en-US` 資產中缺少、或文字為空的 `unity:` 鍵發出警告，因為 `L10n.Tr` 只能翻譯英文文字。重新載入完成後，會先刷新所有仍有效的註冊，再觸發事件。

## OnLocalizationReload

```csharp
public static event LocalizationUpdated? OnLocalizationReload
```

在資產重新載入、且每個註冊都已刷新之後觸發。適合用於無法由 `UILocalize` 或 `UpdateRegister` 保持最新的 UI，例如從 `Languages` 自行組出項目的控制項。語言變更不會觸發它。

## OnLocalizationChanged

```csharp
public static event LocalizationChanged? OnLocalizationChanged
```

某個在地化的所選語言變更時觸發，附上在地化 ID 與新語言。該在地化的註冊會在事件觸發前刷新。重新載入不會觸發它。

## LocalizationChanged

```csharp
public delegate void LocalizationChanged(string localizationID, string newLanguage)
```

`OnLocalizationChanged` 的處理常式型別：語言變更的在地化，以及目前選取的語言。

## LocalizationUpdated

```csharp
public delegate void LocalizationUpdated()
```

`OnLocalizationReload` 的處理常式型別，不帶引數。`LocalizationHelper` 上也有同名的委派，但那邊沒有對應的事件。
