# 功能一覽

工具組新增的所有內容，依出現的位置分組。詳細說明請見各連結頁面。

## 視窗

- [**UPM 安裝器**](./UPM-Installer.md) — 安裝、移除與更新 UPM 套件；以專案為單位的已儲存套件清單；可把清單
  複製成 JSON 的產生器；只加入有新版本套件的更新檢查。
- [**匯入監看器**](./Import-Watcher.md) — 每次編輯器工作階段一份記錄，記錄 Unity 匯入了哪些資產，依日期與時間分組；搜尋、
  重新整理與清除；已不存在的資產會以紅色標示。
- [**Import Watcher Settings**](./Import-Watcher.md) — 醒目提示顏色與持續時間、各副檔名的顏色，以及歷史的大小。
- [**刪除歷史**](./Import-Watcher.md) — 本次工作階段中被刪除或重新建立的路徑，包含路徑、GUID、副檔名與時間；
  可複製任一值；可設定的記錄上限。
- [**Unity 資源監視器**](./Tools.md) — 七個即時計數，每 100 毫秒重新整理。
- [**Transform Expression Help**](./Transform-Inspector.md) — 可搜尋的表達式速查表，範例可點擊複製。
- [**偏好設定**](./Preferences.md) — 語言、主題色、一般開關、刪除保護，以及兩份歷史的上限。

## Tools 選單

- **Clear Shader Cache** — 刪除 Unity 已編譯的著色器快取。
- **Force Clear Temp Files** — 刪除專案的 `Temp` 資料夾；Unity 會重新建置。
- **Clear Empty Folder** — 在確認並顯示數量之後移除空資料夾。
- **Allow Async Compilation** — 背景著色器編譯；核取記號顯示目前的狀態。
- **Set Object and Tag** — 在一般物件與僅供編輯器使用的物件之間切換選取項目。
- **Discord SDK Initialize / Restart / Shutdown** — 控制選用的編輯器 rich presence。

## Assets 選單

- **Asset Backup** — 把選取的資產複製到帶時間戳記的備份資料夾。
- **Asset GUID Copy** — 複製選取資產的 GUID。
- **Delete Selected** — 透過確認對話框刪除，並把路徑記錄到刪除歷史。

## GameObject 與組件選單

- **Set Object and Tag** — 停用物件並標記為 `EditorOnly`，同時記住先前的標籤與啟用狀態；再執行一次即可還原
  兩者。
- **Copy All Components** / **Paste All Components** — 把一個物件的所有組件搬到另一個物件。
- **Paste All Components With Transform** — 同上，並同時包含 transform。
- **Copy Transform Tree** / **Paste Transform Tree** — 整個階層連同其 transform 與組件。
- **Convert Unity Constraint To VRC Constraint** / **Convert VRC Constraint To Unity Constraint** — 在保留設定
  的情況下互換這兩種約束類型。
- **Delete Selected** — 與 Assets 選單中相同的刪除動作。

## Transform 檢視器

預設的 Transform 檢視器會被強化版取代：

- **局部空間** 與 **世界空間** 卡片，各自包含位置、旋轉與縮放。
- 每個欄位都支援算術：`2 + 3`、`10 / 4`、`1.5 * 2`；結果會套用到每個選取的物件。
- 輸入時顯示表達式建議，可用 `↑`／`↓`、Enter 與 Tab。
- 整張卡片與單一屬性都有複製、貼上、隨機與重設。
- 縮放上的連結按鈕可切換比例約束。
- 對齊：參考模式（軸心、底部、中心）、**對齊至父物件**、以射線投射的 **對齊至地面**，以及 **清除父物件**。
- **鎖定變換**，會停用該物件的整個檢視器。
- **階層路徑**，附有複製按鈕。
- 位置、旋轉與縮放的 **小數位數**（`-1` 會關閉四捨五入）。
- **預設 UI**，會展開 Unity 自己的檢視器以處理預製體覆寫。
- 多物件編輯會顯示共用的值，差異則顯示 `—`，且每項變更都會經過 `Undo`。

## Project 視窗

- 匯入的資產會以醒目提示顏色上色片刻後淡出。
- 每個副檔名可以有自己的顏色，在圖示檢視中顯示為外框，在清單檢視中顯示為底線。
- 收到檔案的資料夾也會一併醒目提示。

## 編輯器行為

- **刪除保護**：`Assets` 與 `Packages` 一律拒絕刪除，額外的目錄可在[偏好設定](./Preferences.md)中新增。
- **刪除確認**：對話框會列出將被移除的內容，也可以關閉。
- 可從選單或偏好設定切換**背景著色器編譯**。
- **Discord rich presence** 會顯示專案與目前的場景，也可以完全關閉。
- **已翻譯的視窗**：英文、日文、簡體中文與繁體中文，可在偏好設定中切換。
- **主題色**：所有視窗與 Transform 檢視器中的區段標題、醒目提示與按鈕共用同一個顏色。
