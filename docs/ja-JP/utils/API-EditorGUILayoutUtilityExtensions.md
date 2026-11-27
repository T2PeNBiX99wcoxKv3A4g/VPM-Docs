# EditorGUILayoutUtilityExtensions

`io.github.ykysnk.utils.Editor` · `public static class EditorGUILayoutUtilityExtensions`

文字列からラベルのコンテンツを作れるようにし、`EditorGUILayoutUtility.Label` を書かずにツールチップを付けられるようにします。

## Label

```csharp
public static GUIContent Label(this string text, string? textTip = null)
```

このテキストのラベルコンテンツを、任意のツールチップ付きで作成します。`textTip` が `null` の場合はツールチップなしのコンテンツになります。呼び出しはそのまま `EditorGUILayoutUtility.Label` に転送されるため、どちらも同じコンテンツを返します。

```csharp
EditorGUILayout.LabelField("Strength".Label("Damage multiplier"));
```
