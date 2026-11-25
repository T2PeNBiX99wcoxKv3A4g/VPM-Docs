# API

The package ships three assemblies. Everything listed below is public; obsolete members are included because they still
compile.

| Assembly | Namespace | Contents |
| --- | --- | --- |
| `io.github.ykysnk.utils` | `io.github.ykysnk.utils` | `Utils`, `IUtilsEditorOnly`, `BasicEditorComponent` |
| `io.github.ykysnk.utils.non-udon` | `io.github.ykysnk.utils.NonUdon` | `BooleanVector3`, `ColorHex` |
| `io.github.ykysnk.utils.Editor` | `io.github.ykysnk.utils.Editor` and its sub-namespaces | Inspector base, GUI helpers, menus, UPM client, drawers |

## Utils

`io.github.ykysnk.utils` · `public static class Utils`

Small helpers that are safe to call from Udon: logging with a coloured prefix and a few state checks.

The prefix is drawn as `[prefix]` in `#D771C0`. Every logging and assertion member carries `[HideInCallstack]`, so the
console entry points at the caller instead of this file.

### Log(string prefix, object message)

```csharp
public static void Log(string prefix, object message)
```

Writes `[prefix] message` with `Debug.Log`. `prefix` is the coloured part; a null `message` logs an empty value.

```csharp
Utils.Log(nameof(MyWindow), "Opened");
```

### Log(string prefix, object message, Object context)

```csharp
public static void Log(string prefix, object message, UnityEngine.Object context)
```

Same as the two-argument overload, with `context` highlighted when the console entry is clicked.

### LogWarning(string prefix, object message)

```csharp
public static void LogWarning(string prefix, object message)
```

Writes the prefixed message with `Debug.LogWarning`.

### LogWarning(string prefix, object message, Object context)

```csharp
public static void LogWarning(string prefix, object message, UnityEngine.Object context)
```

Warning overload that highlights `context` when the console entry is clicked.

### LogError(string prefix, object message)

```csharp
public static void LogError(string prefix, object message)
```

Writes the prefixed message with `Debug.LogError`.

### LogError(string prefix, object message, Object context)

```csharp
public static void LogError(string prefix, object message, UnityEngine.Object context)
```

Error overload that highlights `context` when the console entry is clicked.

### LogAssert(bool condition, string prefix, object message)

```csharp
[Obsolete("Use Assert(bool condition, string prefix, object message) instead")]
public static void LogAssert(bool condition, string prefix, object message)
```

Kept for compatibility; it only forwards to `Debug.Assert` with the prefixed message. Use `Assert` instead.

### LogAssert(bool condition, string prefix, object message, Object context)

```csharp
[Obsolete("Use Assert(bool condition, string prefix, object message, Object context) instead")]
public static void LogAssert(bool condition, string prefix, object message, UnityEngine.Object context)
```

Kept for compatibility; use `Assert` instead.

### Assert(bool condition, string prefix, object message)

```csharp
public static void Assert(bool condition, string prefix, object message)
```

Asserts `condition` through `Debug.Assert`, reporting the message with the coloured prefix when it fails.

```csharp
Utils.Assert(path != null, nameof(MyWindow), "Path must be set");
```

### Assert(bool condition, string prefix, object message, Object context)

```csharp
public static void Assert(bool condition, string prefix, object message, UnityEngine.Object context)
```

Same as the three-argument overload, with `context` highlighted when the console entry is clicked.

### IsMoved(float value)

```csharp
public static bool IsMoved(float value)
```

Whether a per-frame delta counts as movement: `value < -0.05f || value > 0.05f`. The threshold is strict, so a delta of
exactly `0.05f` is not movement.

### IsInPrefab2()

```csharp
public static bool IsInPrefab2()
```

Whether the editor is in prefab editing mode. Always false in the player. This is the name that is safe inside Udon.

### IsPlaying2()

```csharp
public static bool IsPlaying2()
```

Whether play mode is active or about to start. Always true in the player. This is the name that is safe inside Udon.

### IsInPrefab

```csharp
public static bool IsInPrefab { get; }
```

Property form of `IsInPrefab2`. Not compiled when `COMPILER_UDONSHARP` is defined, because it relies on
`PrefabStageUtility`.

### IsPlaying

```csharp
public static bool IsPlaying { get; }
```

Property form of `IsPlaying2`. Not compiled when `COMPILER_UDONSHARP` is defined, because it relies on
`EditorApplication`.

