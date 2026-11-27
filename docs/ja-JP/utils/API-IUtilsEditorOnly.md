# IUtilsEditorOnly

`io.github.ykysnk.utils` · `public interface IUtilsEditorOnly`

アップロード前に取り除く必要がある振る舞いのためのマーカーインターフェースです。

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

メンバーは宣言していません。基底インターフェースはプロジェクトによって変わります。`UTILS_NDMF` が定義されているときは `nadena.dev.ndmf.INDMFEditorOnly`、`UTILS_VRC_SDK3_BASE` が定義されているときは `VRC.SDKBase.IEditorOnly`、どちらも定義されていないときは基底なしです。そのため NDMF も VRChat SDK も無いプロジェクトでもコンパイルできます。

[`BasicEditorComponent`](./API-BasicEditorComponent.md) はすでにこれを実装しているので、そのクラスを継承するだけで組み込めます。
