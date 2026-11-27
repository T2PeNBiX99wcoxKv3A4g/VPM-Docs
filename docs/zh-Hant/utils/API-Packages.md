# 套件處理

## UpmInstaller

`io.github.ykysnk.utils.Editor` · `public static class UpmInstaller`

從編輯器程式碼安裝、移除與更新 Unity Package Manager
套件。每個操作都會顯示固定在編輯器上的進度條，其取消按鈕可中止操作，除非編輯器當下正在編譯或更新。安裝、移除與升級共用同一把鎖，因此一次只會執行其中一個；第二次呼叫會直接傳回而不做任何事。

### Install(string[] packages)

```csharp
public static void Install(string[] packages)
```

開始安裝指定的套件並立即傳回。項目格式為 `name` 或 `name@version`。

```csharp
UpmInstaller.Install(new[] { "io.github.ykysnk.localization@0.11.0" });
```

### InstallAsync(string[] packages)

```csharp
public static Task InstallAsync(string[] packages)
```

安裝指定的套件，並在全部處理完成後結束。

### InstallAsync(string[] packages, CancellationToken token)

```csharp
public static Task InstallAsync(string[] packages, CancellationToken token)
```

安裝指定的套件。已安裝在所要求版本的項目會被略過；失敗的項目會被記錄，其餘項目仍會處理。取消 `token`
會停止操作而不拋出例外，進度條則以取消狀態關閉。

### Remove(string[] packages)

```csharp
public static void Remove(string[] packages)
```

開始移除指定的套件並立即傳回。

### RemoveAsync(string[] packages)

```csharp
public static Task RemoveAsync(string[] packages)
```

移除指定的套件，並在全部處理完成後結束。

### RemoveAsync(string[] packages, CancellationToken token)

```csharp
public static Task RemoveAsync(string[] packages, CancellationToken token)
```

移除指定的套件。失敗的套件會被記錄，其餘套件仍會處理。取消 `token` 會停止操作而不拋出例外。

### UpdateAsync()

```csharp
public static Task<string[]> UpdateAsync()
```

只檢查從登錄（registry）安裝的套件，並列出版本較新的項目。內建、內嵌與本機套件沒有登錄更新，因此會略過。搜尋會平行執行，
單一搜尋超過 5 秒會被放棄。傳回 `name@version` 形式的項目，沒有任何項目過期時為空陣列。

### UpdateAsync(CancellationToken token)

```csharp
public static Task<string[]> UpdateAsync(CancellationToken token)
```

與無參數多載相同；權杖會停止檢查，進行中的搜尋不會被中止。失敗前找到的項目仍會傳回。

### Upgrade()

```csharp
public static void Upgrade()
```

檢查更新並開始安裝，然後立即傳回。

### UpgradeAsync()

```csharp
public static Task UpgradeAsync()
```

檢查更新並安裝。所有套件都是最新時不做任何事。

### UpgradeAsync(CancellationToken token)

```csharp
public static Task UpgradeAsync(CancellationToken token)
```

檢查更新並安裝。所有套件都是最新，或已有安裝／移除正在執行時，不做任何事。權杖會停止更新檢查或後續的安裝而不拋出例外。
