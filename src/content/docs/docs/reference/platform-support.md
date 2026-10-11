---
title: platform support
description: what works on macOS, Windows, and Linux today, feature by feature, and how wis tells you when something is missing.
sidebar:
  order: 2
---

wis is macOS-first. Windows is a tier-1 port that is still growing, and Linux is
the newest port. each platform renders with its own system WebView, so a
feature that reaches into the engine needs its own native implementation on
each one, and a few have not landed everywhere yet. this page lists what
differs, plainly.

| | macOS | Windows | Linux |
|---|---|---|---|
| engine | WebKit (WKWebView) | WebView2 | WebKitGTK |
| status | primary platform | tier-1, still growing | newest port, see [Linux status](#linux-status) |

## the same everywhere

these work on all three platforms: tracker and ad blocking at the network level,
DNS over HTTPS, HTTPS-First, Global Privacy Control, Tor and per-workspace
proxies, cosmetic filtering and the element picker, the navigation safety check,
peek, reader mode, per-site zoom, print and save as PDF, downloads, the tab
audio indicator and mute, error pages for failed loads, and rebindable keyboard
shortcuts. after a restart, wis reopens your windows, workspaces, and tabs on
every platform.

## privacy and security

| feature | macOS | Windows | Linux |
|---|---|---|---|
| password vault, generator, breach check | yes, unlocked with Touch ID | yes, unlocked with Windows Hello | not yet (no OS key store) |
| stay logged in across restarts | yes | not yet | not yet |
| fraudulent website warning | yes | no (the navigation safety check still runs) | no (the navigation safety check still runs) |
| scriptlets and user scripts | yes | not yet | not yet |
| per-site data management | yes | yes | not yet |
| clear cookies, cache, and site storage | yes | yes | not yet (history clears) |
| camera and microphone consent | yes | yes | yes in tabs; peek and widget panels cannot use them yet |

scriptlets are what block ads inside YouTube's player, so that part of ad
blocking is macOS-only for now. network-level blocking is unaffected.

## tabs, media, and tools

| feature | macOS | Windows | Linux |
|---|---|---|---|
| tab history restore (back and forward, scroll, form state) | yes, after sleep and after a restart | not yet | not yet |
| task manager memory per tab | yes | no (WebView2 shares one process across tabs) | no |
| find in page | match count and position | match count and position, highlighted in your desktop accent color | match count only |
| screenshots | visible page, region, and the whole window | visible page and region; window captures the page only | visible page and region; window captures the page only |
| video popout | floating mini player that moves the tab's own video | the engine's picture-in-picture | not yet |
| autoplay control | yes | no (WebView2 applies its own rule) | yes; block sound acts as block all |
| AI assistant | yes | yes | no (no OS key store for the provider key) |
| two-finger swipe back and forward | yes | yes | yes |
| set as default browser | yes | yes, through Windows Default apps settings | yes |

## look and feel

| feature | macOS | Windows | Linux |
|---|---|---|---|
| glass window styling | system vibrancy | Mica on Windows 11 (none on Windows 10) | none |
| rounded corners | yes, follows **settings → design** | yes, follows **settings → design** | square; the corners setting is locked to sharp |
| sites follow wis's light or dark mode | yes | yes | not yet |
| menu bar | native macOS menu | none; every command lives in wis's own interface | none; every command lives in wis's own interface |

## when a feature is missing

wis does not fail silently. if you invoke a feature that has no working backend
on your platform, through its shortcut or the
[command palette](/docs/features/productivity/#command-palette), a short notice
says the feature is not available on that platform, instead of nothing
happening. today that covers video popout on Linux. settings rows for
platform-limited features say so in place: the AI assistant and password vault
on Linux, site data on Linux, the fraudulent website warning off macOS, and
autoplay on Windows.

## Linux status

the Linux port compiles on every change in CI (Ubuntu 22.04), and its core flows
have been checked by hand in an X11 virtual machine. how glass, transparency,
and other rendering details look on real hardware has not been verified yet, and
a few individual features (the camera and microphone prompt among them) are
wired up but not yet exercised. expect rough edges, and please report them on
[GitHub](https://github.com/fuyu-myk/wis-browser/issues).

for the engine tradeoffs that apply to every platform, see
[known limitations](/docs/reference/known-limitations/).
