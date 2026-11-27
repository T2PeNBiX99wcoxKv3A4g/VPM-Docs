# 扩展方法

包公开的全部扩展方法，按被扩展的类型分组，由源码生成。

## ComponentExtensions

`Component` · `io.github.ykysnk.utils.Extensions`

| Method | Returns |
| --- | --- |
| `FullName(Component component)` | `string` |
| `TryGetComponentAtIndex(Component component, int index, out Component component2)` | `bool` |
| `GetComponentAtIndexOrDefault(Component component, int index)` | `Component` |
| `GetComponents(Component component)` | `Component[]` |
| `ComponentsForeach(Component component, Action<int, Component> componentAction)` | `void` |
| `ComponentsSelect<T>(Component component, Func<int, Component, T> selector)` | `T[]` |

## DictionaryExtensions

`IDictionary<TKey, TValue>` · `io.github.ykysnk.utils.Extensions`

| Method | Returns |
| --- | --- |
| `GetValueOrDefault<TKey,TValue>(IDictionary<TKey, TValue> dict, TKey key)` | `TValue` |

## EditorGUILayoutUtilityExtensions

`string` · `io.github.ykysnk.utils.Editor`

| Method | Returns |
| --- | --- |
| `Label(string text, string? textTip = null)` | `GUIContent` |

## FloatExtensions

`float` · `io.github.ykysnk.utils.Extensions`

| Method | Returns |
| --- | --- |
| `Clean(float value, float threshold = 0.0001f)` | `float` |
| `IsNearly(float value, float target, float threshold = 0.0001f)` | `bool` |
| `IsNearlyZero(float value, float threshold = 0.0001f)` | `bool` |
| `Clamp(float value, float min, float max)` | `float` |
| `Clamp01(float value)` | `float` |
| `Round(float value, int digits, MidpointRounding mode)` | `float` |
| `Round(float value, int digits)` | `float` |
| `Round(float value, MidpointRounding mode)` | `float` |
| `Round(float value)` | `float` |
| `Approximately(float value, float target)` | `bool` |

## GameObjectExtensions

`GameObject` · `io.github.ykysnk.utils.Extensions`

| Method | Returns |
| --- | --- |
| `FullName(GameObject obj)` | `string` |
| `IsCloseRange(GameObject obj, GameObject other, float distance)` | `bool` |
| `IsCloseRange2D(GameObject obj, GameObject other, float distance)` | `bool` |
| `GetWorldScale(GameObject obj)` | `Vector3` |
| `GetLocalScaleFollowWorldScale(GameObject obj)` | `Vector3` |
| `GetTargetLocalScale(GameObject obj, GameObject other)` | `Vector3` |
| `TryGetComponentAtIndex(GameObject obj, int index, out Component component)` | `bool` |
| `GetComponentAtIndexOrDefault(GameObject obj, int index)` | `Component` |
| `GetComponents(GameObject obj)` | `Component[]` |
| `ComponentsForeach(GameObject obj, Action<int, Component> componentAction)` | `void` |
| `ComponentsSelect<T>(GameObject obj, Func<int, Component, T> selector)` | `T[]` |
| `IsSceneObject(GameObject obj)` | `bool` |
| `IsSceneObject(GameObject obj)` | `bool` |
| `IsPlayerCloseRange(GameObject obj, float distance)` | `bool` |
| `IsPlayerCloseRange2D(GameObject obj, float distance)` | `bool` |

## ListExtensions

`IList<T>` · `io.github.ykysnk.utils.Extensions`

| Method | Returns |
| --- | --- |
| `TryGetValue<T>(IList<T> list, int index, out T value)` | `bool` |
| `GetValueOrDefault<T>(IList<T> list, int index)` | `T` |
| `TrySetValue<T>(IList<T> list, int index, T value)` | `bool` |
| `TryGetValue<T>(T array, int index, out T value)` | `bool` |
| `GetValueOrDefault<T>(T array, int index)` | `T` |
| `TrySetValue<T>(T array, int index, T value)` | `bool` |
| `Rebuild<T>(ICollection<T> collection)` | `void` |
| `Rebuild<T>(ICollection<T> collection, Func<T, bool> removeAll)` | `void` |
| `AddRange<T>(ICollection<T> collection, IEnumerable<T> items)` | `void` |
| `RemoveAll<T>(ICollection<T> collection, Func<T, bool> match)` | `void` |

## RequestExtensions

`T` · `io.github.ykysnk.utils.Editor.Extensions`

| Method | Returns |
| --- | --- |
| `AsTask<T>(T request)` | `Task<T>` |
| `AsTask<T>(T request, CancellationToken token)` | `Task<T>` |

## ResultExtensions

