# API

このパッケージは 3 つのアセンブリで構成されています。以下に挙げるものはすべて public です。廃止されたメンバーも、まだ
コンパイルできるため含めています。

| アセンブリ | 名前空間 | 内容 |
| --- | --- | --- |
| `io.github.ykysnk.utils` | `io.github.ykysnk.utils` | `Utils`、`IUtilsEditorOnly`、`BasicEditorComponent` |
| `io.github.ykysnk.utils.non-udon` | `io.github.ykysnk.utils.NonUdon` | `BooleanVector3`、`ColorHex` |
| `io.github.ykysnk.utils.Editor` | `io.github.ykysnk.utils.Editor` とそのサブ名前空間 | インスペクターの基底、GUI ヘルパー、メニュー、UPM クライアント、ドロワー |

## Utils

`io.github.ykysnk.utils` · `public static class Utils`

Udon から安全に呼べる小さなヘルパー群です。色付き接頭辞でのログ出力と、いくつかの状態チェックがあります。

接頭辞は `[prefix]` として `#D771C0` で描画されます。ログとアサーションのすべてのメンバーには `[HideInCallstack]` が付いているため、
コンソールの項目はこのファイルではなく呼び出し元を指します。

### Log(string prefix, object message)

```csharp
public static void Log(string prefix, object message)
```

`Debug.Log` で `[prefix] message` を書き出します。`prefix` が色付きの部分で、`message` が null の場合は空の値が記録されます。

```csharp
Utils.Log(nameof(MyWindow), "Opened");
```

### Log(string prefix, object message, Object context)

```csharp
public static void Log(string prefix, object message, UnityEngine.Object context)
```

2 引数のオーバーロードと同じで、コンソールの項目をクリックしたときに `context` がハイライトされます。

### LogWarning(string prefix, object message)

```csharp
public static void LogWarning(string prefix, object message)
```

接頭辞付きのメッセージを `Debug.LogWarning` で書き出します。

### LogWarning(string prefix, object message, Object context)

```csharp
public static void LogWarning(string prefix, object message, UnityEngine.Object context)
```

コンソールの項目をクリックしたときに `context` をハイライトする警告のオーバーロード。

### LogError(string prefix, object message)

```csharp
public static void LogError(string prefix, object message)
```

接頭辞付きのメッセージを `Debug.LogError` で書き出します。

### LogError(string prefix, object message, Object context)

```csharp
public static void LogError(string prefix, object message, UnityEngine.Object context)
```

コンソールの項目をクリックしたときに `context` をハイライトするエラーのオーバーロード。

### LogAssert(bool condition, string prefix, object message)

```csharp
[Obsolete("Use Assert(bool condition, string prefix, object message) instead")]
public static void LogAssert(bool condition, string prefix, object message)
```

互換性のために残されています。接頭辞付きのメッセージで `Debug.Assert` に転送するだけです。代わりに `Assert` を使ってください。

### LogAssert(bool condition, string prefix, object message, Object context)

```csharp
[Obsolete("Use Assert(bool condition, string prefix, object message, Object context) instead")]
public static void LogAssert(bool condition, string prefix, object message, UnityEngine.Object context)
```

互換性のために残されています。代わりに `Assert` を使ってください。

### Assert(bool condition, string prefix, object message)

```csharp
public static void Assert(bool condition, string prefix, object message)
```

`Debug.Assert` で `condition` をアサートし、失敗したときは色付き接頭辞付きでメッセージを報告します。

```csharp
Utils.Assert(path != null, nameof(MyWindow), "Path must be set");
```

### Assert(bool condition, string prefix, object message, Object context)

```csharp
public static void Assert(bool condition, string prefix, object message, UnityEngine.Object context)
```

3 引数のオーバーロードと同じで、コンソールの項目をクリックしたときに `context` がハイライトされます。

### IsMoved(float value)

```csharp
public static bool IsMoved(float value)
```

1 フレームの差分が移動とみなされるかどうか: `value < -0.05f || value > 0.05f`。しきい値は厳密なので、ちょうど `0.05f` の差分は
移動になりません。

### IsInPrefab2()

```csharp
public static bool IsInPrefab2()
```

エディタがプレハブ編集モードかどうか。プレイヤーでは常に false です。Udon 内で安全に使える名前です。

### IsPlaying2()

```csharp
public static bool IsPlaying2()
```

プレイモードが有効、または開始しようとしているかどうか。プレイヤーでは常に true です。Udon 内で安全に使える名前です。

### IsInPrefab

```csharp
public static bool IsInPrefab { get; }
```

`IsInPrefab2` のプロパティ版。`PrefabStageUtility` に依存するため、`COMPILER_UDONSHARP` が定義されているときはコンパイルされません。

### IsPlaying

```csharp
public static bool IsPlaying { get; }
```

