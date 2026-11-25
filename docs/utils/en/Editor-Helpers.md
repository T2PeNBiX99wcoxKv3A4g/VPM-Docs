# Editor helpers

## BasicEditor

`BasicEditor` is the inspector base class used by every package here. It wraps a UI Toolkit or IMGUI body in a
`try`/`catch`, reports the exception and draws a consistent error box instead of leaving a broken inspector behind.

```csharp
using io.github.ykysnk.utils.Editor;

[CustomEditor(typeof(MyBehaviour))]
public class MyBehaviourEditor : BasicEditor
{
    protected override VisualElement? CreateErrorHandleInspectorGUI()
    {
        var tree = uxml.CloneTree();
        tree.Bind(serializedObject);
        return tree;
    }
}
```

Override `CreateErrorHandleInspectorGUI` for UI Toolkit, `OnErrorHandleInspectorGUI` for IMGUI. `OnError` and
`OnChange` are the hooks for logging and for applying changes after the body succeeded.

## GUI helpers

| Helper | Use |
| --- | --- |
| `EditorGUILayoutUtility` | Small layout helpers (rows, separators, labelled fields) used by the windows. |
| `EditorGUILayoutUtilityExtensions` | The same helpers as extension methods. |
| `EditorGUIUtils` | Icons, help boxes and the `IconContent` helper used by window titles. |
| `EditorUtils` | Asset and selection helpers shared by the windows. |
| `CustomDialogWindow` | A small modal prompt (title, message, buttons) that does not need a custom editor. |
| `EditorTask` | Runs an async editor task and reports progress and failures in one place. |

## Drawers

| Drawer | Draws |
| --- | --- |
| `BooleanVector3Drawer` | A `Vector3` where each axis has its own on/off toggle, for per-axis settings. |
| `ColorHexDrawer` | A color field with its `#RRGGBB` value next to it. |

Both are picked up automatically for fields of the matching type or via `[CustomPropertyDrawer]` on wrapper types.

## Menus

`MenuItemObject`, `MenuWrap` and `MenuServiceWrap` build `Tools/...`, `GameObject/...` and `Assets/...` entries with
validation functions and consistent priorities, so the menu paths of a package stay in one place.

## UPM client

`UpmInstaller` is the UPM wrapper behind the YKY Toolkit installer window:

```csharp
UpmInstaller.Install("io.github.ykysnk.localization");
UpmInstaller.Remove("io.github.ykysnk.localization@0.11.0");
UpmInstaller.UpdateAsync().WaitEditor(packages => { /* installed versions */ });
```

It talks to `UnityEditor.PackageManager.Client` and reports progress through the editor task helper.
