# API

## ログとアサーション

すべてのヘルパーが接頭辞を受け取るので、どのパッケージからのメッセージかをコンソールで判別できます。

```csharp
using io.github.ykysnk.utils;

Utils.Log(nameof(MyWindow), "Opened");
Utils.LogWarning(nameof(MyWindow), "Nothing to do");
Utils.LogError(nameof(MyWindow), exception.Message, this);
Utils.Assert(condition, nameof(MyWindow), "Condition must hold");
```

`LogAssert` は例外を投げずに報告し、`Assert` はログを出したうえでアサーション例外を投げます。

## 環境

| メンバー | 戻り値 |
| --- | --- |
| `Utils.IsInPrefab` | 選択がプレハブアセットまたはプレハブステージのオブジェクトのとき true。 |
| `Utils.IsPlaying` | プレイモード中は true。 |
| `Utils.ToLayer(LayerMask)` | ビットが 1 つだけ立っているマスクのレイヤーインデックス。 |

## 拡張メソッド

`io.github.ykysnk.utils.Extensions` には他のパッケージが使う拡張メソッドがあります。例えば:

```csharp
var path = assetPath.MiddlePath('(', ')');   // text between the first pair of brackets
var fullName = transform.FullName();          // "Root/Child/Leaf"
```

## エディタ型

| 型 | 目的 |
| --- | --- |
| `BasicEditor` | エラー UI を備えたインスペクターの基底クラス。 |
| `EditorTask` | 進捗と失敗の報告を備えた非同期タスクのラッパー。 |
| `CustomDialogWindow` | 再利用できるモーダルプロンプト。 |
| `MenuItemObject` | 宣言的なメニュー項目（パス、優先度、検証関数、アクション）。 |
| `UpmInstaller` | UPM パッケージのインストール、削除、更新。 |

## バージョン

パッケージのバージョンはツールキットとは独立しています。`Packages/io.github.ykysnk.utils` の `package.json` が唯一の情報源で、リリースワークフローがタグごとに VPM パッケージを公開します。
