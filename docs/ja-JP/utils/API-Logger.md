# Logger

`io.github.ykysnk.utils.NonUdon.Logger` · `public class Logger<T> : ILogger`

すべての項目に `T` の名前を前置するロガーです。呼び出し側で接頭辞を書かなくても、コンソールの行からどの型が出したか分かります。`T` ごとに 1 つのインスタンスを共有します。

接頭辞は `typeof(T).Name` で、型が最初に使われたときに 1 回だけ読み取られます。項目は [`Utils`](./API-Utils.md) 経由で書き出されるため、直接呼び出したときと同じ色付きの `[prefix]` 形式と `[HideInCallstack]` の扱いになります。

## Instance

```csharp
public static Logger<T> Instance { get; }
```

`T` 用に共有されるロガーで、最初の使用時に作られ、その後は再利用されます。`LazyThreadSafetyMode.ExecutionAndPublication` を指定した `Lazy<Logger<T>>` によるスレッドセーフなシングルトンなので、複数のスレッドから記録しても同じインスタンスに届きます。

```csharp
Logger<MyWindow>.Instance.Log("Opened");
```

## Log

```csharp
public void Log(object? message)
public void Log(object? message, Object context)
```

型名を前置した info レベルのメッセージを書き出します。`context` を取るオーバーロードは、コンソールの項目をクリックしたときにそのオブジェクトも強調表示します。

## LogWarning

```csharp
public void LogWarning(object? message)
public void LogWarning(object? message, Object context)
```

型名を前置した警告を書き出し、実行はそのまま続きます。`context` を取るオーバーロードは、コンソールの項目をクリックしたときにそのオブジェクトも強調表示します。

## LogError

```csharp
public void LogError(object? message)
public void LogError(object? message, Object context)
```

型名を前置したエラーを書き出し、実行はそのまま続きます。`context` を取るオーバーロードは、コンソールの項目をクリックしたときにそのオブジェクトも強調表示します。

## Assert

```csharp
public void Assert(bool condition, object? message)
public void Assert(bool condition, object? message, Object context)
```

`condition` が false のときに、接頭辞付きのメッセージを報告します。それ以外では何も書き出しません。`context` を取るオーバーロードは、コンソールの項目をクリックしたときにそのオブジェクトも強調表示します。
