# DialogContent

`io.github.ykysnk.utils.Editor` · `public abstract class DialogContent`

[`CustomDialogWindow`](./API-CustomDialogWindow.md) 的主体。继承它可以显示自定义界面而不是纯文本消息，同时对话框保留边框、按钮与等待时间。

窗口在创建时调用一次 `CreateContent`，并在同一时刻读取 `Size` 与 `CopyText`。本页也涵盖 `MessageDialogContent`，即 `EditorUtils` 的消息重载所构建的现成文本主体。

## DialogContent

`public abstract class DialogContent`

基类。只有 `CreateContent` 是抽象的，因此仅需换成其他布局的派生类不必重写其他成员。

### Size

```csharp
public virtual Vector2 Size { get; }
```

对话框窗口的大小（点）。默认为 500 × 250，窗口把它同时用作最小与最大尺寸，因此需要更大空间的主体必须重写它。

### CopyText

```csharp
public virtual string? CopyText { get; }
```

对话框上下文菜单中 Copy 项所复制的文本。默认为 `null`，此时该项不显示。

### CreateContent

```csharp
public abstract VisualElement CreateContent();
```

构建显示在标题栏与按钮之间的内容。窗口创建时调用一次，返回的元素会放入窗口 UXML 的 `content` 槽位。

```csharp
public sealed class TableDialogContent : DialogContent
{
    public override Vector2 Size => new(700, 400);

    public override VisualElement CreateContent() => new Label("Custom body");
}
```

## MessageDialogContent

`public sealed class MessageDialogContent : DialogContent`

默认的对话框主体：可滚动、可复制的消息。它正是 [`EditorUtils`](./API-EditorUtils.md) 中接收 `message` 的重载所显示的内容。

### Constructors

```csharp
public MessageDialogContent(string message)
```

保存要显示的文本。消息预期非 null，并原样使用。

### CopyText

```csharp
public override string? CopyText { get; }
```

返回消息本身，因此每个消息对话框都提供 Copy 项。

### CreateContent

```csharp
public override VisualElement CreateContent()
```

构建名为 `messageScroll` 的 `ScrollView`，其中放入名为 `message` 的 `Label`。转义序列会被解析，因此消息中写作 `\n` 的换行会渲染为换行，而不是原样显示。
