# BasicEditor

`io.github.ykysnk.utils.Editor` · `public abstract class BasicEditor : UnityEditor.Editor`

描画コードを try/catch の中で実行し、例外が発生したときに一貫したエラー UI を表示するカスタムインスペクターの基底クラスです。IMGUI と UI Toolkit の両方のインスペクターに対応します。

IMGUI のインスペクターでは `OnErrorHandleInspectorGUI` を、UI Toolkit のインスペクターでは `CreateErrorHandleInspectorGUI` をオーバーライドします。どちらの本体もガードされます。`OnInspectorGUI` はシリアライズオブジェクトの更新、変更されたプロパティの適用、変更の通知を引き続き行うため、本体は描画だけを担当します。

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

## ErrorEvent

```csharp
public delegate void ErrorEvent(Exception e, Type type);
```

インスペクター本体から漏れた例外を、それを投げたインスペクター技術とともに受け取ります。`OnErrorEvent` 経由で購読します。

## Type

```csharp
public enum Type
{
    UGUI,
    UIToolkit
}
```

失敗したインスペクター技術。`UGUI` は従来の IMGUI インスペクター、`UIToolkit` は `CreateInspectorGUI` で組み立てる UI Toolkit インスペクターです。

## OnErrorEvent

```csharp
public static event ErrorEvent? OnErrorEvent;
```

例外が捕捉され、エラー UI が描画された後に発生します。報告を行いたいツール向けです。static なので、パッケージのすべてのインスペクターが同じ購読者を共有します。

## OnEnable

```csharp
protected virtual void OnEnable()
```

初期化用の Unity コールバックです。ここをオーバーライドしてエディターを初期化します。本体はガードされないため、ここで投げられた例外はこのクラスでは捕捉されません。

## OnInspectorGUI

```csharp
public override void OnInspectorGUI()
```

シリアライズオブジェクトを更新し、`IsBaseOnOldInspectorGUI` が設定されていれば Unity の既定インスペクターを先に描画してから、`Try.Run` の中で `OnErrorHandleInspectorGUI` を実行します。失敗時は任意でログを出し、`OnError` と `OnErrorEvent` を呼び、IMGUI のエラー UI を描画します。本体が変更を報告した場合は `OnChange` が実行され、その後で変更されたプロパティが適用されます。

## CreateInspectorGUI

```csharp
public override VisualElement? CreateInspectorGUI()
```

`Try.Run` の中で `CreateErrorHandleInspectorGUI` を組み立てます。失敗時は例外を報告し、`BasicEditorErrorUI.uxml` の UI Toolkit エラー UI を返します。これはメッセージ、例外の型、コピーできるスタックトレース、Copy ボタンを表示します。そのアセットを読み込めない場合は `CreateUxmlImportErrorUI()` を返します。

## OnErrorHandleInspectorGUI

```csharp
protected virtual void OnErrorHandleInspectorGUI()
```

IMGUI のインスペクター本体を描画します。`OnInspectorGUI` ではなくこちらをオーバーライドしてください。例外は捕捉され、エラー UI に置き換えられます。

## CreateErrorHandleInspectorGUI

```csharp
protected virtual VisualElement? CreateErrorHandleInspectorGUI()
```

UI Toolkit のインスペクター本体を組み立てます。こちらをオーバーライドしてください。例外は捕捉され、エラー UI に置き換えられます。既定では `null` を返し、その場合は Unity 本来のインスペクターがそのまま残ります。

## OnChange

```csharp
protected virtual void OnChange()
```

インスペクター本体が変更を報告した後、変更されたプロパティを適用する前に呼ばれます。IMGUI でのみ実行されます。UI Toolkit の経路には独自の変更チェックがないためです。

## OnError

```csharp
protected virtual void OnError(Exception e, Type type)
```

インスペクター本体から捕捉されたすべての例外について、エラー UI を描画する前に呼ばれます。独自のログや復旧処理を追加するにはオーバーライドしてください。

## DrawErrorUI

```csharp
protected virtual void DrawErrorUI(Exception e)
```

`BasicEditorErrorUI.uxml` を再現した IMGUI のエラー UI を描画します。`HelpBox` に入ったメッセージだけの行、例外の型と Copy ボタンのあるヘッダー行、そしてスクロール可能で選択できるボックスに入った詳細です。ボックスは内容に応じて伸び、140 ピクセルに達するとスクロールします。Details の折りたたみは展開された状態で始まります。

## IsBaseOnOldInspectorGUI

```csharp
protected virtual bool IsBaseOnOldInspectorGUI { get; }
```

`OnInspectorGUI` がカスタム本体の前に Unity の既定インスペクターを描画するかどうか。既定は false です。

## ConsoleLog

```csharp
protected virtual bool ConsoleLog { get; }
```

捕捉した例外を `Debug.LogException` でコンソールにも書き出すかどうか。既定は false です。どちらの場合もエラー UI は表示されます。

## ErrorTitle

```csharp
protected static string ErrorTitle(Exception e)
```

エラー UI に表示される 1 行のタイトル: `Editor Error: {message}`。

## ErrorDetails

```csharp
protected static string ErrorDetails(Exception e)
```

コピーできるエラーテキスト: メッセージの後に元のスタックトレース。

## CreateUxmlImportErrorUI

```csharp
public static VisualElement CreateUxmlImportErrorUI()
```

`BasicEditorErrorUI.uxml` 自体を読み込めないときに使うエラー UI です。`Failed to load uxml assets, please reimport the package to fix this issue.` というエラーのヘルプボックスになります。

## CreateHelpUI

```csharp
public static VisualElement CreateHelpUI(string message, HelpBoxMessageType type = HelpBoxMessageType.Info)
```

メッセージと指定した種類を持つ `HelpBox` を 1 つだけ含む VisualElement ツリーを組み立てます。

```csharp
var ui = BasicEditor.CreateHelpUI("Nothing to configure yet.");
```

## CreateInfoUI

```csharp
public static VisualElement CreateInfoUI(string errorMessage)
```

情報メッセージを持つ UI Toolkit のヘルプボックスを組み立てます。

## CreateErrorUI

```csharp
public static VisualElement CreateErrorUI(string errorMessage)
```

エラーメッセージを持つ UI Toolkit のヘルプボックスを組み立てます。

## CreateWarningUI

```csharp
public static VisualElement CreateWarningUI(string errorMessage)
```

警告メッセージを持つ UI Toolkit のヘルプボックスを組み立てます。
