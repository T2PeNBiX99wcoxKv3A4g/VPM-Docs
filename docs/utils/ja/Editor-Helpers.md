# エディタヘルパー

## BasicEditor

`BasicEditor` は、ここにあるすべてのパッケージが使うインスペクターの基底クラスです。UI Toolkit または IMGUI の本体を
`try`/`catch` で包み、例外を報告して、壊れたインスペクターを残す代わりに統一されたエラー表示を描画します。

```csharp
using io.github.ykysnk.utils.Editor;

[CustomEditor(typeof(MyBehaviour))]
public class MyBehaviourEditor : BasicEditor
{
    protected override VisualElement? CreateErrorHandleInspectorGUI()
    {
        var tree = uxml.CloneTree();
        tree.Bind(serializedObject);
        return tree;
    }
}
```

UI Toolkit では `CreateErrorHandleInspectorGUI` を、IMGUI では `OnErrorHandleInspectorGUI` をオーバーライドします。
`OnError` と `OnChange` は、ログと、本体が成功した後の変更適用のためのフックです。

## GUI ヘルパー

| ヘルパー                           | 用途                                                                                     |
|------------------------------------|------------------------------------------------------------------------------------------|
| `EditorGUILayoutUtility`           | ウィンドウが使う小さなレイアウトヘルパー（行、区切り、ラベル付きフィールド）。           |
| `EditorGUILayoutUtilityExtensions` | 同じヘルパーの拡張メソッド版。                                                           |
| `EditorGUIUtils`                   | アイコン、ヘルプボックス、ウィンドウタイトルが使う `IconContent` ヘルパー。              |
| `EditorUtils`                      | ウィンドウ間で共有するアセットと選択のヘルパー。                                         |
| `CustomDialogWindow`               | カスタムエディタを必要としない小さなモーダルプロンプト（タイトル、メッセージ、ボタン）。 |
| `EditorTask`                       | 非同期のエディタタスクを実行し、進捗と失敗を 1 か所で報告します。                        |

## ドロワー

| ドロワー               | 描画内容                                                      |
|------------------------|---------------------------------------------------------------|
| `BooleanVector3Drawer` | 軸ごとにオン/オフのトグルを持つ `Vector3`。軸単位の設定向け。 |
| `ColorHexDrawer`       | `#RRGGBB` の値を隣に表示するカラーフィールド。                |

どちらも該当する型のフィールドで自動的に使われ、ラッパー型では `[CustomPropertyDrawer]` 経由でも使われます。

## メニュー

`MenuItemObject`、`MenuWrap`、`MenuServiceWrap` は `Tools/...`、`GameObject/...`、`Assets/...`
の項目を、検証関数と統一された優先度付きで組み立てます。パッケージのメニューパスを 1 か所にまとめておけます。

## UPM クライアント

`UpmInstaller` は YKY Toolkit のインストーラーウィンドウの背後にある UPM ラッパーです。

```csharp
UpmInstaller.Install("io.github.ykysnk.localization");
UpmInstaller.Remove("io.github.ykysnk.localization@0.11.0");
UpmInstaller.UpdateAsync().WaitEditor(packages => { /* installed versions */ });
```

`UnityEditor.PackageManager.Client` と通信し、進捗はエディタタスクのヘルパー経由で報告します。
