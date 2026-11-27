# EditorUtilityWrap

`io.github.ykysnk.utils.Editor` · `public static class EditorUtilityWrap`

對 `EditorUtility` 內部部分的反射包裝。

被包裝的成員是未文件化的 Unity 編輯器內部實作，並非公開 API，因此 Unity 可能在任何版本中重新命名或移除它。它會在靜態欄位初始化時解析一次，因此成員不存在時會在那裡失敗，而不是每次呼叫才失敗。

## Internal_UpdateAllMenus

```csharp
public static readonly WrapAction Internal_UpdateAllMenus;
```

內部的 `EditorUtility.Internal_UpdateAllMenus` 方法，繫結為無參數的 `WrapAction`，會讓 Unity 重建其選單。[`MenuExtensions`](./API-MenuExtensions.md) 在重新加入它所保持註冊的項目之後會呼叫它，而在執行階段加入選單項目之後也需要它。

```csharp
EditorUtilityWrap.Internal_UpdateAllMenus();
```
