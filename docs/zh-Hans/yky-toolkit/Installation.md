# 安装

可以用 ALCOM、VPM CLI，或把仓库添加到项目中来安装 `io.github.ykysnk.yky-toolkit`。该包依赖 `io.github.ykysnk.utils` 和
`io.github.ykysnk.localization`，VPM 会一并安装。

## 安装之后

各窗口会出现在 **Tools &gt; YKYToolkit** 下：

- UPM Installer
- Import Watcher 与 Import Watcher Settings
- Delete History
- Unity Resource Monitor
- Transform Expression Help
- Preferences
- Clear Shader Cache、Force Clear Temp Files、Clear Empty Folder、Allow Async Compilation
- Discord SDK Initialize / Restart / Shutdown

右键操作会添加到 **GameObject &gt; YKYToolkit**、**Assets &gt; YKYToolkit** 以及组件菜单中。

## 可选：lilEditorToolbox

安装 `jp.lilxyzw.editortoolbox` 后，工具包会通过它导入 `.unitypackage` 文件。未安装时，工具包会回退到 Unity 自带的导入器，其他行为不变。
