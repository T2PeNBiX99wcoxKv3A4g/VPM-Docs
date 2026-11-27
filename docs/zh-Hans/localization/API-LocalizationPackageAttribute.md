# LocalizationPackageAttribute

`io.github.ykysnk.Localization.Editor` · `[AttributeUsage(AttributeTargets.Assembly)] public sealed class LocalizationPackageAttribute : Attribute`

声明一个程序集的编辑器 UI 使用哪个本地化的程序集特性。每个程序集声明一次，紧挨 `using` 指令；之后 `LocalizationExtensions` 会自行解析正确的辅助实例，因此该程序集既不需要包装类，也不需要辅助字段。

`AttributeUsage` 把它的作用范围限制在程序集上。没有该特性的程序集仍可编译：`LocalizationHelper.For` 会为它记录一条警告，并返回一个共享的未绑定辅助实例，该实例会把每个键原样显示。

```csharp
using io.github.ykysnk.Localization.Editor;

[assembly: LocalizationPackage("io.github.ykysnk.yky-toolkit")]
```

## Constructors

```csharp
public LocalizationPackageAttribute(string localizationID)
```

为一个本地化 id 创建特性，并将其存入 `LocalizationID`。

## LocalizationID

```csharp
public string LocalizationID { get; }
```

资源中保存着该程序集翻译的本地化 id。
