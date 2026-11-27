# Reflect

`io.github.ykysnk.utils.NonUdon.Reflection` · `public static class Reflect`

Cached reflection access modelled after HarmonyLib's `Traverse`, but without Harmony and without resolving members on every access. `Reflect.For` returns a `ReflectionAccess` for an instance or for a type, and `Field`, `Property` and `Method` on it return a `FieldAccess`, `PropertyAccess` and `MethodAccess`.

A member is resolved once when the accessor is created and its accessor is compiled once, so a reused accessor is a delegate call instead of `FieldInfo.GetValue`. Where compiling is not available, for example under IL2CPP, the accessor falls back to plain reflection. Creating an accessor never throws for a missing member: `Exists` reports it, `TryGet` and `TryInvoke` return false, and only `Get` and `Invoke` throw. Lookups walk the target type and its base types for declared members, so private members of a base type are reached.

## For

```csharp
public static ReflectionAccess For(object target)
public static ReflectionAccess For(Type type)
```

Creates an accessor for an instance, whose runtime type decides where members are searched, or for the static members of a type, including its base types. `Target` is `null` in the second case, and a `MethodAccess` created from a type therefore prefers a static overload.

```csharp
var health = Reflect.For(component).Field("health");
var value = health.Get<int>();        // delegate call, safe to reuse in a loop
health.Set(3);

var name = Reflect.For(type).Method("BuildName", 1, "x").Invoke<string>();
```

## ReflectionAccess

`io.github.ykysnk.utils.NonUdon.Reflection` · `public readonly struct ReflectionAccess`

An instance, or a type for static members, that members can be read from. It is created by `Reflect.For`; the constructor is internal.

### Target

```csharp
public object? Target { get; }
```

The instance the accessor reads from, or `null` for static access.

### Type

```csharp
public Type Type { get; }
```

The type members are looked up on.

### Field

```csharp
public FieldAccess Field(string name)
```

Creates a field accessor; the member is resolved immediately and a missing field does not throw. `name` is searched on the target type and then up its base types.

### Property

```csharp
public PropertyAccess Property(string name)
```

Creates a property accessor; the member is resolved immediately and a missing property does not throw. `name` is searched on the target type and then up its base types.

### Method

```csharp
public MethodAccess Method(string name, params object?[] arguments)
```

Creates a method accessor and picks the overload that fits `arguments`: their runtime types select it, `null` matches any reference type or nullable parameter, and no arguments select a parameterless method. Passing `null` for the whole array is the same as passing none, and a generic method definition is never selected. An exact parameter type beats an assignable one, and an instance method is preferred when there is a target while a static one is preferred when there is none.

## FieldAccess

`io.github.ykysnk.utils.NonUdon.Reflection` · `public readonly struct FieldAccess`

A field of the target type, resolved when the accessor was created.

### Exists

```csharp
public bool Exists { get; }
```

Whether the field was found.

### CanWrite

```csharp
public bool CanWrite { get; }
```

Whether the field can be assigned; false for readonly and const fields.

### MemberType

```csharp
public Type? MemberType { get; }
```

The declared type of the field, or `null` when it was not found.

### Get

```csharp
public T? Get<T>()
```

Reads the field and casts it to `T`; a field holding `null` yields `default`. Throws `MissingFieldException` when the field does not exist and `MemberAccessException` when it cannot be read.

### TryGet

```csharp
public bool TryGet<T>(out T? value)
```

Reads the field into `value` and returns true when it exists and can be read; otherwise `value` is `default` and the result is false.

### Set

```csharp
public bool Set(object? value)
```

Writes the field, converting `value` to the field type; `null` is only valid for reference and nullable types. Returns false when the field does not exist or cannot be written.

## PropertyAccess

`io.github.ykysnk.utils.NonUdon.Reflection` · `public readonly struct PropertyAccess`

A property of the target type, resolved when the accessor was created.

### Exists

```csharp
public bool Exists { get; }
```

Whether the property was found.

### CanWrite

```csharp
public bool CanWrite { get; }
```

Whether the property can be assigned; false when it has no setter.

### MemberType

```csharp
public Type? MemberType { get; }
```

The declared type of the property, or `null` when it was not found.

### Get

```csharp
public T? Get<T>()
```

Reads the property and casts it to `T`; a property holding `null` yields `default`. Throws `MissingMemberException` when the property does not exist and `MemberAccessException` when it has no getter.

### TryGet

```csharp
public bool TryGet<T>(out T? value)
```

Reads the property into `value` and returns true when it exists and can be read; otherwise `value` is `default` and the result is false.

### Set

```csharp
public bool Set(object? value)
```

Writes the property, converting `value` to the property type; `null` is only valid for reference and nullable types. Returns false when the property does not exist or cannot be written.

## MethodAccess

`io.github.ykysnk.utils.NonUdon.Reflection` · `public readonly struct MethodAccess`

A method of the target type together with the arguments it will be called with, resolved when the accessor was created.

### Exists

```csharp
public bool Exists { get; }
```

Whether a method overload matching the current arguments was found.

### ReturnType

```csharp
public Type? ReturnType { get; }
```

The return type of the resolved overload, or `null` when none matched.

### TryInvoke

```csharp
public bool TryInvoke(out object? result)
public bool TryInvoke<T>(out T? result)
```

Calls the method with the arguments given to `Method` and returns true when a matching overload exists. `result` receives the return value, or `null` / `default` when no overload matched or the method returns void.

### Invoke

```csharp
public object? Invoke()
public T? Invoke<T>()
```

Calls the method with the arguments given to `Method` and returns the result, which is `null` for a void method; the generic form casts it to `T`. Throws `MissingMethodException` when no overload matches the arguments.
