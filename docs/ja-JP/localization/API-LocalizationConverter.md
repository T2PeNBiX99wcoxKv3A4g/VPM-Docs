# LocalizationConverter

`io.github.ykysnk.Localization.Editor` · `public static class LocalizationConverter`

`BasicLocalization` を、翻訳ツールが使うフラットな形式との間で変換します。各項目は `"key" = "translate"` になり、ツールチップを使う項目は `key + tooltipSuffix` でもう 1 組追加します。キーが空の項目は出力されません。

インポートはキー単位でマージし、項目を削除しません。新しいキーは追加され、既存のキーはインポートしたテキストになります。ツールチップ接尾辞で終わるキーは、そのベースキーがファイルまたはアセットに存在する場合にのみツールチップとして読み戻されます。それ以外は通常の項目のままなので、`label.basic_translate.tooltip` のようなキーが壊れません。テキスト全体を解析してから書き込むため、失敗したインポートはアセットを変更しません。

## TooltipSuffixes

```csharp
public static readonly string[] TooltipSuffixes = { BasicTranslate.DefaultTooltipSuffix, ".tooltip", "_tooltip" };
```

キーをツールチップ項目として読み戻すときに認識される接尾辞で、この順に試されます。最初の要素は [`BasicTranslate.DefaultTooltipSuffix`](./API-BasicTranslate.md) なので、`:tooltip` が優先される表記です。

## ToJson

```csharp
public static string ToJson(BasicLocalization localization)
```

フラットな JSON オブジェクト: キーからテキストへ、加えてツールチップを使う項目ごとにツールチップのキーを 1 つ。キーは `translates` の順序のまま、各組が 2 スペース字下げの 1 行になり、末尾には改行が入ります。

## ToPo

```csharp
public static string ToPo(BasicLocalization localization)
```

キーごとに `msgid`/`msgstr` の組を 1 つ持つ PO ファイル（ツールチップを含む）。ヘッダーには `Language: {asset name}`（アセットのファイル名＝言語 ID）が入ります。Unity 標準の PO インポーターはこれがないファイルを拒否し、インポートエラーだけを残すためです。

## TryImportJson

```csharp
public static bool TryImportJson(BasicLocalization localization, string? text, out Exception? exception)
```

フラットな JSON オブジェクトを `localization` に読み込みます。失敗した場合は false を返し、解析エラーを `exception` に入れます。null のテキストは `""` として扱われ、JSON オブジェクトではないため失敗します。値は文字列である必要があり、数値や入れ子のオブジェクト、末尾の余分なテキストは `FormatException` で失敗します。

## TryImportPo

```csharp
public static bool TryImportPo(BasicLocalization localization, string? text, out Exception? exception)
```

PO ファイルを `localization` に読み込みます。失敗した場合は false を返し、解析エラーを `exception` に入れます。null のテキストは空として扱われ、何もインポートされません。コメント行、`msgctxt`、`msgid_plural` は無視され、複数行の文字列は連結され、複数形は最初の `msgstr[0]` だけが使われます。`msgid` が空のヘッダー項目は捨てられます。解釈できない行はスキップされず、インポート全体が失敗します。
