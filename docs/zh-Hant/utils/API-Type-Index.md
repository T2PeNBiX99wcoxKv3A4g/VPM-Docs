# 型別索引

## Type index

上述頁面之外的公開型別，依命名空間分組。用途文字取自各型別自身的摘要。

### io.github.ykysnk.utils.Extensions

| 型別                   | 用途                                                             |
|------------------------|------------------------------------------------------------------|
| `ComponentExtensions`  | GameObject 與 Transform 輔助工具的元件版本。                     |
| `DictionaryExtensions` | 把缺少的鍵視為預設值的字典讀取。                                 |
| `FloatExtensions`      | `float` 的雜訊移除、容差檢查、限制範圍與四捨五入。               |
| `GameObjectExtensions` | 階層路徑、距離檢查與以索引存取元件。                             |
| `ListExtensions`       | 對清單與陣列提供邊界檢查的索引存取與就地編輯輔助工具。           |
| `StringExtensions`     | 對 `"Folder/Name/Extension"` 這類分隔字串的切片輔助工具。        |
| `Texture2DExtensions`  | 材質的 GPU 縮放與 alpha 修剪。                                   |
| `TransformExtensions`  | 階層名稱、世界／區域縮放轉換、未縮放點轉換與距離檢查。           |
| `Vector3Extensions`    | `Vector3` 的距離、逐分量算術、限制範圍、四捨五入與方向輔助工具。 |

### io.github.ykysnk.utils.NonUdon

| 型別                                                                                                   | 用途                                                             |
|--------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| `DictionaryWrapper<TKey, TValue>`                                                                      | 以兩個平行清單儲存的字典形式資料，用於 Unity 序列化。            |
| `HashUtils`, `HashType`                                                                                | 以小寫十六進位摘要進行的文字雜湊。                               |
| `JsonUtils`                                                                                            | `JsonUtility` 的包裝，會回報失敗而不是拋出例外或傳回 null。      |
| `ListWrapper<T>`                                                                                       | 藏在單一序列化欄位後面的清單，讓介面型別的成員也能儲存。         |
| `ReflectionUtils`, `ReflectionWrapper`, `Reflect`                                                      | 快取的反射查詢、編譯後的委派與可串接的成員存取。                 |
| `ReflectionAccess`, `FieldAccess`, `PropertyAccess`, `MethodAccess`                                    | 支撐 `Reflect` 的存取器型別。                                    |
| `Result<T>`, `ResultExtensions`, `Try`, `Unit`                                                         | 攜帶失敗的結果、串接輔助工具與不拋出例外的執行。                 |
| `Wrapper`                                                                                              | `ListWrapper<T>` 與 `DictionaryWrapper<TKey, TValue>` 的進入點。 |
| `ILogger`, `Logger<T>`                                                                                 | 套件程式碼所依據的記錄介面，及其依型別的實作。                   |
| `FieldGetter<T>`, `FieldSetter<T>`, `PropertyGetter<T>`, `PropertySetter<T>`, `WrapAction`, `WrapFunc` | 反射包裝所使用的委派。                                           |

### io.github.ykysnk.utils.Editor.Patches

| 型別                                           | 用途                                                                       |
|------------------------------------------------|----------------------------------------------------------------------------|
| `IPatch`, `Patch<T>`                           | 以單位套用的修補群組；子類別是其巢狀修補方法的容器。                       |
| `IPatchLoader`, `PatchLoader<T>`               | 每個程式集的進入點，接收其 Harmony 執行個體並執行其修補群組。              |
| `IPatchMethod`, `PatchMethod<T>`               | 一組 Harmony 修補：目標方法加上 prefix、postfix、transpiler 與 finalizer。 |
| `IReversePatchMethod`, `ReversePatchMethod<T>` | 反向修補，其虛設方法會接收另一個方法主體的可呼叫副本。                     |
| `ExportsPatchLoader`                           | 程式集屬性，宣告編輯器載入時要執行的修補載入器型別。                       |

### io.github.ykysnk.utils.Editor.HarmonyUtilities

| 型別                   | 用途                                                       |
|------------------------|------------------------------------------------------------|
| `CodeCursor`           | 對 transpiler 指令的串流游標，提供目前、下一個與歷程存取。 |
| `TranspilerExtensions` | 透過 `WithContext` 逐項產生每個指令及其鄰居。              |

### io.github.ykysnk.utils.Editor.UIElements

| 型別                  | 用途                                                                   |
|-----------------------|------------------------------------------------------------------------|
| `BooleanVector3Field` | 把 `BooleanVector3` 以三個開關編輯的 UI Toolkit 欄位；可從 UXML 建立。 |
