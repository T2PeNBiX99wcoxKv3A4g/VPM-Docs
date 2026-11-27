# MenuExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class MenuExtensions`

在編輯器重建選單期間，保持於執行階段加入的選單項目仍然註冊。

lilEditorToolbox 的 `MenuItemModifier` 在重建所有選單時，只會挑選帶有 `MenuItem` 屬性的方法，因此透過 `AddMenuItem` 加入的項目會消失。此類別標記了 `[InitializeOnLoad]` 並掛上 `EditorApplication.hierarchyChanged`；每次變更時，每個已不再註冊的追蹤項目會透過 [`MenuWrap`](./API-MenuWrap.md) 重新加入，接著由 [`EditorUtilityWrap`](./API-EditorUtilityWrap.md) 重建選單。由該修飾器註冊的項目不會被更動。

## AddMenuItem

```csharp
public static bool AddMenuItem(MenuItemObject menuItemObject)
```

讓選單項目在選單重建之間保持註冊。項目的 `Name` 同時是選單路徑與鍵。相同路徑的選單項目已在追蹤時傳回 `false`。

```csharp
MenuExtensions.AddMenuItem(new MenuItemObject("Tools/My Tool/Do Something", "#%g", 1000, DoSomething));
```

## RemoveMenuItem

```csharp
public static MenuItemObject? RemoveMenuItem(string name)
```

不再讓指定路徑的選單項目保持註冊並傳回該項目；該路徑沒有追蹤任何項目時傳回 `null`。選單項目本身不會被移除；這只會阻止它在重建後再次被加入。
