# EditorGUILayoutUtilityExtensions

`io.github.ykysnk.utils.Editor` · `public static class EditorGUILayoutUtilityExtensions`

让标签内容可以直接从字符串创建，因此不必写出 `EditorGUILayoutUtility.Label` 就能附加提示。

## Label

```csharp
public static GUIContent Label(this string text, string? textTip = null)
```

为这段文本创建标签内容，可附带提示。`textTip` 为 `null` 时不带提示。调用会直接转发给 `EditorGUILayoutUtility.Label`，两者产生的内容相同。

```csharp
EditorGUILayout.LabelField("Strength".Label("Damage multiplier"));
```
