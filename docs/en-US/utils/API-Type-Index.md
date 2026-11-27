# Type index

## Type index

Public types outside the pages above, grouped by namespace. The purpose text comes from each type's own summary.

### io.github.ykysnk.utils.Extensions

| Type                   | Purpose                                                                                       |
|------------------------|-----------------------------------------------------------------------------------------------|
| `ComponentExtensions`  | Component versions of the GameObject and Transform helpers.                                   |
| `DictionaryExtensions` | Dictionary reads that treat a missing key as a default value.                                 |
| `FloatExtensions`      | Noise removal, tolerance checks, clamping and rounding for `float`.                           |
| `GameObjectExtensions` | Hierarchy paths, distance checks and index-based component access.                            |
| `ListExtensions`       | Bounds-checked index access and in-place editing helpers for lists and arrays.                |
| `StringExtensions`     | Slicing helpers for delimited strings such as `"Folder/Name/Extension"`.                      |
| `Texture2DExtensions`  | GPU resizing and alpha trimming of textures.                                                  |
| `TransformExtensions`  | Hierarchy names, world/local scale conversion, unscaled point conversion and distance checks. |
| `Vector3Extensions`    | Distance, component-wise arithmetic, clamping, rounding and direction helpers for `Vector3`.  |

### io.github.ykysnk.utils.NonUdon

| Type                                                                                                   | Purpose                                                                              |
|--------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| `DictionaryWrapper<TKey, TValue>`                                                                      | Dictionary-shaped data stored as two parallel lists, for Unity serialization.        |
| `HashUtils`, `HashType`                                                                                | Text hashing with lowercase hexadecimal digests.                                     |
| `JsonUtils`                                                                                            | `JsonUtility` wrappers that report failure instead of throwing or returning null.    |
| `ListWrapper<T>`                                                                                       | A list behind a single serialized field, so an interface-typed member can be stored. |
| `ReflectionUtils`, `ReflectionWrapper`, `Reflect`                                                      | Cached reflection lookups, compiled delegates and chainable member access.           |
| `ReflectionAccess`, `FieldAccess`, `PropertyAccess`, `MethodAccess`                                    | Accessor types backing `Reflect`.                                                    |
| `Result<T>`, `ResultExtensions`, `Try`, `Unit`                                                         | Failure-carrying results, chaining helpers and exception-free execution.             |
| `Wrapper`                                                                                              | Entry point for `ListWrapper<T>` and `DictionaryWrapper<TKey, TValue>`.              |
| `ILogger`, `Logger<T>`                                                                                 | The logging surface the package codes against, and its per-type implementation.      |
| `FieldGetter<T>`, `FieldSetter<T>`, `PropertyGetter<T>`, `PropertySetter<T>`, `WrapAction`, `WrapFunc` | Delegates used by the reflection wrappers.                                           |

### io.github.ykysnk.utils.Editor.Patches

| Type                                           | Purpose                                                                                           |
|------------------------------------------------|---------------------------------------------------------------------------------------------------|
| `IPatch`, `Patch<T>`                           | A group of patches applied as a unit; the subclass is the container for its nested patch methods. |
| `IPatchLoader`, `PatchLoader<T>`               | Entry point of one assembly, which receives its Harmony instance and runs its patch groups.       |
| `IPatchMethod`, `PatchMethod<T>`               | One Harmony patch set: target method plus prefix, postfix, transpiler and finalizer.              |
| `IReversePatchMethod`, `ReversePatchMethod<T>` | A reverse patch whose stub receives a callable copy of another method's body.                     |
| `ExportsPatchLoader`                           | Assembly attribute declaring a patch loader type to run when the editor loads.                    |

### io.github.ykysnk.utils.Editor.HarmonyUtilities

| Type                   | Purpose                                                                                   |
|------------------------|-------------------------------------------------------------------------------------------|
| `CodeCursor`           | Streaming cursor over a transpiler's instructions, with current, next and history access. |
| `TranspilerExtensions` | Yields each instruction together with its neighbours through `WithContext`.               |

### io.github.ykysnk.utils.Editor.UIElements

| Type                  | Purpose                                                                               |
|-----------------------|---------------------------------------------------------------------------------------|
| `BooleanVector3Field` | UI Toolkit field that edits a `BooleanVector3` as three toggles; creatable from UXML. |
