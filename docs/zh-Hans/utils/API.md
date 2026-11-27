# API

该包发布三个程序集。下面列出的所有内容都是公开的；过时的成员也包括在内，因为它们仍然可以编译。

| 程序集                            | 命名空间                                       | 内容                                                |
|-----------------------------------|------------------------------------------------|-----------------------------------------------------|
| `io.github.ykysnk.utils`          | `io.github.ykysnk.utils`                       | `Utils`、`IUtilsEditorOnly`、`BasicEditorComponent` |
| `io.github.ykysnk.utils.non-udon` | `io.github.ykysnk.utils.NonUdon`               | `BooleanVector3`、`ColorHex`                        |
| `io.github.ykysnk.utils.Editor`   | `io.github.ykysnk.utils.Editor` 及其子命名空间 | 检视器基类、GUI 辅助方法、菜单、UPM 客户端、绘制器  |

## Utils

`io.github.ykysnk.utils` · `public static class Utils`

可以在 Udon 中安全调用的小型辅助方法：带彩色前缀的日志，以及若干状态检查。

前缀以 `[prefix]` 形式、用 `#D771C0` 颜色绘制。每个日志与断言成员都带有 `[HideInCallstack]`，因此控制台条目指向
调用方，而不是本文件。

### Log(string prefix, object message)

```csharp
public static void Log(string prefix, object message)
```

用 `Debug.Log` 写出 `[prefix] message`。`prefix` 是着色的部分；`message` 为 null 时记录空值。

```csharp
Utils.Log(nameof(MyWindow), "Opened");
```

### Log(string prefix, object message, Object context)

```csharp
public static void Log(string prefix, object message, UnityEngine.Object context)
```

与双参数重载相同，点击控制台条目时会高亮 `context`。

### LogWarning(string prefix, object message)

```csharp
public static void LogWarning(string prefix, object message)
```

用 `Debug.LogWarning` 写出带前缀的消息。

### LogWarning(string prefix, object message, Object context)

```csharp
public static void LogWarning(string prefix, object message, UnityEngine.Object context)
```

警告重载，点击控制台条目时会高亮 `context`。

### LogError(string prefix, object message)

```csharp
public static void LogError(string prefix, object message)
```

用 `Debug.LogError` 写出带前缀的消息。

### LogError(string prefix, object message, Object context)

```csharp
public static void LogError(string prefix, object message, UnityEngine.Object context)
```

错误重载，点击控制台条目时会高亮 `context`。

### LogAssert(bool condition, string prefix, object message)

```csharp
[Obsolete("Use Assert(bool condition, string prefix, object message) instead")]
public static void LogAssert(bool condition, string prefix, object message)
```

为兼容性保留；它只是把带前缀的消息转发给 `Debug.Assert`。请改用 `Assert`。

### LogAssert(bool condition, string prefix, object message, Object context)

```csharp
[Obsolete("Use Assert(bool condition, string prefix, object message, Object context) instead")]
public static void LogAssert(bool condition, string prefix, object message, UnityEngine.Object context)
```

为兼容性保留；请改用 `Assert`。

### Assert(bool condition, string prefix, object message)

```csharp
public static void Assert(bool condition, string prefix, object message)
```

通过 `Debug.Assert` 断言 `condition`，失败时以彩色前缀报告消息。

```csharp
Utils.Assert(path != null, nameof(MyWindow), "Path must be set");
```

### Assert(bool condition, string prefix, object message, Object context)

```csharp
public static void Assert(bool condition, string prefix, object message, UnityEngine.Object context)
```

与三参数重载相同，点击控制台条目时会高亮 `context`。

### IsMoved(float value)

```csharp
public static bool IsMoved(float value)
```

每帧增量是否算作移动：`value < -0.05f || value > 0.05f`。比较是严格的，因此恰好为 `0.05f` 的增量不算移动。

### IsInPrefab2()

```csharp
public static bool IsInPrefab2()
```

编辑器是否处于预制体编辑模式。在播放器中始终为 false。这是在 Udon 中安全可用的名称。

### IsPlaying2()

```csharp
public static bool IsPlaying2()
```

播放模式是否处于激活或即将开始的状态。在播放器中始终为 true。这是在 Udon 中安全可用的名称。

### IsInPrefab

```csharp
public static bool IsInPrefab { get; }
```

`IsInPrefab2` 的属性形式。定义 `COMPILER_UDONSHARP` 时不会被编译，因为它依赖 `PrefabStageUtility`。

