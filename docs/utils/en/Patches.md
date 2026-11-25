# Patches

The package ships a small Harmony layer for patching the Unity editor. It decides *when* patches are applied,
keeps them grouped and removes them again before every assembly reload, so a patched editor does not stay patched
across recompiles.

## How it works

- One `IPatchLoader` per assembly owns one Harmony instance.
- `PatchCore` (an `[InitializeOnLoad]` class) finds every loader declared with
  `[assembly: ExportsPatchLoader(typeof(...))]`, creates the instance and calls `Load`.
- A loader runs one or more `Patch<T>` groups. A group runs its own `Execute` and then every
  `PatchMethod<T>` / `ReversePatchMethod<T>` nested inside it.
- Before an assembly reload, the loader is unloaded and its Harmony instance gets `UnpatchAll`, so patches never
  stack up.

A loader that throws is logged and skipped; the other loaders still run.

## Declaring a loader

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

`QualifiedName` is also the Harmony id; it is the key used to remove the patches again. `DisplayName` is only used
in log entries.

## Groups and patch methods

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

- `TargetMethod` is the method to patch. When it is `null` the patch is skipped with a warning, which is how an
  optional dependency can be handled without failing the whole loader.
- The nested class may declare `Prefix`, `Postfix`, `Transpiler` and `Finalizer` methods; they are found by name, so
  override `PrefixMethod` / `PostfixMethod` / `TranspilerMethod` / `FinalizerMethod` to use different names.
- `Priority`, `Before`, `After` and `Enabled` map to the Harmony equivalents; `Enabled = false` skips the patch
  without touching Harmony.
- `Log`, `LogWarning`, `LogError` and `Assert` write with the patch name as prefix, like the rest of the package.

## Reverse patches

`ReversePatchMethod<T>` copies the body of another method into a stub, so editor code can call a private method
without reflection:

```csharp
private sealed class ReadSettings : ReversePatchMethod<ReadSettings>
{
    public override MethodInfo? TargetMethod { get; } = AccessTools.Method(typeof(SomeEditor), "ReadSettings");

    // Receives the copied body; the signature must match TargetMethod.
    private static void Reverse() { }
}
```

The stub is named `Reverse` by default; override `ReverseMethod` to change it. An optional `Transpiler` may rewrite
the copied body.

## Transpilers

Two helpers make instruction lists easier to walk:

| Helper | Use |
| --- | --- |
| `WithContext()` | Yields every instruction with its predecessor and successor (`InstructionContext`). |
| `CodeCursor` | A single-pass cursor with `Current`, `Next` (one-instruction peek), `Previous` and `Index`. |

```csharp
foreach (var context in instructions.WithContext())
{
    if (context.Current.opcode == OpCodes.Call && context.Previous?.opcode == OpCodes.Ldstr)
        context.Current.opcode = OpCodes.Nop;
}
```

## Notes

- Patches are editor-only; nothing is applied in a player build.
- Resolve an optional dependency with `ReflectionUtils.FindType`; it returns `null` instead of throwing, so the
  loader simply skips the patch when the plugin is missing.
- One `PatchAll` per assembly is enough: `PatchCore` calls it once per assembly even when several loaders live in
  it, so `[HarmonyPatch]` classes are never applied twice.
