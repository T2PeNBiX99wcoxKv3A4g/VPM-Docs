# Reflection delegates

`io.github.ykysnk.utils.NonUdon.ReflectionDelegate` · `FieldGetter`, `FieldSetter`, `PropertyGetter`, `PropertySetter`, `WrapAction`, `WrapFunc`

リフレクションで扱うメンバーを束ねるデリゲート型です。`FieldGetter` / `FieldSetter` と `PropertyGetter` / `PropertySetter` がフィールドとプロパティのアクセスを包み、`WrapAction` / `WrapFunc` がそれ以外のメソッドを包みます。

引数の個数は `Func` と `Action` に合わせて 0 から 16 までですが、すべて明示的に宣言されています。BCL のジェネリックがどのランタイムでも使えることに依存せず、Udon と Unity に優しい形を保つためです。フィールドとプロパティ用は [`ReflectionWrapper`](./API-ReflectionWrapper.md) が組み立て、[`Reflect`](./API-Reflect.md) は内部の同等品を使います。

## FieldGetter

```csharp
public delegate TField FieldGetter<out TField>();
public delegate TField FieldGetter<in TInstance, out TField>(TInstance instance);
```

フィールドを読み出します。1 つ目は静的フィールド用で引数を取りません。2 つ目は読み出すインスタンスを取ります。

## FieldSetter

```csharp
public delegate void FieldSetter<in TField>(TField value);
public delegate void FieldSetter<in TInstance, in TField>(TInstance instance, TField value);
```

フィールドに書き込みます。1 つ目は静的フィールド用で、2 つ目はインスタンスと新しい値を取ります。

## PropertyGetter

```csharp
public delegate TProperty PropertyGetter<out TProperty>();
public delegate TProperty PropertyGetter<in TInstance, out TProperty>(TInstance instance);
```

プロパティを読み出します。形は `FieldGetter` と同じで、静的プロパティでは引数を取らず、インスタンスプロパティではインスタンスを取ります。

## PropertySetter

```csharp
public delegate void PropertySetter<in TProperty>(TProperty value);
public delegate void PropertySetter<in TInstance, in TProperty>(TInstance instance, TProperty value);
```

プロパティに書き込みます。形は `FieldSetter` と同じです。

## WrapAction

```csharp
public delegate void WrapAction();
public delegate void WrapAction<in T1>(T1 arg1);
public delegate void WrapAction<in T1, in T2>(T1 arg1, T2 arg2);
public delegate void WrapAction<in T1, in T2, in T3>(T1 arg1, T2 arg2, T3 arg3);
```

値を返さないメソッドを包みます。上の一覧は引数なしの形と最初の 3 つのジェネリック引数個数です。引数が 1 つ増えるごとに型パラメーターと `argN` パラメーターが 1 つずつ増え、16 個まで同じ形が続きます。

## WrapFunc

```csharp
public delegate TR WrapFunc<out TR>();
public delegate TR WrapFunc<in T1, out TR>(T1 arg1);
public delegate TR WrapFunc<in T1, in T2, out TR>(T1 arg1, T2 arg2);
public delegate TR WrapFunc<in T1, in T2, in T3, out TR>(T1 arg1, T2 arg2, T3 arg3);
```

値を返すメソッドを包みます。戻り値の型は常に最後の型パラメーター `TR` で、それ以外の形は `WrapAction` と同じく引数なしから 16 個までです。
