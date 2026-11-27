# UpdateHelper

`io.github.ykysnk.Localization.Editor` · `public class UpdateHelper : IDisposable`

再読み込みや言語変更のときに、1 組のラベルとツールチップを最新に保ちます。登録はそれぞれ独立しているため、複数の要素が同じキーを共有でき、要素が消えたら `Dispose` で登録を削除します。

ハンドルはローカライゼーション ID、キー、コールバックを保持し、ローダーがすべての有効なハンドルを 1 つのリストで管理して、再読み込みや言語変更の後にまとめて呼び出します。コールバックを止める方法はハンドルの破棄だけなので、ツリーを作り直すウィンドウは前回の構築で登録したものを破棄する必要があります。

## Callback

```csharp
public delegate void Callback(string newLabel, string newTooltip)
```

登録したキーの新しいラベルとツールチップを受け取ります。キーにツールチップ項目がない場合、ツールチップは `""` です。

## Register

```csharp
public static UpdateHelper Register(string localizationID, string localizeKey, Callback callback)
public static UpdateHelper Register(string localizationID, SerializedProperty property, Callback callback)
```

1 つのローカライゼーション ID の 1 つのキーに `callback` を登録し、解除用のハンドルを返します。`Register` 自体はコールバックを呼びません。次に言語が変わったとき、または再読み込みされたときに実行されるため、初期テキストは先に `S` と `Tooltip` で設定してください。

`SerializedProperty` のオーバーロードは、ラベルのプロパティが使うキー `label.{Type}.{field}` を、対象オブジェクトの型名とプロパティ名から導出して登録します。

```csharp
var registration = UpdateHelper.Register("io.github.ykysnk.yky-toolkit", "label.my_window.title",
    (label, tooltip) => title.text = label);
```

## Dispose

```csharp
public void Dispose()
```

コールバックの更新を止め、ローダーのリストとキーごとのリストの両方から登録を削除します。更新対象の要素が取り除かれたときに呼んでください。以後コールバックは呼ばれません。2 回破棄しても問題ありません。
