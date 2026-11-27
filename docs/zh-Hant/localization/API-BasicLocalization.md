# BasicLocalization

`io.github.ykysnk.Localization` · `[CreateAssetMenu(fileName = "en-US", menuName = "Localization/Basic Localization")] public class BasicLocalization : ScriptableObject`

一個在地化集合：某一語言僅供編輯器使用的翻譯。資產的檔名就是 `Languages` 與 `SetLanguage` 使用的語言 ID，`localizationID` 則把屬於同一個套件的資產歸為一組。

編輯器會載入專案中所有這型別的資產，因此翻譯只要放在專案中的任何位置即可。`localizationID` 為空的資產會被略過並記錄警告，不計為一種語言；沒有鍵的項目會逐筆略過。新資產會以 `en-US` 的名稱在 `Assets > Create > Localization > Basic Localization` 下建立。

## LocalizationFileUpdated

```csharp
public delegate void LocalizationFileUpdated(string localizationID, string localizationName)
```

接收發生變更之資產的在地化 ID 與資產名稱。它是 [`OnLocalizationFileUpdated`](#onlocalizationfileupdated) 的型別，會把這兩個值傳給每個訂閱者。

## localizationID

```csharp
public string localizationID = "";
```

同一個在地化所有語言共用的群組 ID。ID 為空的資產在載入時會被略過並記錄警告，因此永遠不會出現在語言選擇器中。

## displayName

```csharp
public string displayName = "English";
```

語言選擇器中顯示的名稱。欄位為空時 `OnValidate` 會還原為 `English`，因此選擇器不會留下空白項目。

## translates

```csharp
public List<BasicTranslate> translates = new();
```

這個語言的所有翻譯，順序與檢視器中的清單一致。新資產會從 `label.language` 項目開始，語言選擇器需要這個項目。

## jsonFile

```csharp
public Object? jsonFile;
```

由檢視器的 `Export JSON` 寫出的附屬 JSON 檔。欄位型別是 `UnityEngine.Object`，但檢視器只接受 `TextAsset`；匯出會把檔案寫在資產旁、匯入它，然後指派到這裡。

## poFile

```csharp
public Object? poFile;
```

由檢視器的 `Export PO` 寫出的附屬 PO 檔。檢視器只接受 Unity 的 `LocalizationAsset`；匯出會把檔案寫在資產旁、匯入它，然後指派到這裡。

## OnValidate

```csharp
protected virtual void OnValidate()
```

在資產被載入或在檢視器中變更時執行的 Unity 回呼。`displayName` 為空時會以 `English` 填入，並帶著 `localizationID` 與資產名稱觸發 `OnLocalizationFileUpdated`；編輯器就是透過它得知需要重新載入翻譯。覆寫時請呼叫基底實作，否則這兩個步驟都不會執行。

## OnLocalizationFileUpdated

```csharp
public static event LocalizationFileUpdated? OnLocalizationFileUpdated;
```

任何這型別的資產變更後由 `OnValidate` 觸發，附上該資產的在地化 ID 與名稱。事件是 static 的，因此一個處理常式會收到所有資產的變更；`GlobalLocalization` 訂閱它來排程重新載入。
