# GlobalLocalization

`io.github.ykysnk.Localization.Editor` · `[InitializeOnLoad] public static class GlobalLocalization`

プロジェクト内のすべての `BasicLocalization` アセットを読み込み、ID ごとの言語辞書と選択言語を保持し、登録を更新します。検索は [`LocalizationHelper`](./API-LocalizationHelper.md) 経由で行います。この型が公開するのはイベントと 2 つのデリゲートだけで、それ以外は internal です。

読み込みは最初のエディタティックまで遅延され、その前に構築されたインスペクターは同じローダーからオンデマンドでデータを取得します。アセットが変わったとき、または UI Toolkit のインスペクターが例外を投げたときは、250 ms の遅延で再読み込みがまとめられるため、翻訳アセットに入力するたびにプロジェクトを走査し直すことはありません。`Tools > Localization > Reload Localizations` で強制的に再読み込みできます。選択言語は ID ごとに `EditorPrefs` の `{localizationID}_Language` に保存され、既定値は `en-US` です。

各アセットはローカライゼーション ID、言語 ID としてのファイル名、表示名を提供します。同じキーでは最初に見つかった値が採用され、言語は表示名をインバリアントな比較子で並べ替えた順になります。再読み込み時には、`en-US` アセットに存在しない、またはテキストが空の `unity:` キーについて警告が出ます。`L10n.Tr` が翻訳できるのは英語のテキストだけです。再読み込み後は、イベントの発生前にすべての有効な登録が更新されます。

## OnLocalizationReload

```csharp
public static event LocalizationUpdated? OnLocalizationReload
```

アセットが読み込み直され、すべての登録が更新された後に発生します。`UILocalize` や `UpdateRegister` で最新に保たれない UI、たとえば `Languages` から独自に項目を組み立てるコントロールに使ってください。言語の変更では発生しません。

## OnLocalizationChanged

```csharp
public static event LocalizationChanged? OnLocalizationChanged
```

いずれかのローカライゼーションの選択言語が変わったときに、ローカライゼーション ID と新しい言語を伴って発生します。そのローカライゼーションの登録はイベントの発生前に更新され、再読み込みでは発生しません。

## LocalizationChanged

```csharp
public delegate void LocalizationChanged(string localizationID, string newLanguage)
```

`OnLocalizationChanged` のハンドラー型です。言語が変わったローカライゼーションと、現在選択されている言語を受け取ります。

## LocalizationUpdated

```csharp
public delegate void LocalizationUpdated()
```

`OnLocalizationReload` のハンドラー型で、引数はありません。同じ名前は `LocalizationHelper` にもあり、同じデリゲートを宣言していますが、そちらにイベントはありません。