### ToLayer(LayerMask mask)

```csharp
public static int ToLayer(LayerMask mask)
```

Returns the layer index of a single-layer mask, i.e. the position of its highest set bit. A mask of zero returns 31,
which is what the bit walk produces.

```csharp
var layer = Utils.ToLayer(LayerMask.GetMask("Water"));
```

## IUtilsEditorOnly

`io.github.ykysnk.utils` · `public interface IUtilsEditorOnly`

Marker interface for behaviours that should be stripped from the build. It declares no members; it extends
`nadena.dev.ndmf.INDMFEditorOnly` when `UTILS_NDMF` is defined, `VRC.SDKBase.IEditorOnly` when `UTILS_VRC_SDK3_BASE` is
defined, and is an empty marker otherwise.

## BasicEditorComponent

`io.github.ykysnk.utils` · `public abstract class BasicEditorComponent : MonoBehaviour, IUtilsEditorOnly`

Empty base class for helper behaviours that must not survive into the uploaded avatar or world. It adds no members of
its own; derive from it and the build pipeline removes the component through `IUtilsEditorOnly`.

## BooleanVector3

`io.github.ykysnk.utils.NonUdon` · `public struct BooleanVector3 : IEquatable<BooleanVector3>`

Three independent boolean values kept as plain serializable fields, with a `Flags` view that packs them into a single
bitmask for switch-like tests.

### x, y, z

```csharp
public bool x;
public bool y;
public bool z;
```

Whether the X, Y and Z component is set.

### Flags

```csharp
public int Flags { get; set; }
```

The three components as a mask of `Flag` values. Assigning a mask overwrites all three components, so a component the
mask does not name is cleared. Bits outside `Flag.All` are dropped on assignment.

### Flag

```csharp
public enum Flag
{
    X = 1 << 0,
    Y = 1 << 1,
    Z = 1 << 2,
    None = 0,
    All = X | Y | Z
}
```

Bit selector for one component or a combination of them.

### HasFlag(Flag flag)

```csharp
public bool HasFlag(Flag flag)
```

Whether every bit of `flag` is currently set. `Flag.None` always matches.

### HasFlags(params Flag[] flags)

```csharp
public bool HasFlags(params Flag[] flags)
```

Whether every bit covered by `flags` is set. An empty array matches everything.

### AddFlag(Flag flag)

```csharp
public void AddFlag(Flag flag)
```

Sets the bits of `flag` and leaves the other components untouched.

### AddFlags(params Flag[] flags)

```csharp
public void AddFlags(params Flag[] flags)
```

Sets the bits covered by `flags` and leaves the other components untouched. An empty array changes nothing.

### RemoveFlag(Flag flag)

```csharp
public void RemoveFlag(Flag flag)
```

Clears the bits of `flag` and leaves the other components untouched.

### RemoveFlags(params Flag[] flags)

```csharp
public void RemoveFlags(params Flag[] flags)
```

Clears the bits covered by `flags` and leaves the other components untouched. An empty array changes nothing.

### SetFlag(Flag flag)

```csharp
public void SetFlag(Flag flag)
```

Replaces the whole mask with `flag`, so components it does not name are cleared.

### SetFlags(params Flag[] flags)

```csharp
public void SetFlags(params Flag[] flags)
```

Replaces the whole mask with the union of `flags`. An empty array clears all three components.

### Set(bool x2, bool y2, bool z2)

```csharp
public void Set(bool x2, bool y2, bool z2)
```

Assigns all three components in one call.

### Set(BooleanVector3 other)

```csharp
public void Set(BooleanVector3 other)
```

Copies all three components from `other`.

### SetAll(bool value)

```csharp
public void SetAll(bool value)
```

Assigns the same value to X, Y and Z.

### Invert()

```csharp
public void Invert()
```

Negates every component in place.

### SetX(bool value), SetY(bool value), SetZ(bool value)

```csharp
public void SetX(bool value)
public void SetY(bool value)
public void SetZ(bool value)
```

Assigns a single component.

### SetTrue(), SetFalse()

```csharp
public void SetTrue()
public void SetFalse()
```

`SetAll(true)` and `SetAll(false)`.

### True, False

```csharp
public static BooleanVector3 True { get; }
public static BooleanVector3 False { get; }
```

New vectors with all three components set, or all three cleared.

### ToString()

```csharp
public override string ToString()
```

Renders `BooleanVector3(x:…,y:…,z:…)`.

### operator !(BooleanVector3)

