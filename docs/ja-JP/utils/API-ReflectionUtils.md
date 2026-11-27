# ReflectionUtils

`io.github.ykysnk.utils.NonUdon` · `public static class ReflectionUtils`

直接参照できない型（コンパイラーが生成するクロージャやステートマシンなど）のためのリフレクションヘルパーです。

失敗は警告としてログに記録され、例外ではなく既定値を返すため、オプション依存の存在確認にそのまま使えます。検索結果はキャッシュされるので、ループ内で `FindMethod` や `FindProperty` を呼んでも反射の走査ではなく辞書引き 1 回で済みます。見つからなかった結果もキャッシュされますが、`FindType` だけは例外です。アセンブリは後から読み込まれることがあるためです。

## Instantiate

```csharp
public static T? Instantiate<T>(Type type)
```

パラメーターなしのコンストラクターで `type` のインスタンスを作り、`T` にキャストします。コンストラクターが無い場合、例外を投げる場合、キャストに失敗した場合は警告としてログに記録され、`default` を返します。

## GetNestedMethods

```csharp
public static IEnumerable<MethodInfo> GetNestedMethods(Type? type)
```

`type` のネスト型が宣言しているメソッドを、public かどうか、static かどうかを問わず列挙します。結果は遅延評価なので、シーケンスをたどりながらリフレクションが行われます。実行時に列挙を拒否されたネスト型はスキップされます。`type` が null の場合は何も返しません。

## GetNestedMethod

```csharp
public static MethodInfo? GetNestedMethod(Type? type, string name, string? searchName = null)
```

`GetNestedMethods` が見つけたメソッドのうち、名前が `searchName` を含む最初のものを返します。一致が無ければ `null` です。`searchName` の既定値は `<name>` で、これは `name` というメンバーのラムダ、async 本体、ローカル関数に対してコンパイラーが付ける名前です。

```csharp
var moveNext = ReflectionUtils.GetNestedMethod(stateMachineType, "MoveNext");
```

## FindType

```csharp
public static Type? FindType(string? typeName)
```

読み込まれているアセンブリから完全名（またはアセンブリ修飾名）を解決します。参照せずにオプション依存を調べられます。解決できない場合は例外ではなく `null` を返します。解決できた型は名前ごとにキャッシュされ、見つからなかった結果はキャッシュされません。

## FindMethod

```csharp
public static MethodInfo? FindMethod(Type? type, string name)
```

名前だけでメソッドを探します。public かどうか、static か、その型で宣言されているか継承されたものかを問わず、その名前が無ければ `null` を返します。解決できたメソッド、または見つからなかった結果は型と名前ごとにキャッシュされます。照合は名前だけなので、オーバーロードがあると最初に見つかったものが返ります。

## FindProperty

```csharp
public static PropertyInfo? FindProperty(Type? type, string name)
```

名前だけでプロパティを探します。public かどうかは問いません。その名前が無ければ `null` を返します。解決できたプロパティ、または見つからなかった結果は型と名前ごとにキャッシュされます。

## GetDeclaredMethods

```csharp
public static IEnumerable<MethodInfo> GetDeclaredMethods(Type? type)
```

その型自身が宣言しているメソッドを、public かどうかを問わず返します。`GetNestedMethods` と違い、ネスト型は見ません。リストは型ごとに 1 回だけ解決されて再利用されるので、返されたシーケンスは変更しないでください。
