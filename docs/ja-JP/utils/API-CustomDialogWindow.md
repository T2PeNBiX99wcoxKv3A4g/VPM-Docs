# CustomDialogWindow

`io.github.ykysnk.utils.Editor` · `public class CustomDialogWindow : EditorWindow`

独自の本体、Ok ボタン、任意の Cancel ボタンを持つフローティングのユーティリティウィンドウで、[`EditorUtils`](./API-EditorUtils.md) が使います。モーダルではなく、ウィンドウは結果をコールバックで通知して自分で閉じ、テキストはコンテキストメニューからコピーできます。

ウィンドウは本体の [`Size`](./API-DialogContent.md) に合わせた大きさで、メインのエディターウィンドウの中央に `ShowUtility` で表示されます。ダイアログが開いたまま別のダイアログを開くと、古い方は先に閉じられ、その保留中の結果はキャンセルとして通知されます。ボタンを押さずにウィンドウを閉じた場合もキャンセルです。`waitTime` が設定されていると Ok の表示が 1 秒ごとにカウントダウンし、0 になるまでボタンは無効のままなので、長いメッセージを読まずに閉じることはできません。`CopyText` が空でない本体には、コンテキストメニューに `Copy` の項目が追加されます。

このクラスが宣言するメンバーはすべて private か internal なので、ダイアログは `EditorUtils.DisplayDialog` または `EditorUtils.DisplayDialogAsync` から作成し、引数はそのまま渡されます。
