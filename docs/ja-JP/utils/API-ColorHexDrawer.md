# ColorHexDrawer

`io.github.ykysnk.utils.Editor` · `public class ColorHexDrawer : PropertyDrawer`

`ColorHex` を Unity のカラースウォッチとして描画し、選んだ色をシリアライズされた 16 進文字列にも書き戻すので、スウォッチからの編集で両方のフィールドが同期します。

`[CustomPropertyDrawer(typeof(ColorHex))]` で登録されており、シリアライズプロパティには `color` と `hex` の子が必要です。

## OnGUI

```csharp
public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
```

ラベルに続けてカラースウォッチを描画します。変更は `color` と `hex` の子の両方に同時に書き込まれ、16 進は `#RRGGBBAA` 形式になります。
