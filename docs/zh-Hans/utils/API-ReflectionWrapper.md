# ReflectionWrapper

`io.github.ykysnk.utils.NonUdon` · `public static class ReflectionWrapper`

用于字段、属性与方法的缓存式反射查询，以及由它们构建的已编译委托。与 [`ReflectionUtils`](./API-ReflectionUtils.md) 不同，找不到成员时会抛出异常，而不是返回 `null`。

查询涵盖指定类型的 public 与非 public 实例及静态成员；仅存在于基类型的私有成员不会被找到。每个结果（包括已编译的委托）都会缓存，因此重复调用只需一次字典查询。

## GetType

```csharp
public static Type GetType(string typeName)
public static Type GetType(Type type)
```

解析 `Type.GetType(string, bool)` 接受的名称（例如完整名称或程序集限定名称），并按该名称缓存类型。`Type` 重载按完整名称缓存，并返回已缓存在该名称下的类型；没有完整名称的类型（泛型类型参数）会原样返回且永不缓存。

参数为 null 时抛出 `ArgumentNullException`；字符串重载在名称无法解析时还会抛出 `TypeLoadException`。

## GetField

```csharp
public static FieldInfo GetField(Type type, string fieldName)
```

查找字段（不论 public 或非 public、实例或静态），并按类型与名称缓存。仅声明于基类型的私有字段不会被找到。`type` 为 null 时抛出 `ArgumentNullException`，`fieldName` 为 null 或空字符串时抛出 `ArgumentException`，类型没有该名称的字段时抛出 `MissingFieldException`。

## GetProperty

```csharp
public static PropertyInfo GetProperty(Type type, string propertyName)
```

查找属性（不论 public 或非 public、实例或静态），并按类型与名称缓存。仅声明于基类型的私有属性不会被找到。`type` 为 null 时抛出 `ArgumentNullException`，`propertyName` 为 null 或空字符串时抛出 `ArgumentException`，类型没有该名称的属性时抛出 `MissingMemberException`。

## GetMethod

```csharp
public static MethodInfo GetMethod(Type type, string methodName, params Type[] parameterTypes)
```

查找参数类型与 `parameterTypes` 完全匹配的重载（不会对参数做任何转换）并缓存。无参数方法请传空数组。缓存键以结构化方式包含参数类型，因此 `params` 每次创建的数组仍能命中缓存。`type` 为 null 时抛出 `ArgumentNullException`，`methodName` 为 null 或空字符串时抛出 `ArgumentException`，没有匹配重载时抛出 `MissingMethodException`。

## GetDelegate

```csharp
public static TDelegate GetDelegate<TDelegate>(Type type, string methodName, params Type[] parameterTypes) where TDelegate : Delegate
```

用表达式树为方法编译委托并缓存。`TDelegate` 必须与方法匹配：实例方法的第一个参数接收实例，其余参数对应方法自身的参数。缓存键包含委托类型，因此同一个方法搭配两种委托类型会编译两次。

`type` 为 null 时抛出 `ArgumentNullException`，`methodName` 为 null 或空字符串时抛出 `ArgumentException`，没有匹配重载时抛出 `MissingMethodException`。

## GetFieldGetter

```csharp
public static Delegate GetFieldGetter(Type type, string fieldName)
public static FieldGetter<TField> GetFieldGetter<TField>(Type type, string fieldName)
public static FieldGetter<TInstance, TField> GetFieldGetter<TInstance, TField>(string fieldName)
```

构建并缓存 getter 委托：静态字段使用仅以字段类型参数化的 [`FieldGetter`](./API-ReflectionDelegates.md)，实例字段使用以实例类型与字段类型参数化的版本。具类型重载会转换该结果，因此静态版本用于实例字段时会抛出 `InvalidCastException`，实例版本用于静态字段时也一样；实例重载从 `TInstance` 取得要搜索的类型。

三者都在名称为 null 或空字符串时抛出 `ArgumentException`、类型没有该字段时抛出 `MissingFieldException`，前两者还会在 `type` 为 null 时抛出 `ArgumentNullException`。

## GetFieldSetter

