# 概觀

在地化功能把 VPM 套件的編輯器 UI 集中在同一處：每個標籤、按鈕和工具提示都是一個鍵，而每種語言都是一份資產，負責把這些鍵對應到文字。這個套件僅供編輯器使用，不會被帶進世界。

## 各部分的關係

| 部分 | 內容 |
| --- | --- |
| `BasicLocalization` | 每種語言一份資產。檔名就是語言 ID（`en-US`、`ja-JP`），`displayName` 則是選擇器顯示的名稱。 |
| `BasicTranslate` | 資產中的一筆項目：鍵、文字，以及可選的工具提示。 |
| 在地化 ID | 把同一個套件的資產歸在一起，例如 `io.github.ykysnk.yky-toolkit`。每份語言資產都帶著相同的 ID。 |
| `LocalizationHelper` | 依 ID 查詢鍵，並在語言變更時讓 UI 元素保持最新。 |

套件在每個編輯器程式集中宣告一次 ID：

```csharp
[assembly: LocalizationPackage("io.github.ykysnk.yky-toolkit")]
```

之後擴充方法就知道該讀取哪些資產，不需要任何額外設定：

```csharp
label.text = "label.my_window.title".S();
```

## 語言選擇

選定的語言會以 ID 為單位存放在 `EditorPrefs` 中。切換語言會觸發一個事件，所有透過 `UILocalize` 在地化、或以 `UpdateRegister` 註冊的元素都會立即改寫，不需要重新開啟任何視窗。

## 後備機制

查詢時會先找英文，再找選定的語言：

1. 選定語言中的文字，
2. `en-US` 資產中的文字，
3. 呼叫端傳入的預設值，
4. 鍵本身。

缺少項目時不會拋出任何例外，因此只翻譯了一半的套件仍然會顯示可讀的英文。

## Unity 自帶的字串

以 `unity:` 開頭的鍵不會由這個套件翻譯。它們存放的是 Unity 編輯器字串的英文原文，並會傳給 `L10n.Tr`，由 Unity 翻譯成編輯器語言。詳見 [Unity 鍵](Unity-Keys)。
