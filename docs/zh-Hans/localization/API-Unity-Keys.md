# Unity 键

## Unity 键

以 `unity:` 开头的键保存的是某个 Unity 编辑器字符串的英文文本，由 Unity 通过 `L10n.Tr` 翻译该文本，而不是由本包
翻译这个键。本包只负责把键解析为其源文本：

```csharp
var key = "unity:label.position";
var source = helper.S(key, out var localized) ? localized : key;
label.text = L10n.Tr(source);
```

`UILocalize` 执行相同的步骤：先在选中语言中查找键，再在 `en-US` 中查找，把结果（或原始键）传给 `L10n.Tr`，工具
提示也按同样方式处理。带 `unity:` 键的元素不会注册实时更新，因为它们的文本跟随 Unity 的编辑器语言，而不是本包
选中的语言；更改 Unity 的语言需要重启，标签会在树重建时重新解析。

请把英文文本放在 `en-US` 资源中。当 `unity:` 键在 `en-US` 中缺失或其英文文本为空时，加载器会给出警告。资源加载
完成后，`UILocalize` 会为每个无法解析的键各警告一次，标签则显示原始键。参见 [Unity-Keys](./Unity-Keys.md)。
