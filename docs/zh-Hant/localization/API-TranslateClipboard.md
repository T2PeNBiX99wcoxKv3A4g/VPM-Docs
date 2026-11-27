# TranslateClipboard

`io.github.ykysnk.Localization.Editor` · `public static class TranslateClipboard`

翻譯項目的剪貼簿處理，由檢視器與資料列繪製器共用。複製的項目是 [`BasicTranslate`](./API-BasicTranslate.md) 的 JSON 形式，以 `JsonUtility` 讀回，因此按鈕可以在動到某一列之前判斷能否貼上。

## HasEntry

```csharp
public static bool HasEntry()
```

剪貼簿目前是否存有翻譯項目。答案會依剪貼簿文字快取，因此按鈕可以頻繁詢問而不必再次解析 JSON；只有文字變更時才會重新計算。

## TryRead

```csharp
public static bool TryRead([NotNullWhen(true)] out BasicTranslate? basicTranslate, out Exception? exception)
```

嘗試從剪貼簿讀取 `BasicTranslate`。文字必須能解析為 JSON 且帶有非空的 `key`，因此空白剪貼簿或不相關的 JSON 物件會被拒絕，而不會用空值覆寫資料列：`JsonUtility` 會執行欄位初始器，JSON 省略 `translate` 時它永遠是空的，所以只有鍵能區分翻譯項目與其他 JSON 物件。

方法傳回 true 時，`basicTranslate` 是解析出的項目，否則為 null。`exception` 是解析或驗證錯誤，剪貼簿單純為空時則為 null。

```csharp
if (TranslateClipboard.TryRead(out var entry, out var error))
    Paste(entry);
else if (error != null)
    Debug.LogWarning(error.Message);
```