`Result<T>` · `io.github.ykysnk.utils.NonUdon.Extensions`

| Method | Returns |
| --- | --- |
| `OnSuccess<T>(Result<T> result, Action<T> action)` | `Result<T>` |
| `OnFailure<T>(Result<T> result, Action<Exception> action)` | `Result<T>` |
| `OnFinally<T>(Result<T> result, Action action)` | `Result<T>` |
| `OnSuccess<T>(Task<Result<T>> task, Func<T, Task> action)` | `async Task<Result<T>>` |
| `OnFailure<T>(Task<Result<T>> task, Func<Exception, Task> action)` | `async Task<Result<T>>` |
| `OnFinally<T>(Task<Result<T>> task, Func<Task> action)` | `async Task<Result<T>>` |
| `Match<T,TResult>(Result<T> result, Func<T, TResult> onSuccess, Func<Exception, TResult> onFailure)` | `TResult` |
| `Match<T,TResult>(Task<Result<T>> task, Func<T, Task<TResult>> onSuccess, Func<Exception, Task<TResult>> onFailure)` | `async Task<TResult>` |
| `GetOrNull<T>(Result<T> result)` | `T?` |
| `TryGet<T>(Result<T> result, [MaybeNullWhen(false)` | `bool` |
| `GetOrNull<T>(Task<Result<T>> task)` | `async Task<T?>` |
| `GetOrElse<T>(Result<T> result, Func<Exception, T> onFailure)` | `T` |
| `GetOrThrow<T>(Result<T> result)` | `T` |
| `GetOrElse<T>(Task<Result<T>> task, Func<Exception, Task<T>> onFailure)` | `async Task<T>` |
| `GetOrThrow<T>(Task<Result<T>> task)` | `async Task<T>` |
| `Select<T,TU>(Result<T> result, Func<T, TU> selector)` | `Result<TU>` |
| `Select<T,TU>(Task<Result<T>> task, Func<T, TU> selector)` | `async Task<Result<TU>>` |
| `SelectMany<T,TU>(Result<T> result, Func<T, Result<TU>> binder)` | `Result<TU>` |
| `SelectMany<T,TU,TV>(Result<T> result, Func<T, Result<TU>> binder, Func<T, TU, TV> projector)` | `Result<TV>` |
| `SelectMany<T,TU>(Task<Result<T>> task, Func<T, Task<Result<TU>>> binder)` | `async Task<Result<TU>>` |
| `SelectMany<T,TU,TV>(Task<Result<T>> task, Func<T, Task<Result<TU>>> binder, Func<T, TU, TV> projector)` | `async Task<Result<TV>>` |
| `SelectMany<T,TU,TV>(Task<Result<T>> task, Func<T, Task<Result<TU>>> binder, Func<T, TU, Task<TV>> projector)` | `async Task<Result<TV>>` |

## StringExtensions

`string` · `io.github.ykysnk.utils.Extensions`

| Method | Returns |
| --- | --- |
| `FirstPath(string str, char value)` | `string` |
| `FirstPath(string str, string value)` | `string` |
| `LastPath(string str, char value)` | `string` |
| `LastPath(string str, string value)` | `string` |
| `MiddlePath(string str, char first, char last)` | `string` |
| `MiddlePath(string str, string first, string last)` | `string` |
| `MiddlePath(string str, char first, string last)` | `string` |
| `MiddlePath(string str, string first, char last)` | `string` |
| `TryGetValue(string str, int index, out char? value)` | `bool` |
| `GetValueOrDefault(string str, int index)` | `char?` |

## TaskExtensions

`Task` · `io.github.ykysnk.utils.Editor.Extensions`

| Method | Returns |
| --- | --- |
| `WaitEditor(Task task, Action onCompleted, Action<Exception>? onError = null)` | `void` |
| `WaitEditor<T>(Task<T> task, Action<T> onCompleted, Action<Exception>? onError = null)` | `void` |

## Texture2DExtensions

`Texture2D` · `io.github.ykysnk.utils.Extensions`

| Method | Returns |
| --- | --- |
| `ScaleGPU(Texture2D source, int targetWidth, int targetHeight)` | `Texture2D` |
| `ScaleCPU(Texture2D source, int targetWidth, int targetHeight)` | `Texture2D` |
| `MakeTexture2DClear(Texture2D tex2D, int width, int height)` | `void` |
| `TrimTransparentCPU(Texture2D source, float alphaThreshold = 0.01f)` | `Texture2D` |
| `TrimTransparentGPU(Texture2D source, float alphaThreshold = 0.01f, bool gammaCorrect = true, ComputeShader trimShader = null)` | `Texture2D` |

## TransformExtensions

`Transform` · `io.github.ykysnk.utils.Extensions`

