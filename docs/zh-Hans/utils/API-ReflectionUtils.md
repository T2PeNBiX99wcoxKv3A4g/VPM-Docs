# ReflectionUtils

`io.github.ykysnk.utils.NonUdon` · `public static class ReflectionUtils`

供无法直接引用的类型（例如编译器生成的闭包与状态机）使用的反射辅助方法。

失败时会记录为警告并产生默认值，而不是抛出异常，因此这些成员可以安全地用于探测可选依赖。查询结果会缓存，所以在循环中调用 `FindMethod` 或 `FindProperty` 只需一次字典查询，而不是一次反射遍历。确认找不到的结果也会缓存，但 `FindType` 例外，因为程序集仍可能稍后加载。

## Instantiate

```csharp
public static T? Instantiate<T>(Type type)
```

用无参数构造函数创建 `type` 的实例并转换为 `T`。缺少构造函数、构造函数抛出异常或转换失败时会记录为警告并返回 `default`。

## GetNestedMethods

```csharp
public static IEnumerable<MethodInfo> GetNestedMethods(Type? type)
```

逐个产出 `type` 的嵌套类型所声明的每个方法，不论 public 或 static。结果是延迟的，因此会随着遍历序列才进行反射；运行时拒绝枚举的嵌套类型会被跳过。`type` 为 null 时不产出任何内容。

## GetNestedMethod

```csharp
public static MethodInfo? GetNestedMethod(Type? type, string name, string? searchName = null)
```

返回 `GetNestedMethods` 找到的第一个名称包含 `searchName` 的方法；没有匹配项时返回 `null`。`searchName` 默认为 `<name>`，这是编译器给名为 `name` 的成员所生成方法的名称 —— lambda、async 本体与局部函数。

```csharp
var moveNext = ReflectionUtils.GetNestedMethod(stateMachineType, "MoveNext");
```

## FindType

```csharp
public static Type? FindType(string? typeName)
```

在已加载的程序集中解析完整或程序集限定名称，因此可以探测可选依赖而不需引用它。名称无法解析时返回 `null` 而不是抛出异常；解析成功的类型会按名称缓存，找不到的则不缓存。

## FindMethod

```csharp
public static MethodInfo? FindMethod(Type? type, string name)
```

仅按名称查找方法，不论 public、static、实例、声明或继承，并在类型没有该名称时返回 `null`。解析到的方法或确认找不到的结果会按类型与名称缓存；比对仅按名称，因此重载会解析为先找到的那一个。

## FindProperty

```csharp
public static PropertyInfo? FindProperty(Type? type, string name)
```

仅按名称查找属性，不论是否 public；类型没有该名称时返回 `null`。解析到的属性或确认找不到的结果会按类型与名称缓存。

## GetDeclaredMethods

```csharp
public static IEnumerable<MethodInfo> GetDeclaredMethods(Type? type)
```

该类型自身声明的每个方法，不论是否 public。与 `GetNestedMethods` 不同，这不会查看嵌套类型。列表每个类型只解析一次并重复使用，因此请勿修改返回的序列。