### IsPlaying

```csharp
public static bool IsPlaying { get; }
```

`IsPlaying2` 的属性形式。定义 `COMPILER_UDONSHARP` 时不会被编译，因为它依赖 `EditorApplication`。

### ToLayer(LayerMask mask)

```csharp
public static int ToLayer(LayerMask mask)
```

返回单层掩码对应的层索引，即其最高置位的位置。掩码为 0 时返回 31，这正是位遍历产生的结果。

```csharp
var layer = Utils.ToLayer(LayerMask.GetMask("Water"));
```

## IUtilsEditorOnly

`io.github.ykysnk.utils` · `public interface IUtilsEditorOnly`

用于标记应从构建中剥离的行为的标记接口。它不声明任何成员；定义 `UTILS_NDMF` 时它继承
`nadena.dev.ndmf.INDMFEditorOnly`，定义 `UTILS_VRC_SDK3_BASE` 时继承 `VRC.SDKBase.IEditorOnly`，其余情况下只是
一个空标记。

## BasicEditorComponent

`io.github.ykysnk.utils` · `public abstract class BasicEditorComponent : MonoBehaviour, IUtilsEditorOnly`

用于辅助行为的空基类，这些行为不应保留到上传的头像或世界中。它本身不添加任何成员；从它派生后，构建流程会通过
`IUtilsEditorOnly` 移除该组件。

## BooleanVector3

`io.github.ykysnk.utils.NonUdon` · `public struct BooleanVector3 : IEquatable<BooleanVector3>`

三个独立的布尔值，以普通的可序列化字段保存，并提供 `Flags` 视图把它们打包成单个位掩码，便于做类似 switch 的
判断。

### x, y, z

```csharp
public bool x;
public bool y;
public bool z;
```

X、Y、Z 分量是否被设置。

### Flags

```csharp
public int Flags { get; set; }
```

三个分量以 `Flag` 值的掩码表示。给掩码赋值会覆盖全部三个分量，因此掩码未涉及的分量会被清除。赋值时
`Flag.All` 之外的位会被丢弃。

### Flag

```csharp
public enum Flag
{
    X = 1 << 0,
    Y = 1 << 1,
    Z = 1 << 2,
    None = 0,
    All = X | Y | Z
}
```

单个分量或它们组合的位选择器。

### HasFlag(Flag flag)

```csharp
public bool HasFlag(Flag flag)
```

`flag` 的每一位当前是否都已设置。`Flag.None` 始终匹配。

### HasFlags(params Flag[] flags)

```csharp
public bool HasFlags(params Flag[] flags)
```

`flags` 覆盖的每一位是否都已设置。空数组匹配一切。

### AddFlag(Flag flag)

```csharp
public void AddFlag(Flag flag)
```

设置 `flag` 的位，其他分量保持不变。

### AddFlags(params Flag[] flags)

```csharp
public void AddFlags(params Flag[] flags)
```

设置 `flags` 覆盖的位，其他分量保持不变。空数组不做任何更改。

### RemoveFlag(Flag flag)

```csharp
public void RemoveFlag(Flag flag)
```

清除 `flag` 的位，其他分量保持不变。

### RemoveFlags(params Flag[] flags)

```csharp
public void RemoveFlags(params Flag[] flags)
```

清除 `flags` 覆盖的位，其他分量保持不变。空数组不做任何更改。

### SetFlag(Flag flag)

```csharp
public void SetFlag(Flag flag)
```

用 `flag` 替换整个掩码，因此它未涉及的分量会被清除。

### SetFlags(params Flag[] flags)

```csharp
public void SetFlags(params Flag[] flags)
```

用 `flags` 的并集替换整个掩码。空数组会清除全部三个分量。

### Set(bool x2, bool y2, bool z2)

```csharp
public void Set(bool x2, bool y2, bool z2)
```

一次调用设置全部三个分量。

### Set(BooleanVector3 other)

```csharp
public void Set(BooleanVector3 other)
```

从 `other` 复制全部三个分量。

### SetAll(bool value)

```csharp
public void SetAll(bool value)
```

给 X、Y、Z 赋予相同的值。

### Invert()

```csharp
public void Invert()
```

就地取反每个分量。

### SetX(bool value), SetY(bool value), SetZ(bool value)

```csharp
public void SetX(bool value)
public void SetY(bool value)
public void SetZ(bool value)
```

设置单个分量。

### SetTrue(), SetFalse()

