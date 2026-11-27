# Utils

`io.github.ykysnk.utils` · `public static class Utils`

可以在 Udon 中安全调用的小型辅助方法：带彩色前缀的日志，以及若干状态检查。

前缀以 `[prefix]` 形式、用 `#D771C0` 颜色绘制。每个日志与断言成员都带有 `[HideInCallstack]`，因此控制台条目指向调用方，而不是本文件。

## Log

```csharp
public static void Log(string prefix, object message)
public static void Log(string prefix, object message, UnityEngine.Object context)
```

用 `Debug.Log` 写出 `[prefix] message`。`prefix` 是着色的部分；`message` 为 null 时记录空值。带 `context` 的重载在点击控制台条目时会高亮该对象。

```csharp
Utils.Log(nameof(MyWindow), "Opened");
```

## LogWarning

```csharp
public static void LogWarning(string prefix, object message)
public static void LogWarning(string prefix, object message, UnityEngine.Object context)
```

用 `Debug.LogWarning` 写出带前缀的消息。带 `context` 的重载在点击控制台条目时会高亮该对象。

## LogError

```csharp
public static void LogError(string prefix, object message)
public static void LogError(string prefix, object message, UnityEngine.Object context)
```

用 `Debug.LogError` 写出带前缀的消息。带 `context` 的重载在点击控制台条目时会高亮该对象。

## LogAssert

```csharp
[Obsolete("Use Assert(bool condition, string prefix, object message) instead")]
public static void LogAssert(bool condition, string prefix, object message)

[Obsolete("Use Assert(bool condition, string prefix, object message, Object context) instead")]
public static void LogAssert(bool condition, string prefix, object message, UnityEngine.Object context)
```

为兼容性而保留；它们只是把带前缀的消息转给 `Debug.Assert`。请改用 [`Assert`](#assert)。

## Assert

```csharp
public static void Assert(bool condition, string prefix, object message)
public static void Assert(bool condition, string prefix, object message, UnityEngine.Object context)
```

通过 `Debug.Assert` 断言 `condition`，失败时以彩色前缀报告消息。带 `context` 的重载在点击控制台条目时会高亮该对象。

```csharp
Utils.Assert(path != null, nameof(MyWindow), "Path must be set");
```

## IsMoved

```csharp
public static bool IsMoved(float value)
```

每帧的差值是否算作移动：`value < -0.05f || value > 0.05f`。阈值使用严格比较，因此差值正好为 `0.05f` 不算移动。

## IsInPrefab2

```csharp
public static bool IsInPrefab2()
```

编辑器是否处于预制体编辑模式。在播放器中始终为 false。这是可以在 Udon 内安全使用的名称。

## IsPlaying2

```csharp
public static bool IsPlaying2()
```

播放模式是否已激活或即将开始。在播放器中始终为 true。这是可以在 Udon 内安全使用的名称。

## IsInPrefab

```csharp
public static bool IsInPrefab { get; }
```

`IsInPrefab2` 的属性形式。定义 `COMPILER_UDONSHARP` 时不会编译，因为它依赖 `PrefabStageUtility`。

## IsPlaying

```csharp
public static bool IsPlaying { get; }
```

`IsPlaying2` 的属性形式。定义 `COMPILER_UDONSHARP` 时不会编译，因为它依赖 `EditorApplication`。

## ToLayer

```csharp
public static int ToLayer(LayerMask mask)
```

返回单层遮罩的层索引，也就是其最高已设置位的位置。遮罩为零时返回 31，这是位遍历所产生的结果。

```csharp
var layer = Utils.ToLayer(LayerMask.GetMask("Water"));
```
