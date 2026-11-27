# エディターツール

## LocalizationPackageAttribute

```csharp
[AttributeUsage(AttributeTargets.Assembly)]
public sealed class LocalizationPackageAttribute : Attribute
```

アセンブリのエディタ UI がどのローカライゼーションを使うかを宣言します。`using` ディレクティブの隣で、アセンブリごとに 1 回
宣言してください。以降は `LocalizationExtensions` が適切なヘルパーを自分で解決するため、アセンブリにラッパークラスもヘルパー
フィールドも必要ありません。

```csharp
[assembly: LocalizationPackage("io.github.ykysnk.yky-toolkit")]
```

属性のないアセンブリもコンパイルできます。その場合 `LocalizationHelper.For` は警告を記録し、すべてのキーをそのまま表示する
共有の未バインドヘルパーを返します。

### LocalizationPackageAttribute(string localizationID)

```csharp
public LocalizationPackageAttribute(string localizationID)
```

1 つのローカライゼーション ID に対する属性を作成し、`LocalizationID` に格納します。

### LocalizationID

```csharp
public string LocalizationID { get; }
```

このアセンブリの翻訳を持つアセットのローカライゼーション ID。

## LanguagePicker

```csharp
public class LanguagePicker : VisualElement
```

既製の UI Toolkit 言語ピッカーです。1 つのローカライゼーション ID のすべての言語を一覧し、変更時に選択を切り替え、
`language-picker` クラスを持つのでスタイルを当てられます。`LocalizationHelper.CreateLanguagePicker` で作成するか、
`Languages` と
`SetLanguage` から独自のコントロールを組み立ててください。

リストは表示名で並びます。ピッカーはローカライゼーションアセットが再読み込みされると自身を作り直すため、遅延した最初の読み込みより
前に作ったものでも後から埋まります。他の場所での切り替えにも追従します。保存されていた言語が改名または削除されていた場合は最初の
言語にフォールバックし、設定を修復します。ポップアップのラベルは `label.language` の項目とそのツールチップです。ピッカーが
パネルから外れると登録は破棄されます。

### LanguagePicker(string localizationID)

```csharp
public LanguagePicker(string localizationID)
```

1 つのローカライゼーション ID 用のピッカーを作成します。`LocalizationHelper.CreateLanguagePicker` の使用を推奨します。

```csharp
var picker = new LanguagePicker("io.github.ykysnk.yky-toolkit");
settingsCard.Add(picker);
```

### SelectedLanguage

```csharp
public string SelectedLanguage { get; set; }
```

現在選択されている言語 ID。代入すると言語が切り替わり、`UILocalize` でローカライズされたすべての要素が更新されます。

## LocalizationConverter

```csharp
public static class LocalizationConverter
```

`BasicLocalization` を、翻訳ツールが使うフラットな形式との間で変換します。各項目はキーとテキストを提供し、ツールチップを使う
項目は `tooltipSuffix` を付加したキーでもう 1 組追加します。インポートはキー単位でマージし、項目を削除しません。新しいキーは
追加され、既存のキーはインポートしたテキストになります。

ツールチップ接尾辞で終わるキーは、そのベースキーがファイルまたはアセットに存在する場合にのみツールチップとして読み戻されます。
それ以外は通常の項目のままです。これにより `label.basic_translate.tooltip` のようなキーが壊れません。

### TooltipSuffixes

```csharp
public static readonly string[] TooltipSuffixes = { ":tooltip", ".tooltip", "_tooltip" };
```

キーをツールチップ項目として読み戻すときに認識される接尾辞。

### ToJson

```csharp
public static string ToJson(BasicLocalization localization)
```

フラットな JSON オブジェクト: キーからテキストへ、加えてツールチップを使う項目ごとにツールチップのキーを 1 つ。

### ToPo

```csharp
public static string ToPo(BasicLocalization localization)
```

キーごとに `msgid`/`msgstr` の組を 1 つ持つ PO ファイル（ツールチップを含む）。ヘッダーには `Language: {asset name}` が入ります。
Unity 標準の PO インポーターはこれがないファイルを拒否し、インポートエラーだけを残すためです。

### TryImportJson

```csharp
public static bool TryImportJson(BasicLocalization localization, string? text, out Exception? exception)
```

フラットな JSON オブジェクトを `localization` に読み込みます。失敗した場合は false を返し、解析エラーを `exception` に入れます。
null のテキストは `""` として扱われ、JSON オブジェクトではないため失敗します。

### TryImportPo

```csharp
public static bool TryImportPo(BasicLocalization localization, string? text, out Exception? exception)
```

PO ファイルを `localization` に読み込みます。失敗した場合は false を返し、解析エラーを `exception` に入れます。null のテキストは
空として扱われ、何もインポートされません。

## TranslateClipboard

```csharp
public static class TranslateClipboard
```

インスペクターと行の描画で共有される、翻訳項目のクリップボード処理。

### HasEntry()

```csharp
public static bool HasEntry()
```

クリップボードに現在翻訳項目が入っているかどうか。結果はクリップボードのテキストに対してキャッシュされるため、ボタンが頻繁に
問い合わせても JSON を解析し直しません。

### TryRead(out BasicTranslate?, out Exception?)

```csharp
public static bool TryRead([NotNullWhen(true)] out BasicTranslate? basicTranslate, out Exception? exception)
```

クリップボードから `BasicTranslate` を読み取ろうとします。テキストは JSON として解析でき、空でない `key` を持つ必要があります。
そのため、空のクリップボードや無関係な JSON オブジェクトは、行を空の値で上書きしないよう拒否されます。

メソッドが true を返したとき `basicTranslate` は解析された項目、それ以外は null です。`exception` は解析または検証のエラーで、
クリップボードが単に空だった場合は null です。

```csharp
if (TranslateClipboard.TryRead(out var entry, out var error))
    Paste(entry);
else if (error != null)
    Debug.LogWarning(error.Message);
```
