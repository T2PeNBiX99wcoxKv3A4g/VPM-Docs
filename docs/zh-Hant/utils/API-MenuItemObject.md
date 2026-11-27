# MenuItemObject

`io.github.ykysnk.utils.Editor` · `public class MenuItemObject`

由 [`MenuExtensions`](./API-MenuExtensions.md) 保持註冊的選單項目描述：選單路徑、快速鍵、勾選狀態、排序優先順序，以及 Unity 所需的回呼。

每個建構函式都會用 [`MenuServiceWrap`](./API-MenuServiceWrap.md) 清理名稱，因此在執行階段加入的項目，會與以 `MenuItem` 屬性宣告的項目註冊在同一路徑下。`Name` 保存清理後的路徑，也是追蹤該項目所用的鍵。

## Constructors

```csharp
public MenuItemObject(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
public MenuItemObject(string name, string shortcut, int priority, Action execute)
public MenuItemObject(string name, int priority, Action execute)
public MenuItemObject(string name, Action execute)
```

第一個形式接受所有欄位：`shortcut` 可以是空字串，`validate` 決定該項目是否可用，`null` 表示始終可用。較短的形式會填入預設值：不勾選、沒有快速鍵（`""`）、沒有驗證回呼，且都會轉呼叫完整形式。

最後一個形式沒有 `priority` 參數，會依項目種類選擇預設值：路徑以 `GameObject/Create Other` 開頭時為 10，其他路徑為 1000，與 Unity 自身的排序一致。

```csharp
MenuExtensions.AddMenuItem(new MenuItemObject("Tools/My Tool/Do Something", "#%g", 1000, DoSomething));
```

## Name

```csharp
public string Name { get; private set; }
```

清理後的選單路徑；這是追蹤該項目所用的鍵，因此可能與傳入建構函式的字串不同。

## Shortcut

```csharp
public string Shortcut { get; private set; }
```

傳給 Unity 的快速鍵字串，例如 `#%g`；沒有快速鍵時為空。

## Checked

```csharp
public bool Checked { get; private set; }
```

Unity 是否以勾選標記繪製該項目。

## Priority

```csharp
public int Priority { get; private set; }
```

子選單內的排序順序；較小的值先繪製。

## Execute

```csharp
public Action Execute { get; private set; }
```

選擇該項目時執行的動作。

## Validate

```csharp
public Func<bool>? Validate { get; private set; }
```

決定該項目是否可用的述詞；始終可用時為 `null`。
