# ReflectionUtils

`io.github.ykysnk.utils.NonUdon` · `public static class ReflectionUtils`

Reflection helpers for types that cannot be referenced directly, such as compiler-generated closures and state machines.

Failures are logged as warnings and produce a default value instead of an exception, which makes these members safe for probing an optional dependency. Lookups are cached, so calling `FindMethod` or `FindProperty` in a loop costs a dictionary lookup instead of a reflection walk. A confirmed miss is cached too, except in `FindType`, because an assembly can still be loaded later.

## Instantiate

```csharp
public static T? Instantiate<T>(Type type)
```

Creates an instance of `type` through its parameterless constructor and casts it to `T`. A missing constructor, a throwing constructor or a failing cast is logged as a warning and yields `default`.

## GetNestedMethods

```csharp
public static IEnumerable<MethodInfo> GetNestedMethods(Type? type)
```

Yields every method, public or not, static or not, declared on the nested types of `type`. The result is lazy, so reflection happens as the sequence is walked, and a nested type that the runtime refuses to enumerate is skipped. A null `type` yields nothing.

## GetNestedMethod

```csharp
public static MethodInfo? GetNestedMethod(Type? type, string name, string? searchName = null)
```

Returns the first method found by `GetNestedMethods` whose name contains `searchName`, or `null` when nothing matches. `searchName` defaults to `<name>`, which is how the compiler names the generated methods of a member called `name` — lambdas, async bodies and local functions.

```csharp
var moveNext = ReflectionUtils.GetNestedMethod(stateMachineType, "MoveNext");
```

## FindType

```csharp
public static Type? FindType(string? typeName)
```

Resolves a full or assembly-qualified name in the already loaded assemblies, so an optional dependency can be probed without referencing it. Returns `null` instead of throwing when the name does not resolve; a resolved type is cached under its name, a miss is not.

## FindMethod

```csharp
public static MethodInfo? FindMethod(Type? type, string name)
```

Finds a method by name only, public or not, static or instance, declared on the type or inherited, and returns `null` when the type has no such name. The resolved method, or the confirmed miss, is cached per type and name; matching is by name only, so overloads resolve to the first one found.

## FindProperty

```csharp
public static PropertyInfo? FindProperty(Type? type, string name)
```

Finds a property by name only, public or not, and returns `null` when the type has no such name. The resolved property, or the confirmed miss, is cached per type and name.

## GetDeclaredMethods

```csharp
public static IEnumerable<MethodInfo> GetDeclaredMethods(Type? type)
```

Every method declared on the type itself, public or not. Unlike `GetNestedMethods` this does not look at nested types. The list is resolved once per type and then reused, so do not modify the returned sequence.
