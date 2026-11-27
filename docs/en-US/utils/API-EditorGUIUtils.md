# EditorGUIUtils

`io.github.ykysnk.utils.Editor` · `public static class EditorGUIUtils`

Builds editor content and icons that follow the active editor skin, so custom inspectors show the same icons as built-in ones.

## IconContent

```csharp
public static GUIContent IconContent(string name)
public static GUIContent IconContent(string text, string name)
```

Loads a built-in editor icon by name. On the dark skin the name is prefixed with `d_`, which is where Unity keeps the light-for-dark variants, so callers pass the light name only, e.g. `console.infoicon`. The content's image is `null` when the name does not resolve. The two-argument overload also carries the text, which is how a window title gets its icon.

```csharp
titleContent = EditorGUIUtils.IconContent("My Window", "unityeditor.inspectorwindow");
```

## IconTexture

```csharp
public static Texture IconTexture(string name)
```

Returns only the texture of a built-in editor icon, for callers that need the image itself. It goes through `IconContent`, so the `d_` prefix applies here too, and the result is `null` when the name does not resolve.
