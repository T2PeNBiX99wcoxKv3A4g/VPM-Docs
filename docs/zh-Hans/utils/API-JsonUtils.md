# JsonUtils

`io.github.ykysnk.utils.NonUdon` · `public static class JsonUtils`

`JsonUtility` 的包装器：报告失败，而不是让调用抛出异常或悄悄返回 null。

每个成员的形式都相同：返回 `bool`，通过 `out` 参数写出结果，并且不会抛出异常。`JsonUtility` 返回的 null 一律视为错误，因为解析成功的负载本应产生一个对象；当 `JsonUtility` 自身没有抛出任何异常时，会改为报告一个合成的 `NullReferenceException` 或 `Exception`。

## TryFromJson

```csharp
public static bool TryFromJson<T>(string json, out T? result, out Exception? exception)
public static bool TryFromJson(string json, Type type, out object? result, out Exception? exception)
```

把 `json` 反序列化为 `T`；当目标类型只能在运行时确定时，反序列化为 `type` 的实例。返回是否产生了非 null 的值；失败时 `result` 为 `T` 的默认值（或 null），`exception` 保存中止调用的异常，包括针对 null 解析结果生成的合成异常。null 或空白输入视为失败而不是空对象，并且 Unity 要求 `type` 可序列化。

```csharp
if (JsonUtils.TryFromJson<Settings>(text, out var settings, out var error))
    Apply(settings);
```

## TryFromJsonOverwrite

```csharp
public static bool TryFromJsonOverwrite(string json, object objectToOverwrite, out Exception? exception)
```

把 `json` 应用到已有实例上，因此 JSON 未包含的字段保留当前值。`objectToOverwrite` 会被就地修改，且没有可检查 null 的返回值，所以只有抛出的异常才会报告失败；成功时 `exception` 为 null。

## TryToJson

```csharp
public static bool TryToJson(object obj, bool prettyPrint, out string? json, out Exception? exception)
public static bool TryToJson(object obj, out string? json, out Exception? exception)
```

序列化 `obj`，可选择缩进输出。返回是否产生了非 null 字符串；否则 `json` 为 null 并填好 `exception`。两参数重载是紧凑形式，会以 `prettyPrint` 为 false 转发。Unity 只写出 public 成员和带 `[SerializeField]` 的成员。

```csharp
JsonUtils.TryToJson(settings, prettyPrint: true, out var text, out _);
```

## FromJsonOrDefault

```csharp
public static T FromJsonOrDefault<T>(string json, T defaultValue)
public static object FromJsonOrDefault(string json, Type type, object defaultValue)
```

反序列化 `json`，在解析失败或结果为 null 时返回 `defaultValue`，而不是报告异常。

## ToJsonOrDefault

```csharp
public static string ToJsonOrDefault(object obj, bool prettyPrint, string defaultValue)
public static string ToJsonOrDefault(object obj, string defaultValue)
```

序列化 `obj`，在序列化失败或结果为 null 时返回 `defaultValue`。两参数重载写出紧凑 JSON。
