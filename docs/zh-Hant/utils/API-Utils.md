# Utils

`io.github.ykysnk.utils` · `public static class Utils`

可在 Udon 中安全呼叫的小型輔助工具：帶彩色前置字串的記錄，以及幾個狀態檢查。

前置字串會以 `#D771C0` 的 `[prefix]` 形式呈現。每個記錄與斷言成員都帶有 `[HideInCallstack]`，因此主控台項目會指向呼叫端，而不是這個檔案。

## Log

```csharp
public static void Log(string prefix, object message)
public static void Log(string prefix, object message, UnityEngine.Object context)
```

以 `Debug.Log` 寫出 `[prefix] message`。`prefix` 是著色的部分；`message` 為 null 時會記錄空值。帶 `context` 的多載會在點擊主控台項目時醒目提示該物件。

```csharp
Utils.Log(nameof(MyWindow), "Opened");
```

## LogWarning

```csharp
public static void LogWarning(string prefix, object message)
public static void LogWarning(string prefix, object message, UnityEngine.Object context)
```

以 `Debug.LogWarning` 寫出帶前置字串的訊息。帶 `context` 的多載會在點擊主控台項目時醒目提示該物件。

## LogError

```csharp
public static void LogError(string prefix, object message)
public static void LogError(string prefix, object message, UnityEngine.Object context)
```

以 `Debug.LogError` 寫出帶前置字串的訊息。帶 `context` 的多載會在點擊主控台項目時醒目提示該物件。

## LogAssert

```csharp
[Obsolete("Use Assert(bool condition, string prefix, object message) instead")]
public static void LogAssert(bool condition, string prefix, object message)

[Obsolete("Use Assert(bool condition, string prefix, object message, Object context) instead")]
public static void LogAssert(bool condition, string prefix, object message, UnityEngine.Object context)
```

為了相容性而保留；它們只是把帶前置字串的訊息轉給 `Debug.Assert`。請改用 [`Assert`](#assert)。

## Assert

```csharp
public static void Assert(bool condition, string prefix, object message)
public static void Assert(bool condition, string prefix, object message, UnityEngine.Object context)
```

透過 `Debug.Assert` 斷言 `condition`，失敗時以彩色前置字串回報訊息。帶 `context` 的多載會在點擊主控台項目時醒目提示該物件。

```csharp
Utils.Assert(path != null, nameof(MyWindow), "Path must be set");
```

## IsMoved

```csharp
public static bool IsMoved(float value)
```

每幀的差值是否算作移動：`value < -0.05f || value > 0.05f`。門檻使用嚴格比較，因此差值正好為 `0.05f` 不算移動。

## IsInPrefab2

```csharp
public static bool IsInPrefab2()
```

編輯器是否處於預製體編輯模式。在播放器中永遠為 false。這是可在 Udon 內安全使用的名稱。

## IsPlaying2

```csharp
public static bool IsPlaying2()
```

播放模式是否已啟用或即將開始。在播放器中永遠為 true。這是可在 Udon 內安全使用的名稱。

## IsInPrefab

```csharp
public static bool IsInPrefab { get; }
```

`IsInPrefab2` 的屬性形式。定義 `COMPILER_UDONSHARP` 時不會編譯，因為它依賴 `PrefabStageUtility`。

## IsPlaying

```csharp
public static bool IsPlaying { get; }
```

`IsPlaying2` 的屬性形式。定義 `COMPILER_UDONSHARP` 時不會編譯，因為它依賴 `EditorApplication`。

## ToLayer

```csharp
public static int ToLayer(LayerMask mask)
```

傳回單層遮罩的層索引，也就是其最高已設定位元的位置。遮罩為零時傳回 31，這是位元走訪所產生的結果。

```csharp
var layer = Utils.ToLayer(LayerMask.GetMask("Water"));
```
