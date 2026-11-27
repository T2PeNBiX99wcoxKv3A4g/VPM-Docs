# MenuItemObject

`io.github.ykysnk.utils.Editor` · `public class MenuItemObject`

Description of a menu item that [`MenuExtensions`](./API-MenuExtensions.md) keeps registered: menu path, shortcut, checked state, sort priority and the callbacks Unity needs.

Every constructor sanitizes the name with [`MenuServiceWrap`](./API-MenuServiceWrap.md), so an item added at runtime is registered under the same path as an item declared with a `MenuItem` attribute. `Name` holds that sanitized path and is the key the item is tracked under.

## Constructors

```csharp
public MenuItemObject(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
public MenuItemObject(string name, string shortcut, int priority, Action execute)
public MenuItemObject(string name, int priority, Action execute)
public MenuItemObject(string name, Action execute)
```

The first form takes every field: `shortcut` may be an empty string, and `validate` decides whether the item is enabled, with `null` meaning always enabled. The shorter forms fill in the defaults: no checkmark, no shortcut (`""`) and no validation callback, and they all forward to the full form.

The last form has no `priority` argument and picks the default for its kind: 10 when the path starts with `GameObject/Create Other`, 1000 for every other path, which matches Unity's own ordering.

```csharp
MenuExtensions.AddMenuItem(new MenuItemObject("Tools/My Tool/Do Something", "#%g", 1000, DoSomething));
```

## Name

```csharp
public string Name { get; private set; }
```

Menu path after sanitizing; this is the key the item is tracked under, so it can differ from the string passed to the constructor.

## Shortcut

```csharp
public string Shortcut { get; private set; }
```

Shortcut string passed to Unity, e.g. `#%g`; empty when the item has none.

## Checked

```csharp
public bool Checked { get; private set; }
```

Whether Unity draws the item with a checkmark.

## Priority

```csharp
public int Priority { get; private set; }
```

Sort order within the submenu; lower values are drawn first.

## Execute

```csharp
public Action Execute { get; private set; }
```

Action run when the item is chosen.

## Validate

```csharp
public Func<bool>? Validate { get; private set; }
```

Predicate deciding whether the item is enabled, or `null` when it is always enabled.
