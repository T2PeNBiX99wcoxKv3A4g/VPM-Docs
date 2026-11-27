# アセット

## BasicLocalization

```csharp
[CreateAssetMenu(fileName = "en-US", menuName = "Localization/Basic Localization")]
public class BasicLocalization : ScriptableObject
```

1 つの言語の翻訳のまとまりです。アセットのファイル名が `Languages` と `SetLanguage` で使われる言語 ID で、`localizationID`
が
1 つのパッケージの言語をまとめます。`jsonFile` と `poFile` はインスペクターが書き出すサイドカーファイルを指すことができ、同じ
テキストを外部ツールで編集できます。

### localizationID

```csharp
public string localizationID = "";
```

同じローカライゼーションの全言語で共有するグループ ID。ID が空のアセットは、アセットの読み込み時に警告とともにスキップされます。

### displayName

```csharp
public string displayName = "English";
```

言語ピッカーに表示される名前。フィールドが空の場合、`OnValidate` が `English` に戻します。

### translates

```csharp
public List<BasicTranslate> translates = new();
```

この言語のすべての翻訳。新しいアセットは `label.language` 項目から始まります。

### jsonFile

```csharp
public Object? jsonFile;
```

インスペクターの `Export JSON` が書き出すサイドカー JSON。

### poFile

```csharp
public Object? poFile;
```

インスペクターの `Export PO` が書き出すサイドカー PO。

### OnLocalizationFileUpdated

```csharp
public static event LocalizationFileUpdated? OnLocalizationFileUpdated

public delegate void LocalizationFileUpdated(string localizationID, string localizationName)
```

アセットが変更された後、`OnValidate` からローカライゼーション ID とアセット名を伴って発生します。`GlobalLocalization` はこれを
使って再読み込みを予約します。

## BasicTranslate

```csharp
[Serializable]
public class BasicTranslate
```

1 つの翻訳項目: キー、テキスト、任意のツールチップ。ツールチップはオプトインで、`useTooltip` が false のときは `tooltip` の
テキストはアセットに残りますが、読み込まれず表示もされません。

### DefaultTooltipSuffix

```csharp
public const string DefaultTooltipSuffix = ":tooltip";
```

項目が上書きしない限り `key` に付加される接尾辞。

### key

```csharp
public string key = "";
```

翻訳を識別するキー（例: `label.language`）。

### translate

```csharp
public string translate = "";
```

`key` の翻訳テキスト。

### tooltip

```csharp
public string tooltip = "";
```

ツールチップのテキスト。`useTooltip` が true のときだけ使われます。

### useTooltip

```csharp
public bool useTooltip;
```

ツールチップを読み込みとエディタ UI に含めるかどうか。既定はオフ。

### tooltipSuffix

```csharp
public string tooltipSuffix = DefaultTooltipSuffix;
```

ツールチップを公開するために `key` に付加する接尾辞（例: `label.language:tooltip`）。プラグインが `.tooltip` のような別の表記を
期待しない限り既定のままにしてください。そのような項目に対しても、ローダーは `:tooltip` を解決可能なままにします。
