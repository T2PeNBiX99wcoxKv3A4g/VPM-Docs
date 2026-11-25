# 概觀

其他套件所依據的共用程式庫：一些小型編輯器與執行階段輔助工具，否則這些東西會被複製進每個專案。它本身不提供任何 UI。

## 套件包含什麼

| 領域 | 內容 |
| --- | --- |
| Runtime | `Utils` 的記錄與斷言、`IsInPrefab` / `IsPlaying`、`ToLayer`、`BasicEditorComponent` |
| 檢視器基底 | `BasicEditor`，在 try/catch 中執行自訂檢視器，並顯示一致的錯誤 UI |
| GUI 輔助工具 | `EditorGUILayoutUtility`、`EditorGUIUtils`、`EditorUtils`、`CustomDialogWindow`、`EditorTask` |
| 繪製器 | `BooleanVector3Drawer`、`ColorHexDrawer` |
| 選單 | `MenuItemObject`、`MenuWrap`、`MenuServiceWrap`，用於一致地建構選單路徑 |
| 套件處理 | `UpmInstaller`，YKY Toolkit 安裝視窗使用的 UPM 用戶端 |

## 何時使用

當套件需要檢視器基底類別、GUI 輔助工具或 UPM 用戶端時，就把它加入為相依套件。它是 [Localization](../localization/Overview) 與 [YKYToolKit](../yky-toolkit/Overview) 的 VPM 相依套件，因此安裝其中任一個都會自動帶入。
