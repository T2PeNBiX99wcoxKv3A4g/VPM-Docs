# MenuServiceWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuServiceWrap`

對內部 `UnityEditor.MenuService` 類別的反射包裝。

被包裝的成員是未文件化的 Unity 編輯器內部實作，並非公開 API，因此 Unity 可能在任何版本中重新命名或移除它們；若成員已不存在，呼叫會拋出 `MissingMethodException`。

## SanitizeMenuItemName

```csharp
public static string SanitizeMenuItemName(string menuName)
```

執行 Unity 自己的選單路徑清理，因此在執行階段加入的路徑，會以 Unity 從 `MenuItem` 屬性註冊時的完全相同方式註冊。傳回 Unity 註冊該項目所用的路徑，也就是 [`MenuItemObject`](./API-MenuItemObject.md) 保存為 `Name` 的路徑。

## ValidateMethodForMenuCommand

```csharp
public static bool ValidateMethodForMenuCommand(MethodInfo methodInfo)
```

以 Unity 套用於 `MenuItem` 方法的相同規則，詢問 Unity 某個方法能否作為選單命令使用。
