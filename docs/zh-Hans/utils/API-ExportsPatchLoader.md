# ExportsPatchLoader

`io.github.ykysnk.utils.Editor.Patches` · `[AttributeUsage(AttributeTargets.Assembly, AllowMultiple = true)] public sealed class ExportsPatchLoader : Attribute`

声明一个 [`IPatchLoader`](./API-PatchLoader.md) 类型、于编辑器加载时运行的程序集特性。其他程序集就是这样把补丁加载器交给框架：每个声明的类型都会在编辑器启动时被读取、实例化并加载。

`AllowMultiple` 为 true，因此一个程序集可以声明多个加载器。

```csharp
[assembly: ExportsPatchLoader(typeof(MyLoader))]
```

## Constructors

```csharp
public ExportsPatchLoader(Type type)
```

声明 `type` 为带有此特性的程序集的补丁加载器。该类型必须实现 `IPatchLoader`，通常是派生自 [`PatchLoader<T>`](./API-PatchLoader.md)，否则在收集加载器时会忽略此特性。

## Type

```csharp
public Type Type { get; }
```

此特性所声明的加载器类型。
