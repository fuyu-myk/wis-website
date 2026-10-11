---
title: bookmarks
description: per-workspace bookmarks with folders, a quick-access pinned row, drag-to-organise, command palette search, and HTML import and export.
sidebar:
  order: 4
---

bookmarks in wis are per-workspace and can be organised into optional folders.
they are stored separately from your browsing state and never leave the
workspace they belong to. bookmarks are disabled in private (ephemeral)
workspaces.

## saving a page

the **star** in the address bar bookmarks the current page. it saves into the
last folder you used, auto-pins the page to the quick-access row while that row
has space (it holds six), and then opens a small folder picker so you can
confirm or change where it lives. clicking the star again removes the bookmark.

you can also bookmark with **Cmd+Shift+B**, which drives the same star flow.
(Cmd+B is deliberately left to pages for bold text.)

## the bookmarks popup

a bookmarks glyph in the sidebar footer (or the top-tabs rail) opens a
palette-style popup, openable any time with **Alt+Cmd+B**. it shows, in order:

1. the **pinned quick-access grid**, every pinned bookmark.
2. **folders**, each expanding to its bookmarks.
3. the **unfiled and unpinned** rest, below the folders.

**middle-click** a bookmark to open it in a background tab. the popup stays
open, so you can open several in a row.

## organising

everything in the popup is drag-and-drop:

- drag a favicon **onto a folder** to file it (it stays pinned if it was).
- drag it **onto the unfiled area** to take it out of a folder.
- drag it **onto the pinned grid** to pin it, or drop it on a pinned bubble to
  replace that slot when the row is full.
- drag favicons **onto each other inside a folder** to reorder them.
- drag a folder's **grip handle** to reorder folders.

right-click a bookmark for pin/unpin and a "move to" menu. **pinning is
independent of folder membership**: a bookmark can be pinned to the quick-access
grid and still live in a folder, appearing in both. folder create, rename, and
delete are inline (deleting a folder re-files its bookmarks as unfiled).

changes sync instantly across every surface that shows bookmarks, the address-bar
star, the popup, and the picker.

## searching bookmarks

the [command palette](/docs/features/productivity/#command-palette) (**Cmd+L**)
searches the current workspace's bookmarks as you type, matching both the title
and the URL. bookmark matches get their own section, listed after open tabs and
recently closed tabs and before history.

## import and export

**settings → bookmarks** moves bookmarks in and out of wis as an HTML file, the
standard bookmarks format every major browser can export and import. both act
on the workspace you are in.

- **import from HTML**: export your bookmarks from another browser, then pick
  the file. only web (http and https) links come across. folders are matched by
  name or created, and a bookmark already saved in the same folder with the same
  title and URL is skipped, so importing the same file twice adds nothing. wis
  folders do not nest, so a nested folder becomes a single folder whose name
  joins the path (for example `Work / Projects`). imported bookmarks arrive
  unpinned.
- **export to HTML**: saves the workspace's bookmarks, unfiled ones first and
  then each folder, with the date each was added so other browsers keep it.
  pinning has no place in the format, so pins are not exported.

import is unavailable in a private workspace, since it has no bookmarks.
