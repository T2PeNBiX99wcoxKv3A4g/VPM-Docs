# 安裝

套件為 `io.github.ykysnk.utils`，與其他套件透過同一個 VPM 儲存庫發佈。可用 ALCOM、VPM CLI 安裝，或把儲存庫加入專案。

它本身沒有 VPM 相依套件。

大多數專案不會直接安裝它：[Localization](../localization/Installation) 與 [YKYToolKit](../yky-toolkit/Installation)
都宣告了它，VPM 會替你解析。

## 命名空間

| 命名空間                            | 用途                                          |
|-------------------------------------|-----------------------------------------------|
| `io.github.ykysnk.utils`            | `Utils`（記錄、斷言）、`BasicEditorComponent` |
| `io.github.ykysnk.utils.Editor`     | `BasicEditor`、GUI 輔助工具與 UPM 用戶端      |
| `io.github.ykysnk.utils.Extensions` | 其他套件使用的小型擴充方法                    |

## 更新

套件跟隨儲存庫的發行標籤；YKY Toolkit 視窗會列出已安裝的版本，並可在 Unity
內直接更新。參見 [UPM 安裝器](../yky-toolkit/UPM-Installer)。
