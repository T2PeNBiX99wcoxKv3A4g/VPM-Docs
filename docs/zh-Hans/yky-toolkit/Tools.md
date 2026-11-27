# 工具

一些否则需要翻好几层菜单才能用到的便捷操作。

## 维护

| 菜单                                                                                          | 作用                                                                                                          |
|-----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| Tools &gt; YKYToolkit &gt; Clear Shader Cache                                                 | 删除 Unity 已编译的着色器缓存。                                                                               |
| Tools &gt; YKYToolkit &gt; Force Clear Temp Files                                             | 删除项目的 `Temp` 文件夹（Unity 会重新构建它）。                                                              |
| Tools &gt; YKYToolkit &gt; Clear Empty Folder                                                 | 从项目中移除空文件夹。                                                                                        |
| Tools &gt; YKYToolkit &gt; Allow Async Compilation                                            | 切换后台着色器编译；勾选状态表示当前是否启用。                                                                |
| Assets &gt; YKYToolkit &gt; Asset Backup                                                      | 把选中的资源复制到一个带时间戳的备份文件夹。                                                                  |
| Assets &gt; YKYToolkit &gt; Asset GUID Copy                                                   | 把选中资源的 GUID 复制到剪贴板。                                                                              |
| Assets &gt; YKYToolkit &gt; Delete Selected / GameObject &gt; YKYToolkit &gt; Delete Selected | 删除选中内容并记录到删除历史中；受保护的目录会被拒绝，而不会被删除。                                          |

## 对象

**Set Object and Tag**（位于 GameObject 和 Tools 菜单）用于在普通对象与仅在编辑器中可见的对象之间切换：处于激活状态的
对象会被停用并标记为 `EditorOnly`，同时记住它之前的标签和激活状态；再次对该对象执行该命令会同时恢复两者。

## 组件

| 菜单                                       | 作用                                 |
|--------------------------------------------|--------------------------------------|
| Copy All Components                        | 复制选中对象的所有组件。             |
| Paste All Components                       | 把它们粘贴到另一个对象上。           |
| Paste All Components With Transform        | 同上，并同时应用复制来的变换。       |
| Copy Transform Tree / Paste Transform Tree | 复制或粘贴包含变换和组件的整个层级。 |

复制的数据通过剪贴板传递，因此可以在场景和预制体之间移动。

## 约束

| 菜单                                       | 作用                                    |
|--------------------------------------------|-----------------------------------------|
| Convert Unity Constraint To VRC Constraint | 把 Unity 约束替换为 VRChat 的等效约束。 |
| Convert VRC Constraint To Unity Constraint | 反向转换，便于在 VRChat 之外做原型。    |

两个操作都可以撤销，并会保留约束设置。

## Unity 资源监视器

**Tools &gt; YKYToolkit &gt; Unity Resource Monitor** 实时显示编辑器进程的状态，每 100 毫秒刷新一次：CPU 占用、已用托管堆、
保留内存、已分配内存、图形内存、空闲的保留内存以及临时分配器。每个计数显示当前值，提示信息会说明它衡量的内容。
测试期间建议一直开着。

## Discord Rich Presence

Discord SDK 的相关操作（**Initialize / Restart / Shutdown**）控制可选的编辑器 Rich Presence：编辑器状态会显示当前项目与场景。SDK
仅在编辑器中提供，永远不会进入构建；[首选项](./Preferences.md) 中的 **启用 Discord Rich Presence** 可以完全关闭该连接。

## 设置

- **Tools &gt; YKYToolkit &gt; Preferences** 包含语言、主题色、删除保护以及各历史记录的上限。参见 [首选项](./Preferences.md)。
- **Tools &gt; YKYToolkit &gt; Import Watcher Settings** 单独打开导入高亮设置。参见 [导入监视器](./Import-Watcher.md)。
