---
title: install wis
description: download wis for macOS, or build it from source on Linux and Windows.
sidebar:
  order: 1
---

wis is macOS-first. macOS builds are the supported, signed downloads; Linux and
Windows are build targets today, so you build those from source while native
parity lands.

## macOS

download the latest `.dmg` from the [releases page](https://github.com/fuyu-myk/wis/releases/latest),
open it, and drag wis into your Applications folder. the build is universal, so
it runs natively on both Apple Silicon and Intel macs.

:::note
releases are built and signed by GitHub Actions and published to GitHub
Releases. until the first release is published, build wis yourself with the
steps in [build from source](/docs/getting-started/building-from-source/); it
takes only a few minutes.
:::

### first launch

the first time you open wis, macOS Gatekeeper verifies the signature. some
features ask the system for permission the first time they are used:

- **Touch ID** unlocks the [password vault](/docs/features/passwords/).
- **camera and microphone** are gated per site, and the OS shows its own
  one-time prompt for the app itself the first time a page captures.

## Linux and Windows

wis builds and runs on Linux and Windows, but the native pieces (system-data
cookies, biometrics, page zoom, default-browser handoff) are macOS-only for now.
follow [build from source](/docs/getting-started/building-from-source/) to run
wis on these platforms.

## staying current

wis renders with the system WebView, so the **engine itself is patched by your
operating system**. a macOS security update that hardens WebKit hardens wis at
the same time, with nothing to download from us. app updates (new features and
fixes) ship through GitHub Releases.
