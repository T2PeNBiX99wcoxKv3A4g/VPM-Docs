# インストール

`io.github.ykysnk.yky-toolkit` を ALCOM、VPM CLI、またはリポジトリをプロジェクトに追加して導入します。パッケージは
`io.github.ykysnk.utils` と `io.github.ykysnk.localization` に依存しており、VPM が一緒にインストールします。

## インストール後

ウィンドウは **Tools &gt; YKYToolkit** に表示されます:

- UPM Installer
- Import Watcher と Import Watcher Settings
- Delete History
- Unity Resource Monitor
- Transform Expression Help
- Preferences
- Clear Shader Cache、Force Clear Temp Files、Clear Empty Folder、Allow Async Compilation
- Discord SDK Initialize / Restart / Shutdown

コンテキスト操作は **GameObject &gt; YKYToolkit**、**Assets &gt; YKYToolkit**、およびコンポーネントメニューに追加されます。

## 任意: lilEditorToolbox

`jp.lilxyzw.editortoolbox` がインストールされている場合、ツールキットは `.unitypackage` ファイルをそれ経由でインポートします。ない場合は
Unity 標準のインポーターにフォールバックし、それ以外は変わりません。
