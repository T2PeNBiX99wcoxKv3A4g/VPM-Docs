# CustomDialogWindow

`io.github.ykysnk.utils.Editor` · `public class CustomDialogWindow : EditorWindow`

Floating utility window with a custom body, an Ok button and an optional Cancel button, used by [`EditorUtils`](./API-EditorUtils.md). It is not modal: the window reports its result through callbacks and closes itself, and its text can be copied from the context menu.

The window is sized to the body's [`Size`](./API-DialogContent.md), centred over the main editor window and shown with `ShowUtility`. Opening a dialog while one is still open closes the old one first, and its pending result is reported as cancel; closing the window without pressing a button also counts as cancel. When `waitTime` is set, the Ok caption counts down once per second and the button stays disabled until the counter reaches zero, so a long message cannot be dismissed unread. A body whose `CopyText` is not empty gets a `Copy` entry in its context menu.

Every member the class declares is private or internal, so dialogs are created through `EditorUtils.DisplayDialog` or `EditorUtils.DisplayDialogAsync`, which pass the window's arguments straight through.
