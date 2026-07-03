---
title: known limitations
description: what the system WebKit engine cannot do, and why, stated plainly.
sidebar:
  order: 2
---

wis renders with the operating system's WebView (WKWebView on macOS) through
Tauri and wry, the same engine as Safari. that one choice is the source of
everything wis is good at, a tiny bundle, low RAM, Safari-class speed and
battery, and no second engine to update, and it dictates the limits below. these
are **structural tradeoffs, not bugs**, and we would rather state them plainly
than pretend they are not there.

## premium DRM video (Widevine)

WKWebView's only content decryption module is Apple's FairPlay, not Google's
Widevine, and there is no API to inject a Widevine module. FairPlay itself is not
licensed for general third-party-app playback, and services like Netflix gate on
the Safari app specifically.

the result: premium DRM streaming (Netflix, Disney+, and similar, especially at
1080p or 4K) is degraded or blocked. the mitigation is the
[open in default browser](/docs/features/productivity/#open-in-default-browser)
action, which hands the page to Safari, not an in-app fix. adding native Widevine
would mean bundling a Chromium engine plus a Widevine license, which would forfeit
the bundle, RAM, and battery wins that make wis what it is, so it is explicitly
not pursued. (even Firefox forks like Zen punt DRM to Firefox for the same
licensing reason.)

wis does enable WebKit's **Media Source and Encrypted Media Extensions** (see
[media extensions](/docs/features/network-and-tor/#media-extensions-mse-and-eme)),
which restores adaptive streaming on many non-DRM sites and exposes FairPlay to
services that request it. that does not unlock Widevine-gated services, and
Safari-app-gated FairPlay services still refuse.

## browser extensions

an embedded WKWebView cannot load Safari Web Extensions; those are reserved for
Safari. instead of a WebExtensions runtime, wis ships a native blocking stack,
content-rule blocking, an ad-blocking engine, cosmetic filtering, scriptlets, and
an element picker, plus a Tampermonkey-style user-script runner. see
[privacy and blocking](/docs/features/privacy-and-blocking/) for what that covers.

## site isolation

WebKit's site isolation is weaker than Chrome's (it is still rolling out
upstream). this is offset by strong OS sandboxing and out-of-process rendering.

## other gaps

- **no cross-device sync** and **no mobile companion**.
- some newer web APIs (WebUSB, WebBluetooth, web push, PWA install) are partial
  or absent under WebKit.
- native feature parity, system-data cookies, biometrics, page zoom, and the
  default-browser handoff, is **macOS-only** today. wis builds and runs on Linux
  and Windows, but those pieces are not yet at parity.
