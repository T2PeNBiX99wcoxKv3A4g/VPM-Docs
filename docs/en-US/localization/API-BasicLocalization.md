# BasicLocalization

`io.github.ykysnk.Localization` · `[CreateAssetMenu(fileName = "en-US", menuName = "Localization/Basic Localization")] public class BasicLocalization : ScriptableObject`

One localization set: the editor-only translations of one language. The asset's file name is the language id used by `Languages` and `SetLanguage`, while `localizationID` groups the assets that belong to the same package.

The editor loads every asset of this type in the project, so a translation only has to live somewhere in the project. An asset whose `localizationID` is empty is skipped with a warning and contributes no language, and an entry without a key is skipped one by one. A new asset is offered as `en-US` under `Assets > Create > Localization > Basic Localization`.

## LocalizationFileUpdated

```csharp
public delegate void LocalizationFileUpdated(string localizationID, string localizationName)
```

Receives the localization id and the asset name of the asset that changed. It is the type of [`OnLocalizationFileUpdated`](#onlocalizationfileupdated), which passes both values to every subscriber.

## localizationID

```csharp
public string localizationID = "";
```

Group id shared by every language of the same localization. An asset with an empty id is skipped with a warning when the assets are loaded, so it never appears in the language picker.

## displayName

```csharp
public string displayName = "English";
```

Name shown in the language picker. `OnValidate` restores `English` when the field is empty, so the picker cannot end up with a blank entry.

## translates

```csharp
public List<BasicTranslate> translates = new();
```

All translations of this language, in the order the inspector lists them. A new asset starts with the `label.language` entry, which the language picker needs.

## jsonFile

```csharp
public Object? jsonFile;
```

Sidecar JSON written by `Export JSON` in the inspector. The field holds a `UnityEngine.Object`, but the inspector only accepts a `TextAsset`; the export writes the file next to the asset, imports it and assigns it here.

## poFile

```csharp
public Object? poFile;
```

Sidecar PO written by `Export PO` in the inspector. The inspector only accepts Unity's `LocalizationAsset` for it; the export writes the file next to the asset, imports it and assigns it here.

## OnValidate

```csharp
protected virtual void OnValidate()
```

Unity callback that runs when the asset is loaded or changed in the inspector. It refills `displayName` with `English` when the field is empty and raises `OnLocalizationFileUpdated` with `localizationID` and the asset name, which is how the editor learns that the translations have to be reloaded. An override should call the base implementation, otherwise both steps are skipped.

## OnLocalizationFileUpdated

```csharp
public static event LocalizationFileUpdated? OnLocalizationFileUpdated;
```

Raised from `OnValidate` after any asset of this type changed, with its localization id and asset name. The event is static, so one handler hears about every asset; `GlobalLocalization` subscribes to it to schedule a reload.
