# Reflect

`io.github.ykysnk.utils.NonUdon.Reflection` · `public static class Reflect`

HarmonyLib の `Traverse` を手本にしたキャッシュ付きのリフレクションアクセスです。Harmony は不要で、アクセスのたびにメンバーを解決することもありません。`Reflect.For` はインスタンスまたは型の `ReflectionAccess` を返し、その `Field`、`Property`、`Method` が `FieldAccess`、`PropertyAccess`、`MethodAccess` を返します。

メンバーはアクセサーを作るときに 1 回だけ解決され、そのアクセサーも 1 回だけコンパイルされます。そのため使い回すアクセサーは `FieldInfo.GetValue` ではなくデリゲート呼び出しになります。コンパイルできない場合（IL2CPP など）は、アクセサーは通常のリフレクションにフォールバックします。メンバーが無くてもアクセサーの作成では例外になりません。`Exists` で分かり、`TryGet` と `TryInvoke` は false を返し、例外になるのは `Get` と `Invoke` だけです。検索は対象の型とその基底型の宣言済みメンバーをたどるので、基底型の private メンバーにも届きます。

## For

```csharp
public static ReflectionAccess For(object target)
public static ReflectionAccess For(Type type)
```

インスタンス用のアクセサー（実行時の型がメンバーの検索先を決めます）か、型の静的メンバー用のアクセサー（基底型も含みます）を作ります。後者では `Target` が `null` になるため、型から作った `MethodAccess` は静的オーバーロードを優先します。

```csharp
var health = Reflect.For(component).Field("health");
var value = health.Get<int>();        // delegate call, safe to reuse in a loop
health.Set(3);

var name = Reflect.For(type).Method("BuildName", 1, "x").Invoke<string>();
```

## ReflectionAccess

`io.github.ykysnk.utils.NonUdon.Reflection` · `public readonly struct ReflectionAccess`

メンバーを読み出せるインスタンス、または静的メンバー用の型です。`Reflect.For` が作成し、コンストラクターは internal です。

### Target

```csharp
public object? Target { get; }
```

アクセサーが読み出すインスタンス、静的アクセスの場合は `null` です。

### Type

```csharp
public Type Type { get; }
```

メンバーを検索する型です。

### Field

```csharp
public FieldAccess Field(string name)
```

フィールドのアクセサーを作ります。メンバーはすぐに解決され、見つからなくても例外にはなりません。`name` は対象の型で探され、次に基底型をたどります。

### Property

```csharp
public PropertyAccess Property(string name)
```

プロパティのアクセサーを作ります。メンバーはすぐに解決され、見つからなくても例外にはなりません。`name` は対象の型で探され、次に基底型をたどります。

### Method

```csharp
public MethodAccess Method(string name, params object?[] arguments)
```

メソッドのアクセサーを作り、`arguments` に合うオーバーロードを選びます。選択には実行時の型が使われ、`null` は参照型と null 許容のパラメーターに一致し、引数を渡さなければパラメーターなしのメソッドが選ばれます。配列ごと `null` を渡すのは渡さないのと同じで、ジェネリックメソッドの定義が選ばれることはありません。パラメーター型が完全一致するものが代入可能なものより優先され、対象があるときはインスタンスメソッド、無いときは静的メソッドが優先されます。

## FieldAccess

`io.github.ykysnk.utils.NonUdon.Reflection` · `public readonly struct FieldAccess`

対象の型のフィールドで、アクセサーを作ったときに解決されます。

### Exists

```csharp
public bool Exists { get; }
```

フィールドが見つかったかどうかです。

### CanWrite

```csharp
public bool CanWrite { get; }
```

フィールドに代入できるかどうかです。readonly と const のフィールドでは false になります。

### MemberType

```csharp
public Type? MemberType { get; }
```

フィールドの宣言型です。見つからなかった場合は `null` です。

### Get

```csharp
public T? Get<T>()
```

フィールドを読み出して `T` にキャストします。フィールドが `null` なら `default` になります。フィールドが無ければ `MissingFieldException`、読み出せなければ `MemberAccessException` をスローします。

### TryGet

```csharp
public bool TryGet<T>(out T? value)
```

フィールドが存在して読み出せる場合は `value` に読み出して true を返します。それ以外は `value` が `default` になり、結果は false です。

### Set

```csharp
public bool Set(object? value)
```

フィールドに書き込み、`value` をフィールドの型に変換します。`null` が使えるのは参照型と null 許容型だけです。フィールドが無い場合や書き込めない場合は false を返します。

## PropertyAccess

`io.github.ykysnk.utils.NonUdon.Reflection` · `public readonly struct PropertyAccess`

対象の型のプロパティで、アクセサーを作ったときに解決されます。

### Exists

```csharp
public bool Exists { get; }
```

プロパティが見つかったかどうかです。

### CanWrite

```csharp
public bool CanWrite { get; }
```

プロパティに代入できるかどうかです。setter が無い場合は false になります。

### MemberType

```csharp
public Type? MemberType { get; }
```

プロパティの宣言型です。見つからなかった場合は `null` です。

### Get

```csharp
public T? Get<T>()
```

プロパティを読み出して `T` にキャストします。プロパティが `null` なら `default` になります。プロパティが無ければ `MissingMemberException`、getter が無ければ `MemberAccessException` をスローします。

### TryGet

```csharp
public bool TryGet<T>(out T? value)
```

プロパティが存在して読み出せる場合は `value` に読み出して true を返します。それ以外は `value` が `default` になり、結果は false です。

### Set

```csharp
public bool Set(object? value)
```

プロパティに書き込み、`value` をプロパティの型に変換します。`null` が使えるのは参照型と null 許容型だけです。プロパティが無い場合や書き込めない場合は false を返します。

## MethodAccess

`io.github.ykysnk.utils.NonUdon.Reflection` · `public readonly struct MethodAccess`

対象の型のメソッドと、それを呼び出すときの引数です。アクセサーを作ったときに解決されます。

### Exists

```csharp
public bool Exists { get; }
```

現在の引数に合うメソッドのオーバーロードが見つかったかどうかです。

### ReturnType

```csharp
public Type? ReturnType { get; }
```

解決されたオーバーロードの戻り値の型です。一致しなかった場合は `null` です。

### TryInvoke

```csharp
public bool TryInvoke(out object? result)
public bool TryInvoke<T>(out T? result)
```

`Method` に渡した引数でメソッドを呼び、一致するオーバーロードがあれば true を返します。`result` には戻り値が入り、一致するオーバーロードが無い場合や void を返すメソッドの場合は `null` / `default` になります。

### Invoke

```csharp
public object? Invoke()
public T? Invoke<T>()
```

`Method` に渡した引数でメソッドを呼び、結果を返します。void を返すメソッドでは `null` で、ジェネリック形式は `T` にキャストします。引数に合うオーバーロードが無ければ `MissingMethodException` をスローします。