`IsPlaying2` のプロパティ版。`EditorApplication` に依存するため、`COMPILER_UDONSHARP` が定義されているときはコンパイルされません。

### ToLayer(LayerMask mask)

```csharp
public static int ToLayer(LayerMask mask)
```

1 レイヤーだけのマスクのレイヤーインデックス、つまり最も上位に立っているビットの位置を返します。マスクが 0 の場合は 31 を返します
（ビット走査の結果）。

```csharp
var layer = Utils.ToLayer(LayerMask.GetMask("Water"));
```

## IUtilsEditorOnly

`io.github.ykysnk.utils` · `public interface IUtilsEditorOnly`

ビルドから取り除くべき Behaviour のためのマーカーインターフェースです。メンバーは宣言しません。`UTILS_NDMF` が定義されている
ときは `nadena.dev.ndmf.INDMFEditorOnly` を、`UTILS_VRC_SDK3_BASE` が定義されているときは `VRC.SDKBase.IEditorOnly` を継承し、
それ以外では空のマーカーになります。

## BasicEditorComponent

`io.github.ykysnk.utils` · `public abstract class BasicEditorComponent : MonoBehaviour, IUtilsEditorOnly`

アップロードするアバターやワールドに残してはいけないヘルパー Behaviour 用の空の基底クラスです。独自のメンバーは追加しません。
これを継承すると、ビルドパイプラインが `IUtilsEditorOnly` 経由でコンポーネントを取り除きます。

## BooleanVector3

`io.github.ykysnk.utils.NonUdon` · `public struct BooleanVector3 : IEquatable<BooleanVector3>`

3 つの独立した bool 値を、そのままシリアライズ可能なフィールドとして保持します。スイッチのような判定のために、それらを 1 つの
ビットマスクにまとめる `Flags` ビューも提供します。

### x, y, z

```csharp
public bool x;
public bool y;
public bool z;
```

X、Y、Z 成分が設定されているかどうか。

### Flags

```csharp
public int Flags { get; set; }
```

3 つの成分を `Flag` 値のマスクとして表したもの。マスクを代入すると 3 成分すべてが上書きされるため、マスクに含まれない成分は
クリアされます。`Flag.All` の外のビットは代入時に破棄されます。

### Flag

```csharp
public enum Flag
{
    X = 1 << 0,
    Y = 1 << 1,
    Z = 1 << 2,
    None = 0,
    All = X | Y | Z
}
```

1 つの成分、またはその組み合わせを選ぶビットセレクター。

### HasFlag(Flag flag)

```csharp
public bool HasFlag(Flag flag)
```

`flag` のすべてのビットが現在立っているかどうか。`Flag.None` は常に一致します。

### HasFlags(params Flag[] flags)

```csharp
public bool HasFlags(params Flag[] flags)
```

`flags` が対象とするすべてのビットが立っているかどうか。空の配列はすべてに一致します。

### AddFlag(Flag flag)

```csharp
public void AddFlag(Flag flag)
```

`flag` のビットを立て、他の成分は変更しません。

### AddFlags(params Flag[] flags)

```csharp
public void AddFlags(params Flag[] flags)
```

`flags` が対象とするビットを立て、他の成分は変更しません。空の配列は何も変更しません。

### RemoveFlag(Flag flag)

```csharp
public void RemoveFlag(Flag flag)
```

`flag` のビットをクリアし、他の成分は変更しません。

### RemoveFlags(params Flag[] flags)

```csharp
public void RemoveFlags(params Flag[] flags)
```

`flags` が対象とするビットをクリアし、他の成分は変更しません。空の配列は何も変更しません。

### SetFlag(Flag flag)

```csharp
public void SetFlag(Flag flag)
```

マスク全体を `flag` で置き換えるため、含まれない成分はクリアされます。

### SetFlags(params Flag[] flags)

```csharp
public void SetFlags(params Flag[] flags)
```

マスク全体を `flags` の和集合で置き換えます。空の配列は 3 成分すべてをクリアします。

### Set(bool x2, bool y2, bool z2)

```csharp
public void Set(bool x2, bool y2, bool z2)
```

3 成分を 1 回の呼び出しで代入します。

### Set(BooleanVector3 other)

```csharp
public void Set(BooleanVector3 other)
```

3 成分をすべて `other` からコピーします。

### SetAll(bool value)

```csharp
public void SetAll(bool value)
```

X、Y、Z に同じ値を代入します。

### Invert()

```csharp
public void Invert()
```

すべての成分をその場で反転します。

### SetX(bool value), SetY(bool value), SetZ(bool value)

```csharp
public void SetX(bool value)
public void SetY(bool value)
public void SetZ(bool value)
```

1 つの成分を代入します。

### SetTrue(), SetFalse()

