# 反射

## ReflectionUtils

`io.github.ykysnk.utils.NonUdon` · `public static class ReflectionUtils`

以記錄代替擲回例外的反射輔助方法：找不到的成員會回傳 `null` / `default`，因此可以直接用來探測選用依賴是否存在。

查詢結果依型別與名稱快取，找不到的結果也會保留，因此重複呼叫只需一次字典查詢。`FindType` 只快取已解析的名稱，
因為組件可能稍後才載入。

### Instantiate&lt;T&gt;(Type type)

```csharp
public static T? Instantiate<T>(Type type)
```

用無參數建構子建立實例並轉型為 `T`；失敗時記錄警告並回傳 `default`。

### GetNestedMethods(Type? type)

```csharp
public static IEnumerable<MethodInfo> GetNestedMethods(Type? type)
```

延遲列舉 `type` 的巢狀型別所宣告的所有方法（不論是否 public）。執行階段無法列舉的巢狀型別會被略過。

### GetNestedMethod(Type? type, string name, string? searchName = null)

```csharp
public static MethodInfo? GetNestedMethod(Type? type, string name, string? searchName = null)
```

回傳名稱包含 `searchName` 的第一個巢狀方法。`searchName` 預設為 `<name>`，也就是編譯器給名為 `name` 的成員的
lambda、async 本體或區域函式所產生的名稱。

### FindType(string? typeName)

```csharp
public static Type? FindType(string? typeName)
```

在已載入的組件中解析完整名稱（或組件限定名稱）；找不到時回傳 `null`。

### FindMethod(Type? type, string name)

```csharp
public static MethodInfo? FindMethod(Type? type, string name)
```

回傳該名稱的第一個方法，不論 public、static 或繼承而來；沒有時回傳 `null`。僅依名稱比對，有多載時回傳先找到的
那一個。

### FindProperty(Type? type, string name)

```csharp
public static PropertyInfo? FindProperty(Type? type, string name)
```

回傳該名稱的屬性（不論是否 public）；沒有時回傳 `null`。

### GetDeclaredMethods(Type? type)

```csharp
public static IEnumerable<MethodInfo> GetDeclaredMethods(Type? type)
```

回傳該型別自身宣告的所有方法（不含巢狀型別的），不論是否 public。
