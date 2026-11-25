# API

所有内容都位于 `io.github.ykysnk.Localization.Editor` 命名空间中，且仅在编辑器中可用。

## 获取 helper

helper 会从调用程序集的 `[LocalizationPackage]` 中解析，因此包通常不需要自己创建一个：

```csharp
using io.github.ykysnk.Localization.Editor;

var helper = LocalizationHelper.For(typeof(MyEditorWindow));
```

`LocalizationHelper.For(Assembly)` 和 `For(Type)` 会为每个程序集缓存一个 helper。没有该特性的程序集会记录一条警告，并原样显示键。

## 扩展方法

| 调用 | 结果 |
| --- | --- |
| `"label.my_window.title".S()` | 选中语言中的文本。 |
| `"label.count".Sf(count)` | 将文本交给 `string.Format` 处理。 |
| `"label.my_window.title".G()` | 带有文本及其工具提示的 `GUIContent`。 |
| `"label.my_window.title".Tooltip()` | 工具提示文本。 |
| `property.S()` / `property.G()` / `property.Tooltip()` | 同上，用于从 `SerializedProperty` 派生的键（`label.{Type}.{field}`）。 |
| `tree.UILocalize()` | 替换树中的键并保持其同步更新。 |
| `"label.my_window.title".Register(callback)` | 注册单个键。 |

`UILocalize` 会本地化 `text`、`label` 和 `headerTitle` 属性（以及工具提示），在首帧**之前**运行，并在绑定流程之后再次执行；除非传入 `addLanguagePopup: false`，否则它会先添加语言选择器再返回。

## 语言选择

```csharp
helper.SelectedLanguage;          // "ja-JP"
helper.SetLanguage("en-US");      // switches and updates every localized element
helper.Languages;                 // ["en-US", "ja-JP", ...]
helper.LanguageNames;             // ["English", "日本語", ...]
```

## 选择器控件

```csharp
var picker = helper.CreateLanguagePicker();
settingsCard.Add(picker);
```

`LanguagePicker` 是一个自行构建 `PopupField` 的 `VisualElement`。它会在本地化资源重新加载时重建，跟随在其他地方进行的切换，并可通过 `language-picker` 类设置样式。较旧的 helper `SelectLanguageElement(element, spaceHeight)` 和 `SelectLanguageGUI()` 仍然可用。

## 保持数值同步

```csharp
var registration = helper.UpdateRegister("label.my_window.title", (text, tooltip) =>
{
    label.text = text;
    label.tooltip = tooltip;
});

label.RegisterCallback<DetachFromPanelEvent>(_ => registration.Dispose());
```

回调会立即执行一次，之后每当语言变化或资源重新加载时再次执行。元素消失时务必释放句柄；注册本身是弱引用，但回调会持有该元素。

## 数据与转换

| 类型 | 用途 |
| --- | --- |
| `BasicLocalization` | 单个语言资源：id、显示名称和条目列表。 |
| `BasicTranslate` | 单个条目：`key`、`translate`、`useTooltip`、`tooltip`、`tooltipSuffix`。 |
| `LocalizationConverter` | `ToJson` / `ToPo` 与 `TryImportJson` / `TryImportPo`，供检视器按钮使用。 |
| `TranslateClipboard` | `TryRead` / `HasEntry`，供复制/粘贴按钮使用。 |

## 自定义选择器

通过 helper 读取数据并切换语言即可，无需其他操作：

```csharp
foreach (var index in Enumerable.Range(0, helper.Languages.Count))
{
    var id = helper.Languages[index];
    menu.AppendAction(helper.LanguageNames[index], _ => helper.SetLanguage(id));
}
```
