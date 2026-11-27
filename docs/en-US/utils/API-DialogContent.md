# DialogContent

`io.github.ykysnk.utils.Editor` · `public abstract class DialogContent`

Body of a [`CustomDialogWindow`](./API-CustomDialogWindow.md). Subclass it to show a custom interface instead of the plain message, while the dialog keeps its frame, buttons and wait time.

The window calls `CreateContent` once, when it is created, and reads `Size` and `CopyText` at the same time. The page also covers `MessageDialogContent`, the ready-made plain-text body that `EditorUtils` builds for its message overloads.

## DialogContent

`public abstract class DialogContent`

The base class. Only `CreateContent` is abstract, so a subclass that just shows a different layout needs no other override.

### Size

```csharp
public virtual Vector2 Size { get; }
```

Size of the dialog window, in points. The default is 500 × 250, and the window uses it as both its minimum and maximum size, so a body that needs more room has to override it.

### CopyText

```csharp
public virtual string? CopyText { get; }
```

Text copied by the dialog's Copy context menu entry. `null` by default, which hides that entry.

### CreateContent

```csharp
public abstract VisualElement CreateContent();
```

Builds the content shown between the title bar and the buttons. It is called once, when the window is created; the returned element is placed into the `content` slot of the window's UXML.

```csharp
public sealed class TableDialogContent : DialogContent
{
    public override Vector2 Size => new(700, 400);

    public override VisualElement CreateContent() => new Label("Custom body");
}
```

## MessageDialogContent

`public sealed class MessageDialogContent : DialogContent`

The default dialog body: a scrollable message that can be copied. It is what the `message` overloads of [`EditorUtils`](./API-EditorUtils.md) show.

### Constructors

```csharp
public MessageDialogContent(string message)
```

Stores the text to show. The message is expected to be non-null and is used unchanged.

### CopyText

```csharp
public override string? CopyText { get; }
```

Returns the message, so every message dialog offers the Copy entry.

### CreateContent

```csharp
public override VisualElement CreateContent()
```

Builds a `ScrollView` named `messageScroll` holding a `Label` named `message`. Escape sequences are parsed, so line breaks written as `\n` in the message are rendered as breaks rather than shown literally.