```csharp
public void SetTrue()
public void SetFalse()
```

`SetAll(true)` と `SetAll(false)`。

### True, False

```csharp
public static BooleanVector3 True { get; }
public static BooleanVector3 False { get; }
```

3 成分すべてが設定された、またはすべてクリアされた新しいベクター。

### ToString()

```csharp
public override string ToString()
```

`BooleanVector3(x:…,y:…,z:…)` として描画します。

### operator !(BooleanVector3)

```csharp
public static BooleanVector3 operator !(BooleanVector3 booleanVector3)
```

反転したコピーを返します。オペランドは値渡しで、変更されません。

### operator true, operator false

```csharp
public static bool operator true(BooleanVector3 booleanVector3)
public static bool operator false(BooleanVector3 booleanVector3)
```

3 成分すべてが設定されているときだけ `true` になるので、`if (vector)` は 3 方向の AND です。少なくとも 1 つの成分がクリアされて
いれば `false` です。`&&` と `||` のために、コンパイラが `operator true` と併せて要求します。

### Equals(BooleanVector3), Equals(object), GetHashCode()

```csharp
public bool Equals(BooleanVector3 other)
public override bool Equals(object? obj)
public override int GetHashCode()
```

成分ごとの等値判定と、3 つのフィールドから作るハッシュコード。

## ColorHex

`io.github.ykysnk.utils.NonUdon` · `public struct ColorHex`

`Color` とその HTML 16 進表記をまとめて持つので、色をテキストとしてシリアライズしたりインスペクトしたりできます。両方の
フィールドを同時に更新するのは演算子だけです。片方のフィールドを直接代入しても、もう片方は変わりません。既定値で初期化した
構造体は、`hex` が null のとき `color` からテキストを導出します。

### color

```csharp
public Color color;
```

`hex` が表す色の値。

### hex

```csharp
public string hex;
```

`#RRGGBBAA` 形式の色（先頭の `#` を含む）。フィールドからそのまま読むため、既定値で初期化した構造体では null になり得ます。
その場合、変換は `color` にフォールバックします。

### ToString()

```csharp
public override string ToString()
```

両方のフィールドを `Color: …, Hex: …` として描画します。`hex` が null のときは `color` から 16 進表記を導出します。

### implicit operator string(ColorHex)

```csharp
public static implicit operator string(ColorHex colorHex)
```

16 進表記のテキストを返すので、色文字列が期待される場所でこの構造体を使えます。null にはなりません。

### implicit operator Color(ColorHex)

```csharp
public static implicit operator Color(ColorHex colorHex)
```

`color` を返すので、そのまま色として使えます。

### implicit operator ColorHex(string)

```csharp
public static implicit operator ColorHex(string hex)
```

HTML の色文字列を解析します。`ColorUtility.TryParseHtmlString` が拒否するテキストはエラーではなく白になります。`hex` は解析後の
色から書き直されるため、保存されるテキストはそのままではなく正規化されます。

### implicit operator ColorHex(Color)

```csharp
public static implicit operator ColorHex(Color color)
```

色をラップし、その `#RRGGBBAA` テキストを導出します。

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

シリアライズオブジェクトを更新し、`IsBaseOnOldInspectorGUI` が設定されていれば基底のインスペクターを描画し、その後 `Try.Run` の
中で `OnErrorHandleInspectorGUI` を実行します。失敗時は任意でログを出し、`OnError` と `OnErrorEvent` を呼び、IMGUI のエラー UI を
描画します。本体が変更を報告した場合は、変更されたプロパティを適用する前に `OnChange` が実行されます。

### CreateInspectorGUI()

```csharp
public override VisualElement? CreateInspectorGUI()
```

`Try.Run` の中で `CreateErrorHandleInspectorGUI` を組み立てます。失敗時は例外を報告し、`BasicEditorErrorUI.uxml` の UI Toolkit
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

IMGUI のインスペクター本体を描画します。`OnInspectorGUI` ではなくこちらをオーバーライドしてください。例外は捕捉され、エラー UI に
置き換えられます。

### CreateErrorHandleInspectorGUI()

```csharp
protected virtual VisualElement? CreateErrorHandleInspectorGUI()
```

UI Toolkit のインスペクター本体を組み立てます。こちらをオーバーライドしてください。例外は捕捉され、エラー UI に置き換えられます。

## EditorGUILayoutUtility

`io.github.ykysnk.utils.Editor` · `public static class EditorGUILayoutUtility`

パッケージのインスペクターが共有する、キャッシュされたラベルスタイルとレイアウトのヘルパーです。

### BoldLabel

```csharp
public static GUIStyle BoldLabel { get; }
```

セクション見出し用の 15pt の太字ラベル。初回アクセス時に作成されるため、その時点で有効だったエディタスキンを保持します。

### BoldLabel2

