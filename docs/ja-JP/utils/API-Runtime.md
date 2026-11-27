# ランタイム

このパッケージは 3 つのアセンブリで構成されています。以下に挙げるものはすべて public です。廃止されたメンバーも、まだ
コンパイルできるため含めています。

| アセンブリ                        | 名前空間                                           | 内容                                                                     |
|-----------------------------------|----------------------------------------------------|--------------------------------------------------------------------------|
| `io.github.ykysnk.utils`          | `io.github.ykysnk.utils`                           | `Utils`、`IUtilsEditorOnly`、`BasicEditorComponent`                      |
| `io.github.ykysnk.utils.non-udon` | `io.github.ykysnk.utils.NonUdon`                   | `BooleanVector3`、`ColorHex`                                             |
| `io.github.ykysnk.utils.Editor`   | `io.github.ykysnk.utils.Editor` とそのサブ名前空間 | インスペクターの基底、GUI ヘルパー、メニュー、UPM クライアント、ドロワー |

## Utils

`io.github.ykysnk.utils` · `public static class Utils`

Udon から安全に呼べる小さなヘルパー群です。色付き接頭辞でのログ出力と、いくつかの状態チェックがあります。

接頭辞は `[prefix]` として `#D771C0` で描画されます。ログとアサーションのすべてのメンバーには `[HideInCallstack]`
が付いているため、
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

1 レイヤーだけのマスクのレイヤーインデックス、つまり最も上位に立っているビットの位置を返します。マスクが 0 の場合は 31
を返します
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
