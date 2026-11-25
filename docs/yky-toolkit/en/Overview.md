# Overview

YKY Toolkit is a set of editor windows and context menu actions for everyday Unity work: installing packages,
watching imports, monitoring memory, cleaning caches and editing transforms.

Everything lives under **Tools > YKYToolkit**, with context actions under **GameObject > YKYToolkit**,
**Assets > YKYToolkit** and the component context menu.

## What is included

| Window | What it does |
| --- | --- |
| [UPM Installer](UPM-Installer) | Install, remove and update UPM packages, and keep reusable package lists. |
| [Import Watcher](Import-Watcher) | Records what was imported, when and from where, with per-extension colors. |
| Delete History | Lists deleted and recreated assets for the session. |
| Unity Resource Monitor | Live memory and CPU counters for the editor process. |
| [Tools](Tools) | Cache cleanup, asset backup, GUID copy, constraint conversion and component copy/paste. |
| [Transform Inspector](Transform-Inspector) | The enhanced transform inspector with expressions, alignment and clipboard. |

## Dependencies

| Package | Why |
| --- | --- |
| `io.github.ykysnk.utils` | Inspector base class, GUI helpers and the UPM client. |
| `io.github.ykysnk.localization` | The editor strings; the windows are translated. |

Both are VPM dependencies and are resolved automatically. `jp.lilxyzw.editortoolbox` is optional: when it is present,
the toolkit uses its package importer for `.unitypackage` files.