```csharp
public static GUIStyle BoldLabel2 { get; }
```

`BoldLabel` の下の小見出し用の、12pt の小さめの太字ラベル。

### Label(string text, string? textTip = null)

```csharp
public static GUIContent Label(string text, string? textTip = null)
```

テキストと任意のツールチップからラベルのコンテンツを作成します。結果は任意の `EditorGUILayout` コントロールに渡せます。

### Line(Color color, float space = 20f, float lineHeight = 1f)

```csharp
public static void Line(Color color, float space = 20f, float lineHeight = 1f)
```

`color` の水平線を描画します。`space` の半分を上に、半分を下に取るため、垂直方向の合計は常に `space` になります。`lineHeight` は
線の高さ（ピクセル）です。

### Line(float space = 20f, float lineHeight = 1f)

```csharp
public static void Line(float space = 20f, float lineHeight = 1f)
```

灰色の区切り線を描画します。ほとんどのインスペクターが使うショートカットです。

```csharp
EditorGUILayoutUtility.Line();
```

## EditorGUILayoutUtilityExtensions

`io.github.ykysnk.utils.Editor` · `public static class EditorGUILayoutUtilityExtensions`

文字列からラベルのコンテンツを作れるようにし、`EditorGUILayoutUtility.Label` を明示しなくてもツールチップを付けられます。

### Label(this string text, string? textTip = null)

```csharp
public static GUIContent Label(this string text, string? textTip = null)
```

このテキストのラベルのコンテンツを、任意のツールチップ付きで作成します。

```csharp
EditorGUILayout.LabelField("Strength".Label("Damage multiplier"));
```

## EditorGUIUtils

`io.github.ykysnk.utils.Editor` · `public static class EditorGUIUtils`

有効なエディタスキンに合わせたエディタのコンテンツとアイコンを組み立てるので、カスタムインスペクターでも組み込みと同じアイコンが
表示されます。

### IconContent(string name)

```csharp
public static GUIContent IconContent(string name)
```

組み込みのエディタアイコンを名前で読み込みます。ダークスキンでは名前に `d_` を付けます。Unity がダーク用の明るいバリアントを
そこに置いているためです。名前が解決できない場合、コンテンツの画像は null です。

### IconContent(string text, string name)

```csharp
public static GUIContent IconContent(string text, string name)
```

組み込みのエディタアイコンの隣に `text` を表示するラベルコンテンツを作成します。

### IconTexture(string name)

```csharp
public static Texture IconTexture(string name)
```

組み込みのエディタアイコンのテクスチャだけを返します。名前が解決できない場合は null。

## EditorUtils

`io.github.ykysnk.utils.Editor` · `public static class EditorUtils`

`CustomDialogWindow` を包むメッセージダイアログのヘルパーです。

### DisplayDialogAsync(string title, string message, string ok = "OK", string cancel = "", int waitTime = 0)

```csharp
public static Task<bool> DisplayDialogAsync(string title, string message,
    string ok = "OK", string cancel = "", int waitTime = 0)
```

ダイアログを表示し、Ok が押されたら true、Cancel が押された場合や選択せずにウィンドウが閉じられた場合に false で完了するタスクを
返します。`waitTime` は Ok ボタンが無効のままになる秒数で、0 にすると遅延なしになります。

```csharp
var confirmed = await EditorUtils.DisplayDialogAsync("Delete", "Remove the folder?", "Delete", "Cancel");
```

### DisplayDialog(string title, string message, string ok = "OK", string cancel = "", Action? onOk = null, Action? onCancel = null, int waitTime = 0)

```csharp
public static void DisplayDialog(string title, string message, string ok = "OK", string cancel = "",
    Action? onOk = null, Action? onCancel = null, int waitTime = 0)
```

ダイアログを表示し、タスクではなくコールバックで答えを報告します。ボタンを押さずにウィンドウを閉じた場合はキャンセルとみなされます。
`cancel` が空の場合は Cancel ボタンが表示されません。

## EditorTask

`io.github.ykysnk.utils.Editor` · `public static class EditorTask`

.NET のタスクをエディタループに適合させます。返されるタスクは `EditorApplication.update` から完了するため、await すると
UnityEditor API が使えるメインスレッドで再開します。

### Run(Task task)

```csharp
public static Task Run(Task task)
```

エディタループが `task` の完了を確認した後に完了するタスクを返します。Fault と Cancel の状態は例外として投げずに転送されるため、
扱い方は呼び出し側が決めます。結果は破棄されます。

```csharp
await EditorTask.Run(File.WriteAllTextAsync(path, text));
```

### Run<T>(Task<T> task)

```csharp
public static Task<T> Run<T>(Task<T> task)
```

非ジェネリックのオーバーロードと同じですが、`task` の結果を返されるタスクへ引き継ぎます。

