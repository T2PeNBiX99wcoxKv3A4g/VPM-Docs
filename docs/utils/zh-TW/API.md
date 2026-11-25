# API

## 記錄與斷言

每個輔助方法都接受一個前置字串，讓主控台顯示是哪個套件回報的訊息。

```csharp
using io.github.ykysnk.utils;

Utils.Log(nameof(MyWindow), "Opened");
Utils.LogWarning(nameof(MyWindow), "Nothing to do");
Utils.LogError(nameof(MyWindow), exception.Message, this);
Utils.Assert(condition, nameof(MyWindow), "Condition must hold");
```

`LogAssert` 只回報而不拋出例外；`Assert` 會在記錄後拋出斷言例外。

## 環境

| 成員 | 傳回 |
| --- | --- |
| `Utils.IsInPrefab` | 選取範圍是預製體資產或預製體階段物件時為 true。 |
| `Utils.IsPlaying` | 播放模式啟用時為 true。 |
| `Utils.ToLayer(LayerMask)` | 當遮罩只有一個位元被設定時，傳回該層的索引。 |

## 擴充方法

`io.github.ykysnk.utils.Extensions` 收錄其他套件使用的擴充方法，例如：

```csharp
var path = assetPath.MiddlePath('(', ')');   // text between the first pair of brackets
var fullName = transform.FullName();          // "Root/Child/Leaf"
```

## 編輯器型別

| 型別 | 用途 |
| --- | --- |
| `BasicEditor` | 具備錯誤 UI 的檢視器基底類別。 |
| `EditorTask` | 帶有進度與失敗回報的非同步工作包裝。 |
| `CustomDialogWindow` | 可重複使用的模態提示。 |
| `MenuItemObject` | 宣告式選單項目（路徑、優先順序、驗證器、動作）。 |
| `UpmInstaller` | 安裝、移除與更新 UPM 套件。 |

## 版本

套件與工具組分開版控；`Packages/io.github.ykysnk.utils` 下的 `package.json` 是唯一依據，發行流程會為每個標籤發佈 VPM 套件。
