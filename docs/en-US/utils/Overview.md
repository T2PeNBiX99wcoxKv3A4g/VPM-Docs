# Overview

A shared library the other packages build on: small editor and runtime helpers that would otherwise be copied into
every project. It ships no UI of its own.

## What is in the package

| Area             | Contents                                                                                        |
|------------------|-------------------------------------------------------------------------------------------------|
| Runtime          | `Utils` logging and assertions, `IsInPrefab` / `IsPlaying`, `ToLayer`, `BasicEditorComponent`   |
| Inspector base   | `BasicEditor`, which runs a custom inspector inside a try/catch and shows a consistent error UI |
| GUI helpers      | `EditorGUILayoutUtility`, `EditorGUIUtils`, `EditorUtils`, `CustomDialogWindow`, `EditorTask`   |
| Drawers          | `BooleanVector3Drawer`, `ColorHexDrawer`                                                        |
| Menus            | `MenuItemObject`, `MenuWrap`, `MenuServiceWrap` for building menu paths consistently            |
| Package handling | `UpmInstaller`, the UPM client used by the YKY Toolkit installer window                         |

## When to use it

Add it as a dependency when a package needs the inspector base class, the GUI helpers, or the UPM client. It is a VPM
dependency of [Localization](../localization/Overview.md) and [YKYToolKit](../yky-toolkit/Overview.md), so installing
either
of those brings it in automatically.
