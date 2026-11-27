# Reflect

`io.github.ykysnk.utils.NonUdon.Reflection` · `public static class Reflect`

仿照 HarmonyLib 的 `Traverse`，但不需要 Harmony、也不会在每次访问时重新解析成员的缓存式反射访问。`Reflect.For` 会为实例或类型返回 `ReflectionAccess`，其上的 `Field`、`Property` 与 `Method` 会返回 `FieldAccess`、`PropertyAccess` 与 `MethodAccess`。

成员会在创建访问器时解析一次，其访问器也只编译一次，因此重复使用的访问器是一次委托调用，而不是 `FieldInfo.GetValue`。无法编译时（例如 IL2CPP），访问器会退回普通反射。创建访问器不会因找不到成员而抛出异常：`Exists` 会报告、`TryGet` 与 `TryInvoke` 返回 false，只有 `Get` 与 `Invoke` 会抛出。查询会沿着目标类型及其基类型查找已声明的成员，因此也能取得基类型的私有成员。

## For

```csharp
public static ReflectionAccess For(object target)
public static ReflectionAccess For(Type type)
```

为实例创建访问器（由其运行时类型决定成员的搜索位置），或为类型的静态成员创建访问器（包含其基类型）。第二种情况下 `Target` 为 `null`，因此由类型创建的 `MethodAccess` 会偏好静态重载。

```csharp
var health = Reflect.For(component).Field("health");
var value = health.Get<int>();        // delegate call, safe to reuse in a loop
health.Set(3);

var name = Reflect.For(type).Method("BuildName", 1, "x").Invoke<string>();
```

## ReflectionAccess

`io.github.ykysnk.utils.NonUdon.Reflection` · `public readonly struct ReflectionAccess`

可供读取成员的实例，或静态成员所用的类型。它由 `Reflect.For` 创建；构造函数为 internal。

### Target

```csharp
public object? Target { get; }
```

访问器所读取的实例，静态访问时为 `null`。

### Type

```csharp
public Type Type { get; }
```

成员查询所在的类型。

### Field

```csharp
public FieldAccess Field(string name)
```

创建字段访问器；成员会立即解析，找不到字段不会抛出异常。`name` 会先在目标类型上查找，再沿着基类型向上找。

### Property

```csharp
public PropertyAccess Property(string name)
```

创建属性访问器；成员会立即解析，找不到属性不会抛出异常。`name` 会先在目标类型上查找，再沿着基类型向上找。

### Method

```csharp
public MethodAccess Method(string name, params object?[] arguments)
```

创建方法访问器并挑选匹配 `arguments` 的重载：由它们的运行时类型决定，`null` 可匹配任何引用类型或可为 null 的参数，不传参数则选无参数方法。整个数组传 `null` 等同于不传，泛型方法定义永远不会被选中。完全匹配的参数类型优先于可赋值者；有目标时偏好实例方法，没有目标时偏好静态方法。

## FieldAccess

`io.github.ykysnk.utils.NonUdon.Reflection` · `public readonly struct FieldAccess`

目标类型的一个字段，于创建访问器时解析。

### Exists

```csharp
public bool Exists { get; }
```

是否找到该字段。

### CanWrite

```csharp
public bool CanWrite { get; }
```

字段是否可赋值；readonly 与 const 字段为 false。

### MemberType

```csharp
public Type? MemberType { get; }
```

字段的声明类型，找不到时为 `null`。

### Get

```csharp
public T? Get<T>()
```

读取字段并转换为 `T`；字段为 `null` 时得到 `default`。字段不存在时抛出 `MissingFieldException`，无法读取时抛出 `MemberAccessException`。

### TryGet

```csharp
public bool TryGet<T>(out T? value)
```

在字段存在且可读取时读入 `value` 并返回 true；否则 `value` 为 `default`，结果为 false。

### Set

```csharp
public bool Set(object? value)
```

写入字段，并把 `value` 转换为字段类型；`null` 仅适用于引用类型与可为 null 的类型。字段不存在或无法写入时返回 false。

## PropertyAccess

`io.github.ykysnk.utils.NonUdon.Reflection` · `public readonly struct PropertyAccess`

目标类型的一个属性，于创建访问器时解析。

### Exists

```csharp
public bool Exists { get; }
```

是否找到该属性。

### CanWrite

```csharp
public bool CanWrite { get; }
```

属性是否可赋值；没有 setter 时为 false。

### MemberType

```csharp
public Type? MemberType { get; }
```

属性的声明类型，找不到时为 `null`。

### Get

```csharp
public T? Get<T>()
```

读取属性并转换为 `T`；属性为 `null` 时得到 `default`。属性不存在时抛出 `MissingMemberException`，没有 getter 时抛出 `MemberAccessException`。

### TryGet

```csharp
public bool TryGet<T>(out T? value)
```

在属性存在且可读取时读入 `value` 并返回 true；否则 `value` 为 `default`，结果为 false。

### Set

```csharp
public bool Set(object? value)
```

写入属性，并把 `value` 转换为属性类型；`null` 仅适用于引用类型与可为 null 的类型。属性不存在或无法写入时返回 false。

## MethodAccess

`io.github.ykysnk.utils.NonUdon.Reflection` · `public readonly struct MethodAccess`

目标类型的一个方法，以及它将被调用时使用的参数，于创建访问器时解析。

### Exists

```csharp
public bool Exists { get; }
```

是否找到匹配当前参数的方法重载。

### ReturnType

```csharp
public Type? ReturnType { get; }
```

已解析重载的返回类型，没有匹配项时为 `null`。

### TryInvoke

```csharp
public bool TryInvoke(out object? result)
public bool TryInvoke<T>(out T? result)
```

用传给 `Method` 的参数调用方法，并在存在匹配的重载时返回 true。`result` 接收返回值；没有匹配的重载或方法返回 void 时为 `null` / `default`。

### Invoke

```csharp
public object? Invoke()
public T? Invoke<T>()
```

用传给 `Method` 的参数调用方法并返回结果，void 方法为 `null`；泛型形式会转换为 `T`。没有匹配参数的重载时抛出 `MissingMethodException`。
