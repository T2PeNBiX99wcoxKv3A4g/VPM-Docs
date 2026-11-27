# LocalizationExtensions

`io.github.ykysnk.Localization.Editor` · `public static class LocalizationExtensions`

エディタ UI 用の糖衣構文です: `"label.some_key".S()`、`tree.UILocalize()` など。ヘルパーは呼び出しを行うアセンブリの `LocalizationPackageAttribute` から取得します。パッケージはその属性を一度宣言するだけでよく、専用のラッパークラスは不要です。

各メソッドには `[MethodImpl(MethodImplOptions.NoInlining)]` が付いており、以下のシグネチャにもそのまま示しています。呼び出しがインライン化されると `Assembly.GetCallingAssembly` は利用側ではなくこのアセンブリを返すためです。ローカライゼーションを選ぶのはこのアセンブリです。

## S

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static string S(this string key)
[MethodImpl(MethodImplOptions.NoInlining)]
public static string S(this SerializedProperty property)
```

呼び出し元アセンブリのローカライゼーションでの `key` のテキストです。フォールバックは `LocalizationHelper.S` と同じで、選択中の言語、英語、キー自身の順に試すため、翻訳が無くても例外にはなりません。`SerializedProperty` のオーバーロードは、対象の型名とフィールド名から `label.{Type}.{field}` を組み立てます。どちらもローワースネークケースに変換されるため、`MyWindow` の `displayName` フィールドは `label.my_window.display_name` になります。

```csharp
label.text = "label.my_window.title".S();
```

## Sf

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static string Sf(this string key, params object?[] args)
```

`key` のテキストを `string.Format` に通したものです。引数に合わない書式文字列は例外にせず、`text(arg1, arg2)` の形で返します。

```csharp
label.text = "label.found_count".Sf(count);
```

## G

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static GUIContent G(this string key)
[MethodImpl(MethodImplOptions.NoInlining)]
public static GUIContent G(this SerializedProperty property)
```

`key` のテキストと、`key + ":tooltip"` に保存された項目をツールチップに持つ `GUIContent` です。ツールチップが無い場合は空になります。`SerializedProperty` のオーバーロードは、そこから導出したキーを使います。`GUIContent` はローカライゼーション ID とキーごとに 1 つキャッシュされ、呼び出しのたびに書き換えられるため、言語変更だけでは更新されず、次の `G` 呼び出しで最新になります。

```csharp
GUILayout.Label("label.my_window.title".G());
```

## Tooltip

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static string Tooltip(this string key)
[MethodImpl(MethodImplOptions.NoInlining)]
public static string Tooltip(this SerializedProperty property)
```

`key` のツールチップ、つまり `:tooltip` 接尾辞付きで保存された項目です。項目が無い場合は `S` と同じフォールバックになり、`Tooltip("label.foo")` は何も保存されていなければ `label.foo:tooltip` を返します。`SerializedProperty` のオーバーロードは導出したキーを引き、無い場合は空文字列を返します。

## UILocalize

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static void UILocalize(this VisualElement element, bool addLanguagePopup = true, int spaceHeight = 8)
```

`element` のツリー内のキーを翻訳で置き換え、最新の状態に保ちます。ツリーをバインドする前に呼んでください。ツリーは即座にローカライズされるためキーが画面に出ることはなく、バインドがキーを戻す可能性があるためバインド処理の後にもう一度実行されます。`addLanguagePopup` を指定すると `spaceHeight` の隙間の下に言語選択が追加され、要素がパネルから外れると登録は破棄されます。読み取る属性、スキップされる要素、2 回目のパスについては [`LocalizationHelper`](./API-LocalizationHelper.md) を参照してください。

```csharp
root.UILocalize();
```

## Register

```csharp
[MethodImpl(MethodImplOptions.NoInlining)]
public static UpdateHelper Register(this string localizeKey, UpdateHelper.Callback callback)
[MethodImpl(MethodImplOptions.NoInlining)]
public static UpdateHelper Register(this SerializedProperty property, UpdateHelper.Callback callback)
```

`localizeKey` に `callback` を登録し、解除するためのハンドルを返します。コールバックはラベルと `:tooltip` のテキストを受け取り、次の言語変更または再読み込みのときに実行されます（`Register` の中では実行されません）。更新対象の要素が消えるときにハンドルを破棄してください。`SerializedProperty` のオーバーロードは、そこから導出したキーを登録します。
