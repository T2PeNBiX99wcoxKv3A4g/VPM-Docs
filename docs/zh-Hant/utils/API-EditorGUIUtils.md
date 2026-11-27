# EditorGUIUtils

`io.github.ykysnk.utils.Editor` · `public static class EditorGUIUtils`

建構跟隨目前編輯器面板樣式的編輯器內容與圖示，使自訂檢視器顯示與內建檢視器相同的圖示。

## IconContent

```csharp
public static GUIContent IconContent(string name)
public static GUIContent IconContent(string text, string name)
```

依名稱載入內建編輯器圖示。在深色面板樣式下名稱會加上 `d_` 前置字串，Unity 把適用於深色的亮色變體放在那裡，因此呼叫端只傳亮色名稱，例如 `console.infoicon`。名稱無法解析時，內容的圖像為 `null`。帶兩個參數的多載還攜帶文字，用於為視窗標題加上圖示。

```csharp
titleContent = EditorGUIUtils.IconContent("My Window", "unityeditor.inspectorwindow");
```

## IconTexture

```csharp
public static Texture IconTexture(string name)
```

只傳回內建編輯器圖示的紋理，供需要圖像本身的呼叫端使用。它經由 `IconContent`，因此 `d_` 前置字串在這裡同樣生效；名稱無法解析時結果為 `null`。
