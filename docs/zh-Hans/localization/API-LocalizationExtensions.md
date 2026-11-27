# LocalizationExtensions

`io.github.ykysnk.Localization.Editor` · `public static class LocalizationExtensions`

编辑器 UI 的语法糖：`"label.some_key".S()`、`tree.UILocalize()` 等等。辅助实例取自发起调用的程序集的 `LocalizationPackageAttribute`，因此包只需声明一次该特性，无需自己的包装类。

每个方法都标有 `[MethodImpl(MethodImplOptions.NoInlining)]`，下面的签名中也如实标出：一旦调用被内联，`Assembly.GetCallingAssembly` 报告的就是本程序集而不是调用方，而选择本地化的正是这个程序集。

## S

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static string S(this string key)
[MethodImpl(MethodImplOptions.NoInlining)]
public static string S(this SerializedProperty property)
```

调用方程序集本地化中 `key` 的文本，回退顺序与 `LocalizationHelper.S` 相同：所选语言、英文、键本身，因此缺少翻译也不会抛出异常。`SerializedProperty` 重载会用目标类型名和字段名拼出 `label.{Type}.{field}`，两者都转换为小写下划线形式，因此 `MyWindow` 上的 `displayName` 字段是 `label.my_window.display_name`。

```csharp
label.text = "label.my_window.title".S();
```

## Sf

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static string Sf(this string key, params object?[] args)
```

把 `key` 的文本交给 `string.Format`。与参数不匹配的格式字符串不会抛出异常，而是以 `text(arg1, arg2)` 的形式返回。

```csharp
label.text = "label.found_count".Sf(count);
```

## G

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static GUIContent G(this string key)
[MethodImpl(MethodImplOptions.NoInlining)]
public static GUIContent G(this SerializedProperty property)
```

带有 `key` 文本、并以 `key + ":tooltip"` 下存储的条目作为工具提示的 `GUIContent`，没有工具提示时为空；`SerializedProperty` 重载使用由该属性推导出的键。`GUIContent` 按本地化 id 与键各缓存一个，每次调用都会重写，因此仅切换语言不会更新它，下一次 `G` 调用才会刷新。

```csharp
GUILayout.Label("label.my_window.title".G());
```

## Tooltip

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static string Tooltip(this string key)
[MethodImpl(MethodImplOptions.NoInlining)]
public static string Tooltip(this SerializedProperty property)
```

`key` 的工具提示，也就是以 `:tooltip` 后缀存储的条目。条目不存在时会走与 `S` 相同的回退，因此 `Tooltip("label.foo")` 在没有任何内容时返回 `label.foo:tooltip`；`SerializedProperty` 重载查询推导出的键，不存在时返回空字符串。

## UILocalize

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static void UILocalize(this VisualElement element, bool addLanguagePopup = true, int spaceHeight = 8)
```

把 `element` 树中的键替换成对应翻译并保持最新。请在绑定树之前调用：树会立即本地化，因此键不会出现在画面上；绑定过程可能把键写回去，所以绑定之后还会再执行一次。设置 `addLanguagePopup` 时，语言选择器会附加在 `spaceHeight` 的间隔下方；元素离开面板时注册会被处置。它读取的属性、跳过的元素与第二遍处理见 [`LocalizationHelper`](./API-LocalizationHelper.md)。

```csharp
root.UILocalize();
```

## Register

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static UpdateHelper Register(this string localizeKey, UpdateHelper.Callback callback)
[MethodImpl(MethodImplOptions.NoInlining)]
public static UpdateHelper Register(this SerializedProperty property, UpdateHelper.Callback callback)
```

为 `localizeKey` 注册 `callback`，并返回用于注销的句柄。回调会收到标签与 `:tooltip` 文本，在下次语言切换或重新加载时运行，而不是在 `Register` 中运行。它所更新的元素消失时请处置句柄；`SerializedProperty` 重载注册由该属性推导出的键。
