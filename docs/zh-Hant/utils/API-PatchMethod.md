# PatchMethod

`io.github.ykysnk.utils.Editor.Patches` · `public abstract class PatchMethod<T> : IPatchMethod, ILogger where T : PatchMethod<T>, new()`

一組 Harmony 修補：目標方法，以及屬於它的 prefix、postfix、transpiler 與 finalizer。執行個體是巢狀於 [`Patch`](./API-Patch.md) 群組中的類別。

`T` 是具體的修補類別。它會實作 `IPatchMethod` 與 `ILogger`，而 `new()` 條件約束讓框架與延遲建立的 `Instance` 能建立它。`TargetMethod` 與各 `Target*` 屬性是 virtual，`Prepare` 與 `Cleanup` 是帶預設實作的 virtual 鉤子，沒有任何成員是抽象。

```csharp
private sealed class HideHandle : PatchMethod<HideHandle>
{
    public override MethodInfo? TargetMethod { get; } =
        AccessTools.Method(typeof(UnityEditor.Editor), "DrawHeader");

    private static void Prefix() => EditorGUI.BeginDisabledGroup(true);
    private static void Postfix() => EditorGUI.EndDisabledGroup();
}
```

## Instance

```csharp
public static T Instance { get; }
```

延遲建立的執行個體，供修補流程之外的呼叫端使用；框架會自行具現化這組修補。

## ThisType

```csharp
public static Type ThisType { get; }
```

修補型別；它是被反射方法的型別，也是日誌前置字串的名稱。

## PrefixMethod

```csharp
public virtual string PrefixMethod { get; }
```

作為 prefix 的巢狀方法名稱，預設為 `"Prefix"`；覆寫它以改用其他名稱。

## PostfixMethod

```csharp
public virtual string PostfixMethod { get; }
```

作為 postfix 的巢狀方法名稱，預設為 `"Postfix"`；覆寫它以改用其他名稱。

## TranspilerMethod

```csharp
public virtual string TranspilerMethod { get; }
```

作為 transpiler 的巢狀方法名稱，預設為 `"Transpiler"`；覆寫它以改用其他名稱。

## FinalizerMethod

```csharp
public virtual string FinalizerMethod { get; }
```

作為 finalizer 的巢狀方法名稱，預設為 `"Finalizer"`；覆寫它以改用其他名稱。

## QualifiedName

```csharp
public virtual string QualifiedName { get; }
```

修補的唯一名稱，用於日誌與錯誤回報。預設為完整型別名稱，沒有完整名稱時則為簡短名稱。

## DisplayName

```csharp
public virtual string DisplayName { get; }
```

修補的簡短名稱，作為它寫出的每個日誌項目的前置字串。預設為型別名稱。

## Enabled

```csharp
public virtual bool Enabled { get; }
```

修補是否被套用。預設為 true，停用的修補會被略過而不接觸 Harmony。

## TargetMethod

```csharp
public virtual MethodInfo? TargetMethod { get; }
```

要修補的方法。基底值為 `null`，因此每個具體修補類別都會覆寫它，通常用 `AccessTools.Method` 解析；若維持 `null`，就不會套用任何東西並記錄警告。

## TargetPrefix

```csharp
public virtual MethodInfo? TargetPrefix { get; }
```

名為 `PrefixMethod` 的巢狀方法，不存在時為 `null`。它只依名稱透過 `Method` 尋找。

## TargetPostfix

```csharp
public virtual MethodInfo? TargetPostfix { get; }
```

名為 `PostfixMethod` 的巢狀方法，不存在時為 `null`。它只依名稱透過 `Method` 尋找。

## TargetTranspiler

```csharp
public virtual MethodInfo? TargetTranspiler { get; }
```

名為 `TranspilerMethod` 的巢狀方法，不存在時為 `null`。它只依名稱透過 `Method` 尋找。

## TargetFinalizer

```csharp
public virtual MethodInfo? TargetFinalizer { get; }
```

名為 `FinalizerMethod` 的巢狀方法，不存在時為 `null`。它只依名稱透過 `Method` 尋找。

## Priority

```csharp
public virtual int Priority { get; }
```

套用於此集合中每個修補方法的 Harmony 優先順序。預設值 -1 表示未明確設定優先順序。

## Before

```csharp
public virtual string[]? Before { get; }
```

此修補必須在其之前執行的 Harmony ID，`null` 表示沒有順序限制。

## After

```csharp
public virtual string[]? After { get; }
```

此修補必須在其之後執行的 Harmony ID，`null` 表示沒有順序限制。

## Debug

```csharp
public virtual bool? Debug { get; }
```

修補方法的 Harmony 偵錯旗標，`null` 表示不設定。

## Prepare

```csharp
protected virtual bool Prepare(MethodInfo? original, Harmony harmony)
```

在套用修補之前執行，用於修補方法執行時所需的狀態。預設傳回 true；傳回 false 會跳過這次修補，此時不會套用或清理任何東西。

## Cleanup

```csharp
protected virtual Exception? Cleanup(Exception? exception, Harmony harmony, MethodInfo? original)
```

在修補嘗試的 `finally` 區塊中執行，不論修補是否成功。基底實作會原樣傳回 `exception`，非 null 的結果會記錄為錯誤。

## Method

```csharp
protected static MethodInfo? Method(string name)
```

僅依名稱解析修補類別的方法，類別沒有該方法時傳回 `null`。結果由修補核心快取，無法解析的名稱也會被記住，因此失敗的反射查詢只會發生一次。

## Patch

```csharp
void IPatchMethod.Patch(Harmony harmony)
```

套用修補，包含 `Prepare` 與 `Cleanup`：`Enabled` 為 false 或缺少 `TargetMethod` 時傳回，完全沒有修補方法時記錄警告，然後把每個已解析的修補方法以 `Priority`、`Before`、`After` 與 `Debug` 建成的 `HarmonyMethod` 傳給 `Harmony.Patch`。它只能透過 `IPatchMethod` 觸及，群組就是這樣執行它。

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
