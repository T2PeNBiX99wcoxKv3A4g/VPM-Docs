# BasicLocalization

`io.github.ykysnk.Localization` · `[CreateAssetMenu(fileName = "en-US", menuName = "Localization/Basic Localization")] public class BasicLocalization : ScriptableObject`

1 つの言語のエディター専用の翻訳をまとめた、1 つのローカライゼーションです。アセットのファイル名が `Languages` と `SetLanguage` で使われる言語 ID で、`localizationID` が同じパッケージに属するアセットをまとめます。

エディターはプロジェクト内のこの型のアセットをすべて読み込むため、翻訳はプロジェクト内のどこかに置かれていれば十分です。`localizationID` が空のアセットは警告とともにスキップされ、言語として数えられません。キーの無い項目は 1 件ずつスキップされます。新しいアセットは `Assets > Create > Localization > Basic Localization` から `en-US` として作成されます。

## LocalizationFileUpdated

```csharp
public delegate void LocalizationFileUpdated(string localizationID, string localizationName)
```

変更されたアセットのローカライゼーション ID とアセット名を受け取ります。[`OnLocalizationFileUpdated`](#onlocalizationfileupdated) の型で、両方の値をすべての購読者に渡します。

## localizationID

```csharp
public string localizationID = "";
```

同じローカライゼーションの全言語で共有するグループ ID。ID が空のアセットは読み込み時に警告とともにスキップされるため、言語ピッカーに現れることはありません。

## displayName

```csharp
public string displayName = "English";
```

言語ピッカーに表示される名前。フィールドが空のときは `OnValidate` が `English` に戻すため、ピッカーに空の項目が残ることはありません。

## translates

```csharp
public List<BasicTranslate> translates = new();
```

この言語のすべての翻訳で、インスペクターに並ぶ順序のままです。新しいアセットは `label.language` 項目から始まり、言語ピッカーはこの項目を必要とします。

## jsonFile

```csharp
public Object? jsonFile;
```

インスペクターの `Export JSON` が書き出すサイドカー JSON。フィールドの型は `UnityEngine.Object` ですが、インスペクターは `TextAsset` しか受け付けません。エクスポートはアセットの隣にファイルを書き出し、インポートしてからここに割り当てます。

## poFile

```csharp
public Object? poFile;
```

インスペクターの `Export PO` が書き出すサイドカー PO。インスペクターは Unity の `LocalizationAsset` しか受け付けません。エクスポートはアセットの隣にファイルを書き出し、インポートしてからここに割り当てます。

## OnValidate

```csharp
protected virtual void OnValidate()
```

アセットの読み込み時やインスペクターでの変更時に実行される Unity のコールバックです。`displayName` が空なら `English` で埋め、`localizationID` とアセット名を伴って `OnLocalizationFileUpdated` を発生させます。エディターが翻訳の再読み込みが必要だと知るのはこの経路です。オーバーライドでは基本実装を呼んでください。呼ばないとどちらの処理も行われません。

## OnLocalizationFileUpdated

```csharp
public static event LocalizationFileUpdated? OnLocalizationFileUpdated;
```

この型のアセットが変更された後、`OnValidate` からローカライゼーション ID とアセット名を伴って発生します。イベントは static なので、1 つのハンドラーがすべてのアセットの変更を受け取ります。`GlobalLocalization` はこれを購読して再読み込みを予約します。
