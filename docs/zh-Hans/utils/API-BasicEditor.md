# BasicEditor

`io.github.ykysnk.utils.Editor` · `public abstract class BasicEditor : UnityEditor.Editor`

自定义检视器的基类：在 try/catch 中执行绘制代码，并在抛出异常时显示一致的错误 UI，同时支持 IMGUI 与 UI Toolkit 检视器。

IMGUI 检视器重写 `OnErrorHandleInspectorGUI`，UI Toolkit 检视器重写 `CreateErrorHandleInspectorGUI`；两者的主体都受到保护。`OnInspectorGUI` 仍负责更新序列化对象、应用已修改的属性并上报变更，因此主体只需负责绘制。

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

## ErrorEvent

```csharp
public delegate void ErrorEvent(Exception e, Type type);
```

接收从检视器主体中逃逸的异常，以及抛出它的检视器技术。通过 `OnErrorEvent` 订阅。

## Type

```csharp
public enum Type
{
    UGUI,
    UIToolkit
}
```

失败的是哪种检视器技术：`UGUI` 是传统的 IMGUI 检视器，`UIToolkit` 是 `CreateInspectorGUI` 中构建的 UI Toolkit 检视器。

## OnErrorEvent

```csharp
public static event ErrorEvent? OnErrorEvent;
```

在捕获异常并绘制错误 UI 之后触发，供需要上报的工具使用。它是 static 的，因此包内所有检视器共享同一批订阅者。

## OnEnable

```csharp
protected virtual void OnEnable()
```

Unity 回调。重写它以初始化检视器；主体不受保护，因此这里抛出的异常不会被本类捕获。

## OnInspectorGUI

```csharp
public override void OnInspectorGUI()
```

更新序列化对象，在设置 `IsBaseOnOldInspectorGUI` 时先绘制 Unity 的默认检视器，然后在 `Try.Run` 中执行 `OnErrorHandleInspectorGUI`。失败时可选择写入日志、调用 `OnError` 与 `OnErrorEvent`，并绘制 IMGUI 错误 UI。主体上报了变更时，先执行 `OnChange`，然后应用已修改的属性。

## CreateInspectorGUI

```csharp
public override VisualElement? CreateInspectorGUI()
```

在 `Try.Run` 中构建 `CreateErrorHandleInspectorGUI`。失败时上报异常并返回 `BasicEditorErrorUI.uxml` 的 UI Toolkit 错误 UI，其中显示消息、异常类型、可复制的堆栈跟踪和 Copy 按钮。若该资源无法加载，则改为返回 `CreateUxmlImportErrorUI()`。

## OnErrorHandleInspectorGUI

```csharp
protected virtual void OnErrorHandleInspectorGUI()
```

绘制 IMGUI 检视器主体。请重写它而不是 `OnInspectorGUI`：异常会被捕获并替换为错误 UI。

## CreateErrorHandleInspectorGUI

```csharp
protected virtual VisualElement? CreateErrorHandleInspectorGUI()
```

构建 UI Toolkit 检视器主体。请重写它：异常会被捕获并替换为错误 UI。默认返回 `null`，此时保留 Unity 自带的检视器。

## OnChange

```csharp
protected virtual void OnChange()
```

在检视器主体上报变更之后、应用已修改的属性之前调用。仅在 IMGUI 下执行，因为 UI Toolkit 路径没有自己的变更检查。

## OnError

```csharp
protected virtual void OnError(Exception e, Type type)
```

对从检视器主体捕获的每个异常，在绘制错误 UI 之前调用。重写它以添加自定义日志或恢复处理。

## DrawErrorUI

```csharp
protected virtual void DrawErrorUI(Exception e)
```

绘制 IMGUI 错误 UI，结构与 `BasicEditorErrorUI.uxml` 一致：`HelpBox` 中只有消息、带异常类型和 Copy 按钮的表头行，以及可滚动、可选择的详情框。详情框随内容增长，达到 140 像素后开始滚动；Details 折叠项默认展开。

## IsBaseOnOldInspectorGUI

```csharp
protected virtual bool IsBaseOnOldInspectorGUI { get; }
```

`OnInspectorGUI` 是否在自定义主体之前绘制 Unity 的默认检视器。默认为 false。

## ConsoleLog

```csharp
protected virtual bool ConsoleLog { get; }
```

捕获的异常是否同时用 `Debug.LogException` 写入控制台。默认为 false；无论哪种情况都会显示错误 UI。

## ErrorTitle

```csharp
protected static string ErrorTitle(Exception e)
```

错误 UI 中显示的单行标题：`Editor Error: {message}`。

## ErrorDetails

```csharp
protected static string ErrorDetails(Exception e)
```

可复制的错误文本：消息后跟原始堆栈跟踪。

## CreateUxmlImportErrorUI

```csharp
public static VisualElement CreateUxmlImportErrorUI()
```

`BasicEditorErrorUI.uxml` 本身无法加载时使用的错误 UI。它是一个内容为 `Failed to load uxml assets, please reimport the package to fix this issue.` 的错误帮助框。

## CreateHelpUI

```csharp
public static VisualElement CreateHelpUI(string message, HelpBoxMessageType type = HelpBoxMessageType.Info)
```

构建只包含一个 `HelpBox` 的可视元素树，消息与类型由参数给出。

```csharp
var ui = BasicEditor.CreateHelpUI("Nothing to configure yet.");
```

## CreateInfoUI

```csharp
public static VisualElement CreateInfoUI(string errorMessage)
```

构建带信息消息的 UI Toolkit 帮助框。

## CreateErrorUI

```csharp
public static VisualElement CreateErrorUI(string errorMessage)
```

构建带错误消息的 UI Toolkit 帮助框。

## CreateWarningUI

```csharp
public static VisualElement CreateWarningUI(string errorMessage)
```

构建带警告消息的 UI Toolkit 帮助框。
