# JsonUtils

`io.github.ykysnk.utils.NonUdon` · `public static class JsonUtils`

`JsonUtility` 的包裝器：回報失敗，而不是讓呼叫擲回例外或悄悄傳回 null。

每個成員的形式都相同：傳回 `bool`，透過 `out` 參數寫出結果，而且不會擲回例外。`JsonUtility` 傳回的 null 一律視為錯誤，因為解析成功的承載本應產生一個物件；當 `JsonUtility` 本身沒有擲回任何例外時，會改為回報一個合成的 `NullReferenceException` 或 `Exception`。

## TryFromJson

```csharp
public static bool TryFromJson<T>(string json, out T? result, out Exception? exception)
public static bool TryFromJson(string json, Type type, out object? result, out Exception? exception)
```

把 `json` 還原序列化為 `T`；當目標型別只能在執行時確定時，還原序列化為 `type` 的執行個體。傳回是否產生了非 null 的值；失敗時 `result` 為 `T` 的預設值（或 null），`exception` 保存中止呼叫的例外，包括針對 null 解析結果產生的合成例外。null 或空白輸入視為失敗而不是空物件，而且 Unity 要求 `type` 可序列化。

```csharp
if (JsonUtils.TryFromJson<Settings>(text, out var settings, out var error))
    Apply(settings);
```

## TryFromJsonOverwrite

```csharp
public static bool TryFromJsonOverwrite(string json, object objectToOverwrite, out Exception? exception)
```

把 `json` 套用到既有執行個體上，因此 JSON 未包含的欄位保留目前的值。`objectToOverwrite` 會被就地修改，且沒有可檢查 null 的傳回值，所以只有擲回的例外才會回報失敗；成功時 `exception` 為 null。

## TryToJson

```csharp
public static bool TryToJson(object obj, bool prettyPrint, out string? json, out Exception? exception)
public static bool TryToJson(object obj, out string? json, out Exception? exception)
```

序列化 `obj`，可選擇縮排輸出。傳回是否產生了非 null 字串；否則 `json` 為 null 並填好 `exception`。兩參數多載是精簡形式，會以 `prettyPrint` 為 false 轉送。Unity 只寫出 public 成員與帶 `[SerializeField]` 的成員。

```csharp
JsonUtils.TryToJson(settings, prettyPrint: true, out var text, out _);
```

## FromJsonOrDefault

```csharp
public static T FromJsonOrDefault<T>(string json, T defaultValue)
public static object FromJsonOrDefault(string json, Type type, object defaultValue)
```

還原序列化 `json`，在解析失敗或結果為 null 時傳回 `defaultValue`，而不是回報例外。

## ToJsonOrDefault

```csharp
public static string ToJsonOrDefault(object obj, bool prettyPrint, string defaultValue)
public static string ToJsonOrDefault(object obj, string defaultValue)
```

序列化 `obj`，在序列化失敗或結果為 null 時傳回 `defaultValue`。兩參數多載寫出精簡 JSON。
