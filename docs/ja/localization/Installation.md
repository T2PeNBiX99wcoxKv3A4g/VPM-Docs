# インストール

パッケージは VPM パッケージ `io.github.ykysnk.localization` として配布されています。ALCOM、VPM CLI、または
プロジェクトの VPM リストにリポジトリを追加して導入します。

依存先は `io.github.ykysnk.utils` で、VPM が自動的に解決します。

## 言語アセットの作成

1. **Assets &gt; Create &gt; Localization &gt; Basic Localization** でアセットを作成します。
2. **ローカライゼーション ID** にパッケージが使う ID（例: `io.github.ykysnk.localization`）を設定します。
3. ファイル名を言語 ID にします: `en-US`、`ja-JP`、`zh-Hant` など。
4. **表示名** に、言語選択に表示される名前（`English`、`日本語` など）を入れます。

同じパッケージの全言語が同じ ID を持ち、通常は `Editor/Localization` フォルダに他のアセットと並べて置きます。

> ファイル名が言語 ID です。アセットの名前を変えると扱う言語も変わるので、変えないでください。

## 翻訳の追加

インスペクターで翻訳リストの **+** を押し、下のフィールドを入力します。インスペクター自体がこのパッケージで翻訳されるため、
表示されるラベルは選択中の言語に従います。フィールド名は `BasicTranslate` のものです。

| フィールド      | 意味                                              |
|-----------------|---------------------------------------------------|
| `key`           | コードが引くキー（例: `label.my_window.title`）。 |
| `translate`     | この言語で表示するテキスト。                      |
| `useTooltip`    | この項目でツールチップも保存するかどうか。        |
| `tooltipSuffix` | ツールチップキーの接尾辞。既定は `:tooltip`。     |
| `tooltip`       | ツールチップのテキスト。                          |

`en-US` アセットには**すべての**キーを入れてください。他の言語のフォールバックであり、`unity:` 項目の元テキストにもなります。

## パッケージとの接続

翻訳を使うパッケージのエディタ用アセンブリで、ID を 1 回宣言します。

```csharp
using io.github.ykysnk.Localization.Editor;

[assembly: LocalizationPackage("com.example.my-package")]
```

続いて、UI をバインドする前にローカライズします。

```csharp
var tree = uxml.CloneTree();
tree.UILocalize();          // replaces keys and keeps them up to date
tree.Bind(serializedObject);
rootVisualElement.Add(tree);
```

キーは UXML の属性に書くだけなので、他に必要なものはありません。

```xml
<ui:Label text="label.my_window.title"/>
<ui:Button text="label.my_window.apply"/>
```

## インポートとエクスポート

**フォーマット変換** を開くと、アセットを JSON または PO としてアセットの隣に書き出せ、どちらも読み戻せます。インポートは
キー単位でマージし、項目を削除することはないので、翻訳ツールが出力したファイルに実行しても安全です。

```json
{
  "label.my_window.title": "My window",
  "label.my_window.title:tooltip": "Opens the window"
}
```
