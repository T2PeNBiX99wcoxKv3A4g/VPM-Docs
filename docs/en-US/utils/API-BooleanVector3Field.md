# BooleanVector3Field

`io.github.ykysnk.utils.Editor.UIElements` · `public class BooleanVector3Field : BindableElement, INotifyValueChanged<BooleanVector3>`

UI Toolkit field that edits a `BooleanVector3` as three X/Y/Z toggles on one row. It reuses Unity's composite vector field USS classes so it lines up with built-in fields, and can be created from UXML with the `label`, `x`, `y` and `z` attributes.

The toggles feed `value`, and `value` writes back to them, so the three parts never disagree. Each toggle also carries the binding path of its component (`x`, `y`, `z`).

## Constructors

```csharp
public BooleanVector3Field()
```

Builds the field with an empty label and all toggles off, and routes toggle changes into `value` so a `ChangeEvent` is sent for them.

```csharp
var field = new BooleanVector3Field { label = "Mask" };
```

## label

```csharp
public string label { get; set; }
```

Text shown in front of the toggles. An empty value removes the label element so the field can be used inside a row that already has one; setting a text again inserts it back at the front.

## x

```csharp
public bool x { get; set; }
```

State of the X toggle, mirrored into `value`. The setter writes the toggle, whose change callback then updates `value`, so it follows the same notification path as a click.

## y

```csharp
public bool y { get; set; }
```

State of the Y toggle, mirrored into `value`. The setter writes the toggle, whose change callback then updates `value`, so it follows the same notification path as a click.

## z

```csharp
public bool z { get; set; }
```

State of the Z toggle, mirrored into `value`. The setter writes the toggle, whose change callback then updates `value`, so it follows the same notification path as a click.

## value

```csharp
public BooleanVector3 value { get; set; }
```

The edited vector. Setting a different value updates the three toggles and sends a `ChangeEvent<BooleanVector3>` carrying the previous and the new vector; setting the current value again does nothing.

## SetValueWithoutNotify

```csharp
public void SetValueWithoutNotify(BooleanVector3 newValue)
```

Sets the value and updates the three toggles without sending a `ChangeEvent`, for pushing data that originates from a binding.

## RegisterValueChangedCallback

```csharp
public static void RegisterValueChangedCallback<T>(this INotifyValueChanged<T> field,
    EventCallback<ChangeEvent<T>> callback)
```

Part of `INotifyValueChanged<BooleanVector3>` and called with `T` set to `BooleanVector3`; the extension comes from `INotifyValueChangedExtensions`. The callback receives every change the field reports, whether it came from a toggle or from `value`.

```csharp
field.RegisterValueChangedCallback(evt => Utils.Log("Mask", evt.newValue));
```

## UxmlFactory

```csharp
public new class UxmlFactory : UxmlFactory<BooleanVector3Field, UxmlTraits>
```

Creates the field from UXML. An empty body: the tag name is the type name, so the element is written as `io.github.ykysnk.utils.Editor.UIElements.BooleanVector3Field`.

## UxmlTraits

```csharp
public new class UxmlTraits : BindableElement.UxmlTraits
```

Reads the `label` (string) and `x`, `y`, `z` (bool) attributes of `BooleanVector3Field` and applies them to the created element. All four are optional.

```xml
<io.github.ykysnk.utils.Editor.UIElements.BooleanVector3Field label="Mask" x="true" />
```

## Init

```csharp
public override void Init(VisualElement ve, IUxmlAttributes bag, CreationContext cc)
```

`UxmlTraits.Init`. Applies the attributes read from the UXML bag to the created field: `label`, `x`, `y` and `z`, in that order.
