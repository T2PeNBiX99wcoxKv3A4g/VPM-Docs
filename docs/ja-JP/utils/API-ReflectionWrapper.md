# ReflectionWrapper

`io.github.ykysnk.utils.NonUdon` · `public static class ReflectionWrapper`

フィールド、プロパティ、メソッドのキャッシュ付きリフレクション検索と、それらから組み立てたコンパイル済みデリゲートです。[`ReflectionUtils`](./API-ReflectionUtils.md) と違い、見つからないメンバーは `null` ではなく例外になります。

検索は指定した型の public / 非 public のインスタンスメンバーと静的メンバーを対象にします。基底型にだけ存在する private メンバーには届きません。コンパイル済みデリゲートを含め、結果はすべてキャッシュされるので、繰り返し呼んでも辞書引き 1 回で済みます。

## GetType

```csharp
public static Type GetType(string typeName)
public static Type GetType(Type type)
```

`Type.GetType(string, bool)` が受け付ける名前（完全名やアセンブリ修飾名など）を解決し、その名前で型をキャッシュします。`Type` を取るオーバーロードは完全名でキャッシュし、その名前で既にキャッシュされている型を返します。完全名を持たない型（ジェネリック型パラメーター）はそのまま返され、キャッシュされません。

引数が null の場合は `ArgumentNullException` をスローします。文字列を取るオーバーロードは、名前を解決できない場合に `TypeLoadException` もスローします。

## GetField

```csharp
public static FieldInfo GetField(Type type, string fieldName)
```

フィールドを public / 非 public、インスタンス / 静的を問わず探し、型と名前ごとにキャッシュします。基底型にだけ宣言された private フィールドは見つかりません。`type` が null なら `ArgumentNullException`、`fieldName` が null または空なら `ArgumentException`、その名前のフィールドが無ければ `MissingFieldException` をスローします。

## GetProperty

```csharp
public static PropertyInfo GetProperty(Type type, string propertyName)
```

プロパティを public / 非 public、インスタンス / 静的を問わず探し、型と名前ごとにキャッシュします。基底型にだけ宣言された private プロパティは見つかりません。`type` が null なら `ArgumentNullException`、`propertyName` が null または空なら `ArgumentException`、その名前のプロパティが無ければ `MissingMemberException` をスローします。

## GetMethod

```csharp
public static MethodInfo GetMethod(Type type, string methodName, params Type[] parameterTypes)
```

パラメーター型が `parameterTypes` と完全に一致するオーバーロードを探してキャッシュします。引数の変換は行われません。パラメーターなしのメソッドには空の配列を渡します。キャッシュキーにはパラメーター型が構造的に含まれるので、`params` が毎回作る新しい配列でもキャッシュに当たります。`type` が null なら `ArgumentNullException`、`methodName` が null または空なら `ArgumentException`、一致するオーバーロードが無ければ `MissingMethodException` をスローします。

## GetDelegate

```csharp
public static TDelegate GetDelegate<TDelegate>(Type type, string methodName, params Type[] parameterTypes) where TDelegate : Delegate
```

式ツリーからメソッドのデリゲートをコンパイルしてキャッシュします。`TDelegate` はメソッドと一致している必要があります。インスタンスメソッドでは最初のパラメーターがインスタンスを受け取り、残りがメソッド自身のパラメーターに対応します。キャッシュキーにはデリゲート型も含まれるため、同じメソッドを 2 つのデリゲート型で使うと 2 回コンパイルされます。

`type` が null なら `ArgumentNullException`、`methodName` が null または空なら `ArgumentException`、一致するオーバーロードが無ければ `MissingMethodException` をスローします。

## GetFieldGetter

```csharp
public static Delegate GetFieldGetter(Type type, string fieldName)
public static FieldGetter<TField> GetFieldGetter<TField>(Type type, string fieldName)
public static FieldGetter<TInstance, TField> GetFieldGetter<TInstance, TField>(string fieldName)
```

getter デリゲートを組み立ててキャッシュします。静的フィールドにはフィールド型だけで型付けした [`FieldGetter`](./API-ReflectionDelegates.md)、インスタンスフィールドにはインスタンス型とフィールド型で型付けしたものを使います。型付きオーバーロードはその結果をキャストするので、静的用をインスタンスフィールドに使うと `InvalidCastException`、インスタンス用を静的フィールドに使っても `InvalidCastException` になります。インスタンス用オーバーロードは `TInstance` から検索する型を取ります。

3 つとも、名前が null または空なら `ArgumentException`、そのフィールドが無ければ `MissingFieldException` をスローし、最初の 2 つは `type` が null なら `ArgumentNullException` もスローします。

## GetFieldSetter

