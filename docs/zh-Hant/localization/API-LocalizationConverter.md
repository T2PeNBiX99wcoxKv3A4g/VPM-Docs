# LocalizationConverter

`io.github.ykysnk.Localization.Editor` · `public static class LocalizationConverter`

在 `BasicLocalization` 與翻譯工具使用的扁平格式之間互相轉換。每筆項目會變成 `"key" = "translate"`；使用工具提示的項目會在 `key + tooltipSuffix` 下多加一組。鍵為空的項目不會輸出。

匯入會依鍵合併且從不刪除項目：新的鍵會附加，既有的鍵則取得匯入的文字。以工具提示後綴結尾的鍵，只有在檔案或資產中存在其基礎鍵時才會被讀回為工具提示；否則它仍是一般項目，這樣 `label.basic_translate.tooltip` 這類鍵就能保持完整。匯入會先解析完整文字再寫入，因此失敗的匯入不會改動資產。

## TooltipSuffixes

```csharp
public static readonly string[] TooltipSuffixes = { BasicTranslate.DefaultTooltipSuffix, ".tooltip", "_tooltip" };
```

把鍵讀回為工具提示項目時所辨識的後綴，依此順序嘗試。第一項是 [`BasicTranslate.DefaultTooltipSuffix`](./API-BasicTranslate.md)，因此 `:tooltip` 是首選寫法。

## ToJson

```csharp
public static string ToJson(BasicLocalization localization)
```

扁平 JSON 物件：鍵對應到文字，並為每個使用工具提示的項目多加一個工具提示鍵。鍵保持 `translates` 的順序，每一組佔一行並縮排兩個空格，結尾帶一個換行。

## ToPo

```csharp
public static string ToPo(BasicLocalization localization)
```

每個鍵一組 `msgid`/`msgstr` 的 PO 檔，包含工具提示。標頭帶有 `Language: {asset name}`（資產檔名，也就是語言 ID），因為 Unity 自己的 PO 匯入器會拒絕沒有它的檔案，只留下匯入錯誤。

## TryImportJson

```csharp
public static bool TryImportJson(BasicLocalization localization, string? text, out Exception? exception)
```

把扁平 JSON 物件讀入 `localization`。失敗時傳回 false 並把解析錯誤放入 `exception`；null 文字會被視為 `""`，它不是 JSON 物件，因此會失敗。值必須是字串：數字、巢狀物件或尾端多餘的文字都會以 `FormatException` 失敗。

## TryImportPo

```csharp
public static bool TryImportPo(BasicLocalization localization, string? text, out Exception? exception)
```

把 PO 檔讀入 `localization`。失敗時傳回 false 並把解析錯誤放入 `exception`；null 文字會被視為空內容，不匯入任何東西。註解行、`msgctxt` 與 `msgid_plural` 會被忽略，多行字串會串接，複數只取第一個 `msgstr[0]`；`msgid` 為空的標頭項目會被丟棄。無法解析的行不會被略過，而會讓整次匯入失敗。
