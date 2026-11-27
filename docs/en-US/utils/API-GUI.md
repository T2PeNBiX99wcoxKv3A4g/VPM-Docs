# GUI helpers

## EditorGUILayoutUtility

`io.github.ykysnk.utils.Editor` · `public static class EditorGUILayoutUtility`

Cached label styles and layout helpers that the package's inspectors share.

### BoldLabel

```csharp
public static GUIStyle BoldLabel { get; }
```

Bold label at 15pt for section headings. Created on first access, so it keeps the editor skin that was active at that
moment.

### BoldLabel2

```csharp
public static GUIStyle BoldLabel2 { get; }
```

Smaller bold label at 12pt, for sub headings under `BoldLabel`.

### Label(string text, string? textTip = null)

```csharp
public static GUIContent Label(string text, string? textTip = null)
```

Creates label content from the text and an optional tooltip. The result can be passed to any `EditorGUILayout` control.

### Line(Color color, float space = 20f, float lineHeight = 1f)

```csharp
public static void Line(Color color, float space = 20f, float lineHeight = 1f)
```

Draws a horizontal rule in `color`, with half of `space` above and half below it, so the total vertical space is always
`space`. `lineHeight` is the height of the rule in pixels.

### Line(float space = 20f, float lineHeight = 1f)

```csharp
public static void Line(float space = 20f, float lineHeight = 1f)
```

Draws a gray separator line; the shortcut used by most inspectors.

```csharp
EditorGUILayoutUtility.Line();
```

## EditorGUILayoutUtilityExtensions

`io.github.ykysnk.utils.Editor` · `public static class EditorGUILayoutUtilityExtensions`

Lets label content be created from a string, so a tooltip can be attached without spelling out
`EditorGUILayoutUtility.Label`.

### Label(this string text, string? textTip = null)

```csharp
public static GUIContent Label(this string text, string? textTip = null)
```

Creates label content for this text, with an optional tooltip.

```csharp
EditorGUILayout.LabelField("Strength".Label("Damage multiplier"));
```

## EditorGUIUtils

`io.github.ykysnk.utils.Editor` · `public static class EditorGUIUtils`

Builds editor content and icons that follow the active editor skin, so custom inspectors show the same icons as
built-in ones.

### IconContent(string name)

```csharp
public static GUIContent IconContent(string name)
```

Loads a built-in editor icon by name. On the dark skin the name is prefixed with `d_`, which is where Unity keeps the
light-for-dark variants. The content's image is null when the name does not resolve.

### IconContent(string text, string name)

```csharp
public static GUIContent IconContent(string text, string name)
```

Creates label content that shows `text` next to a built-in editor icon.

### IconTexture(string name)

```csharp
public static Texture IconTexture(string name)
```

Returns only the texture of a built-in editor icon, or null when the name does not resolve.

## EditorUtils

`io.github.ykysnk.utils.Editor` · `public static class EditorUtils`

Message dialog helpers that wrap `CustomDialogWindow`.

### DisplayDialogAsync(string title, string message, string ok = "OK", string cancel = "", int waitTime = 0)

```csharp
public static Task<bool> DisplayDialogAsync(string title, string message,
    string ok = "OK", string cancel = "", int waitTime = 0)
```

Shows the dialog and returns a task that resolves to true when Ok is pressed and false when Cancel is pressed or the
window is closed without a choice. `waitTime` is the number of seconds the Ok button stays disabled; zero disables the
delay.

```csharp
var confirmed = await EditorUtils.DisplayDialogAsync("Delete", "Remove the folder?", "Delete", "Cancel");
```

### DisplayDialog(string title, string message, string ok = "OK", string cancel = "", Action? onOk = null, Action? onCancel = null, int waitTime = 0)

```csharp
public static void DisplayDialog(string title, string message, string ok = "OK", string cancel = "",
    Action? onOk = null, Action? onCancel = null, int waitTime = 0)
```

Shows the dialog and reports the answer through callbacks instead of a task. Closing the window without pressing a
button counts as cancel. An empty `cancel` hides the Cancel button.

## EditorTask

`io.github.ykysnk.utils.Editor` · `public static class EditorTask`

Adapts a .NET task to the editor loop: the returned task is completed from `EditorApplication.update`, so awaiting it
resumes on the main thread where UnityEditor APIs are allowed.

### Run(Task task)

```csharp
public static Task Run(Task task)
```

Returns a task that finishes after the editor loop sees `task` complete. Fault and cancel states are forwarded instead
of being thrown, so the caller decides how to handle them; any result is discarded.

```csharp
await EditorTask.Run(File.WriteAllTextAsync(path, text));
```

### Run&lt;T&gt;(Task&lt;T&gt; task)

```csharp
public static Task<T> Run<T>(Task<T> task)
```

Same as the non-generic overload, but carries the result of `task` over to the returned task.

## CustomDialogWindow

`io.github.ykysnk.utils.Editor` · `public class CustomDialogWindow : EditorWindow`

Floating utility window with a message, an Ok button and an optional Cancel button, used by `EditorUtils`. It is not
modal: the window reports its result through callbacks and closes itself, and its text can be copied from the context
menu.

The window is fixed at 500×250, centred over the main editor window, and shown with `ShowUtility`. A dialog that is
still open is closed first and its pending result is reported as cancel; closing the window without pressing a button
also counts as cancel. When `waitTime` is set, the Ok caption counts down and the button stays disabled until it
reaches zero.

Every member the class declares is private or internal, so dialogs are created through `EditorUtils.DisplayDialog` or
`EditorUtils.DisplayDialogAsync`, which pass the window's arguments straight through.
