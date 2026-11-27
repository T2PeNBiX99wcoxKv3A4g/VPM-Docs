# Inspectors and drawers

## BasicEditor

`io.github.ykysnk.utils.Editor` · `public abstract class BasicEditor : UnityEditor.Editor`

Base class for custom inspectors that runs the drawing code inside a try/catch and shows a consistent error UI when it
throws, for both IMGUI and UI Toolkit inspectors.

```csharp
[CustomEditor(typeof(MyBehaviour))]
public class MyBehaviourEditor : BasicEditor
{
    protected override void OnErrorHandleInspectorGUI()
    {
        EditorGUILayout.LabelField("Hello");
    }
}
```

### ErrorEvent

```csharp
public delegate void ErrorEvent(Exception e, Type type);
```

Receives an exception that escaped the inspector body.

### Type

```csharp
public enum Type
{
    UGUI,
    UIToolkit
}
```

Which inspector technology failed: the classic IMGUI inspector, or the UI Toolkit inspector built in
`CreateInspectorGUI`.

### OnErrorEvent

```csharp
public static event ErrorEvent? OnErrorEvent;
```

Raised after an exception was caught and the error UI was drawn, for tooling that wants to report it.

### IsBaseOnOldInspectorGUI

```csharp
protected virtual bool IsBaseOnOldInspectorGUI { get; }
```

Whether `OnInspectorGUI` draws Unity's default inspector before the custom body. False by default.

### ConsoleLog

```csharp
protected virtual bool ConsoleLog { get; }
```

Whether caught exceptions are also written with `Debug.LogException`. False by default; the error UI is shown either
way.

### OnEnable()

```csharp
protected virtual void OnEnable()
```

Unity callback for initialisation. It is not guarded, so an exception thrown here is not caught by the base class.

### OnInspectorGUI()

```csharp
public override void OnInspectorGUI()
```

Updates the serialized object, draws the base inspector when `IsBaseOnOldInspectorGUI` is set, then runs
`OnErrorHandleInspectorGUI` inside `Try.Run`. On failure it optionally logs, calls `OnError` and `OnErrorEvent`, and
draws the IMGUI error UI. When the body reported a change, `OnChange` runs before the modified properties are applied.

### CreateInspectorGUI()

```csharp
public override VisualElement? CreateInspectorGUI()
```

Builds `CreateErrorHandleInspectorGUI` inside `Try.Run`. On failure it reports the exception and returns the UI Toolkit
error UI from `BasicEditorErrorUI.uxml`, or `CreateUxmlImportErrorUI()` when that asset cannot be loaded.

### CreateUxmlImportErrorUI()

```csharp
public static VisualElement CreateUxmlImportErrorUI()
```

Error UI used when `BasicEditorErrorUI.uxml` itself cannot be loaded.

### CreateInfoUI(string errorMessage)

```csharp
public static VisualElement CreateInfoUI(string errorMessage)
```

Builds a UI Toolkit help box with an informational message.

### CreateErrorUI(string errorMessage)

```csharp
public static VisualElement CreateErrorUI(string errorMessage)
```

Builds a UI Toolkit help box with an error message.

### CreateWarningUI(string errorMessage)

```csharp
public static VisualElement CreateWarningUI(string errorMessage)
```

Builds a UI Toolkit help box with a warning message.

### CreateHelpUI(string message, HelpBoxMessageType type = HelpBoxMessageType.Info)

```csharp
public static VisualElement CreateHelpUI(string message, HelpBoxMessageType type = HelpBoxMessageType.Info)
```

Builds a one-element visual tree holding a `HelpBox`.

### ErrorTitle(Exception e)

```csharp
protected static string ErrorTitle(Exception e)
```

The one-line title shown in the error UI: `Editor Error: {message}`.

### ErrorDetails(Exception e)

```csharp
protected static string ErrorDetails(Exception e)
```

The copyable error text: the message followed by the original stack trace.

### DrawErrorUI(Exception e)

```csharp
protected virtual void DrawErrorUI(Exception e)
```

Draws the IMGUI error UI, mirroring `BasicEditorErrorUI.uxml`: the message in a `HelpBox`, a header row with the
exception type and a Copy button, and the details in a selectable box that grows with the content and starts scrolling
once it reaches 140 pixels.

### OnChange()

```csharp
protected virtual void OnChange()
```

Called after the inspector body reported a change and before the modified properties are applied.

### OnError(Exception e, Type type)

```csharp
protected virtual void OnError(Exception e, Type type)
```

Called for every exception caught from the inspector body, before the error UI is drawn. Override to add custom logging
or recovery.

### OnErrorHandleInspectorGUI()

```csharp
protected virtual void OnErrorHandleInspectorGUI()
```

Draws the IMGUI inspector body. Override this instead of `OnInspectorGUI`: exceptions are caught and replaced by the
error UI.

### CreateErrorHandleInspectorGUI()

```csharp
protected virtual VisualElement? CreateErrorHandleInspectorGUI()
```

Builds the UI Toolkit inspector body. Override this: exceptions are caught and replaced by the error UI.

## BooleanVector3Drawer

`io.github.ykysnk.utils.Editor` · `public class BooleanVector3Drawer : PropertyDrawer`

Draws a `BooleanVector3` as three X/Y/Z toggles on one row, the same way Unity draws a `Vector3`, by reusing the
built-in multi property field. Registered with `[CustomPropertyDrawer(typeof(BooleanVector3))]`.

### OnGUI(Rect position, SerializedProperty property, GUIContent label)

```csharp
public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
```

Draws the label followed by the three component toggles and writes edits back through the serialized property. Below
roughly 332 pixels of view width the toggles take the full control rect, because the prefixed rect cannot hold them.

## ColorHexDrawer

`io.github.ykysnk.utils.Editor` · `public class ColorHexDrawer : PropertyDrawer`

Draws a `ColorHex` as Unity's color swatch and writes the picked color back to the serialized hex string too, so both
fields stay in sync for edits made through the swatch. Registered with `[CustomPropertyDrawer(typeof(ColorHex))]`.

### OnGUI(Rect position, SerializedProperty property, GUIContent label)

```csharp
public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
```

Draws the label followed by the color swatch. A change is written to both the `color` and `hex` children at once, in
`#RRGGBBAA` form.
