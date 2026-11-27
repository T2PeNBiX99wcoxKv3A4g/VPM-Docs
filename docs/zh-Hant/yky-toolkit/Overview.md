# 概觀

YKY Toolkit 是一組編輯器視窗與右鍵選單動作，用於日常 Unity 工作：安裝套件、監看匯入、監視記憶體、清理快取與編輯 transform。

所有功能都位於 **Tools &gt; YKYToolkit** 底下，右鍵動作則在 **GameObject &gt; YKYToolkit**、**Assets &gt; YKYToolkit**
以及組件右鍵選單中。

## 包含內容

| 視窗                                         | 功能                                                          |
|----------------------------------------------|---------------------------------------------------------------|
| [UPM 安裝器](./UPM-Installer.md)             | 安裝、移除與更新 UPM 套件，並保存可重複使用的套件清單。       |
| [匯入監看器](./Import-Watcher.md)            | 記錄匯入了什麼、何時與從何處匯入，並依副檔名醒目提示新資產。  |
| 刪除歷史                                     | 列出本次工作階段中被刪除與重新建立的資產。                    |
| Unity 資源監視器                             | 編輯器程序的即時記憶體與 CPU 計數。                           |
| [工具](./Tools.md)                           | 快取清理、資產備份、GUID 複製、約束轉換與組件複製／貼上。     |
| [Transform 檢視器](./Transform-Inspector.md) | 具備表達式、對齊、剪貼簿與鎖定的強化版 transform 檢視器。     |
| Transform Expression Help                    | 表達式語法的速查表，可搜尋並複製範例。                        |
| [偏好設定](./Preferences.md)                 | 語言、主題色、刪除保護與各項歷史的上限。                      |

視窗文字都有翻譯；語言選擇器是[偏好設定](./Preferences.md)頁面的第一張卡片。

## 相依套件

| 套件                            | 原因                                        |
|---------------------------------|---------------------------------------------|
| `io.github.ykysnk.utils`        | 檢視器基底類別、GUI 輔助工具與 UPM 用戶端。 |
| `io.github.ykysnk.localization` | 編輯器字串；這些視窗都有翻譯。              |

兩者都是 VPM 相依套件並會自動解析。`jp.lilxyzw.editortoolbox` 是選用的：安裝之後，工具組會用它的套件匯入器處理
`.unitypackage` 檔案。
