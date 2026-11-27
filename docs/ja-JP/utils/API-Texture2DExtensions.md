# Texture2DExtensions

`io.github.ykysnk.utils.Extensions` · `public static class Texture2DExtensions`

テクスチャのリサイズとアルファでのトリミングのヘルパーです。トリミングは不透明部分の長い方の辺に合わせた正方形のテクスチャを返し、内容は中央に置かれ、残りの余白は透明になります。

`GPU` 版は CPU のピクセル配列ではなく RenderTexture 経由でサンプリングするため、元のテクスチャは読み取り可能である必要はありません。`CPU` 版はピクセルを直接読むため、読み取り可能なテクスチャが必要です。どのヘルパーも新しいテクスチャを返しますが、[`MakeTexture2DClear`](#maketexture2dclear) だけは呼び出したテクスチャに書き込みます。

## ScaleGPU

```csharp
public static Texture2D ScaleGPU(this Texture2D source, int targetWidth, int targetHeight)
```

GPU でテクスチャをリサイズします。`source` を RenderTexture にブリットし、新しい `Texture2D` に読み戻します。GPU 経由でサンプリングするため、元のテクスチャは読み取り可能である必要はありません。結果は元のフォーマットを使い、ミップマップは元にあった場合だけ生成されます。`RenderTexture.active` は復元されず `null` のままになります。

```csharp
var icon = source.ScaleGPU(128, 128);
```

## ScaleCPU

```csharp
public static Texture2D ScaleCPU(this Texture2D source, int targetWidth, int targetHeight)
```

CPU でテクスチャをリサイズし、`GetPixelBilinear` で 1 ピクセルずつ双線形サンプリングして書き込みます。サンプリングはピクセル中心で行うため、元の最初と最後のピクセルにも届きます。元のテクスチャは読み取り可能である必要があり、変更はされません。結果は元のフォーマットを使い、ミップマップは元にあった場合だけ生成されます。

## MakeTexture2DClear

```csharp
public static void MakeTexture2DClear(this Texture2D tex2D, int width, int height)
```

`Color.clear`（0, 0, 0, 0）でテクスチャ全体を塗りつぶします。全面サイズのピクセル配列を 1 回書くため、ピクセルごとのループより安価です。`Apply` は呼ばないので、変更が GPU に届くのは呼び出し側がテクスチャを適用したときです。`width` と `height` はテクスチャの現在のサイズと一致しないと `SetPixels` が例外を投げます。

## TrimTransparentCPU

```csharp
public static Texture2D TrimTransparentCPU(this Texture2D source, float alphaThreshold = 0.01f)
```

CPU で透明な余白を切り落とします。アルファが `alphaThreshold` より厳密に大きいピクセルを内容とみなし、その内容の境界ボックスを、ボックスの長い方の辺を一辺とする新しい正方形テクスチャにコピーします。中央寄せは整数除算なので、差が奇数の場合は右と上に透明なピクセルが 1 つ多く残ります。正方形の出力では内容の元の位置は失われます。しきい値を超えるピクセルが無い場合は 1x1 の透明なテクスチャを返し、それ以外は元のフォーマットを使い、ミップマップは元にあった場合だけ生成されます。元のテクスチャは読み取り可能である必要があり、変更はされません。

## TrimTransparentGPU

```csharp
public static Texture2D TrimTransparentGPU(this Texture2D source, float alphaThreshold = 0.01f, bool gammaCorrect = true, ComputeShader trimShader = null)
```

[`TrimTransparentCPU`](#trimtransparentcpu) の GPU 版で、出力は同じ正方形です。1 つ目のカーネルがアルファの境界を求め、2 つ目がその領域を正方形の RenderTexture にコピーし、それを新しいテクスチャに読み戻します。内容は整数除算で中央に置かれ、その外側はすべて透明で書き込まれます。GPU 経由でサンプリングするため、元のテクスチャは読み取り可能である必要はありません。

`gammaCorrect` が true（既定）のときはコピーした色を `pow(rgb, 1 / 2.2)` でエンコードし、false のときは元の値をそのままコピーします。`trimShader` は `cs_find_bounds` と `cs_copy_to_square` のカーネルを提供する必要があります。null の場合、エディターではこのパッケージに同梱されたシェーダーを読み込み、プレイヤービルドでは代わりに 1x1 の透明なテクスチャを返します。
