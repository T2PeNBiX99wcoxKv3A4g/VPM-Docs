# インスペクターとドロワー

## BasicEditor

`io.github.ykysnk.utils.Editor` · `public abstract class BasicEditor : UnityEditor.Editor`

描画コードを try/catch の中で実行し、例外が発生したときに一貫したエラー UI を表示するカスタムインスペクターの基底クラスです。
IMGUI と UI Toolkit の両方のインスペクターに対応します。

```csharp
[CustomEditor(typeof(MyBehaviour))]
public class MyBehaviourEditor : BasicEditor
{
    protected override void OnErrorHandleInspectorGUI()
    {
        EditorGUILayout.LabelField("Hello");
    }
}
```

### ErrorEvent

```csharp
public delegate void ErrorEvent(Exception e, Type type);
```

インスペクター本体から漏れた例外を受け取ります。

### Type

```csharp
public enum Type
{
    UGUI,
    UIToolkit
}
```

失敗したインスペクター技術: 従来の IMGUI インスペクターか、`CreateInspectorGUI` で組み立てる UI Toolkit インスペクターか。

### OnErrorEvent

```csharp
public static event ErrorEvent? OnErrorEvent;
```

例外が捕捉され、エラー UI が描画された後に発生します。報告を行いたいツール向けです。

### IsBaseOnOldInspectorGUI

```csharp
protected virtual bool IsBaseOnOldInspectorGUI { get; }
```

`OnInspectorGUI` がカスタム本体の前に Unity の既定インスペクターを描画するかどうか。既定は false。

### ConsoleLog

```csharp
protected virtual bool ConsoleLog { get; }
```

捕捉した例外を `Debug.LogException` でも書き出すかどうか。既定は false です。どちらの場合もエラー UI は表示されます。

### OnEnable()

```csharp
protected virtual void OnEnable()
```

初期化用の Unity コールバック。ガードされていないため、ここで投げられた例外は基底クラスでは捕捉されません。

### OnInspectorGUI()

```csharp
public override void OnInspectorGUI()
```

シリアライズオブジェクトを更新し、`IsBaseOnOldInspectorGUI` が設定されていれば基底のインスペクターを描画し、その後
`Try.Run` の
中で `OnErrorHandleInspectorGUI` を実行します。失敗時は任意でログを出し、`OnError` と `OnErrorEvent` を呼び、IMGUI のエラー
UI を
描画します。本体が変更を報告した場合は、変更されたプロパティを適用する前に `OnChange` が実行されます。

### CreateInspectorGUI()

```csharp
public override VisualElement? CreateInspectorGUI()
```

`Try.Run` の中で `CreateErrorHandleInspectorGUI` を組み立てます。失敗時は例外を報告し、`BasicEditorErrorUI.uxml` の UI
Toolkit
エラー UI を返します。そのアセットを読み込めない場合は `CreateUxmlImportErrorUI()` を返します。

### CreateUxmlImportErrorUI()

```csharp
public static VisualElement CreateUxmlImportErrorUI()
```

`BasicEditorErrorUI.uxml` 自体を読み込めないときに使うエラー UI。

### CreateInfoUI(string errorMessage)

```csharp
public static VisualElement CreateInfoUI(string errorMessage)
```

情報メッセージを持つ UI Toolkit のヘルプボックスを組み立てます。

### CreateErrorUI(string errorMessage)

```csharp
public static VisualElement CreateErrorUI(string errorMessage)
```

エラーメッセージを持つ UI Toolkit のヘルプボックスを組み立てます。

### CreateWarningUI(string errorMessage)

```csharp
public static VisualElement CreateWarningUI(string errorMessage)
```

警告メッセージを持つ UI Toolkit のヘルプボックスを組み立てます。

### CreateHelpUI(string message, HelpBoxMessageType type = HelpBoxMessageType.Info)

```csharp
public static VisualElement CreateHelpUI(string message, HelpBoxMessageType type = HelpBoxMessageType.Info)
```

`HelpBox` を 1 つ持つ VisualElement ツリーを組み立てます。

### ErrorTitle(Exception e)

```csharp
protected static string ErrorTitle(Exception e)
```

エラー UI に表示される 1 行のタイトル: `Editor Error: {message}`。

### ErrorDetails(Exception e)

```csharp
protected static string ErrorDetails(Exception e)
```

コピーできるエラーテキスト: メッセージの後に元のスタックトレース。

### DrawErrorUI(Exception e)

```csharp
protected virtual void DrawErrorUI(Exception e)
```

`BasicEditorErrorUI.uxml` を再現した IMGUI のエラー UI を描画します。`HelpBox` のメッセージ、例外の型と Copy ボタンのある
ヘッダー行、内容に応じて伸び 140 ピクセルに達するとスクロールする選択可能なボックスに入った詳細です。

### OnChange()

```csharp
protected virtual void OnChange()
```

インスペクター本体が変更を報告した後、変更されたプロパティを適用する前に呼ばれます。

### OnError(Exception e, Type type)

```csharp
protected virtual void OnError(Exception e, Type type)
```

インスペクター本体から捕捉されたすべての例外について、エラー UI を描画する前に呼ばれます。独自のログや復旧処理を追加するには
オーバーライドしてください。

### OnErrorHandleInspectorGUI()

```csharp
protected virtual void OnErrorHandleInspectorGUI()
```

IMGUI のインスペクター本体を描画します。`OnInspectorGUI` ではなくこちらをオーバーライドしてください。例外は捕捉され、エラー
UI に
置き換えられます。

### CreateErrorHandleInspectorGUI()

```csharp
protected virtual VisualElement? CreateErrorHandleInspectorGUI()
```

UI Toolkit のインスペクター本体を組み立てます。こちらをオーバーライドしてください。例外は捕捉され、エラー UI に置き換えられます。

## BooleanVector3Drawer

`io.github.ykysnk.utils.Editor` · `public class BooleanVector3Drawer : PropertyDrawer`

`BooleanVector3` を Unity が `Vector3` を描画するのと同じように、1 行に X/Y/Z の 3 つのトグルとして描画します。組み込みの複数
プロパティフィールドを再利用しています。`[CustomPropertyDrawer(typeof(BooleanVector3))]` で登録されています。

### OnGUI(Rect position, SerializedProperty property, GUIContent label)

```csharp
public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
```

ラベルに続けて 3 つの成分トグルを描画し、編集内容をシリアライズプロパティ経由で書き戻します。表示幅がおよそ 332 ピクセルを
下回ると、プレフィックス付きの矩形に収まらないため、トグルはコントロール矩形全体を使います。

## ColorHexDrawer

`io.github.ykysnk.utils.Editor` · `public class ColorHexDrawer : PropertyDrawer`

`ColorHex` を Unity のカラースウォッチとして描画し、選んだ色をシリアライズされた 16 進文字列にも書き戻すので、スウォッチからの編集で
両方のフィールドが同期します。`[CustomPropertyDrawer(typeof(ColorHex))]` で登録されています。

### OnGUI(Rect position, SerializedProperty property, GUIContent label)

```csharp
public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
```

ラベルに続けてカラースウォッチを描画します。変更は `#RRGGBBAA` 形式で `color` と `hex` の子の両方に同時に書き込まれます。
