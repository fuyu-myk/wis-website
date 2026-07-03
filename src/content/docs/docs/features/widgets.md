---
title: widgets
description: a quick-launch dock of social and AI apps that open in a floating side panel without leaving your tab.
sidebar:
  order: 8
---

widgets are a quick-launch dock of your favourite web apps, social and AI, that
open in a floating panel beside your tabs. it is a fast way to glance at WhatsApp
or ask ChatGPT something without opening a tab or losing your place.

## the dock

choose your widgets in **settings → sidebar widgets** (toggle chips, grouped
social and AI). the dock renders in every layout: two rows in the sidebar, a
vertical column in the top-tabs rail. drag the favicons to reorder them; that
order is the display order everywhere.

the catalog covers common social and messaging apps and the major AI providers.
favicons are prefetched and cached, with a letter-tile fallback.

## the widget panel

click a widget to open it in a panel that floats above your tabs on the side
nearest the rail (Opera-style). the panel shares the current workspace's session,
so your logins persist, its proxy, and the same tracker filtering as your tabs.

- **switching widgets is instant**: panels stay loaded and hidden, so each keeps
  its own in-page state (drafts, scroll, live connections).
- a header bar shows the current host and offers **mute** and **reload**.
- drag the panel's inner edge to resize it; the width is remembered.
- the panel is **not a tab**: it dismisses when you click outside it, press
  Escape, click into a page, or switch tabs. dismissing hides it, so reopening is
  instant; a backgrounded panel also suspends its media so it never plays out of
  sight.

## memory control

each panel is a full page, which can cost anywhere from ~100 MB to a couple of
gigabytes for a heavy app like WhatsApp Web. wis keeps that in check, all in
**settings → performance**:

- a **panel limit** (default 2) caps how many stay loaded, evicting the
  least-recently-used; turn it off for no limit.
- **keep loaded** (default on) decides whether a dismissed panel keeps its
  webview; off reclaims it immediately (your login still persists).
- kept-loaded panels are reclaimed after an idle window, and a
  **memory-pressure cap** evicts the heaviest hidden panels when their combined
  footprint crosses a limit.
- a **loaded panels** readout lists what is open, with a "close all" button.

mute is engine-level and keyed per widget, so a muted messaging widget stays
silent, pings included, across reopen.
