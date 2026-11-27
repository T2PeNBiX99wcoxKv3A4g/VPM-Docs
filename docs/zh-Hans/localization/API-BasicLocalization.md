# BasicLocalization

`io.github.ykysnk.Localization` · `[CreateAssetMenu(fileName = "en-US", menuName = "Localization/Basic Localization")] public class BasicLocalization : ScriptableObject`

一个本地化集合：一种语言仅在编辑器中使用的翻译。资源的文件名就是 `Languages` 和 `SetLanguage` 中使用的语言 id，`localizationID` 则把属于同一个包的资源归到一组。

编辑器会加载项目中所有该类型的资源，因此翻译只要放在项目中的任意位置即可。`localizationID` 为空的资源会被跳过并给出警告，不计为一种语言；没有键的条目会逐条跳过。新资源会以 `en-US` 的名称在 `Assets > Create > Localization > Basic Localization` 下创建。

## LocalizationFileUpdated

```csharp
public delegate void LocalizationFileUpdated(string localizationID, string localizationName)
```

接收发生变化的那份资源的本地化 id 与资源名称。它是 [`OnLocalizationFileUpdated`](#onlocalizationfileupdated) 的类型，会把这两个值传给每个订阅者。

## localizationID

```csharp
public string localizationID = "";
```

同一本地化下所有语言共享的分组 id。id 为空的资源在加载时会被跳过并给出警告，因此永远不会出现在语言选择器中。

## displayName

```csharp
public string displayName = "English";
```

语言选择器中显示的名称。字段为空时 `OnValidate` 会恢复为 `English`，因此选择器不会留下空白条目。

## translates

```csharp
public List<BasicTranslate> translates = new();
```

该语言的全部翻译，顺序与检视器中的列表一致。新资源以 `label.language` 条目开始，语言选择器需要这一条目。

## jsonFile

```csharp
public Object? jsonFile;
```

由检视器中的 `Export JSON` 写出的旁挂 JSON。字段类型是 `UnityEngine.Object`，但检视器只接受 `TextAsset`；导出会把文件写在资源旁边、导入它，然后赋到这里。

## poFile

```csharp
public Object? poFile;
```

由检视器中的 `Export PO` 写出的旁挂 PO。检视器只接受 Unity 的 `LocalizationAsset`；导出会把文件写在资源旁边、导入它，然后赋到这里。

## OnValidate

```csharp
protected virtual void OnValidate()
```

在资源被加载或在检视器中更改时运行的 Unity 回调。`displayName` 为空时用 `English` 补上，并以 `localizationID` 与资源名称触发 `OnLocalizationFileUpdated`，编辑器正是通过它得知需要重新加载翻译。重写时请调用基类实现，否则这两步都不会执行。

## OnLocalizationFileUpdated

```csharp
public static event LocalizationFileUpdated? OnLocalizationFileUpdated;
```

任何该类型的资源更改后由 `OnValidate` 触发，携带其本地化 id 与资源名称。事件是 static 的，因此一个处理程序会收到所有资源的变更；`GlobalLocalization` 订阅它来安排重新加载。