```csharp
public void SetTrue()
public void SetFalse()
```

`SetAll(true)` 与 `SetAll(false)`。

### True, False

```csharp
public static BooleanVector3 True { get; }
public static BooleanVector3 False { get; }
```

三个分量全部设置或全部清除的新向量。

### ToString()

```csharp
public override string ToString()
```

渲染为 `BooleanVector3(x:…,y:…,z:…)`。

### operator !(BooleanVector3)

```csharp
public static BooleanVector3 operator !(BooleanVector3 booleanVector3)
```

返回取反后的副本；操作数按值传递，不会被修改。

### operator true, operator false

```csharp
public static bool operator true(BooleanVector3 booleanVector3)
public static bool operator false(BooleanVector3 booleanVector3)
```

仅当三个分量全部设置时才为 `true`，因此 `if (vector)` 相当于三重 AND。至少有一个分量被清除时为 `false`；为了
支持 `&&` 和 `||`，编译器要求它与 `operator true` 一同提供。

### Equals(BooleanVector3), Equals(object), GetHashCode()

```csharp
public bool Equals(BooleanVector3 other)
public override bool Equals(object? obj)
public override int GetHashCode()
```

按分量比较相等，以及由三个字段构建的哈希码。

## ColorHex

`io.github.ykysnk.utils.NonUdon` · `public struct ColorHex`

一个 `Color` 及其 HTML 十六进制形式，因此颜色可以作为文本被序列化和查看。只有运算符会同时更新两个字段；直接给
某个字段赋值不会改变另一个字段，而默认初始化的结构在 `hex` 为 null 时会从 `color` 推导其文本。

### color

```csharp
public Color color;
```

`hex` 所表示的颜色值。

### hex

```csharp
public string hex;
```

以 `#RRGGBBAA` 表示的颜色，包含开头的 `#`。该字段被直接读取，因此在默认初始化的结构中可能为 null；此时转换会
回退到 `color`。

### ToString()

```csharp
public override string ToString()
```

以 `Color: …, Hex: …` 渲染两个字段，`hex` 为 null 时从 `color` 推导十六进制文本。

### implicit operator string(ColorHex)

```csharp
public static implicit operator string(ColorHex colorHex)
```

返回十六进制文本，因此只要期望颜色字符串的地方都能使用该结构。永不为 null。

### implicit operator Color(ColorHex)

```csharp
public static implicit operator Color(ColorHex colorHex)
```

返回 `color`，因此该结构可以直接当作颜色使用。

### implicit operator ColorHex(string)

```csharp
public static implicit operator ColorHex(string hex)
```

解析 HTML 颜色字符串。`ColorUtility.TryParseHtmlString` 拒绝的文本会变成白色而不是报错，并且 `hex` 会依据解析
后的颜色重写，因此保存的文本是规范化后的结果，而不是原样保留。

### implicit operator ColorHex(Color)

```csharp
public static implicit operator ColorHex(Color color)
```

包装一个颜色并推导其 `#RRGGBBAA` 文本。

## BasicEditor

`io.github.ykysnk.utils.Editor` · `public abstract class BasicEditor : UnityEditor.Editor`

自定义检视器的基类，它在 try/catch 中运行绘制代码，并在抛出异常时显示一致的错误 UI，同时适用于 IMGUI 和
UI Toolkit 检视器。

```csharp
[CustomEditor(typeof(MyBehaviour))]
public class MyBehaviourEditor : BasicEditor
{
    protected override void OnErrorHandleInspectorGUI()
    {
        EditorGUILayout.LabelField("Hello");
    }
}
```

### ErrorEvent

```csharp
public delegate void ErrorEvent(Exception e, Type type);
```

接收逃逸出检视器主体的异常。

### Type

```csharp
public enum Type
{
    UGUI,
    UIToolkit
}
```

出错的检视器技术：经典的 IMGUI 检视器，或在 `CreateInspectorGUI` 中构建的 UI Toolkit 检视器。

### OnErrorEvent

```csharp
public static event ErrorEvent? OnErrorEvent;
```

在捕获异常并绘制错误 UI 之后触发，供需要上报的相关工具使用。

### IsBaseOnOldInspectorGUI

```csharp
protected virtual bool IsBaseOnOldInspectorGUI { get; }
```

`OnInspectorGUI` 是否在自定义主体之前绘制 Unity 的默认检视器。默认为 false。

### ConsoleLog

```csharp
protected virtual bool ConsoleLog { get; }
```

