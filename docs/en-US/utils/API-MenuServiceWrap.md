# MenuServiceWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuServiceWrap`

Reflection wrapper over the internal `UnityEditor.MenuService` class.

The wrapped members are undocumented Unity editor internals and not public API, so Unity can rename or remove them in any version, and a member that no longer exists makes the call throw `MissingMethodException`.

## SanitizeMenuItemName

```csharp
public static string SanitizeMenuItemName(string menuName)
```

Runs Unity's own menu path cleanup, so a path added at runtime is registered exactly as Unity would register it from a `MenuItem` attribute. Returns the path Unity registers the item under, which is the path [`MenuItemObject`](./API-MenuItemObject.md) keeps as its `Name`.

## ValidateMethodForMenuCommand

```csharp
public static bool ValidateMethodForMenuCommand(MethodInfo methodInfo)
```

Asks Unity whether a method is usable as a menu command, using the same rules it applies to `MenuItem` methods.
