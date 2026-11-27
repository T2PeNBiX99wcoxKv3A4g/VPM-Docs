# LocalizationPackageAttribute

`io.github.ykysnk.Localization.Editor` · `[AttributeUsage(AttributeTargets.Assembly)] public sealed class LocalizationPackageAttribute : Attribute`

Assembly attribute declaring which localization an assembly's editor UI uses. Declare it once per assembly, next to the `using` directives; after that `LocalizationExtensions` resolves the right helper on its own, so the assembly needs neither a wrapper class nor a helper field.

`AttributeUsage` restricts it to assemblies. An assembly without the attribute still compiles: `LocalizationHelper.For` logs a warning for it and returns a shared unbound helper that displays every key unchanged.

```csharp
using io.github.ykysnk.Localization.Editor;

[assembly: LocalizationPackage("io.github.ykysnk.yky-toolkit")]
```

## Constructors

```csharp
public LocalizationPackageAttribute(string localizationID)
```

Creates the attribute for one localization id and stores it in `LocalizationID`.

## LocalizationID

```csharp
public string LocalizationID { get; }
```

Localization id whose assets hold this assembly's translations.