捕获的异常是否还会用 `Debug.LogException` 写出。默认为 false；无论是否如此，错误 UI 都会显示。

### OnEnable()

```csharp
protected virtual void OnEnable()
```

用于初始化的 Unity 回调。它不设保护，因此这里抛出的异常不会被基类捕获。

### OnInspectorGUI()

```csharp
public override void OnInspectorGUI()
```

更新序列化对象，在设置了 `IsBaseOnOldInspectorGUI` 时绘制基础检视器，然后在 `Try.Run` 中运行
`OnErrorHandleInspectorGUI`。失败时它会视设置记录日志，调用 `OnError` 和 `OnErrorEvent`，并绘制 IMGUI 错误
UI。当主体报告了更改时，`OnChange` 会在应用被修改的属性之前运行。

### CreateInspectorGUI()

```csharp
public override VisualElement? CreateInspectorGUI()
```

在 `Try.Run` 中构建 `CreateErrorHandleInspectorGUI`。失败时它会上报异常，并返回来自 `BasicEditorErrorUI.uxml`
的 UI Toolkit 错误 UI；若该资源无法加载，则返回 `CreateUxmlImportErrorUI()`。

### CreateUxmlImportErrorUI()

```csharp
public static VisualElement CreateUxmlImportErrorUI()
```

当 `BasicEditorErrorUI.uxml` 本身无法加载时使用的错误 UI。

### CreateInfoUI(string errorMessage)

```csharp
public static VisualElement CreateInfoUI(string errorMessage)
```

构建带信息消息的 UI Toolkit 帮助框。

### CreateErrorUI(string errorMessage)

```csharp
public static VisualElement CreateErrorUI(string errorMessage)
```

构建带错误消息的 UI Toolkit 帮助框。

### CreateWarningUI(string errorMessage)

```csharp
public static VisualElement CreateWarningUI(string errorMessage)
```

构建带警告消息的 UI Toolkit 帮助框。

### CreateHelpUI(string message, HelpBoxMessageType type = HelpBoxMessageType.Info)

```csharp
public static VisualElement CreateHelpUI(string message, HelpBoxMessageType type = HelpBoxMessageType.Info)
```

构建仅包含一个 `HelpBox` 的可视树。

### ErrorTitle(Exception e)

```csharp
protected static string ErrorTitle(Exception e)
```

错误 UI 中显示的单行标题：`Editor Error: {message}`。

### ErrorDetails(Exception e)

```csharp
protected static string ErrorDetails(Exception e)
```

可复制的错误文本：消息后跟原始堆栈跟踪。

### DrawErrorUI(Exception e)

```csharp
protected virtual void DrawErrorUI(Exception e)
```

绘制 IMGUI 错误 UI，与 `BasicEditorErrorUI.uxml` 相对应：消息放在 `HelpBox` 中，一行标题包含异常类型和
Copy 按钮，详情放在可选中的框里，该框随内容增长，达到 140 像素后开始滚动。

### OnChange()

```csharp
protected virtual void OnChange()
```

在检视器主体报告更改之后、应用被修改的属性之前调用。

### OnError(Exception e, Type type)

```csharp
protected virtual void OnError(Exception e, Type type)
```

对从检视器主体捕获的每个异常调用，在绘制错误 UI 之前。可重写以添加自定义日志或恢复逻辑。

### OnErrorHandleInspectorGUI()

```csharp
protected virtual void OnErrorHandleInspectorGUI()
```

绘制 IMGUI 检视器主体。请重写它而不是 `OnInspectorGUI`：异常会被捕获并替换为错误 UI。

### CreateErrorHandleInspectorGUI()

```csharp
protected virtual VisualElement? CreateErrorHandleInspectorGUI()
```

构建 UI Toolkit 检视器主体。请重写它：异常会被捕获并替换为错误 UI。

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

## MenuItemObject

`io.github.ykysnk.utils.Editor` · `public class MenuItemObject`

由 `MenuExtensions` 保持注册的菜单项描述：路径、快捷键、勾选状态、排序优先级以及 Unity 所需的回调。

### MenuItemObject(string name, string shortcut, bool @checked, int priority, Action execute, Func&lt;bool&gt;? validate)

```csharp
public MenuItemObject(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
```

创建菜单项的完整描述。`name` 是菜单路径，按 Unity 清理特性声明路径的同样方式清理，因此两类菜单项最终会落在同一
路径下。`validate` 决定该项是否可用；null 表示始终可用。

