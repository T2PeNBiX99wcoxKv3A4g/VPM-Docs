# TranslateClipboard

`io.github.ykysnk.Localization.Editor` · `public static class TranslateClipboard`

翻訳項目のクリップボード処理で、インスペクターと行の描画で共有されます。コピーされた項目は [`BasicTranslate`](./API-BasicTranslate.md) の JSON 形式で、`JsonUtility` で読み戻します。そのためボタンは行に触れる前に貼り付けが可能かどうかを判断できます。

## HasEntry

```csharp
public static bool HasEntry()
```

クリップボードに現在翻訳項目が入っているかどうか。結果はクリップボードのテキストに対してキャッシュされるため、ボタンが頻繁に問い合わせても JSON を解析し直しません。テキストが変わったときだけ計算し直します。

## TryRead

```csharp
public static bool TryRead([NotNullWhen(true)] out BasicTranslate? basicTranslate, out Exception? exception)
```

クリップボードから `BasicTranslate` を読み取ろうとします。テキストは JSON として解析でき、空でない `key` を持つ必要があります。そのため、空のクリップボードや無関係な JSON オブジェクトは、行を空の値で上書きしないよう拒否されます。`JsonUtility` はフィールド初期化子を実行するため、JSON が省略した `translate` は常に空になり、翻訳項目と他の JSON オブジェクトを区別できるのはキーだけです。

メソッドが true を返したとき `basicTranslate` は解析された項目、それ以外は null です。`exception` は解析または検証のエラーで、クリップボードが単に空だった場合は null です。

```csharp
if (TranslateClipboard.TryRead(out var entry, out var error))
    Paste(entry);
else if (error != null)
    Debug.LogWarning(error.Message);
```
