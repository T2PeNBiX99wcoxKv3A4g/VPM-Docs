# Vector3Extensions

`io.github.ykysnk.utils.Extensions` · `public static class Vector3Extensions`

`Vector3` の軸ごとのヘルパーです。距離、成分ごとの演算、丸め、クランプ、そして [`FloatExtensions`](./API-FloatExtensions.md) が単一の値に提供するものと同じノイズ耐性のある比較があります。

## Distance

```csharp
public static float Distance(this Vector3 a, Vector3 b)
public static float Distance(this Vector3 a, Transform b)
```

2 点間のワールド単位の距離で、2 点が一致するときは 0 です。`Transform` のオーバーロードは `b.position` までを測り、null の Transform では `NullReferenceException` を投げます。

```csharp
if (player.position.Distance(spawn) < 2f) Return();
```

## Distance2D

```csharp
public static float Distance2D(this Vector3 a, Vector3 b)
public static float Distance2D(this Vector3 a, Transform b)
```

XZ 平面に射影した 2 点間のワールド単位の距離で、Y 軸は無視されます。X と Z が同じときは 0 です。`Transform` のオーバーロードは `b.position` までを測り、null の Transform では `NullReferenceException` を投げます。

## Divide

```csharp
public static Vector3 Divide(this Vector3 a, Vector3 b)
```

`a` の各成分を `b` の対応する成分で割ります。`b` の成分が 0 の軸は例外ではなく無限大か NaN になります。

## Multiply

```csharp
public static Vector3 Multiply(this Vector3 a, Vector3 b)
```

`a` の各成分に `b` の対応する成分を掛けます。スケールを軸ごとに合成する方法です。

## Round

```csharp
public static Vector3 Round(this Vector3 a, int digits, MidpointRounding mode)
public static Vector3 Round(this Vector3 a, int digits)
public static Vector3 Round(this Vector3 a, MidpointRounding mode)
public static Vector3 Round(this Vector3 a)
```

各成分を独立に `digits` 桁の小数に丸め、0.5 のような中間値は `mode` で決めます。`digits` は 0〜15 で、それ以外は `ArgumentOutOfRangeException` を投げます。`mode` を取らないオーバーロードは中間値を最も近い偶数に丸め（`ToEven` なので 0.5 は 0、1.5 は 2）、`digits` を取らないオーバーロードは整数に丸め、引数なしのオーバーロードは同じ動作で `ToEven` です。

## DeltaAngle

```csharp
public static Vector3 DeltaAngle(this Vector3 a, float current)
public static Vector3 DeltaAngle(this Vector3 a)
```

各成分について、その成分と `current` の間の度単位の最短符号付き差を [-180, 180] に収めて返します。引数なしのオーバーロードは基準角に 0 を使うため、角度そのものを折り返します。

## ClampMagnitude

```csharp
public static Vector3 ClampMagnitude(this Vector3 vector, float maxLength)
```

大きさを `maxLength` に制限します。すでにその大きさ以下のベクトルはそのまま返し、長いものは `normalized * maxLength` として縮めるため向きは保たれます。`maxLength` が負の場合、長すぎるベクトルは向きが反転し、ゼロベクトルは `Vector3.zero` のままです。

## Abs

```csharp
public static Vector3 Abs(this Vector3 vector)
```

各成分の絶対値を取った新しいベクトルです。

## Min

```csharp
public static Vector3 Min(this Vector3 a, Vector3 b)
```

対応する成分の組ごとに小さい方の値で作った新しいベクトルです。

## Max

```csharp
public static Vector3 Max(this Vector3 a, Vector3 b)
```

対応する成分の組ごとに大きい方の値で作った新しいベクトルです。

## Clamp

```csharp
public static Vector3 Clamp(this Vector3 vector, Vector3 min, Vector3 max)
```

各成分を `min` と `max` の対応する成分の間で独立にクランプします。`min` は軸ごとに `max` 以下が前提です。

## Clamp01

```csharp
public static Vector3 Clamp01(this Vector3 vector)
```

各成分を [0, 1] の範囲にクランプします。

## DirectionTo

```csharp
public static Vector3 DirectionTo(this Vector3 from, Vector3 to)
```

`from` から `to` を向く正規化された方向です。2 点が一致するときは `Vector3.zero` です。

## InverseDirectionTo

```csharp
public static Vector3 InverseDirectionTo(this Vector3 from, Vector3 to)
```

