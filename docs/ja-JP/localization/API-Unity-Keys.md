# Unity のキー

## Unity キー

`unity:` で始まるキーは Unity エディタ文字列の英語テキストを保持し、パッケージがキーを翻訳する代わりに Unity が `L10n.Tr`
で
そのテキストを翻訳します。パッケージはキーを元のテキストに解決するだけです:

```csharp
var key = "unity:label.position";
var source = helper.S(key, out var localized) ? localized : key;
label.text = L10n.Tr(source);
```

`UILocalize` も同じ手順を行います。選択中の言語でキーを引き、次に `en-US` で引き、結果（または生のキー）を `L10n.Tr` に渡し、
ツールチップも同様に扱います。`unity:` キーを持つ要素はライブ更新に登録されません。そのテキストはパッケージの選択言語ではなく
Unity のエディタ言語に従うためです。Unity の言語の変更には再起動が必要で、ラベルはツリーが再構築されるときに改めて解決されます。

英語のテキストは `en-US` アセットに入れてください。`unity:` キーが `en-US` にない場合、またはその英語テキストが空の場合、ローダーは
警告を出します。アセットの読み込み後、どこにも解決できないキーについて `UILocalize` はキーごとに 1 回警告を出し、ラベルには生の
キーが表示されます。[Unity-Keys](./Unity-Keys.md) を参照してください。
