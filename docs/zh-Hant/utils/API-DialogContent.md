# DialogContent

`io.github.ykysnk.utils.Editor` · `public abstract class DialogContent`

[`CustomDialogWindow`](./API-CustomDialogWindow.md) 的主體。繼承它可以顯示自訂介面而不是純文字訊息，同時對話框保留外框、按鈕與等待時間。

視窗在建立時呼叫一次 `CreateContent`，並在同一時刻讀取 `Size` 與 `CopyText`。本頁也涵蓋 `MessageDialogContent`，也就是 `EditorUtils` 的訊息多載所建構的現成文字主體。

## DialogContent

`public abstract class DialogContent`

基底類別。只有 `CreateContent` 是抽象的，因此僅需換成其他版面的衍生類別不必覆寫其他成員。

### Size

```csharp
public virtual Vector2 Size { get; }
```

對話框視窗的大小（點）。預設為 500 × 250，視窗將它同時用作最小與最大尺寸，因此需要更大空間的主體必須覆寫它。

### CopyText

```csharp
public virtual string? CopyText { get; }
```

對話框內容選單中 Copy 項目所複製的文字。預設為 `null`，此時該項目不顯示。

### CreateContent

```csharp
public abstract VisualElement CreateContent();
```

建構顯示在標題列與按鈕之間的內容。視窗建立時只呼叫一次，傳回的元素會放入視窗 UXML 的 `content` 插槽。

```csharp
public sealed class TableDialogContent : DialogContent
{
    public override Vector2 Size => new(700, 400);

    public override VisualElement CreateContent() => new Label("Custom body");
}
```

## MessageDialogContent

`public sealed class MessageDialogContent : DialogContent`

預設的對話框主體：可捲動、可複製的訊息。它正是 [`EditorUtils`](./API-EditorUtils.md) 中接收 `message` 的多載所顯示的內容。

### Constructors

```csharp
public MessageDialogContent(string message)
```

保存要顯示的文字。訊息預期非 null，並原樣使用。

### CopyText

```csharp
public override string? CopyText { get; }
```

傳回訊息本身，因此每個訊息對話框都提供 Copy 項目。

### CreateContent

```csharp
public override VisualElement CreateContent()
```

建構名為 `messageScroll` 的 `ScrollView`，其中放入名為 `message` 的 `Label`。逸出序列會被解析，因此訊息中寫成 `\n` 的換行會呈現為換行，而不是原樣顯示。
