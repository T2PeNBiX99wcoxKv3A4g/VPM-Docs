# UpdateHelper

`io.github.ykysnk.Localization.Editor` · `public class UpdateHelper : IDisposable`

在本地化重新加载或语言变化时，保持一对标签与工具提示同步更新。每个注册都是独立的，因此多个元素可以共用同一个键；元素消失时用 `Dispose` 移除注册。

句柄保存本地化 id、键和回调，加载器用一个列表管理所有仍然有效的句柄，并在重新加载或语言变化后统一调用。释放句柄是停止回调的唯一方式，因此会重建树的窗口必须释放上一次构建所注册的内容。

## Callback

```csharp
public delegate void Callback(string newLabel, string newTooltip)
```

接收所注册键的新标签文本和新工具提示。当键没有工具提示条目时，工具提示为 `""`。

## Register

```csharp
public static UpdateHelper Register(string localizationID, string localizeKey, Callback callback)
public static UpdateHelper Register(string localizationID, SerializedProperty property, Callback callback)
```

为一个本地化 id 的某个键注册 `callback`，并返回可取消注册的句柄。`Register` 本身不会调用回调；它会在下一次语言变化或重新加载时运行，因此请先用 `S` 和 `Tooltip` 设置初始文本。

`SerializedProperty` 重载注册标签属性会使用的键 `label.{Type}.{field}`，该键由目标对象的类型名和属性名推导。

```csharp
var registration = UpdateHelper.Register("io.github.ykysnk.yky-toolkit", "label.my_window.title",
    (label, tooltip) => title.text = label);
```

## Dispose

```csharp
public void Dispose()
```

停止更新回调，并从加载器的列表和按键分组的列表中移除注册。当它所更新的元素被移除时调用；此后回调永远不会再被调用。重复释放不会出错。
