# BasicTranslate

`io.github.ykysnk.Localization` · `[Serializable] public class BasicTranslate`

一筆翻譯項目：鍵、文字與選用的工具提示。項目會序列化在 [`BasicLocalization`](./API-BasicLocalization.md) 資產的 `translates` 中，因此是在檢視器中編輯，而不是獨立資產。

工具提示是選擇性的。`useTooltip` 為 false 時，`tooltip` 中的文字仍留在資產中，但不會被載入或顯示；`tooltipSuffix` 選擇工具提示項目所用的鍵後綴（預設 `:tooltip`，與本專案的其他套件一致）。

## DefaultTooltipSuffix

```csharp
public const string DefaultTooltipSuffix = ":tooltip";
```

附加到 `key` 的後綴，除非項目另有覆寫。它既是 `tooltipSuffix` 的初始值，也是 `LocalizationConverter.TooltipSuffixes` 的第一項。

## key

```csharp
public string key = "";
```

識別這筆翻譯的鍵，例如 `label.language`。鍵為空的項目會被載入器略過並記錄警告，因此沒有鍵的項目不會到達 UI。

## translate

```csharp
public string translate = "";
```

`key` 的翻譯文字。所選語言中為空時，會後備到同一個鍵的英文文字。

## tooltip

```csharp
public string tooltip = "";
```

工具提示文字，僅在 `useTooltip` 為 true 時使用。`useTooltip` 關閉時它只留在資產中，不會被載入或顯示。

## useTooltip

```csharp
public bool useTooltip;
```

工具提示是否參與載入與編輯器 UI。預設為關閉，因此新項目在啟用之前不會發佈工具提示。

## tooltipSuffix

```csharp
public string tooltipSuffix = DefaultTooltipSuffix;
```

附加到 `key` 以發佈工具提示的後綴，例如 `label.language:tooltip`。除非有外掛預期其他拼法（例如 `.tooltip`），否則請保持 `DefaultTooltipSuffix`；對這類項目，載入器仍會讓 `:tooltip` 可以被解析，因此不論哪種寫法 `Tooltip(key)` 都能運作。
