# Transform Inspector

The toolkit replaces the default Transform inspector with one that can do arithmetic and alignment.

## Fields

Every field accepts an expression, not just a number:

```
2 + 3          -> 5
10 / 4         -> 2.5
1.5 * 2        -> 3
```

Press Enter to apply; the result is written to the transform and the field returns to a plain number. `Tab` moves
between fields as usual.

## Clipboard

| Action | Effect |
| --- | --- |
| Copy | Copies the world or local position, rotation and scale. |
| Paste | Writes the copied values onto the current selection. |

The buttons at the end of each row copy or paste that single property.

## Alignment

The alignment buttons move the selection relative to the last selected object: minimum, center and maximum on each
axis. This is the fastest way to line up a row of objects without typing coordinates.

## Data assets

`EnhancedTransformData` stores a named transform (position, rotation, scale and the target object). The inspector can
save the current transform to an asset and apply it later, which is useful for prop placement rules that should be
shared between scenes.

## Notes

- The inspector works on multiple objects at once; a mixed value is shown as `—`.
- All edits go through `Undo`, so `Ctrl+Z` restores the previous transform.
- The expression parser is the same one used by the alignment fields, so `0.5 + 0.5` works there too.