```csharp
public static Delegate GetFieldSetter(Type type, string fieldName)
public static FieldSetter<TField> GetFieldSetter<TField>(Type type, string fieldName)
public static FieldSetter<TInstance, TField> GetFieldSetter<TInstance, TField>(string fieldName)
```

setter デリゲートを組み立ててキャッシュします。静的フィールドには新しい値だけで型付けした [`FieldSetter`](./API-ReflectionDelegates.md)、インスタンスフィールドにはインスタンスと新しい値で型付けしたものを使います。型付きオーバーロードはその結果をキャストするので、静的フィールドを `FieldSetter<TInstance, TField>` として要求すると `InvalidCastException`、インスタンスフィールドを `FieldSetter<TField>` として要求しても `InvalidCastException` になります。

3 つとも、名前が null または空なら `ArgumentException`、そのフィールドが無ければ `MissingFieldException` をスローし、最初の 2 つは `type` が null なら `ArgumentNullException` もスローします。

## GetPropertyGetter

```csharp
public static Delegate GetPropertyGetter(Type type, string propertyName)
public static PropertyGetter<TProperty> GetPropertyGetter<TProperty>(Type type, string propertyName)
public static PropertyGetter<TInstance, TProperty> GetPropertyGetter<TInstance, TProperty>(string propertyName)
```

getter デリゲートを組み立ててキャッシュします。静的プロパティにはプロパティ型だけで型付けした [`PropertyGetter`](./API-ReflectionDelegates.md)、インスタンスプロパティにはインスタンス型とプロパティ型で型付けしたものを使います。型付きオーバーロードはその結果をキャストするので、静的プロパティを `PropertyGetter<TInstance, TProperty>` として要求すると `InvalidCastException`、インスタンスプロパティを `PropertyGetter<TProperty>` として要求しても `InvalidCastException` になります。

3 つとも、getter が無ければ `InvalidOperationException`、名前が null または空なら `ArgumentException`、そのプロパティが無ければ `MissingMemberException` をスローし、最初の 2 つは `type` が null なら `ArgumentNullException` もスローします。

## GetPropertySetter

```csharp
public static Delegate GetPropertySetter(Type type, string propertyName)
public static PropertySetter<TProperty> GetPropertySetter<TProperty>(Type type, string propertyName)
public static PropertySetter<TInstance, TProperty> GetPropertySetter<TInstance, TProperty>(string propertyName)
```

setter デリゲートを組み立ててキャッシュします。静的プロパティには新しい値だけで型付けした [`PropertySetter`](./API-ReflectionDelegates.md)、インスタンスプロパティにはインスタンスと新しい値で型付けしたものを使います。型付きオーバーロードはその結果をキャストするので、静的プロパティを `PropertySetter<TInstance, TProperty>` として要求すると `InvalidCastException`、インスタンスプロパティを `PropertySetter<TProperty>` として要求しても `InvalidCastException` になります。

3 つとも、setter が無ければ `InvalidOperationException`、名前が null または空なら `ArgumentException`、そのプロパティが無ければ `MissingMemberException` をスローし、最初の 2 つは `type` が null なら `ArgumentNullException` もスローします。

## GetAction

```csharp
public static WrapAction GetAction(Type type, string methodName)
public static WrapAction<T1> GetAction<T1>(Type type, string methodName)
public static WrapAction<T1, T2> GetAction<T1, T2>(Type type, string methodName)
```

値を返さない静的メソッドのための、`GetDelegate` の型付きラッパーです。上の一覧は引数なしのオーバーロードと最初の 2 つのジェネリック引数個数で、1 から 16 個のパラメーターまで同じオーバーロードがあります。型引数はすべてメソッドのパラメーター型で、どのオーバーロードもデリゲートのキャッシュを共有します。インスタンスメソッドでは `GetDelegate` を直接呼び、宣言型をデリゲートの最初のパラメーターとして渡してください。

これらのオーバーロードは `GetMethod` がスローする例外をそのままスローし、パラメーター型に一致するオーバーロードが無い場合は `MissingMethodException` になります。

## GetFunc

```csharp
public static WrapFunc<TR> GetFunc<TR>(Type type, string methodName)
public static WrapFunc<T1, TR> GetFunc<T1, TR>(Type type, string methodName)
public static WrapFunc<T1, T2, TR> GetFunc<T1, T2, TR>(Type type, string methodName)
```

値を返す静的メソッドのための同じラッパーです。戻り値の型は最後の型引数 `TR` で、1 から 16 個のパラメーターまで同じオーバーロードがあります。`GetAction`、`GetDelegate` とデリゲートのキャッシュを共有し、同じ例外をスローします。
