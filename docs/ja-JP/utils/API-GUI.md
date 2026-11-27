# GUI ヘルパー

## EditorGUILayoutUtility

`io.github.ykysnk.utils.Editor` · `public static class EditorGUILayoutUtility`

パッケージのインスペクターが共有する、キャッシュされたラベルスタイルとレイアウトのヘルパーです。

### BoldLabel

```csharp
public static GUIStyle BoldLabel { get; }
```

セクション見出し用の 15pt の太字ラベル。初回アクセス時に作成されるため、その時点で有効だったエディタスキンを保持します。

### BoldLabel2

```csharp
public static GUIStyle BoldLabel2 { get; }
```

`BoldLabel` の下の小見出し用の、12pt の小さめの太字ラベル。

### Label(string text, string? textTip = null)

```csharp
public static GUIContent Label(string text, string? textTip = null)
```

テキストと任意のツールチップからラベルのコンテンツを作成します。結果は任意の `EditorGUILayout` コントロールに渡せます。

### Line(Color color, float space = 20f, float lineHeight = 1f)

```csharp
public static void Line(Color color, float space = 20f, float lineHeight = 1f)
```

`color` の水平線を描画します。`space` の半分を上に、半分を下に取るため、垂直方向の合計は常に `space` になります。
`lineHeight` は
線の高さ（ピクセル）です。

### Line(float space = 20f, float lineHeight = 1f)

```csharp
public static void Line(float space = 20f, float lineHeight = 1f)
```

灰色の区切り線を描画します。ほとんどのインスペクターが使うショートカットです。

```csharp
EditorGUILayoutUtility.Line();
```

## EditorGUILayoutUtilityExtensions

`io.github.ykysnk.utils.Editor` · `public static class EditorGUILayoutUtilityExtensions`

文字列からラベルのコンテンツを作れるようにし、`EditorGUILayoutUtility.Label` を明示しなくてもツールチップを付けられます。

### Label(this string text, string? textTip = null)

```csharp
public static GUIContent Label(this string text, string? textTip = null)
```

このテキストのラベルのコンテンツを、任意のツールチップ付きで作成します。

```csharp
EditorGUILayout.LabelField("Strength".Label("Damage multiplier"));
```

## EditorGUIUtils

`io.github.ykysnk.utils.Editor` · `public static class EditorGUIUtils`

有効なエディタスキンに合わせたエディタのコンテンツとアイコンを組み立てるので、カスタムインスペクターでも組み込みと同じアイコンが
表示されます。

### IconContent(string name)

```csharp
public static GUIContent IconContent(string name)
```

組み込みのエディタアイコンを名前で読み込みます。ダークスキンでは名前に `d_` を付けます。Unity がダーク用の明るいバリアントを
そこに置いているためです。名前が解決できない場合、コンテンツの画像は null です。

### IconContent(string text, string name)

```csharp
public static GUIContent IconContent(string text, string name)
```

組み込みのエディタアイコンの隣に `text` を表示するラベルコンテンツを作成します。

### IconTexture(string name)

```csharp
public static Texture IconTexture(string name)
```

組み込みのエディタアイコンのテクスチャだけを返します。名前が解決できない場合は null。

## EditorUtils

`io.github.ykysnk.utils.Editor` · `public static class EditorUtils`

`CustomDialogWindow` を包むメッセージダイアログのヘルパーです。

### DisplayDialogAsync(string title, string message, string ok = "OK", string cancel = "", int waitTime = 0)

```csharp
public static Task<bool> DisplayDialogAsync(string title, string message,
    string ok = "OK", string cancel = "", int waitTime = 0)
```

ダイアログを表示し、Ok が押されたら true、Cancel が押された場合や選択せずにウィンドウが閉じられた場合に false で完了するタスクを
返します。`waitTime` は Ok ボタンが無効のままになる秒数で、0 にすると遅延なしになります。

```csharp
var confirmed = await EditorUtils.DisplayDialogAsync("Delete", "Remove the folder?", "Delete", "Cancel");
```

### DisplayDialog(string title, string message, string ok = "OK", string cancel = "", Action? onOk = null, Action? onCancel = null, int waitTime = 0)

```csharp
public static void DisplayDialog(string title, string message, string ok = "OK", string cancel = "",
    Action? onOk = null, Action? onCancel = null, int waitTime = 0)
```

ダイアログを表示し、タスクではなくコールバックで答えを報告します。ボタンを押さずにウィンドウを閉じた場合はキャンセルとみなされます。
`cancel` が空の場合は Cancel ボタンが表示されません。

## EditorTask

`io.github.ykysnk.utils.Editor` · `public static class EditorTask`

.NET のタスクをエディタループに適合させます。返されるタスクは `EditorApplication.update` から完了するため、await すると
UnityEditor API が使えるメインスレッドで再開します。

### Run(Task task)

```csharp
public static Task Run(Task task)
```

エディタループが `task` の完了を確認した後に完了するタスクを返します。Fault と Cancel の状態は例外として投げずに転送されるため、
扱い方は呼び出し側が決めます。結果は破棄されます。

```csharp
await EditorTask.Run(File.WriteAllTextAsync(path, text));
```

### Run&lt;T&gt;(Task&lt;T&gt; task)

```csharp
public static Task<T> Run<T>(Task<T> task)
```

非ジェネリックのオーバーロードと同じですが、`task` の結果を返されるタスクへ引き継ぎます。

## CustomDialogWindow

`io.github.ykysnk.utils.Editor` · `public class CustomDialogWindow : EditorWindow`

メッセージ、Ok ボタン、任意の Cancel ボタンを持つフローティングのユーティリティウィンドウで、`EditorUtils` が使います。モーダルでは
ありません。ウィンドウはコールバックで結果を報告して自身を閉じ、テキストはコンテキストメニューからコピーできます。

ウィンドウは 500×250 に固定され、メインのエディタウィンドウの中央に `ShowUtility` で表示されます。まだ開いているダイアログは先に
閉じられ、その保留中の結果はキャンセルとして報告されます。ボタンを押さずにウィンドウを閉じた場合もキャンセルです。
`waitTime` を
設定すると、Ok のキャプションがカウントダウンし、0 になるまでボタンは無効のままです。

このクラスが宣言するメンバーはすべて private か internal なので、ダイアログは `EditorUtils.DisplayDialog` または
`EditorUtils.DisplayDialogAsync` から作成し、ウィンドウの引数をそのまま渡します。
