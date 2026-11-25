# Installation

The package is distributed as a VPM package: `io.github.ykysnk.localization`. Add it with ALCOM, the VPM CLI, or by
adding the repository to the VPM listing of the project.

It depends on `io.github.ykysnk.utils`, which VPM resolves automatically.

## Create the language assets

1. Create an asset with **Assets > Create > Localization > Basic Localization**.
2. Set **Localization ID** to the id the package uses, for example `io.github.ykysnk.localization`.
3. Name the file after the language id: `en-US`, `ja-JP`, `zh-Hant`, ...
4. Fill **Display Name** with the name the language picker shows, for example `English` or `日本語`.

Every language of the same package uses the same id and lives next to the other assets, usually in an
`Editor/Localization` folder.

> The file name is the language id. Renaming the asset changes which language it represents, so keep it stable.

## Add translations

In the inspector, press **+** in the translation list and fill in:

| Field | Meaning |
| --- | --- |
| 翻訳ID (`key`) | The key the code looks up, for example `label.my_window.title`. |
| 翻訳 (`translate`) | The text shown for this language. |
| ツールチップを使う (`useTooltip`) | Whether this entry also stores a tooltip. |
| ツールチップの接尾辞 (`tooltipSuffix`) | Suffix of the tooltip key, `:tooltip` by default. |
| ツールチップ (`tooltip`) | The tooltip text. |

The `en-US` asset should contain **every** key: it is the fallback for the other languages and the source text for
`unity:` entries.

## Connect the package

In the editor assembly of the package that wants translations, declare the id once:

```csharp
using io.github.ykysnk.Localization.Editor;

[assembly: LocalizationPackage("io.github.ykysnk.my-package")]
```

Then localize the UI before binding it:

```csharp
var tree = uxml.CloneTree();
tree.UILocalize();          // replaces keys and keeps them up to date
tree.Bind(serializedObject);
rootVisualElement.Add(tree);
```

Keys are written in the UXML attributes, so nothing else is needed:

```xml
<ui:Label text="label.my_window.title"/>
<ui:Button text="label.my_window.apply"/>
```

## Import and export

The **Format conversion** foldout exports the asset as JSON or PO next to the asset and can import both back. Import
merges by key and never deletes entries, so it is safe to run over a file produced by a translation tool.

```json
{
  "label.my_window.title": "My window",
  "label.my_window.title:tooltip": "Opens the window"
}
```
