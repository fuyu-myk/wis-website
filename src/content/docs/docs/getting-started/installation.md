---
title: install wis
description: download wis for macOS, Windows, or Linux, and open it for the first time while the builds are not yet code-signed.
sidebar:
  order: 1
---

wis is macOS-first and also runs on Windows and Linux. every platform's
installer is attached to the same release on the
[releases page](https://github.com/fuyu-myk/wis-browser/releases). not every
feature works everywhere yet; see
[platform support](/docs/reference/platform-support/) for what works on each.

## what to download

| platform | file | notes |
|---|---|---|
| macOS | `.dmg` | universal: runs natively on Apple Silicon and Intel macs |
| Windows | `.msi` or `.exe` | two installers for the same app; pick either |
| Linux | `.deb`, `.rpm`, or `.AppImage` | `.deb` for Debian, Ubuntu and their derivatives; `.rpm` for Fedora; `.AppImage` for other distributions |

the Windows and Linux builds are for 64-bit x86 (x86_64) machines.

wis is **not code-signed yet**, so each operating system warns you the first
time you open it. the steps below get past that warning once; after that, wis
opens normally.

## macOS

wis needs **macOS 14 (Sonoma) or later**. open the `.dmg` and drag wis into your
Applications folder.

the first time you open it, macOS says it cannot check the app for malicious
software. to open it anyway:

1. try to open wis once, and dismiss the warning.
2. open **System Settings → Privacy & Security** and scroll down to the
   **Security** section.
3. click **Open Anyway** next to the message about wis, confirm, and enter your
   login password.

the **Open Anyway** button is only available for about an hour after that first
attempt to open wis.

## Windows

run the `.msi` or the `.exe` installer. when you run the installer or first
open wis, Windows shows **Windows protected your PC**. click **More info**, then
**Run anyway**.

## Linux

install the `.deb` or `.rpm` with your package manager, for example:

```bash
sudo apt install ./Wis_*.deb   # Debian, Ubuntu
sudo dnf install ./Wis-*.rpm   # Fedora
```

or make the `.AppImage` executable and run it:

```bash
chmod +x Wis_*.AppImage
./Wis_*.AppImage
```

the AppImage needs FUSE. if FUSE is not installed, run it with
`--appimage-extract-and-run` instead:

```bash
./Wis_*.AppImage --appimage-extract-and-run
```

## permissions on first use

some features ask the system for permission the first time they are used:

- **the [password vault](/docs/features/passwords/)** unlocks with **Touch ID**
  on macOS (or your login password) and **Windows Hello** on Windows. on a PC
  with no Windows Hello PIN or biometric set up, the vault opens without a
  prompt, and its key stays encrypted by Windows. the vault is not available on
  Linux yet.
- **camera and microphone** are gated per site by wis's own prompt, which
  remembers your decision. on macOS the system also asks once, for the app
  itself, the first time a page uses them.

## staying current

wis renders with the system WebView, so the **engine is patched by its vendor,
not by us**: WebKit arrives with macOS updates, Microsoft keeps WebView2 updated
on Windows, and the Linux `.deb` and `.rpm` use your distribution's WebKitGTK package. an
engine security fix reaches wis without a wis update.

app updates (new features and fixes) ship through GitHub Releases. wis has a
built-in updater that checks for a newer release on launch and asks before
installing it, but it stays dormant until the builds are code-signed. until
then, update by installing the latest release from the
[releases page](https://github.com/fuyu-myk/wis-browser/releases).
