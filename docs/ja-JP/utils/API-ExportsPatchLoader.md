# ExportsPatchLoader

`io.github.ykysnk.utils.Editor.Patches` · `[AttributeUsage(AttributeTargets.Assembly, AllowMultiple = true)] public sealed class ExportsPatchLoader : Attribute`

エディタの読み込み時に実行する [`IPatchLoader`](./API-PatchLoader.md) の型を 1 つ宣言するアセンブリ属性です。別のアセンブリはこれでパッチローダーをフレームワークに渡します。宣言された型はすべて、エディタの起動時に読み取られ、インスタンス化され、読み込まれます。

`AllowMultiple` が true なので、1 つのアセンブリで複数のローダーを宣言できます。

```csharp
[assembly: ExportsPatchLoader(typeof(MyLoader))]
```

## Constructors

```csharp
public ExportsPatchLoader(Type type)
```

この属性を持つアセンブリのパッチローダーとして `type` を宣言します。型は `IPatchLoader` を実装している必要があり、通常は [`PatchLoader<T>`](./API-PatchLoader.md) から派生します。実装していない場合、ローダーを集めるときにこの属性は無視されます。

## Type

```csharp
public Type Type { get; }
```

この属性が宣言するローダーの型です。
