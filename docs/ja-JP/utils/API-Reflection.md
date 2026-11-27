# リフレクション

## ReflectionUtils

`io.github.ykysnk.utils.NonUdon` · `public static class ReflectionUtils`

例外の代わりに警告をログに出すリフレクションヘルパーです。見つからないメンバーは `null` / `default` を返すので、
オプション依存の存在確認にそのまま使えます。

検索結果は型と名前ごとにキャッシュされ、見つからなかった場合も保持されます。そのため繰り返し呼んでも辞書引きだけで
済みます。`FindType` は解決できた名前だけをキャッシュします（アセンブリは後から読み込まれることがあるため）。

### Instantiate&lt;T&gt;(Type type)

```csharp
public static T? Instantiate<T>(Type type)
```

パラメーターなしのコンストラクターでインスタンスを作り、`T` にキャストします。失敗は警告としてログに残り、
`default` を返します。

### GetNestedMethods(Type? type)

```csharp
public static IEnumerable<MethodInfo> GetNestedMethods(Type? type)
```

`type` のネスト型が宣言しているメソッドを、public かどうかを問わず遅延列挙します。列挙できないネスト型は
スキップされます。

### GetNestedMethod(Type? type, string name, string? searchName = null)

```csharp
public static MethodInfo? GetNestedMethod(Type? type, string name, string? searchName = null)
```

名前が `searchName` を含む最初のネストメソッドを返します。既定値は `<name>` で、`name` というメンバーの
ラムダ・async 本体・ローカル関数に対してコンパイラーが付ける名前です。

### FindType(string? typeName)

```csharp
public static Type? FindType(string? typeName)
```

読み込まれているアセンブリから完全名（またはアセンブリ修飾名）を解決します。見つからなければ `null` です。

### FindMethod(Type? type, string name)

```csharp
public static MethodInfo? FindMethod(Type? type, string name)
```

その名前の最初のメソッドを返します。public かどうか、static かどうか、宣言か継承かを問いません。無ければ
`null` です。名前だけで照合するため、オーバーロードがあると最初に見つかったものを返します。

### FindProperty(Type? type, string name)

```csharp
public static PropertyInfo? FindProperty(Type? type, string name)
```

その名前のプロパティを返します。public かどうかは問いません。無ければ `null` です。

### GetDeclaredMethods(Type? type)

```csharp
public static IEnumerable<MethodInfo> GetDeclaredMethods(Type? type)
```

その型自身が宣言しているメソッド（ネスト型のものは含みません）を、public かどうかを問わず返します。
