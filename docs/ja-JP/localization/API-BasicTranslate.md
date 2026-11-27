# BasicTranslate

`io.github.ykysnk.Localization` · `[Serializable] public class BasicTranslate`

1 つの翻訳項目: キー、そのテキスト、任意のツールチップです。項目は [`BasicLocalization`](./API-BasicLocalization.md) アセットの `translates` の中にシリアライズされるため、単独のアセットとしてではなくインスペクターで編集します。

ツールチップはオプトインです。`useTooltip` が false のときは `tooltip` のテキストはアセットに残りますが、読み込まれず表示もされません。`tooltipSuffix` はツールチップ項目に使うキーの接尾辞を選びます（既定は `:tooltip` で、このプロジェクトの他のパッケージと揃っています）。

## DefaultTooltipSuffix

```csharp
public const string DefaultTooltipSuffix = ":tooltip";
```

項目が上書きしない限り `key` に付加される接尾辞です。`tooltipSuffix` の初期値であり、`LocalizationConverter.TooltipSuffixes` の最初の要素でもあります。

## key

```csharp
public string key = "";
```

翻訳を識別するキー（例: `label.language`）。キーが空の項目はローダーが警告とともにスキップするため、キーの無い項目が UI に届くことはありません。

## translate

```csharp
public string translate = "";
```

`key` の翻訳テキスト。選択中の言語で空の場合、同じキーの英語テキストにフォールバックします。

## tooltip

```csharp
public string tooltip = "";
```

ツールチップのテキストで、`useTooltip` が true のときだけ使われます。`useTooltip` がオフのときはアセットに残るだけで、読み込まれず表示もされません。

## useTooltip

```csharp
public bool useTooltip;
```

ツールチップを読み込みとエディター UI に含めるかどうか。既定はオフなので、有効にするまで新しい項目はツールチップを公開しません。

## tooltipSuffix

```csharp
public string tooltipSuffix = DefaultTooltipSuffix;
```

ツールチップを公開するために `key` に付加する接尾辞（例: `label.language:tooltip`）。プラグインが `.tooltip` のような別の表記を期待しない限り `DefaultTooltipSuffix` のままにしてください。そのような項目でも `Tooltip(key)` が動くよう、ローダーは `:tooltip` も解決可能なままにします。
