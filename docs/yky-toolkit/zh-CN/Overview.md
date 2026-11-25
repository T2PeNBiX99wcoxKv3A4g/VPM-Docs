# 概览

YKY Toolkit 是一组面向日常 Unity 工作的编辑器窗口与右键菜单操作：安装包、监视导入、监控内存、清理缓存以及编辑 Transform。

所有功能都位于 **Tools > YKYToolkit** 下，右键操作位于 **GameObject > YKYToolkit**、**Assets > YKYToolkit** 以及组件的右键菜单中。

## 包含的内容

| 窗口 | 功能 |
| --- | --- |
| [UPM 安装器](UPM-Installer) | 安装、移除和更新 UPM 包，并维护可复用的包列表。 |
| [导入监视器](Import-Watcher) | 记录导入了什么、何时导入、来自何处，并支持按扩展名着色。 |
| 删除历史 | 列出本次会话中被删除以及被重新创建的资源。 |
| Unity 资源监视器 | 编辑器进程的实时内存与 CPU 计数。 |
| [工具](Tools) | 缓存清理、资源备份、GUID 复制、约束转换以及组件复制/粘贴。 |
| [Transform 检视器](Transform-Inspector) | 支持表达式、对齐与剪贴板的增强版 Transform 检视器。 |

## 依赖

| 包 | 原因 |
| --- | --- |
| `io.github.ykysnk.utils` | 检视器基类、GUI 辅助工具和 UPM 客户端。 |
| `io.github.ykysnk.localization` | 编辑器文案；各窗口均已翻译。 |

两者都是 VPM 依赖，会被自动解析。`jp.lilxyzw.editortoolbox` 是可选的：安装后，工具包会使用它的包导入器来处理 `.unitypackage` 文件。
