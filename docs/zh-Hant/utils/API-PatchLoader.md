# PatchLoader

`io.github.ykysnk.utils.Editor.Patches` · `public abstract class PatchLoader<T> : IPatchLoader, ILogger where T : PatchLoader<T>, new()`

單一組件的進入點：它接收為該組件建立的 Harmony 執行個體，並套用其 [`Patch`](./API-Patch.md) 群組。[`ExportsPatchLoader`](./API-ExportsPatchLoader.md) 會指出要載入的實作。

`T` 是具體的載入器。它會實作 `IPatchLoader` 與 `ILogger`，而 `new()` 條件約束讓框架與延遲建立的 `Instance` 能建立它。`Load` 是唯一的抽象成員；`Unload`、`QualifiedName`、`DisplayName` 與 `Enabled` 都是 virtual。

```csharp
[assembly: ExportsPatchLoader(typeof(MyLoader))]

internal sealed class MyLoader : PatchLoader<MyLoader>
{
    public override void Load(Harmony harmony)
    {
        Run(MyGroup.Instance);
    }
}
```

## Instance

```csharp
public static T Instance { get; }
```

延遲建立的執行個體，供修補流程之外的呼叫端使用；框架在載入組件時會建立自己的執行個體。

## ThisType

```csharp
public static Type ThisType { get; }
```

載入器型別，用於日誌前置字串，也是載入器的預設名稱。

## ThisHarmony

```csharp
protected Harmony? ThisHarmony { get; set; }
```

此載入器的 Harmony 執行個體，會在 `Load` 被呼叫前透過 `IPatchLoader.ThisHarmony` 指派；在框架指派之前為 `null`。

## QualifiedName

```csharp
public virtual string QualifiedName { get; }
```

載入器的唯一名稱，同時也是其執行個體的 Harmony ID，因此也是再次移除其修補時使用的鍵。預設為完整型別名稱，沒有完整名稱時則為簡短名稱。

## DisplayName

```csharp
public virtual string DisplayName { get; }
```

載入器的簡短名稱，用於日誌項目與錯誤回報。預設為型別名稱。

## Enabled

```csharp
public virtual bool Enabled { get; }
```

載入器是否執行。預設為 true，停用的載入器永遠不會被載入，也不會被卸載。

## Load

```csharp
public abstract void Load(Harmony harmony)
```

套用組件的每個修補；這裡會執行它的修補群組，通常是透過 `Run`。每個具體載入器都必須覆寫它。

## Unload

```csharp
public virtual void Unload(Harmony harmony)
```

在組件重新載入前、修補仍存在時呼叫。基底實作不做任何事，因為框架會自行移除 Harmony 修補；覆寫它以釋放載入器擁有的狀態。Harmony 執行個體與傳給 `Load` 的是同一個。

## Run

```csharp
protected void Run(IPatch patch)
```

以此載入器的 Harmony 執行個體執行修補群組，因此群組不必自己持有該執行個體；群組的 `IPatch.ThisHarmony` 會在這裡被覆寫。載入器尚未取得 Harmony 執行個體時（也就是在框架載入它之前使用）會擲回 `InvalidOperationException`。

## Log

```csharp
public void Log(object? message)
public void Log(object? message, Object context)
```

以 `Debug.Log` 寫出訊息，並加上 `DisplayName` 前置字串。帶 `context` 的多載會在點擊主控台項目時醒目提示該 Unity 物件。

## LogWarning

```csharp
public void LogWarning(object? message)
public void LogWarning(object? message, Object context)
```

以 `Debug.LogWarning` 寫出訊息，並加上 `DisplayName` 前置字串。帶 `context` 的多載會在點擊主控台項目時醒目提示該 Unity 物件。

## LogError

```csharp
public void LogError(object? message)
public void LogError(object? message, Object context)
```

以 `Debug.LogError` 寫出訊息，並加上 `DisplayName` 前置字串。帶 `context` 的多載會在點擊主控台項目時醒目提示該 Unity 物件。

## Assert

```csharp
public void Assert(bool condition, object? message)
public void Assert(bool condition, object? message, Object context)
```

透過 `Debug.Assert` 斷言 `condition`，失敗時以 `DisplayName` 前置字串回報訊息。帶 `context` 的多載會在點擊主控台項目時醒目提示該 Unity 物件。

## Log2

```csharp
public static void Log2(object? message)
public static void Log2(object? message, Object context)
```

與 `Log` 相同，供靜態成員使用：前置字串是 `ThisType.Name`，因為那裡沒有執行個體可用。

## LogWarning2

```csharp
public static void LogWarning2(object? message)
public static void LogWarning2(object? message, Object context)
```

與 `LogWarning` 相同，供靜態成員使用，並以型別名稱作為前置字串。

## LogError2

```csharp
public static void LogError2(object? message)
public static void LogError2(object? message, Object context)
```

與 `LogError` 相同，供靜態成員使用，並以型別名稱作為前置字串。

## Assert2

```csharp
public static void Assert2(bool condition, object? message)
public static void Assert2(bool condition, object? message, Object context)
```

與 `Assert` 相同，供靜態成員使用，並以型別名稱作為前置字串。
