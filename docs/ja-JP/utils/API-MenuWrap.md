# MenuWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuWrap`

エディタのメニューバーを支える `UnityEditor.Menu` の内部部分へのリフレクションラッパーです。

ラップしているメンバーは文書化されていない Unity エディタの内部実装であり公開 API ではないため、Unity はどのバージョンでも名前を変えたり削除したりできます。このラッパーがあることで、実行時にメニュー項目を追加、変更、削除できます。メンバーがなくなった場合、呼び出しは黙って失敗するのではなく `MissingMethodException` を投げます。

## SetHotkey

```csharp
public static void SetHotkey(string menuPath, string hotkey)
```

既存のメニュー項目の隣に表示されるショートカットを代入します。`menuPath` は項目の完全なパス（例: `Tools/My Tool/Item`）、`hotkey` は `#%g` のような文字列です。

## ExtractSubmenus

```csharp
public static string[] ExtractSubmenus(string menuPath)
```

指定したパス（例: `Tools`）の下に存在するサブメニューを一覧します。ない場合は空です。

## AddMenuItem

```csharp
public static void AddMenuItem(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
```

`MenuItem` 属性なしでメニュー項目を実行時に登録します。`shortcut` は空文字列でもよく、`priority` は親メニュー内の順序を決め（小さいほど先）、`validate` は項目を有効にするかを決め、`null` は常に有効を意味します。

## AddSeparator

```csharp
public static void AddSeparator(string name, int priority)
```

指定したパスと優先度に区切り線の項目を追加します。

## RemoveMenuItem

```csharp
public static void RemoveMenuItem(string name)
```

指定したパスで登録されたメニュー項目を削除します。パスが存在するかわからない場合は [`MenuItemExists`](#menuitemexists) を先に使います。

## RebuildAllMenus

```csharp
public static void RebuildAllMenus()
```

登録済みの項目からメニューバー全体を再構築します。

## MenuItemExists

```csharp
public static bool MenuItemExists(string menuPath)
```

指定したパスにメニュー項目が現在登録されているかどうか。
