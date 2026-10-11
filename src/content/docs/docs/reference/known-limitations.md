---
title: known limitations
description: what the system WebView cannot do, and why, stated plainly.
sidebar:
  order: 3
---

wis renders with the operating system's own WebView through Tauri and wry:
WKWebView on macOS (WebKit, the same engine as Safari), WebView2 on Windows, and
WebKitGTK on Linux. that one choice is the source of everything wis is good at,
a small bundle, low RAM, no second engine to update, and on macOS Safari-class
speed and battery, and it dictates the limits below. these are **structural
tradeoffs, not bugs**, and we would rather state them plainly than pretend they
are not there.

## premium DRM video (Widevine)

on macOS, WKWebView's only content decryption module is Apple's FairPlay, not
Google's Widevine, and there is no API to inject a Widevine module: the module
hooks the engine's media pipeline, which WKWebView does not expose. FairPlay
itself is not licensed for general third-party-app playback, and services like
Netflix gate on the Safari app specifically.

the result: premium DRM streaming (Netflix, Disney+, and similar, especially at
1080p or 4K) is degraded or blocked. the mitigation is the
[open in default browser](/docs/features/productivity/#open-in-default-browser)
action, which hands the page to your default browser (Safari, for example), not
an in-app fix. adding native Widevine would mean switching to a Chromium engine
plus a Widevine license, which would forfeit the bundle, RAM, and battery wins
that make wis what it is, so it is explicitly not pursued. (even Firefox forks
like Zen punt DRM to Firefox for the same licensing reason.)

wis does enable WebKit's **Media Source and Encrypted Media Extensions** (see
[media extensions](/docs/features/network-and-tor/#media-extensions-mse-and-eme)),
which restores adaptive streaming on many non-DRM sites and exposes FairPlay to
services that request it. that does not unlock Widevine-gated services, and
Safari-app-gated FairPlay services still refuse.

## browser extensions

wis has no WebExtensions runtime, and on macOS an embedded WKWebView cannot load
Safari Web Extensions at all; those are reserved for Safari. instead, wis ships
a native blocking stack, network-level tracker and ad blocking, cosmetic
filtering, scriptlets, and an element picker, plus a Tampermonkey-style
user-script runner. see
[privacy and blocking](/docs/features/privacy-and-blocking/) for what that
covers. scriptlets and user scripts currently run on macOS only.

## site isolation

WebKit's site isolation, which applies to wis on macOS and Linux, is weaker than
Chromium's (it is still rolling out upstream). on macOS this is offset by strong
OS sandboxing and out-of-process rendering.

## certificates, sign-in prompts, and site info

wis sends every tab through its own privacy proxy, and that design rules out a
few things other browsers offer:

- **no way past a certificate error.** when a site's certificate is expired,
  issued for another name, untrusted, or revoked, wis shows an error page with
  no "proceed anyway" button. this includes self-signed certificates on local
  development servers.
- **no HTTP basic-auth prompt on macOS.** the browser-level username and
  password dialog that some routers, staging servers, and intranet pages use
  (as opposed to a sign-in form on the page) never reaches wis, so those sites
  cannot be signed in to.
- **no site-information panel.** the padlock in the address bar shows whether
  the page loaded over HTTPS, and nothing more: there is no panel behind it
  with certificate details or mixed-content status.

## other gaps

- **no cross-device sync** and **no mobile companion**.
- some newer web APIs (WebUSB, WebBluetooth, web push, PWA install) are partial
  or absent under WebKit.
- **not every feature works on every platform yet.** on Windows and Linux, tab
  history restore, staying logged in across restarts, and per-tab memory in the
  task manager are not available; Linux also lacks the password vault, the AI
  assistant, video popout, and per-site data management for now. where a
  feature is missing, wis says so instead of failing silently. see
  [platform support](/docs/reference/platform-support/) for the full picture.
