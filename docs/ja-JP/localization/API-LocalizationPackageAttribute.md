# LocalizationPackageAttribute

`io.github.ykysnk.Localization.Editor` · `[AttributeUsage(AttributeTargets.Assembly)] public sealed class LocalizationPackageAttribute : Attribute`

アセンブリのエディタ UI がどのローカライゼーションを使うかを宣言するアセンブリ属性です。`using` ディレクティブの隣で、アセンブリごとに 1 回宣言してください。以降は `LocalizationExtensions` が適切なヘルパーを自分で解決するため、アセンブリにラッパークラスもヘルパーフィールドも必要ありません。

`AttributeUsage` により、アセンブリにしか付けられません。属性のないアセンブリもコンパイルできます。その場合 `LocalizationHelper.For` は警告を記録し、すべてのキーをそのまま表示する共有の未バインドヘルパーを返します。

```csharp
using io.github.ykysnk.Localization.Editor;

[assembly: LocalizationPackage("io.github.ykysnk.yky-toolkit")]
```

## Constructors

```csharp
public LocalizationPackageAttribute(string localizationID)
```

1 つのローカライゼーション ID に対する属性を作成し、`LocalizationID` に格納します。

## LocalizationID

```csharp
public string LocalizationID { get; }
```

このアセンブリの翻訳を持つアセットのローカライゼーション ID。
