# Unity 鍵

以 `unity:` 開頭的鍵會借用 Unity 編輯器既有的翻譯，而不必自己提供一份。

## 解析方式

```
asset:  unity:label.position = "Position"
                 |
                 v
S("unity:label.position")          -> "Position"   (selected language, then en-US)
                 |
                 v
L10n.Tr("Position")                -> "位置"        (Unity's translation for the editor language)
                 |
                 v
Unity does not know the text       -> "Position"   (English, unchanged)
```

因此條目內容是 **Unity 已經認識的英文文字**，而不是你自己寫的翻譯。把它放在 `en-US` 資產即可；其他語言不需要它，因為查詢會先後備到英文，之後才向 Unity 詢問。

## 缺少時會怎樣

如果沒有任何資產包含這個鍵，`S()` 會傳回鍵本身，`L10n.Tr("unity:label.position")` 也無法翻譯它 - 標籤就會顯示 `unity:label.position`。套件會在下列三種情況於主控台提出警告：

| 情況 | 警告 |
| --- | --- |
| 這個鍵只存在於 `en-US` 以外的語言 | 在 `ja-JP.asset` 中宣告，但在 `en-US` 資產中缺少 |
| 完全沒有資產包含這個鍵 | 沒有條目，因此標籤顯示原始鍵 |
| `en-US` 條目的文字是空的 | `en-US` 資產中的翻譯為空 |

每個鍵只會回報一次，修正後執行 `Tools > Localization > Reload Localizations` 會重新檢查。

## 工具提示

工具提示遵循同樣的規則：`unity:label.position:tooltip` 條目存放英文工具提示，再由 Unity 翻譯。沒有這個條目時，工具提示會是空的。

## 語言切換

`unity:` 元素不會註冊即時更新：它們的文字來自編輯器語言，而不是套件選定的語言。切換套件語言不會影響它們；變更 Unity 的編輯器語言需要重新啟動，標籤會在介面樹重建時重新解析。
