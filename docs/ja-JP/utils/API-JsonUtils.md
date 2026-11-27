# JsonUtils

`io.github.ykysnk.utils.NonUdon` · `public static class JsonUtils`

`JsonUtility` のラッパーです。呼び出しが例外を投げたり、黙って null を返したりする代わりに、失敗を報告します。

どのメンバーも形は同じで、`bool` を返し、結果を `out` 引数で受け取り、例外をスローしません。`JsonUtility` の null は常にエラーとして扱います。解析に成功したペイロードならオブジェクトができているはずだからです。`JsonUtility` 自身が何も投げなかった場合は、代わりに合成した `NullReferenceException` または `Exception` を報告します。

## TryFromJson

```csharp
public static bool TryFromJson<T>(string json, out T? result, out Exception? exception)
public static bool TryFromJson(string json, Type type, out object? result, out Exception? exception)
```

`json` を `T` に、対象の型が実行時にしか分からない場合は `type` のインスタンスに逆シリアライズします。null でない値が得られたかどうかを返します。失敗時は `result` が `T` の既定値（または null）になり、`exception` には呼び出しを止めた例外が入ります。null の解析結果に対する合成例外も含みます。null や空の入力は空のオブジェクトではなく失敗で、Unity では `type` がシリアライズ可能である必要があります。

```csharp
if (JsonUtils.TryFromJson<Settings>(text, out var settings, out var error))
    Apply(settings);
```

## TryFromJsonOverwrite

```csharp
public static bool TryFromJsonOverwrite(string json, object objectToOverwrite, out Exception? exception)
```

既存のインスタンスに `json` を適用するため、JSON にないフィールドは現在の値を保ちます。`objectToOverwrite` はその場で変更され、null を確認できる戻り値がないので、失敗を報告するのはスローされた例外だけです。成功時は `exception` が null になります。

## TryToJson

```csharp
public static bool TryToJson(object obj, bool prettyPrint, out string? json, out Exception? exception)
public static bool TryToJson(object obj, out string? json, out Exception? exception)
```

`obj` をシリアライズし、必要なら出力をインデントします。null でない文字列が得られたかどうかを返し、それ以外では `json` が null になり `exception` が設定されます。引数 2 つのオーバーロードはコンパクト形式で、`prettyPrint` を false にして転送します。Unity が書き出すのは public メンバーと `[SerializeField]` メンバーだけです。

```csharp
JsonUtils.TryToJson(settings, prettyPrint: true, out var text, out _);
```

## FromJsonOrDefault

```csharp
public static T FromJsonOrDefault<T>(string json, T defaultValue)
public static object FromJsonOrDefault(string json, Type type, object defaultValue)
```

`json` を逆シリアライズし、解析に失敗したか null になった場合は例外を報告せず `defaultValue` を返します。

## ToJsonOrDefault

```csharp
public static string ToJsonOrDefault(object obj, bool prettyPrint, string defaultValue)
public static string ToJsonOrDefault(object obj, string defaultValue)
```

`obj` をシリアライズし、シリアライズに失敗したか null になった場合は `defaultValue` を返します。引数 2 つのオーバーロードはコンパクトな JSON を書き出します。
