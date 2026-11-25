# 概要

Localization は VPM パッケージのエディタ UI の文言を一か所にまとめます。ラベル・ボタン・ツールチップはすべてキーになり、言語ごとに 1 つのアセットがキーとテキストを対応づけます。エディタ専用で、ワールドには何も含まれません。

## 構成

| 要素 | 説明 |
| --- | --- |
| `BasicLocalization` | 言語ごとのアセット。ファイル名が言語 ID（`en-US`、`ja-JP`）で、`displayName` が選択肢に出る名前です。 |
| `BasicTranslate` | アセット内の 1 件。キー、テキスト、任意のツールチップを持ちます。 |
| ローカライゼーション ID | 1 つのパッケージのアセットをまとめる ID（例: `io.github.ykysnk.yky-toolkit`）。全言語のアセットが同じ ID を持ちます。 |
| `LocalizationHelper` | 1 つの ID のキーを引き、言語が変わったときに UI を更新します。 |

パッケージはエディタ用アセンブリで 1 回だけ ID を宣言します。

```csharp
[assembly: LocalizationPackage("io.github.ykysnk.yky-toolkit")]
```

あとは拡張メソッドがどのアセットを読むかを自動で判断します。

```csharp
label.text = "label.my_window.title".S();
```

## 言語の選択

選択中の言語は ID ごとに `EditorPrefs` に保存されます。変更するとイベントが 1 回発生し、`UILocalize` または `UpdateRegister` で登録された要素がその場で書き換わります。ウィンドウを開き直す必要はありません。

## フォールバック

検索は次の順で探します。

1. 選択中の言語のテキスト
2. `en-US` アセットのテキスト
3. 呼び出し側が渡した既定値
4. キーそのもの

見つからなくても例外は出ないので、翻訳が途中でも英語で読めます。

## Unity の文字列

`unity:` で始まるキーはこのパッケージでは翻訳しません。Unity のエディタ文字列の英語テキストを保持し、`L10n.Tr` に渡すことで Unity がエディタ言語に翻訳します。詳しくは [Unity-Keys](Unity-Keys) を参照してください。
