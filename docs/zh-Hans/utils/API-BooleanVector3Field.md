# BooleanVector3Field

`io.github.ykysnk.utils.Editor.UIElements` · `public class BooleanVector3Field : BindableElement, INotifyValueChanged<BooleanVector3>`

把 `BooleanVector3` 编辑成一行 X/Y/Z 三个开关的 UI Toolkit 字段。它复用 Unity 复合向量字段的 USS 类，因此与内置字段对齐，并且可以用 `label`、`x`、`y`、`z` 属性从 UXML 创建。

开关会写入 `value`，`value` 也会写回开关，因此三个部分不会互相矛盾。每个开关还带有各自分量的绑定路径（`x`、`y`、`z`）。

## Constructors

```csharp
public BooleanVector3Field()
```

以空标签和全部关闭的开关构建字段，并把开关的变更导入 `value`，从而为它们发送 `ChangeEvent`。

```csharp
var field = new BooleanVector3Field { label = "Mask" };
```

## label

```csharp
public string label { get; set; }
```

显示在开关之前的文本。设为空会移除标签元素，因此该字段可以用在已有标签的行中；再次设置文本会把它插回最前面。

## x

```csharp
public bool x { get; set; }
```

X 开关的状态，会反映到 `value`。setter 写入开关，随后开关的变更回调更新 `value`，因此与点击走同一条通知路径。

## y

```csharp
public bool y { get; set; }
```

Y 开关的状态，会反映到 `value`。setter 写入开关，随后开关的变更回调更新 `value`，因此与点击走同一条通知路径。

## z

```csharp
public bool z { get; set; }
```

Z 开关的状态，会反映到 `value`。setter 写入开关，随后开关的变更回调更新 `value`，因此与点击走同一条通知路径。

## value

```csharp
public BooleanVector3 value { get; set; }
```

被编辑的向量。设置不同的值会更新三个开关并发送携带旧值与新值的 `ChangeEvent<BooleanVector3>`；再次设置当前值则不做任何事。

## SetValueWithoutNotify

```csharp
public void SetValueWithoutNotify(BooleanVector3 newValue)
```

设置值并更新三个开关而不发送 `ChangeEvent`，用于推送来自绑定的数据。

## RegisterValueChangedCallback

```csharp
public static void RegisterValueChangedCallback<T>(this INotifyValueChanged<T> field,
    EventCallback<ChangeEvent<T>> callback)
```

属于 `INotifyValueChanged<BooleanVector3>`，调用时把 `T` 设为 `BooleanVector3`；该扩展方法来自 `INotifyValueChangedExtensions`。回调会收到字段上报的每一次变更，无论来自开关还是来自 `value`。

```csharp
field.RegisterValueChangedCallback(evt => Utils.Log("Mask", evt.newValue));
```

## UxmlFactory

```csharp
public new class UxmlFactory : UxmlFactory<BooleanVector3Field, UxmlTraits>
```

从 UXML 创建字段。主体为空：标签名就是类型名，因此写作 `io.github.ykysnk.utils.Editor.UIElements.BooleanVector3Field`。

## UxmlTraits

```csharp
public new class UxmlTraits : BindableElement.UxmlTraits
```

读取 `BooleanVector3Field` 的 `label`（字符串）与 `x`、`y`、`z`（布尔）属性，并应用到创建的元件上。四项都可省略。

```xml
<io.github.ykysnk.utils.Editor.UIElements.BooleanVector3Field label="Mask" x="true" />
```

## Init

```csharp
public override void Init(VisualElement ve, IUxmlAttributes bag, CreationContext cc)
```

即 `UxmlTraits.Init`。把从 UXML 属性包读取的 `label`、`x`、`y`、`z` 按此顺序应用到创建的字段上。
