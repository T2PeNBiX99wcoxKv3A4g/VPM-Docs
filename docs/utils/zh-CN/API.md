# API

## 日志与断言

每个辅助方法都接收一个前缀，因此控制台能看出消息是由哪个包报告的。

```csharp
using io.github.ykysnk.utils;

Utils.Log(nameof(MyWindow), "Opened");
Utils.LogWarning(nameof(MyWindow), "Nothing to do");
Utils.LogError(nameof(MyWindow), exception.Message, this);
Utils.Assert(condition, nameof(MyWindow), "Condition must hold");
```

`LogAssert` 只报告而不抛出异常；`Assert` 会在记录日志后抛出断言异常。

## 环境

| 成员 | 返回 |
| --- | --- |
| `Utils.IsInPrefab` | 当选中对象是预制体资源或预制体阶段对象时为 true。 |
| `Utils.IsPlaying` | 播放模式激活期间为 true。 |
| `Utils.ToLayer(LayerMask)` | 仅设置了一个位的掩码所对应的单一层索引。 |

## 扩展

`io.github.ykysnk.utils.Extensions` 包含其他包使用的扩展方法，例如：

```csharp
var path = assetPath.MiddlePath('(', ')');   // text between the first pair of brackets
var fullName = transform.FullName();          // "Root/Child/Leaf"
```

## 编辑器类型

| 类型 | 用途 |
| --- | --- |
| `BasicEditor` | 带错误 UI 的检视器基类。 |
| `EditorTask` | 带进度与失败报告的异步任务封装。 |
| `CustomDialogWindow` | 可复用的模态提示框。 |
| `MenuItemObject` | 声明式菜单项（路径、优先级、校验器、动作）。 |
| `UpmInstaller` | 安装、移除和更新 UPM 包。 |

## 版本

该包的版本独立于工具包；`Packages/io.github.ykysnk.utils` 下的 `package.json` 是唯一依据，发布工作流会为每个标签发布一个 VPM 包。
