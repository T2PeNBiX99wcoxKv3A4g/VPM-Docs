# GlobalLocalization

`io.github.ykysnk.Localization.Editor` · `[InitializeOnLoad] public static class GlobalLocalization`

加载项目中的每个 `BasicLocalization` 资源，维护按 id 划分的语言字典与选中的语言，并刷新注册。查找通过 [`LocalizationHelper`](./API-LocalizationHelper.md) 进行；此类型只公开其事件和两个委托，其余成员都是 internal。

加载会推迟到编辑器的第一个 tick，在该 tick 之前构建的检视器会通过同一个加载器按需取得数据。资源发生变化或 UI Toolkit 检视器抛出异常后，重新加载会以 250 ms 的延迟合并，因此在翻译资源中输入时不会每次按键都重新扫描项目。`Tools > Localization > Reload Localizations` 会强制重新加载。选中的语言按 id 保存在 `EditorPrefs` 的 `{localizationID}_Language` 下，默认值为 `en-US`。

每个资源提供自己的本地化 id、作为语言 id 的文件名和显示名称；同一个键以最先读到的值为准，语言按显示名称以固定区域性比较器排序。重新加载时，会针对 `en-US` 资源中缺失或文本为空的 `unity:` 键发出警告，因为 `L10n.Tr` 只能翻译英文文本。重新加载完成后，先刷新所有仍然有效的注册，再触发事件。

## OnLocalizationReload

```csharp
public static event LocalizationUpdated? OnLocalizationReload
```

在资源重新加载完成、且每个注册都已刷新之后触发。用于那些不由 `UILocalize` 或 `UpdateRegister` 保持更新的 UI，例如从 `Languages` 自行构建条目的控件。语言变化不会触发它。

## OnLocalizationChanged

```csharp
public static event LocalizationChanged? OnLocalizationChanged
```

当某个本地化的选中语言变化时触发，携带本地化 id 和新语言。该本地化的注册会在事件触发前刷新。重新加载不会触发它。

## LocalizationChanged

```csharp
public delegate void LocalizationChanged(string localizationID, string newLanguage)
```

`OnLocalizationChanged` 的处理器类型：语言发生变化的本地化，以及当前选中的语言。

## LocalizationUpdated

```csharp
public delegate void LocalizationUpdated()
```

`OnLocalizationReload` 的处理器类型，不带参数。`LocalizationHelper` 上也有同名委托，但那里没有对应的事件。
