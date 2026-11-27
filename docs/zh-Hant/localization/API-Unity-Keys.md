# Unity 鍵

## Unity 鍵

以 `unity:` 開頭的鍵存放的是某個 Unity 編輯器字串的英文文字，而由 Unity 透過 `L10n.Tr`
翻譯該文字，而不是由套件翻譯這個鍵。套件只負責把鍵解析成它的原始文字：

```csharp
var key = "unity:label.position";
var source = helper.S(key, out var localized) ? localized : key;
label.text = L10n.Tr(source);
```

`UILocalize` 會執行相同的步驟：先在所選語言中查詢該鍵，再到 `en-US` 查詢，把結果（或原始鍵）交給 `L10n.Tr`，工具提示也同樣處理。帶有
`unity:` 鍵的元素不會註冊即時更新，因為它們的文字跟隨的是 Unity 的編輯器語言，而不是套件所選的語言；切換 Unity
的語言需要重新啟動，標籤會在樹狀結構重建時重新解析。

請把英文文字放在 `en-US` 資產中。`unity:` 鍵在 `en-US` 中缺少，或其英文文字為空時，載入器會提出警告。資產載入後，`UILocalize`
會對每個完全解析不到的鍵警告一次，標籤則顯示原始鍵。請見 [Unity-Keys](./Unity-Keys.md)。
