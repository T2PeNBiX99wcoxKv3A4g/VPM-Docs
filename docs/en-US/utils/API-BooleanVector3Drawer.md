# BooleanVector3Drawer

`io.github.ykysnk.utils.Editor` · `public class BooleanVector3Drawer : PropertyDrawer`

Draws a `BooleanVector3` as three X/Y/Z toggles on one row, the same way Unity draws a `Vector3`, by reusing the built-in multi property field.

It is registered with `[CustomPropertyDrawer(typeof(BooleanVector3))]`, so every `BooleanVector3` field gets it without an attribute of its own.

## OnGUI

```csharp
public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
```

Draws the label followed by the three component toggles and writes edits back through the serialized property, whose `x`, `y` and `z` children are edited. Below roughly 332 pixels of view width the toggles take the full control rect, because the prefixed rect cannot hold all three.
