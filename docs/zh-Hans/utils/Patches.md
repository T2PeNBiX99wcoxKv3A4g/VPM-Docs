# 补丁

该包附带一个小巧的 Harmony 层，用于给 Unity 编辑器打补丁。它决定补丁*何时*
被应用，让它们保持分组，并在每次程序集重载之前再次将其移除，因此打过补丁的编辑器不会在重新编译后仍停留在已打补丁的状态。

## 工作原理

- 每个程序集一个 `IPatchLoader`，各自拥有一个 Harmony 实例。
- `PatchCore`（一个 `[InitializeOnLoad]` 类）会找出所有用 `[assembly: ExportsPatchLoader(typeof(...))]` 声明的加载器，创建实例并调用
  `Load`。
- 一个加载器运行一个或多个 `Patch<T>` 分组。一个分组先运行自己的 `Execute`，然后运行嵌套在其中的每个 `PatchMethod<T>` /
  `ReversePatchMethod<T>`。
- 在程序集重载之前，加载器被卸载，其 Harmony 实例执行 `UnpatchAll`，因此补丁永远不会叠加。

抛出异常的加载器会被记录并跳过；其他加载器仍会继续运行。

## 声明加载器

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

`QualifiedName` 同时也是 Harmony id；它是再次移除补丁时所用的键。`DisplayName` 只出现在日志条目中。

## 分组与补丁方法

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

- `TargetMethod` 是要打补丁的方法。当它为 `null` 时，该补丁会被跳过并给出警告，这样就能在不使整个加载器失败的情况下处理可选依赖。
- 嵌套类可以声明 `Prefix`、`Postfix`、`Transpiler` 和 `Finalizer` 方法；它们按名称查找，因此可以重写 `PrefixMethod` /
  `PostfixMethod` / `TranspilerMethod` / `FinalizerMethod` 来使用其他名称。
- `Priority`、`Before`、`After` 和 `Enabled` 对应 Harmony 中的同名项；`Enabled = false` 会在完全不触碰 Harmony 的情况下跳过补丁。
- `Log`、`LogWarning`、`LogError` 和 `Assert` 会以补丁名称作为前缀写入，与本包的其他部分一致。

## 反向补丁

`ReversePatchMethod<T>` 把另一个方法的方法体复制到一个存根中，因此编辑器代码无需反射即可调用私有方法：

```csharp
private sealed class ReadSettings : ReversePatchMethod<ReadSettings>
{
    public override MethodInfo? TargetMethod { get; } = AccessTools.Method(typeof(SomeEditor), "ReadSettings");

    // Receives the copied body; the signature must match TargetMethod.
    private static void Reverse() { }
}
```

存根默认名为 `Reverse`；重写 `ReverseMethod` 可以更改它。可选的 `Transpiler` 可以重写被复制的方法体。

## 转译器（Transpiler）

有两个辅助方法可以让遍历指令列表更容易：

| 辅助方法        | 用途                                                                          |
|-----------------|-------------------------------------------------------------------------------|
| `WithContext()` | 逐个产出每条指令及其前驱与后继（`InstructionContext`）。                      |
| `CodeCursor`    | 单遍游标，提供 `Current`、`Next`（向前查看一条指令）、`Previous` 和 `Index`。 |

```csharp
foreach (var context in instructions.WithContext())
{
    if (context.Current.opcode == OpCodes.Call && context.Previous?.opcode == OpCodes.Ldstr)
        context.Current.opcode = OpCodes.Nop;
}
```

## 说明

- 补丁仅限编辑器使用；玩家构建中不会应用任何补丁。
- 可选依赖用 `ReflectionUtils.FindType` 解析；找不到时返回 `null` 而不是抛异常，因此插件不存在时直接跳过补丁即可。
- 每个程序集一次 `PatchAll` 就够了：即使其中有多个加载器，`PatchCore` 每个程序集也只调用一次，因此 `[HarmonyPatch]`
  类永远不会被应用两次。
