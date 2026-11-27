# ExportsPatchLoader

`io.github.ykysnk.utils.Editor.Patches` · `[AttributeUsage(AttributeTargets.Assembly, AllowMultiple = true)] public sealed class ExportsPatchLoader : Attribute`

宣告一個 [`IPatchLoader`](./API-PatchLoader.md) 型別、於編輯器載入時執行的組件屬性。其他組件就是這樣把修補載入器交給框架：每個宣告的型別都會在編輯器啟動時被讀取、具現化並載入。

`AllowMultiple` 為 true，因此一個組件可以宣告多個載入器。

```csharp
[assembly: ExportsPatchLoader(typeof(MyLoader))]
```

## Constructors

```csharp
public ExportsPatchLoader(Type type)
```

宣告 `type` 為帶有此屬性之組件的修補載入器。該型別必須實作 `IPatchLoader`，通常是衍生自 [`PatchLoader<T>`](./API-PatchLoader.md)，否則在收集載入器時會忽略此屬性。

## Type

```csharp
public Type Type { get; }
```

此屬性所宣告的載入器型別。
