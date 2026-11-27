# 工具

一些原本要點好幾層選單才能用的小動作。

## 維護

| 選單                                                                                          | 功能                                                                  |
|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| Tools &gt; YKYToolkit &gt; Clear Shader Cache                                                 | 刪除 Unity 已編譯的著色器快取。                                       |
| Tools &gt; YKYToolkit &gt; Force Clear Temp Files                                             | 刪除專案的 `Temp` 資料夾（Unity 會重新建置）。                        |
| Tools &gt; YKYToolkit &gt; Clear Empty Folder                                                 | 移除專案中的空資料夾。                                                |
| Tools &gt; YKYToolkit &gt; Allow Async Compilation                                            | 切換背景著色器編譯；核取記號顯示目前的狀態。                          |
| Assets &gt; YKYToolkit &gt; Asset Backup                                                      | 把選取的資產複製到帶時間戳記的備份資料夾。                            |
| Assets &gt; YKYToolkit &gt; Asset GUID Copy                                                   | 把選取資產的 GUID 複製到剪貼簿。                                      |
| Assets &gt; YKYToolkit &gt; Delete Selected / GameObject &gt; YKYToolkit &gt; Delete Selected | 刪除選取項目並記錄到刪除歷史；受保護的目錄會被拒絕，不會刪除。        |

## 物件

**Set Object and Tag**（GameObject 與 Tools 選單）會一步為選取項目指定物件資產與標籤，包含預製體階段物件。

## 組件

| 選單                                       | 功能                                      |
|--------------------------------------------|-------------------------------------------|
| Copy All Components                        | 複製選取物件的所有組件。                  |
| Paste All Components                       | 把它們貼到另一個物件上。                  |
| Paste All Components With Transform        | 同上，並同時套用複製的 transform。        |
| Copy Transform Tree / Paste Transform Tree | 複製或貼上整個階層及其 transform 與組件。 |

複製的資料會經過剪貼簿，因此可以在場景與預製體之間移動。

## 約束

| 選單                                       | 功能                                   |
|--------------------------------------------|----------------------------------------|
| Convert Unity Constraint To VRC Constraint | 把 Unity 約束換成 VRChat 的對應版本。  |
| Convert VRC Constraint To Unity Constraint | 反向操作，用於在 VRChat 之外製作原型。 |

兩個動作都可以復原，並保留約束設定。

## Unity 資源監視器

**Tools &gt; YKYToolkit &gt; Unity Resource Monitor** 會即時顯示編輯器程序：受控與原生記憶體、GC 回收次數、CPU
時間與算繪執行緒。它每秒取樣一次，適合在測試時保持開啟。

## Discord Rich Presence

Discord SDK 動作（**Initialize / Restart / Shutdown**）控制選用的編輯器 rich presence：編輯器狀態會顯示專案與目前的場景。SDK
僅以編輯器形式提供，永遠不會進入建置；[偏好設定](./Preferences.md)中的 **啟用 Discord Rich Presence** 可以完全關閉連線。

## 設定

- **Tools &gt; YKYToolkit &gt; Preferences** 收納語言、主題色、刪除保護與各項歷史的上限。參見[偏好設定](./Preferences.md)。
- **Tools &gt; YKYToolkit &gt; Import Watcher Settings** 會單獨開啟匯入醒目提示設定。參見[匯入監看器](./Import-Watcher.md)。