## CustomDialogWindow

`io.github.ykysnk.utils.Editor` · `public class CustomDialogWindow : EditorWindow`

メッセージ、Ok ボタン、任意の Cancel ボタンを持つフローティングのユーティリティウィンドウで、`EditorUtils` が使います。モーダルでは
ありません。ウィンドウはコールバックで結果を報告して自身を閉じ、テキストはコンテキストメニューからコピーできます。

ウィンドウは 500×250 に固定され、メインのエディタウィンドウの中央に `ShowUtility` で表示されます。まだ開いているダイアログは先に
閉じられ、その保留中の結果はキャンセルとして報告されます。ボタンを押さずにウィンドウを閉じた場合もキャンセルです。`waitTime` を
設定すると、Ok のキャプションがカウントダウンし、0 になるまでボタンは無効のままです。

このクラスが宣言するメンバーはすべて private か internal なので、ダイアログは `EditorUtils.DisplayDialog` または
`EditorUtils.DisplayDialogAsync` から作成し、ウィンドウの引数をそのまま渡します。

## MenuItemObject

`io.github.ykysnk.utils.Editor` · `public class MenuItemObject`

`MenuExtensions` が登録を維持するメニュー項目の記述です。パス、ショートカット、チェック状態、並び順の優先度、そして Unity が
必要とするコールバックを持ちます。

### MenuItemObject(string name, string shortcut, bool @checked, int priority, Action execute, Func<bool>? validate)

```csharp
public MenuItemObject(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
```

メニュー項目の完全な記述を作成します。`name` はメニューパスで、Unity が属性で宣言されたパスをサニタイズするのと同じ方法で
サニタイズされるため、どちらの種類の項目も同じパスの下に並びます。`validate` は項目を有効にするかを決め、null は常に有効を
意味します。

### MenuItemObject(string name, string shortcut, int priority, Action execute)

```csharp
public MenuItemObject(string name, string shortcut, int priority, Action execute)
```

チェックなしで、検証コールバックのないメニュー項目を作成します。

### MenuItemObject(string name, int priority, Action execute)

```csharp
public MenuItemObject(string name, int priority, Action execute)
```

チェックなしで、ショートカットも検証コールバックもないメニュー項目を作成します。

### MenuItemObject(string name, Action execute)

```csharp
public MenuItemObject(string name, Action execute)
```

その種類の既定の優先度でメニュー項目を作成します。`GameObject/Create Other` の下では 10、それ以外では 1000 で、Unity 自身の
並び順に合わせています。

### Name

```csharp
public string Name { get; private set; }
```

サニタイズ後のメニューパス。項目を追跡するキーになります。

### Shortcut

```csharp
public string Shortcut { get; private set; }
```

Unity に渡すショートカット文字列（例: `#%g`）。ない場合は空です。

### Checked

```csharp
public bool Checked { get; private set; }
```

Unity が項目をチェックマーク付きで描画するかどうか。

### Priority

```csharp
public int Priority { get; private set; }
```

サブメニュー内の並び順。値が小さいほど先に描画されます。

### Execute

```csharp
public Action Execute { get; private set; }
```

項目が選ばれたときに実行されるアクション。

### Validate

```csharp
public Func<bool>? Validate { get; private set; }
```

項目を有効にするかを決める述語。常に有効な場合は null。

## MenuWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuWrap`

エディタのメニューバーを支えるクラス `UnityEditor.Menu` の内部部分へのリフレクションラッパーです。それらのメンバーは文書化されて
いないエディタ内部実装であり公開 API ではないため、Unity はどのバージョンでも名前を変えたり削除したりできます。このラッパーが
あることで、実行時にメニュー項目を追加、変更、削除できます。

### SetHotkey(string menuPath, string hotkey)

```csharp
public static void SetHotkey(string menuPath, string hotkey)
```

既存のメニュー項目の隣に表示されるショートカットを代入します。

### ExtractSubmenus(string menuPath)

```csharp
public static string[] ExtractSubmenus(string menuPath)
```

指定したパスの下に存在するサブメニューを一覧します。ない場合は空です。

### AddMenuItem(string name, string shortcut, bool @checked, int priority, Action execute, Func<bool>? validate)

```csharp
public static void AddMenuItem(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
```

`MenuItem` 属性なしでメニュー項目を実行時に登録します。

### AddSeparator(string name, int priority)

```csharp
public static void AddSeparator(string name, int priority)
```

指定したパスと優先度に区切り線の項目を追加します。

### RemoveMenuItem(string name)

```csharp
public static void RemoveMenuItem(string name)
```

指定したパスで登録されたメニュー項目を削除します。

### RebuildAllMenus()

```csharp
public static void RebuildAllMenus()
```

登録済みの項目からメニューバー全体を再構築します。

