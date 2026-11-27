# 安装

包名为 `io.github.ykysnk.utils`，与其他包通过同一个 VPM 仓库分发。可以用 ALCOM、VPM CLI，或把仓库添加到项目中来安装。

它自身没有 VPM 依赖。

大多数项目不会直接安装它：[本地化](../localization/Installation.md) 和 [YKYToolKit](../yky-toolkit/Installation.md) 会声明它，由
VPM 为你解析。

## 命名空间

| 命名空间                            | 用途                                          |
|-------------------------------------|-----------------------------------------------|
| `io.github.ykysnk.utils`            | `Utils`（日志、断言）、`BasicEditorComponent` |
| `io.github.ykysnk.utils.Editor`     | `BasicEditor`、GUI 辅助工具和 UPM 客户端      |
| `io.github.ykysnk.utils.Extensions` | 其他包使用的小型扩展方法                      |

## 更新

该包跟随仓库的发布标签；YKY Toolkit 窗口会列出已安装的版本，并可以直接在 Unity
中更新它们。参见 [UPM Installer](../yky-toolkit/UPM-Installer.md)。
