# BasicLocalizationEditor

`io.github.ykysnk.Localization.Editor` · `[CustomEditor(typeof(BasicLocalization))] [CanEditMultipleObjects] public class BasicLocalizationEditor : BasicEditor`

`BasicLocalization` アセットのインスペクターです。アセットの設定、フォーマット変換ツール、翻訳項目のリストを扱います。UI Toolkit のインスペクターで、[`BasicEditor`](../utils/API-BasicEditor.md) を継承しているため、ツリーの構築中に投げられた例外はそのクラスのエラー UI に置き換えられます。

ツリーは、エディターの `[SerializeField]` である `uxml` フィールドに設定された UXML アセットです。`UILocalize(false)` でローカライズしますが、この引数により言語ピッカーは末尾に追加されないため、インスペクター自身が設定カードの `languageSlot` 要素に追加します。その後シリアライズオブジェクトにバインドします。`jsonFile` は `TextAsset` だけ、`poFile` は `LocalizationAsset` だけを受け付け、これは 2 つのサイドカー形式に対応しています。

`translates` リストはアセットから埋められ、各行は [`BasicTranslateDrawer`](./API-BasicTranslateDrawer.md) で構築されます。検索フィールドは最後のキー入力から 150 ms 後にキー、翻訳、ツールチップで絞り込みます。絞り込み中は表示順が配列のインデックスに対応しないため、ドラッグでの並べ替えは無効になります。選択して右クリックするとコピー、貼り付け、削除ができ、貼り付けは [`TranslateClipboard`](./API-TranslateClipboard.md) に項目があるときだけ有効です。追加ボタンは空の項目を末尾に加え、新しい行が見えるように絞り込みを解除してその行までスクロールします。削除ボタンは何かが選択されているときだけ有効になり、項目数のラベルは合計、絞り込み中は `visible/total` を表示します。

フォーマット変換のフォールドは開閉状態を `EditorPrefs` の `io.github.ykysnk.Localization.BasicLocalizationEditor.convert` に記憶します。JSON のエクスポートと PO のエクスポートはアセットと同じ名前のサイドカーを書き出し、対応するフィールドに割り当ててパスをログに残します。インポートは割り当てられたファイルを読み、キー単位でマージします。ファイルが未割り当ての場合はアセットの隣のパスを使います。`…` ボタンは参照がプロジェクト内しか指せないため、選択したファイルをまずアセットの隣にコピーします。

## CreateErrorHandleInspectorGUI

```csharp
protected override VisualElement? CreateErrorHandleInspectorGUI()
```

インスペクター全体を構築して返します。上で説明した内容はすべてここで配線されます。複製したツリー、ローカライズの呼び出し、バインド、言語ピッカー、2 つのファイル種別、リストのコールバック、各ボタンです。リストの高さは、ツリーがパネルに追加された後に合わせます。囲んでいる `ScrollView` のビューポートとツリーの位置からツリーの下に残る領域を求め、その分だけリストを伸ばします。140 ピクセルを下回ることはないため、カスタム GUI はウィンドウの残りを空けたままにせず、その領域を埋めます。
