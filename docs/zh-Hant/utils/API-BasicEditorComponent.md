# BasicEditorComponent

`io.github.ykysnk.utils` · `public abstract class BasicEditorComponent : MonoBehaviour, IUtilsEditorOnly`

用於不應殘留到上傳模型或世界中的輔助行為的空基底類別。

```csharp
public abstract class BasicEditorComponent : MonoBehaviour, IUtilsEditorOnly
```

它不新增任何成員，並保留正常的 `MonoBehaviour` 行為，因此衍生元件仍可掛到物件上並在檢視器中設定。繼承它就足以接入：組建管線會移除所有實作 [`IUtilsEditorOnly`](./API-IUtilsEditorOnly.md) 的元件，而這個類別已經實作了該介面。
