# メニューと拡張

## MenuItemObject

`io.github.ykysnk.utils.Editor` · `public class MenuItemObject`

`MenuExtensions` が登録を維持するメニュー項目の記述です。パス、ショートカット、チェック状態、並び順の優先度、そして Unity が
必要とするコールバックを持ちます。

### MenuItemObject(string name, string shortcut, bool @checked, int priority, Action execute, Func&lt;bool&gt;? validate)

```csharp
public MenuItemObject(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
```

メニュー項目の完全な記述を作成します。`name` はメニューパスで、Unity が属性で宣言されたパスをサニタイズするのと同じ方法で
サニタイズされるため、どちらの種類の項目も同じパスの下に並びます。`validate` は項目を有効にするかを決め、null は常に有効を
意味します。

### MenuItemObject(string name, string shortcut, int priority, Action execute)

```csharp
public MenuItemObject(string name, string shortcut, int priority, Action execute)
```

チェックなしで、検証コールバックのないメニュー項目を作成します。

### MenuItemObject(string name, int priority, Action execute)

```csharp
public MenuItemObject(string name, int priority, Action execute)
```

チェックなしで、ショートカットも検証コールバックもないメニュー項目を作成します。

### MenuItemObject(string name, Action execute)

```csharp
public MenuItemObject(string name, Action execute)
```

その種類の既定の優先度でメニュー項目を作成します。`GameObject/Create Other` の下では 10、それ以外では 1000 で、Unity 自身の
並び順に合わせています。

### Name

```csharp
public string Name { get; private set; }
```

サニタイズ後のメニューパス。項目を追跡するキーになります。

### Shortcut

```csharp
public string Shortcut { get; private set; }
```

Unity に渡すショートカット文字列（例: `#%g`）。ない場合は空です。

### Checked

```csharp
public bool Checked { get; private set; }
```

Unity が項目をチェックマーク付きで描画するかどうか。

### Priority

```csharp
public int Priority { get; private set; }
```

サブメニュー内の並び順。値が小さいほど先に描画されます。

### Execute

```csharp
public Action Execute { get; private set; }
```

項目が選ばれたときに実行されるアクション。

### Validate

```csharp
public Func<bool>? Validate { get; private set; }
```

項目を有効にするかを決める述語。常に有効な場合は null。

## MenuWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuWrap`

エディタのメニューバーを支えるクラス `UnityEditor.Menu` の内部部分へのリフレクションラッパーです。それらのメンバーは文書化されて
いないエディタ内部実装であり公開 API ではないため、Unity はどのバージョンでも名前を変えたり削除したりできます。このラッパーが
あることで、実行時にメニュー項目を追加、変更、削除できます。

### SetHotkey(string menuPath, string hotkey)

```csharp
public static void SetHotkey(string menuPath, string hotkey)
```

既存のメニュー項目の隣に表示されるショートカットを代入します。

### ExtractSubmenus(string menuPath)

```csharp
public static string[] ExtractSubmenus(string menuPath)
```

指定したパスの下に存在するサブメニューを一覧します。ない場合は空です。

### AddMenuItem(string name, string shortcut, bool @checked, int priority, Action execute, Func&lt;bool&gt;? validate)

```csharp
public static void AddMenuItem(string name, string shortcut, bool @checked, int priority, Action execute,
    Func<bool>? validate)
```

`MenuItem` 属性なしでメニュー項目を実行時に登録します。

### AddSeparator(string name, int priority)

```csharp
public static void AddSeparator(string name, int priority)
```

指定したパスと優先度に区切り線の項目を追加します。

### RemoveMenuItem(string name)

```csharp
public static void RemoveMenuItem(string name)
```

指定したパスで登録されたメニュー項目を削除します。

### RebuildAllMenus()

```csharp
public static void RebuildAllMenus()
```

登録済みの項目からメニューバー全体を再構築します。

### MenuItemExists(string menuPath)

```csharp
public static bool MenuItemExists(string menuPath)
```

指定したパスにメニュー項目が現在登録されているかどうか。

## MenuServiceWrap

`io.github.ykysnk.utils.Editor` · `public static class MenuServiceWrap`

内部クラス `UnityEditor.MenuService` へのリフレクションラッパーです。これらのメンバーは公開 API ではないため、Unity はどの
バージョンでも名前を変えたり削除したりできます。

### SanitizeMenuItemName(string menuName)