### MenuItemExists(string menuPath)

```csharp
public static bool MenuItemExists(string menuPath)
```

指定したパスにメニュー項目が現在登録されているかどうか。

## MenuServiceWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuServiceWrap`

内部クラス `UnityEditor.MenuService` へのリフレクションラッパーです。これらのメンバーは公開 API ではないため、Unity はどの
バージョンでも名前を変えたり削除したりできます。

### SanitizeMenuItemName(string menuName)

```csharp
public static string SanitizeMenuItemName(string menuName)
```

Unity 自身のメニューパスの後処理を実行するので、実行時に追加したパスは、Unity が `MenuItem` 属性から登録するのとまったく同じように
登録されます。Unity が項目を登録するパスを返します。

### ValidateMethodForMenuCommand(MethodInfo methodInfo)

```csharp
public static bool ValidateMethodForMenuCommand(MethodInfo methodInfo)
```

メソッドがメニューコマンドとして使えるかを、Unity が `MenuItem` メソッドに適用するのと同じ規則で問い合わせます。

## EditorUtilityWrap

`io.github.ykysnk.utils.Editor` · `public static class EditorUtilityWrap`

`EditorUtility` の内部部分へのリフレクションラッパーです。そのメンバーは公開 API ではないため、Unity はどのバージョンでも名前を
変えたり削除したりできます。

### Internal_UpdateAllMenus

```csharp
public static readonly WrapAction Internal_UpdateAllMenus;
```

内部メソッド `EditorUtility.Internal_UpdateAllMenus`。Unity にメニューを再構築させます。実行時にメニュー項目を追加した後に必要です。

## MenuExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class MenuExtensions`

エディタがメニューを再構築する間も、実行時に追加されたメニュー項目の登録を維持します。ヒエラルキーが変わると、失われた項目が
`MenuWrap` 経由で追加し直され、その後 `EditorUtilityWrap.Internal_UpdateAllMenus` が実行されます。

### AddMenuItem(MenuItemObject menuItemObject)

```csharp
public static bool AddMenuItem(MenuItemObject menuItemObject)
```

メニューの再構築をまたいでメニュー項目の登録を維持します。同じパスのメニュー項目がすでに登録されている場合は false を返します。

```csharp
MenuExtensions.AddMenuItem(new MenuItemObject("Tools/My Tool/Do Something", "#%g", 1000, DoSomething));
```

### RemoveMenuItem(string name)

```csharp
public static MenuItemObject? RemoveMenuItem(string name)
```

指定したパスのメニュー項目の登録維持をやめ、その項目を返します。メニューの項目自体は削除されません。再構築後に再追加されない
ようにするだけです。

## RequestExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class RequestExtensions`

パッケージマネージャーのリクエストを、エディタループ上で完了するタスクに変換するので、await するコードはメインスレッドに
留まれます。

### AsTask<T>(this T request)

```csharp
public static Task<T> AsTask<T>(this T request) where T : Request
```

パッケージマネージャーのリクエストを await します。リクエストは `EditorApplication.update` からポーリングされ、タスクは後で
`EditorApplication.delayCall` から完了するため、await の継続は浅いコールスタックでメインスレッド上に再開します。具体的な
リクエスト型が保持されるので、呼び出し側はその `Result` を読めます。

### AsTask<T>(this T request, CancellationToken token)

```csharp
public static Task<T> AsTask<T>(this T request, CancellationToken token) where T : Request
```

引数なしのオーバーロードと同じですが、トークンがキャンセルされたときに待機を止めます。リクエスト自体はキャンセルされず、
監視が止まるだけです。

## TaskExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class TaskExtensions`

`EditorApplication.update` からタスクをポーリングし、結果をコールバックで報告します。await できない呼び出し元（インスペクターや
メニューのコードなど）向けです。

### WaitEditor(this Task task, Action onCompleted, Action<Exception>? onError = null)

```csharp
public static void WaitEditor(this Task task, Action onCompleted, Action<Exception>? onError = null)
```

タスクが終わったらエディタループ上で `onCompleted` を呼びます。失敗したタスクは実際に投げた例外で（集約ラッパーは外されます）、
キャンセルされたタスクは `TaskCanceledException` で `onError` を呼びます。`onError` が null の場合、失敗は黙って無視されます。

### WaitEditor<T>(this Task<T> task, Action<T> onCompleted, Action<Exception>? onError = null)

```csharp
public static void WaitEditor<T>(this Task<T> task, Action<T> onCompleted, Action<Exception>? onError = null)
```

非ジェネリックのオーバーロードと同じですが、タスクの結果を `onCompleted` に渡します。

## UpmInstaller

`io.github.ykysnk.utils.Editor` · `public static class UpmInstaller`

