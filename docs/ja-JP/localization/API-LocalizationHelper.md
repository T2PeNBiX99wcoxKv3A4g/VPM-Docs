# LocalizationHelper

`io.github.ykysnk.Localization.Editor` · `public class LocalizationHelper`

1 つのローカライゼーション ID のキーを引き、言語やデータが変わったときに UI 要素を最新の状態に保ちます。`For` で取得し、ID はアセンブリ属性から読み取られます。

ヘルパーが保持するのは ID だけで、参照も登録も [`GlobalLocalization`](./API-GlobalLocalization.md) のローダーに委譲されます。同じ ID の 2 つのヘルパーは同じデータと同じ選択言語を参照します。

## Constructors

```csharp
public LocalizationHelper(string localizationID)
```

1 つのローカライゼーション ID 用のヘルパーを作成します。`LocalizationPackageAttribute` から ID を読む `For(Assembly)` または `For(Type)` の使用を推奨します。手動で作成したヘルパーはアセンブリごとにキャッシュされず、ID が読み込まれない場合の警告も出ません。

## SelectedLanguage

```csharp
public string SelectedLanguage { get; set; }
```

現在選択されている言語 ID（例: `ja-JP`）。値は `EditorPrefs` の `{localizationID}_Language` に保存され、既定値は `en-US` です。

代入すると言語が切り替わり、`UILocalize` または `UpdateRegister` でローカライズされたすべての要素が書き換わったあと、`OnLocalizationChanged` が発生します。ID にアセットが読み込まれていない場合、getter は `ArgumentException` を投げます。言語が `Languages` にない場合、setter も例外を投げます。

```csharp
helper.SelectedLanguage = "ja-JP";
```

## Languages

```csharp
public IReadOnlyList<string> Languages { get; }
```

このローカライゼーションの言語 ID を表示順に並べたもの。ID は `BasicLocalization` アセットのファイル名（`en-US`、`ja-JP`）です。リストは表示名をインバリアントな比較子で並べ替えたもので、アセットが読み込まれるまでは空です。

## LanguageNames

```csharp
public IReadOnlyList<string> LanguageNames { get; }
```

`Languages` と同じ順序で対応する表示名。

```csharp
var ids = helper.Languages;
for (var i = 0; i < ids.Count; i++)
{
    var id = ids[i];
    menu.AppendAction(helper.LanguageNames[i], _ => helper.SetLanguage(id));
}
```

## OnLocalizationChanged

```csharp
public event LocalizationChanged? OnLocalizationChanged
```

このローカライゼーションの選択言語が変わったときに、新しい言語を伴って発生します。ヘルパーは最初のハンドラーが付いたときに `GlobalLocalization.OnLocalizationChanged` を購読し、最後のハンドラーで解除するため、参照だけに使うヘルパーはリスナーを増やしません。

## LocalizationChanged

```csharp
public delegate void LocalizationChanged(string newLanguage)
```

`OnLocalizationChanged` のハンドラー型です。ローカライゼーション ID を伴わず、選択されたばかりの言語を受け取ります。

## LocalizationUpdated

```csharp
public delegate void LocalizationUpdated()
```

`LocalizationChanged` と並んで宣言される引数なしのデリゲート型です。`LocalizationHelper` はこの型のイベントを公開しません。再読み込みの通知は `GlobalLocalization.OnLocalizationReload` から来ます。

## For

```csharp
public static LocalizationHelper For(Assembly assembly)
public static LocalizationHelper For(Type type)
```

`For(assembly)` は `assembly` の `LocalizationPackageAttribute` が宣言するヘルパーを返し、アセンブリごとに 1 つキャッシュされます。属性がないアセンブリは警告を記録し、共有の未バインドヘルパーを受け取ります。このヘルパーは ID が空のため、すべてのキーをそのまま表示します。`For(type)` は `For(type.Assembly)` で、`type` を含むアセンブリのヘルパーです。

```csharp
var helper = LocalizationHelper.For(typeof(MyWindow));
```

## SetLanguage

```csharp
public void SetLanguage(string language)
```

`SelectedLanguage` への代入と同じです。

## CreateLanguagePicker

```csharp
public LanguagePicker CreateLanguagePicker()
```

このローカライゼーション用の新しい `LanguagePicker`。ツリーに追加できる状態です。接続後の動作は [`LanguagePicker`](./API-LanguagePicker.md) を参照してください。

```csharp
settingsCard.Add(helper.CreateLanguagePicker());
```

## SelectLanguageGUI

```csharp
public void SelectLanguageGUI()
```

`EditorGUILayout.Popup` で IMGUI の言語選択を描画します。ラベルは `label.language` とそのツールチップです。保存されている言語が一覧にない場合は先頭の項目が選ばれ、変更は `SetLanguage` と同じ経路で適用されます。

## SelectLanguageElement

```csharp
public void SelectLanguageElement(VisualElement element, int spaceHeight = 8)
```

`element` に `spaceHeight` の隙間と UI Toolkit の言語ポップアップを追加します。遅延された最初の読み込みがまだ実行されていない場合はその場でアセットを読み込み、保存されている言語が存在しない場合は最初の言語にフォールバックして、変更イベントを発生させずに設定を修復します。ポップアップがパネルから外れるとラベルの登録は破棄されます。

コントロールの配置やスタイルを指定する場合は `CreateLanguagePicker` を使ってください。

## UpdateRegister

```csharp
public UpdateHelper UpdateRegister(string localizeKey, UpdateHelper.Callback callback)
public UpdateHelper UpdateRegister(SerializedProperty property, UpdateHelper.Callback callback)
```

