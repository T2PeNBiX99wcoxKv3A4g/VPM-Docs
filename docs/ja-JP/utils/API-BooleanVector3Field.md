# BooleanVector3Field

`io.github.ykysnk.utils.Editor.UIElements` · `public class BooleanVector3Field : BindableElement, INotifyValueChanged<BooleanVector3>`

`BooleanVector3` を 1 行の X/Y/Z の 3 つのトグルとして編集する UI Toolkit のフィールドです。Unity の複合ベクターフィールドの USS クラスを再利用しているため、組み込みのフィールドと位置が揃います。UXML からは `label`、`x`、`y`、`z` 属性で作成できます。

トグルは `value` に反映され、`value` はトグルに書き戻されるため、3 つの部分が食い違うことはありません。各トグルは自分の成分のバインディングパス（`x`、`y`、`z`）も持っています。

## Constructors

```csharp
public BooleanVector3Field()
```

空のラベルとすべてオフのトグルでフィールドを組み立て、トグルの変更を `value` に流して `ChangeEvent` が送出されるようにします。

```csharp
var field = new BooleanVector3Field { label = "Mask" };
```

## label

```csharp
public string label { get; set; }
```

トグルの前に表示するテキスト。空にするとラベル要素が取り除かれるため、すでにラベルのある行の中でも使えます。もう一度テキストを設定すると先頭に戻されます。

## x

```csharp
public bool x { get; set; }
```

X トグルの状態で、`value` に反映されます。setter はトグルに書き込むため、その変更コールバックが `value` を更新し、クリックと同じ通知経路を通ります。

## y

```csharp
public bool y { get; set; }
```

Y トグルの状態で、`value` に反映されます。setter はトグルに書き込むため、その変更コールバックが `value` を更新し、クリックと同じ通知経路を通ります。

## z

```csharp
public bool z { get; set; }
```

Z トグルの状態で、`value` に反映されます。setter はトグルに書き込むため、その変更コールバックが `value` を更新し、クリックと同じ通知経路を通ります。

## value

```csharp
public BooleanVector3 value { get; set; }
```

編集対象のベクター。異なる値を設定すると 3 つのトグルを更新し、以前の値と新しい値を持つ `ChangeEvent<BooleanVector3>` を送出します。現在と同じ値を設定しても何も起こりません。

## SetValueWithoutNotify

```csharp
public void SetValueWithoutNotify(BooleanVector3 newValue)
```

`ChangeEvent` を送出せずに値を設定して 3 つのトグルを更新します。バインディングから渡されるデータを反映するためのものです。

## RegisterValueChangedCallback

```csharp
public static void RegisterValueChangedCallback<T>(this INotifyValueChanged<T> field,
    EventCallback<ChangeEvent<T>> callback)
```

`INotifyValueChanged<BooleanVector3>` の一部で、`T` を `BooleanVector3` にして呼び出します。拡張メソッドは `INotifyValueChangedExtensions` のものです。コールバックは、トグルから来たものでも `value` から来たものでも、フィールドが報告するすべての変更を受け取ります。

```csharp
field.RegisterValueChangedCallback(evt => Utils.Log("Mask", evt.newValue));
```

## UxmlFactory

```csharp
public new class UxmlFactory : UxmlFactory<BooleanVector3Field, UxmlTraits>
```

UXML からフィールドを作成します。本体は空で、タグ名は型名なので `io.github.ykysnk.utils.Editor.UIElements.BooleanVector3Field` として記述します。

## UxmlTraits

```csharp
public new class UxmlTraits : BindableElement.UxmlTraits
```

`BooleanVector3Field` の `label`（文字列）と `x`、`y`、`z`（真偽値）属性を読み取り、作成された要素に適用します。4 つとも省略できます。

```xml
<io.github.ykysnk.utils.Editor.UIElements.BooleanVector3Field label="Mask" x="true" />
```

## Init

```csharp
public override void Init(VisualElement ve, IUxmlAttributes bag, CreationContext cc)
```

`UxmlTraits.Init` です。UXML のバッグから読み取った `label`、`x`、`y`、`z` を、この順で作成されたフィールドに適用します。
