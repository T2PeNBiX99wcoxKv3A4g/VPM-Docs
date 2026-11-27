# パッチ

このパッケージは Unity エディタにパッチを当てるための小さな Harmony レイヤーを提供します。パッチを*いつ*適用するかを決め、
グループ化して保持し、アセンブリの再読み込みのたびに取り除くので、パッチを当てたエディタが再コンパイルをまたいでパッチ済みのまま
残ることはありません。

## 仕組み

- アセンブリごとに 1 つの `IPatchLoader` が 1 つの Harmony インスタンスを所有します。
- `PatchCore`（`[InitializeOnLoad]` クラス）が `[assembly: ExportsPatchLoader(typeof(...))]` で宣言されたすべてのローダーを見つけ、
  インスタンスを作成して `Load` を呼びます。
- ローダーは 1 つ以上の `Patch<T>` グループを実行します。グループは自身の `Execute` を実行し、続いてその中に入れ子になった
  すべての `PatchMethod<T>` / `ReversePatchMethod<T>` を実行します。
- アセンブリの再読み込みの前に、ローダーはアンロードされ、その Harmony インスタンスは `UnpatchAll` されます。パッチが積み重なる
  ことはありません。

例外を投げたローダーはログに記録されてスキップされ、他のローダーはそのまま実行されます。

## ローダーの宣言

```csharp
using HarmonyLib;
using io.github.ykysnk.utils.Editor.Patches;

[assembly: ExportsPatchLoader(typeof(MyLoader))]

internal sealed class MyLoader : PatchLoader<MyLoader>
{
    public override string QualifiedName => "my.package.patches";
    public override string DisplayName => "My Package Patches";

    public override void Load(Harmony harmony)
    {
        Run(MyGroup.Instance);
    }
}
```

`QualifiedName` は Harmony の ID でもあり、パッチを再び取り除くためのキーになります。`DisplayName` はログの項目でだけ使われます。

## グループとパッチメソッド

```csharp
internal sealed class MyGroup : Patch<MyGroup>
{
    protected override void Execute(Harmony harmony)
    {
        // Optional: patches the group applies by hand, before the nested ones.
    }

    private sealed class HideHandle : PatchMethod<HideHandle>
    {
        public override MethodInfo? TargetMethod { get; } =
            AccessTools.Method(typeof(UnityEditor.Editor), "DrawHeader");

        private static void Prefix() => EditorGUI.BeginDisabledGroup(true);
        private static void Postfix() => EditorGUI.EndDisabledGroup();
    }
}
```

- `TargetMethod` はパッチを当てるメソッドです。`null` の場合は警告とともにパッチがスキップされます。これにより、任意の依存先を
  ローダー全体を失敗させずに扱えます。
- 入れ子のクラスは `Prefix`、`Postfix`、`Transpiler`、`Finalizer` メソッドを宣言できます。名前で見つけられるため、別の名前を
  使う場合は `PrefixMethod` / `PostfixMethod` / `TranspilerMethod` / `FinalizerMethod` をオーバーライドしてください。
- `Priority`、`Before`、`After`、`Enabled` は Harmony の対応するものにマップされます。`Enabled = false` は Harmony に触れずに
  パッチをスキップします。
- `Log`、`LogWarning`、`LogError`、`Assert` は、パッケージの他の部分と同じくパッチ名を接頭辞として書き出します。

## リバースパッチ

`ReversePatchMethod<T>` は別のメソッドの本体をスタブにコピーするので、エディタのコードからリフレクションなしで private
メソッドを
呼べます。

```csharp
private sealed class ReadSettings : ReversePatchMethod<ReadSettings>
{
    public override MethodInfo? TargetMethod { get; } = AccessTools.Method(typeof(SomeEditor), "ReadSettings");

    // Receives the copied body; the signature must match TargetMethod.
    private static void Reverse() { }
}
```

スタブの名前は既定で `Reverse` です。変更するには `ReverseMethod` をオーバーライドします。任意の `Transpiler` でコピーされた本体を
書き換えられます。

## Transpiler

命令のリストをたどりやすくするヘルパーが 2 つあります:

| ヘルパー        | 用途                                                                                |
|-----------------|-------------------------------------------------------------------------------------|
| `WithContext()` | 各命令をその前後（`InstructionContext`）とともに列挙します。                        |
| `CodeCursor`    | `Current`、`Next`（1 命令の先読み）、`Previous`、`Index` を持つ単一パスのカーソル。 |

```csharp
foreach (var context in instructions.WithContext())
{
    if (context.Current.opcode == OpCodes.Call && context.Previous?.opcode == OpCodes.Ldstr)
        context.Current.opcode = OpCodes.Nop;
}
```

## 注意

- パッチはエディタ専用です。プレイヤービルドでは何も適用されません。
- オプション依存は `ReflectionUtils.FindType` で解決します。見つからなければ例外ではなく `null` が返るため、
  プラグインが無いときはパッチを当てずに済みます。
- アセンブリごとに `PatchAll` は 1 回で十分です。`PatchCore` は複数のローダーが同居していてもアセンブリごとに 1 回だけ呼ぶため、
  `[HarmonyPatch]` クラスが二重に適用されることはありません。
