# Patch

`io.github.ykysnk.utils.Editor.Patches` · `public abstract class Patch<T> : IPatch, ILogger where T : Patch<T>, new()`

由 [`PatchLoader`](./API-PatchLoader.md) 作為一個單位套用的一組修補。實作的類別就是容器：它自己的 `Execute` 會先執行，然後才是巢狀於其中的每個修補方法。

`T` 是具體的群組。它會實作 `IPatch` 與 `ILogger`，而 `new()` 條件約束讓框架與延遲建立的 `Instance` 能建立它。`Execute` 是唯一的抽象成員：`QualifiedName`、`DisplayName` 與 `Enabled` 都是帶預設值的 virtual，而 `Run` 不可覆寫。

```csharp
internal sealed class MyGroup : Patch<MyGroup>
{
    protected override void Execute(Harmony harmony)
    {
        // Optional: patches the group applies by hand, before the nested ones.
    }

    private sealed class HideHandle : PatchMethod<HideHandle>
    {
        // ...
    }
}
```

## Instance

```csharp
public static T Instance { get; }
```

延遲建立的執行個體，供修補流程之外的呼叫端使用；框架在套用群組時會建立自己的執行個體。

## ThisType

```csharp
public static Type ThisType { get; }
```

修補群組型別；它的巢狀型別就是 `Run` 所套用的修補。

## ThisHarmony

```csharp
protected Harmony? ThisHarmony { get; set; }
```

所屬載入器的 Harmony 執行個體，會在群組執行前透過 `IPatch.ThisHarmony` 指派；在那之前為 `null`。

## QualifiedName

```csharp
public virtual string QualifiedName { get; }
```

群組的穩定識別，用於回報它所套用的修補。預設為完整型別名稱，沒有完整名稱時則為簡短名稱。

## DisplayName

```csharp
public virtual string DisplayName { get; }
```

群組的簡短名稱，作為它寫出的每個日誌項目的前置字串。預設為型別名稱。

## Enabled

```csharp
public virtual bool Enabled { get; }
```

群組是否應被套用。預設為 true，停用的群組會被略過而不接觸 Harmony。

## Execute

```csharp
protected abstract void Execute(Harmony harmony)
```

套用此群組自己宣告的修補；它會在巢狀修補方法之前執行。每個具體群組都必須覆寫它，覆寫內容可以為空。

## Run

```csharp
void IPatch.Run(Harmony harmony)
```

套用整個群組：`Enabled` 為 false 時立即傳回，否則呼叫 `Execute`，再執行每個巢狀的 [`PatchMethod`](./API-PatchMethod.md) 與 [`ReversePatchMethod`](./API-ReversePatchMethod.md)。它只能透過 `IPatch` 觸及，載入器就是這樣呼叫它。

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
