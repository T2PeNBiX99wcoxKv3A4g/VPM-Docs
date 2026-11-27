# ListExtensions

`io.github.ykysnk.utils.Extensions` · `public static class ListExtensions`

リスト、配列、その他のコレクション向けの、境界チェック付きインデックスアクセスとその場での編集ヘルパーです。

## TryGetValue

```csharp
public static bool TryGetValue<T>(this IList<T> list, int index, out T value)
public static bool TryGetValue<T>(this T[] array, int index, out T value)
```

例外を投げずに指定インデックスの要素を読みます。負の値や末尾を超えるインデックスは `false` を返し、`value` を `default(T)` にします。`IList<T>` のオーバーロードは `Count`、配列のオーバーロードは `Length` を境界にします。配列のオーバーロードは制約を宣言していないため任意の要素型の配列に使え、配列のレシーバーでは配列が `T[]` へ恒等変換されるためこちらが選ばれます。

```csharp
if (frames.TryGetValue(0, out var first)) Use(first);
```

## GetValueOrDefault

```csharp
public static T GetValueOrDefault<T>(this IList<T> list, int index)
public static T GetValueOrDefault<T>(this T[] array, int index)
```

指定インデックスの要素、またはインデックスが範囲外のときは例外ではなく `default(T)` です。どちらのオーバーロードも対応する [`TryGetValue`](#trygetvalue) に転送します。

## TrySetValue

```csharp
public static bool TrySetValue<T>(this IList<T> list, int index, T value)
public static bool TrySetValue<T>(this T[] array, int index, T value)
```

例外を投げずに指定インデックスの要素を上書きします。範囲外のインデックスはコレクションを変更せず `false` を返し、有効なインデックスはインデクサー経由で書き込んで `true` を返します。読み取り専用のリストはインデクサーが例外を投げ、配列のオーバーロードは配列をその場で変更します。

## Rebuild

```csharp
public static void Rebuild<T>(this ICollection<T> collection)
public static void Rebuild<T>(this ICollection<T> collection, Func<T, bool> removeAll)
```

重複をその場で取り除き、各値の最初の出現と残りの相対順序を保ちます（既定の等値比較子）。コレクションをクリアして詰め直すため `Clear` と `Add` が必要で、呼び出し前に開始した列挙は無効になります。配列など固定長のコレクションは例外になります。2 つ目のオーバーロードは、まず `removeAll` が true を返す要素を落としてから、引数なしのオーバーロードと同じく重複を取り除きます。

## AddRange

```csharp
public static void AddRange<T>(this ICollection<T> collection, IEnumerable<T> items)
```

`ICollection<T>` 自体には一括追加が無いため、項目を 1 つずつ追加します。空のシーケンスは何もしません。

## RemoveAll

```csharp
public static void RemoveAll<T>(this ICollection<T> collection, Func<T, bool> match)
```

一致する要素をすべて取り除きます。一致した要素はまず一時リストに集めるため、変更中にコレクションを列挙することはなく、一致ごとに等値で 1 回削除します。