### MenuItemObject(string name, string shortcut, int priority, Action execute)

```csharp
public MenuItemObject(string name, string shortcut, int priority, Action execute)
```

创建一个未勾选、且没有校验回调的菜单项。

### MenuItemObject(string name, int priority, Action execute)

```csharp
public MenuItemObject(string name, int priority, Action execute)
```

创建一个未勾选、没有快捷键和校验回调的菜单项。

### MenuItemObject(string name, Action execute)

```csharp
public MenuItemObject(string name, Action execute)
```

创建使用该类默认优先级的菜单项：`GameObject/Create Other` 下为 10，其他位置为 1000，与 Unity 自身的排序一致。

### Name

```csharp
public string Name { get; private set; }
```

清理后的菜单路径；这是跟踪该项所用的键。

### Shortcut

```csharp
public string Shortcut { get; private set; }
```

传给 Unity 的快捷键字符串，例如 `#%g`；没有快捷键时为空。

### Checked

```csharp
public bool Checked { get; private set; }
```

Unity 是否以勾选标记绘制该项。

### Priority

```csharp
public int Priority { get; private set; }
```

子菜单内的排序顺序；较小的值先绘制。

### Execute

```csharp
public Action Execute { get; private set; }
```

选择该项时运行的动作。

### Validate

```csharp
public Func<bool>? Validate { get; private set; }
```

决定该项是否可用的谓词；始终可用时为 null。

## MenuWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuWrap`

对编辑器菜单栏背后的 `UnityEditor.Menu` 内部部分的反射包装。这些成员是未文档化的编辑器内部实现，并非公开
API，因此 Unity 可能在任意版本中重命名或移除它们；正是这个包装让菜单项能够在运行时被添加、更改和移除。

### SetHotkey(string menuPath, string hotkey)

```csharp
public static void SetHotkey(string menuPath, string hotkey)
```

设置显示在现有菜单项旁的快捷键。

### ExtractSubmenus(string menuPath)

```csharp
public static string[] ExtractSubmenus(string menuPath)
```

列出给定路径下存在的子菜单；没有子菜单时为空。

### AddMenuItem(string name, string shortcut, bool @checked, int priority, Action execute, Func&lt;bool&gt;? validate)

```csharp
public static void AddMenuItem(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
```

在运行时注册菜单项，无需 `MenuItem` 特性。

### AddSeparator(string name, int priority)

```csharp
public static void AddSeparator(string name, int priority)
```

在给定的路径和优先级添加一条分隔条目。

### RemoveMenuItem(string name)

```csharp
public static void RemoveMenuItem(string name)
```

移除在给定路径下注册的菜单项。

### RebuildAllMenus()

```csharp
public static void RebuildAllMenus()
```

由已注册的菜单项重建整个菜单栏。

### MenuItemExists(string menuPath)

```csharp
public static bool MenuItemExists(string menuPath)
```

当前是否在给定路径下注册了菜单项。

## MenuServiceWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuServiceWrap`

对内部 `UnityEditor.MenuService` 类的反射包装。这些成员不是公开 API，因此 Unity 可能在任意版本中重命名或移除
它们。

### SanitizeMenuItemName(string menuName)

```csharp
public static string SanitizeMenuItemName(string menuName)
```

执行 Unity 自己的菜单路径清理，因此在运行时添加的路径会按 Unity 从 `MenuItem` 特性注册时的完全相同方式注册。
返回 Unity 注册该项所用的路径。

### ValidateMethodForMenuCommand(MethodInfo methodInfo)

```csharp
public static bool ValidateMethodForMenuCommand(MethodInfo methodInfo)
```

使用 Unity 对 `MenuItem` 方法所采用的同一套规则，询问 Unity 某个方法能否用作菜单命令。

## EditorUtilityWrap

`io.github.ykysnk.utils.Editor` · `public static class EditorUtilityWrap`

对 `EditorUtility` 内部部分的反射包装。该成员不是公开 API，因此 Unity 可能在任意版本中重命名或移除它。

### Internal_UpdateAllMenus

```csharp
public static readonly WrapAction Internal_UpdateAllMenus;
```

内部的 `EditorUtility.Internal_UpdateAllMenus` 方法，它让 Unity 重建其菜单。在运行时添加菜单项之后需要它。

## MenuExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class MenuExtensions`

在编辑器重建菜单期间，保持运行时添加的菜单项仍然注册。当层级结构变化时，已不再存在的项会通过 `MenuWrap` 重新
添加，随后运行 `EditorUtilityWrap.Internal_UpdateAllMenus`。

