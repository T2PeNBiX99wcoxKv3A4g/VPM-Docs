# EditorGUILayoutUtilityExtensions

`io.github.ykysnk.utils.Editor` · `public static class EditorGUILayoutUtilityExtensions`

讓標籤內容可以直接從字串建立，因此不必寫出 `EditorGUILayoutUtility.Label` 就能附加提示。

## Label

```csharp
public static GUIContent Label(this string text, string? textTip = null)
```

為這段文字建立標籤內容，可附帶提示。`textTip` 為 `null` 時不帶提示。呼叫會直接轉給 `EditorGUILayoutUtility.Label`，兩者產生的內容相同。

```csharp
EditorGUILayout.LabelField("Strength".Label("Damage multiplier"));
```
