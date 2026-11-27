# BasicEditor

`io.github.ykysnk.utils.Editor` · `public abstract class BasicEditor : UnityEditor.Editor`

Base class for custom inspectors that runs the drawing code inside a try/catch and shows a consistent error UI when it throws, for both IMGUI and UI Toolkit inspectors.

Override `OnErrorHandleInspectorGUI` for an IMGUI inspector and `CreateErrorHandleInspectorGUI` for a UI Toolkit one; both bodies are guarded. `OnInspectorGUI` still updates the serialized object, applies the modified properties and reports changes, so the body only has to draw.

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

## ErrorEvent

```csharp
public delegate void ErrorEvent(Exception e, Type type);
```

Receives an exception that escaped the inspector body, together with the inspector technology that threw it. Subscribed through `OnErrorEvent`.

## Type

```csharp
public enum Type
{
    UGUI,
    UIToolkit
}
```

Which inspector technology failed: `UGUI` is the classic IMGUI inspector, `UIToolkit` the UI Toolkit inspector built in `CreateInspectorGUI`.

## OnErrorEvent

```csharp
public static event ErrorEvent? OnErrorEvent;
```

Raised after an exception was caught and the error UI was drawn, for tooling that wants to report it. It is static, so every inspector of the package shares the same subscribers.

## OnEnable

```csharp
protected virtual void OnEnable()
```

Unity callback. Override to initialise the editor; the body is not guarded, so an exception thrown here is not caught by this class.

## OnInspectorGUI

```csharp
public override void OnInspectorGUI()
```

Updates the serialized object, draws Unity's default inspector first when `IsBaseOnOldInspectorGUI` is set, then runs `OnErrorHandleInspectorGUI` inside `Try.Run`. On failure it optionally logs, calls `OnError` and `OnErrorEvent`, and draws the IMGUI error UI. When the body reported a change, `OnChange` runs and then the modified properties are applied.

## CreateInspectorGUI

```csharp
public override VisualElement? CreateInspectorGUI()
```

Builds `CreateErrorHandleInspectorGUI` inside `Try.Run`. On failure it reports the exception and returns the UI Toolkit error UI from `BasicEditorErrorUI.uxml`, which shows the message, the exception type, a copyable stack trace and a Copy button. When that asset cannot be loaded, `CreateUxmlImportErrorUI()` is returned instead.

## OnErrorHandleInspectorGUI

```csharp
protected virtual void OnErrorHandleInspectorGUI()
```

Draws the IMGUI inspector body. Override this instead of `OnInspectorGUI`: exceptions are caught and replaced by the error UI.

## CreateErrorHandleInspectorGUI

```csharp
protected virtual VisualElement? CreateErrorHandleInspectorGUI()
```

Builds the UI Toolkit inspector body. Override this: exceptions are caught and replaced by the error UI. The default returns `null`, which leaves Unity's own inspector in place.

## OnChange

```csharp
protected virtual void OnChange()
```

Called after the inspector body reported a change and before the modified properties are applied. It only runs for IMGUI, because the UI Toolkit path has no change check of its own.

## OnError

```csharp
protected virtual void OnError(Exception e, Type type)
```

Called for every exception caught from the inspector body, before the error UI is drawn. Override to add custom logging or recovery.

## DrawErrorUI

```csharp
protected virtual void DrawErrorUI(Exception e)
```

Draws the IMGUI error UI, mirroring `BasicEditorErrorUI.uxml`: the message alone in a `HelpBox`, a header row with the exception type and a Copy button, and the details in a scrollable selectable box. The box grows with its content and starts scrolling at 140 pixels; the Details foldout starts expanded.

## IsBaseOnOldInspectorGUI

```csharp
protected virtual bool IsBaseOnOldInspectorGUI { get; }
```

Whether `OnInspectorGUI` draws Unity's default inspector before the custom body. False by default.

## ConsoleLog

```csharp
protected virtual bool ConsoleLog { get; }
```

Whether caught exceptions are also written to the console with `Debug.LogException`. False by default; the error UI is shown either way.

## ErrorTitle

```csharp
protected static string ErrorTitle(Exception e)
```

The one-line title shown in the error UI: `Editor Error: {message}`.

## ErrorDetails

```csharp
protected static string ErrorDetails(Exception e)
```

The copyable error text: the message followed by the original stack trace.

## CreateUxmlImportErrorUI

```csharp
public static VisualElement CreateUxmlImportErrorUI()
```

Error UI used when `BasicEditorErrorUI.uxml` itself cannot be loaded. It is an error help box reading `Failed to load uxml assets, please reimport the package to fix this issue.`

## CreateHelpUI

```csharp
public static VisualElement CreateHelpUI(string message, HelpBoxMessageType type = HelpBoxMessageType.Info)
```

Builds a one-element visual tree holding a `HelpBox` with the message and the given type.

```csharp
var ui = BasicEditor.CreateHelpUI("Nothing to configure yet.");
```

## CreateInfoUI

```csharp
public static VisualElement CreateInfoUI(string errorMessage)
```

Builds a UI Toolkit help box with an informational message.

## CreateErrorUI

```csharp
public static VisualElement CreateErrorUI(string errorMessage)
```

Builds a UI Toolkit help box with an error message.

## CreateWarningUI

```csharp
public static VisualElement CreateWarningUI(string errorMessage)
```

Builds a UI Toolkit help box with a warning message.
