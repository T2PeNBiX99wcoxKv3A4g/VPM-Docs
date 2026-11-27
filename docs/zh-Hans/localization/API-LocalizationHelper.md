# LocalizationHelper

`io.github.ykysnk.Localization.Editor` · `public class LocalizationHelper`

为一个本地化 id 查找键，并在语言或数据变化时保持 UI 元素同步更新。请通过 `For` 获取，它会从程序集特性中读取 id。

辅助实例只保存 id：所有查找和注册都交给 [`GlobalLocalization`](./API-GlobalLocalization.md) 中的加载器处理，因此同一个 id 的两个辅助实例看到的是同一份数据和同一个选中的语言。

## Constructors

```csharp
public LocalizationHelper(string localizationID)
```

为一个本地化 id 创建辅助实例。优先使用 `For(Assembly)` 或 `For(Type)`，它们会从 `LocalizationPackageAttribute` 读取 id；手动创建的实例不会按程序集缓存，也不会在该 id 从未加载时发出警告。

## SelectedLanguage

```csharp
public string SelectedLanguage { get; set; }
```

当前选中的语言 id，例如 `ja-JP`。该值保存在 `EditorPrefs` 的 `{localizationID}_Language` 下，默认值为 `en-US`。

赋值会切换语言，重写所有通过 `UILocalize` 或 `UpdateRegister` 本地化的元素，然后触发 `OnLocalizationChanged`。当该 id 没有加载任何资源时，取值器会抛出 `ArgumentException`；当语言不在 `Languages` 中时，赋值器也会抛出。

```csharp
helper.SelectedLanguage = "ja-JP";
```

## Languages

```csharp
public IReadOnlyList<string> Languages { get; }
```

此本地化的语言 id，按显示顺序排列。id 就是 `BasicLocalization` 资源的文件名（`en-US`、`ja-JP`）；列表按显示名称以固定区域性比较器排序，在资源加载完成前为空。

## LanguageNames

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

## OnLocalizationChanged

```csharp
public event LocalizationChanged? OnLocalizationChanged
```

当此本地化的选中语言变化时，以新语言为参数触发。辅助实例只在第一个处理器附加时订阅 `GlobalLocalization.OnLocalizationChanged`，并在最后一个处理器移除时取消订阅，因此仅用于查找的实例不会增加监听者。

## LocalizationChanged

```csharp
public delegate void LocalizationChanged(string newLanguage)
```

`OnLocalizationChanged` 的处理器类型：它接收刚刚选中的语言，不携带本地化 id。

## LocalizationUpdated

```csharp
public delegate void LocalizationUpdated()
```

与 `LocalizationChanged` 一起声明的无参数委托类型。`LocalizationHelper` 不提供此类型的事件；重新加载通知来自 `GlobalLocalization.OnLocalizationReload`。

## For

```csharp
public static LocalizationHelper For(Assembly assembly)
public static LocalizationHelper For(Type type)
```

`For(assembly)` 返回由 `assembly` 的 `LocalizationPackageAttribute` 声明的辅助实例，每个程序集缓存一个。没有该特性的程序集会记录一条警告并获得共享的未绑定实例，它的 id 为空，因此会把所有键原样显示。`For(type)` 等同于 `For(type.Assembly)`，即包含 `type` 的程序集的辅助实例。

```csharp
var helper = LocalizationHelper.For(typeof(MyWindow));
```

## SetLanguage

```csharp
public void SetLanguage(string language)
```

等同于给 `SelectedLanguage` 赋值。

## CreateLanguagePicker

```csharp
public LanguagePicker CreateLanguagePicker()
```

用于此本地化的新 `LanguagePicker`，可直接添加到树中。该控件附加后的行为见 [`LanguagePicker`](./API-LanguagePicker.md)。

```csharp
settingsCard.Add(helper.CreateLanguagePicker());
```

## SelectLanguageGUI

```csharp
public void SelectLanguageGUI()
```

用 `EditorGUILayout.Popup` 绘制 IMGUI 语言选择器，标签为 `label.language` 及其工具提示。已保存的语言不在列表中时会选中第一项，更改经过与 `SetLanguage` 相同的路径。

## SelectLanguageElement

```csharp
public void SelectLanguageElement(VisualElement element, int spaceHeight = 8)
```

向 `element` 追加一个高度为 `spaceHeight` 的间隔和一个 UI Toolkit 语言弹出菜单。延迟的首次加载尚未执行时，会当场加载资源；已保存的语言不存在时回退到第一个语言，并在不触发变化事件的情况下修复该偏好设置。弹出菜单离开面板时，标签注册会被释放。

当需要放置控件或为其设置样式时，优先使用 `CreateLanguagePicker`。

## UpdateRegister

```csharp
public UpdateHelper UpdateRegister(string localizeKey, UpdateHelper.Callback callback)
public UpdateHelper UpdateRegister(SerializedProperty property, UpdateHelper.Callback callback)
```

为 `localizeKey` 注册 `callback`。回调会收到该键的标签文本和 `:tooltip` 文本，并在语言变化或资源重新加载时运行。`SerializedProperty` 重载使用由属性推导出的键。当它所更新的元素消失时，请释放该句柄；详见 [`UpdateHelper`](./API-UpdateHelper.md)。