`to` から `from` へ戻る向きの正規化された方向で、[`DirectionTo`](#directionto) の逆です。2 点が一致するときは `Vector3.zero` です。

## LerpUnclamped

```csharp
public static Vector3 LerpUnclamped(this Vector3 a, Vector3 b, float t)
```

`t` をクランプせずに `a` から `b` へ線形補間するため、0 未満や 1 を超える値は同じ直線上で外挿されます。

## Lerp

```csharp
public static Vector3 Lerp(this Vector3 a, Vector3 b, float t)
```

`a` から `b` へ線形補間し、`t` を先に [0, 1] にクランプするため結果がどちらの入力も超えることはありません。

## MoveTowards

```csharp
public static Vector3 MoveTowards(this Vector3 current, Vector3 target, float maxDistanceDelta)
```

`current` を `target` へ最大 `maxDistanceDelta` ワールド単位だけ動かし、target を越えません。差分が 0 なら `current` をそのまま返し、負なら `target` から遠ざかり、1 ステップ以内に入ると結果は `target` と同じになります。

## RotateTowards

```csharp
public static Vector3 RotateTowards(this Vector3 current, Vector3 target, float maxRadiansDelta, float maxMagnitudeDelta)
```

`current` を `target` へ最大 `maxRadiansDelta` ラジアン回転させ、大きさは最大 `maxMagnitudeDelta` だけ変えます。両方の制限は呼び出しごとに適用され、両方に達すると結果は `target` になります。

## ProjectOnPlane

```csharp
public static Vector3 ProjectOnPlane(this Vector3 vector, Vector3 planeNormal)
```

原点を通り指定した法線を持つ平面にベクトルを射影します。法線は実装内で正規化されます。法線方向の成分は取り除かれ、法線がゼロの場合はベクトルをそのまま返します。

## Project

```csharp
public static Vector3 Project(this Vector3 vector, Vector3 onNormal)
```

`onNormal` が定める直線にベクトルを射影し、その方向に平行な成分だけを残します。`onNormal` は正規化されていなくてもよく、ゼロの場合は `Vector3.zero` を返します。

## Reflect

```csharp
public static Vector3 Reflect(this Vector3 inDirection, Vector3 inNormal)
```

法線が定める平面でベクトルを反射します。`inNormal` は単位長である必要があり、そうでないと反射が誤ったスケールになります。結果の大きさは `inDirection` と同じです。

## Clean

```csharp
public static Vector3 Clean(this Vector3 vector, float threshold = 0.0001f)
```

絶対値が `threshold` より小さい成分を 0 に置き換えたベクトルのコピーです。比較は厳密なので、しきい値ちょうどの成分は残り、各成分は個別に判定されます。

## IsNearly

```csharp
public static bool IsNearly(this Vector3 vector, Vector3 target, float threshold = 0.0001f)
```

すべての成分が `target` の対応する成分との差 `threshold` 未満かどうかを、絶対差と厳密比較で判定します。

## IsNearlyZero

```csharp
public static bool IsNearlyZero(this Vector3 vector, float threshold = 0.0001f)
```

すべての成分の絶対値が `threshold` より小さいかどうか、つまりベクトルが原点に十分近いかどうかです。

## CopyFrom

```csharp
public static void CopyFrom(this ref Vector3 self, Vector3 other)
```

`self` のすべての成分を `other` の値で上書きします。`Vector3` は構造体なので `self` は参照で渡され、フィールド、配列要素、ローカル変数のような `ref` 可能な変数である必要があり、一時値は使えません。

## CleanInPlace

```csharp
public static void CleanInPlace(this ref Vector3 self, float threshold = 0.0001f)
```

`self` の成分のうち絶対値が `threshold` より小さいものをその場で 0 にします。比較は厳密です。[`CopyFrom`](#copyfrom) と同様に `self` を参照で取るため、呼び出し側に変更が反映されます。

## ToFullString

```csharp
public static string ToFullString(this Vector3 v)
```

ベクトルを `(x, y, z)` として整形し、各成分を往復可能な書式 `R` で書くため、テキストを解析し直すと同じ float 値になります。

```csharp
var text = transform.position.ToFullString(); // "(1.5, 0, -2.25)"
```

## Approximately

```csharp
public static bool Approximately(this Vector3 self, Vector3 other)
```

3 つの成分すべてがほぼ等しいかどうかを、[`FloatExtensions.Approximately`](./API-FloatExtensions.md#approximately) の相対イプシロンで判定します。誤差は大きい方の 1e-6 倍で、下限は `Mathf.Epsilon * 8` です。
