# BooleanVector3Drawer

`io.github.ykysnk.utils.Editor` · `public class BooleanVector3Drawer : PropertyDrawer`

把 `BooleanVector3` 绘制成一行 X/Y/Z 三个开关，与 Unity 绘制 `Vector3` 的方式相同，复用的是内置的多属性字段。

它以 `[CustomPropertyDrawer(typeof(BooleanVector3))]` 注册，因此每个 `BooleanVector3` 字段无需额外特性即可生效。

## OnGUI

```csharp
public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
```

绘制标签及随后的三个分量开关，并通过序列化属性写回编辑，属性的 `x`、`y`、`z` 子项会被编辑。视图宽度低于约 332 像素时，带前缀的矩形放不下三个开关，因此开关改用完整控件矩形。
