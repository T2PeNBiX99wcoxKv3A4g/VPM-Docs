# 检视器

打开一个 `BasicLocalization` 资源即可编辑一种语言。检视器本身由本包翻译，因此标签会随所选语言变化；本页按字段的作用来称呼它们，并在有帮助处给出
`BasicLocalization` / `BasicTranslate` 中的字段名。

## 设置卡片

- **Localization id**（`localizationID`）—— 包中每种语言共享的 id。
- **Display name**（`displayName`）—— 语言选择器中显示的名称。
- **Language** —— 该 id 当前选中的语言，在所有编辑器窗口中都相同。

选择器就是现成的 `LanguagePicker` 控件；切换它会立即更新每一个打开的检视器和窗口。

## 格式转换（Format conversion）

该折叠面板存放旁挂文件：

| 字段                   | 内容                                        |
|------------------------|---------------------------------------------|
| JSON file (`jsonFile`) | 与资源一起导出的扁平 `key: text` 对象。     |
| PO file (`poFile`)     | Gettext 文件，每个键一对 `msgid`/`msgstr`。 |

`…` 按钮会把磁盘上的文件复制到资源旁边。导出写出当前资源，导入按键把文件合并回来。这两个字段只能分别指定 `TextAsset`（JSON）和
`LocalizationAsset`（PO）。

## 翻译列表

列表上方的工具栏包含搜索框、条目计数以及添加/删除按钮。

- 搜索按键、文本或工具提示过滤。它会在你停止输入后才执行。
- 过滤生效时，计数显示为 `filtered/total`。
- 添加在末尾追加一个空条目；删除会移除选中的条目。
- 右键点击某一行可复制、粘贴和删除。
- 拖动行可以重新排序（仅在未启用过滤时）。

## 翻译行

| 字段            | 说明                                         |
|-----------------|----------------------------------------------|
| `key`           | 键，例如 `label.my_window.title`。           |
| `translate`     | 文本。支持多行。                             |
| `useTooltip`    | 打开后保存工具提示；下方的两个字段随之出现。 |
| `tooltipSuffix` | 工具提示键的后缀，默认为 `:tooltip`。        |
| `tooltip`       | 工具提示文本。                               |

复制按钮会把整个条目以 JSON 形式放入剪贴板；粘贴则把复制来的条目写回该行。只要剪贴板中存放的是翻译条目，粘贴就可用。

## 脚本图标

`BasicLocalization` 和 `BasicTranslate` 各自带有脚本图标（`Runtime/Icons`）。SVG 是源文件；Unity 导入的是 256 px 的 PNG。
