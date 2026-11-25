# Unity-Keys

A key that starts with `unity:` borrows an existing Unity editor translation instead of shipping one.

## How it resolves

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

So the entry is **the English text Unity already knows**, not a translation of your own. Keep it in the `en-US`
asset; other languages do not need it, because the lookup falls back to English before asking Unity.

## What happens when it is missing

If no asset has the key, `S()` returns the key itself and `L10n.Tr("unity:label.position")` cannot translate that
either - the label shows `unity:label.position`. The package warns in the console in three cases:

| Situation | Warning |
| --- | --- |
| The key only exists in a language other than `en-US` | declared in `ja-JP.asset` but missing from the `en-US` asset |
| No asset has the key at all | has no entry, so the label shows the raw key |
| The `en-US` entry has an empty text | empty translation in the `en-US` asset |

Each key is reported once, and `Tools > Localization > Reload Localizations` re-checks after you fix it.

## Tooltips

The tooltip follows the same rule: the entry `unity:label.position:tooltip` holds the English tooltip, and Unity
translates it. Without that entry the tooltip is empty.

## Language switching

`unity:` elements are not registered for live updates: their text comes from the editor language, not from the
package's selected language. Changing the package language does not touch them; changing Unity's editor language
requires a restart, and the label is resolved again when the tree is rebuilt.
