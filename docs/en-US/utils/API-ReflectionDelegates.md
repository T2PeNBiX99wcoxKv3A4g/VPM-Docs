# Reflection delegates

`io.github.ykysnk.utils.NonUdon.ReflectionDelegate` · `FieldGetter`, `FieldSetter`, `PropertyGetter`, `PropertySetter`, `WrapAction`, `WrapFunc`

The delegate types that reflected members are bound to: `FieldGetter` / `FieldSetter` and `PropertyGetter` / `PropertySetter` wrap field and property access, while `WrapAction` / `WrapFunc` wrap any other method.

The arities mirror `Func` and `Action` — 0 to 16 arguments — but every one is declared explicitly, so the family stays Udon and Unity friendly instead of depending on the BCL generics being usable in every runtime. [`ReflectionWrapper`](./API-ReflectionWrapper.md) builds the field and property ones, and [`Reflect`](./API-Reflect.md) uses its own internal equivalents.

## FieldGetter

```csharp
public delegate TField FieldGetter<out TField>();
public delegate TField FieldGetter<in TInstance, out TField>(TInstance instance);
```

Reads a field. The first form is used for a static field and takes no argument, the second takes the instance to read from.

## FieldSetter

```csharp
public delegate void FieldSetter<in TField>(TField value);
public delegate void FieldSetter<in TInstance, in TField>(TInstance instance, TField value);
```

Writes a field. The first form is used for a static field, the second takes the instance and the new value.

## PropertyGetter

```csharp
public delegate TProperty PropertyGetter<out TProperty>();
public delegate TProperty PropertyGetter<in TInstance, out TProperty>(TInstance instance);
```

Reads a property, in the same two forms as `FieldGetter`: no argument for a static property, the instance for an instance property.

## PropertySetter

```csharp
public delegate void PropertySetter<in TProperty>(TProperty value);
public delegate void PropertySetter<in TInstance, in TProperty>(TInstance instance, TProperty value);
```

Writes a property, in the same two forms as `FieldSetter`.

## WrapAction

```csharp
public delegate void WrapAction();
public delegate void WrapAction<in T1>(T1 arg1);
public delegate void WrapAction<in T1, in T2>(T1 arg1, T2 arg2);
public delegate void WrapAction<in T1, in T2, in T3>(T1 arg1, T2 arg2, T3 arg3);
```

Wraps a method that returns nothing. The list above shows the zero-argument form and the first three generic arities; the same shape continues with one type parameter and one `argN` parameter per argument, up to sixteen.

## WrapFunc

```csharp
public delegate TR WrapFunc<out TR>();
public delegate TR WrapFunc<in T1, out TR>(T1 arg1);
public delegate TR WrapFunc<in T1, in T2, out TR>(T1 arg1, T2 arg2);
public delegate TR WrapFunc<in T1, in T2, in T3, out TR>(T1 arg1, T2 arg2, T3 arg3);
```

Wraps a method that returns a value. The return type is always the last type parameter, `TR`; otherwise the shape matches `WrapAction`, from no argument up to sixteen.