### AddMenuItem(MenuItemObject menuItemObject)

```csharp
public static bool AddMenuItem(MenuItemObject menuItemObject)
```

让菜单项在菜单重建之间保持注册。当相同路径的菜单项已注册时返回 false。

```csharp
MenuExtensions.AddMenuItem(new MenuItemObject("Tools/My Tool/Do Something", "#%g", 1000, DoSomething));
```

### RemoveMenuItem(string name)

```csharp
public static MenuItemObject? RemoveMenuItem(string name)
```

不再让给定路径的菜单项保持注册，并返回该项。菜单条目本身不会被移除；这只会阻止它在重建后再次被添加。

## RequestExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class RequestExtensions`

把包管理器请求转换为在编辑器循环中完成的任务，因此等待的代码可以留在主线程上。

### AsTask&lt;T&gt;(this T request)

```csharp
public static Task<T> AsTask<T>(this T request) where T : Request
```

等待一个包管理器请求。请求通过 `EditorApplication.update` 轮询，任务随后在 `EditorApplication.delayCall` 中
完成，因此等待的延续会在主线程上以较浅的调用栈恢复。具体请求类型会被保留，因此调用方可以读取其 `Result`。

### AsTask&lt;T&gt;(this T request, CancellationToken token)

```csharp
public static Task<T> AsTask<T>(this T request, CancellationToken token) where T : Request
```

与无参数重载相同，但在标记被取消时停止等待。请求本身不会被取消，只是不再被观察。

## TaskExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class TaskExtensions`

通过 `EditorApplication.update` 轮询任务，并通过回调报告结果，供无法使用 await 的调用方（例如检视器和菜单
代码）使用。

### WaitEditor(this Task task, Action onCompleted, Action&lt;Exception&gt;? onError = null)

```csharp
public static void WaitEditor(this Task task, Action onCompleted, Action<Exception>? onError = null)
```

任务完成后在编辑器循环中调用 `onCompleted`。出错的任务会把实际抛出的异常（聚合包装会被解包）传给 `onError`，
被取消的任务则传入 `TaskCanceledException`。`onError` 为 null 时失败会被静默处理。

### WaitEditor&lt;T&gt;(this Task&lt;T&gt; task, Action&lt;T&gt; onCompleted, Action&lt;Exception&gt;? onError = null)

```csharp
public static void WaitEditor<T>(this Task<T> task, Action<T> onCompleted, Action<Exception>? onError = null)
```

与非泛型重载相同，但会把任务的结果传给 `onCompleted`。

## UpmInstaller

`io.github.ykysnk.utils.Editor` · `public static class UpmInstaller`

从编辑器代码安装、移除和更新 Unity 包管理器包。每个操作都会显示一个粘性的编辑器进度条，其取消按钮可停止该
操作，除非编辑器此刻正在编译或更新。安装、移除和升级共用一把锁，因此同一时间只有一个在运行；第二次调用会直接
返回而不做任何事。

### Install(string[] packages)

```csharp
public static void Install(string[] packages)
```

开始安装给定的包并立即返回。条目可以是 `name` 或 `name@version`。

```csharp
UpmInstaller.Install(new[] { "io.github.ykysnk.localization@0.11.0" });
```

### InstallAsync(string[] packages)

```csharp
public static Task InstallAsync(string[] packages)
```

安装给定的包，并在全部处理完成后完成。

### InstallAsync(string[] packages, CancellationToken token)

```csharp
public static Task InstallAsync(string[] packages, CancellationToken token)
```

安装给定的包。已经安装为所请求版本的条目会被跳过；失败的条目会被记录，其余条目仍会继续处理。取消 `token`
会停止操作而不抛出异常，进度条以已取消状态关闭。

### Remove(string[] packages)

```csharp
public static void Remove(string[] packages)
```

开始移除给定的包并立即返回。

### RemoveAsync(string[] packages)

```csharp
public static Task RemoveAsync(string[] packages)
```

移除给定的包，并在全部处理完成后完成。

### RemoveAsync(string[] packages, CancellationToken token)

```csharp
public static Task RemoveAsync(string[] packages, CancellationToken token)
```

移除给定的包。失败的包会被记录，其余包仍会继续处理。取消 `token` 会停止操作而不抛出异常。

### UpdateAsync()

```csharp
public static Task<string[]> UpdateAsync()
```

