# 运行时

该包发布三个程序集。下面列出的所有内容都是公开的；过时的成员也包括在内，因为它们仍然可以编译。

| 程序集                            | 命名空间                                       | 内容                                                |
|-----------------------------------|------------------------------------------------|-----------------------------------------------------|
| `io.github.ykysnk.utils`          | `io.github.ykysnk.utils`                       | `Utils`、`IUtilsEditorOnly`、`BasicEditorComponent` |
| `io.github.ykysnk.utils.non-udon` | `io.github.ykysnk.utils.NonUdon`               | `BooleanVector3`、`ColorHex`                        |
| `io.github.ykysnk.utils.Editor`   | `io.github.ykysnk.utils.Editor` 及其子命名空间 | 检视器基类、GUI 辅助方法、菜单、UPM 客户端、绘制器  |

## Utils

`io.github.ykysnk.utils` · `public static class Utils`

可以在 Udon 中安全调用的小型辅助方法：带彩色前缀的日志，以及若干状态检查。

前缀以 `[prefix]` 形式、用 `#D771C0` 颜色绘制。每个日志与断言成员都带有 `[HideInCallstack]`，因此控制台条目指向
调用方，而不是本文件。

### Log(string prefix, object message)

```csharp
public static void Log(string prefix, object message)
```

用 `Debug.Log` 写出 `[prefix] message`。`prefix` 是着色的部分；`message` 为 null 时记录空值。

```csharp
Utils.Log(nameof(MyWindow), "Opened");
```

### Log(string prefix, object message, Object context)

```csharp
public static void Log(string prefix, object message, UnityEngine.Object context)
```

与双参数重载相同，点击控制台条目时会高亮 `context`。

### LogWarning(string prefix, object message)

```csharp
public static void LogWarning(string prefix, object message)
```

用 `Debug.LogWarning` 写出带前缀的消息。

### LogWarning(string prefix, object message, Object context)

```csharp
public static void LogWarning(string prefix, object message, UnityEngine.Object context)
```

警告重载，点击控制台条目时会高亮 `context`。

### LogError(string prefix, object message)

```csharp
public static void LogError(string prefix, object message)
```

用 `Debug.LogError` 写出带前缀的消息。

### LogError(string prefix, object message, Object context)

```csharp
public static void LogError(string prefix, object message, UnityEngine.Object context)
```

错误重载，点击控制台条目时会高亮 `context`。

### LogAssert(bool condition, string prefix, object message)

```csharp
[Obsolete("Use Assert(bool condition, string prefix, object message) instead")]
public static void LogAssert(bool condition, string prefix, object message)
```

为兼容性保留；它只是把带前缀的消息转发给 `Debug.Assert`。请改用 `Assert`。

### LogAssert(bool condition, string prefix, object message, Object context)

```csharp
[Obsolete("Use Assert(bool condition, string prefix, object message, Object context) instead")]
public static void LogAssert(bool condition, string prefix, object message, UnityEngine.Object context)
```

为兼容性保留；请改用 `Assert`。

### Assert(bool condition, string prefix, object message)

```csharp
public static void Assert(bool condition, string prefix, object message)
```

通过 `Debug.Assert` 断言 `condition`，失败时以彩色前缀报告消息。

```csharp
Utils.Assert(path != null, nameof(MyWindow), "Path must be set");
```

### Assert(bool condition, string prefix, object message, Object context)

```csharp
public static void Assert(bool condition, string prefix, object message, UnityEngine.Object context)
```

与三参数重载相同，点击控制台条目时会高亮 `context`。

### IsMoved(float value)

```csharp
public static bool IsMoved(float value)
```

每帧增量是否算作移动：`value < -0.05f || value > 0.05f`。比较是严格的，因此恰好为 `0.05f` 的增量不算移动。

### IsInPrefab2()

```csharp
public static bool IsInPrefab2()
```

