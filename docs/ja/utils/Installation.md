# インストール

パッケージは `io.github.ykysnk.utils` で、他のパッケージと同じ VPM リポジトリから配布されています。ALCOM、VPM
CLI、またはプロジェクトにリポジトリを追加して導入します。

VPM 依存はありません。

ほとんどのプロジェクトでは直接インストールしません。[Localization](../localization/Installation.md)
と [YKYToolKit](../yky-toolkit/Installation.md) が宣言しており、VPM が解決します。

## 名前空間

| 名前空間                            | 用途                                                  |
|-------------------------------------|-------------------------------------------------------|
| `io.github.ykysnk.utils`            | `Utils`（ログ、アサーション）、`BasicEditorComponent` |
| `io.github.ykysnk.utils.Editor`     | `BasicEditor`、GUI ヘルパー、UPM クライアント         |
| `io.github.ykysnk.utils.Extensions` | 他のパッケージが使う小さな拡張メソッド                |

## 更新

パッケージはリポジトリのリリースタグに従います。YKY Toolkit のウィンドウでインストール済みのバージョンを一覧でき、Unity
内から更新できます。[UPM Installer](../yky-toolkit/UPM-Installer.md) を参照してください。
