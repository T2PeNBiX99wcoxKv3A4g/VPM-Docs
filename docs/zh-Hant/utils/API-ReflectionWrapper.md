# ReflectionWrapper

`io.github.ykysnk.utils.NonUdon` · `public static class ReflectionWrapper`

用於欄位、屬性與方法的快取式反射查詢，以及由它們建置的已編譯委派。與 [`ReflectionUtils`](./API-ReflectionUtils.md) 不同，找不到成員時會擲回例外，而不是傳回 `null`。

查詢涵蓋指定型別的 public 與非 public 執行個體及靜態成員；僅存在於基底型別的私有成員不會被找到。每個結果（包括已編譯的委派）都會快取，因此重複呼叫只需一次字典查詢。

## GetType

```csharp
public static Type GetType(string typeName)
public static Type GetType(Type type)
```

解析 `Type.GetType(string, bool)` 接受的名稱（例如完整名稱或組件限定名稱），並依該名稱快取型別。`Type` 多載依完整名稱快取，並傳回已快取在該名稱下的型別；沒有完整名稱的型別（泛型型別參數）會原樣傳回且永不快取。

引數為 null 時擲回 `ArgumentNullException`；字串多載在名稱無法解析時還會擲回 `TypeLoadException`。

## GetField

```csharp
public static FieldInfo GetField(Type type, string fieldName)
```

尋找欄位（不論 public 或非 public、執行個體或靜態），並依型別與名稱快取。僅宣告於基底型別的私有欄位不會被找到。`type` 為 null 時擲回 `ArgumentNullException`，`fieldName` 為 null 或空字串時擲回 `ArgumentException`，型別沒有該名稱的欄位時擲回 `MissingFieldException`。

## GetProperty

```csharp
public static PropertyInfo GetProperty(Type type, string propertyName)
```

尋找屬性（不論 public 或非 public、執行個體或靜態），並依型別與名稱快取。僅宣告於基底型別的私有屬性不會被找到。`type` 為 null 時擲回 `ArgumentNullException`，`propertyName` 為 null 或空字串時擲回 `ArgumentException`，型別沒有該名稱的屬性時擲回 `MissingMemberException`。

## GetMethod

```csharp
public static MethodInfo GetMethod(Type type, string methodName, params Type[] parameterTypes)
```

尋找參數型別與 `parameterTypes` 完全相符的多載（不會對引數做任何轉換）並快取。無參數方法請傳空陣列。快取鍵以結構方式包含參數型別，因此 `params` 每次建立的陣列仍能命中快取。`type` 為 null 時擲回 `ArgumentNullException`，`methodName` 為 null 或空字串時擲回 `ArgumentException`，沒有相符多載時擲回 `MissingMethodException`。

## GetDelegate

```csharp
public static TDelegate GetDelegate<TDelegate>(Type type, string methodName, params Type[] parameterTypes) where TDelegate : Delegate
```

以運算式樹為方法編譯委派並快取。`TDelegate` 必須與方法相符：執行個體方法的第一個參數接收執行個體，其餘參數對應方法自身的參數。快取鍵包含委派型別，因此同一個方法搭配兩種委派型別會編譯兩次。

`type` 為 null 時擲回 `ArgumentNullException`，`methodName` 為 null 或空字串時擲回 `ArgumentException`，沒有相符多載時擲回 `MissingMethodException`。

## GetFieldGetter

```csharp
public static Delegate GetFieldGetter(Type type, string fieldName)
public static FieldGetter<TField> GetFieldGetter<TField>(Type type, string fieldName)
public static FieldGetter<TInstance, TField> GetFieldGetter<TInstance, TField>(string fieldName)
```

建置並快取 getter 委派：靜態欄位使用僅以欄位型別參數化的 [`FieldGetter`](./API-ReflectionDelegates.md)，執行個體欄位使用以執行個體型別與欄位型別參數化的版本。具型別多載會轉型該結果，因此靜態版本用於執行個體欄位時會擲回 `InvalidCastException`，執行個體版本用於靜態欄位時也一樣；執行個體多載從 `TInstance` 取得要搜尋的型別。

三者都在名稱為 null 或空字串時擲回 `ArgumentException`、型別沒有該欄位時擲回 `MissingFieldException`，前兩者還會在 `type` 為 null 時擲回 `ArgumentNullException`。

## GetFieldSetter

