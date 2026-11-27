# BasicLocalizationEditor

`io.github.ykysnk.Localization.Editor` · `[CustomEditor(typeof(BasicLocalization))] [CanEditMultipleObjects] public class BasicLocalizationEditor : BasicEditor`

Inspector of a `BasicLocalization` asset: the asset settings, the format conversion tools and the list of translation entries. It is a UI Toolkit inspector derived from [`BasicEditor`](../utils/API-BasicEditor.md), so an exception thrown while the tree is built is replaced by that class's error UI.

The tree is the UXML asset held in the editor's `uxml` field, a `[SerializeField]`. It is localized with `UILocalize(false)` — the argument keeps the language picker from being appended at the end, so the inspector adds it to the `languageSlot` element of the settings card itself — and then bound to the serialized object. `jsonFile` only accepts a `TextAsset` and `poFile` only a `LocalizationAsset`, matching the two sidecar formats.

The `translates` list is filled from the asset and each row is built by [`BasicTranslateDrawer`](./API-BasicTranslateDrawer.md). The search field filters on key, translation and tooltip 150 ms after the last keystroke, and while a filter is active drag reordering is off because the visible order no longer maps to array indices. Right-clicking a selection offers copy, paste and remove, where paste is disabled unless [`TranslateClipboard`](./API-TranslateClipboard.md) holds an entry. The add button appends an empty entry, clears the filter so the new row is visible and scrolls to it; the remove button is enabled only while something is selected, and the count label shows the total, or `visible/total` while a filter is active.

The convert foldout remembers whether it was open in `EditorPrefs`, under `io.github.ykysnk.Localization.BasicLocalizationEditor.convert`. Export JSON and Export PO write the sidecar under the asset's own name, assign it to the matching field and log the path; import reads the assigned file and merges it back by key, falling back to the path next to the asset when no file is assigned. The `…` buttons copy a picked file next to the asset first, because a reference can only point inside the project.

## CreateErrorHandleInspectorGUI

```csharp
protected override VisualElement? CreateErrorHandleInspectorGUI()
```

Builds the whole inspector and returns it. Everything described above is wired here: the cloned tree, the localization call, the binding, the language picker, the two file types, the list callbacks and every button. The list height is fitted once the tree is attached to a panel: the enclosing `ScrollView` viewport and the tree position give the space left below the tree, the list grows by that amount and never drops below 140 pixels, so the custom GUI fills the window instead of leaving the rest of it empty.
