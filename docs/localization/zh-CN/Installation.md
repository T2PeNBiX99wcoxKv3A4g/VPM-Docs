# 安装

该包以 VPM 包的形式分发：`io.github.ykysnk.localization`。可以用 ALCOM、VPM CLI，或把仓库添加到项目的 VPM 列表中来安装。

它依赖 `io.github.ykysnk.utils`，VPM 会自动解析该依赖。

## 创建语言资源

1. 通过 **Assets > Create > Localization > Basic Localization** 创建资源。
2. 把 **Localization ID** 设为包所使用的 id，例如 `io.github.ykysnk.localization`。
3. 以语言 id 命名文件：`en-US`、`ja-JP`、`zh-Hant`……
4. 在 **Display Name** 中填入语言选择器所显示的名称，例如 `English` 或 `日本語`。

同一个包的每种语言都使用相同的 id，并与其他资源放在一起，通常位于 `Editor/Localization` 文件夹中。

> 文件名就是语言 id。重命名资源会改变它所代表的语言，因此请保持文件名稳定。

## 添加翻译

在检视器中点击翻译列表里的 **+**，然后填写下方字段。检视器本身由本包翻译，因此看到的标签会随所选语言变化；字段名就是
`BasicTranslate` 中的名称。

| 字段            | 含义                                             |
|-----------------|--------------------------------------------------|
| `key`           | 代码查找所用的键，例如 `label.my_window.title`。 |
| `translate`     | 该语言下显示的文本。                             |
| `useTooltip`    | 该条目是否同时保存工具提示。                     |
| `tooltipSuffix` | 工具提示键的后缀，默认为 `:tooltip`。            |
| `tooltip`       | 工具提示文本。                                   |

`en-US` 资源应当包含**全部**键：它既是其他语言的回退来源，也是 `unity:` 条目的源文本。

## 接入包

在需要翻译的包的编辑器程序集中声明一次 id：

```csharp
using io.github.ykysnk.Localization.Editor;

[assembly: LocalizationPackage("com.example.my-package")]
```

然后在绑定之前先做本地化：

```csharp
var tree = uxml.CloneTree();
tree.UILocalize();          // replaces keys and keeps them up to date
tree.Bind(serializedObject);
rootVisualElement.Add(tree);
```

键写在 UXML 属性里，因此不需要其他操作：

```xml
<ui:Label text="label.my_window.title"/>
<ui:Button text="label.my_window.apply"/>
```

## 导入与导出

**Format conversion** 折叠面板可以把资源导出为 JSON 或 PO 文件（与资源放在同一目录），也能把两者导入回来。导入按键合并，且从不删除条目，因此对翻译工具生成的文件执行导入是安全的。

```json
{
  "label.my_window.title": "My window",
  "label.my_window.title:tooltip": "Opens the window"
}
```
