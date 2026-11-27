# ListExtensions

`io.github.ykysnk.utils.Extensions` · `public static class ListExtensions`

Bounds-checked index access and in-place editing helpers for lists, arrays and other collections.

## TryGetValue

```csharp
public static bool TryGetValue<T>(this IList<T> list, int index, out T value)
public static bool TryGetValue<T>(this T[] array, int index, out T value)
```

Reads the element at the given index without throwing. A negative index or one past the end returns `false` and sets `value` to `default(T)`. The `IList<T>` overload bounds the index by `Count`, the array overload by `Length`. The array overload declares no constraint, so it covers arrays of any element type, and it is the one picked for an array receiver because an array converts to `T[]` by identity.

```csharp
if (frames.TryGetValue(0, out var first)) Use(first);
```

## GetValueOrDefault

```csharp
public static T GetValueOrDefault<T>(this IList<T> list, int index)
public static T GetValueOrDefault<T>(this T[] array, int index)
```

The element at the given index, or `default(T)` when the index is out of range instead of an exception. Both overloads forward to the matching [`TryGetValue`](#trygetvalue).

## TrySetValue

```csharp
public static bool TrySetValue<T>(this IList<T> list, int index, T value)
public static bool TrySetValue<T>(this T[] array, int index, T value)
```

Overwrites the element at the given index without throwing. An out-of-range index leaves the collection untouched and returns `false`; a valid one writes through the indexer and returns `true`. A read-only list still throws from its indexer, and the array overload mutates the array in place.

## Rebuild

```csharp
public static void Rebuild<T>(this ICollection<T> collection)
public static void Rebuild<T>(this ICollection<T> collection, Func<T, bool> removeAll)
```

Removes duplicate entries in place, keeping the first occurrence of each value and the relative order of the rest, using the default equality comparer. The collection is cleared and refilled, so it must support `Clear` and `Add`, and any enumeration started before the call is invalidated; arrays and other fixed-size collections throw. The second overload first drops every element for which `removeAll` returns `true`, then deduplicates as the parameterless overload does.

## AddRange

```csharp
public static void AddRange<T>(this ICollection<T> collection, IEnumerable<T> items)
```

Appends the items one by one, because `ICollection<T>` itself has no bulk add. An empty sequence is a no-op.

## RemoveAll

```csharp
public static void RemoveAll<T>(this ICollection<T> collection, Func<T, bool> match)
```

Removes every element that matches. The matches are collected into a temporary list first, so the collection is never enumerated while it is being modified, and one removal happens per match by equality.
