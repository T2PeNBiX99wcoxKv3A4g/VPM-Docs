# JsonUtils

`io.github.ykysnk.utils.NonUdon` · `public static class JsonUtils`

Wrappers around `JsonUtility` that report failure instead of letting a call throw or quietly return null.

Every member follows the same shape: it returns a `bool`, writes the outcome through `out` parameters, and does not throw. A null result from `JsonUtility` is always treated as an error, because a payload that parsed successfully should have produced an object; when `JsonUtility` raised nothing of its own, a synthetic `NullReferenceException` or `Exception` is reported instead.

## TryFromJson

```csharp
public static bool TryFromJson<T>(string json, out T? result, out Exception? exception)
public static bool TryFromJson(string json, Type type, out object? result, out Exception? exception)
```

Deserializes `json` into `T`, or into an instance of `type` when the target is only known at run time. Returns whether a non-null value was produced; on failure `result` is the default of `T` (or null) and `exception` holds the exception that stopped the call, including the synthetic one for a null parse. Null or blank input is a failure, not an empty object, and Unity requires `type` to be serializable.

```csharp
if (JsonUtils.TryFromJson<Settings>(text, out var settings, out var error))
    Apply(settings);
```

## TryFromJsonOverwrite

```csharp
public static bool TryFromJsonOverwrite(string json, object objectToOverwrite, out Exception? exception)
```

Applies `json` onto an existing instance, so fields the JSON omits keep their current values. `objectToOverwrite` is modified in place, and there is no return value to check for null, so only a thrown exception reports failure; `exception` is null on success.

## TryToJson

```csharp
public static bool TryToJson(object obj, bool prettyPrint, out string? json, out Exception? exception)
public static bool TryToJson(object obj, out string? json, out Exception? exception)
```

Serializes `obj`, optionally indenting the output. Returns whether a non-null string was produced; otherwise `json` is null and `exception` is filled in. The two-argument overload is the compact form and forwards with `prettyPrint` false. Unity only writes public and `[SerializeField]` members.

```csharp
JsonUtils.TryToJson(settings, prettyPrint: true, out var text, out _);
```

## FromJsonOrDefault

```csharp
public static T FromJsonOrDefault<T>(string json, T defaultValue)
public static object FromJsonOrDefault(string json, Type type, object defaultValue)
```

Deserializes `json` and returns `defaultValue` when the parse fails or yields null, instead of reporting an exception.

## ToJsonOrDefault

```csharp
public static string ToJsonOrDefault(object obj, bool prettyPrint, string defaultValue)
public static string ToJsonOrDefault(object obj, string defaultValue)
```

Serializes `obj` and returns `defaultValue` when serialization fails or yields null. The two-argument overload writes compact JSON.
