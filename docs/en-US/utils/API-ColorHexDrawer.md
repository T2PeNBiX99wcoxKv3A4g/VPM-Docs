# ColorHexDrawer

`io.github.ykysnk.utils.Editor` · `public class ColorHexDrawer : PropertyDrawer`

Draws a `ColorHex` as Unity's color swatch and writes the picked color back to the serialized hex string too, so both fields stay in sync for edits made through the swatch.

It is registered with `[CustomPropertyDrawer(typeof(ColorHex))]`, and the serialized property must have `color` and `hex` children.

## OnGUI

```csharp
public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
```

Draws the label followed by the color swatch. A change is written to both the `color` and `hex` children at once, the hex in `#RRGGBBAA` form.