```csharp
public static string SanitizeMenuItemName(string menuName)
```

Unity 自身のメニューパスの後処理を実行するので、実行時に追加したパスは、Unity が `MenuItem` 属性から登録するのとまったく同じように
登録されます。Unity が項目を登録するパスを返します。

### ValidateMethodForMenuCommand(MethodInfo methodInfo)

```csharp
public static bool ValidateMethodForMenuCommand(MethodInfo methodInfo)
```

メソッドがメニューコマンドとして使えるかを、Unity が `MenuItem` メソッドに適用するのと同じ規則で問い合わせます。

## EditorUtilityWrap

`io.github.ykysnk.utils.Editor` · `public static class EditorUtilityWrap`

`EditorUtility` の内部部分へのリフレクションラッパーです。そのメンバーは公開 API ではないため、Unity はどのバージョンでも名前を
変えたり削除したりできます。

### Internal_UpdateAllMenus

```csharp
public static readonly WrapAction Internal_UpdateAllMenus;
```

内部メソッド `EditorUtility.Internal_UpdateAllMenus`。Unity にメニューを再構築させます。実行時にメニュー項目を追加した後に必要です。

## MenuExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class MenuExtensions`

エディタがメニューを再構築する間も、実行時に追加されたメニュー項目の登録を維持します。ヒエラルキーが変わると、失われた項目が
`MenuWrap` 経由で追加し直され、その後 `EditorUtilityWrap.Internal_UpdateAllMenus` が実行されます。

### AddMenuItem(MenuItemObject menuItemObject)

```csharp
public static bool AddMenuItem(MenuItemObject menuItemObject)
```

メニューの再構築をまたいでメニュー項目の登録を維持します。同じパスのメニュー項目がすでに登録されている場合は false を返します。

```csharp
MenuExtensions.AddMenuItem(new MenuItemObject("Tools/My Tool/Do Something", "#%g", 1000, DoSomething));
```

### RemoveMenuItem(string name)

```csharp
public static MenuItemObject? RemoveMenuItem(string name)
```

指定したパスのメニュー項目の登録維持をやめ、その項目を返します。メニューの項目自体は削除されません。再構築後に再追加されない
ようにするだけです。

## RequestExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class RequestExtensions`

パッケージマネージャーのリクエストを、エディタループ上で完了するタスクに変換するので、await するコードはメインスレッドに
留まれます。

### AsTask&lt;T&gt;(this T request)

```csharp
public static Task<T> AsTask<T>(this T request) where T : Request
```

パッケージマネージャーのリクエストを await します。リクエストは `EditorApplication.update` からポーリングされ、タスクは後で
`EditorApplication.delayCall` から完了するため、await の継続は浅いコールスタックでメインスレッド上に再開します。具体的な
リクエスト型が保持されるので、呼び出し側はその `Result` を読めます。

### AsTask&lt;T&gt;(this T request, CancellationToken token)

```csharp
public static Task<T> AsTask<T>(this T request, CancellationToken token) where T : Request
```

引数なしのオーバーロードと同じですが、トークンがキャンセルされたときに待機を止めます。リクエスト自体はキャンセルされず、
監視が止まるだけです。

## TaskExtensions

`io.github.ykysnk.utils.Editor.Extensions` · `public static class TaskExtensions`

`EditorApplication.update` からタスクをポーリングし、結果をコールバックで報告します。await できない呼び出し元（インスペクターや
メニューのコードなど）向けです。

### WaitEditor(this Task task, Action onCompleted, Action&lt;Exception&gt;? onError = null)

```csharp
public static void WaitEditor(this Task task, Action onCompleted, Action<Exception>? onError = null)
```

タスクが終わったらエディタループ上で `onCompleted` を呼びます。失敗したタスクは実際に投げた例外で（集約ラッパーは外されます）、
キャンセルされたタスクは `TaskCanceledException` で `onError` を呼びます。`onError` が null の場合、失敗は黙って無視されます。

### WaitEditor&lt;T&gt;(this Task&lt;T&gt; task, Action&lt;T&gt; onCompleted, Action&lt;Exception&gt;? onError = null)

```csharp
public static void WaitEditor<T>(this Task<T> task, Action<T> onCompleted, Action<Exception>? onError = null)
```

非ジェネリックのオーバーロードと同じですが、タスクの結果を `onCompleted` に渡します。