```csharp
public static BooleanVector3 operator !(BooleanVector3 booleanVector3)
```

Returns a negated copy; the operand is passed by value and not modified.

### operator true, operator false

```csharp
public static bool operator true(BooleanVector3 booleanVector3)
public static bool operator false(BooleanVector3 booleanVector3)
```

`true` only when all three components are set, so `if (vector)` is a three-way AND. `false` when at least one component
is cleared; the compiler requires it alongside `operator true` for `&&` and `||`.

### Equals(BooleanVector3), Equals(object), GetHashCode()

```csharp
public bool Equals(BooleanVector3 other)
public override bool Equals(object? obj)
public override int GetHashCode()
```

Component-wise equality, and a hash code built from the three fields.

## ColorHex

`io.github.ykysnk.utils.NonUdon` · `public struct ColorHex`

A `Color` together with its HTML hex form, so a colour can be serialized and inspected as text. Only the operators
update both fields at once; assigning one field directly leaves the other unchanged, and a default-initialized struct
derives its text from `color` when `hex` is null.

### color

```csharp
public Color color;
```

The colour value that `hex` spells out.

### hex

```csharp
public string hex;
```

The colour as `#RRGGBBAA`, including the leading `#`. Read straight from the field, so it can be null on a
default-initialized struct; conversions fall back to `color` then.

### ToString()

```csharp
public override string ToString()
```

Renders both fields as `Color: …, Hex: …`, deriving the hex from `color` when `hex` is null.

### implicit operator string(ColorHex)

```csharp
public static implicit operator string(ColorHex colorHex)
```

Returns the hex text, so the struct can stand in wherever a colour string is expected. Never null.

### implicit operator Color(ColorHex)

```csharp
public static implicit operator Color(ColorHex colorHex)
```

Returns `color`, so the struct can be used directly as a colour.

### implicit operator ColorHex(string)

```csharp
public static implicit operator ColorHex(string hex)
```

Parses an HTML colour string. Text that `ColorUtility.TryParseHtmlString` rejects becomes white instead of an error, and
`hex` is rewritten from the parsed colour, so the stored text is normalized rather than kept verbatim.

### implicit operator ColorHex(Color)

```csharp
public static implicit operator ColorHex(Color color)
```

Wraps a colour and derives its `#RRGGBBAA` text.

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

### Run<T>(Task<T> task)

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

## MenuItemObject

`io.github.ykysnk.utils.Editor` · `public class MenuItemObject`

Description of a menu item kept registered by `MenuExtensions`: path, shortcut, checked state, sort priority and the
callbacks Unity needs.

### MenuItemObject(string name, string shortcut, bool @checked, int priority, Action execute, Func<bool>? validate)

```csharp
public MenuItemObject(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
```

Creates a full description of a menu item. `name` is the menu path, sanitized the same way Unity sanitizes attribute
declared paths, so both kinds of item end up under the same path. `validate` decides whether the item is enabled; null
means always enabled.

### MenuItemObject(string name, string shortcut, int priority, Action execute)

```csharp
public MenuItemObject(string name, string shortcut, int priority, Action execute)
```

Creates an unchecked menu item without a validation callback.

### MenuItemObject(string name, int priority, Action execute)

```csharp
public MenuItemObject(string name, int priority, Action execute)
```

Creates an unchecked menu item without a shortcut or validation callback.

### MenuItemObject(string name, Action execute)

```csharp
public MenuItemObject(string name, Action execute)
```

Creates a menu item with the default priority for its kind: 10 under `GameObject/Create Other`, 1000 everywhere else,
matching Unity's own ordering.

### Name

```csharp
public string Name { get; private set; }
```

Menu path after sanitizing; this is the key the item is tracked under.

### Shortcut

```csharp
public string Shortcut { get; private set; }
```

Shortcut string passed to Unity, such as `#%g`; empty when the item has none.

### Checked

```csharp
public bool Checked { get; private set; }
```

Whether Unity draws the item with a checkmark.

### Priority

```csharp
public int Priority { get; private set; }
```

Sort order within the submenu; lower values are drawn first.

### Execute

```csharp
public Action Execute { get; private set; }
```

Action run when the item is chosen.

### Validate

```csharp
public Func<bool>? Validate { get; private set; }
```

Predicate deciding whether the item is enabled, or null when it is always enabled.

## MenuWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuWrap`

