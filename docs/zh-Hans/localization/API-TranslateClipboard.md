# TranslateClipboard

`io.github.ykysnk.Localization.Editor` · `public static class TranslateClipboard`

翻译条目的剪贴板处理，供检视器和行绘制器共用。复制的条目是 [`BasicTranslate`](./API-BasicTranslate.md) 的 JSON 形式，用 `JsonUtility` 读回，因此按钮可以在改动某行之前判断能否粘贴。

## HasEntry

```csharp
public static bool HasEntry()
```

剪贴板当前是否存放着翻译条目。结果会针对剪贴板文本缓存，因此按钮可以频繁询问而不必再次解析 JSON；只有文本变化时才会重新计算。

## TryRead

```csharp
public static bool TryRead([NotNullWhen(true)] out BasicTranslate? basicTranslate, out Exception? exception)
```

尝试从剪贴板读取 `BasicTranslate`。文本必须能解析为 JSON 且带有非空 `key`，因此空剪贴板或无关的 JSON 对象会被拒绝，而不会用空值覆盖该行：`JsonUtility` 会执行字段初始化器，JSON 省略 `translate` 时它总是空的，所以只有键能区分翻译条目与其他 JSON 对象。

方法返回 true 时 `basicTranslate` 是解析出的条目，否则为 null。`exception` 是解析或校验错误；若剪贴板本身就是空的则为 null。

```csharp
if (TranslateClipboard.TryRead(out var entry, out var error))
    Paste(entry);
else if (error != null)
    Debug.LogWarning(error.Message);
```
