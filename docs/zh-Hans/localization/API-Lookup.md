# 查找与更新

## LocalizationHelper

```csharp
public class LocalizationHelper
```

为一个本地化 id 查找键，并在语言或数据变化时保持 UI 元素同步更新。请通过 `For` 获取，它会从程序集特性中读取 id。

### LocalizationHelper(string localizationID)

```csharp
public LocalizationHelper(string localizationID)
```

为一个本地化 id 创建辅助实例。优先使用 `For(Assembly)` 或 `For(Type)`，它们会从
`LocalizationPackageAttribute` 读取 id。

### For(Assembly)

```csharp
public static LocalizationHelper For(Assembly assembly)
```

由 `assembly` 的 `LocalizationPackageAttribute` 声明的辅助实例，每个程序集缓存一个。没有该特性时它会记录一条警告
并返回共享的未绑定辅助实例。

### For(Type)

```csharp
public static LocalizationHelper For(Type type)
```

`For(type.Assembly)`；即包含 `type` 的程序集的辅助实例。

### SelectedLanguage

```csharp
public string SelectedLanguage { get; set; }
```

当前选中的语言 id，例如 `ja-JP`。该值保存在 `EditorPrefs` 的 `{localizationID}_Language` 下，默认值为 `en-US`。

赋值会切换语言，并重写所有通过 `UILocalize` 或 `UpdateRegister` 本地化的元素。当该 id 没有加载任何资源时，取值器
会抛出 `ArgumentException`；当语言不在 `Languages` 中时，赋值器也会抛出。

```csharp
helper.SelectedLanguage = "ja-JP";
```

### SetLanguage(string)

```csharp
public void SetLanguage(string language)
```

等同于给 `SelectedLanguage` 赋值。

### Languages

```csharp
public IReadOnlyList<string> Languages { get; }
```

此本地化的语言 id，按显示顺序排列。id 就是 `BasicLocalization` 资源的文件名（`en-US`、`ja-JP`）；列表按显示
名称排序，在资源加载完成前为空。

### LanguageNames

```csharp
public IReadOnlyList<string> LanguageNames { get; }
```

与 `Languages` 逐项对应的显示名称。

```csharp
var ids = helper.Languages;
for (var i = 0; i < ids.Count; i++)
{
    var id = ids[i];
    menu.AppendAction(helper.LanguageNames[i], _ => helper.SetLanguage(id));
}
```

### S(string, string?)

```csharp
public string S(string key, string? defaultValue = null)
```

选中语言下 `key` 的文本。依次回退到 `en-US` 的文本、`defaultValue`，最后回退到键本身，因此缺少翻译时永远不会
抛出异常。选中语言中的空文本同样会回退到英语。

```csharp
label.text = helper.S("label.my_window.title");
```

### S(string, out string?)

```csharp
public bool S(string key, out string? localizationString)
```

查找 `key`，但不会回退到键本身；当没有任何语言提供其文本时返回 false。此时 `localizationString` 为 null。

```csharp
if (helper.S("unity:label.position", out var text))
    label.text = L10n.Tr(text!);
```

### S(SerializedProperty)

```csharp
public string S(SerializedProperty property)
```

