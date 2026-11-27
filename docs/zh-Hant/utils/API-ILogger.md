# ILogger

`io.github.ykysnk.utils.NonUdon.Logger` · `public interface ILogger`

本套件所依賴的記錄介面，便於呼叫端替換實作。它與 `Debug` 對應，每個項目都帶有前置字串。

本套件提供的實作是 [`Logger`](./API-Logger.md)。訊息由 Unity 轉換為文字，因此 null 承載會記錄為空訊息。

## Log

```csharp
void Log(object? message)
void Log(object? message, Object context)
```

以 info 層級寫出訊息。帶 `context` 的多載會把項目連結到該物件，便於在主控台中定位；接受 null context，但無法被選取。

## LogWarning

```csharp
void LogWarning(object? message)
void LogWarning(object? message, Object context)
```

把訊息作為警告寫出，執行繼續。帶 `context` 的多載會把項目連結到該物件，便於在主控台中定位。

## LogError

```csharp
void LogError(object? message)
void LogError(object? message, Object context)
```

把訊息作為錯誤寫出，執行繼續。帶 `context` 的多載會把項目連結到該物件，便於在主控台中定位。

## Assert

```csharp
void Assert(bool condition, object? message)
void Assert(bool condition, object? message, Object context)
```

`condition` 為 false 時回報訊息；否則不寫出任何內容。帶 `context` 的多載會把項目連結到該物件，便於在主控台中定位。