```csharp
var registration = helper.UpdateRegister("label.my_window.title", (text, tooltip) =>
{
    title.text = text;
    title.tooltip = tooltip;
});

title.RegisterCallback<DetachFromPanelEvent>(_ => registration.Dispose());
```

## GetLanguageLocalization

```csharp
public Dictionary<string, string> GetLanguageLocalization(string language)
```

某种语言全部键与文本的快照，以新字典返回。当本地化 id 或语言未知时抛出 `ArgumentException`。

## S

```csharp
public string S(string key, string? defaultValue = null)
public bool S(string key, out string? localizationString)
public string S(SerializedProperty property)
```

`S(key, defaultValue)` 返回选中语言下 `key` 的文本，依次回退到 `en-US` 的文本、`defaultValue`，最后回退到键本身，因此缺少翻译时永远不会抛出异常。选中语言中的空文本同样会回退到英语。

`S(key, out localizationString)` 先在选中语言、再在 `en-US` 中查找该键，但不会回退到键本身。两者都没有条目时返回 false，`localizationString` 保持为 null，`unity:` 键与普通文本正是靠这一点区分。

`S(property)` 使用由属性推导出的键 `label.{Type}.{field}`，其中 `Type` 是 `property.serializedObject.targetObject` 的类型名，两部分按同样的规则转换（`UIText` 变成 `ui_text`，`HPBar` 变成 `hp_bar`，`localizationID` 变成 `localization_id`，符号和标点变成 `_`）。因此 `MyWindow` 上的 `displayName` 字段是 `label.my_window.display_name`。

```csharp
label.text = helper.S("label.my_window.title");
```

## Sf

```csharp
public string Sf(string key, params object?[] args)
```

把 `S(key)` 的结果传给 `string.Format`。与参数不匹配的格式字符串会以 `text(arg1, arg2)` 的形式返回，而不是抛出异常。

```csharp
var text = helper.Sf("label.found_count", 3);   // "3 assets found"
```

## G

```csharp
public GUIContent G(string key)
public GUIContent G(string key, Texture? image)
public GUIContent G(string key, Texture? image, string? tooltip)
public GUIContent G(SerializedProperty property)
```

`G(key)` 返回带有 `key` 文本的 `GUIContent`，工具提示取自其 `:tooltip` 条目。带 `image` 的重载会加上图标，三参数重载改为从键 `tooltip` 读取工具提示（没有该条目时为空），`G(property)` 使用推导出的 `label.{Type}.{field}` 键。

```csharp
GUILayout.Button(helper.G("label.browse", icon), GUILayout.Width(80));
```

每个本地化 id 与键的组合会缓存一个 `GUIContent`，并在每次调用时重写，因此仅切换语言并不会更新它；下一次 `G` 调用会刷新它。

## Tooltip

```csharp
public string Tooltip(string key, string? defaultValue = null)
public bool Tooltip(string key, out string? tooltip)
public string Tooltip(SerializedProperty property)
```

`key` 的工具提示，即以后缀 `:tooltip` 存储的条目。`defaultValue` 的用法与 `S(string, string?)` 相同，因此在既无条目又无默认值时会返回 `{key}:tooltip`。

带 `out` 的重载完全不做回退，条目不存在时返回 false；`Tooltip(property)` 在这种情况下返回空字符串。

## UILocalize

```csharp
public void UILocalize(VisualElement elem, bool addLanguagePopup = true, int spaceHeight = 8)
```

把 `elem` 的树中的键替换为对应的翻译，并保持同步更新。对每个元素，会把 `text`、`label` 和 `headerTitle` 中第一个带有 setter 的属性读作键，并写回翻译后的文本；工具提示则从该键的 `:tooltip` 条目填入。带 `unity:` 前缀的键保存的是 `L10n.Tr` 要翻译的英文文本，因此会先解析再交给 `L10n.Tr`；这类标签只翻译一次、不会注册，而没有任何条目的键会记录一次警告并保留原始键。

树会立即被本地化，因此键永远不会出现在屏幕上；在下一个调度器 tick 还会再执行一次，因为在 `UILocalize` 之后运行的绑定可能把键写回去。只有第一次处理会注册，因此文本不是已知键的元素会被原样保留，第二次处理只重写第一次注册过的元素。元素从面板分离时，注册会被释放。启用 `addLanguagePopup` 时，会在高度为 `spaceHeight` 的间隔下方追加语言选择器。

会被跳过：名为 `unity-text-input` 或 `unity-content` 的子元素（连同其子树）、任何带有 `localize-skip` 类的子树，以及带有 `unity-base-field__inspector-field` 或 `unity-object-field-display__label` 的元素——后两者只跳过元素本身，仍然会处理它们的子元素。带有 `localize-tooltip` 类的元素不会从其标签键获得工具提示；它现有的 `tooltip` 会被当作键，自行本地化并单独保持注册。

```csharp
var root = uxml.CloneTree();
helper.UILocalize(root);
```
