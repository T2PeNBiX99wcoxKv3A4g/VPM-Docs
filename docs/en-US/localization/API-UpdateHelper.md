# UpdateHelper

`io.github.ykysnk.Localization.Editor` · `public class UpdateHelper : IDisposable`

Keeps one label and tooltip pair up to date when the localization is reloaded or the language changes. Every registration is independent, so several elements can share the same key, and `Dispose` removes it again when the element goes away.

A handle stores the localization id, the key and the callback, and the loader keeps every live handle in one list that it walks after a reload or a language change. Disposing the handle is the only way to stop the callback, so a window that rebuilds its tree has to dispose what an earlier build registered.

## Callback

```csharp
public delegate void Callback(string newLabel, string newTooltip)
```

Receives the new label and tooltip of the registered key. The tooltip is `""` when the key has no tooltip entry.

## Register

```csharp
public static UpdateHelper Register(string localizationID, string localizeKey, Callback callback)
public static UpdateHelper Register(string localizationID, SerializedProperty property, Callback callback)
```

Registers `callback` for one key of one localization id and returns the handle that unregisters it. `Register` does not invoke the callback itself: it runs on the next language change or reload, so set the initial text with `S` and `Tooltip` first.

The `SerializedProperty` overload registers the key a label property would use, `label.{Type}.{field}`, derived from the target object's type name and the property name.

```csharp
var registration = UpdateHelper.Register("io.github.ykysnk.yky-toolkit", "label.my_window.title",
    (label, tooltip) => title.text = label);
```

## Dispose

```csharp
public void Dispose()
```

Stops updating the callback and removes the registration, both from the loader's list and from the per-key list. Call it when the element it updates is removed; after that the callback is never invoked again. Disposing a handle twice is harmless.
