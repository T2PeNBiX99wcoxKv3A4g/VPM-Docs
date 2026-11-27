# 概要

他のパッケージが土台とする共有ライブラリです。なければ各プロジェクトにコピーされることになる、小さなエディタ/ランタイム用ヘルパーをまとめています。独自の
UI は同梱していません。

## パッケージの内容

| 領域               | 内容                                                                                            |
|--------------------|-------------------------------------------------------------------------------------------------|
| ランタイム         | `Utils` のログとアサーション、`IsInPrefab` / `IsPlaying`、`ToLayer`、`BasicEditorComponent`     |
| インスペクター基盤 | `BasicEditor`。try/catch の中でカスタムインスペクターを実行し、統一されたエラー UI を表示します |
| GUI ヘルパー       | `EditorGUILayoutUtility`、`EditorGUIUtils`、`EditorUtils`、`CustomDialogWindow`、`EditorTask`   |
| ドロワー           | `BooleanVector3Drawer`、`ColorHexDrawer`                                                        |
| メニュー           | `MenuItemObject`、`MenuWrap`、`MenuServiceWrap`。メニューパスを統一的に組み立てます             |
| パッケージ操作     | `UpmInstaller`。YKY Toolkit のインストーラーウィンドウが使う UPM クライアント                   |

## 使う場面

インスペクターの基底クラス、GUI ヘルパー、UPM
クライアントが必要なときに依存として追加します。[Localization](../localization/Overview.md)
と [YKYToolKit](../yky-toolkit/Overview.md) の VPM 依存なので、どちらかをインストールすれば自動で入ります。
