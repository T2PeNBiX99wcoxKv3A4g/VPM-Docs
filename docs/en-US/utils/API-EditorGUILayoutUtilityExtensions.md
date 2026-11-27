# EditorGUILayoutUtilityExtensions

`io.github.ykysnk.utils.Editor` · `public static class EditorGUILayoutUtilityExtensions`

Lets label content be created from a string, so a tooltip can be attached without spelling out `EditorGUILayoutUtility.Label`.

## Label

```csharp
public static GUIContent Label(this string text, string? textTip = null)
```

Creates label content for this text, with an optional tooltip. A `null` `textTip` leaves the content without one. The call forwards straight to `EditorGUILayoutUtility.Label`, so the two produce the same content.

```csharp
EditorGUILayout.LabelField("Strength".Label("Damage multiplier"));
```
