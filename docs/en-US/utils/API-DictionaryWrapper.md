# DictionaryWrapper

`io.github.ykysnk.utils.NonUdon` · `public sealed class DictionaryWrapper<TKey, TValue> : IReadOnlyDictionary<TKey, TValue>`

Dictionary-shaped data stored as two parallel lists, because Unity can serialize lists but not a `Dictionary<TKey, TValue>`.

Lookups scan `keys` linearly, so the type is meant for small collections that have to survive serialization rather than for hot paths. Serialized or hand-edited data can leave `keys` and `values` at different lengths, and nothing here repairs or validates that. The constructor is internal; create instances with [`Wrapper.Create`](./API-Wrapper.md) or through the implicit conversion from a dictionary.

## keys

```csharp
public List<TKey> keys;
```

The keys in stored order. The value for each key sits at the same index in `values`.

## values

```csharp
public List<TValue> values;
```

The values aligned with `keys`. The two lists can end up at different lengths after deserialization or hand editing; no member repairs that, and a read past the end of `values` fails like any other list access.

## Count

```csharp
public int Count { get; }
```

The number of entries, taken from `keys` regardless of how many values were stored.

## TryGetValue

```csharp
public bool TryGetValue(TKey key, out TValue value)
```

Finds the key by scanning `keys`, then reads the value at that index. When the key is absent it returns false and sets `value` to the default of `TValue`.

```csharp
if (map.TryGetValue("tint", out var tint))
    Apply(tint);
```

## this[TKey key]

```csharp
public TValue this[TKey key] { get; }
```

The value for `key`, resolved through the first matching occurrence when a key repeats. Throws `KeyNotFoundException` when the key is not stored in the wrapper.

## Keys

```csharp
public IEnumerable<TKey> Keys { get; }
```

The keys in stored order. The live `keys` list is handed out, not a copy, so changes to it are visible here.

## Values

```csharp
public IEnumerable<TValue> Values { get; }
```

The values in stored order. The live `values` list is handed out, not a copy, so changes to it are visible here.

## GetEnumerator

```csharp
public IEnumerator<KeyValuePair<TKey, TValue>> GetEnumerator()
IEnumerator IEnumerable.GetEnumerator()
```

Pairs each key with the value at the same index. The pairs are created as the enumerator advances, so it reads the lists while it walks them; the explicit interface member forwards to the generic version.

## ContainsKey

```csharp
public bool ContainsKey(TKey key)
```

Whether `keys` contains `key`, using the default equality comparer of `TKey`.

## ContainsValue

```csharp
public bool ContainsValue(TValue value)
```

Whether `values` contains `value`, using the default equality comparer of `TValue`; the answer does not depend on the key at that index being valid.

## ToDictionary

```csharp
public Dictionary<TKey, TValue> ToDictionary()
```

Copies the pairs into a new dictionary sized to `Count` and filled in list order. Later changes to either side are not shared, and a key that repeats in `keys` collapses to its last value.

## implicit operator Dictionary

```csharp
public static implicit operator Dictionary<TKey, TValue>(DictionaryWrapper<TKey, TValue> wrapper)
```

Converts by copying, the same as `ToDictionary`; the wrapper is left untouched.

## implicit operator DictionaryWrapper

```csharp
public static implicit operator DictionaryWrapper<TKey, TValue>(Dictionary<TKey, TValue> dictionary)
```

Copies the dictionary into a new wrapper, with the keys and values in the dictionary's enumeration order. The dictionary is not kept by reference, so changing it afterwards does not affect the wrapper.
