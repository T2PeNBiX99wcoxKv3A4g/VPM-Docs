# Reflect

`io.github.ykysnk.utils.NonUdon.Reflection` · `public static class Reflect`

仿照 HarmonyLib 的 `Traverse`，但不需 Harmony、也不會在每次存取時重新解析成員的快取式反射存取。`Reflect.For` 會為執行個體或型別傳回 `ReflectionAccess`，其上的 `Field`、`Property` 與 `Method` 會傳回 `FieldAccess`、`PropertyAccess` 與 `MethodAccess`。

成員會在建立存取子時解析一次，其存取子也只編譯一次，因此重複使用的存取子是一次委派呼叫，而不是 `FieldInfo.GetValue`。無法編譯時（例如 IL2CPP），存取子會退回一般反射。建立存取子不會因找不到成員而擲回例外：`Exists` 會回報、`TryGet` 與 `TryInvoke` 傳回 false，只有 `Get` 與 `Invoke` 會擲回。查詢會沿著目標型別及其基底型別尋找已宣告的成員，因此也能取得基底型別的私有成員。

## For

```csharp
public static ReflectionAccess For(object target)
public static ReflectionAccess For(Type type)
```

為執行個體建立存取子（由其執行階段型別決定成員的搜尋位置），或為型別的靜態成員建立存取子（包含其基底型別）。第二種情況下 `Target` 為 `null`，因此由型別建立的 `MethodAccess` 會偏好靜態多載。

```csharp
var health = Reflect.For(component).Field("health");
var value = health.Get<int>();        // delegate call, safe to reuse in a loop
health.Set(3);

var name = Reflect.For(type).Method("BuildName", 1, "x").Invoke<string>();
```

## ReflectionAccess

`io.github.ykysnk.utils.NonUdon.Reflection` · `public readonly struct ReflectionAccess`

可供讀取成員的執行個體，或靜態成員所用的型別。它由 `Reflect.For` 建立；建構子為 internal。

### Target

```csharp
public object? Target { get; }
```

存取子所讀取的執行個體，靜態存取時為 `null`。

### Type

```csharp
public Type Type { get; }
```

成員查詢所在的型別。

### Field

```csharp
public FieldAccess Field(string name)
```

建立欄位存取子；成員會立即解析，找不到欄位不會擲回例外。`name` 會先在目標型別上尋找，再沿著基底型別往上找。

### Property

```csharp
public PropertyAccess Property(string name)
```

建立屬性存取子；成員會立即解析，找不到屬性不會擲回例外。`name` 會先在目標型別上尋找，再沿著基底型別往上找。

### Method

```csharp
public MethodAccess Method(string name, params object?[] arguments)
```

建立方法存取子並挑選符合 `arguments` 的多載：由它們的執行階段型別決定，`null` 可比對任何參考型別或可為 null 的參數，不傳引數則選無參數方法。整個陣列傳 `null` 等同於不傳，泛型方法定義永遠不會被選中。完全相符的參數型別優先於可指派者；有目標時偏好執行個體方法，沒有目標時偏好靜態方法。

## FieldAccess

`io.github.ykysnk.utils.NonUdon.Reflection` · `public readonly struct FieldAccess`

目標型別的一個欄位，於建立存取子時解析。

### Exists

```csharp
public bool Exists { get; }
```

是否找到該欄位。

### CanWrite

```csharp
public bool CanWrite { get; }
```

欄位是否可指派；readonly 與 const 欄位為 false。

### MemberType

```csharp
public Type? MemberType { get; }
```

欄位的宣告型別，找不到時為 `null`。

### Get

```csharp
public T? Get<T>()
```

讀取欄位並轉型為 `T`；欄位為 `null` 時得到 `default`。欄位不存在時擲回 `MissingFieldException`，無法讀取時擲回 `MemberAccessException`。

### TryGet

```csharp
public bool TryGet<T>(out T? value)
```

在欄位存在且可讀取時讀入 `value` 並傳回 true；否則 `value` 為 `default`，結果為 false。

### Set

```csharp
public bool Set(object? value)
```

寫入欄位，並把 `value` 轉換為欄位型別；`null` 僅適用於參考型別與可為 null 的型別。欄位不存在或無法寫入時傳回 false。

## PropertyAccess

`io.github.ykysnk.utils.NonUdon.Reflection` · `public readonly struct PropertyAccess`

目標型別的一個屬性，於建立存取子時解析。

### Exists

```csharp
public bool Exists { get; }
```

是否找到該屬性。

### CanWrite

```csharp
public bool CanWrite { get; }
```

屬性是否可指派；沒有 setter 時為 false。

### MemberType

```csharp
public Type? MemberType { get; }
```

屬性的宣告型別，找不到時為 `null`。

### Get

```csharp
public T? Get<T>()
```

讀取屬性並轉型為 `T`；屬性為 `null` 時得到 `default`。屬性不存在時擲回 `MissingMemberException`，沒有 getter 時擲回 `MemberAccessException`。

### TryGet

```csharp
public bool TryGet<T>(out T? value)
```

在屬性存在且可讀取時讀入 `value` 並傳回 true；否則 `value` 為 `default`，結果為 false。

### Set

```csharp
public bool Set(object? value)
```

寫入屬性，並把 `value` 轉換為屬性型別；`null` 僅適用於參考型別與可為 null 的型別。屬性不存在或無法寫入時傳回 false。

## MethodAccess

`io.github.ykysnk.utils.NonUdon.Reflection` · `public readonly struct MethodAccess`

目標型別的一個方法，以及它將被呼叫時使用的引數，於建立存取子時解析。

### Exists

```csharp
public bool Exists { get; }
```

是否找到符合目前引數的方法多載。

### ReturnType

```csharp
public Type? ReturnType { get; }
```

已解析多載的傳回型別，沒有符合項目時為 `null`。

### TryInvoke

```csharp
public bool TryInvoke(out object? result)
public bool TryInvoke<T>(out T? result)
```

以傳給 `Method` 的引數呼叫方法，並在存在符合的多載時傳回 true。`result` 接收傳回值；沒有符合的多載或方法傳回 void 時為 `null` / `default`。

### Invoke

```csharp
public object? Invoke()
public T? Invoke<T>()
```

以傳給 `Method` 的引數呼叫方法並傳回結果，void 方法為 `null`；泛型形式會轉型為 `T`。沒有符合引數的多載時擲回 `MissingMethodException`。
