# MenuServiceWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuServiceWrap`

内部クラス `UnityEditor.MenuService` へのリフレクションラッパーです。

ラップしているメンバーは文書化されていない Unity エディタの内部実装であり公開 API ではないため、Unity はどのバージョンでも名前を変えたり削除したりできます。メンバーがなくなった場合、呼び出しは `MissingMethodException` を投げます。

## SanitizeMenuItemName

```csharp
public static string SanitizeMenuItemName(string menuName)
```

Unity 自身のメニューパスの後処理を実行するので、実行時に追加したパスは、Unity が `MenuItem` 属性から登録するのとまったく同じように登録されます。Unity が項目を登録するパスを返します。これは [`MenuItemObject`](./API-MenuItemObject.md) が `Name` として保持するパスです。

## ValidateMethodForMenuCommand

```csharp
public static bool ValidateMethodForMenuCommand(MethodInfo methodInfo)
```

メソッドがメニューコマンドとして使えるかを、Unity が `MenuItem` メソッドに適用するのと同じ規則で問い合わせます。
