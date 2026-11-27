# BasicEditorComponent

`io.github.ykysnk.utils` · `public abstract class BasicEditorComponent : MonoBehaviour, IUtilsEditorOnly`

用于不应残留在上传模型或世界中的辅助行为的空基类。

```csharp
public abstract class BasicEditorComponent : MonoBehaviour, IUtilsEditorOnly
```

它不新增任何成员，并保留正常的 `MonoBehaviour` 行为，因此派生组件仍然可以挂到对象上并在检视器中配置。继承它就足以接入：构建管线会移除所有实现 [`IUtilsEditorOnly`](./API-IUtilsEditorOnly.md) 的组件，而这个类已经实现了该接口。
