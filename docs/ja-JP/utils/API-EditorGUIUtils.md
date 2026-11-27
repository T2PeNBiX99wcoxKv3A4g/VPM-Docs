# EditorGUIUtils

`io.github.ykysnk.utils.Editor` · `public static class EditorGUIUtils`

有効なエディターのスキンに合わせたエディターのコンテンツとアイコンを組み立て、カスタムインスペクターが組み込みのものと同じアイコンを表示できるようにします。

## IconContent

```csharp
public static GUIContent IconContent(string name)
public static GUIContent IconContent(string text, string name)
```

組み込みのエディターアイコンを名前で読み込みます。ダークスキンでは名前に `d_` が付けられます。Unity は明るい色のダーク用バリアントをそこに置いているため、呼び出し側は明るい方の名前だけを渡します（例: `console.infoicon`）。名前が解決できない場合、コンテンツの画像は `null` になります。2 引数のオーバーロードはテキストも持つため、ウィンドウタイトルにアイコンを付けるときに使います。

```csharp
titleContent = EditorGUIUtils.IconContent("My Window", "unityeditor.inspectorwindow");
```

## IconTexture

```csharp
public static Texture IconTexture(string name)
```

画像そのものが必要な呼び出し元のために、組み込みのエディターアイコンのテクスチャだけを返します。`IconContent` を経由するためここでも `d_` の接頭辞が適用され、名前が解決できない場合は `null` になります。