```csharp
public static Delegate GetFieldSetter(Type type, string fieldName)
public static FieldSetter<TField> GetFieldSetter<TField>(Type type, string fieldName)
public static FieldSetter<TInstance, TField> GetFieldSetter<TInstance, TField>(string fieldName)
```

构建并缓存 setter 委托：静态字段使用仅以新值参数化的 [`FieldSetter`](./API-ReflectionDelegates.md)，实例字段使用以实例与新值参数化的版本。具类型重载会转换该结果，因此把静态字段请求为 `FieldSetter<TInstance, TField>` 会抛出 `InvalidCastException`，把实例字段请求为 `FieldSetter<TField>` 也一样。

三者都在名称为 null 或空字符串时抛出 `ArgumentException`、类型没有该字段时抛出 `MissingFieldException`，前两者还会在 `type` 为 null 时抛出 `ArgumentNullException`。

## GetPropertyGetter

```csharp
public static Delegate GetPropertyGetter(Type type, string propertyName)
public static PropertyGetter<TProperty> GetPropertyGetter<TProperty>(Type type, string propertyName)
public static PropertyGetter<TInstance, TProperty> GetPropertyGetter<TInstance, TProperty>(string propertyName)
```

构建并缓存 getter 委托：静态属性使用仅以属性类型参数化的 [`PropertyGetter`](./API-ReflectionDelegates.md)，实例属性使用以实例类型与属性类型参数化的版本。具类型重载会转换该结果，因此把静态属性请求为 `PropertyGetter<TInstance, TProperty>` 会抛出 `InvalidCastException`，把实例属性请求为 `PropertyGetter<TProperty>` 也一样。

三者都在属性没有 getter 时抛出 `InvalidOperationException`、名称为 null 或空字符串时抛出 `ArgumentException`、类型没有该属性时抛出 `MissingMemberException`，前两者还会在 `type` 为 null 时抛出 `ArgumentNullException`。

## GetPropertySetter

```csharp
public static Delegate GetPropertySetter(Type type, string propertyName)
public static PropertySetter<TProperty> GetPropertySetter<TProperty>(Type type, string propertyName)
public static PropertySetter<TInstance, TProperty> GetPropertySetter<TInstance, TProperty>(string propertyName)
```

构建并缓存 setter 委托：静态属性使用仅以新值参数化的 [`PropertySetter`](./API-ReflectionDelegates.md)，实例属性使用以实例与新值参数化的版本。具类型重载会转换该结果，因此把静态属性请求为 `PropertySetter<TInstance, TProperty>` 会抛出 `InvalidCastException`，把实例属性请求为 `PropertySetter<TProperty>` 也一样。

三者都在属性没有 setter 时抛出 `InvalidOperationException`、名称为 null 或空字符串时抛出 `ArgumentException`、类型没有该属性时抛出 `MissingMemberException`，前两者还会在 `type` 为 null 时抛出 `ArgumentNullException`。

## GetAction

```csharp
public static WrapAction GetAction(Type type, string methodName)
public static WrapAction<T1> GetAction<T1>(Type type, string methodName)
public static WrapAction<T1, T2> GetAction<T1, T2>(Type type, string methodName)
```

`GetDelegate` 的具类型包装，用于没有返回值的静态方法。上方列出零参数重载与前两个泛型参数数量；从 1 到 16 个参数都存在相同的重载。每个类型参数都是方法的参数类型，且所有重载共用委托缓存。实例方法请直接调用 `GetDelegate`，并把声明类型作为委托的第一个参数。

这些重载会抛出 `GetMethod` 抛出的异常，包括参数类型没有匹配重载时的 `MissingMethodException`。

## GetFunc

```csharp
public static WrapFunc<TR> GetFunc<TR>(Type type, string methodName)
public static WrapFunc<T1, TR> GetFunc<T1, TR>(Type type, string methodName)
public static WrapFunc<T1, T2, TR> GetFunc<T1, T2, TR>(Type type, string methodName)
```

用于有返回值之静态方法的相同包装：返回类型是最后一个类型参数 `TR`，且从 1 到 16 个参数也都有相同的重载。它们与 `GetAction`、`GetDelegate` 共用委托缓存，并抛出相同的异常。