编辑器是否处于预制体编辑模式。在播放器中始终为 false。这是在 Udon 中安全可用的名称。

### IsPlaying2()

```csharp
public static bool IsPlaying2()
```

播放模式是否处于激活或即将开始的状态。在播放器中始终为 true。这是在 Udon 中安全可用的名称。

### IsInPrefab

```csharp
public static bool IsInPrefab { get; }
```

`IsInPrefab2` 的属性形式。定义 `COMPILER_UDONSHARP` 时不会被编译，因为它依赖 `PrefabStageUtility`。

### IsPlaying

```csharp
public static bool IsPlaying { get; }
```

`IsPlaying2` 的属性形式。定义 `COMPILER_UDONSHARP` 时不会被编译，因为它依赖 `EditorApplication`。

### ToLayer(LayerMask mask)

```csharp
public static int ToLayer(LayerMask mask)
```

返回单层掩码对应的层索引，即其最高置位的位置。掩码为 0 时返回 31，这正是位遍历产生的结果。

```csharp
var layer = Utils.ToLayer(LayerMask.GetMask("Water"));
```

## IUtilsEditorOnly

`io.github.ykysnk.utils` · `public interface IUtilsEditorOnly`

用于标记应从构建中剥离的行为的标记接口。它不声明任何成员；定义 `UTILS_NDMF` 时它继承
`nadena.dev.ndmf.INDMFEditorOnly`，定义 `UTILS_VRC_SDK3_BASE` 时继承 `VRC.SDKBase.IEditorOnly`，其余情况下只是
一个空标记。

## BasicEditorComponent

`io.github.ykysnk.utils` · `public abstract class BasicEditorComponent : MonoBehaviour, IUtilsEditorOnly`

用于辅助行为的空基类，这些行为不应保留到上传的头像或世界中。它本身不添加任何成员；从它派生后，构建流程会通过
`IUtilsEditorOnly` 移除该组件。

## BooleanVector3

`io.github.ykysnk.utils.NonUdon` · `public struct BooleanVector3 : IEquatable<BooleanVector3>`

三个独立的布尔值，以普通的可序列化字段保存，并提供 `Flags` 视图把它们打包成单个位掩码，便于做类似 switch 的
判断。

### x, y, z

```csharp
public bool x;
public bool y;
public bool z;
```

X、Y、Z 分量是否被设置。

### Flags

```csharp
public int Flags { get; set; }
```

三个分量以 `Flag` 值的掩码表示。给掩码赋值会覆盖全部三个分量，因此掩码未涉及的分量会被清除。赋值时
`Flag.All` 之外的位会被丢弃。

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

单个分量或它们组合的位选择器。

### HasFlag(Flag flag)

```csharp
public bool HasFlag(Flag flag)
```

`flag` 的每一位当前是否都已设置。`Flag.None` 始终匹配。

### HasFlags(params Flag[] flags)

```csharp
public bool HasFlags(params Flag[] flags)
```

`flags` 覆盖的每一位是否都已设置。空数组匹配一切。

### AddFlag(Flag flag)

```csharp
public void AddFlag(Flag flag)
```

设置 `flag` 的位，其他分量保持不变。

### AddFlags(params Flag[] flags)

```csharp
public void AddFlags(params Flag[] flags)
```

设置 `flags` 覆盖的位，其他分量保持不变。空数组不做任何更改。

### RemoveFlag(Flag flag)

```csharp
public void RemoveFlag(Flag flag)
```

清除 `flag` 的位，其他分量保持不变。

### RemoveFlags(params Flag[] flags)

```csharp
public void RemoveFlags(params Flag[] flags)
```

清除 `flags` 覆盖的位，其他分量保持不变。空数组不做任何更改。

### SetFlag(Flag flag)

```csharp
public void SetFlag(Flag flag)
```

用 `flag` 替换整个掩码，因此它未涉及的分量会被清除。

### SetFlags(params Flag[] flags)

