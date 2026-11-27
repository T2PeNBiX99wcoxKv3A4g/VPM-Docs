# EditorUtilityWrap

`io.github.ykysnk.utils.Editor` · `public static class EditorUtilityWrap`

`EditorUtility` の内部部分へのリフレクションラッパーです。

ラップしているメンバーは文書化されていない Unity エディタの内部実装であり公開 API ではないため、Unity はどのバージョンでも名前を変えたり削除したりできます。静的フィールドの初期化時に一度だけ解決されるので、メンバーが存在しない場合は呼び出しのたびではなくそこで失敗します。

## Internal_UpdateAllMenus

```csharp
public static readonly WrapAction Internal_UpdateAllMenus;
```

内部メソッド `EditorUtility.Internal_UpdateAllMenus` を引数なしの `WrapAction` として束縛したもので、Unity にメニューを再構築させます。[`MenuExtensions`](./API-MenuExtensions.md) は登録を維持している項目を追加し直した後にこれを呼び、実行時にメニュー項目を追加した後にも必要です。

```csharp
EditorUtilityWrap.Internal_UpdateAllMenus();
```
