# BooleanVector3Drawer

`io.github.ykysnk.utils.Editor` · `public class BooleanVector3Drawer : PropertyDrawer`

`BooleanVector3` を、Unity が `Vector3` を描画するのと同じように 1 行の X/Y/Z の 3 つのトグルとして描画します。組み込みの複数プロパティフィールドを再利用しています。

`[CustomPropertyDrawer(typeof(BooleanVector3))]` で登録されているため、`BooleanVector3` のフィールドには独自の属性なしで適用されます。

## OnGUI

```csharp
public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
```

ラベルに続けて 3 つの成分トグルを描画し、`x`、`y`、`z` の子を持つシリアライズプロパティ経由で編集内容を書き戻します。表示幅がおよそ 332 ピクセルを下回ると、プレフィックス付きの矩形に 3 つとも収まらないため、トグルはコントロール矩形全体を使います。
