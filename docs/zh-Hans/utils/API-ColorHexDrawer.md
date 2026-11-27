# ColorHexDrawer

`io.github.ykysnk.utils.Editor` · `public class ColorHexDrawer : PropertyDrawer`

把 `ColorHex` 绘制成 Unity 的颜色色块，并把选取的颜色同时写回序列化的十六进制字符串，因此通过色块做出的编辑会让两个字段保持同步。

它以 `[CustomPropertyDrawer(typeof(ColorHex))]` 注册，序列化属性必须含有 `color` 与 `hex` 子项。

## OnGUI

```csharp
public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
```

绘制标签及随后的颜色色块。变更会一次性写入 `color` 与 `hex` 两个子项，十六进制采用 `#RRGGBBAA` 形式。
