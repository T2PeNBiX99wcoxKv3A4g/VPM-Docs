# 選單與擴充

## MenuItemObject

`io.github.ykysnk.utils.Editor` · `public class MenuItemObject`

由 `MenuExtensions` 保持註冊的選單項目描述：路徑、快速鍵、勾選狀態、排序優先順序，以及 Unity 所需的回呼。

### MenuItemObject(string name, string shortcut, bool @checked, int priority, Action execute, Func&lt;bool&gt;? validate)

```csharp
public MenuItemObject(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
```

建立選單項目的完整描述。`name` 是選單路徑，會以 Unity 清理屬性宣告路徑的相同方式清理，因此兩種項目最後會落在同一個路徑下。
`validate` 決定項目是否啟用；null 表示永遠啟用。

### MenuItemObject(string name, string shortcut, int priority, Action execute)

```csharp
public MenuItemObject(string name, string shortcut, int priority, Action execute)
```

建立未勾選、且沒有驗證回呼的選單項目。

### MenuItemObject(string name, int priority, Action execute)

```csharp
public MenuItemObject(string name, int priority, Action execute)
```

建立未勾選、且沒有快速鍵或驗證回呼的選單項目。

### MenuItemObject(string name, Action execute)

```csharp
public MenuItemObject(string name, Action execute)
```

以其種類的預設優先順序建立選單項目：`GameObject/Create Other` 下為 10，其他位置為 1000，與 Unity 自身的排序一致。

### Name

```csharp
public string Name { get; private set; }
```

清理後的選單路徑；這是追蹤項目所用的鍵。

### Shortcut

```csharp
public string Shortcut { get; private set; }
```

傳給 Unity 的快速鍵字串，例如 `#%g`；項目沒有快速鍵時為空字串。

### Checked

```csharp
public bool Checked { get; private set; }
```

Unity 是否以勾號繪製該項目。

### Priority

```csharp
public int Priority { get; private set; }
```

子選單內的排序；數值較小者先繪製。

### Execute

```csharp
public Action Execute { get; private set; }
```

選擇該項目時執行的動作。

### Validate

```csharp
public Func<bool>? Validate { get; private set; }
```

決定項目是否啟用的述詞，永遠啟用時為 null。

## MenuWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuWrap`

對 `UnityEditor.Menu` 內部部分的反射包裝，該類別是編輯器選單列背後的實作。這些成員是未記載的編輯器內部實作，並非公開 API，因此
Unity 可能在任何版本重新命名或移除它們；這個包裝讓選單項目能在執行階段新增、變更與移除。

### SetHotkey(string menuPath, string hotkey)

```csharp
public static void SetHotkey(string menuPath, string hotkey)
```

指派顯示在既有選單項目旁的快速鍵。

### ExtractSubmenus(string menuPath)

```csharp
public static string[] ExtractSubmenus(string menuPath)
```

列出指定路徑下存在的子選單；沒有時為空陣列。

### AddMenuItem(string name, string shortcut, bool @checked, int priority, Action execute, Func&lt;bool&gt;? validate)

```csharp
public static void AddMenuItem(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
```

在執行階段註冊選單項目，不需要 `MenuItem` 屬性。

### AddSeparator(string name, int priority)

```csharp
public static void AddSeparator(string name, int priority)
```

在指定路徑與優先順序加入分隔項目。

### RemoveMenuItem(string name)

```csharp
public static void RemoveMenuItem(string name)
```

移除註冊在指定路徑下的選單項目。

### RebuildAllMenus()

```csharp
public static void RebuildAllMenus()
```

由已註冊的項目重建整個選單列。

### MenuItemExists(string menuPath)

```csharp
public static bool MenuItemExists(string menuPath)
```

指定路徑下目前是否註冊了選單項目。

## MenuServiceWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuServiceWrap`

對內部 `UnityEditor.MenuService` 類別的反射包裝。這些成員不是公開 API，因此 Unity 可能在任何版本重新命名或移除它們。

### SanitizeMenuItemName(string menuName)

