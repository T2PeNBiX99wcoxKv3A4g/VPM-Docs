# BasicTranslateDrawer

`io.github.ykysnk.Localization.Editor` · `[CustomPropertyDrawer(typeof(BasicTranslate))] public class BasicTranslateDrawer : PropertyDrawer`

UI Toolkit drawer of one `BasicTranslate` entry: the key, the translated text, the tooltip toggle with its two fields, and the copy/paste buttons. The inspector's translation list builds every row with this drawer.

The layout is the UXML asset with GUID `666a4a69b697dcd45bfe25da3d5636a6`, looked up once and cached. It is localized with `UILocalize(false)` and bound to the field with `BindProperty`. Both tooltip fields stay hidden while `useTooltip` is off; because binding assigns the initial value after `CreatePropertyGUI` returns, the visibility is applied again from the scheduler. The tooltip toggle's input is moved in front of its label so the row reads as checkbox then label. Copy writes the whole entry to `EditorGUIUtility.systemCopyBuffer` as JSON, paste reads it back through [`TranslateClipboard`](./API-TranslateClipboard.md) and is enabled only while the clipboard holds an entry, checked once when the row is built and again when the pointer enters it.

## CreatePropertyGUI

```csharp
public override VisualElement CreatePropertyGUI(SerializedProperty property)
```

Builds the UI for one translation entry. When the UXML asset cannot be loaded it returns `BasicEditor.CreateUxmlImportErrorUI()` instead of a row, and that error box asks to reimport the package; otherwise it returns the cloned tree with the fields bound to `property`, the tooltip visibility applied and the two buttons wired. A paste that fails logs a warning through `Utils.LogWarning`.
