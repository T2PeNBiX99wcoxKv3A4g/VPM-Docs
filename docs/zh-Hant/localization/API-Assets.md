# 資產

## BasicLocalization

```csharp
[CreateAssetMenu(fileName = "en-US", menuName = "Localization/Basic Localization")]
public class BasicLocalization : ScriptableObject
```

一個在地化集合：某一語言的翻譯。資產的檔名就是 `Languages` 與 `SetLanguage` 使用的語言 ID；`localizationID` 則把同一個套件的語言歸為一組。
`jsonFile` 與 `poFile` 可選擇指向檢視器寫出的附屬檔案，讓同一份文字也能用外部工具編輯。

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

附加到 `key` 以發佈工具提示的後綴，例如 `label.language:tooltip`。除非有外掛預期其他拼法（例如 `.tooltip`
），否則請保持預設值；對這類項目，載入器仍會讓 `:tooltip` 可以被解析。
