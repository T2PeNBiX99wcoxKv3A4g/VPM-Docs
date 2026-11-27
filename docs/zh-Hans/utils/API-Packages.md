# 包处理

## UpmInstaller

`io.github.ykysnk.utils.Editor` · `public static class UpmInstaller`

从编辑器代码安装、移除和更新 Unity 包管理器包。每个操作都会显示一个粘性的编辑器进度条，其取消按钮可停止该
操作，除非编辑器此刻正在编译或更新。安装、移除和升级共用一把锁，因此同一时间只有一个在运行；第二次调用会直接
返回而不做任何事。

### Install(string[] packages)

```csharp
public static void Install(string[] packages)
```

开始安装给定的包并立即返回。条目可以是 `name` 或 `name@version`。

```csharp
UpmInstaller.Install(new[] { "io.github.ykysnk.localization@0.11.0" });
```

### InstallAsync(string[] packages)

```csharp
public static Task InstallAsync(string[] packages)
```

安装给定的包，并在全部处理完成后完成。

### InstallAsync(string[] packages, CancellationToken token)

```csharp
public static Task InstallAsync(string[] packages, CancellationToken token)
```

安装给定的包。已经安装为所请求版本的条目会被跳过；失败的条目会被记录，其余条目仍会继续处理。取消 `token`
会停止操作而不抛出异常，进度条以已取消状态关闭。

### Remove(string[] packages)

```csharp
public static void Remove(string[] packages)
```

开始移除给定的包并立即返回。

### RemoveAsync(string[] packages)

```csharp
public static Task RemoveAsync(string[] packages)
```

移除给定的包，并在全部处理完成后完成。

### RemoveAsync(string[] packages, CancellationToken token)

```csharp
public static Task RemoveAsync(string[] packages, CancellationToken token)
```

移除给定的包。失败的包会被记录，其余包仍会继续处理。取消 `token` 会停止操作而不抛出异常。

### UpdateAsync()

```csharp
public static Task<string[]> UpdateAsync()
```

只检查从注册表安装的包，并列出版本较新的那些。内置、嵌入和本地包没有注册表更新，因此会跳过。搜索会并行执行，
单个搜索超过 5 秒会被放弃。返回形如 `name@version` 的条目，没有任何过期项时为空。

### UpdateAsync(CancellationToken token)

```csharp
public static Task<string[]> UpdateAsync(CancellationToken token)
```

与无参数重载相同；标记会停止检查，正在进行的搜索不会被中止。失败之前找到的条目仍会被返回。

### Upgrade()

```csharp
public static void Upgrade()
```

检查更新并开始安装，然后立即返回。

### UpgradeAsync()

```csharp
public static Task UpgradeAsync()
```

检查更新并安装它们。所有包都是最新时不执行任何操作。

### UpgradeAsync(CancellationToken token)

```csharp
public static Task UpgradeAsync(CancellationToken token)
```

检查更新并安装它们。所有包都是最新、或已有安装/移除正在进行时不执行任何操作。标记会停止更新检查或随后的
安装而不抛出异常。
