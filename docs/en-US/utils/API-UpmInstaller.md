# UpmInstaller

`io.github.ykysnk.utils.Editor` · `public static class UpmInstaller`

Installs, removes and updates Unity Package Manager packages from editor code.

Every operation shows a sticky editor progress bar with a cancel button that stops it, except while the editor is compiling or updating, when the button does nothing. Install, remove and upgrade share one lock, so only one of them runs at a time; a second call returns without doing anything.

## Install

```csharp
public static void Install(string[] packages)
```

Starts installing the given packages and returns immediately; the task is discarded, so only the log reports the outcome. Entries are either `name` or `name@version`.

```csharp
UpmInstaller.Install(new[] { "io.github.ykysnk.localization@0.11.0" });
```

## InstallAsync

```csharp
public static Task InstallAsync(string[] packages)
public static Task InstallAsync(string[] packages, CancellationToken token)
```

Installs the given packages and completes when every entry was installed or skipped. The parameterless overload passes `CancellationToken.None`.

Each entry is split on `@`. An entry whose package is already installed at the requested version is skipped, and so is a `name` entry whose package is installed at any version; both are logged and reported in the progress bar. A failed entry is logged with `Utils.LogError` and the remaining entries are still processed.

Cancelling `token` (or the cancel button) stops the operation without throwing, and the progress bar closes as cancelled.

## Remove

```csharp
public static void Remove(string[] packages)
```

Starts removing the given packages and returns immediately.

## RemoveAsync

```csharp
public static Task RemoveAsync(string[] packages)
public static Task RemoveAsync(string[] packages, CancellationToken token)
```

Removes the given package names and completes when all of them were processed. A failed package is logged and the remaining ones are still processed. Cancelling `token` stops the operation without throwing, and the progress bar closes as cancelled. The shared lock applies here too.

## UpdateAsync

```csharp
public static Task<string[]> UpdateAsync()
public static Task<string[]> UpdateAsync(CancellationToken token)
```

Checks the installed packages that come from a registry and returns an entry of the form `name@version` for every one that has a newer version, or an empty array when nothing is outdated.

Built-in, embedded and local packages are not searched at all, because they have no registry update. The remaining searches run up to 16 at a time. A single search is given 5 seconds; one that takes longer is logged as timed out and the check moves on to the next package. A search that fails or returns nothing is logged the same way.

The result is sorted with `StringComparer.Ordinal`. The token stops the check but does not abort searches already in flight, and the entries found before a failure are still returned. This is a plain check: it does not take the install lock.

## Upgrade

```csharp
public static void Upgrade()
```

Checks for updates and starts installing them, then returns immediately.

## UpgradeAsync

```csharp
public static Task UpgradeAsync()
public static Task UpgradeAsync(CancellationToken token)
```

Checks for updates and installs what it found, completing after both steps. Does nothing when every package is up to date or when an install, removal or upgrade is already running. The token stops the update check or the following install without throwing.

```csharp
await UpmInstaller.UpgradeAsync();
```
