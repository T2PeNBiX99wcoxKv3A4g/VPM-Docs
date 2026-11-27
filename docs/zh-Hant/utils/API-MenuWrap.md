# MenuWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuWrap`

對編輯器選單列背後 `UnityEditor.Menu` 內部部分的反射包裝。

被包裝的成員是未文件化的 Unity 編輯器內部實作，並非公開 API，因此 Unity 可能在任何版本中重新命名或移除它們。正是這個包裝讓選單項目能在執行階段被加入、變更與移除；若成員消失，呼叫會拋出 `MissingMethodException`，而不是默默失敗。

## SetHotkey

```csharp
public static void SetHotkey(string menuPath, string hotkey)
```

設定顯示在現有選單項目旁的快速鍵。`menuPath` 是該項目的完整路徑，例如 `Tools/My Tool/Item`，`hotkey` 則是 `#%g` 之類的字串。

## ExtractSubmenus

```csharp
public static string[] ExtractSubmenus(string menuPath)
```

列出指定路徑（例如 `Tools`）下存在的子選單；沒有子選單時為空。

## AddMenuItem

```csharp
public static void AddMenuItem(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
```

在執行階段註冊選單項目，無需 `MenuItem` 屬性。`shortcut` 可以是空字串，`priority` 決定父選單內的順序（較小者在前），`validate` 決定該項目是否可用，`null` 表示始終可用。

## AddSeparator

```csharp
public static void AddSeparator(string name, int priority)
```

在指定的路徑與優先順序加入分隔線項目。

## RemoveMenuItem

```csharp
public static void RemoveMenuItem(string name)
```

移除在指定路徑下註冊的選單項目。若不確定路徑是否存在，請先使用 [`MenuItemExists`](#menuitemexists)。

## RebuildAllMenus

```csharp
public static void RebuildAllMenus()
```

由已註冊的項目重建整個選單列。

## MenuItemExists

```csharp
public static bool MenuItemExists(string menuPath)
```

指定路徑下目前是否註冊了選單項目。