エディタコードから Unity Package Manager のパッケージをインストール、削除、更新します。各操作はキャンセルボタン付きの固定
プログレスバーを表示し、ボタンで停止できます（その瞬間にエディタがコンパイル中または更新中の場合を除く）。インストール、削除、
アップグレードは 1 つのロックを共有するため、同時に実行されるのは 1 つだけです。2 回目の呼び出しは何もせずに戻ります。

### Install(string[] packages)

```csharp
public static void Install(string[] packages)
```

指定したパッケージのインストールを開始し、すぐに戻ります。要素は `name` または `name@version` です。

```csharp
UpmInstaller.Install(new[] { "io.github.ykysnk.localization@0.11.0" });
```

### InstallAsync(string[] packages)

```csharp
public static Task InstallAsync(string[] packages)
```

指定したパッケージをインストールし、すべての処理が終わったときに完了します。

### InstallAsync(string[] packages, CancellationToken token)

```csharp
public static Task InstallAsync(string[] packages, CancellationToken token)
```

指定したパッケージをインストールします。要求されたバージョンですでにインストール済みの要素はスキップされ、失敗した要素はログに
記録されて残りは引き続き処理されます。`token` をキャンセルすると例外を投げずに操作が止まり、プログレスバーはキャンセルとして
閉じます。

### Remove(string[] packages)

```csharp
public static void Remove(string[] packages)
```

指定したパッケージの削除を開始し、すぐに戻ります。

### RemoveAsync(string[] packages)

```csharp
public static Task RemoveAsync(string[] packages)
```

指定したパッケージを削除し、すべての処理が終わったときに完了します。

### RemoveAsync(string[] packages, CancellationToken token)

```csharp
public static Task RemoveAsync(string[] packages, CancellationToken token)
```

指定したパッケージを削除します。失敗したパッケージはログに記録され、残りは引き続き処理されます。`token` をキャンセルすると
例外を投げずに操作が止まります。

### UpdateAsync()

```csharp
public static Task<string[]> UpdateAsync()
```

インストール済みの各パッケージをレジストリと照合し、バージョンが異なるものを一覧します。`name@version` 形式の要素を返し、
古いものがなければ空です。

### UpdateAsync(CancellationToken token)

```csharp
public static Task<string[]> UpdateAsync(CancellationToken token)
```

引数なしのオーバーロードと同じです。トークンはパッケージの合間にチェックを止め、進行中のリクエストは中断されません。失敗前に
見つかった要素はそのまま返されます。

### Upgrade()

```csharp
public static void Upgrade()
```

更新を確認してインストールを開始し、すぐに戻ります。

### UpgradeAsync()

```csharp
public static Task UpgradeAsync()
```

更新を確認してインストールします。すべてのパッケージが最新の場合は何もしません。

### UpgradeAsync(CancellationToken token)

```csharp
public static Task UpgradeAsync(CancellationToken token)
```

更新を確認してインストールします。すべてのパッケージが最新の場合、またはインストールや削除がすでに実行中の場合は何もしません。
トークンは例外を投げずに更新確認または続くインストールを止めます。

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

## ReflectionUtils

`io.github.ykysnk.utils.NonUdon` · `public static class ReflectionUtils`

例外の代わりに警告をログに出すリフレクションヘルパーです。見つからないメンバーは `null` / `default` を返すので、
オプション依存の存在確認にそのまま使えます。

### Instantiate<T>(Type type)

```csharp
public static T? Instantiate<T>(Type type)
```

パラメーターなしのコンストラクターでインスタンスを作り、`T` にキャストします。失敗は警告としてログに残り、
`default` を返します。

### GetNestedMethods(Type? type)

```csharp
public static IEnumerable<MethodInfo> GetNestedMethods(Type? type)
```

`type` のネスト型が宣言しているメソッドを、public かどうかを問わず遅延列挙します。列挙できないネスト型は
スキップされます。

### GetNestedMethod(Type? type, string name, string? searchName = null)

```csharp
public static MethodInfo? GetNestedMethod(Type? type, string name, string? searchName = null)
```

名前が `searchName` を含む最初のネストメソッドを返します。既定値は `<name>` で、`name` というメンバーの
ラムダ・async 本体・ローカル関数に対してコンパイラーが付ける名前です。

### FindType(string? typeName)

```csharp
public static Type? FindType(string? typeName)
```

読み込まれているアセンブリから完全名（またはアセンブリ修飾名）を解決します。見つからなければ `null` です。

### FindMethod(Type? type, string name)

```csharp
public static MethodInfo? FindMethod(Type? type, string name)
```

その名前の最初のメソッドを返します。public かどうか、static かどうか、宣言か継承かを問いません。無ければ
`null` です。名前だけで照合するため、オーバーロードがあると最初に見つかったものを返します。

### FindProperty(Type? type, string name)

