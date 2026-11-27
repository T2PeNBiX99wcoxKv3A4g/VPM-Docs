# EditorGUILayoutUtility

`io.github.ykysnk.utils.Editor` · `public static class EditorGUILayoutUtility`

包内检视器共用的、带缓存的标签样式与布局辅助方法。

两个样式在首次访问时创建，之后一直保留，因此都保持着当时生效的编辑器皮肤。

## BoldLabel

```csharp
public static GUIStyle BoldLabel { get; }
```

用于章节标题的 15pt 粗体标签。

```csharp
EditorGUILayout.LabelField("Settings", EditorGUILayoutUtility.BoldLabel);
```

## BoldLabel2

```csharp
public static GUIStyle BoldLabel2 { get; }
```

用于 `BoldLabel` 下方子标题的、12pt 的较小粗体标签。

## Label

```csharp
public static GUIContent Label(string text, string? textTip = null)
```

用文本和可选提示创建标签内容。`textTip` 为 `null` 时不带提示，结果可直接传给任何 `EditorGUILayout` 控件。

```csharp
EditorGUILayout.LabelField(EditorGUILayoutUtility.Label("Strength", "Damage multiplier"));
```

## Line

```csharp
public static void Line(Color color, float space = 20f, float lineHeight = 1f)
public static void Line(float space = 20f, float lineHeight = 1f)
```

绘制 `color` 色的水平分隔线，`space` 的一半在上、一半在下，因此总垂直空间始终是 `space`。`lineHeight` 是线条高度（像素）。不带颜色的重载绘制灰色分隔线，多数检视器都使用这个快捷方式。

```csharp
EditorGUILayoutUtility.Line();
```
