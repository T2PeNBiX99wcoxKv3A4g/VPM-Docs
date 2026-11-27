# ILogger

`io.github.ykysnk.utils.NonUdon.Logger` · `public interface ILogger`

このパッケージが依存するログ出力の面です。実装を差し替えられるようにするためのものです。`Debug` と同じ形で、どの項目にも接頭辞が付きます。

パッケージが提供する実装は [`Logger`](./API-Logger.md) です。メッセージは Unity がテキストに変換するため、null のペイロードは空のメッセージとして記録されます。

## Log

```csharp
void Log(object? message)
void Log(object? message, Object context)
```

メッセージを info レベルで書き出します。`context` を取るオーバーロードは、コンソールで辿れるように項目をそのオブジェクトに結び付けます。null の context も受け付けますが、選択はできません。

## LogWarning

```csharp
void LogWarning(object? message)
void LogWarning(object? message, Object context)
```

メッセージを警告として書き出し、実行はそのまま続きます。`context` を取るオーバーロードは、コンソールで辿れるように項目をそのオブジェクトに結び付けます。

## LogError

```csharp
void LogError(object? message)
void LogError(object? message, Object context)
```

メッセージをエラーとして書き出し、実行はそのまま続きます。`context` を取るオーバーロードは、コンソールで辿れるように項目をそのオブジェクトに結び付けます。

## Assert

```csharp
void Assert(bool condition, object? message)
void Assert(bool condition, object? message, Object context)
```

`condition` が false のときにメッセージを報告します。それ以外では何も書き出しません。`context` を取るオーバーロードは、コンソールで辿れるように項目をそのオブジェクトに結び付けます。
