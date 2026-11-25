# Unity 键

以 `unity:` 开头的键借用 Unity 编辑器已有的翻译，而不必自带一份。

## 解析过程

```
asset:  unity:label.position = "Position"
                 |
                 v
S("unity:label.position")          -> "Position"   (selected language, then en-US)
                 |
                 v
L10n.Tr("Position")                -> "位置"        (Unity's translation for the editor language)
                 |
                 v
Unity does not know the text       -> "Position"   (English, unchanged)
```

因此，该条目保存的是 **Unity 已经认识的英文文本**，而不是你自己写的翻译。把它放在 `en-US` 资源中即可；其他语言不需要它，因为查找会先回退到英语，再去询问
Unity。

## 缺少条目时会发生什么

如果没有任何资源包含该键，`S()` 会返回键本身，`L10n.Tr("unity:label.position")` 也无法翻译它，于是标签显示为
`unity:label.position`。本包会在三种情况下向控制台输出警告：

| 情况                              | 警告内容                                         |
|-----------------------------------|--------------------------------------------------|
| 该键只存在于 `en-US` 以外的语言中 | 在 `ja-JP.asset` 中声明，但在 `en-US` 资源中缺失 |
| 没有任何资源包含该键              | 没有条目，因此标签显示原始键                     |
| `en-US` 条目的文本为空            | `en-US` 资源中的翻译为空                         |

每个键只会报告一次，修正后可通过 `Tools > Localization > Reload Localizations` 重新检查。

## 工具提示

工具提示遵循同样的规则：条目 `unity:label.position:tooltip` 保存英文工具提示，再由 Unity 翻译。缺少该条目时，工具提示为空。

## 语言切换

`unity:` 元素不会注册实时更新：它们的文本来自编辑器语言，而不是包所选择的语言。切换包语言不会影响它们；更改 Unity
的编辑器语言需要重启，标签会在界面树重建时重新解析。
