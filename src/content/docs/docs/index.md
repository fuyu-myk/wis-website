---
title: wis docs
description: documentation for wis, the browser that sees everything and tells nothing.
---

wis is an open-source, fast, safe and lightweight browser for macOS. it renders
with the same WebKit engine your mac already runs, so there is no second browser
engine to bundle, update, or feed memory to. what you get instead is a tiny
download, low RAM use, Safari-class speed and battery, and a privacy stack built
in rather than bolted on.

these docs cover how to install wis, every feature it ships, and the honest
tradeoffs that come with building on the system WebView.

## start here

- [install wis](/docs/getting-started/installation/) for macOS, or build it
  yourself on Linux and Windows.
- [build from source](/docs/getting-started/building-from-source/) with the
  Makefile.

## features

privacy and blocking run by default: trackers blocked at the engine, DNS over
HTTPS, HTTPS-First, cosmetic filtering, and a built-in Tor toggle. on top of
that sit workspaces, split panes, tab folders, a Touch ID password vault, link
previews, custom themes, and more. browse the **features** section in the
sidebar, or jump to a few highlights:

- [workspaces](/docs/features/workspaces/): color-accented profiles, each with
  its own session, proxy, and privacy mode.
- [tabs and panes](/docs/features/tabs-and-panes/): folders, pins, tmux-style
  splits, and sessions that survive a restart.
- [privacy and blocking](/docs/features/privacy-and-blocking/): the native
  blocking stack that replaces extensions.
- [network and Tor](/docs/features/network-and-tor/): DoH, HTTPS-First, and the
  one-toggle Tor VPN.

## reference

- [keyboard shortcuts](/docs/reference/keyboard-shortcuts/): every default
  binding, all rebindable.
- [known limitations](/docs/reference/known-limitations/): what the WebKit
  engine cannot do, stated plainly.
- [architecture](/docs/reference/architecture/): how wis is built, for
  contributors.
