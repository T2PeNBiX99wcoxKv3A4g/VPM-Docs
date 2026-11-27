# BasicEditorComponent

`io.github.ykysnk.utils` · `public abstract class BasicEditorComponent : MonoBehaviour, IUtilsEditorOnly`

アップロードするアバターやワールドに残してはいけない補助的な振る舞いのための、空の基底クラスです。

```csharp
public abstract class BasicEditorComponent : MonoBehaviour, IUtilsEditorOnly
```

独自のメンバーは追加せず、通常の `MonoBehaviour` としての動作はそのまま残るため、派生コンポーネントはオブジェクトにアタッチしてインスペクターで設定できます。継承するだけで組み込めます。ビルドパイプラインは [`IUtilsEditorOnly`](./API-IUtilsEditorOnly.md) を実装するコンポーネントを取り除き、このクラスはすでにそれを実装しています。
