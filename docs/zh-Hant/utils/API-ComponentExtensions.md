# ComponentExtensions

`io.github.ykysnk.utils.Extensions` · `public static class ComponentExtensions`

GameObject 與 Transform 輔助方法的元件版本。每個成員都轉送給元件所屬的 GameObject，因此元件型別無關緊要，結果與在 `component.gameObject` 上呼叫同名的 [`GameObjectExtensions`](./API-GameObjectExtensions.md) 成員相同。

## FullName

```csharp
public static string FullName(this Component component)
```

元件所屬 GameObject 的完整階層路徑，例如 `Root/Child/Name`，不含前置斜線。

```csharp
var path = someComponent.FullName();
```

## TryGetComponentAtIndex

```csharp
public static bool TryGetComponentAtIndex(this Component component, int index, out Component component2)
```

讀取所屬 GameObject 元件清單中指定索引處的元件，順序與 [`GetComponents`](#getcomponents) 傳回的相同。負數或超出末尾的索引會傳回 `false`，並把 `component2` 設為 `null`。

## GetComponentAtIndexOrDefault

```csharp
public static Component GetComponentAtIndexOrDefault(this Component component, int index)
```

所屬 GameObject 中該索引處的元件，索引超出範圍時為 `null`。

## GetComponents

```csharp
public static Component[] GetComponents(this Component component)
```

所屬 GameObject 的所有元件，依 GameObject 的元件順序排列。結果不依型別篩選，因此可能包含多個相同型別的元件。

## ComponentsForeach

```csharp
public static void ComponentsForeach(this Component component, Action<int, Component> componentAction)
```

對所屬 GameObject 的每個元件，以索引與元件為參數呼叫 `componentAction`。元件數量在迴圈前只讀取一次，因此在回呼內新增或銷毀的元件只影響剩餘的索引。定義 `COMPILER_UDONSHARP` 時不會編譯。

## ComponentsSelect

```csharp
public static T[] ComponentsSelect<T>(this Component component, Func<int, Component, T> selector)
```

把所屬 GameObject 的每個元件傳給 `selector`，並保持元件順序。陣列長度是迴圈前讀取的元件數量，因此在選擇子中新增或銷毀的元件只影響剩餘的索引。定義 `COMPILER_UDONSHARP` 時不會編譯。
