# Logger

`io.github.ykysnk.utils.NonUdon.Logger` · `public class Logger<T> : ILogger`

為每個項目加上 `T` 名稱前置字串的記錄器，因此主控台列本身就能說明它來自哪個型別，不需要在每個呼叫點寫前置字串。每個 `T` 共用一個執行個體。

前置字串是 `typeof(T).Name`，在型別首次使用時讀取一次；項目透過 [`Utils`](./API-Utils.md) 寫出，因此獲得與直接呼叫相同的彩色 `[prefix]` 形式與 `[HideInCallstack]` 行為。

## Instance

```csharp
public static Logger<T> Instance { get; }
```

`T` 的共用記錄器，首次使用時建立，之後重複使用。它是基於 `Lazy<Logger<T>>` 與 `LazyThreadSafetyMode.ExecutionAndPublication` 的執行緒安全單例，因此從多個執行緒記錄會到達同一個執行個體。

```csharp
Logger<MyWindow>.Instance.Log("Opened");
```

## Log

```csharp
public void Log(object? message)
public void Log(object? message, Object context)
```

寫出帶型別名稱前置字串的 info 層級訊息。帶 `context` 的多載在點擊主控台項目時還會醒目提示該物件。

## LogWarning

```csharp
public void LogWarning(object? message)
public void LogWarning(object? message, Object context)
```

寫出帶型別名稱前置字串的警告，執行繼續。帶 `context` 的多載在點擊主控台項目時還會醒目提示該物件。

## LogError

```csharp
public void LogError(object? message)
public void LogError(object? message, Object context)
```

寫出帶型別名稱前置字串的錯誤，執行繼續。帶 `context` 的多載在點擊主控台項目時還會醒目提示該物件。

## Assert

```csharp
public void Assert(bool condition, object? message)
public void Assert(bool condition, object? message, Object context)
```

`condition` 為 false 時回報帶前置字串的訊息；否則不寫出任何內容。帶 `context` 的多載在點擊主控台項目時還會醒目提示該物件。
