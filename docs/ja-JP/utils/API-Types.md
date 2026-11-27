# その他の型

## 型インデックス

上のページに含まれない公開型を、名前空間ごとにまとめたものです。目的のテキストは各型自身の概要から取っています。

### io.github.ykysnk.utils.NonUdon

| 型                                                                                                     | 目的                                                                                       |
|--------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| `DictionaryWrapper<TKey, TValue>`                                                                      | Unity のシリアライズのために、辞書形式のデータを 2 つの並列リストとして保存するもの。      |
| `HashUtils`, `HashType`                                                                                | 小文字の 16 進ダイジェストによるテキストのハッシュ。                                       |
| `JsonUtils`                                                                                            | 例外を投げたり null を返したりする代わりに失敗を報告する `JsonUtility` のラッパー。        |
| `ListWrapper<T>`                                                                                       | 1 つのシリアライズフィールドの背後にあるリスト。インターフェース型のメンバーを保存できる。 |
| `ReflectionUtils`, `ReflectionWrapper`, `Reflect`                                                      | キャッシュされたリフレクション検索、コンパイル済みデリゲート、連鎖可能なメンバーアクセス。 |
| `ReflectionAccess`, `FieldAccess`, `PropertyAccess`, `MethodAccess`                                    | `Reflect` を支えるアクセサ型。                                                             |
| `Result<T>`, `ResultExtensions`, `Try`, `Unit`                                                         | 失敗を持ち運ぶ結果、連鎖のヘルパー、例外を使わない実行。                                   |
| `Wrapper`                                                                                              | `ListWrapper<T>` と `DictionaryWrapper<TKey, TValue>` の入口。                             |
| `ILogger`, `Logger<T>`                                                                                 | パッケージが前提とするログの表面と、その型ごとの実装。                                     |
| `FieldGetter<T>`, `FieldSetter<T>`, `PropertyGetter<T>`, `PropertySetter<T>`, `WrapAction`, `WrapFunc` | リフレクションラッパーが使うデリゲート。                                                   |

### io.github.ykysnk.utils.Editor.Patches

| 型                                             | 目的                                                                                               |
|------------------------------------------------|----------------------------------------------------------------------------------------------------|
| `IPatch`, `Patch<T>`                           | ひとまとまりとして適用されるパッチのグループ。サブクラスが入れ子のパッチメソッドのコンテナになる。 |
| `IPatchLoader`, `PatchLoader<T>`               | 1 つのアセンブリの入口。Harmony インスタンスを受け取り、パッチグループを実行する。                 |
| `IPatchMethod`, `PatchMethod<T>`               | 1 つの Harmony パッチセット: 対象メソッドと prefix、postfix、transpiler、finalizer。               |
| `IReversePatchMethod`, `ReversePatchMethod<T>` | スタブが別メソッド本体の呼び出し可能なコピーを受け取るリバースパッチ。                             |
| `ExportsPatchLoader`                           | エディタの読み込み時に実行するパッチローダー型を宣言するアセンブリ属性。                           |

### io.github.ykysnk.utils.Editor.HarmonyUtilities

| 型                     | 目的                                                                        |
|------------------------|-----------------------------------------------------------------------------|
| `CodeCursor`           | transpiler の命令列を流し読みするカーソル。現在、次、履歴にアクセスできる。 |
| `TranspilerExtensions` | `WithContext` を通して、各命令をその前後と一緒に列挙する。                  |

### io.github.ykysnk.utils.Editor.UIElements

| 型                    | 目的                                                                                        |
|-----------------------|---------------------------------------------------------------------------------------------|
| `BooleanVector3Field` | `BooleanVector3` を 3 つのトグルとして編集する UI Toolkit フィールド。UXML から作成できる。 |
