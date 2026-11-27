# Transform Inspector

The toolkit replaces the default Transform inspector with one that can do arithmetic, align objects and lock a
transform. Every value still goes through `Undo`, so `Ctrl+Z` restores the previous transform.

## Local and world space

Two cards, **Local Space** and **World Space**, show position, rotation and scale in that space. Each card carries copy,
paste, random and reset buttons that act on the whole card, and every row repeats the same actions for its own property.
The link button on the scale row toggles constrained proportions.

A multi-selection shows a shared value once and `—` where the objects differ.

## Expressions

Every field accepts an expression, not just a number:

```
2 + 3          -> 5
10 / 4         -> 2.5
1.5 * 2        -> 3
```

Press Enter to apply: the result is written to every selected object and the field returns to a plain number. While you
type, a list of matching expressions appears under the field; `↑`/`↓` selects one, Enter or Tab inserts it. `Tab` alone
still moves between fields.

## Help

**Tools &gt; YKYToolkit &gt; Transform Expression Help** opens the cheat sheet with every expression, its signature and
an example, grouped into basic arithmetic, ordering across a multi-selection and random values. The search box filters
by syntax, alias or description, and clicking a row copies its example to the clipboard.

## Clipboard

| Action                  | Effect                                                                |
|-------------------------|-----------------------------------------------------------------------|
| Copy / Paste (header)   | The position, rotation and scale of that card.                        |
| Row buttons             | The single property of that row.                                      |
| Right-click a field     | **Copy Euler Angles**, **Copy Quaternion** and Unity's own menu items. |

The clipboard uses Unity's own `Vector3(…)` and `Quaternion(…)` text, so the values also paste into Unity's default
fields and into other tools.

## Alignment

**Alignment mode** chooses the reference **Align to Ground** uses: the pivot, the bottom or the centre of the object's
bounds.

- **Align to Parent** moves the object onto its parent's position.
- **Align to Ground** raycasts down from the object onto the first collider that is not the object itself or a child of
  it, ignoring triggers and the `Ignore Raycast` layer, and places the object on the hit.
- **Clear Parent** keeps the world position and removes the parent. It is disabled in a prefab stage.

## Other

- **Transform Lock** disables every field and action of the inspector for that object. The lock is stored per object in
  a hidden `EnhancedTransformSettings` component, which is added only while a setting is non-default and is never saved
  into a build.
- **Hierarchy Path** shows the path of the object, and the button next to it copies it.
- **Decimal places** rounds the displayed values of position, rotation and scale. `-1` turns the rounding off, the
  slider goes up to 6 places.
- **Default UI** unfolds Unity's own Transform inspector. Prefab overrides only support IMGUI, so that card is where
  overrides are edited and only the basic features are available there.
