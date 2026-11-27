# Reflection delegates

`io.github.ykysnk.utils.NonUdon.ReflectionDelegate` · `FieldGetter`, `FieldSetter`, `PropertyGetter`, `PropertySetter`, `WrapAction`, `WrapFunc`

反射成员所绑定的委托类型：`FieldGetter` / `FieldSetter` 与 `PropertyGetter` / `PropertySetter` 包装字段与属性访问，而 `WrapAction` / `WrapFunc` 包装其他任何方法。

参数数量对应 `Func` 与 `Action` —— 0 到 16 个参数 —— 但每一个都显式声明，让这组类型保持对 Udon 与 Unity 友好，而不依赖 BCL 泛型在每个运行时都能使用。[`ReflectionWrapper`](./API-ReflectionWrapper.md) 会构建字段与属性的那些，而 [`Reflect`](./API-Reflect.md) 使用自己内部的对应版本。

## FieldGetter

```csharp
public delegate TField FieldGetter<out TField>();
public delegate TField FieldGetter<in TInstance, out TField>(TInstance instance);
```

读取字段。第一种形式用于静态字段且不取参数，第二种取要读取的实例。

## FieldSetter

```csharp
public delegate void FieldSetter<in TField>(TField value);
public delegate void FieldSetter<in TInstance, in TField>(TInstance instance, TField value);
```

写入字段。第一种形式用于静态字段，第二种取实例与新值。

## PropertyGetter

```csharp
public delegate TProperty PropertyGetter<out TProperty>();
public delegate TProperty PropertyGetter<in TInstance, out TProperty>(TInstance instance);
```

读取属性，形式与 `FieldGetter` 相同：静态属性不取参数，实例属性取实例。

## PropertySetter

```csharp
public delegate void PropertySetter<in TProperty>(TProperty value);
public delegate void PropertySetter<in TInstance, in TProperty>(TInstance instance, TProperty value);
```

写入属性，形式与 `FieldSetter` 相同。

## WrapAction

```csharp
public delegate void WrapAction();
public delegate void WrapAction<in T1>(T1 arg1);
public delegate void WrapAction<in T1, in T2>(T1 arg1, T2 arg2);
public delegate void WrapAction<in T1, in T2, in T3>(T1 arg1, T2 arg2, T3 arg3);
```

包装没有返回值的方法。上方列出零参数形式与前三个泛型参数数量；相同的形状会随着每个参数增加一个类型参数与一个 `argN` 参数，直到 16 个。

## WrapFunc

```csharp
public delegate TR WrapFunc<out TR>();
public delegate TR WrapFunc<in T1, out TR>(T1 arg1);
public delegate TR WrapFunc<in T1, in T2, out TR>(T1 arg1, T2 arg2);
public delegate TR WrapFunc<in T1, in T2, in T3, out TR>(T1 arg1, T2 arg2, T3 arg3);
```

包装有返回值的方法。返回类型永远是最后一个类型参数 `TR`；除此之外形状与 `WrapAction` 相同，从无参数到 16 个。
