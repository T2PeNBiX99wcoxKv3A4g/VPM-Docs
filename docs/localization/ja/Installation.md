# インストール

VPM パッケージ `io.github.ykysnk.localization` として配布されています。ALCOM、VPM CLI、またはプロジェクトの VPM リストにリポジトリを追加して導入します。

依存関係は `io.github.ykysnk.utils` で、VPM が自動で解決します。

## 言語アセットの作成

1. **Assets > Create > Localization > Basic Localization** でアセットを作成します。
2. **ローカライゼーション ID** にパッケージの ID（例: `io.github.ykysnk.localization`）を設定します。
3. ファイル名を言語 ID にします: `en-US`、`ja-JP`、`zh-Hant` など。
4. **表示名** に言語選択に出る名前（`English`、`日本語` など）を入れます。

同じパッケージの全言語が同じ ID を持ち、通常は `Editor/Localization` フォルダに並べます。

> ファイル名が言語 ID です。名前を変えると言語の扱いも変わるので、変えないでください。

## 翻訳の追加

インスペクターで翻訳リストの **+** を押し、次を入力します。

| フィールド | 意味 |
| --- | --- |
| 翻訳ID (`key`) | コードが引くキー（例: `label.my_window.title`）。 |
| 翻訳 (`translate`) | この言語で表示するテキスト。 |
| ツールチップを使う (`useTooltip`) | ツールチップも保存するかどうか。 |
| ツールチップの接尾辞 (`tooltipSuffix`) | ツールチップキーの接尾辞。既定は `:tooltip`。 |
| ツールチップ (`tooltip`) | ツールチップのテキスト。 |

`en-US` アセットには**すべてのキー**を入れてください。他の言語のフォールバックであり、`unity:` の元テキストにもなります。

## パッケージとの接続

翻訳を使うパッケージのエディタ用アセンブリで、ID を 1 回宣言します。

```csharp
using io.github.ykysnk.Localization.Editor;

[assembly: LocalizationPackage("io.github.ykysnk.my-package")]
```

UI はバインドの前にローカライズします。

```csharp
var tree = uxml.CloneTree();
tree.UILocalize();          // キーを置き換え、以後も追従します
tree.Bind(serializedObject);
rootVisualElement.Add(tree);
```

キーは UXML の属性にそのまま書けます。

```xml
<ui:Label text="label.my_window.title"/>
<ui:Button text="label.my_window.apply"/>
```

## インポートとエクスポート

**フォーマット変換** を開くと、JSON と PO に書き出せます。インポートはキー単位でマージし、アセット側にしかない項目は消しません。翻訳ツールと往復しても安全です。
