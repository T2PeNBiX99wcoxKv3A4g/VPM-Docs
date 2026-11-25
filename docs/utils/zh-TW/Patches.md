# 修補

套件附有一層小型 Harmony 層，用來修補 Unity 編輯器。它決定修補*何時*套用、把它們保持成群組，並在每次程式集重新載入前再次移除，因此被修補的編輯器不會在重新編譯後仍維持修補狀態。

## 運作方式

- 每個程式集有一個 `IPatchLoader`，擁有一個 Harmony 執行個體。
- `PatchCore`（`[InitializeOnLoad]` 類別）會找出所有以 `[assembly: ExportsPatchLoader(typeof(...))]` 宣告的載入器，建立執行個體並呼叫 `Load`。
- 載入器會執行一或多個 `Patch<T>` 群組。群組會先執行自己的 `Execute`，再執行其中巢狀的每個 `PatchMethod<T>` / `ReversePatchMethod<T>`。
- 程式集重新載入前，載入器會被卸載，其 Harmony 執行個體會收到 `UnpatchAll`，因此修補永遠不會累積。

拋出例外的載入器會被記錄並略過；其他載入器仍會執行。

## 宣告載入器

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

`QualifiedName` 同時也是 Harmony ID；它是再次移除修補時使用的鍵。`DisplayName` 只用於日誌項目。

## 群組與修補方法

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

- `TargetMethod` 是要修補的方法。當它為 `null` 時，修補會以警告略過，這也是處理選用相依性的方式，而不會讓整個載入器失敗。
- 巢狀類別可以宣告 `Prefix`、`Postfix`、`Transpiler` 與 `Finalizer` 方法；它們是依名稱尋找的，因此可覆寫 `PrefixMethod` / `PostfixMethod` / `TranspilerMethod` / `FinalizerMethod` 來改用其他名稱。
- `Priority`、`Before`、`After` 與 `Enabled` 對應到 Harmony 的同名項目；`Enabled = false` 會略過修補而不接觸 Harmony。
- `Log`、`LogWarning`、`LogError` 與 `Assert` 會以修補名稱為前置字串寫出，與套件其餘部分相同。

## 反向修補

`ReversePatchMethod<T>` 會把另一個方法的主體複製到虛設方法中，讓編輯器程式碼不必使用反射就能呼叫私有方法：

```csharp
private sealed class ReadSettings : ReversePatchMethod<ReadSettings>
{
    public override MethodInfo? TargetMethod { get; } = AccessTools.Method(typeof(SomeEditor), "ReadSettings");

    // Receives the copied body; the signature must match TargetMethod.
    private static void Reverse() { }
}
```

虛設方法預設命名為 `Reverse`；可覆寫 `ReverseMethod` 來更改。選用的 `Transpiler` 可以改寫複製過來的主體。

## Transpiler

有兩個輔助工具可以讓指令清單更容易走訪：

| 輔助工具 | 用途 |
| --- | --- |
| `WithContext()` | 逐項產生每個指令及其前一個與後一個指令（`InstructionContext`）。 |
| `CodeCursor` | 單次走訪的游標，提供 `Current`、`Next`（窺看一個指令）、`Previous` 與 `Index`。 |

```csharp
foreach (var context in instructions.WithContext())
{
    if (context.Current.opcode == OpCodes.Call && context.Previous?.opcode == OpCodes.Ldstr)
        context.Current.opcode = OpCodes.Nop;
}
```

## 備註

- 修補只在編輯器中生效；玩家組建中不會套用任何修補。
- 選用依賴用 `ReflectionUtils.FindType` 解析；找不到時回傳 `null` 而不是擲回例外，因此外掛不存在時直接略過修補即可。
- 每個程式集一次 `PatchAll` 就足夠：即使同一個程式集中有多個載入器，`PatchCore` 也只會呼叫一次，因此 `[HarmonyPatch]` 類別永遠不會被套用兩次。