Reflection wrapper over the internal parts of `UnityEditor.Menu`, the class behind the editor menu bar. Those members
are undocumented editor internals and not public API, so Unity can rename or remove them in any version; this wrapper is
what lets menu items be added, changed and removed at runtime.

### SetHotkey(string menuPath, string hotkey)

```csharp
public static void SetHotkey(string menuPath, string hotkey)
```

Assigns the shortcut shown next to an existing menu item.

### ExtractSubmenus(string menuPath)

```csharp
public static string[] ExtractSubmenus(string menuPath)
```

Lists the sub menus that exist below the given path; empty when it has none.

### AddMenuItem(string name, string shortcut, bool @checked, int priority, Action execute, Func<bool>? validate)

```csharp
public static void AddMenuItem(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
```

Registers a menu item at runtime, without a `MenuItem` attribute.

### AddSeparator(string name, int priority)

```csharp
public static void AddSeparator(string name, int priority)
```

Adds a separator entry at the given path and priority.

### RemoveMenuItem(string name)

```csharp
public static void RemoveMenuItem(string name)
```

Removes the menu item registered under the given path.

### RebuildAllMenus()

```csharp
public static void RebuildAllMenus()
```

Rebuilds the whole menu bar from the registered items.

### MenuItemExists(string menuPath)

```csharp
public static bool MenuItemExists(string menuPath)
```

Whether a menu item is currently registered under the given path.

## MenuServiceWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuServiceWrap`

Reflection wrapper over the internal `UnityEditor.MenuService` class. Those members are not public API, so Unity can
rename or remove them in any version.

### SanitizeMenuItemName(string menuName)

```csharp
public static string SanitizeMenuItemName(string menuName)
```

Runs Unity's own menu path cleanup, so a path added at runtime is registered exactly as Unity would register it from a
`MenuItem` attribute. Returns the path Unity registers the item under.

### ValidateMethodForMenuCommand(MethodInfo methodInfo)

```csharp
public static bool ValidateMethodForMenuCommand(MethodInfo methodInfo)
```

Asks Unity whether a method is usable as a menu command, using the same rules it applies to `MenuItem` methods.

## EditorUtilityWrap

`io.github.ykysnk.utils.Editor` · `public static class EditorUtilityWrap`

Reflection wrapper over the internal part of `EditorUtility`. That member is not public API, so Unity can rename or
remove it in any version.

### Internal_UpdateAllMenus

```csharp
public static readonly WrapAction Internal_UpdateAllMenus;
```

The internal `EditorUtility.Internal_UpdateAllMenus` method, which makes Unity rebuild its menus. Needed after adding
menu items at runtime.

## MenuExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class MenuExtensions`

Keeps menu items that were added at runtime registered while the editor rebuilds its menus. When the hierarchy changes,
items that are no longer present are re-added through `MenuWrap`, then `EditorUtilityWrap.Internal_UpdateAllMenus` runs.

### AddMenuItem(MenuItemObject menuItemObject)

```csharp
public static bool AddMenuItem(MenuItemObject menuItemObject)
```

Keeps a menu item registered across menu rebuilds. Returns false when a menu item with the same path is already
registered.

```csharp
MenuExtensions.AddMenuItem(new MenuItemObject("Tools/My Tool/Do Something", "#%g", 1000, DoSomething));
```

### RemoveMenuItem(string name)

```csharp
public static MenuItemObject? RemoveMenuItem(string name)
```

Stops keeping the menu item with the given path registered and returns it. The menu entry itself is not removed; this
only prevents it from being added again after a rebuild.

## RequestExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class RequestExtensions`

Turns package manager requests into tasks that complete on the editor loop, so awaiting code can stay on the main
thread.

### AsTask<T>(this T request)

```csharp
public static Task<T> AsTask<T>(this T request) where T : Request
```

Awaits a package manager request. The request is polled from `EditorApplication.update` and the task is completed later
from `EditorApplication.delayCall`, so the awaiting continuation resumes on the main thread with a shallow call stack.
The concrete request type is preserved, so the caller can read its `Result`.

### AsTask<T>(this T request, CancellationToken token)

```csharp
public static Task<T> AsTask<T>(this T request, CancellationToken token) where T : Request
```

Same as the parameterless overload, but stops waiting when the token is cancelled. The request itself is not cancelled,
it just stops being observed.

## TaskExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class TaskExtensions`

Polls a task from `EditorApplication.update` and reports the outcome through callbacks, for callers that cannot await,
such as inspector and menu code.

### WaitEditor(this Task task, Action onCompleted, Action<Exception>? onError = null)

