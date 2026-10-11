---
title: widgets
description: a quick-launch dock of social, AI, and productivity apps, plus any site you add, that open in a floating side panel without leaving your tab.
sidebar:
  order: 11
---

widgets are a quick-launch dock of your favourite web apps that open in a
floating panel beside your tabs. it is a fast way to glance at WhatsApp, check
your calendar, or ask ChatGPT something without opening a tab or losing your
place.

## the dock

choose your widgets in **settings → sidebar widgets**, where the curated catalog
is grouped into toggle chips:

- **social**: WhatsApp, Telegram, Messenger, LINE, Discord, Slack, X, Instagram,
  and Reddit.
- **AI providers**: ChatGPT, Claude, Gemini, Grok, DeepSeek, Qwen, and
  Perplexity.
- **productivity**: Gmail, Google Calendar, Google Keep, Notion, Todoist,
  Outlook, Proton Mail, and Proton Calendar.

the dock renders in every layout, in the sidebar and in the top-tabs rail, with
one row per group and a divider between rows. drag a favicon along its row to
reorder it; that order is the display order everywhere. favicons are prefetched
and cached, with a letter-tile fallback.

## your own sites

any web page can be a widget. under **your sites** in **settings → sidebar
widgets**, enter a name and an address (a bare domain like `notion.so` gets
`https://` added), pick the dock row it should join with **add to** (your sites,
social, AI, or productivity), and click **add**. only `http` and `https`
addresses work, and the settings page tells you inline when an address will not.

click a custom widget's chip to edit its name, address, or row, or use its x to
remove it. in the dock, a custom widget can be dragged onto any other row to
move it there. curated widgets stay in their own row and only reorder within
it.

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
- panels belong to the workspace they were opened in, so switching workspace
  closes them. in a private workspace a panel closes outright when dismissed.

## links in a panel

- clicking a link to **another site** opens it as a foreground tab, beside the
  tab you were on, and the panel dismisses itself.
- links that stay on the **same site** open inside the panel, so the app keeps
  working as it would in a tab (a same-site link that asks for a new window
  still opens as a tab).
- **Cmd+click** or **middle-click** opens a link in a background tab, just as it
  does in a tab.

this works the same on macOS, Windows, and Linux.

## memory control

each panel is a full page, which can cost anywhere from ~100 MB to a couple of
gigabytes for a heavy app like WhatsApp Web. wis keeps that in check, all in
**settings → performance**:

- **limit loaded widget panels** (on, keeping at most 2 by default) caps how many
  stay loaded, reclaiming the least recently used first; turn it off for no
  limit.
- **keep widget panels loaded** (default on) decides whether a dismissed panel
  stays loaded; off frees it the moment it closes (your login still persists).
- **reclaim hidden panels after** closes a kept-loaded panel that has sat
  hidden for a while (5 minutes by default).
- **cap hidden panel memory** (on, 500 MB by default) reclaims hidden panels,
  oldest first, when together they hold more memory than the cap. it relies on
  per-page memory figures that only macOS provides, so the cap has no effect on
  Windows and Linux.
- a **loaded widget panels** readout lists what is open, with a **close all**
  button.

mute is engine-level and keyed per widget, so a muted messaging widget stays
silent, pings included, across reopen.