| Method | Returns |
| --- | --- |
| `FullName(Transform transform)` | `string` |
| `GetWorldScale(Transform transform)` | `Vector3` |
| `GetLocalScaleFollowWorldScale(Transform transform)` | `Vector3` |
| `GetTargetLocalScale(Transform transform, Transform other)` | `Vector3` |
| `GetLocalScaleFromLossyScale(Transform transform, Vector3 lossyScale)` | `Vector3` |
| `SetLossyScale(Transform transform, Vector3 lossyScale)` | `void` |
| `SetLossyScaleInPlace(Transform transform, Vector3 lossyScale)` | `void` |
| `GetTargetLocalScale(Transform transform, GameObject other)` | `Vector3` |
| `TransformPointUnscaled(Transform transform, Vector3 position)` | `Vector3` |
| `InverseTransformPointUnscaled(Transform transform, Vector3 position)` | `Vector3` |
| `Distance(Transform transform, Transform other)` | `float` |
| `Distance(Transform transform, Vector3 other)` | `float` |
| `Distance2D(Transform transform, Transform other)` | `float` |
| `Distance2D(Transform transform, Vector3 other)` | `float` |
| `IsCloseRange(Transform transform, Transform other, float distance)` | `bool` |
| `IsCloseRange2D(Transform transform, Transform other, float distance)` | `bool` |
| `IsPlayerCloseRange(Transform transform, float distance)` | `bool` |
| `IsPlayerCloseRange2D(Transform transform, float distance)` | `bool` |

## TranspilerExtensions

`IEnumerable<CodeInstruction>` · `io.github.ykysnk.utils.Editor.HarmonyUtilities`

| Method | Returns |
| --- | --- |
| `WithContext(IEnumerable<CodeInstruction> instructions)` | `IEnumerable<InstructionContext>` |

## Vector3Extensions

`Vector3` · `io.github.ykysnk.utils.Extensions`

| Method | Returns |
| --- | --- |
| `Distance(Vector3 a, Vector3 b)` | `float` |
| `Distance(Vector3 a, Transform b)` | `float` |
| `Distance2D(Vector3 a, Vector3 b)` | `float` |
| `Distance2D(Vector3 a, Transform b)` | `float` |
| `Divide(Vector3 a, Vector3 b)` | `Vector3` |
| `Multiply(Vector3 a, Vector3 b)` | `Vector3` |
| `Round(Vector3 a, int digits, MidpointRounding mode)` | `Vector3` |
| `Round(Vector3 a, int digits)` | `Vector3` |
| `Round(Vector3 a, MidpointRounding mode)` | `Vector3` |
| `Round(Vector3 a)` | `Vector3` |
| `DeltaAngle(Vector3 a, float current)` | `Vector3` |
| `DeltaAngle(Vector3 a)` | `Vector3` |
| `ClampMagnitude(Vector3 vector, float maxLength)` | `Vector3` |
| `Abs(Vector3 vector)` | `Vector3` |
| `Min(Vector3 a, Vector3 b)` | `Vector3` |
| `Max(Vector3 a, Vector3 b)` | `Vector3` |
| `Clamp(Vector3 vector, Vector3 min, Vector3 max)` | `Vector3` |
| `Clamp01(Vector3 vector)` | `Vector3` |
| `DirectionTo(Vector3 from, Vector3 to)` | `Vector3` |
| `InverseDirectionTo(Vector3 from, Vector3 to)` | `Vector3` |
| `LerpUnclamped(Vector3 a, Vector3 b, float t)` | `Vector3` |
| `Lerp(Vector3 a, Vector3 b, float t)` | `Vector3` |
| `MoveTowards(Vector3 current, Vector3 target, float maxDistanceDelta)` | `Vector3` |
| `RotateTowards(Vector3 current, Vector3 target, float maxRadiansDelta, float maxMagnitudeDelta)` | `Vector3` |
| `ProjectOnPlane(Vector3 vector, Vector3 planeNormal)` | `Vector3` |
| `Project(Vector3 vector, Vector3 onNormal)` | `Vector3` |
| `Reflect(Vector3 inDirection, Vector3 inNormal)` | `Vector3` |
| `Clean(Vector3 vector, float threshold = 0.0001f)` | `Vector3` |
| `IsNearly(Vector3 vector, Vector3 target, float threshold = 0.0001f)` | `bool` |
| `IsNearlyZero(Vector3 vector, float threshold = 0.0001f)` | `bool` |
| `CopyFrom(ref Vector3 self, Vector3 other)` | `void` |
| `CleanInPlace(ref Vector3 self, float threshold = 0.0001f)` | `void` |
| `ToFullString(Vector3 v)` | `string` |
| `Approximately(Vector3 self, Vector3 other)` | `bool` |
