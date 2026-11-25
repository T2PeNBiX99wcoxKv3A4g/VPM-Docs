# Unity のキー

`unity:` で始まるキーは、独自の翻訳を持たずに Unity エディタの既存の翻訳を借ります。

## 解決の流れ

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

つまり項目に入れるのは**Unity がすでに知っている英語テキスト**であり、自分で用意した翻訳ではありません。`en-US` アセットに置いてください。検索は Unity に問い合わせる前に英語へフォールバックするため、他の言語には不要です。

## 見つからない場合

どのアセットにもキーがない場合、`S()` はキーそのものを返し、`L10n.Tr("unity:label.position")` もそれを翻訳できないため、ラベルには `unity:label.position` が表示されます。パッケージは次の 3 つの場合にコンソールへ警告を出します。

| 状況 | 警告 |
| --- | --- |
| キーが `en-US` 以外の言語にしかない | `ja-JP.asset` で宣言されているが `en-US` アセットにない |
| どのアセットにもキーがない | 項目がないためラベルに生のキーが表示される |
| `en-US` の項目のテキストが空 | `en-US` アセットの翻訳が空 |

各キーは 1 回だけ報告され、修正後に `Tools > Localization > Reload Localizations` を実行すると再確認されます。

## ツールチップ

ツールチップも同じ規則です。`unity:label.position:tooltip` の項目に英語のツールチップを入れ、Unity がそれを翻訳します。この項目がないとツールチップは空になります。

## 言語の切り替え

`unity:` の要素はリアルタイム更新の対象に登録されません。テキストはパッケージの選択言語ではなくエディタ言語から来るためです。パッケージの言語を変えても影響を受けず、Unity のエディタ言語を変えるには再起動が必要で、ツリーが再構築されたときにラベルが再解決されます。
