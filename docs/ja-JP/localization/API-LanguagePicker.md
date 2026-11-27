# LanguagePicker

`io.github.ykysnk.Localization.Editor` · `public class LanguagePicker : VisualElement`

既製の UI Toolkit 言語ピッカーです。1 つのローカライゼーション ID のすべての言語を一覧し、変更時に選択を切り替え、`language-picker` クラスを持つのでスタイルを当てられます。`LocalizationHelper.CreateLanguagePicker` で作成するか、`Languages` と `SetLanguage` から独自のコントロールを組み立ててください。

リストは表示名で並びます。ピッカーはローカライゼーションアセットが再読み込みされると自身を作り直すため、遅延した最初の読み込みより前に作ったものでも後から埋まります。他の場所での切り替えにも追従します。保存されていた言語が改名または削除されていた場合は最初の言語にフォールバックし、設定を修復します。ポップアップのラベルは `label.language` の項目とそのツールチップです。ピッカーがパネルから外れると登録は破棄されます。

コントロールは 1 つの `PopupField` を内部に持つだけの `VisualElement` で、項目はインデックスとして扱われるため、表示名が同じ 2 つの言語も区別されます。グローバルのハンドラーは `AttachToPanelEvent` で接続され、ラベルの登録とともに `DetachFromPanelEvent` で解除されます。

## Constructors

```csharp
public LanguagePicker(string localizationID)
```

1 つのローカライゼーション ID 用のピッカーを作成し、遅延された最初の読み込みがまだ実行されていなければその場でアセットを読み込みます。ヘルパーのローカライゼーション ID を渡す `LocalizationHelper.CreateLanguagePicker` の使用を推奨します。

```csharp
var picker = new LanguagePicker("io.github.ykysnk.yky-toolkit");
settingsCard.Add(picker);
```

## SelectedLanguage

```csharp
public string SelectedLanguage { get; set; }
```

現在選択されている言語 ID（例: `ja-JP`）。読み取りはローダーに委譲されるため、ローカライゼーションにアセットが読み込まれていない場合は `ArgumentException` を投げます。代入すると言語が切り替わり、`UILocalize` でローカライズされたすべての要素が更新されるとともに、変更コールバックを発生させずにポップアップが新しい項目へ移動します。
