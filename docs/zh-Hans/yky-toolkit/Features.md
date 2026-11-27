# 功能列表

工具包新增的全部内容，按出现位置分组。详细说明在链接的页面中。

## 窗口

- [**UPM 安装器**](./UPM-Installer.md) —— 安装、删除和更新 UPM 包；按项目保存的包列表；把列表复制为 JSON 的生成器；
  只添加有新版本的包的更新检查。
- [**导入监视器**](./Import-Watcher.md) —— 每个编辑器会话一份日志，记录 Unity 导入了哪些资源，按日期与时间分组；支持搜索、刷新
  和清除；已不存在的资源会标为红色。
- [**导入监视器设置**](./Import-Watcher.md) —— 高亮颜色与持续时间、按扩展名的颜色以及历史记录的数量。
- [**删除历史**](./Import-Watcher.md) —— 会话中被删除或重新创建的路径，包含路径、GUID、扩展名和时间；两个值都可以
  复制；记录数量可配置。
- [**Unity 资源监视器**](./Tools.md) —— 七个实时计数，每 100 毫秒刷新一次。
- [**Transform 表达式**](./Transform-Inspector.md) —— 每个表达式的可搜索速查表，示例点击即可复制。
- [**首选项**](./Preferences.md) —— 语言、主题色、常规开关、删除保护以及两个历史记录的上限。

## 工具菜单

- **Clear Shader Cache** —— 删除 Unity 已编译的着色器缓存。
- **Force Clear Temp Files** —— 删除项目的 `Temp` 文件夹；Unity 会重新构建它。
- **Clear Empty Folder** —— 在确认并显示数量后移除空文件夹。
- **Allow Async Compilation** —— 后台着色器编译；勾选状态表示当前状态。
- **Set Object and Tag** —— 在普通对象与仅在编辑器中可见的对象之间切换所选内容。
- **Discord SDK Initialize / Restart / Shutdown** —— 控制可选的编辑器 Rich Presence。

## Assets 菜单

- **Asset Backup** —— 把选中的资源复制到一个带时间戳的备份文件夹。
- **Asset GUID Copy** —— 复制选中资源的 GUID。
- **Delete Selected** —— 通过确认对话框删除，并把路径记录到删除历史中。

## GameObject 与组件菜单

- **Set Object and Tag** —— 停用对象并把它标记为 `EditorOnly`，同时记住之前的标签和激活状态；再次执行会同时恢复两者。
- **Copy All Components** / **Paste All Components** —— 把一个对象的所有组件移到另一个对象。
- **Paste All Components With Transform** —— 同上，并同时应用变换。
- **Copy Transform Tree** / **Paste Transform Tree** —— 复制或粘贴包含变换和组件的整个层级。
- **Convert Unity Constraint To VRC Constraint** / **Convert VRC Constraint To Unity Constraint** —— 在保留设置的情况下
  互换两种约束类型。
- **Delete Selected** —— 与 Assets 菜单中相同的删除操作。

## Transform 检视器

默认的 Transform 检视器被一个增强版替换：

- **局部空间** 和 **世界空间** 两张卡片，各自包含位置、旋转和缩放。
- 每个字段都支持算术：`2 + 3`、`10 / 4`、`1.5 * 2`；结果会应用到所有选中对象。
- 输入时显示表达式建议，可用 `↑`/`↓`、Enter 和 Tab 选择。
- 整张卡片和单个属性都支持复制、粘贴、随机和重置。
- 缩放上的链接按钮用于切换等比约束。
- 对齐：参考模式（轴心、底部、中心）、**对齐到父级**、通过射线检测的 **对齐到地面**，以及 **清除父级**。
- **锁定变换**，会为该对象禁用整个检视器。
- **层级路径**，带复制按钮。
- 位置、旋转和缩放的 **小数位数**（`-1` 关闭舍入）。
- **默认 UI**，会展开 Unity 自带的检视器以处理预制体覆盖。
- 多对象编辑时显示共同值，不同之处显示为 `—`，并且所有修改都经过 `Undo`。

## Project 窗口

- 导入的资源会被高亮颜色覆盖一小段时间，然后淡出。
- 每个文件扩展名可以有自己的颜色，在图标视图中显示为边框，在列表视图中显示为下划线。
- 接收到文件的文件夹也会被高亮。

## 编辑器行为

- **删除保护**：`Assets` 和 `Packages` 始终拒绝删除，可以在 [首选项](./Preferences.md) 中添加更多目录。
- **删除所选时的警告窗口**：对话框会列出将被移除的内容，并且可以关闭。
- **允许异步编译** 可以从菜单或首选项切换。
- **启用 Discord Rich Presence** 会显示项目与当前场景，并且可以完全关闭。
- **窗口翻译**：英语、日语、简体中文和繁体中文，在首选项中切换。
- **主题色**：一个颜色，用于所有窗口和 Transform 检视器中的小节标题、高亮与按钮。