只检查从注册表安装的包，并列出版本较新的那些。内置、嵌入和本地包没有注册表更新，因此会跳过。搜索会并行执行，
单个搜索超过 5 秒会被放弃。返回形如 `name@version` 的条目，没有任何过期项时为空。

### UpdateAsync(CancellationToken token)

```csharp
public static Task<string[]> UpdateAsync(CancellationToken token)
```

与无参数重载相同；标记会停止检查，正在进行的搜索不会被中止。失败之前找到的条目仍会被返回。

### Upgrade()

```csharp
public static void Upgrade()
```

检查更新并开始安装，然后立即返回。

### UpgradeAsync()

```csharp
public static Task UpgradeAsync()
```

检查更新并安装它们。所有包都是最新时不执行任何操作。

### UpgradeAsync(CancellationToken token)

```csharp
public static Task UpgradeAsync(CancellationToken token)
```

检查更新并安装它们。所有包都是最新、或已有安装/移除正在进行时不执行任何操作。标记会停止更新检查或随后的
安装而不抛出异常。

## BooleanVector3Drawer

`io.github.ykysnk.utils.Editor` · `public class BooleanVector3Drawer : PropertyDrawer`

把 `BooleanVector3` 绘制为一行中的三个 X/Y/Z 开关，方式与 Unity 绘制 `Vector3` 相同，复用内置的多属性字段。
通过 `[CustomPropertyDrawer(typeof(BooleanVector3))]` 注册。

### OnGUI(Rect position, SerializedProperty property, GUIContent label)

```csharp
public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
```

绘制标签，随后是三个分量开关，并通过序列化属性写回编辑。视图宽度低于约 332 像素时，开关会占满整个控件矩形，
因为带前缀的矩形容纳不下它们。

## ColorHexDrawer

`io.github.ykysnk.utils.Editor` · `public class ColorHexDrawer : PropertyDrawer`

把 `ColorHex` 绘制为 Unity 的色块，并把选中的颜色同时写回序列化的十六进制字符串，因此通过色块所做的编辑会让
两个字段保持同步。通过 `[CustomPropertyDrawer(typeof(ColorHex))]` 注册。

### OnGUI(Rect position, SerializedProperty property, GUIContent label)

```csharp
public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
```

绘制标签，随后是色块。更改会以 `#RRGGBBAA` 形式同时写入 `color` 和 `hex` 两个子属性。

## ReflectionUtils

`io.github.ykysnk.utils.NonUdon` · `public static class ReflectionUtils`

用日志代替抛异常反射辅助方法：找不到的成员返回 `null` / `default`，因此可以直接用来探测可选依赖是否存在。

查询结果按类型和名称缓存，找不到的结果也会保留，因此重复调用只需一次字典查找。`FindType` 只缓存已解析的名称，
因为程序集可能稍后才加载。

### Instantiate&lt;T&gt;(Type type)

```csharp
public static T? Instantiate<T>(Type type)
```

用无参构造函数创建实例并转换为 `T`；失败时记录警告并返回 `default`。

### GetNestedMethods(Type? type)

```csharp
public static IEnumerable<MethodInfo> GetNestedMethods(Type? type)
```

惰性枚举 `type` 的嵌套类型声明的所有方法（不论是否 public）。运行时无法枚举的嵌套类型会被跳过。

### GetNestedMethod(Type? type, string name, string? searchName = null)

```csharp
public static MethodInfo? GetNestedMethod(Type? type, string name, string? searchName = null)
```

返回名称包含 `searchName` 的第一个嵌套方法。`searchName` 默认为 `<name>`，也就是编译器给名为 `name` 的成员的
lambda、async 方法体或局部函数生成的名称。

### FindType(string? typeName)

```csharp
public static Type? FindType(string? typeName)
```

在已加载的程序集中解析完整名称（或程序集限定名）；找不到时返回 `null`。

### FindMethod(Type? type, string name)

```csharp
public static MethodInfo? FindMethod(Type? type, string name)
```

返回该名称的第一个方法，不论 public、static 还是继承而来；没有时返回 `null`。仅按名称匹配，存在重载时返回
先找到的那个。

### FindProperty(Type? type, string name)

```csharp
public static PropertyInfo? FindProperty(Type? type, string name)
```

返回该名称的属性（不论是否 public）；没有时返回 `null`。

### GetDeclaredMethods(Type? type)

```csharp
public static IEnumerable<MethodInfo> GetDeclaredMethods(Type? type)
```

