# 参照と更新

## LocalizationHelper

```csharp
public class LocalizationHelper
```

1 つのローカライゼーション ID のキーを引き、言語やデータが変わったときに UI 要素を最新の状態に保ちます。`For` で取得します。
ID はアセンブリ属性から読み取られます。

### LocalizationHelper(string localizationID)

```csharp
public LocalizationHelper(string localizationID)
```

1 つのローカライゼーション ID 用のヘルパーを作成します。`LocalizationPackageAttribute` から ID を読む `For(Assembly)` または
`For(Type)` の使用を推奨します。

### For(Assembly)

```csharp
public static LocalizationHelper For(Assembly assembly)
```

`assembly` の `LocalizationPackageAttribute` が宣言するヘルパー。アセンブリごとに 1 つキャッシュされます。属性がない場合は警告を
記録し、共有の未バインドヘルパーを返します。

### For(Type)

```csharp
public static LocalizationHelper For(Type type)
```

`For(type.Assembly)`。`type` を含むアセンブリのヘルパーです。

### SelectedLanguage

```csharp
public string SelectedLanguage { get; set; }
```

現在選択されている言語 ID（例: `ja-JP`）。値は `EditorPrefs` の `{localizationID}_Language` に保存され、既定値は `en-US` です。

代入すると言語が切り替わり、`UILocalize` または `UpdateRegister` でローカライズされたすべての要素が書き換わります。ID に
アセットが読み込まれていない場合、getter は `ArgumentException` を投げます。言語が `Languages` にない場合、setter も例外を投げます。

```csharp
helper.SelectedLanguage = "ja-JP";
```

### SetLanguage(string)

```csharp
public void SetLanguage(string language)
```

`SelectedLanguage` への代入と同じです。

### Languages

```csharp
public IReadOnlyList<string> Languages { get; }
```

このローカライゼーションの言語 ID を表示順に並べたもの。ID は `BasicLocalization` アセットのファイル名（`en-US`、`ja-JP`
）です。
リストは表示名で並べ替えられ、アセットが読み込まれるまでは空です。

### LanguageNames

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

### S(string, string?)

```csharp
public string S(string key, string? defaultValue = null)
```

選択中の言語での `key` のテキスト。`en-US` のテキスト、次に `defaultValue`、最後にキー自体へフォールバックするため、翻訳が
欠けても例外は発生しません。選択中の言語のテキストが空の場合も英語へフォールバックします。

```csharp
label.text = helper.S("label.my_window.title");
```

### S(string, out string?)

```csharp
public bool S(string key, out string? localizationString)
```

キー自体へのフォールバックなしで `key` を引きます。どの言語にもテキストがない場合は false を返し、その場合
`localizationString` は null です。

```csharp
if (helper.S("unity:label.position", out var text))
    label.text = L10n.Tr(text!);
```

### S(SerializedProperty)

```csharp
public string S(SerializedProperty property)
```

