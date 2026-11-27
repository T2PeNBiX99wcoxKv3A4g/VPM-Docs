# MenuExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class MenuExtensions`

エディタがメニューを再構築する間も、実行時に追加されたメニュー項目の登録を維持します。

lilEditorToolbox の `MenuItemModifier` はすべてのメニューを再構築するとき、`MenuItem` 属性を持つメソッドしか拾わないため、`AddMenuItem` で追加した項目は消えてしまいます。このクラスには `[InitializeOnLoad]` が付き、`EditorApplication.hierarchyChanged` にフックします。変更のたびに、登録されなくなった追跡対象の項目が [`MenuWrap`](./API-MenuWrap.md) 経由で追加し直され、その後 [`EditorUtilityWrap`](./API-EditorUtilityWrap.md) がメニューを再構築します。この修飾子が登録した項目には触れません。

## AddMenuItem

```csharp
public static bool AddMenuItem(MenuItemObject menuItemObject)
```

メニューの再構築をまたいでメニュー項目の登録を維持します。項目の `Name` がメニューパスとキーの両方になります。同じパスのメニュー項目がすでに追跡されている場合は `false` を返します。

```csharp
MenuExtensions.AddMenuItem(new MenuItemObject("Tools/My Tool/Do Something", "#%g", 1000, DoSomething));
```

## RemoveMenuItem

```csharp
public static MenuItemObject? RemoveMenuItem(string name)
```

指定したパスのメニュー項目の登録維持をやめ、その項目を返します。そのパスに追跡中の項目がない場合は `null` を返します。メニューの項目自体は削除されません。再構築後に再追加されないようにするだけです。