由 `property` 推导出的键所对应的文本：`label.{Type}.{field}`。参见
[从 SerializedProperty 生成的键](#keys-from-a-serializedproperty)。

### Sf(string, params object?[])

```csharp
public string Sf(string key, params object?[] args)
```

把 `S(key)` 的结果传给 `string.Format`。与参数不匹配的格式字符串会以 `text(arg1, arg2)` 的形式返回，而不是抛出
异常。

```csharp
var text = helper.Sf("label.found_count", 3);   // "3 assets found"
```

### G(string)

```csharp
public GUIContent G(string key)
```

带有 `key` 文本的 `GUIContent`，工具提示取自其 `:tooltip` 条目。

### G(string, Texture?)

```csharp
public GUIContent G(string key, Texture? image)
```

与 `G(string)` 相同，并使用图标 `image`。

### G(string, Texture?, string?)

```csharp
public GUIContent G(string key, Texture? image, string? tooltip)
```

`key` 的文本、图标 `image`，以及存储在 `tooltip` 键下的文本。

```csharp
GUILayout.Button(helper.G("label.browse", icon), GUILayout.Width(80));
```

每个本地化 id 与键的组合会缓存一个 `GUIContent`，并在每次调用时重写，因此仅切换语言并不会更新它；下一次 `G` 调用
会刷新它。

### G(SerializedProperty)

```csharp
public GUIContent G(SerializedProperty property)
```

由 `property` 推导出的键所对应的 `GUIContent`。

### Tooltip(string, string?)

```csharp
public string Tooltip(string key, string? defaultValue = null)
```

`key` 的工具提示，即以后缀 `:tooltip` 存储的条目。`defaultValue` 的用法与 `S(string, string?)` 相同，因此在既无
条目又无默认值时会返回 `{key}:tooltip`。

### Tooltip(string, out string?)

```csharp
public bool Tooltip(string key, out string? tooltip)
```

不带回退的工具提示查找；当工具提示条目不存在时返回 false。

### Tooltip(SerializedProperty)

```csharp
public string Tooltip(SerializedProperty property)
```

由 `property` 推导出的键的工具提示；不存在时为空。

### UpdateRegister(string, UpdateHelper.Callback)

```csharp
public UpdateHelper UpdateRegister(string localizeKey, UpdateHelper.Callback callback)
```

为 `localizeKey` 注册 `callback`。回调会收到该键的标签文本和 `:tooltip` 文本，并在语言变化或资源重新加载时运行。
当它所更新的元素消失时，请释放该句柄。

```csharp
var registration = helper.UpdateRegister("label.my_window.title", (text, tooltip) =>
{
    title.text = text;
    title.tooltip = tooltip;
});

title.RegisterCallback<DetachFromPanelEvent>(_ => registration.Dispose());
```

### UpdateRegister(SerializedProperty, UpdateHelper.Callback)

```csharp
public UpdateHelper UpdateRegister(SerializedProperty property, UpdateHelper.Callback callback)
```

与 `UpdateRegister(string, UpdateHelper.Callback)` 相同，但作用于由 `property` 推导出的键。

### UILocalize(VisualElement, bool, int)

```csharp
public void UILocalize(VisualElement elem, bool addLanguagePopup = true, int spaceHeight = 8)
```

把 `elem` 的树中的键替换为对应的翻译，并保持同步更新。对每个元素，会把 `text`、`label` 和 `headerTitle` 中第一个
带有 setter 的属性读作键，并写回翻译后的文本；工具提示则从该键的 `:tooltip` 条目填入。

树会立即被本地化，因此键永远不会出现在屏幕上；在绑定过程之后还会再本地化一次，因为绑定可能把键写回去。元素从面板
分离时，注册会被释放。启用 `addLanguagePopup` 时，会在高度为 `spaceHeight` 的间隔下方追加语言选择器。

会被跳过：名为 `unity-text-input` 或 `unity-content` 的子元素（连同其子树）、任何带有 `localize-skip` 类的子树，
以及带有 `unity-base-field__inspector-field` 或 `unity-object-field-display__label` 的元素。带有
`localize-tooltip` 类的元素不会从其标签键获得工具提示；它现有的 `tooltip` 会被当作键并自行本地化。

### GetLanguageLocalization(string)

```csharp
public Dictionary<string, string> GetLanguageLocalization(string language)
```

某种语言全部键与文本的快照，以新字典返回。当本地化 id 或语言未知时抛出 `ArgumentException`。

### CreateLanguagePicker()

```csharp
public LanguagePicker CreateLanguagePicker()
```

用于此本地化的新 `LanguagePicker`，可直接添加到树中。

```csharp
settingsCard.Add(helper.CreateLanguagePicker());
```

### SelectLanguageElement(VisualElement, int)

```csharp
public void SelectLanguageElement(VisualElement element, int spaceHeight = 8)
```

向 `element` 追加一个高度为 `spaceHeight` 的间隔和一个 UI Toolkit 语言弹出菜单。当需要放置控件或为其设置样式时，
优先使用 `CreateLanguagePicker`。

### SelectLanguageGUI()

```csharp
public void SelectLanguageGUI()
```

用 `EditorGUILayout.Popup` 绘制 IMGUI 语言选择器，标签为 `label.language` 及其工具提示。

### OnLocalizationChanged

```csharp
public event LocalizationChanged? OnLocalizationChanged

public delegate void LocalizationChanged(string newLanguage)
```

当此本地化的选中语言变化时，以新语言为参数触发。仅在附加了处理器期间，辅助实例才订阅
`GlobalLocalization.OnLocalizationChanged`，并在最后一个处理器移除时取消订阅。

### LocalizationUpdated

```csharp
public delegate void LocalizationUpdated()
```

与 `LocalizationChanged` 一起声明的无参数委托类型。`LocalizationHelper` 不提供此类型的事件；重新加载通知来自
`GlobalLocalization.OnLocalizationReload`。

## LocalizationExtensions

```csharp
public static class LocalizationExtensions
```

编辑器 UI 的语法糖：`"label.some_key".S()`、`tree.UILocalize()` 等等。每个方法都会从发起调用的程序集的
`LocalizationPackageAttribute` 解析辅助实例，因此包无需自己的包装类。

每个方法都标记了 `[MethodImpl(MethodImplOptions.NoInlining)]`，因为一旦调用被内联，
`Assembly.GetCallingAssembly` 报告的就是本程序集而不是调用方。

### S(this string)

```csharp
public static string S(this string key)
```

调用方程序集本地化中 `key` 的文本。

```csharp
label.text = "label.my_window.title".S();
```

### S(this SerializedProperty)

```csharp
public static string S(this SerializedProperty property)
```

由 `property` 推导出的键的文本。

### Sf(this string, params object?[])

```csharp
public static string Sf(this string key, params object?[] args)
```

传给 `string.Format` 的 `key` 文本。

```csharp
label.text = "label.found_count".Sf(count);
```

### G(this string)

```csharp
public static GUIContent G(this string key)
```

带有 `key` 文本及其工具提示的 `GUIContent`。

```csharp
GUILayout.Label("label.my_window.title".G());
```

### G(this SerializedProperty)

```csharp
public static GUIContent G(this SerializedProperty property)
```

由 `property` 推导出的键所对应的 `GUIContent`。

### Tooltip(this string)

```csharp
public static string Tooltip(this string key)
```

`key` 的工具提示，即后缀为 `:tooltip` 的条目。

### Tooltip(this SerializedProperty)

```csharp
public static string Tooltip(this SerializedProperty property)
```

由 `property` 推导出的键的工具提示。

### UILocalize(this VisualElement, bool, int)

```csharp
public static void UILocalize(this VisualElement element, bool addLanguagePopup = true, int spaceHeight = 8)
```

把 `element` 树中的键替换为对应翻译并保持同步更新。请在绑定树之前调用。属性、跳过规则和第二次处理的细节见
`LocalizationHelper.UILocalize`。

```csharp
root.UILocalize();
```

### Register(this string, UpdateHelper.Callback)

```csharp
public static UpdateHelper Register(this string localizeKey, UpdateHelper.Callback callback)
```

为 `localizeKey` 注册 `callback`；当它所更新的元素消失时释放该句柄。

### Register(this SerializedProperty, UpdateHelper.Callback)

```csharp
public static UpdateHelper Register(this SerializedProperty property, UpdateHelper.Callback callback)
```

为 `property` 推导出的键注册 `callback`。

### 从 SerializedProperty 生成的键

`S(property)`、`G(property)`、`Tooltip(property)` 和 `Register(property, ...)` 会构造 `label.{Type}.{field}`。
`Type` 是 `property.serializedObject.targetObject` 的类型名；两部分都按同样的规则转换：

- 大写字母会在小写转大写处、或缩写的最后一个大写字母之前开启新单词：
  `UIText` 变成 `ui_text`，`HPBar` 变成 `hp_bar`，`localizationID` 变成 `localization_id`；
- 符号和标点变成 `_`。

因此 `MyWindow` 上的 `displayName` 字段是 `label.my_window.display_name`。

## UpdateHelper

```csharp
public class UpdateHelper : IDisposable
```

在本地化重新加载或语言变化时，保持一对标签与工具提示同步更新。每个注册都是独立的，因此多个元素可以共用同一个键。

### UpdateHelper.Callback

```csharp
public delegate void Callback(string newLabel, string newTooltip)
```

接收所注册键的新标签文本和新工具提示。

### Register(string, string, Callback)

```csharp
public static UpdateHelper Register(string localizationID, string localizeKey, Callback callback)
```

为一个本地化 id 的某个键注册 `callback`，并返回可取消注册的句柄。`Register` 本身不会调用回调；它会在下一次语言
变化或重新加载时运行，因此请用 `S` 和 `Tooltip` 设置初始文本。

### Register(string, SerializedProperty, Callback)

```csharp
public static UpdateHelper Register(string localizationID, SerializedProperty property, Callback callback)
```

注册标签属性会使用的键，该键由其类型和字段名推导。

### Dispose()

```csharp
public void Dispose()
```

停止更新回调并移除注册。当它所更新的元素被移除时调用；此后回调永远不会再被调用。

## GlobalLocalization

```csharp
[InitializeOnLoad]
public static class GlobalLocalization
```

加载项目中的每个 `BasicLocalization` 资源，维护按 id 划分的语言字典与选中的语言，并刷新注册。查找通过
`LocalizationHelper` 进行；此类型只公开其事件和委托。

加载会推迟到编辑器的第一个 tick，并在资源更改后以 250 ms 的延迟合并，因此在翻译资源中输入时不会每次按键都重新
扫描项目。`Tools > Localization > Reload Localizations` 会强制重新加载。选中的语言按 id 保存在 `EditorPrefs` 的
`{localizationID}_Language` 下。

### OnLocalizationReload

```csharp
public static event LocalizationUpdated? OnLocalizationReload

public delegate void LocalizationUpdated()
```

在资源重新加载完成、且每个注册都已刷新之后触发。用于那些不由 `UILocalize` 或 `UpdateRegister` 保持更新的 UI。

### OnLocalizationChanged

```csharp
public static event LocalizationChanged? OnLocalizationChanged

public delegate void LocalizationChanged(string localizationID, string newLanguage)
```

当某个本地化的选中语言变化时触发，携带本地化 id 和新语言。注册会在事件触发前刷新。重新加载不会触发它。
