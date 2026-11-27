# EditorGUILayoutUtility

`io.github.ykysnk.utils.Editor` · `public static class EditorGUILayoutUtility`

Cached label styles and layout helpers that the package's inspectors share.

The two styles are created on first access and kept afterwards, so both keep the editor skin that was active at that moment.

## BoldLabel

```csharp
public static GUIStyle BoldLabel { get; }
```

Bold label at 15pt for section headings.

```csharp
EditorGUILayout.LabelField("Settings", EditorGUILayoutUtility.BoldLabel);
```

## BoldLabel2

```csharp
public static GUIStyle BoldLabel2 { get; }
```

Smaller bold label at 12pt, for sub headings under `BoldLabel`.

## Label

```csharp
public static GUIContent Label(string text, string? textTip = null)
```

Creates label content from the text and an optional tooltip. A `null` `textTip` leaves the content without one, so the result can be passed to any `EditorGUILayout` control.

```csharp
EditorGUILayout.LabelField(EditorGUILayoutUtility.Label("Strength", "Damage multiplier"));
```

## Line

```csharp
public static void Line(Color color, float space = 20f, float lineHeight = 1f)
public static void Line(float space = 20f, float lineHeight = 1f)
```

Draws a horizontal rule in `color`, with half of `space` above and half below it, so the total vertical space is always `space`. `lineHeight` is the height of the rule in pixels. The overload without a color draws a gray separator line, which is the shortcut most inspectors use.

```csharp
EditorGUILayoutUtility.Line();
```