```csharp
public static void WaitEditor(this Task task, Action onCompleted, Action<Exception>? onError = null)
```

Invokes `onCompleted` on the editor loop once the task finishes. A faulted task calls `onError` with the exception it
actually threw (the aggregate wrapper is unwrapped), a canceled one with a `TaskCanceledException`. A null `onError`
makes the failure silent.

### WaitEditor<T>(this Task<T> task, Action<T> onCompleted, Action<Exception>? onError = null)

```csharp
public static void WaitEditor<T>(this Task<T> task, Action<T> onCompleted, Action<Exception>? onError = null)
```

Same as the non-generic overload, but passes the task's result to `onCompleted`.

## UpmInstaller

`io.github.ykysnk.utils.Editor` · `public static class UpmInstaller`

Installs, removes and updates Unity Package Manager packages from editor code. Every operation shows a sticky editor
progress bar whose cancel button stops it, unless the editor is compiling or updating at that moment. Install, remove
and upgrade share one lock, so only one of them runs at a time; a second call returns without doing anything.

### Install(string[] packages)

```csharp
public static void Install(string[] packages)
```

Starts installing the given packages and returns immediately. Entries are either `name` or `name@version`.

```csharp
UpmInstaller.Install(new[] { "io.github.ykysnk.localization@0.11.0" });
```

### InstallAsync(string[] packages)

```csharp
public static Task InstallAsync(string[] packages)
```

Installs the given packages and completes when all of them were processed.

### InstallAsync(string[] packages, CancellationToken token)

```csharp
public static Task InstallAsync(string[] packages, CancellationToken token)
```

Installs the given packages. Entries already installed at the requested version are skipped; a failed entry is logged
and the remaining ones are still processed. Cancelling `token` stops the operation without throwing, and the progress
bar closes as cancelled.

### Remove(string[] packages)

```csharp
public static void Remove(string[] packages)
```

Starts removing the given packages and returns immediately.

### RemoveAsync(string[] packages)

```csharp
public static Task RemoveAsync(string[] packages)
```

Removes the given packages and completes when all of them were processed.

### RemoveAsync(string[] packages, CancellationToken token)

```csharp
public static Task RemoveAsync(string[] packages, CancellationToken token)
```

Removes the given packages. A failed package is logged and the remaining ones are still processed. Cancelling `token`
stops the operation without throwing.

### UpdateAsync()

```csharp
public static Task<string[]> UpdateAsync()
```

Checks every installed package against the registry and lists the ones with a different version. Returns entries of the
form `name@version`, empty when nothing is outdated.

### UpdateAsync(CancellationToken token)

```csharp
public static Task<string[]> UpdateAsync(CancellationToken token)
```

Same as the parameterless overload; the token stops the check between packages, and the in-flight request is not
aborted. Entries found before a failure are still returned.

### Upgrade()

```csharp
public static void Upgrade()
```

Checks for updates and starts installing them, then returns immediately.

### UpgradeAsync()

```csharp
public static Task UpgradeAsync()
```

Checks for updates and installs them. Does nothing when every package is up to date.

### UpgradeAsync(CancellationToken token)

```csharp
public static Task UpgradeAsync(CancellationToken token)
```

Checks for updates and installs them. Does nothing when every package is up to date or when an install or removal is
already running. The token stops the update check or the following install without throwing.

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

## ReflectionUtils

`io.github.ykysnk.utils.NonUdon` · `public static class ReflectionUtils`

Reflection helpers that log instead of throwing: a missing member produces `null` / `default`, which makes them safe
for probing an optional dependency.

### Instantiate<T>(Type type)

```csharp
public static T? Instantiate<T>(Type type)
```

Creates an instance through the parameterless constructor and casts it to `T`; failures are logged as warnings and
yield `default`.

### GetNestedMethods(Type? type)

```csharp
public static IEnumerable<MethodInfo> GetNestedMethods(Type? type)
```

Every method declared on the nested types of `type`, public or not, enumerated lazily. A nested type the runtime
refuses to enumerate is skipped.

### GetNestedMethod(Type? type, string name, string? searchName = null)

```csharp
public static MethodInfo? GetNestedMethod(Type? type, string name, string? searchName = null)
```

The first nested method whose name contains `searchName`. It defaults to `<name>`, the name the compiler gives the
generated method of a lambda, async body or local function belonging to a member called `name`.

### FindType(string? typeName)

