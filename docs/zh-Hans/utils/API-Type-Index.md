# 类型索引

## 类型索引

上述页面之外的公开类型，按命名空间分组。用途文本来自每个类型自身的摘要。

### io.github.ykysnk.utils.Extensions

| 类型                   | 用途                                                         |
|------------------------|--------------------------------------------------------------|
| `ComponentExtensions`  | GameObject 与 Transform 辅助方法的组件版本。                 |
| `DictionaryExtensions` | 把缺失键视为默认值的字典读取。                               |
| `FloatExtensions`      | `float` 的噪声移除、容差检查、钳制和取整。                   |
| `GameObjectExtensions` | 层级路径、距离检查以及按索引访问组件。                       |
| `ListExtensions`       | 列表和数组的带边界检查的索引访问与就地编辑辅助方法。         |
| `StringExtensions`     | 分隔字符串（例如 `"Folder/Name/Extension"`）的切片辅助方法。 |
| `Texture2DExtensions`  | 纹理的 GPU 缩放与 alpha 裁剪。                               |
| `TransformExtensions`  | 层级名称、世界/本地缩放转换、未缩放坐标转换以及距离检查。    |
| `Vector3Extensions`    | `Vector3` 的距离、逐分量运算、钳制、取整和方向辅助方法。     |

### io.github.ykysnk.utils.NonUdon

| 类型                                                                                                   | 用途                                                             |
|--------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| `DictionaryWrapper<TKey, TValue>`                                                                      | 以两个并行列表存储的字典形数据，用于 Unity 序列化。              |
| `HashUtils`, `HashType`                                                                                | 使用小写十六进制摘要的文本哈希。                                 |
| `JsonUtils`                                                                                            | 在失败时报告而不是抛出或返回 null 的 `JsonUtility` 包装。        |
| `ListWrapper<T>`                                                                                       | 位于单个序列化字段之后的列表，因此可以存储接口类型的成员。       |
| `ReflectionUtils`, `ReflectionWrapper`, `Reflect`                                                      | 缓存的反射查找、编译委托以及可链式成员访问。                     |
| `ReflectionAccess`, `FieldAccess`, `PropertyAccess`, `MethodAccess`                                    | 支撑 `Reflect` 的访问器类型。                                    |
| `Result<T>`, `ResultExtensions`, `Try`, `Unit`                                                         | 携带失败的结果、链式辅助方法以及无异常执行。                     |
| `Wrapper`                                                                                              | `ListWrapper<T>` 与 `DictionaryWrapper<TKey, TValue>` 的入口点。 |
| `ILogger`, `Logger<T>`                                                                                 | 本包代码所依赖的日志接口及其按类型实现。                         |
| `FieldGetter<T>`, `FieldSetter<T>`, `PropertyGetter<T>`, `PropertySetter<T>`, `WrapAction`, `WrapFunc` | 反射包装使用的委托。                                             |

### io.github.ykysnk.utils.Editor.Patches

| 类型                                           | 用途                                                                       |
|------------------------------------------------|----------------------------------------------------------------------------|
| `IPatch`, `Patch<T>`                           | 作为一个单元应用的一组补丁；子类是其嵌套补丁方法的容器。                   |
| `IPatchLoader`, `PatchLoader<T>`               | 一个程序集的入口点，接收其 Harmony 实例并运行其补丁分组。                  |
| `IPatchMethod`, `PatchMethod<T>`               | 一组 Harmony 补丁：目标方法加上 prefix、postfix、transpiler 和 finalizer。 |
| `IReversePatchMethod`, `ReversePatchMethod<T>` | 反向补丁，其存根接收另一个方法体的可调用副本。                             |
| `ExportsPatchLoader`                           | 声明编辑器加载时要运行的补丁加载器类型的程序集特性。                       |

### io.github.ykysnk.utils.Editor.HarmonyUtilities

| 类型                   | 用途                                                   |
|------------------------|--------------------------------------------------------|
| `CodeCursor`           | 遍历转译器指令的流式游标，提供当前、下一条和历史访问。 |
| `TranspilerExtensions` | 通过 `WithContext` 产出每条指令及其相邻指令。          |

### io.github.ykysnk.utils.Editor.UIElements

| 类型                  | 用途                                                                     |
|-----------------------|--------------------------------------------------------------------------|
| `BooleanVector3Field` | 把 `BooleanVector3` 作为三个开关编辑的 UI Toolkit 字段；可从 UXML 创建。 |
