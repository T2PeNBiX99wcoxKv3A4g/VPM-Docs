# IUtilsEditorOnly

`io.github.ykysnk.utils` · `public interface IUtilsEditorOnly`

Marker interface for behaviours that must be stripped before upload.

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

It declares no members. The base interface depends on the project: `nadena.dev.ndmf.INDMFEditorOnly` when `UTILS_NDMF` is defined, `VRC.SDKBase.IEditorOnly` when `UTILS_VRC_SDK3_BASE` is defined, and no base interface otherwise, so the marker still compiles without NDMF or the VRChat SDK.

[`BasicEditorComponent`](./API-BasicEditorComponent.md) already implements it, so deriving a helper behaviour from that class is enough to opt in.
