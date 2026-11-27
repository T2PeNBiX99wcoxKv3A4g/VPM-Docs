# ListWrapper

`io.github.ykysnk.utils.NonUdon` · `public sealed class ListWrapper<T> : IReadOnlyList<T>`

A list behind a single serialized field, so a member typed as `IReadOnlyList<T>` or another interface still has something Unity can store and show in the inspector.

The constructor is internal: create instances with [`Wrapper.Create`](./API-Wrapper.md) or by assigning a `List<T>` through the implicit conversion. The wrapper is read-only — there is no add or remove member — so changes go through the live `items` list.

## items

```csharp
public List<T> items;
```

The stored items, in order. This is the single serialized field of the wrapper, so it is also what the inspector shows and edits.

## Count

```csharp
public int Count { get; }
```

The number of stored items, i.e. the length of `items`.

## this[int index]

```csharp
public T this[int index] { get; }
```

The item at `index`, read from the backing list. An invalid index fails exactly like the backing list does.

```csharp
var first = wrapper[0];
```

## GetEnumerator

```csharp
public IEnumerator<T> GetEnumerator()
IEnumerator IEnumerable.GetEnumerator()
```

Enumerates `items` directly, without copying it. The explicit interface member forwards to the generic version, which is what `foreach` uses.

## Contains

```csharp
public bool Contains(T item)
```

Whether `items` contains `item`, using the default equality comparer of `T`.

## implicit operator List

```csharp
public static implicit operator List<T>(ListWrapper<T> wrapper)
```

Hands out the backing list itself, not a copy, so changes made through the returned list affect the wrapper.

## implicit operator ListWrapper

```csharp
public static implicit operator ListWrapper<T>(List<T> list)
```

Copies the list into a new wrapper, so later changes to `list` are not visible here. A null list throws while the backing list is created.
