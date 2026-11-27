# UpmInstaller

`io.github.ykysnk.utils.Editor` · `public static class UpmInstaller`

从编辑器代码安装、移除和更新 Unity 包管理器包。

每个操作都会显示粘性的编辑器进度条，并带有可停止操作的取消按钮，但编辑器正在编译或更新时按钮不起作用。安装、移除和升级共用一把锁，因此同一时间只有一个在运行；第二次调用会直接返回而不做任何事。

## Install

```csharp
public static void Install(string[] packages)
```

开始安装给定的包并立即返回；任务会被丢弃，因此只有日志会报告结果。条目可以是 `name` 或 `name@version`。

```csharp
UpmInstaller.Install(new[] { "io.github.ykysnk.localization@0.11.0" });
```

## InstallAsync

```csharp
public static Task InstallAsync(string[] packages)
public static Task InstallAsync(string[] packages, CancellationToken token)
```

安装给定的包，并在每个条目都安装或跳过之后完成。无参数重载会传入 `CancellationToken.None`。

每个条目会按 `@` 拆分。已安装在所要求版本的条目会被跳过，只写 `name` 而包已安装任何版本的条目也一样；两者都会被记录并显示在进度条中。失败的条目会用 `Utils.LogError` 记录，其余条目仍会处理。

取消 `token`（或点击取消按钮）会停止操作而不抛出异常，进度条则以取消状态关闭。

## Remove

```csharp
public static void Remove(string[] packages)
```

开始移除给定的包并立即返回。

## RemoveAsync

```csharp
public static Task RemoveAsync(string[] packages)
public static Task RemoveAsync(string[] packages, CancellationToken token)
```

移除给定的包名，并在全部处理完成后结束。失败的包会被记录，其余包仍会处理。取消 `token` 会停止操作而不抛出异常，进度条则以取消状态关闭。共用的锁在这里同样适用。

## UpdateAsync

```csharp
public static Task<string[]> UpdateAsync()
public static Task<string[]> UpdateAsync(CancellationToken token)
```

检查从注册表（registry）安装的包，并为每个有更新版本的包返回 `name@version` 形式的条目；没有过期项时返回空数组。

内置、嵌入和本地包完全不会被搜索，因为它们没有注册表更新。其余搜索最多同时运行 16 个。单个搜索有 5 秒上限；超时的搜索会被记录为超时，检查则继续处理下一个包。失败或没有结果的搜索也会以相同方式记录。

结果按 `StringComparer.Ordinal` 排序。令牌会停止检查，但不会中止已在进行的搜索，失败前找到的条目仍会返回。这只是单纯的检查：它不会获取安装锁。

## Upgrade

```csharp
public static void Upgrade()
```

检查更新并开始安装，然后立即返回。

## UpgradeAsync

```csharp
public static Task UpgradeAsync()
public static Task UpgradeAsync(CancellationToken token)
```

检查更新并安装找到的项，在两个步骤都完成后结束。所有包都是最新，或已有安装、移除或升级正在运行时，不做任何事。令牌会停止更新检查或后续的安装而不抛出异常。

```csharp
await UpmInstaller.UpgradeAsync();
```
