# Reflection delegates

`io.github.ykysnk.utils.NonUdon.ReflectionDelegate` · `FieldGetter`, `FieldSetter`, `PropertyGetter`, `PropertySetter`, `WrapAction`, `WrapFunc`

反射成員所繫結的委派型別：`FieldGetter` / `FieldSetter` 與 `PropertyGetter` / `PropertySetter` 包裝欄位與屬性存取，而 `WrapAction` / `WrapFunc` 包裝其他任何方法。

參數數量對應 `Func` 與 `Action` —— 0 到 16 個引數 —— 但每一個都明確宣告，讓這組型別保持對 Udon 與 Unity 友善，而不依賴 BCL 泛型在每個執行階段都能使用。[`ReflectionWrapper`](./API-ReflectionWrapper.md) 會建置欄位與屬性的那些，而 [`Reflect`](./API-Reflect.md) 使用自己內部的對應版本。

## FieldGetter

```csharp
public delegate TField FieldGetter<out TField>();
public delegate TField FieldGetter<in TInstance, out TField>(TInstance instance);
```

讀取欄位。第一種形式用於靜態欄位且不取引數，第二種取要讀取的執行個體。

## FieldSetter

```csharp
public delegate void FieldSetter<in TField>(TField value);
public delegate void FieldSetter<in TInstance, in TField>(TInstance instance, TField value);
```

寫入欄位。第一種形式用於靜態欄位，第二種取執行個體與新值。

## PropertyGetter

```csharp
public delegate TProperty PropertyGetter<out TProperty>();
public delegate TProperty PropertyGetter<in TInstance, out TProperty>(TInstance instance);
```

讀取屬性，形式與 `FieldGetter` 相同：靜態屬性不取引數，執行個體屬性取執行個體。

## PropertySetter

```csharp
public delegate void PropertySetter<in TProperty>(TProperty value);
public delegate void PropertySetter<in TInstance, in TProperty>(TInstance instance, TProperty value);
```

寫入屬性，形式與 `FieldSetter` 相同。

## WrapAction

```csharp
public delegate void WrapAction();
public delegate void WrapAction<in T1>(T1 arg1);
public delegate void WrapAction<in T1, in T2>(T1 arg1, T2 arg2);
public delegate void WrapAction<in T1, in T2, in T3>(T1 arg1, T2 arg2, T3 arg3);
```

包裝沒有傳回值的方法。上方列出零引數形式與前三個泛型參數數量；相同的形狀會隨著每個引數增加一個型別參數與一個 `argN` 參數，直到 16 個。

## WrapFunc

```csharp
public delegate TR WrapFunc<out TR>();
public delegate TR WrapFunc<in T1, out TR>(T1 arg1);
public delegate TR WrapFunc<in T1, in T2, out TR>(T1 arg1, T2 arg2);
public delegate TR WrapFunc<in T1, in T2, in T3, out TR>(T1 arg1, T2 arg2, T3 arg3);
```

包裝有傳回值的方法。傳回型別永遠是最後一個型別參數 `TR`；除此之外形狀與 `WrapAction` 相同，從無引數到 16 個。
