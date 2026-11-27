# EditorUtilityWrap

`io.github.ykysnk.utils.Editor` · `public static class EditorUtilityWrap`

Reflection wrapper over the internal part of `EditorUtility`.

The wrapped member is an undocumented Unity editor internal and not public API, so Unity can rename or remove it in any version. It is resolved once, when the static field is initialized, so a missing member fails there rather than on each call.

## Internal_UpdateAllMenus

```csharp
public static readonly WrapAction Internal_UpdateAllMenus;
```

The internal `EditorUtility.Internal_UpdateAllMenus` method, bound as a parameterless `WrapAction`, which makes Unity rebuild its menus. [`MenuExtensions`](./API-MenuExtensions.md) calls it after re-adding the items it keeps registered, and it is needed after adding a menu item at runtime.

```csharp
EditorUtilityWrap.Internal_UpdateAllMenus();
```
