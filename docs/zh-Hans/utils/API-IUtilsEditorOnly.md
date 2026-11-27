# IUtilsEditorOnly

`io.github.ykysnk.utils` · `public interface IUtilsEditorOnly`

上传前必须移除的行为所用的标记接口。

```csharp
public interface IUtilsEditorOnly
#if UTILS_NDMF
    : INDMFEditorOnly
#elif UTILS_VRC_SDK3_BASE
    : IEditorOnly
#endif
{
}
```

它不声明任何成员。基接口取决于项目：定义 `UTILS_NDMF` 时为 `nadena.dev.ndmf.INDMFEditorOnly`，定义 `UTILS_VRC_SDK3_BASE` 时为 `VRC.SDKBase.IEditorOnly`，两者都未定义时没有基接口，因此在既没有 NDMF 也没有 VRChat SDK 的项目中仍然可以编译。

[`BasicEditorComponent`](./API-BasicEditorComponent.md) 已经实现了它，因此继承该类就足以接入。
