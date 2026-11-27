# BasicEditorComponent

`io.github.ykysnk.utils` · `public abstract class BasicEditorComponent : MonoBehaviour, IUtilsEditorOnly`

Empty base class for helper behaviours that must not survive into the uploaded avatar or world.

```csharp
public abstract class BasicEditorComponent : MonoBehaviour, IUtilsEditorOnly
```

It adds no members of its own, and the class keeps the normal `MonoBehaviour` behaviour, so a derived component can still be attached to an object and configured in the inspector. Deriving from it is enough to opt in: the build pipeline removes every component that implements [`IUtilsEditorOnly`](./API-IUtilsEditorOnly.md), which this class already does.
