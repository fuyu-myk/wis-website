---
title: wis docs
description: documentation for wis, the browser that sees everything and tells nothing.
---

wis is an open-source, fast, safe and lightweight browser. it is macOS-first and
also runs on Windows and Linux, rendering with the system WebView on each
(WebKit on macOS, WebView2 on Windows, WebKitGTK on Linux), so there is no
second browser engine to bundle, update, or feed memory to. what you get instead
is a small download, low RAM use, and a privacy stack built in rather than
bolted on.

these docs cover how to install wis, every feature it ships, what works on each
platform, and the honest tradeoffs that come with building on the system
WebView.

## start here

- [install wis](/docs/getting-started/installation/) on macOS, Windows, or
  Linux.
- [build from source](/docs/getting-started/building-from-source/) with the
  Makefile.

## features

privacy and blocking run by default: trackers blocked before they load, DNS
over HTTPS, HTTPS-First, cosmetic filtering, Global Privacy Control, and a
built-in Tor toggle. on top of that sit workspaces, split panes, tab folders, a
password vault with a generator and breach check, an opt-in AI assistant, link
previews, custom themes, and more. browse the **features** section in the
sidebar, or jump to a few highlights:

- [workspaces](/docs/features/workspaces/): color-accented profiles, each with
  its own session, proxy, and privacy mode.
- [tabs and panes](/docs/features/tabs-and-panes/): folders, pins, tmux-style
  splits, and sessions that survive a restart.
- [address bar and search](/docs/features/address-bar-and-search/):
  suggestions, custom search engines, and keyword shortcuts.
- [privacy and blocking](/docs/features/privacy-and-blocking/): the native
  blocking stack that replaces extensions.
- [network and Tor](/docs/features/network-and-tor/): DoH, HTTPS-First, and the
  one-toggle Tor VPN.
- [passwords](/docs/features/passwords/): an encrypted vault unlocked by Touch
  ID or Windows Hello, with a password generator and a private breach check.
- [AI assistant](/docs/features/ai-assistant/): an opt-in side panel that is off
  until you bring your own key or point it at a model running on your own
  machine.
- [page tools](/docs/features/page-tools/): reader mode, screenshots, and other
  tools for the page in front of you.

## reference

- [keyboard shortcuts](/docs/reference/keyboard-shortcuts/): every default
  binding, all rebindable.
- [platform support](/docs/reference/platform-support/): what works on macOS,
  Windows, and Linux today.
- [known limitations](/docs/reference/known-limitations/): what the system
  WebView cannot do, stated plainly.
- [architecture](/docs/reference/architecture/): how wis is built, for
  contributors.
