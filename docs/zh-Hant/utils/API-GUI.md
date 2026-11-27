# GUI 輔助工具

## EditorGUILayoutUtility

`io.github.ykysnk.utils.Editor` · `public static class EditorGUILayoutUtility`

套件檢視器共用的快取標籤樣式與版面輔助工具。

### BoldLabel

```csharp
public static GUIStyle BoldLabel { get; }
```

用於區段標題的 15pt 粗體標籤。首次存取時建立，因此會保留當時作用中的編輯器外觀。

### BoldLabel2

```csharp
public static GUIStyle BoldLabel2 { get; }
```

較小的 12pt 粗體標籤，用於 `BoldLabel` 下的子標題。

### Label(string text, string? textTip = null)

```csharp
public static GUIContent Label(string text, string? textTip = null)
```

由文字與選用工具提示建立標籤內容。結果可以傳給任何 `EditorGUILayout` 控制項。

### Line(Color color, float space = 20f, float lineHeight = 1f)

```csharp
public static void Line(Color color, float space = 20f, float lineHeight = 1f)
```

以 `color` 繪製水平線，`space` 的上半在線上方、下半在線下方，因此垂直總空間永遠是 `space`。`lineHeight` 是線條的高度（像素）。

### Line(float space = 20f, float lineHeight = 1f)

```csharp
public static void Line(float space = 20f, float lineHeight = 1f)
```

繪製灰色分隔線；大多數檢視器使用的捷徑。

```csharp
EditorGUILayoutUtility.Line();
```

## EditorGUILayoutUtilityExtensions

`io.github.ykysnk.utils.Editor` · `public static class EditorGUILayoutUtilityExtensions`

讓標籤內容可以直接由字串建立，因此不必寫出 `EditorGUILayoutUtility.Label` 就能附上工具提示。

### Label(this string text, string? textTip = null)

```csharp
public static GUIContent Label(this string text, string? textTip = null)
```

為這段文字建立標籤內容，可選擇附上工具提示。

```csharp
EditorGUILayout.LabelField("Strength".Label("Damage multiplier"));
```

## EditorGUIUtils

`io.github.ykysnk.utils.Editor` · `public static class EditorGUIUtils`

建置會跟隨作用中編輯器外觀的編輯器內容與圖示，讓自訂檢視器顯示與內建檢視器相同的圖示。

### IconContent(string name)

```csharp
public static GUIContent IconContent(string name)
```

依名稱載入內建的編輯器圖示。在深色外觀下，名稱會加上 `d_` 前置字串，這是 Unity 存放淺色版變體的地方。名稱無法解析時，內容的影像為
null。

### IconContent(string text, string name)

```csharp
public static GUIContent IconContent(string text, string name)
```

建立把 `text` 顯示在內建編輯器圖示旁的標籤內容。

### IconTexture(string name)

```csharp
public static Texture IconTexture(string name)
```

只傳回內建編輯器圖示的材質，名稱無法解析時為 null。

## EditorUtils

`io.github.ykysnk.utils.Editor` · `public static class EditorUtils`

包裝 `CustomDialogWindow` 的訊息對話框輔助工具。

### DisplayDialogAsync(string title, string message, string ok = "OK", string cancel = "", int waitTime = 0)

```csharp
public static Task<bool> DisplayDialogAsync(string title, string message,
    string ok = "OK", string cancel = "", int waitTime = 0)
```

顯示對話框並傳回工作；按下 Ok 時結果為 true，按下 Cancel 或在未選擇的情況下關閉視窗時為 false。`waitTime` 是 Ok
按鈕保持停用的秒數；零會關閉延遲。

```csharp
var confirmed = await EditorUtils.DisplayDialogAsync("Delete", "Remove the folder?", "Delete", "Cancel");
```

### DisplayDialog(string title, string message, string ok = "OK", string cancel = "", Action? onOk = null, Action? onCancel = null, int waitTime = 0)

```csharp
public static void DisplayDialog(string title, string message, string ok = "OK", string cancel = "",
    Action? onOk = null, Action? onCancel = null, int waitTime = 0)
```

顯示對話框並透過回呼而不是工作回報答案。未按下按鈕就關閉視窗視為取消。`cancel` 為空時會隱藏 Cancel 按鈕。

## EditorTask

`io.github.ykysnk.utils.Editor` · `public static class EditorTask`

把 .NET 工作調整到編輯器迴圈：傳回的工作會在 `EditorApplication.update` 中完成，因此等待它時會回到允許使用 UnityEditor API
的主執行緒。

### Run(Task task)

```csharp
public static Task Run(Task task)
```

傳回一個在編輯器迴圈看到 `task` 完成後才結束的工作。失敗與取消狀態會被轉送而不是拋出，讓呼叫端自行決定如何處理；任何結果都會被捨棄。

```csharp
await EditorTask.Run(File.WriteAllTextAsync(path, text));
```

### Run&lt;T&gt;(Task&lt;T&gt; task)

```csharp
public static Task<T> Run<T>(Task<T> task)
```

與非泛型多載相同，但會把 `task` 的結果帶到傳回的工作。

## CustomDialogWindow

`io.github.ykysnk.utils.Editor` · `public class CustomDialogWindow : EditorWindow`

帶有訊息、Ok 按鈕與選用 Cancel 按鈕的浮動工具視窗，由 `EditorUtils` 使用。它不是模態：視窗透過回呼回報結果並自行關閉，其文字可以從右鍵選單複製。

視窗固定為 500×250，置中於主編輯器視窗上方，並以 `ShowUtility` 顯示。仍開著的對話框會先被關閉，其待處理結果會以取消回報；未按下按鈕就關閉視窗也視為取消。設定
`waitTime` 時，Ok 的標題會倒數，按鈕會保持停用直到歸零。

這個類別宣告的每個成員都是 private 或 internal，因此對話框需透過 `EditorUtils.DisplayDialog` 或
`EditorUtils.DisplayDialogAsync` 建立，它們會把視窗的引數直接傳入。