```csharp
public static Type? FindType(string? typeName)
```

Resolves a full or assembly-qualified name in the loaded assemblies; `null` when the name does not resolve.

### FindMethod(Type? type, string name)

```csharp
public static MethodInfo? FindMethod(Type? type, string name)
```

The first method with that name, public or not, static or instance, declared or inherited; `null` when the type has
none. Matching is by name only, so overloads resolve to the first one found.

### FindProperty(Type? type, string name)

```csharp
public static PropertyInfo? FindProperty(Type? type, string name)
```

The property with that name, public or not; `null` when the type has none.

### GetDeclaredMethods(Type? type)

```csharp
public static IEnumerable<MethodInfo> GetDeclaredMethods(Type? type)
```

Every method declared on the type itself (not on its nested types), public or not.

## Type index

Public types outside the pages above, grouped by namespace. The purpose text comes from each type's own summary.

### io.github.ykysnk.utils.Extensions

| Type | Purpose |
| --- | --- |
| `ComponentExtensions` | Component versions of the GameObject and Transform helpers. |
| `DictionaryExtensions` | Dictionary reads that treat a missing key as a default value. |
| `FloatExtensions` | Noise removal, tolerance checks, clamping and rounding for `float`. |
| `GameObjectExtensions` | Hierarchy paths, distance checks and index-based component access. |
| `ListExtensions` | Bounds-checked index access and in-place editing helpers for lists and arrays. |
| `StringExtensions` | Slicing helpers for delimited strings such as `"Folder/Name/Extension"`. |
| `Texture2DExtensions` | GPU resizing and alpha trimming of textures. |
| `TransformExtensions` | Hierarchy names, world/local scale conversion, unscaled point conversion and distance checks. |
| `Vector3Extensions` | Distance, component-wise arithmetic, clamping, rounding and direction helpers for `Vector3`. |

### io.github.ykysnk.utils.NonUdon

| Type | Purpose |
| --- | --- |
| `DictionaryWrapper<TKey, TValue>` | Dictionary-shaped data stored as two parallel lists, for Unity serialization. |
| `HashUtils`, `HashType` | Text hashing with lowercase hexadecimal digests. |
| `JsonUtils` | `JsonUtility` wrappers that report failure instead of throwing or returning null. |
| `ListWrapper<T>` | A list behind a single serialized field, so an interface-typed member can be stored. |
| `ReflectionUtils`, `ReflectionWrapper`, `Reflect` | Cached reflection lookups, compiled delegates and chainable member access. |
| `ReflectionAccess`, `FieldAccess`, `PropertyAccess`, `MethodAccess` | Accessor types backing `Reflect`. |
| `Result<T>`, `ResultExtensions`, `Try`, `Unit` | Failure-carrying results, chaining helpers and exception-free execution. |
| `Wrapper` | Entry point for `ListWrapper<T>` and `DictionaryWrapper<TKey, TValue>`. |
| `ILogger`, `Logger<T>` | The logging surface the package codes against, and its per-type implementation. |
| `FieldGetter<T>`, `FieldSetter<T>`, `PropertyGetter<T>`, `PropertySetter<T>`, `WrapAction`, `WrapFunc` | Delegates used by the reflection wrappers. |

### io.github.ykysnk.utils.Editor.Patches

| Type | Purpose |
| --- | --- |
| `IPatch`, `Patch<T>` | A group of patches applied as a unit; the subclass is the container for its nested patch methods. |
| `IPatchLoader`, `PatchLoader<T>` | Entry point of one assembly, which receives its Harmony instance and runs its patch groups. |
| `IPatchMethod`, `PatchMethod<T>` | One Harmony patch set: target method plus prefix, postfix, transpiler and finalizer. |
| `IReversePatchMethod`, `ReversePatchMethod<T>` | A reverse patch whose stub receives a callable copy of another method's body. |
| `ExportsPatchLoader` | Assembly attribute declaring a patch loader type to run when the editor loads. |

### io.github.ykysnk.utils.Editor.HarmonyUtilities

| Type | Purpose |
| --- | --- |
| `CodeCursor` | Streaming cursor over a transpiler's instructions, with current, next and history access. |
| `TranspilerExtensions` | Yields each instruction together with its neighbours through `WithContext`. |

### io.github.ykysnk.utils.Editor.UIElements

| Type | Purpose |
| --- | --- |
| `BooleanVector3Field` | UI Toolkit field that edits a `BooleanVector3` as three toggles; creatable from UXML. |
