# Reflection

## ReflectionUtils

`io.github.ykysnk.utils.NonUdon` · `public static class ReflectionUtils`

Reflection helpers that log instead of throwing: a missing member produces `null` / `default`, which makes them safe
for probing an optional dependency.

Lookups are cached per type and name, including confirmed misses, so repeated calls cost a dictionary lookup
instead of a reflection walk. `FindType` caches only names that resolved, because an assembly can be loaded
later.

### Instantiate&lt;T&gt;(Type type)

```csharp
public static T? Instantiate<T>(Type type)
```

Creates an instance through the parameterless constructor and casts it to `T`; failures are logged as warnings and
yield `default`.

### GetNestedMethods(Type? type)

```csharp
public static IEnumerable<MethodInfo> GetNestedMethods(Type? type)
```

Every method declared on the nested types of `type`, public or not, enumerated lazily. A nested type the runtime
refuses to enumerate is skipped.

### GetNestedMethod(Type? type, string name, string? searchName = null)

```csharp
public static MethodInfo? GetNestedMethod(Type? type, string name, string? searchName = null)
```

The first nested method whose name contains `searchName`. It defaults to `<name>`, the name the compiler gives the
generated method of a lambda, async body or local function belonging to a member called `name`.

### FindType(string? typeName)

```csharp
public static Type? FindType(string? typeName)
```

Resolves a full or assembly-qualified name in the loaded assemblies; `null` when the name does not resolve.

### FindMethod(Type? type, string name)

```csharp
public static MethodInfo? FindMethod(Type? type, string name)
```

The first method with that name, public or not, static or instance, declared or inherited; `null` when the type has
none. Matching is by name only, so overloads resolve to the first one found.

### FindProperty(Type? type, string name)

```csharp
public static PropertyInfo? FindProperty(Type? type, string name)
```

The property with that name, public or not; `null` when the type has none.

### GetDeclaredMethods(Type? type)

```csharp
public static IEnumerable<MethodInfo> GetDeclaredMethods(Type? type)
```

Every method declared on the type itself (not on its nested types), public or not.