```csharp
public void SetFlags(params Flag[] flags)
```

用 `flags` 的并集替换整个掩码。空数组会清除全部三个分量。

### Set(bool x2, bool y2, bool z2)

```csharp
public void Set(bool x2, bool y2, bool z2)
```

一次调用设置全部三个分量。

### Set(BooleanVector3 other)

```csharp
public void Set(BooleanVector3 other)
```

从 `other` 复制全部三个分量。

### SetAll(bool value)

```csharp
public void SetAll(bool value)
```

给 X、Y、Z 赋予相同的值。

### Invert()

```csharp
public void Invert()
```

就地取反每个分量。

### SetX(bool value), SetY(bool value), SetZ(bool value)

```csharp
public void SetX(bool value)
public void SetY(bool value)
public void SetZ(bool value)
```

设置单个分量。

### SetTrue(), SetFalse()

```csharp
public void SetTrue()
public void SetFalse()
```

`SetAll(true)` 与 `SetAll(false)`。

### True, False

```csharp
public static BooleanVector3 True { get; }
public static BooleanVector3 False { get; }
```

三个分量全部设置或全部清除的新向量。

### ToString()

```csharp
public override string ToString()
```

渲染为 `BooleanVector3(x:…,y:…,z:…)`。

### operator !(BooleanVector3)

```csharp
public static BooleanVector3 operator !(BooleanVector3 booleanVector3)
```

返回取反后的副本；操作数按值传递，不会被修改。

### operator true, operator false

```csharp
public static bool operator true(BooleanVector3 booleanVector3)
public static bool operator false(BooleanVector3 booleanVector3)
```

仅当三个分量全部设置时才为 `true`，因此 `if (vector)` 相当于三重 AND。至少有一个分量被清除时为 `false`；为了
支持 `&&` 和 `||`，编译器要求它与 `operator true` 一同提供。

### Equals(BooleanVector3), Equals(object), GetHashCode()

```csharp
public bool Equals(BooleanVector3 other)
public override bool Equals(object? obj)
public override int GetHashCode()
```

按分量比较相等，以及由三个字段构建的哈希码。

## ColorHex

`io.github.ykysnk.utils.NonUdon` · `public struct ColorHex`

一个 `Color` 及其 HTML 十六进制形式，因此颜色可以作为文本被序列化和查看。只有运算符会同时更新两个字段；直接给
某个字段赋值不会改变另一个字段，而默认初始化的结构在 `hex` 为 null 时会从 `color` 推导其文本。

### color

```csharp
public Color color;
```

`hex` 所表示的颜色值。

### hex

```csharp
public string hex;
```

以 `#RRGGBBAA` 表示的颜色，包含开头的 `#`。该字段被直接读取，因此在默认初始化的结构中可能为 null；此时转换会
回退到 `color`。

### ToString()

```csharp
public override string ToString()
```

以 `Color: …, Hex: …` 渲染两个字段，`hex` 为 null 时从 `color` 推导十六进制文本。

### implicit operator string(ColorHex)

```csharp
public static implicit operator string(ColorHex colorHex)
```

返回十六进制文本，因此只要期望颜色字符串的地方都能使用该结构。永不为 null。

### implicit operator Color(ColorHex)

```csharp
public static implicit operator Color(ColorHex colorHex)
```

返回 `color`，因此该结构可以直接当作颜色使用。

### implicit operator ColorHex(string)

```csharp
public static implicit operator ColorHex(string hex)
```

解析 HTML 颜色字符串。`ColorUtility.TryParseHtmlString` 拒绝的文本会变成白色而不是报错，并且 `hex` 会依据解析
后的颜色重写，因此保存的文本是规范化后的结果，而不是原样保留。

### implicit operator ColorHex(Color)

```csharp
public static implicit operator ColorHex(Color color)
```

包装一个颜色并推导其 `#RRGGBBAA` 文本。
