# UpmInstaller

`io.github.ykysnk.utils.Editor` · `public static class UpmInstaller`

エディタコードから Unity Package Manager のパッケージをインストール、削除、更新します。

各操作はキャンセルボタン付きの固定プログレスバーを表示し、ボタンで操作を停止できます。ただしエディタがコンパイル中または更新中のときはボタンは何もしません。インストール、削除、アップグレードは 1 つのロックを共有するため、同時に実行されるのは 1 つだけです。2 回目の呼び出しは何もせずに戻ります。

## Install

```csharp
public static void Install(string[] packages)
```

指定したパッケージのインストールを開始し、すぐに戻ります。タスクは破棄されるため、結果はログにだけ残ります。要素は `name` または `name@version` です。

```csharp
UpmInstaller.Install(new[] { "io.github.ykysnk.localization@0.11.0" });
```

## InstallAsync

```csharp
public static Task InstallAsync(string[] packages)
public static Task InstallAsync(string[] packages, CancellationToken token)
```

指定したパッケージをインストールし、すべての要素がインストールまたはスキップされたときに完了します。引数なしのオーバーロードは `CancellationToken.None` を渡します。

各要素は `@` で分割されます。要求されたバージョンですでにインストール済みの要素はスキップされ、`name` だけを指定して任意のバージョンがインストール済みの場合も同様です。どちらもログに記録され、プログレスバーに表示されます。失敗した要素は `Utils.LogError` で記録され、残りの要素は引き続き処理されます。

`token` をキャンセルすると（またはキャンセルボタンを押すと）例外を投げずに操作が止まり、プログレスバーはキャンセルとして閉じます。

## Remove

```csharp
public static void Remove(string[] packages)
```

指定したパッケージの削除を開始し、すぐに戻ります。

## RemoveAsync

```csharp
public static Task RemoveAsync(string[] packages)
public static Task RemoveAsync(string[] packages, CancellationToken token)
```

指定したパッケージ名を削除し、すべての処理が終わったときに完了します。失敗したパッケージはログに記録され、残りは引き続き処理されます。`token` をキャンセルすると例外を投げずに操作が止まり、プログレスバーはキャンセルとして閉じます。共有ロックはここでも適用されます。

## UpdateAsync

```csharp
public static Task<string[]> UpdateAsync()
public static Task<string[]> UpdateAsync(CancellationToken token)
```

レジストリからインストールされたパッケージを照合し、新しいバージョンがあるものについて `name@version` 形式の要素を返します。古いものがなければ空の配列を返します。

組み込み・埋め込み・ローカルのパッケージはレジストリに更新がないため、まったく検索しません。残りの検索は最大 16 個まで同時に実行します。1 つの検索には 5 秒の上限があり、それを超えた検索はタイムアウトとして記録され、次のパッケージに移ります。失敗した検索や結果が空の検索も同じように記録されます。

結果は `StringComparer.Ordinal` で並べ替えられます。トークンはチェックを止めますが、実行中の検索は中断しません。失敗前に見つかった要素はそのまま返されます。これは単なる確認であり、インストールのロックは取得しません。

## Upgrade

```csharp
public static void Upgrade()
```

更新を確認してインストールを開始し、すぐに戻ります。

## UpgradeAsync

```csharp
public static Task UpgradeAsync()
public static Task UpgradeAsync(CancellationToken token)
```

更新を確認し、見つかったものをインストールして、両方の手順が終わったときに完了します。すべてのパッケージが最新の場合、またはインストール・削除・アップグレードがすでに実行中の場合は何もしません。トークンは例外を投げずに更新確認または続くインストールを止めます。

```csharp
await UpmInstaller.UpgradeAsync();
```
