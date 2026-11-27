# DialogContent

`io.github.ykysnk.utils.Editor` · `public abstract class DialogContent`

[`CustomDialogWindow`](./API-CustomDialogWindow.md) の本体です。これを継承すると、ダイアログの枠、ボタン、待ち時間はそのままに、単純なメッセージの代わりに独自のインターフェースを表示できます。

ウィンドウは作成時に `CreateContent` を 1 回呼び、同じタイミングで `Size` と `CopyText` を読み取ります。このページでは、`EditorUtils` のメッセージ用オーバーロードが組み立てる既製のテキスト本体 `MessageDialogContent` も扱います。

## DialogContent

`public abstract class DialogContent`

基底クラスです。抽象なのは `CreateContent` だけなので、別のレイアウトを表示するだけの派生クラスは他のメンバーをオーバーライドする必要がありません。

### Size

```csharp
public virtual Vector2 Size { get; }
```

ダイアログウィンドウの大きさ（ポイント）。既定は 500 × 250 で、ウィンドウはこれを最小サイズと最大サイズの両方に使うため、より広い領域が必要な本体はオーバーライドする必要があります。

### CopyText

```csharp
public virtual string? CopyText { get; }
```

ダイアログのコンテキストメニューにある Copy 項目でコピーされるテキスト。既定は `null` で、その場合は項目が表示されません。

### CreateContent

```csharp
public abstract VisualElement CreateContent();
```

タイトルバーとボタンの間に表示するコンテンツを組み立てます。ウィンドウの作成時に 1 回だけ呼ばれ、返された要素はウィンドウの UXML の `content` スロットに配置されます。

```csharp
public sealed class TableDialogContent : DialogContent
{
    public override Vector2 Size => new(700, 400);

    public override VisualElement CreateContent() => new Label("Custom body");
}
```

## MessageDialogContent

`public sealed class MessageDialogContent : DialogContent`

既定のダイアログ本体で、スクロールでき、コピーもできるメッセージです。[`EditorUtils`](./API-EditorUtils.md) の `message` を取るオーバーロードが表示するものです。

### Constructors

```csharp
public MessageDialogContent(string message)
```

表示するテキストを保持します。メッセージは非 null を前提とし、そのまま使われます。

### CopyText

```csharp
public override string? CopyText { get; }
```

メッセージを返すため、すべてのメッセージダイアログで Copy 項目が使えます。

### CreateContent

```csharp
public override VisualElement CreateContent()
```

`messageScroll` という名前の `ScrollView` を作り、その中に `message` という名前の `Label` を入れます。エスケープシーケンスが解釈されるため、メッセージ内で `\n` と書いた改行はそのまま表示されるのではなく改行として描画されます。
