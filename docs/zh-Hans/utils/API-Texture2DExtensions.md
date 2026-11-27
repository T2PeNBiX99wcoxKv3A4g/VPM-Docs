# Texture2DExtensions

`io.github.ykysnk.utils.Extensions` · `public static class Texture2DExtensions`

纹理缩放与按 alpha 裁剪的辅助方法。裁剪返回正方形纹理，边长取不透明区域较长的一边，内容居中，其余边距透明。

`GPU` 版本通过 RenderTexture 而不是 CPU 像素数组采样，因此源纹理不需要可读；`CPU` 版本直接读取像素，因此需要可读纹理。除 [`MakeTexture2DClear`](#maketexture2dclear) 会写入被调用的纹理外，每个辅助方法都返回新纹理。

## ScaleGPU

```csharp
public static Texture2D ScaleGPU(this Texture2D source, int targetWidth, int targetHeight)
```

在 GPU 上缩放纹理：把 `source` 绘制（blit）到 RenderTexture，再读回到新的 `Texture2D`。由于通过 GPU 采样，源纹理不需要可读。结果使用源格式，只有源有 mipmap 时才带 mipmap。之后 `RenderTexture.active` 会被留在 `null`，而不是恢复原值。

```csharp
var icon = source.ScaleGPU(128, 128);
```

## ScaleCPU

```csharp
public static Texture2D ScaleCPU(this Texture2D source, int targetWidth, int targetHeight)
```

在 CPU 上缩放纹理，用 `GetPixelBilinear` 逐个双线性采样并写入像素。采样在像素中心进行，因此源纹理的首尾像素也会被取到。源纹理必须可读且不会被修改；结果使用源格式，只有源有 mipmap 时才带 mipmap。

## MakeTexture2DClear

```csharp
public static void MakeTexture2DClear(this Texture2D tex2D, int width, int height)
```

用 `Color.clear`（0, 0, 0, 0）填充整个纹理：写入一个全尺寸像素数组，比逐像素循环更省。不会调用 `Apply`，因此只有调用方应用纹理后改动才到达 GPU。`width` 与 `height` 必须与纹理当前尺寸一致，否则 `SetPixels` 抛出异常。

## TrimTransparentCPU

```csharp
public static Texture2D TrimTransparentCPU(this Texture2D source, float alphaThreshold = 0.01f)
```

在 CPU 上裁掉透明边框。alpha 严格大于 `alphaThreshold` 的像素算作内容；内容包围盒会被复制到新的正方形纹理中，边长取包围盒较长的一边，用整数除法居中，因此差值为奇数时右侧和上方会多留一个透明像素。正方形输出会丢失内容的原始位置。没有像素超过阈值时返回 1x1 透明纹理，否则结果使用源格式，只有源有 mipmap 时才带 mipmap。源纹理必须可读且不会被修改。

## TrimTransparentGPU

```csharp
public static Texture2D TrimTransparentGPU(this Texture2D source, float alphaThreshold = 0.01f, bool gammaCorrect = true, ComputeShader trimShader = null)
```

[`TrimTransparentCPU`](#trimtransparentcpu) 的 GPU 版本，输出同样是正方形：第一个内核求出 alpha 边界，第二个把该区域复制到正方形 RenderTexture，再读回到新纹理。内容用整数除法居中，其外部全部写成透明。由于通过 GPU 采样，源纹理不需要可读。

`gammaCorrect` 为 true（默认）时用 `pow(rgb, 1 / 2.2)` 编码复制出的颜色；为 false 时直接复制源数值。`trimShader` 必须提供 `cs_find_bounds` 与 `cs_copy_to_square` 两个内核。为 null 时，编辑器会加载本包随附的着色器，而播放器构建则返回 1x1 透明纹理。
