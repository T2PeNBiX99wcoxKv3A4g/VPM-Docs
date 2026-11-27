# Package handling

## UpmInstaller

`io.github.ykysnk.utils.Editor` · `public static class UpmInstaller`

Installs, removes and updates Unity Package Manager packages from editor code. Every operation shows a sticky editor
progress bar whose cancel button stops it, unless the editor is compiling or updating at that moment. Install, remove
and upgrade share one lock, so only one of them runs at a time; a second call returns without doing anything.

### Install(string[] packages)

```csharp
public static void Install(string[] packages)
```

Starts installing the given packages and returns immediately. Entries are either `name` or `name@version`.

```csharp
UpmInstaller.Install(new[] { "io.github.ykysnk.localization@0.11.0" });
```

### InstallAsync(string[] packages)

```csharp
public static Task InstallAsync(string[] packages)
```

Installs the given packages and completes when all of them were processed.

### InstallAsync(string[] packages, CancellationToken token)

```csharp
public static Task InstallAsync(string[] packages, CancellationToken token)
```

Installs the given packages. Entries already installed at the requested version are skipped; a failed entry is logged
and the remaining ones are still processed. Cancelling `token` stops the operation without throwing, and the progress
bar closes as cancelled.

### Remove(string[] packages)

```csharp
public static void Remove(string[] packages)
```

Starts removing the given packages and returns immediately.

### RemoveAsync(string[] packages)

```csharp
public static Task RemoveAsync(string[] packages)
```

Removes the given packages and completes when all of them were processed.

### RemoveAsync(string[] packages, CancellationToken token)

```csharp
public static Task RemoveAsync(string[] packages, CancellationToken token)
```

Removes the given packages. A failed package is logged and the remaining ones are still processed. Cancelling `token`
stops the operation without throwing.

### UpdateAsync()

```csharp
public static Task<string[]> UpdateAsync()
```

Checks the installed packages that come from a registry and lists the ones with a newer version. Built-in, embedded and
local packages are skipped because they have no registry update. The searches run in parallel, and one that takes
longer than five seconds is skipped. Returns entries of the form `name@version`, empty when nothing is outdated.

### UpdateAsync(CancellationToken token)

```csharp
public static Task<string[]> UpdateAsync(CancellationToken token)
```

Same as the parameterless overload; the token stops the check, and searches already running are not aborted. Entries
found before a failure are still returned.

### Upgrade()

```csharp
public static void Upgrade()
```

Checks for updates and starts installing them, then returns immediately.

### UpgradeAsync()

```csharp
public static Task UpgradeAsync()
```

Checks for updates and installs them. Does nothing when every package is up to date.

### UpgradeAsync(CancellationToken token)

```csharp
public static Task UpgradeAsync(CancellationToken token)
```

Checks for updates and installs them. Does nothing when every package is up to date or when an install or removal is
already running. The token stops the update check or the following install without throwing.