`localizeKey` に `callback` を登録します。コールバックはキーのラベルと `:tooltip` テキストを受け取り、言語が変わったときやアセットが再読み込みされたときに実行されます。`SerializedProperty` のオーバーロードはプロパティから導出したキーを使います。更新対象の要素が消えるときはハンドルを破棄してください。詳細は [`UpdateHelper`](./API-UpdateHelper.md) を参照してください。

```csharp
var registration = helper.UpdateRegister("label.my_window.title", (text, tooltip) =>
{
    title.text = text;
    title.tooltip = tooltip;
});

title.RegisterCallback<DetachFromPanelEvent>(_ => registration.Dispose());
```

## GetLanguageLocalization

```csharp
public Dictionary<string, string> GetLanguageLocalization(string language)
```

1 つの言語のすべてのキーとテキストのスナップショットを、新しい辞書として返します。ローカライゼーション ID または言語が不明な場合は `ArgumentException` を投げます。

## S

```csharp
public string S(string key, string? defaultValue = null)
public bool S(string key, out string? localizationString)
public string S(SerializedProperty property)
```

`S(key, defaultValue)` は選択中の言語での `key` のテキストを返します。`en-US` のテキスト、次に `defaultValue`、最後にキー自体へフォールバックするため、翻訳が欠けても例外は発生しません。選択中の言語のテキストが空の場合も英語へフォールバックします。

`S(key, out localizationString)` は選択中の言語、次に `en-US` でキーを引き、キー自体へはフォールバックしません。どちらにも項目がない場合は false を返し、`localizationString` は null のままです。`unity:` キーとリテラル文字列はこれで区別されます。

`S(property)` はプロパティから導出したキー `label.{Type}.{field}` を使います。`Type` は `property.serializedObject.targetObject` の型名で、両方の部分が同じ規則で変換されます（`UIText` は `ui_text`、`HPBar` は `hp_bar`、`localizationID` は `localization_id`、記号と句読点は `_`）。したがって `MyWindow` の `displayName` フィールドは `label.my_window.display_name` です。

```csharp
label.text = helper.S("label.my_window.title");
```

## Sf

```csharp
public string Sf(string key, params object?[] args)
```

`S(key)` を `string.Format` に通した結果。引数に合わない書式文字列は例外を投げずに `text(arg1, arg2)` として返されます。

```csharp
var text = helper.Sf("label.found_count", 3);   // "3 assets found"
```

## G

```csharp
public GUIContent G(string key)
public GUIContent G(string key, Texture? image)
public GUIContent G(string key, Texture? image, string? tooltip)
public GUIContent G(SerializedProperty property)
```

`G(key)` は `key` のテキストと、その `:tooltip` 項目をツールチップに持つ `GUIContent` です。`image` を取るオーバーロードはアイコンを追加し、3 引数のオーバーロードはツールチップをキー `tooltip` から読み（その項目がなければ空）、`G(property)` は導出した `label.{Type}.{field}` キーを使います。

```csharp
GUILayout.Button(helper.G("label.browse", icon), GUILayout.Width(80));
```

`GUIContent` はローカライゼーション ID とキーの組ごとに 1 つキャッシュされ、呼び出しのたびに書き換えられます。そのため言語を変えただけでは更新されず、次に `G` を呼んだときに更新されます。

## Tooltip

```csharp
public string Tooltip(string key, string? defaultValue = null)
public bool Tooltip(string key, out string? tooltip)
public string Tooltip(SerializedProperty property)
```

`key` のツールチップ、つまり `:tooltip` 接尾辞付きで保存された項目。`defaultValue` は `S(string, string?)` と同じように働くため、項目も既定値もない場合は `{key}:tooltip` が返されます。

`out` を取るオーバーロードはフォールバックをせず、項目が存在しない場合は false を返します。`Tooltip(property)` はその場合に空文字列を返します。

## UILocalize

```csharp
public void UILocalize(VisualElement elem, bool addLanguagePopup = true, int spaceHeight = 8)
```

`elem` のツリー内のキーを翻訳で置き換え、最新の状態に保ちます。各要素では `text`、`label`、`headerTitle` のうち setter を持つ最初のものをキーとして読み、翻訳して書き戻します。ツールチップはキーの `:tooltip` 項目から埋めます。`unity:` 接頭辞を持つキーは `L10n.Tr` が翻訳する英語のテキストを保持しているため、まず解決してから `L10n.Tr` に渡します。このラベルは 1 回だけ翻訳され、登録はされません。項目がないキーは警告を 1 回記録し、生のキーのまま残ります。

ツリーは即座にローカライズされるため、キーが画面に出ることはありません。さらに次のスケジューラーティックでもう一度実行されます。`UILocalize` の後に走るバインドがキーを戻す可能性があるためです。登録を行うのは最初のパスだけなので、既知のキーでないテキストを持つ要素はそのまま残り、2 回目のパスは 1 回目が登録したものだけを書き換えます。要素がパネルから外れると登録は破棄されます。`addLanguagePopup` を指定すると、`spaceHeight` の隙間の下に言語選択が追加されます。

スキップされるもの: `unity-text-input` または `unity-content` という名前の子（そのサブツリーごと）、`localize-skip` クラスを持つサブツリー、`unity-base-field__inspector-field` または `unity-object-field-display__label` を持つ要素です。最後の 2 つはその要素だけがスキップされ、子は引き続き処理されます。`localize-tooltip` クラスを持つ要素には、ラベルのキーからツールチップは設定されません。既存の `tooltip` がキーとして扱われ、それ自体がローカライズされ、独自に登録されます。

```csharp
var root = uxml.CloneTree();
helper.UILocalize(root);
```
