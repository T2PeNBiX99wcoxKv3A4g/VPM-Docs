# LocalizationExtensions

`io.github.ykysnk.Localization.Editor` · `public static class LocalizationExtensions`

The editor UI sugar: `"label.some_key".S()`, `tree.UILocalize()` and friends, with the helper taken from the `LocalizationPackageAttribute` of the assembly that makes the call. A package only has to declare that attribute once, so it does not need a wrapper class of its own.

Every method carries `[MethodImpl(MethodImplOptions.NoInlining)]`, so the attribute is repeated in each signature below: `Assembly.GetCallingAssembly` reports this assembly instead of the consumer as soon as the call gets inlined into it, and that assembly is the one whose `LocalizationPackageAttribute` selects the localization.

## S

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static string S(this string key)
[MethodImpl(MethodImplOptions.NoInlining)]
public static string S(this SerializedProperty property)
```

Text of `key` in the calling assembly's localization, with the same fallback as `LocalizationHelper.S`: the selected language, then English, then the key itself, so a missing translation never throws. The `SerializedProperty` overload builds `label.{Type}.{field}` from the target type name and the field name, both converted to lower snake case, so a `displayName` field on `MyWindow` is `label.my_window.display_name`.

```csharp
label.text = "label.my_window.title".S();
```

## Sf

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static string Sf(this string key, params object?[] args)
```

Text of `key` run through `string.Format`. A format string that does not match the arguments is returned as `text(arg1, arg2)` instead of throwing.

```csharp
label.text = "label.found_count".Sf(count);
```

## G

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static GUIContent G(this string key)
[MethodImpl(MethodImplOptions.NoInlining)]
public static GUIContent G(this SerializedProperty property)
```

`GUIContent` with the text of `key` and the entry stored under `key + ":tooltip"` as the tooltip, which is empty when there is none; the `SerializedProperty` overload uses the key derived from the property. One `GUIContent` is cached per localization id and key and rewritten on every call, so a language change alone does not update it and the next `G` call refreshes it.

```csharp
GUILayout.Label("label.my_window.title".G());
```

## Tooltip

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static string Tooltip(this string key)
[MethodImpl(MethodImplOptions.NoInlining)]
public static string Tooltip(this SerializedProperty property)
```

Tooltip of `key`, that is the entry stored with the `:tooltip` suffix. A missing entry falls back like `S` does, so `Tooltip("label.foo")` returns `label.foo:tooltip` when nothing is stored; the `SerializedProperty` overload asks for the derived key and returns an empty string instead.

## UILocalize

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static void UILocalize(this VisualElement element, bool addLanguagePopup = true, int spaceHeight = 8)
```

Replaces the keys in `element`'s tree with their translations and keeps them up to date. Call it before binding the tree: the tree is localized immediately, so keys never reach the screen, and once more after the binding pass because bindings can put the key back. With `addLanguagePopup` the language picker is appended below a gap of `spaceHeight`, and registrations are disposed when an element leaves the panel. See [`LocalizationHelper`](./API-LocalizationHelper.md) for the attributes it reads, the elements it skips and the second pass.

```csharp
root.UILocalize();
```

## Register

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static UpdateHelper Register(this string localizeKey, UpdateHelper.Callback callback)
[MethodImpl(MethodImplOptions.NoInlining)]
public static UpdateHelper Register(this SerializedProperty property, UpdateHelper.Callback callback)
```

Registers `callback` for `localizeKey` and returns the handle that unregisters it. The callback receives the label and the `:tooltip` text, and runs on the next language change or reload rather than during `Register` itself. Dispose the handle when the element it updates goes away; the `SerializedProperty` overload registers the key derived from the property.
