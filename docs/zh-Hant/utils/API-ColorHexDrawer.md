# ColorHexDrawer

`io.github.ykysnk.utils.Editor` · `public class ColorHexDrawer : PropertyDrawer`

把 `ColorHex` 繪製成 Unity 的顏色色塊，並把選取的顏色同時寫回序列化的十六進位字串，因此透過色塊所做的編輯會讓兩個欄位保持同步。

它以 `[CustomPropertyDrawer(typeof(ColorHex))]` 註冊，序列化屬性必須含有 `color` 與 `hex` 子項。

## OnGUI

```csharp
public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
```

繪製標籤及後續的顏色色塊。變更會一次寫入 `color` 與 `hex` 兩個子項，十六進位採用 `#RRGGBBAA` 形式。
