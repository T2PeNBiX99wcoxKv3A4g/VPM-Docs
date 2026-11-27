# LocalizationPackageAttribute

`io.github.ykysnk.Localization.Editor` · `[AttributeUsage(AttributeTargets.Assembly)] public sealed class LocalizationPackageAttribute : Attribute`

宣告程式集的編輯器 UI 使用哪一個在地化的程式集屬性。每個程式集宣告一次，放在 `using` 指示詞旁；之後 `LocalizationExtensions` 會自行解析正確的輔助物件，因此程式集既不需要包裝類別，也不需要輔助欄位。

`AttributeUsage` 讓它只能套用在程式集上。沒有這個屬性的程式集仍可編譯：`LocalizationHelper.For` 會為它記錄警告，並傳回共用的未繫結輔助物件，讓每個鍵都原樣顯示。

```csharp
using io.github.ykysnk.Localization.Editor;

[assembly: LocalizationPackage("io.github.ykysnk.yky-toolkit")]
```

## Constructors

```csharp
public LocalizationPackageAttribute(string localizationID)
```

為一個在地化 ID 建立屬性，並將其存入 `LocalizationID`。

## LocalizationID

```csharp
public string LocalizationID { get; }
```

其資產存放這個程式集翻譯的在地化 ID。
