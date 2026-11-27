# EditorGUIUtils

`io.github.ykysnk.utils.Editor` · `public static class EditorGUIUtils`

构建跟随当前编辑器皮肤的编辑器内容与图标，使自定义检视器显示与内置检视器相同的图标。

## IconContent

```csharp
public static GUIContent IconContent(string name)
public static GUIContent IconContent(string text, string name)
```

按名称加载内置编辑器图标。在深色皮肤下名称会加上 `d_` 前缀，Unity 把适用于深色的亮色变体放在那里，因此调用方只传亮色名称，例如 `console.infoicon`。名称无法解析时，内容的图像为 `null`。带两个参数的重载还携带文本，用于给窗口标题配图标。

```csharp
titleContent = EditorGUIUtils.IconContent("My Window", "unityeditor.inspectorwindow");
```

## IconTexture

```csharp
public static Texture IconTexture(string name)
```

只返回内置编辑器图标的纹理，供需要图像本身的调用方使用。它经由 `IconContent`，因此 `d_` 前缀在这里同样生效；名称无法解析时结果为 `null`。
