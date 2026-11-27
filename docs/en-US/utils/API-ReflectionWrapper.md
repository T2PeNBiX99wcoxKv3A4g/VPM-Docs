# ReflectionWrapper

`io.github.ykysnk.utils.NonUdon` · `public static class ReflectionWrapper`

Cached reflection lookups for fields, properties and methods, and compiled delegates built from them. Unlike [`ReflectionUtils`](./API-ReflectionUtils.md), a missing member throws instead of returning `null`.

Lookups cover public and non-public instance and static members of the given type; private members that exist only on a base type are not reached. Every result, including a compiled delegate, is cached, so a repeated call costs a dictionary lookup.

## GetType

```csharp
public static Type GetType(string typeName)
public static Type GetType(Type type)
```

Resolves a name accepted by `Type.GetType(string, bool)`, for example a full or assembly-qualified name, and caches the type under that name. The `Type` overload caches by full name and returns the type already cached under that name; a type without a full name (a generic type parameter) is returned unchanged and never cached.

Throws `ArgumentNullException` when the argument is null, and the string overload also throws `TypeLoadException` when the name cannot be resolved.

## GetField

```csharp
public static FieldInfo GetField(Type type, string fieldName)
```

Finds the field, public or non-public, instance or static, and caches it by type and name. A private field declared only on a base type is not found. Throws `ArgumentNullException` when `type` is null, `ArgumentException` when `fieldName` is null or empty, and `MissingFieldException` when the type has no field with that name.

## GetProperty

```csharp
public static PropertyInfo GetProperty(Type type, string propertyName)
```

Finds the property, public or non-public, instance or static, and caches it by type and name. A private property declared only on a base type is not found. Throws `ArgumentNullException` when `type` is null, `ArgumentException` when `propertyName` is null or empty, and `MissingMemberException` when the type has no property with that name.

## GetMethod

```csharp
public static MethodInfo GetMethod(Type type, string methodName, params Type[] parameterTypes)
```

Finds the overload whose parameter types match `parameterTypes` exactly — no conversion of arguments is applied — and caches it. Pass an empty array for a parameterless method. The cache key contains the parameter types structurally, so a fresh array created by `params` still hits the cache. Throws `ArgumentNullException` when `type` is null, `ArgumentException` when `methodName` is null or empty, and `MissingMethodException` when no overload matches.

## GetDelegate

```csharp
public static TDelegate GetDelegate<TDelegate>(Type type, string methodName, params Type[] parameterTypes) where TDelegate : Delegate
```

Compiles a delegate for the method from an expression tree and caches it. `TDelegate` must match the method: for an instance method the first parameter receives the instance and the remaining ones match the method's own parameters. The cache key includes the delegate type, so one method used with two delegate types is compiled twice.

Throws `ArgumentNullException` when `type` is null, `ArgumentException` when `methodName` is null or empty, and `MissingMethodException` when no overload matches.

## GetFieldGetter

```csharp
public static Delegate GetFieldGetter(Type type, string fieldName)
public static FieldGetter<TField> GetFieldGetter<TField>(Type type, string fieldName)
public static FieldGetter<TInstance, TField> GetFieldGetter<TInstance, TField>(string fieldName)
```

Builds and caches a getter delegate: a [`FieldGetter`](./API-ReflectionDelegates.md) typed with the field type alone for a static field, and one typed with the instance type and the field type for an instance field. The typed overloads cast that result, so the static one throws `InvalidCastException` for an instance field and the instance one throws it for a static field; the instance overload takes the searched type from `TInstance`.

All three throw `ArgumentException` when the name is null or empty and `MissingFieldException` when the type has no such field, and the first two also throw `ArgumentNullException` when `type` is null.

## GetFieldSetter

```csharp
public static Delegate GetFieldSetter(Type type, string fieldName)
public static FieldSetter<TField> GetFieldSetter<TField>(Type type, string fieldName)
public static FieldSetter<TInstance, TField> GetFieldSetter<TInstance, TField>(string fieldName)
```

Builds and caches a setter delegate: a [`FieldSetter`](./API-ReflectionDelegates.md) taking only the new value for a static field, and one taking the instance and the new value for an instance field. The typed overloads cast that result, so a static field requested as `FieldSetter<TInstance, TField>` throws `InvalidCastException`, and so does an instance field requested as `FieldSetter<TField>`.

All three throw `ArgumentException` when the name is null or empty and `MissingFieldException` when the type has no such field, and the first two also throw `ArgumentNullException` when `type` is null.

## GetPropertyGetter

```csharp
public static Delegate GetPropertyGetter(Type type, string propertyName)
public static PropertyGetter<TProperty> GetPropertyGetter<TProperty>(Type type, string propertyName)
public static PropertyGetter<TInstance, TProperty> GetPropertyGetter<TInstance, TProperty>(string propertyName)
```

Builds and caches a getter delegate: a [`PropertyGetter`](./API-ReflectionDelegates.md) taking only the property type for a static property, and one taking the instance and the property type for an instance property. The typed overloads cast that result, so a static property requested as `PropertyGetter<TInstance, TProperty>` throws `InvalidCastException`, and so does an instance property requested as `PropertyGetter<TProperty>`.

All three throw `InvalidOperationException` when the property has no getter, `ArgumentException` when the name is null or empty and `MissingMemberException` when the type has no such property, and the first two also throw `ArgumentNullException` when `type` is null.

## GetPropertySetter

```csharp
public static Delegate GetPropertySetter(Type type, string propertyName)
public static PropertySetter<TProperty> GetPropertySetter<TProperty>(Type type, string propertyName)
public static PropertySetter<TInstance, TProperty> GetPropertySetter<TInstance, TProperty>(string propertyName)
```

Builds and caches a setter delegate: a [`PropertySetter`](./API-ReflectionDelegates.md) taking only the new value for a static property, and one taking the instance and the new value for an instance property. The typed overloads cast that result, so a static property requested as `PropertySetter<TInstance, TProperty>` throws `InvalidCastException`, and so does an instance property requested as `PropertySetter<TProperty>`.

All three throw `InvalidOperationException` when the property has no setter, `ArgumentException` when the name is null or empty and `MissingMemberException` when the type has no such property, and the first two also throw `ArgumentNullException` when `type` is null.

## GetAction

```csharp
public static WrapAction GetAction(Type type, string methodName)
public static WrapAction<T1> GetAction<T1>(Type type, string methodName)
public static WrapAction<T1, T2> GetAction<T1, T2>(Type type, string methodName)
```

Typed wrappers over `GetDelegate` for a static method that returns nothing. The list above shows the zero-argument overload and the first two generic arities; the same overload exists for every arity from one to sixteen parameters. Every type argument is a method parameter type, and all overloads share the delegate cache. For an instance method call `GetDelegate` directly, with the declaring type as the delegate's first parameter.

The overloads throw what `GetMethod` throws, including `MissingMethodException` when no overload matches the parameter types.

## GetFunc

```csharp
public static WrapFunc<TR> GetFunc<TR>(Type type, string methodName)
public static WrapFunc<T1, TR> GetFunc<T1, TR>(Type type, string methodName)
public static WrapFunc<T1, T2, TR> GetFunc<T1, T2, TR>(Type type, string methodName)
```

The same wrappers for a static method that returns a value: the return type is the last type argument, `TR`, and the overload exists for every arity from one to sixteen parameters as well. They share the delegate cache with `GetAction` and `GetDelegate`, and throw the same exceptions.
