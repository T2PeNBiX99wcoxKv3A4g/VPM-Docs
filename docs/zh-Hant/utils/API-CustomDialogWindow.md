# CustomDialogWindow

`io.github.ykysnk.utils.Editor` · `public class CustomDialogWindow : EditorWindow`

帶自訂主體、Ok 按鈕和選用 Cancel 按鈕的浮動工具視窗，由 [`EditorUtils`](./API-EditorUtils.md) 使用。它不是模態的：視窗透過回呼回報結果並自行關閉，文字可以從內容選單複製。

視窗大小取自主體的 [`Size`](./API-DialogContent.md)，置中顯示在主編輯器視窗上，並以 `ShowUtility` 開啟。已有對話框開啟時再開啟新的，會先關閉舊的，其擱置的結果按取消回報；未按按鈕就關閉視窗同樣算作取消。設定 `waitTime` 後，Ok 的標題每秒倒數，按鈕在倒數歸零前保持停用，因此較長的訊息無法在未讀的情況下關閉。`CopyText` 不為空的主體會在內容選單中多出 `Copy` 項目。

此類別宣告的所有成員都是 private 或 internal，因此對話框透過 `EditorUtils.DisplayDialog` 或 `EditorUtils.DisplayDialogAsync` 建立，參數會被原樣傳入。
