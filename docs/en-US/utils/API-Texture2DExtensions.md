# Texture2DExtensions

`io.github.ykysnk.utils.Extensions` · `public static class Texture2DExtensions`

Texture resizing and alpha trimming helpers. Trimming returns a square texture sized to the longer edge of the opaque area, with the content centred and the remaining margin transparent.

The `GPU` variants sample through a RenderTexture instead of the CPU pixel array, so the source does not need to be CPU readable; the `CPU` variants read the pixels directly and therefore require a readable texture. Every helper returns a new texture except [`MakeTexture2DClear`](#maketexture2dclear), which writes into the texture it is called on.

## ScaleGPU

```csharp
public static Texture2D ScaleGPU(this Texture2D source, int targetWidth, int targetHeight)
```

Resizes the texture on the GPU: blits `source` into a RenderTexture and reads it back into a new `Texture2D`. Because the source is sampled through the GPU it does not need to be CPU readable. The result uses the source format and has mipmaps only when the source had them. `RenderTexture.active` is left at `null` afterwards rather than restored.

```csharp
var icon = source.ScaleGPU(128, 128);
```

## ScaleCPU

```csharp
public static Texture2D ScaleCPU(this Texture2D source, int targetWidth, int targetHeight)
```

Resizes the texture on the CPU, writing one bilinearly sampled pixel at a time with `GetPixelBilinear`. Sampling happens at pixel centres, so the first and last source pixels are reached. The source must be CPU readable and is not modified; the result uses the source format and has mipmaps only when the source had them.

## MakeTexture2DClear

```csharp
public static void MakeTexture2DClear(this Texture2D tex2D, int width, int height)
```

Fills the whole texture with `Color.clear`, i.e. (0, 0, 0, 0), by writing a single full-size pixel array, which is cheaper than a per-pixel loop. `Apply` is not called, so the change only reaches the GPU once the caller applies the texture. `width` and `height` must match the texture's current size or `SetPixels` throws.

## TrimTransparentCPU

```csharp
public static Texture2D TrimTransparentCPU(this Texture2D source, float alphaThreshold = 0.01f)
```

Crops the transparent border away on the CPU. A pixel counts as content when its alpha is strictly greater than `alphaThreshold`; the bounding box of that content is copied into a new square texture whose side is the longer edge of the box, centred with integer division, so an odd difference leaves one extra transparent pixel on the right and top. The square output loses the original position of the content. The result is a 1x1 transparent texture when no pixel passes the threshold, and otherwise keeps the source format and mipmaps only when the source had them. The source must be CPU readable and is not modified.

## TrimTransparentGPU

```csharp
public static Texture2D TrimTransparentGPU(this Texture2D source, float alphaThreshold = 0.01f, bool gammaCorrect = true, ComputeShader trimShader = null)
```

GPU version of [`TrimTransparentCPU`](#trimtransparentcpu) with the same square output: one kernel finds the alpha bounds, a second copies that region into a square RenderTexture which is read back into a new texture. Content is centred with integer division and everything outside it is written as transparent. Because the source is sampled on the GPU it does not need to be CPU readable.

`gammaCorrect` true (the default) encodes the copied colour with `pow(rgb, 1 / 2.2)`; false copies the raw source values. `trimShader` must provide the `cs_find_bounds` and `cs_copy_to_square` kernels. When it is null the editor loads the shader shipped with this package, while player builds return a 1x1 transparent texture instead.
