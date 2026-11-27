# BooleanVector3Field

`io.github.ykysnk.utils.Editor.UIElements` · `public class BooleanVector3Field : BindableElement, INotifyValueChanged<BooleanVector3>`

把 `BooleanVector3` 編輯成同一列 X/Y/Z 三個開關的 UI Toolkit 欄位。它重複使用 Unity 複合向量欄位的 USS 類別，因此與內建欄位對齊，並可用 `label`、`x`、`y`、`z` 屬性從 UXML 建立。

開關會寫入 `value`，`value` 也會寫回開關，因此三個部分不會互相矛盾。每個開關還帶有各自分量的繫結路徑（`x`、`y`、`z`）。

## Constructors

```csharp
public BooleanVector3Field()
```

以空標籤和全部關閉的開關建構欄位，並把開關的變更導入 `value`，讓它們送出 `ChangeEvent`。

```csharp
var field = new BooleanVector3Field { label = "Mask" };
```

## label

```csharp
public string label { get; set; }
```

顯示在開關之前的文字。設為空會移除標籤元素，因此該欄位可以用在已有標籤的列中；再次設定文字會把它插回最前面。

## x

```csharp
public bool x { get; set; }
```

X 開關的狀態，會反映到 `value`。setter 寫入開關，隨後開關的變更回呼更新 `value`，因此與點擊走同一條通知路徑。

## y

```csharp
public bool y { get; set; }
```

Y 開關的狀態，會反映到 `value`。setter 寫入開關，隨後開關的變更回呼更新 `value`，因此與點擊走同一條通知路徑。

## z

```csharp
public bool z { get; set; }
```

Z 開關的狀態，會反映到 `value`。setter 寫入開關，隨後開關的變更回呼更新 `value`，因此與點擊走同一條通知路徑。

## value

```csharp
public BooleanVector3 value { get; set; }
```

被編輯的向量。設定不同的值會更新三個開關並送出帶舊值與新值的 `ChangeEvent<BooleanVector3>`；再次設定目前的值則不做任何事。

## SetValueWithoutNotify

```csharp
public void SetValueWithoutNotify(BooleanVector3 newValue)
```

設定值並更新三個開關而不送出 `ChangeEvent`，用於推送來自繫結的資料。

## RegisterValueChangedCallback

```csharp
public static void RegisterValueChangedCallback<T>(this INotifyValueChanged<T> field,
    EventCallback<ChangeEvent<T>> callback)
```

屬於 `INotifyValueChanged<BooleanVector3>`，呼叫時把 `T` 設為 `BooleanVector3`；這個擴充方法來自 `INotifyValueChangedExtensions`。回呼會收到欄位回報的每一次變更，無論來自開關或來自 `value`。

```csharp
field.RegisterValueChangedCallback(evt => Utils.Log("Mask", evt.newValue));
```

## UxmlFactory

```csharp
public new class UxmlFactory : UxmlFactory<BooleanVector3Field, UxmlTraits>
```

從 UXML 建立欄位。主體為空：標籤名稱就是類型名稱，因此寫成 `io.github.ykysnk.utils.Editor.UIElements.BooleanVector3Field`。

## UxmlTraits

```csharp
public new class UxmlTraits : BindableElement.UxmlTraits
```

讀取 `BooleanVector3Field` 的 `label`（字串）與 `x`、`y`、`z`（布林）屬性，並套用到建立的元素上。四項都可省略。

```xml
<io.github.ykysnk.utils.Editor.UIElements.BooleanVector3Field label="Mask" x="true" />
```

## Init

```csharp
public override void Init(VisualElement ve, IUxmlAttributes bag, CreationContext cc)
```

即 `UxmlTraits.Init`。把從 UXML 屬性包讀取的 `label`、`x`、`y`、`z` 依此順序套用到建立的欄位上。
