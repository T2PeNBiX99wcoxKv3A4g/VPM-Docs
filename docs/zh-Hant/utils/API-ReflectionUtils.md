# ReflectionUtils

`io.github.ykysnk.utils.NonUdon` · `public static class ReflectionUtils`

供無法直接參考的型別（例如編譯器產生的閉包與狀態機）使用的反射輔助方法。

失敗時會記錄為警告並產生預設值，而不是擲回例外，因此這些成員可以安全地用於探測選用相依性。查詢結果會快取，所以在迴圈中呼叫 `FindMethod` 或 `FindProperty` 只需一次字典查詢，而不是一次反射走訪。確認找不到的結果也會快取，但 `FindType` 例外，因為組件仍可能稍後才載入。

## Instantiate

```csharp
public static T? Instantiate<T>(Type type)
```

以無參數建構子建立 `type` 的執行個體並轉型為 `T`。缺少建構子、建構子擲回例外或轉型失敗時會記錄為警告並傳回 `default`。

## GetNestedMethods

```csharp
public static IEnumerable<MethodInfo> GetNestedMethods(Type? type)
```

逐一產生 `type` 之巢狀型別所宣告的每個方法，不論 public 或 static。結果是延遲的，因此會隨著序列走訪才進行反射；執行階段拒絕列舉的巢狀型別會被略過。`type` 為 null 時不產生任何項目。

## GetNestedMethod

```csharp
public static MethodInfo? GetNestedMethod(Type? type, string name, string? searchName = null)
```

傳回 `GetNestedMethods` 找到的第一個名稱包含 `searchName` 的方法；沒有符合項目時傳回 `null`。`searchName` 預設為 `<name>`，這是編譯器給名為 `name` 之成員所產生方法的名稱 —— lambda、async 本體與區域函式。

```csharp
var moveNext = ReflectionUtils.GetNestedMethod(stateMachineType, "MoveNext");
```

## FindType

```csharp
public static Type? FindType(string? typeName)
```

在已載入的組件中解析完整或組件限定名稱，因此可以探測選用相依性而不需參考它。名稱無法解析時傳回 `null` 而不是擲回例外；解析成功的型別會依名稱快取，找不到的則不快取。

## FindMethod

```csharp
public static MethodInfo? FindMethod(Type? type, string name)
```

僅依名稱尋找方法，不論 public、static、執行個體、宣告或繼承，並在型別沒有該名稱時傳回 `null`。解析到的方法或確認找不到的結果會依型別與名稱快取；比對僅依名稱，因此多載會解析為先找到的那一個。

## FindProperty

```csharp
public static PropertyInfo? FindProperty(Type? type, string name)
```

僅依名稱尋找屬性，不論是否 public；型別沒有該名稱時傳回 `null`。解析到的屬性或確認找不到的結果會依型別與名稱快取。

## GetDeclaredMethods

```csharp
public static IEnumerable<MethodInfo> GetDeclaredMethods(Type? type)
```

該型別自身宣告的每個方法，不論是否 public。與 `GetNestedMethods` 不同，這不會查看巢狀型別。清單每個型別只解析一次並重複使用，因此請勿修改傳回的序列。
