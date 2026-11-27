# ExportsPatchLoader

`io.github.ykysnk.utils.Editor.Patches` · `[AttributeUsage(AttributeTargets.Assembly, AllowMultiple = true)] public sealed class ExportsPatchLoader : Attribute`

Assembly attribute declaring one [`IPatchLoader`](./API-PatchLoader.md) type to run when the editor loads. This is how another assembly hands its patch loaders to the framework: every declared type is read, instantiated and loaded on editor start-up.

`AllowMultiple` is true, so one assembly can declare several loaders.

```csharp
[assembly: ExportsPatchLoader(typeof(MyLoader))]
```

## Constructors

```csharp
public ExportsPatchLoader(Type type)
```

Declares `type` as a patch loader of the assembly carrying this attribute. The type must implement `IPatchLoader`, normally by deriving from [`PatchLoader<T>`](./API-PatchLoader.md), otherwise the attribute is ignored when the loaders are collected.

## Type

```csharp
public Type Type { get; }
```

The loader type this attribute declares.
