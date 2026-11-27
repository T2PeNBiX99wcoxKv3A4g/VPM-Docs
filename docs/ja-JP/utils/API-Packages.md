# パッケージ操作

## UpmInstaller

`io.github.ykysnk.utils.Editor` · `public static class UpmInstaller`

エディタコードから Unity Package Manager のパッケージをインストール、削除、更新します。各操作はキャンセルボタン付きの固定
プログレスバーを表示し、ボタンで停止できます（その瞬間にエディタがコンパイル中または更新中の場合を除く）。インストール、削除、
アップグレードは 1 つのロックを共有するため、同時に実行されるのは 1 つだけです。2 回目の呼び出しは何もせずに戻ります。

### Install(string[] packages)

```csharp
public static void Install(string[] packages)
```

指定したパッケージのインストールを開始し、すぐに戻ります。要素は `name` または `name@version` です。

```csharp
UpmInstaller.Install(new[] { "io.github.ykysnk.localization@0.11.0" });
```

### InstallAsync(string[] packages)

```csharp
public static Task InstallAsync(string[] packages)
```

指定したパッケージをインストールし、すべての処理が終わったときに完了します。

### InstallAsync(string[] packages, CancellationToken token)

```csharp
public static Task InstallAsync(string[] packages, CancellationToken token)
```

指定したパッケージをインストールします。要求されたバージョンですでにインストール済みの要素はスキップされ、失敗した要素はログに
記録されて残りは引き続き処理されます。`token` をキャンセルすると例外を投げずに操作が止まり、プログレスバーはキャンセルとして
閉じます。

### Remove(string[] packages)

```csharp
public static void Remove(string[] packages)
```

指定したパッケージの削除を開始し、すぐに戻ります。

### RemoveAsync(string[] packages)

```csharp
public static Task RemoveAsync(string[] packages)
```

指定したパッケージを削除し、すべての処理が終わったときに完了します。

### RemoveAsync(string[] packages, CancellationToken token)

```csharp
public static Task RemoveAsync(string[] packages, CancellationToken token)
```

指定したパッケージを削除します。失敗したパッケージはログに記録され、残りは引き続き処理されます。`token` をキャンセルすると
例外を投げずに操作が止まります。

### UpdateAsync()

```csharp
public static Task<string[]> UpdateAsync()
```

レジストリからインストールされたパッケージだけを照合し、新しいバージョンがあるものを一覧します。組み込み・埋め込み・
ローカルのパッケージはレジストリに更新がないため対象外です。検索は並列で実行し、5 秒を超えた検索は打ち切ります。
`name@version` 形式の要素を返し、古いものがなければ空です。

### UpdateAsync(CancellationToken token)

```csharp
public static Task<string[]> UpdateAsync(CancellationToken token)
```

引数なしのオーバーロードと同じです。トークンはチェックを停止し、実行中の検索は中断されません。失敗前に見つかった要素は
そのまま返されます。

### Upgrade()

```csharp
public static void Upgrade()
```

更新を確認してインストールを開始し、すぐに戻ります。

### UpgradeAsync()

```csharp
public static Task UpgradeAsync()
```

更新を確認してインストールします。すべてのパッケージが最新の場合は何もしません。

### UpgradeAsync(CancellationToken token)

```csharp
public static Task UpgradeAsync(CancellationToken token)
```

更新を確認してインストールします。すべてのパッケージが最新の場合、またはインストールや削除がすでに実行中の場合は何もしません。
トークンは例外を投げずに更新確認または続くインストールを止めます。
