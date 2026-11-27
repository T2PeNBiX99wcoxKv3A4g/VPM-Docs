# TranslateClipboard

`io.github.ykysnk.Localization.Editor` · `public static class TranslateClipboard`

Clipboard handling for translation entries, shared by the inspector and the row drawer. A copied entry is the JSON form of a [`BasicTranslate`](./API-BasicTranslate.md), read back with `JsonUtility`, so a button can tell whether a paste is possible before it touches a row.

## HasEntry

```csharp
public static bool HasEntry()
```

Whether the clipboard currently holds a translation entry. The answer is cached for the clipboard text, so a button can ask for it often without parsing the JSON again; it is only recomputed when the text changes.

## TryRead

```csharp
public static bool TryRead([NotNullWhen(true)] out BasicTranslate? basicTranslate, out Exception? exception)
```

Tries to read a `BasicTranslate` from the clipboard. The text must parse as JSON and carry a non-empty `key`, so an empty clipboard or an unrelated JSON object is rejected instead of overwriting the row with empty values: `JsonUtility` runs the field initializers, which leaves `translate` empty whenever the JSON omits it, so only the key tells a translation entry apart from any other JSON object.

`basicTranslate` is the parsed entry when the method returns true, otherwise null. `exception` is the parse or validation error, or null when the clipboard was simply empty.

```csharp
if (TranslateClipboard.TryRead(out var entry, out var error))
    Paste(entry);
else if (error != null)
    Debug.LogWarning(error.Message);
```
