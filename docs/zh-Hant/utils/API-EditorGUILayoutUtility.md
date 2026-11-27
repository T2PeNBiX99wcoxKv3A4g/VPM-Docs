# EditorGUILayoutUtility

`io.github.ykysnk.utils.Editor` · `public static class EditorGUILayoutUtility`

套件內檢視器共用的、帶快取的標籤樣式與版面輔助方法。

兩個樣式在首次存取時建立，之後一直保留，因此都保持著當時生效的編輯器面板樣式。

## BoldLabel

```csharp
public static GUIStyle BoldLabel { get; }
```

用於章節標題的 15pt 粗體標籤。

```csharp
EditorGUILayout.LabelField("Settings", EditorGUILayoutUtility.BoldLabel);
```

## BoldLabel2

```csharp
public static GUIStyle BoldLabel2 { get; }
```

用於 `BoldLabel` 下方子標題的、12pt 的較小粗體標籤。

## Label

```csharp
public static GUIContent Label(string text, string? textTip = null)
```

以文字和選用的提示建立標籤內容。`textTip` 為 `null` 時不帶提示，結果可直接傳給任何 `EditorGUILayout` 控制項。

```csharp
EditorGUILayout.LabelField(EditorGUILayoutUtility.Label("Strength", "Damage multiplier"));
```

## Line

```csharp
public static void Line(Color color, float space = 20f, float lineHeight = 1f)
public static void Line(float space = 20f, float lineHeight = 1f)
```

繪製 `color` 色的水平分隔線，`space` 的一半在上、一半在下，因此總垂直空間始終是 `space`。`lineHeight` 是線條高度（像素）。不帶顏色的多載繪製灰色分隔線，是大多數檢視器使用的捷徑。

```csharp
EditorGUILayoutUtility.Line();
```
