# EditorGUILayoutUtility

`io.github.ykysnk.utils.Editor` · `public static class EditorGUILayoutUtility`

パッケージのインスペクターが共有する、キャッシュされたラベルスタイルとレイアウトのヘルパーです。

2 つのスタイルは最初のアクセス時に作成され、その後は保持されるため、その時点で有効だったエディターのスキンを保ちます。

## BoldLabel

```csharp
public static GUIStyle BoldLabel { get; }
```

セクション見出し用の 15pt の太字ラベルです。

```csharp
EditorGUILayout.LabelField("Settings", EditorGUILayoutUtility.BoldLabel);
```

## BoldLabel2

```csharp
public static GUIStyle BoldLabel2 { get; }
```

`BoldLabel` の下の小見出し用の、12pt の小さめの太字ラベルです。

## Label

```csharp
public static GUIContent Label(string text, string? textTip = null)
```

テキストと任意のツールチップからラベルのコンテンツを作成します。`textTip` が `null` の場合はツールチップなしのコンテンツになり、そのまま任意の `EditorGUILayout` コントロールに渡せます。

```csharp
EditorGUILayout.LabelField(EditorGUILayoutUtility.Label("Strength", "Damage multiplier"));
```

## Line

```csharp
public static void Line(Color color, float space = 20f, float lineHeight = 1f)
public static void Line(float space = 20f, float lineHeight = 1f)
```

`color` の横罫線を、`space` の半分を上に、残り半分を下にして描画します。そのため全体の垂直方向の領域は常に `space` です。`lineHeight` は罫線の高さ（ピクセル）です。色を取らないオーバーロードは灰色の区切り線を描画し、ほとんどのインスペクターが使うショートカットです。

```csharp
EditorGUILayoutUtility.Line();
```
