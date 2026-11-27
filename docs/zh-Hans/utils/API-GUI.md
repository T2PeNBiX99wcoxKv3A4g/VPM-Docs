# GUI 辅助工具

## EditorGUILayoutUtility

`io.github.ykysnk.utils.Editor` · `public static class EditorGUILayoutUtility`

本包各检视器共用的缓存标签样式与布局辅助方法。

### BoldLabel

```csharp
public static GUIStyle BoldLabel { get; }
```

用于节标题的 15pt 粗体标签。首次访问时创建，因此会保留当时生效的编辑器皮肤。

### BoldLabel2

```csharp
public static GUIStyle BoldLabel2 { get; }
```

更小的 12pt 粗体标签，用于 `BoldLabel` 下方的子标题。

### Label(string text, string? textTip = null)

```csharp
public static GUIContent Label(string text, string? textTip = null)
```

由文本和可选的工具提示创建标签内容。结果可以传给任何 `EditorGUILayout` 控件。

### Line(Color color, float space = 20f, float lineHeight = 1f)

```csharp
public static void Line(Color color, float space = 20f, float lineHeight = 1f)
```

以 `color` 绘制一条水平分隔线，`space` 的一半在其上方、一半在下方，因此垂直总空间始终为 `space`。
`lineHeight` 是分隔线的高度（像素）。

### Line(float space = 20f, float lineHeight = 1f)

```csharp
public static void Line(float space = 20f, float lineHeight = 1f)
```

绘制灰色分隔线；这是大多数检视器使用的快捷方式。

```csharp
EditorGUILayoutUtility.Line();
```

## EditorGUILayoutUtilityExtensions

`io.github.ykysnk.utils.Editor` · `public static class EditorGUILayoutUtilityExtensions`

允许从字符串创建标签内容，因此无需写出 `EditorGUILayoutUtility.Label` 就能附加工具提示。

### Label(this string text, string? textTip = null)

```csharp
public static GUIContent Label(this string text, string? textTip = null)
```

为该文本创建标签内容，可附加工具提示。

```csharp
EditorGUILayout.LabelField("Strength".Label("Damage multiplier"));
```

## EditorGUIUtils

`io.github.ykysnk.utils.Editor` · `public static class EditorGUIUtils`

构建跟随当前编辑器皮肤的编辑器内容与图标，使自定义检视器显示与内置检视器相同的图标。

### IconContent(string name)

```csharp
public static GUIContent IconContent(string name)
```

按名称加载内置编辑器图标。在深色皮肤下名称会加上 `d_` 前缀，Unity 把供深色皮肤使用的那套变体存放在那里。名称
无法解析时内容的图像为 null。

### IconContent(string text, string name)

```csharp
public static GUIContent IconContent(string text, string name)
```

创建在内置编辑器图标旁显示 `text` 的标签内容。

### IconTexture(string name)

```csharp
public static Texture IconTexture(string name)
```

仅返回内置编辑器图标的纹理；名称无法解析时返回 null。

## EditorUtils

`io.github.ykysnk.utils.Editor` · `public static class EditorUtils`

包装 `CustomDialogWindow` 的消息对话框辅助方法。

### DisplayDialogAsync(string title, string message, string ok = "OK", string cancel = "", int waitTime = 0)

```csharp
public static Task<bool> DisplayDialogAsync(string title, string message,
    string ok = "OK", string cancel = "", int waitTime = 0)
```

显示对话框并返回一个任务：按下 Ok 时解析为 true，按下 Cancel 或在未做选择的情况下关闭窗口时解析为 false。
`waitTime` 是 Ok 按钮保持禁用的秒数；0 表示不延迟。

```csharp
var confirmed = await EditorUtils.DisplayDialogAsync("Delete", "Remove the folder?", "Delete", "Cancel");
```

### DisplayDialog(string title, string message, string ok = "OK", string cancel = "", Action? onOk = null, Action? onCancel = null, int waitTime = 0)

```csharp
public static void DisplayDialog(string title, string message, string ok = "OK", string cancel = "",
    Action? onOk = null, Action? onCancel = null, int waitTime = 0)
```

显示对话框并通过回调而不是任务报告回答。未按下按钮就关闭窗口视为取消。`cancel` 为空会隐藏 Cancel 按钮。

## EditorTask

`io.github.ykysnk.utils.Editor` · `public static class EditorTask`

把 .NET 任务适配到编辑器循环：返回的任务从 `EditorApplication.update` 完成，因此等待它会在允许使用 UnityEditor
API 的主线程上恢复执行。

### Run(Task task)

```csharp
public static Task Run(Task task)
```

返回一个任务，在编辑器循环看到 `task` 完成后结束。故障与取消状态会被转发而不是抛出，因此由调用方决定如何处理
它们；任何结果都会被丢弃。

```csharp
await EditorTask.Run(File.WriteAllTextAsync(path, text));
```

### Run&lt;T&gt;(Task&lt;T&gt; task)

```csharp
public static Task<T> Run<T>(Task<T> task)
```

与非泛型重载相同，但会把 `task` 的结果带到返回的任务中。

## CustomDialogWindow

`io.github.ykysnk.utils.Editor` · `public class CustomDialogWindow : EditorWindow`

带有消息、Ok 按钮和可选 Cancel 按钮的浮动工具窗口，由 `EditorUtils` 使用。它不是模态的：窗口通过回调报告结果
并自行关闭，其文本可以从右键菜单复制。

窗口固定为 500×250，居中于主编辑器窗口上方，并用 `ShowUtility` 显示。仍处于打开状态的对话框会先被关闭，其待定
结果按取消上报；未按下按钮就关闭窗口同样视为取消。设置了 `waitTime` 时，Ok 的标题会倒计时，按钮在归零之前保持
禁用。

该类声明的每个成员都是 private 或 internal，因此对话框通过 `EditorUtils.DisplayDialog` 或
`EditorUtils.DisplayDialogAsync` 创建，它们会直接透传窗口的参数。
