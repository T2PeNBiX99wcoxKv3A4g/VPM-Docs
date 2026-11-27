# ツール

本来ならメニューを何段もたどる小さな操作をまとめています。

## メンテナンス

| メニュー | 内容 |
|----------|------|
| Tools &gt; YKYToolkit &gt; Clear Shader Cache | Unity のコンパイル済みシェーダーキャッシュを削除します。 |
| Tools &gt; YKYToolkit &gt; Force Clear Temp Files | プロジェクトの `Temp` フォルダを削除します（Unity が再生成します）。 |
| Tools &gt; YKYToolkit &gt; Clear Empty Folder | プロジェクトから空フォルダを削除します。 |
| Tools &gt; YKYToolkit &gt; Allow Async Compilation | バックグラウンドのシェーダーコンパイルを切り替えます。チェックマークが現在の状態を示します。 |
| Assets &gt; YKYToolkit &gt; Asset Backup | 選択中のアセットをタイムスタンプ付きのバックアップフォルダにコピーします。 |
| Assets &gt; YKYToolkit &gt; Asset GUID Copy | 選択中のアセットの GUID をクリップボードにコピーします。 |
| Assets &gt; YKYToolkit &gt; Delete Selected / GameObject &gt; YKYToolkit &gt; Delete Selected | 選択を削除し、削除履歴に記録します。保護されたディレクトリは削除せずに拒否します。 |

## オブジェクト

**Set Object and Tag**（GameObject メニューと Tools メニュー）は、オブジェクトアセットとタグを選択にまとめて設定します。プレハブステージのオブジェクトも対象です。

## コンポーネント

| メニュー | 内容 |
|----------|------|
| Copy All Components | 選択中のオブジェクトの全コンポーネントをコピーします。 |
| Paste All Components | 別のオブジェクトに貼り付けます。 |
| Paste All Components With Transform | 同じことを行い、コピーした Transform も適用します。 |
| Copy Transform Tree / Paste Transform Tree | 階層全体を Transform とコンポーネントごとコピー/貼り付けします。 |

コピーしたデータはクリップボードを経由するので、シーンやプレハブをまたいで移動できます。

## コンストレイント

| メニュー | 内容 |
|----------|------|
| Convert Unity Constraint To VRC Constraint | Unity のコンストレイントを VRChat 相当のものに置き換えます。 |
| Convert VRC Constraint To Unity Constraint | その逆で、VRChat の外で試作するときに使います。 |

どちらの操作も元に戻せ、コンストレイントの設定は保持されます。

## Unity Resource Monitor

**Tools &gt; YKYToolkit &gt; Unity Resource Monitor** はエディタプロセスをリアルタイム表示します。マネージド/ネイティブメモリ、GC
回数、CPU 時間、レンダースレッドです。1 秒に 1 回サンプリングし、テスト中は開いたままにしておく想定です。

## Discord Rich Presence

Discord SDK の操作（**Initialize / Restart / Shutdown**）は任意のエディタ rich presence
を制御します。エディタのステータスにプロジェクトと現在のシーンが表示されます。SDK はエディタ専用で、ビルドには一切含まれません。[環境設定](./Preferences.md)
の **Discord リッチプレゼンスを有効にする** で接続を完全に切れます。

## 設定

- **Tools &gt; YKYToolkit &gt; Preferences** では言語、アクセントカラー、削除保護、履歴の上限を設定できます。[環境設定](./Preferences.md)
  を参照してください。
- **Tools &gt; YKYToolkit &gt; Import Watcher Settings** はインポートのハイライト設定だけを開きます。[インポートウォッチャー](./Import-Watcher.md)
  を参照してください。
