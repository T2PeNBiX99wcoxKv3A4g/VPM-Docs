# API

このパッケージは 3 つのアセンブリで構成されています。以下に挙げるものはすべて public です。廃止されたメンバーも、まだ
コンパイルできるため含めています。

| アセンブリ                        | 名前空間                                           | 内容                                                                     |
|-----------------------------------|----------------------------------------------------|--------------------------------------------------------------------------|
| `io.github.ykysnk.utils`          | `io.github.ykysnk.utils`                           | `Utils`、`IUtilsEditorOnly`、`BasicEditorComponent`                      |
| `io.github.ykysnk.utils.non-udon` | `io.github.ykysnk.utils.NonUdon`                   | `BooleanVector3`、`ColorHex`                                             |
| `io.github.ykysnk.utils.Editor`   | `io.github.ykysnk.utils.Editor` とそのサブ名前空間 | インスペクターの基底、GUI ヘルパー、メニュー、UPM クライアント、ドロワー |

- [ランタイム](./API-Runtime.md)
- [インスペクターとドロワー](./API-Editor.md)
- [GUI ヘルパー](./API-GUI.md)
- [メニューと拡張](./API-Menus.md)
- [パッケージ操作](./API-Packages.md)
- [リフレクション](./API-Reflection.md)
- [型インデックス](./API-Type-Index.md)
