# IUtilsEditorOnly

`io.github.ykysnk.utils` · `public interface IUtilsEditorOnly`

上傳前必須移除的行為所用的標記介面。

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

它不宣告任何成員。基底介面取決於專案：定義 `UTILS_NDMF` 時為 `nadena.dev.ndmf.INDMFEditorOnly`，定義 `UTILS_VRC_SDK3_BASE` 時為 `VRC.SDKBase.IEditorOnly`，兩者都未定義時沒有基底介面，因此在既沒有 NDMF 也沒有 VRChat SDK 的專案中仍可編譯。

[`BasicEditorComponent`](./API-BasicEditorComponent.md) 已經實作它，因此繼承該類別就足以接入。
