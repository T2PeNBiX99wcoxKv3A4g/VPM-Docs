# Installation

The package is `io.github.ykysnk.utils`, distributed through the same VPM repository as the other packages. Add it with
ALCOM, the VPM CLI, or by adding the repository to the project.

It has no VPM dependencies of its own.

Most projects do not install it directly: [Localization](../localization/Installation) and
[YKYToolKit](../yky-toolkit/Installation) declare it, and VPM resolves it for you.

## Namespaces

| Namespace                           | Use                                                   |
|-------------------------------------|-------------------------------------------------------|
| `io.github.ykysnk.utils`            | `Utils` (logging, assertions), `BasicEditorComponent` |
| `io.github.ykysnk.utils.Editor`     | `BasicEditor`, the GUI helpers and the UPM client     |
| `io.github.ykysnk.utils.Extensions` | Small extension methods used by the other packages    |

## Updating

The package follows the repository's release tags; the YKY Toolkit window lists installed versions and can update
them from inside Unity. See [UPM Installer](../yky-toolkit/UPM-Installer).
