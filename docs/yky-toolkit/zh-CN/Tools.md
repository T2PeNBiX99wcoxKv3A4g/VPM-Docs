# 工具

一些否则需要翻好几层菜单才能用到的便捷操作。

## 维护

| 菜单 | 作用 |
| --- | --- |
| Tools > YKYToolkit > Clear Shader Cache | 删除 Unity 已编译的着色器缓存。 |
| Tools > YKYToolkit > Force Clear Temp Files | 删除项目的 `Temp` 文件夹（Unity 会重新构建它）。 |
| Tools > YKYToolkit > Clear Empty Folder | 从项目中移除空文件夹。 |
| Assets > YKYToolkit > Asset Backup | 把选中的资源复制到一个带时间戳的备份文件夹。 |
| Assets > YKYToolkit > Asset GUID Copy | 把选中资源的 GUID 复制到剪贴板。 |
| Assets > YKYToolkit > Delete Selected / GameObject > YKYToolkit > Delete Selected | 删除选中对象并记录到删除历史中。 |

## 对象

**Set Object and Tag**（位于 GameObject 和 Tools 菜单）可以一步为选中对象指定对象资源和标签，预制体阶段对象也包括在内。

## 组件

| 菜单 | 作用 |
| --- | --- |
| Copy All Components | 复制选中对象的所有组件。 |
| Paste All Components | 把它们粘贴到另一个对象上。 |
| Paste All Components With Transform | 同上，并同时应用复制来的变换。 |
| Copy Transform Tree / Paste Transform Tree | 复制或粘贴包含变换和组件的整个层级。 |

复制的数据通过剪贴板传递，因此可以在场景和预制体之间移动。

## 约束

| 菜单 | 作用 |
| --- | --- |
| Convert Unity Constraint To VRC Constraint | 把 Unity 约束替换为 VRChat 的等效约束。 |
| Convert VRC Constraint To Unity Constraint | 反向转换，便于在 VRChat 之外做原型。 |

两个操作都可以撤销，并会保留约束设置。

## Unity 资源监视器

**Tools > YKYToolkit > Unity Resource Monitor** 实时显示编辑器进程的状态：托管内存与原生内存、GC 次数、CPU 时间以及渲染线程。它每秒采样一次，适合在测试期间一直开着。

## Discord Rich Presence

Discord SDK 的相关操作（**Initialize / Restart / Shutdown**）控制可选的编辑器 Rich Presence：编辑器状态会显示当前项目与场景。SDK 仅在编辑器中提供，永远不会进入构建。
