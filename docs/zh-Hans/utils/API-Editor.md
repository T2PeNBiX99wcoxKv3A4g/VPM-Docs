# 检视器与绘制器

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
