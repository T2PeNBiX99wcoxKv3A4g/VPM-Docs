# UpdateHelper

`io.github.ykysnk.Localization.Editor` · `public class UpdateHelper : IDisposable`

在在地化重新載入或語言變更時，讓一組標籤與工具提示保持最新。每個註冊都各自獨立，因此多個元素可以共用同一個鍵；元素消失時，用 `Dispose` 移除註冊。

控制代碼會保存在地化 ID、鍵與 callback，載入器則以一份清單管理所有仍有效的控制代碼，並在重新載入或語言變更後統一呼叫。處置控制代碼是停止 callback 的唯一方式，因此會重建樹狀結構的視窗必須處置上一次建立時註冊的內容。

## Callback

```csharp
public delegate void Callback(string newLabel, string newTooltip)
```

接收所註冊鍵的新標籤與工具提示。當鍵沒有工具提示項目時，工具提示為 `""`。

## Register

```csharp
public static UpdateHelper Register(string localizationID, string localizeKey, Callback callback)
public static UpdateHelper Register(string localizationID, SerializedProperty property, Callback callback)
```

為某個在地化 ID 的某個鍵註冊 `callback`，並傳回可取消註冊的控制代碼。`Register` 本身不會呼叫 callback；它會在下次語言變更或重新載入時執行，因此請先用 `S` 與 `Tooltip` 設定初始文字。

`SerializedProperty` 多載會註冊標籤屬性會使用的鍵 `label.{Type}.{field}`，該鍵由目標物件的型別名稱與屬性名稱推導而來。

```csharp
var registration = UpdateHelper.Register("io.github.ykysnk.yky-toolkit", "label.my_window.title",
    (label, tooltip) => title.text = label);
```

## Dispose

```csharp
public void Dispose()
```

停止更新 callback，並從載入器的清單與依鍵分組的清單中移除註冊。它所更新的元素被移除時請呼叫它；之後 callback 就永遠不會再被呼叫。重複處置不會有問題。
