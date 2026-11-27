# MenuItemObject

`io.github.ykysnk.utils.Editor` · `public class MenuItemObject`

[`MenuExtensions`](./API-MenuExtensions.md) が登録を維持するメニュー項目の記述です。メニューパス、ショートカット、チェック状態、並び順の優先度、そして Unity が必要とするコールバックを持ちます。

どのコンストラクターも [`MenuServiceWrap`](./API-MenuServiceWrap.md) で名前をサニタイズするため、実行時に追加した項目は `MenuItem` 属性で宣言した項目と同じパスの下に登録されます。`Name` はそのサニタイズ後のパスを保持し、項目を追跡するキーになります。

## Constructors

```csharp
public MenuItemObject(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
public MenuItemObject(string name, string shortcut, int priority, Action execute)
public MenuItemObject(string name, int priority, Action execute)
public MenuItemObject(string name, Action execute)
```

最初の形式はすべてのフィールドを受け取ります。`shortcut` は空文字列でもよく、`validate` は項目を有効にするかを決め、`null` は常に有効を意味します。短い形式は既定値を補います。チェックなし、ショートカットなし（`""`）、検証コールバックなしで、いずれも完全な形式に転送されます。

最後の形式には `priority` 引数がなく、その種類の既定値を選びます。パスが `GameObject/Create Other` で始まる場合は 10、それ以外は 1000 で、Unity 自身の並び順に合わせています。

```csharp
MenuExtensions.AddMenuItem(new MenuItemObject("Tools/My Tool/Do Something", "#%g", 1000, DoSomething));
```

## Name

```csharp
public string Name { get; private set; }
```

サニタイズ後のメニューパス。項目を追跡するキーなので、コンストラクターに渡した文字列とは異なることがあります。

## Shortcut

```csharp
public string Shortcut { get; private set; }
```

Unity に渡すショートカット文字列（例: `#%g`）。ない場合は空です。

## Checked

```csharp
public bool Checked { get; private set; }
```

Unity が項目をチェックマーク付きで描画するかどうか。

## Priority

```csharp
public int Priority { get; private set; }
```

サブメニュー内の並び順。値が小さいほど先に描画されます。

## Execute

```csharp
public Action Execute { get; private set; }
```

項目が選ばれたときに実行されるアクション。

## Validate

```csharp
public Func<bool>? Validate { get; private set; }
```

項目を有効にするかを決める述語。常に有効な場合は `null` です。