`property` から導出したキーのテキスト: `label.{Type}.{field}`。
[SerializedProperty からのキー](#keys-from-a-serializedproperty) を参照してください。

### Sf(string, params object?[])

```csharp
public string Sf(string key, params object?[] args)
```

`S(key)` を `string.Format` に通した結果。引数に合わない書式文字列は例外を投げずに `text(arg1, arg2)` として返されます。

```csharp
var text = helper.Sf("label.found_count", 3);   // "3 assets found"
```

### G(string)

```csharp
public GUIContent G(string key)
```

`key` のテキストと、その `:tooltip` 項目をツールチップに持つ `GUIContent`。

### G(string, Texture?)

```csharp
public GUIContent G(string key, Texture? image)
```

`G(string)` と同じで、アイコンに `image` を使います。

### G(string, Texture?, string?)

```csharp
public GUIContent G(string key, Texture? image, string? tooltip)
```

`key` のテキスト、アイコン `image`、キー `tooltip` に保存されたテキスト。

```csharp
GUILayout.Button(helper.G("label.browse", icon), GUILayout.Width(80));
```

`GUIContent` はローカライゼーション ID とキーの組ごとに 1 つキャッシュされ、呼び出しのたびに書き換えられます。そのため言語を
変えただけでは更新されず、次に `G` を呼んだときに更新されます。

### G(SerializedProperty)

```csharp
public GUIContent G(SerializedProperty property)
```

`property` から導出したキーの `GUIContent`。

### Tooltip(string, string?)

```csharp
public string Tooltip(string key, string? defaultValue = null)
```

`key` のツールチップ、つまり `:tooltip` 接尾辞付きで保存された項目。`defaultValue` は `S(string, string?)` と同じように働くため、
項目も既定値もない場合は `{key}:tooltip` が返されます。

### Tooltip(string, out string?)

```csharp
public bool Tooltip(string key, out string? tooltip)
```

フォールバックなしのツールチップ検索。ツールチップ項目が存在しない場合は false。

### Tooltip(SerializedProperty)

```csharp
public string Tooltip(SerializedProperty property)
```

`property` から導出したキーのツールチップ。存在しない場合は空。

### UpdateRegister(string, UpdateHelper.Callback)

```csharp
public UpdateHelper UpdateRegister(string localizeKey, UpdateHelper.Callback callback)
```

`localizeKey` に `callback` を登録します。コールバックはキーのラベルと `:tooltip` テキストを受け取り、言語が変わったときや
アセットが再読み込みされたときに実行されます。更新対象の要素が消えるときはハンドルを破棄してください。

```csharp
var registration = helper.UpdateRegister("label.my_window.title", (text, tooltip) =>
{
    title.text = text;
    title.tooltip = tooltip;
});

title.RegisterCallback<DetachFromPanelEvent>(_ => registration.Dispose());
```

### UpdateRegister(SerializedProperty, UpdateHelper.Callback)

```csharp
public UpdateHelper UpdateRegister(SerializedProperty property, UpdateHelper.Callback callback)
```

`property` から導出したキーに対する `UpdateRegister(string, UpdateHelper.Callback)` と同じです。

### UILocalize(VisualElement, bool, int)

```csharp
public void UILocalize(VisualElement elem, bool addLanguagePopup = true, int spaceHeight = 8)
```

`elem` のツリー内のキーを翻訳で置き換え、最新の状態に保ちます。各要素では `text`、`label`、`headerTitle` のうち setter を持つ
最初のものをキーとして読み、翻訳して書き戻します。ツールチップはキーの `:tooltip` 項目から埋めます。

ツリーは即座にローカライズされるため、キーが画面に出ることはありません。さらにバインド処理の後にもう一度実行されます。バインドが
キーを戻す可能性があるためです。要素がパネルから外れると登録は破棄されます。`addLanguagePopup` を指定すると、`spaceHeight`
の
隙間の下に言語選択が追加されます。

スキップされるもの: `unity-text-input` または `unity-content` という名前の子（そのサブツリーごと）、`localize-skip` クラスを持つ
サブツリー、`unity-base-field__inspector-field` または `unity-object-field-display__label` を持つ要素。`localize-tooltip`
クラスを持つ要素には、ラベルのキーからツールチップは設定されません。既存の `tooltip` がキーとして扱われ、それ自体が
ローカライズされます。

### GetLanguageLocalization(string)

```csharp
public Dictionary<string, string> GetLanguageLocalization(string language)
```

1 つの言語のすべてのキーとテキストのスナップショットを、新しい辞書として返します。ローカライゼーション ID または言語が
不明な場合は `ArgumentException` を投げます。

### CreateLanguagePicker()

```csharp
public LanguagePicker CreateLanguagePicker()
```

このローカライゼーション用の新しい `LanguagePicker`。ツリーに追加できる状態です。

```csharp
settingsCard.Add(helper.CreateLanguagePicker());
```

### SelectLanguageElement(VisualElement, int)

```csharp
public void SelectLanguageElement(VisualElement element, int spaceHeight = 8)
```

`element` に `spaceHeight` の隙間と UI Toolkit の言語ポップアップを追加します。コントロールの配置やスタイルを指定する場合は
`CreateLanguagePicker` を使ってください。

### SelectLanguageGUI()

```csharp
public void SelectLanguageGUI()
```

`EditorGUILayout.Popup` で IMGUI の言語選択を描画します。ラベルは `label.language` とそのツールチップです。

### OnLocalizationChanged

```csharp
public event LocalizationChanged? OnLocalizationChanged

public delegate void LocalizationChanged(string newLanguage)
```

このローカライゼーションの選択言語が変わったときに、新しい言語を伴って発生します。ヘルパーはハンドラーが付いている間だけ
`GlobalLocalization.OnLocalizationChanged` を購読し、最後のハンドラーで解除します。

### LocalizationUpdated

```csharp
public delegate void LocalizationUpdated()
```

`LocalizationChanged` と並んで宣言される引数なしのデリゲート型です。`LocalizationHelper` はこの型のイベントを公開しません。
再読み込みの通知は `GlobalLocalization.OnLocalizationReload` から来ます。

## LocalizationExtensions

```csharp
public static class LocalizationExtensions
```

エディタ UI 用の糖衣構文です: `"label.some_key".S()`、`tree.UILocalize()` など。各メソッドは呼び出しを行うアセンブリの
`LocalizationPackageAttribute` からヘルパーを解決するため、パッケージは専用のラッパークラスを持たなくて済みます。

すべてのメソッドには `[MethodImpl(MethodImplOptions.NoInlining)]` が付いています。呼び出しがインライン化されると
`Assembly.GetCallingAssembly` が利用側ではなくこのアセンブリを返すためです。

### S(this string)

```csharp
public static string S(this string key)
```

呼び出し元アセンブリのローカライゼーションでの `key` のテキスト。

```csharp
label.text = "label.my_window.title".S();
```

### S(this SerializedProperty)

```csharp
public static string S(this SerializedProperty property)
```

`property` から導出したキーのテキスト。

### Sf(this string, params object?[])

```csharp
public static string Sf(this string key, params object?[] args)
```

`key` のテキストを `string.Format` に通したもの。

```csharp
label.text = "label.found_count".Sf(count);
```

### G(this string)

```csharp
public static GUIContent G(this string key)
```

`key` のテキストとそのツールチップを持つ `GUIContent`。

```csharp
GUILayout.Label("label.my_window.title".G());
```

### G(this SerializedProperty)

```csharp
public static GUIContent G(this SerializedProperty property)
```

`property` から導出したキーの `GUIContent`。

### Tooltip(this string)

```csharp
public static string Tooltip(this string key)
```

`key` のツールチップ、つまり `:tooltip` 接尾辞付きで保存された項目。

### Tooltip(this SerializedProperty)

```csharp
public static string Tooltip(this SerializedProperty property)
```

`property` から導出したキーのツールチップ。

### UILocalize(this VisualElement, bool, int)

```csharp
public static void UILocalize(this VisualElement element, bool addLanguagePopup = true, int spaceHeight = 8)
```

`element` のツリー内のキーを翻訳で置き換え、最新の状態に保ちます。ツリーをバインドする前に呼んでください。属性、スキップ、
2 回目のパスについては `LocalizationHelper.UILocalize` を参照してください。

```csharp
root.UILocalize();
```

### Register(this string, UpdateHelper.Callback)

```csharp
public static UpdateHelper Register(this string localizeKey, UpdateHelper.Callback callback)
```

`localizeKey` に `callback` を登録します。更新対象の要素が消えるときはハンドルを破棄してください。

### Register(this SerializedProperty, UpdateHelper.Callback)

```csharp
public static UpdateHelper Register(this SerializedProperty property, UpdateHelper.Callback callback)
```

`property` から導出したキーに `callback` を登録します。

### SerializedProperty からのキー

`S(property)`、`G(property)`、`Tooltip(property)`、`Register(property, ...)` は `label.{Type}.{field}` を組み立てます。
`Type` は
`property.serializedObject.targetObject` の型名で、両方の部分が同じ規則で変換されます:

- 大文字は、小文字から大文字への境界、または頭字語の最後の大文字の前で新しい単語を開始します: `UIText` は `ui_text`、
  `HPBar` は
  `hp_bar`、`localizationID` は `localization_id` になります。
- 記号と句読点は `_` になります。

つまり `MyWindow` の `displayName` フィールドは `label.my_window.display_name` です。

## UpdateHelper

```csharp
public class UpdateHelper : IDisposable
```

再読み込みや言語変更のときに、1 組のラベルとツールチップを最新に保ちます。登録はそれぞれ独立しているため、複数の要素が同じキーを
共有できます。

### UpdateHelper.Callback

```csharp
public delegate void Callback(string newLabel, string newTooltip)
```

登録したキーの新しいラベルとツールチップを受け取ります。

### Register(string, string, Callback)

```csharp
public static UpdateHelper Register(string localizationID, string localizeKey, Callback callback)
```

1 つのローカライゼーション ID の 1 つのキーに `callback` を登録し、解除用のハンドルを返します。`Register` 自体はコールバックを
呼びません。次に言語が変わったとき、または再読み込みされたときに実行されるため、初期テキストは `S` と `Tooltip` で設定して
ください。

### Register(string, SerializedProperty, Callback)

```csharp
public static UpdateHelper Register(string localizationID, SerializedProperty property, Callback callback)
```

ラベルのプロパティが使うキーを、その型とフィールド名から導出して登録します。

### Dispose()

```csharp
public void Dispose()
```

コールバックの更新を止めて登録を削除します。更新対象の要素が取り除かれたときに呼んでください。以後コールバックは呼ばれません。

## GlobalLocalization

```csharp
[InitializeOnLoad]
public static class GlobalLocalization
```

プロジェクト内のすべての `BasicLocalization` アセットを読み込み、ID ごとの言語辞書と選択言語を保持し、登録を更新します。検索は
`LocalizationHelper` 経由で行い、この型はイベントとデリゲートだけを公開します。

読み込みは最初のエディタティックまで遅延され、アセット変更後は 250 ms の遅延でまとめられます。翻訳アセットに入力するたびに
プロジェクトを走査し直すことはありません。`Tools > Localization > Reload Localizations` で強制的に再読み込みできます。選択言語は
ID ごとに `EditorPrefs` の `{localizationID}_Language` に保存されます。

### OnLocalizationReload

```csharp
public static event LocalizationUpdated? OnLocalizationReload

public delegate void LocalizationUpdated()
```

アセットが読み込み直され、すべての登録が更新された後に発生します。`UILocalize` や `UpdateRegister` で最新に保たれない UI に
使ってください。

### OnLocalizationChanged

```csharp
public static event LocalizationChanged? OnLocalizationChanged

public delegate void LocalizationChanged(string localizationID, string newLanguage)
```

いずれかのローカライゼーションの選択言語が変わったときに、ローカライゼーション ID と新しい言語を伴って発生します。登録は
イベントの発生前に更新されます。再読み込みでは発生しません。