```csharp
public static Delegate GetFieldSetter(Type type, string fieldName)
public static FieldSetter<TField> GetFieldSetter<TField>(Type type, string fieldName)
public static FieldSetter<TInstance, TField> GetFieldSetter<TInstance, TField>(string fieldName)
```

建置並快取 setter 委派：靜態欄位使用僅以新值參數化的 [`FieldSetter`](./API-ReflectionDelegates.md)，執行個體欄位使用以執行個體與新值參數化的版本。具型別多載會轉型該結果，因此把靜態欄位要求為 `FieldSetter<TInstance, TField>` 會擲回 `InvalidCastException`，把執行個體欄位要求為 `FieldSetter<TField>` 也一樣。

三者都在名稱為 null 或空字串時擲回 `ArgumentException`、型別沒有該欄位時擲回 `MissingFieldException`，前兩者還會在 `type` 為 null 時擲回 `ArgumentNullException`。

## GetPropertyGetter

```csharp
public static Delegate GetPropertyGetter(Type type, string propertyName)
public static PropertyGetter<TProperty> GetPropertyGetter<TProperty>(Type type, string propertyName)
public static PropertyGetter<TInstance, TProperty> GetPropertyGetter<TInstance, TProperty>(string propertyName)
```

建置並快取 getter 委派：靜態屬性使用僅以屬性型別參數化的 [`PropertyGetter`](./API-ReflectionDelegates.md)，執行個體屬性使用以執行個體型別與屬性型別參數化的版本。具型別多載會轉型該結果，因此把靜態屬性要求為 `PropertyGetter<TInstance, TProperty>` 會擲回 `InvalidCastException`，把執行個體屬性要求為 `PropertyGetter<TProperty>` 也一樣。

三者都在屬性沒有 getter 時擲回 `InvalidOperationException`、名稱為 null 或空字串時擲回 `ArgumentException`、型別沒有該屬性時擲回 `MissingMemberException`，前兩者還會在 `type` 為 null 時擲回 `ArgumentNullException`。

## GetPropertySetter

```csharp
public static Delegate GetPropertySetter(Type type, string propertyName)
public static PropertySetter<TProperty> GetPropertySetter<TProperty>(Type type, string propertyName)
public static PropertySetter<TInstance, TProperty> GetPropertySetter<TInstance, TProperty>(string propertyName)
```

建置並快取 setter 委派：靜態屬性使用僅以新值參數化的 [`PropertySetter`](./API-ReflectionDelegates.md)，執行個體屬性使用以執行個體與新值參數化的版本。具型別多載會轉型該結果，因此把靜態屬性要求為 `PropertySetter<TInstance, TProperty>` 會擲回 `InvalidCastException`，把執行個體屬性要求為 `PropertySetter<TProperty>` 也一樣。

三者都在屬性沒有 setter 時擲回 `InvalidOperationException`、名稱為 null 或空字串時擲回 `ArgumentException`、型別沒有該屬性時擲回 `MissingMemberException`，前兩者還會在 `type` 為 null 時擲回 `ArgumentNullException`。

## GetAction

```csharp
public static WrapAction GetAction(Type type, string methodName)
public static WrapAction<T1> GetAction<T1>(Type type, string methodName)
public static WrapAction<T1, T2> GetAction<T1, T2>(Type type, string methodName)
```

`GetDelegate` 的具型別包裝，用於沒有傳回值的靜態方法。上方列出零引數多載與前兩個泛型參數數量；從 1 到 16 個參數都存在相同的多載。每個型別引數都是方法的參數型別，且所有多載共用委派快取。執行個體方法請直接呼叫 `GetDelegate`，並把宣告型別作為委派的第一個參數。

這些多載會擲回 `GetMethod` 擲回的例外，包括參數型別沒有相符多載時的 `MissingMethodException`。

## GetFunc

```csharp
public static WrapFunc<TR> GetFunc<TR>(Type type, string methodName)
public static WrapFunc<T1, TR> GetFunc<T1, TR>(Type type, string methodName)
public static WrapFunc<T1, T2, TR> GetFunc<T1, T2, TR>(Type type, string methodName)
```

用於有傳回值之靜態方法的相同包裝：傳回型別是最後一個型別引數 `TR`，且從 1 到 16 個參數也都有相同的多載。它們與 `GetAction`、`GetDelegate` 共用委派快取，並擲回相同的例外。