```csharp
public static PropertyInfo? FindProperty(Type? type, string name)
```

その名前のプロパティを返します。public かどうかは問いません。無ければ `null` です。

### GetDeclaredMethods(Type? type)

```csharp
public static IEnumerable<MethodInfo> GetDeclaredMethods(Type? type)
```

その型自身が宣言しているメソッド（ネスト型のものは含みません）を、public かどうかを問わず返します。

## 型インデックス

上のページに含まれない公開型を、名前空間ごとにまとめたものです。目的のテキストは各型自身の概要から取っています。

### io.github.ykysnk.utils.Extensions

| 型 | 目的 |
| --- | --- |
| `ComponentExtensions` | GameObject と Transform のヘルパーのコンポーネント版。 |
| `DictionaryExtensions` | キーがない場合を既定値として扱う辞書の読み取り。 |
| `FloatExtensions` | `float` のノイズ除去、許容誤差の判定、クランプ、丸め。 |
| `GameObjectExtensions` | ヒエラルキーのパス、距離判定、インデックスによるコンポーネントアクセス。 |
| `ListExtensions` | 境界チェック付きのインデックスアクセスと、リストや配列をその場で編集するヘルパー。 |
| `StringExtensions` | `"Folder/Name/Extension"` のような区切り文字付き文字列の切り出しヘルパー。 |
| `Texture2DExtensions` | テクスチャの GPU リサイズとアルファのトリミング。 |
| `TransformExtensions` | ヒエラルキー名、ワールド/ローカルスケールの変換、非スケールの座標変換、距離判定。 |
| `Vector3Extensions` | `Vector3` の距離、成分ごとの演算、クランプ、丸め、方向のヘルパー。 |

### io.github.ykysnk.utils.NonUdon

| 型 | 目的 |
| --- | --- |
| `DictionaryWrapper<TKey, TValue>` | Unity のシリアライズのために、辞書形式のデータを 2 つの並列リストとして保存するもの。 |
| `HashUtils`, `HashType` | 小文字の 16 進ダイジェストによるテキストのハッシュ。 |
| `JsonUtils` | 例外を投げたり null を返したりする代わりに失敗を報告する `JsonUtility` のラッパー。 |
| `ListWrapper<T>` | 1 つのシリアライズフィールドの背後にあるリスト。インターフェース型のメンバーを保存できる。 |
| `ReflectionUtils`, `ReflectionWrapper`, `Reflect` | キャッシュされたリフレクション検索、コンパイル済みデリゲート、連鎖可能なメンバーアクセス。 |
| `ReflectionAccess`, `FieldAccess`, `PropertyAccess`, `MethodAccess` | `Reflect` を支えるアクセサ型。 |
| `Result<T>`, `ResultExtensions`, `Try`, `Unit` | 失敗を持ち運ぶ結果、連鎖のヘルパー、例外を使わない実行。 |
| `Wrapper` | `ListWrapper<T>` と `DictionaryWrapper<TKey, TValue>` の入口。 |
| `ILogger`, `Logger<T>` | パッケージが前提とするログの表面と、その型ごとの実装。 |
| `FieldGetter<T>`, `FieldSetter<T>`, `PropertyGetter<T>`, `PropertySetter<T>`, `WrapAction`, `WrapFunc` | リフレクションラッパーが使うデリゲート。 |

### io.github.ykysnk.utils.Editor.Patches

| 型 | 目的 |
| --- | --- |
| `IPatch`, `Patch<T>` | ひとまとまりとして適用されるパッチのグループ。サブクラスが入れ子のパッチメソッドのコンテナになる。 |
| `IPatchLoader`, `PatchLoader<T>` | 1 つのアセンブリの入口。Harmony インスタンスを受け取り、パッチグループを実行する。 |
| `IPatchMethod`, `PatchMethod<T>` | 1 つの Harmony パッチセット: 対象メソッドと prefix、postfix、transpiler、finalizer。 |
| `IReversePatchMethod`, `ReversePatchMethod<T>` | スタブが別メソッド本体の呼び出し可能なコピーを受け取るリバースパッチ。 |
| `ExportsPatchLoader` | エディタの読み込み時に実行するパッチローダー型を宣言するアセンブリ属性。 |

### io.github.ykysnk.utils.Editor.HarmonyUtilities

| 型 | 目的 |
| --- | --- |
| `CodeCursor` | transpiler の命令列を流し読みするカーソル。現在、次、履歴にアクセスできる。 |
| `TranspilerExtensions` | `WithContext` を通して、各命令をその前後と一緒に列挙する。 |

### io.github.ykysnk.utils.Editor.UIElements

| 型 | 目的 |
| --- | --- |
| `BooleanVector3Field` | `BooleanVector3` を 3 つのトグルとして編集する UI Toolkit フィールド。UXML から作成できる。 |
