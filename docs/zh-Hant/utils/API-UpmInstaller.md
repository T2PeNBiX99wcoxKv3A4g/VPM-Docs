# UpmInstaller

`io.github.ykysnk.utils.Editor` · `public static class UpmInstaller`

從編輯器程式碼安裝、移除與更新 Unity Package Manager 套件。

每個操作都會顯示固定的編輯器進度條，並帶有可中止操作的取消按鈕，但編輯器正在編譯或更新時按鈕不會有作用。安裝、移除與升級共用同一把鎖，因此一次只會執行其中一個；第二次呼叫會直接傳回而不做任何事。

## Install

```csharp
public static void Install(string[] packages)
```

開始安裝指定的套件並立即傳回；工作會被丟棄，因此只有記錄會回報結果。項目格式為 `name` 或 `name@version`。

```csharp
UpmInstaller.Install(new[] { "io.github.ykysnk.localization@0.11.0" });
```

## InstallAsync

```csharp
public static Task InstallAsync(string[] packages)
public static Task InstallAsync(string[] packages, CancellationToken token)
```

安裝指定的套件，並在每個項目都安裝或略過後完成。無參數多載會傳入 `CancellationToken.None`。

每個項目會以 `@` 分割。已安裝在所要求版本的項目會被略過，只寫 `name` 而套件已安裝任何版本的項目也一樣；兩者都會記錄並顯示在進度條中。失敗的項目會以 `Utils.LogError` 記錄，其餘項目仍會處理。

取消 `token`（或按下取消按鈕）會停止操作而不拋出例外，進度條則以取消狀態關閉。

## Remove

```csharp
public static void Remove(string[] packages)
```

開始移除指定的套件並立即傳回。

## RemoveAsync

```csharp
public static Task RemoveAsync(string[] packages)
public static Task RemoveAsync(string[] packages, CancellationToken token)
```

移除指定的套件名稱，並在全部處理完成後結束。失敗的套件會被記錄，其餘套件仍會處理。取消 `token` 會停止操作而不拋出例外，進度條則以取消狀態關閉。共用的鎖在這裡同樣適用。

## UpdateAsync

```csharp
public static Task<string[]> UpdateAsync()
public static Task<string[]> UpdateAsync(CancellationToken token)
```

檢查從登錄（registry）安裝的套件，並為每個有較新版本的套件傳回 `name@version` 形式的項目；沒有任何項目過期時傳回空陣列。

內建、內嵌與本機套件完全不會搜尋，因為它們沒有登錄更新。其餘搜尋最多同時執行 16 個。單一搜尋有 5 秒上限；超過的搜尋會被記錄為逾時，檢查則繼續處理下一個套件。失敗或沒有結果的搜尋也會以相同方式記錄。

結果會以 `StringComparer.Ordinal` 排序。權杖會停止檢查，但不會中止已在進行中的搜尋，失敗前找到的項目仍會傳回。這只是單純的檢查：它不會取得安裝鎖。

## Upgrade

```csharp
public static void Upgrade()
```

檢查更新並開始安裝，然後立即傳回。

## UpgradeAsync

```csharp
public static Task UpgradeAsync()
public static Task UpgradeAsync(CancellationToken token)
```

檢查更新並安裝找到的項目，在兩個步驟都完成後結束。所有套件都是最新，或已有安裝、移除或升級正在執行時，不做任何事。權杖會停止更新檢查或後續的安裝而不拋出例外。

```csharp
await UpmInstaller.UpgradeAsync();
```
