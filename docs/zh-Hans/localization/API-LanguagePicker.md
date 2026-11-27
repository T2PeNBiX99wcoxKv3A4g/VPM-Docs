# LanguagePicker

`io.github.ykysnk.Localization.Editor` · `public class LanguagePicker : VisualElement`

现成的 UI Toolkit 语言选择器。它列出一个本地化 id 的所有语言，在更改时切换选中项，并带有 `language-picker` 类以便设置样式。用 `LocalizationHelper.CreateLanguagePicker` 创建，或用 `Languages` 和 `SetLanguage` 自行构建自定义控件。

列表按显示名称排序。本地化资源重新加载时，选择器会自我重建，因此在延迟的首次加载之前创建的选择器会在之后补全内容，并且会跟随其他地方发起的切换。当已存储的语言被重命名或删除时，它会回退到第一个语言并修复该偏好设置。弹出菜单的标签是 `label.language` 条目及其工具提示；选择器离开面板时注册会被释放。

控件只是一个包含单个 `PopupField` 的 `VisualElement`，条目以索引表示，因此显示名称相同的两个语言也能区分。全局处理器在 `AttachToPanelEvent` 时附加，并在 `DetachFromPanelEvent` 时连同标签注册一起解除。

## Constructors

```csharp
public LanguagePicker(string localizationID)
```

为一个本地化 id 创建选择器，并在延迟的首次加载尚未执行时当场加载资源。优先使用 `LocalizationHelper.CreateLanguagePicker`，它会传入该辅助实例的本地化 id。

```csharp
var picker = new LanguagePicker("io.github.ykysnk.yky-toolkit");
settingsCard.Add(picker);
```

## SelectedLanguage

```csharp
public string SelectedLanguage { get; set; }
```

当前选中的语言 id，例如 `ja-JP`。读取会转发给加载器，因此当本地化没有加载任何资源时会抛出 `ArgumentException`。赋值会切换语言，从而更新所有通过 `UILocalize` 本地化的元素，并在不触发变化回调的情况下把弹出菜单移到新条目。
