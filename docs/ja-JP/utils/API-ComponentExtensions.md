# ComponentExtensions

`io.github.ykysnk.utils.Extensions` · `public static class ComponentExtensions`

GameObject と Transform のヘルパーのコンポーネント版です。すべてのメンバーはコンポーネントが属する GameObject に転送するため、コンポーネントの型は関係なく、結果は `component.gameObject` で同じ名前の [`GameObjectExtensions`](./API-GameObjectExtensions.md) メンバーを呼んだ場合と同じです。

## FullName

```csharp
public static string FullName(this Component component)
```

コンポーネントが属する GameObject の完全な階層パスです（例: `Root/Child/Name`）。先頭にスラッシュは付きません。

```csharp
var path = someComponent.FullName();
```

## TryGetComponentAtIndex

```csharp
public static bool TryGetComponentAtIndex(this Component component, int index, out Component component2)
```

コンポーネントが属する GameObject のコンポーネント一覧の指定インデックスを読みます。順序は [`GetComponents`](#getcomponents) が返すものと同じです。負の値や末尾を超えるインデックスは `false` を返し、`component2` を `null` にします。

## GetComponentAtIndexOrDefault

```csharp
public static Component GetComponentAtIndexOrDefault(this Component component, int index)
```

コンポーネントが属する GameObject のそのインデックスのコンポーネント、またはインデックスが範囲外のときは `null` です。

## GetComponents

```csharp
public static Component[] GetComponents(this Component component)
```

コンポーネントが属する GameObject のすべてのコンポーネントを、GameObject のコンポーネント順で返します。型で絞り込まないため、同じ型のコンポーネントが複数含まれることがあります。

## ComponentsForeach

```csharp
public static void ComponentsForeach(this Component component, Action<int, Component> componentAction)
```

コンポーネントが属する GameObject のすべてのコンポーネントについて、インデックスとコンポーネントを引数に `componentAction` を呼びます。コンポーネント数はループの前に一度だけ読むため、コールバック内で追加・破棄されたコンポーネントは残りのインデックスにだけ影響します。`COMPILER_UDONSHARP` が定義されているときはコンパイルされません。

## ComponentsSelect

```csharp
public static T[] ComponentsSelect<T>(this Component component, Func<int, Component, T> selector)
```

コンポーネントが属する GameObject のすべてのコンポーネントを `selector` に通し、コンポーネント順を保ちます。配列の長さはループの前に読んだコンポーネント数なので、セレクター内で追加・破棄されたコンポーネントは残りのインデックスにだけ影響します。`COMPILER_UDONSHARP` が定義されているときはコンパイルされません。
