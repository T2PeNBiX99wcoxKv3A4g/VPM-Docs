# BooleanVector3Drawer

`io.github.ykysnk.utils.Editor` · `public class BooleanVector3Drawer : PropertyDrawer`

把 `BooleanVector3` 繪製成同一列的 X/Y/Z 三個開關，與 Unity 繪製 `Vector3` 的方式相同，並重複使用內建的多屬性欄位。

它以 `[CustomPropertyDrawer(typeof(BooleanVector3))]` 註冊，因此每個 `BooleanVector3` 欄位不需額外特性即可生效。

## OnGUI

```csharp
public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
```

繪製標籤及後續的三個分量開關，並透過序列化屬性寫回編輯，屬性的 `x`、`y`、`z` 子項會被編輯。檢視寬度低於約 332 像素時，帶前置字串的矩形放不下三個開關，因此開關改用完整控制項矩形。