返回该类型自身声明的所有方法（不含嵌套类型的），不论是否 public。

## 类型索引

上述页面之外的公开类型，按命名空间分组。用途文本来自每个类型自身的摘要。

### io.github.ykysnk.utils.Extensions

| 类型                   | 用途                                                         |
|------------------------|--------------------------------------------------------------|
| `ComponentExtensions`  | GameObject 与 Transform 辅助方法的组件版本。                 |
| `DictionaryExtensions` | 把缺失键视为默认值的字典读取。                               |
| `FloatExtensions`      | `float` 的噪声移除、容差检查、钳制和取整。                   |
| `GameObjectExtensions` | 层级路径、距离检查以及按索引访问组件。                       |
| `ListExtensions`       | 列表和数组的带边界检查的索引访问与就地编辑辅助方法。         |
| `StringExtensions`     | 分隔字符串（例如 `"Folder/Name/Extension"`）的切片辅助方法。 |
| `Texture2DExtensions`  | 纹理的 GPU 缩放与 alpha 裁剪。                               |
| `TransformExtensions`  | 层级名称、世界/本地缩放转换、未缩放坐标转换以及距离检查。    |
| `Vector3Extensions`    | `Vector3` 的距离、逐分量运算、钳制、取整和方向辅助方法。     |

### io.github.ykysnk.utils.NonUdon

| 类型                                                                                                   | 用途                                                             |
|--------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| `DictionaryWrapper<TKey, TValue>`                                                                      | 以两个并行列表存储的字典形数据，用于 Unity 序列化。              |
| `HashUtils`, `HashType`                                                                                | 使用小写十六进制摘要的文本哈希。                                 |
| `JsonUtils`                                                                                            | 在失败时报告而不是抛出或返回 null 的 `JsonUtility` 包装。        |
| `ListWrapper<T>`                                                                                       | 位于单个序列化字段之后的列表，因此可以存储接口类型的成员。       |
| `ReflectionUtils`, `ReflectionWrapper`, `Reflect`                                                      | 缓存的反射查找、编译委托以及可链式成员访问。                     |
| `ReflectionAccess`, `FieldAccess`, `PropertyAccess`, `MethodAccess`                                    | 支撑 `Reflect` 的访问器类型。                                    |
| `Result<T>`, `ResultExtensions`, `Try`, `Unit`                                                         | 携带失败的结果、链式辅助方法以及无异常执行。                     |
| `Wrapper`                                                                                              | `ListWrapper<T>` 与 `DictionaryWrapper<TKey, TValue>` 的入口点。 |
| `ILogger`, `Logger<T>`                                                                                 | 本包代码所依赖的日志接口及其按类型实现。                         |
| `FieldGetter<T>`, `FieldSetter<T>`, `PropertyGetter<T>`, `PropertySetter<T>`, `WrapAction`, `WrapFunc` | 反射包装使用的委托。                                             |

### io.github.ykysnk.utils.Editor.Patches

| 类型                                           | 用途                                                                       |
|------------------------------------------------|----------------------------------------------------------------------------|
| `IPatch`, `Patch<T>`                           | 作为一个单元应用的一组补丁；子类是其嵌套补丁方法的容器。                   |
| `IPatchLoader`, `PatchLoader<T>`               | 一个程序集的入口点，接收其 Harmony 实例并运行其补丁分组。                  |
| `IPatchMethod`, `PatchMethod<T>`               | 一组 Harmony 补丁：目标方法加上 prefix、postfix、transpiler 和 finalizer。 |
| `IReversePatchMethod`, `ReversePatchMethod<T>` | 反向补丁，其存根接收另一个方法体的可调用副本。                             |
| `ExportsPatchLoader`                           | 声明编辑器加载时要运行的补丁加载器类型的程序集特性。                       |

### io.github.ykysnk.utils.Editor.HarmonyUtilities

| 类型                   | 用途                                                   |
|------------------------|--------------------------------------------------------|
| `CodeCursor`           | 遍历转译器指令的流式游标，提供当前、下一条和历史访问。 |
| `TranspilerExtensions` | 通过 `WithContext` 产出每条指令及其相邻指令。          |

### io.github.ykysnk.utils.Editor.UIElements

| 类型                  | 用途                                                                     |
|-----------------------|--------------------------------------------------------------------------|
| `BooleanVector3Field` | 把 `BooleanVector3` 作为三个开关编辑的 UI Toolkit 字段；可从 UXML 创建。 |
