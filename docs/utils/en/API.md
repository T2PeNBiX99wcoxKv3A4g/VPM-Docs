# API

## Logging and assertions

Every helper takes a prefix, so the console shows which package reported the message.

```csharp
using io.github.ykysnk.utils;

Utils.Log(nameof(MyWindow), "Opened");
Utils.LogWarning(nameof(MyWindow), "Nothing to do");
Utils.LogError(nameof(MyWindow), exception.Message, this);
Utils.Assert(condition, nameof(MyWindow), "Condition must hold");
```

`LogAssert` reports without throwing; `Assert` throws an assertion exception after logging.

## Environment

| Member | Returns |
| --- | --- |
| `Utils.IsInPrefab` | True when the selection is a prefab asset or a prefab stage object. |
| `Utils.IsPlaying` | True while play mode is active. |
| `Utils.ToLayer(LayerMask)` | The single layer index of a mask that has exactly one bit set. |

## Extensions

`io.github.ykysnk.utils.Extensions` holds the extension methods used by the other packages, for example:

```csharp
var path = assetPath.MiddlePath('(', ')');   // text between the first pair of brackets
var fullName = transform.FullName();          // "Root/Child/Leaf"
```

## Editor types

| Type | Purpose |
| --- | --- |
| `BasicEditor` | Inspector base class with the error UI. |
| `EditorTask` | Async task wrapper with progress and failure reporting. |
| `CustomDialogWindow` | Reusable modal prompt. |
| `MenuItemObject` | Declarative menu item (path, priority, validator, action). |
| `UpmInstaller` | Install, remove and update UPM packages. |

## Version

The package is versioned independently of the toolkit; `package.json` under `Packages/io.github.ykysnk.utils` is the
source of truth, and the release workflow publishes a VPM package for every tag.
