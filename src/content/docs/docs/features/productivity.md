---
title: productivity
description: the command palette, find in page with a match count, zoom, copy URL, print to PDF, and the open-in-default-browser escape hatch.
sidebar:
  order: 12
---

a set of quick features that keep common actions a keystroke away. all of these
shortcuts are rebindable in
[settings → shortcuts](/docs/reference/keyboard-shortcuts/).

## command palette

**Cmd+L** opens the command palette: a fuzzy search over your open tabs (by title,
URL, or workspace) and every browser action. it is the fastest way to jump to a
tab by name or run a command you do not remember the shortcut for.

## find in page

**Cmd+F** opens find, with a live **match count** ("3 of 17"). **Cmd+G** and
**Cmd+Shift+G** step to the next and previous match.

## zoom

zoom a page with **Cmd+=** and **Cmd+-**, and reset with **Cmd+0**. each tab's
zoom level is remembered per tab and persists across restarts.

## copy the current URL

**Cmd+Shift+C** copies the current page's URL to the clipboard.

## print and save as PDF

**Cmd+P** opens the standard macOS print panel for the current page. that panel's
PDF menu also exports to PDF, so one shortcut covers both printing and saving a
page as a PDF.

## open in default browser

a URL-bar action (and the `open in default browser` command) hands the current
page to your OS default browser. it is the escape hatch for pages the embedded
WebKit cannot fully handle, chiefly Widevine-DRM video (see
[known limitations](/docs/reference/known-limitations/)). on macOS, if wis is
itself the default browser, it falls back to Safari so the handoff cannot loop
back in.

## history

**Cmd+Shift+H** opens per-workspace history, deduplicated and searchable. clear
it, along with cookies and other site data, from the unified clear-browsing-data
dialog (**Cmd+Shift+Backspace**).
