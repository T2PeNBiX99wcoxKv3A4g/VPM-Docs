# API

すべて `io.github.ykysnk.Localization.Editor` 名前空間にあり、エディタ専用です。

## ヘルパーの取得

ヘルパーは呼び出し側アセンブリの `[LocalizationPackage]` から解決されるため、パッケージ側で生成する必要は通常ありません。

```csharp
using io.github.ykysnk.Localization.Editor;

var helper = LocalizationHelper.For(typeof(MyEditorWindow));
```

`LocalizationHelper.For(Assembly)` と `For(Type)` は、アセンブリごとに 1 つのヘルパーをキャッシュします。属性のないアセンブリでは警告が記録され、キーがそのまま表示されます。

## 拡張メソッド

| 呼び出し | 結果 |
| --- | --- |
| `"label.my_window.title".S()` | 選択中の言語のテキスト。 |
| `"label.count".Sf(count)` | テキストを `string.Format` に通した結果。 |
| `"label.my_window.title".G()` | テキストとそのツールチップを持つ `GUIContent`。 |
| `"label.my_window.title".Tooltip()` | ツールチップのテキスト。 |
| `property.S()` / `property.G()` / `property.Tooltip()` | 同じですが、キーは `SerializedProperty` から作られます（`label.{Type}.{field}`）。 |
| `tree.UILocalize()` | ツリー内のキーを置き換え、以後も追従させます。 |
| `"label.my_window.title".Register(callback)` | 単一キーの登録。 |

`UILocalize` は `text`、`label`、`headerTitle` 属性（とツールチップ）をローカライズし、最初のフレームの**前**に実行されて、バインド処理の後にもう一度実行されます。`addLanguagePopup: false` を渡さない限り、言語選択を追加してから戻ります。

## 言語の選択

```csharp
helper.SelectedLanguage;          // "ja-JP"
helper.SetLanguage("en-US");      // switches and updates every localized element
helper.Languages;                 // ["en-US", "ja-JP", ...]
helper.LanguageNames;             // ["English", "日本語", ...]
```

## ピッカーコントロール

```csharp
var picker = helper.CreateLanguagePicker();
settingsCard.Add(picker);
```

`LanguagePicker` は独自の `PopupField` を組み立てる `VisualElement` です。ローカライゼーションアセットが再読み込みされると作り直され、他の場所での切り替えにも追従し、`language-picker` クラスでスタイルを当てられます。旧来のヘルパー `SelectLanguageElement(element, spaceHeight)` と `SelectLanguageGUI()` も残っています。

## 値の同期

```csharp
var registration = helper.UpdateRegister("label.my_window.title", (text, tooltip) =>
{
    label.text = text;
    label.tooltip = tooltip;
});

label.RegisterCallback<DetachFromPanelEvent>(_ => registration.Dispose());
```

コールバックはすぐに 1 回実行され、言語が変わったときやアセットが再読み込みされたときにも実行されます。要素が消えるときは必ずハンドルを破棄してください。登録自体は仕組み上弱参照ですが、コールバックが要素を保持します。

## データと変換

| 型 | 用途 |
| --- | --- |
| `BasicLocalization` | 1 言語のアセット。ID、表示名、項目のリスト。 |
| `BasicTranslate` | 1 項目。`key`、`translate`、`useTooltip`、`tooltip`、`tooltipSuffix`。 |
| `LocalizationConverter` | `ToJson` / `ToPo` と `TryImportJson` / `TryImportPo`。インスペクターのボタンが使います。 |
| `TranslateClipboard` | `TryRead` / `HasEntry`。コピー/貼り付けボタン用。 |

## 独自のピッカー

データを読み、切り替えはヘルパー経由で行うだけです。他に必要なものはありません。

```csharp
foreach (var index in Enumerable.Range(0, helper.Languages.Count))
{
    var id = helper.Languages[index];
    menu.AppendAction(helper.LanguageNames[index], _ => helper.SetLanguage(id));
}
```
