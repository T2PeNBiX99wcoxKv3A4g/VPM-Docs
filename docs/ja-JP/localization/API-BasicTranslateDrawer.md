# BasicTranslateDrawer

`io.github.ykysnk.Localization.Editor` · `[CustomPropertyDrawer(typeof(BasicTranslate))] public class BasicTranslateDrawer : PropertyDrawer`

1 つの `BasicTranslate` 項目を描画する UI Toolkit のドロワーです。キー、翻訳テキスト、ツールチップの切り替えとその 2 つのフィールド、コピー/貼り付けボタンを扱います。インスペクターの翻訳リストは、各行をこのドロワーで構築します。

レイアウトは GUID `666a4a69b697dcd45bfe25da3d5636a6` の UXML アセットで、一度だけ検索してキャッシュします。`UILocalize(false)` でローカライズし、`BindProperty` でフィールドにバインドします。`useTooltip` がオフの間はツールチップの 2 つのフィールドが隠れます。バインドは `CreatePropertyGUI` の返却後に初期値を設定するため、可視状態はスケジューラーからもう一度適用します。ツールチップの切り替えは、ラベルの前にチェックボックスが来るよう入力要素を先頭へ移します。コピーは項目全体を JSON として `EditorGUIUtility.systemCopyBuffer` に書き込み、貼り付けは [`TranslateClipboard`](./API-TranslateClipboard.md) 経由で読み戻します。貼り付けはクリップボードに項目があるときだけ有効で、行の構築時とポインターが行に入ったときに確認します。

## CreatePropertyGUI

```csharp
public override VisualElement CreatePropertyGUI(SerializedProperty property)
```

1 つの翻訳項目の UI を構築します。UXML アセットを読み込めない場合は行の代わりに `BasicEditor.CreateUxmlImportErrorUI()` を返し、そのエラーボックスはパッケージの再インポートを求めます。それ以外は、`property` にバインドされたフィールド、適用済みのツールチップ可視状態、配線済みの 2 つのボタンを持つ複製ツリーを返します。貼り付けに失敗した場合は `Utils.LogWarning` で警告を記録します。
