# Texture2DExtensions

`io.github.ykysnk.utils.Extensions` · `public static class Texture2DExtensions`

紋理縮放與依 Alpha 裁切的輔助方法。裁切傳回正方形紋理，邊長取不透明區域較長的一邊，內容置中，其餘邊距透明。

`GPU` 版本透過 RenderTexture 而不是 CPU 像素陣列取樣，因此來源紋理不需要可讀取；`CPU` 版本直接讀取像素，因此需要可讀取的紋理。除了 [`MakeTexture2DClear`](#maketexture2dclear) 會寫入被呼叫的紋理之外，每個輔助方法都傳回新紋理。

## ScaleGPU

```csharp
public static Texture2D ScaleGPU(this Texture2D source, int targetWidth, int targetHeight)
```

在 GPU 上縮放紋理：把 `source` 繪製（blit）到 RenderTexture，再讀回到新的 `Texture2D`。由於透過 GPU 取樣，來源紋理不需要可讀取。結果使用來源格式，只有來源有 mipmap 時才帶 mipmap。之後 `RenderTexture.active` 會被留在 `null`，而不是還原原值。

```csharp
var icon = source.ScaleGPU(128, 128);
```

## ScaleCPU

```csharp
public static Texture2D ScaleCPU(this Texture2D source, int targetWidth, int targetHeight)
```

在 CPU 上縮放紋理，以 `GetPixelBilinear` 逐個雙線性取樣並寫入像素。取樣在像素中心進行，因此來源紋理的首尾像素也會被取到。來源紋理必須可讀取且不會被修改；結果使用來源格式，只有來源有 mipmap 時才帶 mipmap。

## MakeTexture2DClear

```csharp
public static void MakeTexture2DClear(this Texture2D tex2D, int width, int height)
```

以 `Color.clear`（0, 0, 0, 0）填滿整個紋理：寫入一個全尺寸像素陣列，比逐像素迴圈更省。不會呼叫 `Apply`，因此只有呼叫端套用紋理後變更才到達 GPU。`width` 與 `height` 必須與紋理目前尺寸一致，否則 `SetPixels` 會擲回例外。

## TrimTransparentCPU

```csharp
public static Texture2D TrimTransparentCPU(this Texture2D source, float alphaThreshold = 0.01f)
```

在 CPU 上裁掉透明邊框。Alpha 嚴格大於 `alphaThreshold` 的像素算作內容；內容的包圍盒會被複製到新的正方形紋理，邊長取包圍盒較長的一邊，以整數除法置中，因此差值為奇數時右側與上方會多留一個透明像素。正方形輸出會遺失內容的原始位置。沒有像素超過門檻時傳回 1x1 透明紋理，否則結果使用來源格式，只有來源有 mipmap 時才帶 mipmap。來源紋理必須可讀取且不會被修改。

## TrimTransparentGPU

```csharp
public static Texture2D TrimTransparentGPU(this Texture2D source, float alphaThreshold = 0.01f, bool gammaCorrect = true, ComputeShader trimShader = null)
```

[`TrimTransparentCPU`](#trimtransparentcpu) 的 GPU 版本，輸出同樣是正方形：第一個核心求出 Alpha 邊界，第二個把該區域複製到正方形 RenderTexture，再讀回到新紋理。內容以整數除法置中，其外部全部寫成透明。由於透過 GPU 取樣，來源紋理不需要可讀取。

`gammaCorrect` 為 true（預設）時以 `pow(rgb, 1 / 2.2)` 編碼複製出的顏色；為 false 時直接複製來源數值。`trimShader` 必須提供 `cs_find_bounds` 與 `cs_copy_to_square` 兩個核心。為 null 時，編輯器會載入本套件隨附的著色器，而播放器組建則傳回 1x1 透明紋理。
