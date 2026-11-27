# 反射

## ReflectionUtils

`io.github.ykysnk.utils.NonUdon` · `public static class ReflectionUtils`

用日志代替抛异常反射辅助方法：找不到的成员返回 `null` / `default`，因此可以直接用来探测可选依赖是否存在。

查询结果按类型和名称缓存，找不到的结果也会保留，因此重复调用只需一次字典查找。`FindType` 只缓存已解析的名称，
因为程序集可能稍后才加载。

### Instantiate&lt;T&gt;(Type type)

```csharp
public static T? Instantiate<T>(Type type)
```

用无参构造函数创建实例并转换为 `T`；失败时记录警告并返回 `default`。

### GetNestedMethods(Type? type)

```csharp
public static IEnumerable<MethodInfo> GetNestedMethods(Type? type)
```

惰性枚举 `type` 的嵌套类型声明的所有方法（不论是否 public）。运行时无法枚举的嵌套类型会被跳过。

### GetNestedMethod(Type? type, string name, string? searchName = null)

```csharp
public static MethodInfo? GetNestedMethod(Type? type, string name, string? searchName = null)
```

返回名称包含 `searchName` 的第一个嵌套方法。`searchName` 默认为 `<name>`，也就是编译器给名为 `name` 的成员的
lambda、async 方法体或局部函数生成的名称。

### FindType(string? typeName)

```csharp
public static Type? FindType(string? typeName)
```

在已加载的程序集中解析完整名称（或程序集限定名）；找不到时返回 `null`。

### FindMethod(Type? type, string name)

```csharp
public static MethodInfo? FindMethod(Type? type, string name)
```

返回该名称的第一个方法，不论 public、static 还是继承而来；没有时返回 `null`。仅按名称匹配，存在重载时返回
先找到的那个。

### FindProperty(Type? type, string name)

```csharp
public static PropertyInfo? FindProperty(Type? type, string name)
```

返回该名称的属性（不论是否 public）；没有时返回 `null`。

### GetDeclaredMethods(Type? type)

```csharp
public static IEnumerable<MethodInfo> GetDeclaredMethods(Type? type)
```

返回该类型自身声明的所有方法（不含嵌套类型的），不论是否 public。
