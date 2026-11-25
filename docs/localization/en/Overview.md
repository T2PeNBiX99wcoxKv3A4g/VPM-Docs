# Overview

Localization keeps the editor UI of a VPM package in one place: every label, button and tooltip is a key, and each
language is one asset that maps those keys to text. The package is editor-only; nothing is shipped into the world.

## How the pieces fit together

| Piece | What it is |
| --- | --- |
| `BasicLocalization` | One asset per language. Its file name is the language id (`en-US`, `ja-JP`) and its `displayName` is what the picker shows. |
| `BasicTranslate` | One entry inside an asset: the key, the text and an optional tooltip. |
| Localization id | Groups the assets of one package together, for example `io.github.ykysnk.yky-toolkit`. Every language asset carries the same id. |
| `LocalizationHelper` | Looks keys up for one id and keeps UI elements up to date when the language changes. |

A package declares the id once per editor assembly:

```csharp
[assembly: LocalizationPackage("io.github.ykysnk.yky-toolkit")]
```

After that, the extension methods know which assets to read without any wiring:

```csharp
label.text = "label.my_window.title".S();
```

## Language selection

The selected language is stored per id with `EditorPrefs`. Changing it raises one event, and every element that was
localized through `UILocalize` or registered with `UpdateRegister` is rewritten immediately - no window has to be
reopened.

## Fallbacks

A lookup walks English first, then the selected language:

1. the text in the selected language,
2. the text in the `en-US` asset,
3. the default value passed by the caller,
4. the key itself.

Nothing throws on a missing entry, so a half-translated package still shows readable English.

## Unity's own strings

Keys that start with `unity:` are not translated by this package. They hold the English text of a Unity editor string
and are passed to `L10n.Tr`, so Unity translates them into the editor language. See [Unity-Keys](Unity-Keys) for the
details.