```csharp
public static string SanitizeMenuItemName(string menuName)
```

執行 Unity 自己的選單路徑清理，讓執行階段加入的路徑能與 Unity 從 `MenuItem` 屬性註冊時完全相同。傳回 Unity 註冊該項目所用的路徑。

### ValidateMethodForMenuCommand(MethodInfo methodInfo)

```csharp
public static bool ValidateMethodForMenuCommand(MethodInfo methodInfo)
```

詢問 Unity 某個方法是否可作為選單命令，使用它套用於 `MenuItem` 方法的相同規則。

## EditorUtilityWrap

`io.github.ykysnk.utils.Editor` · `public static class EditorUtilityWrap`

對 `EditorUtility` 內部部分的反射包裝。該成員不是公開 API，因此 Unity 可能在任何版本重新命名或移除它。

### Internal_UpdateAllMenus

```csharp
public static readonly WrapAction Internal_UpdateAllMenus;
```

內部的 `EditorUtility.Internal_UpdateAllMenus` 方法，會讓 Unity 重建其選單。在執行階段加入選單項目後需要使用。

## MenuExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class MenuExtensions`

在編輯器重建選單時，讓執行階段加入的選單項目保持註冊。階層變更時，已不存在的項目會透過 `MenuWrap` 重新加入，接著執行
`EditorUtilityWrap.Internal_UpdateAllMenus`。

### AddMenuItem(MenuItemObject menuItemObject)

```csharp
public static bool AddMenuItem(MenuItemObject menuItemObject)
```

讓選單項目在選單重建後仍保持註冊。已有相同路徑的選單項目註冊時傳回 false。

```csharp
MenuExtensions.AddMenuItem(new MenuItemObject("Tools/My Tool/Do Something", "#%g", 1000, DoSomething));
```

### RemoveMenuItem(string name)

```csharp
public static MenuItemObject? RemoveMenuItem(string name)
```

停止讓指定路徑的選單項目保持註冊，並將其傳回。選單項目本身不會被移除；這只會防止它在重建後再次被加入。

## RequestExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class RequestExtensions`

把套件管理員要求轉成在編輯器迴圈完成的工作，讓等待中的程式碼能留在主執行緒。

### AsTask&lt;T&gt;(this T request)

```csharp
public static Task<T> AsTask<T>(this T request) where T : Request
```

等待套件管理員要求。要求會從 `EditorApplication.update` 輪詢，工作則稍後在 `EditorApplication.delayCall`
中完成，因此等待端的續行會以較淺的呼叫堆疊回到主執行緒。具體的要求型別會被保留，讓呼叫端可以讀取它的 `Result`。

### AsTask&lt;T&gt;(this T request, CancellationToken token)

```csharp
public static Task<T> AsTask<T>(this T request, CancellationToken token) where T : Request
```

與無參數多載相同，但會在權杖取消時停止等待。要求本身不會被取消，只是不再被觀察。

## TaskExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class TaskExtensions`

從 `EditorApplication.update` 輪詢工作並透過回呼回報結果，供無法使用 await 的呼叫端（例如檢視器與選單程式碼）使用。

### WaitEditor(this Task task, Action onCompleted, Action&lt;Exception&gt;? onError = null)

```csharp
public static void WaitEditor(this Task task, Action onCompleted, Action<Exception>? onError = null)
```

工作完成後在編輯器迴圈呼叫 `onCompleted`。失敗的工作會以它實際拋出的例外呼叫 `onError`（會拆開彙總包裝），取消的工作則以
`TaskCanceledException` 呼叫。`onError` 為 null 時失敗會被靜默忽略。

### WaitEditor&lt;T&gt;(this Task&lt;T&gt; task, Action&lt;T&gt; onCompleted, Action&lt;Exception&gt;? onError = null)

```csharp
public static void WaitEditor<T>(this Task<T> task, Action<T> onCompleted, Action<Exception>? onError = null)
```

與非泛型多載相同，但會把工作的結果傳給 `onCompleted`。
