---
title: productivity
description: the command palette, find in page, per-site zoom, swipe navigation, how shortcuts share keys with pages, browser identity, and the default-browser controls.
sidebar:
  order: 16
---

a set of quick features that keep common actions a keystroke away. the browser
shortcuts on this page are rebindable in **settings → shortcuts** (defaults are
listed in [keyboard shortcuts](/docs/reference/keyboard-shortcuts/)). on Windows
and Linux, read Cmd as Ctrl.

history and clearing data live in
[history and data](/docs/features/history-and-data/), and page-level tools such
as screenshots, reader mode, and printing live in
[page tools](/docs/features/page-tools/).

## command palette

**Cmd+L** opens the command palette, one search box over everything you might
want to jump to or run. results are grouped in this order:

1. **tabs**: your open tabs in every workspace, matched by title, address, or
   workspace name. **Cmd+Backspace** closes the highlighted tab without leaving
   the palette.
2. **recently closed**: before you type anything, the last five tabs you closed;
   type to search all of them. see
   [recently closed tabs](/docs/features/history-and-data/#recently-closed-tabs).
3. **bookmarks** in the current workspace.
4. **history** in the current workspace, from the second character you type.
   pages you visit often rank higher among equally good matches.
5. **actions**: every browser command, with its shortcut beside it. it is the
   fastest way to run a command you do not remember the key for, including the
   ones with no default shortcut, such as the screenshot actions.
6. **settings**: quick toggles such as liquid glass and the collapsible sidebar.
7. **open**: whatever you typed, as an address to go to or a search, resolved
   the same way as the
   [address bar](/docs/features/address-bar-and-search/#typing-addresses),
   keyword shortcuts included.

a private window lists no recently closed tabs, since it records none.

## find in page

**Cmd+F** opens the find bar with a live **match count** ("3 of 17"), or "no
matches found". **Cmd+G** and **Cmd+Shift+G** step to the next and previous
match.

- on Linux the engine reports only the total, so the count reads "17 matches"
  without the current position.
- highlights clear as soon as the page navigates or you switch tabs, so they
  never come back on a page you return to.
- on Windows, matches are highlighted in your desktop accent color; macOS and
  Linux use the system's yellow find highlight.

## zoom

zoom with **Cmd+=** and **Cmd+-**, and reset with **Cmd+0**. zoom belongs to the
**site**, not the tab: zoom a page and wis remembers that level for its host, in
every tab, on every later visit, and across restarts. zoom steps run from 20% to
500%.

- a site you have never zoomed uses your **default zoom**, set in **settings →
  appearance → default zoom** (80% to 120%).
- **Cmd+0** returns the site to the default and forgets its zoom.
- **settings → appearance → sites with their own zoom** lists every site with a
  remembered zoom; **remove** forgets one.
- while a site is not at the default zoom, a **zoom chip** in the address bar
  shows its level. it disappears again when you reset.

zoom works on macOS, Windows, and Linux. on Windows the engine caps its own zoom,
so the very highest steps may stop a little short.

## copy the current URL

**Cmd+Shift+C** copies the current page's address to the clipboard.

## swipe to go back and forward

swipe two fingers sideways on a trackpad to go back or forward. a half-circle
indicator in your workspace's accent color slides in from the edge and fills
once the swipe will navigate; let go before it fills to cancel. it works on
macOS, Windows, and Linux, and on macOS it commits exactly when you lift your
fingers.

- the swipe only engages toward a direction that has history.
- it stays a scroll whenever something under the pointer can still scroll
  sideways, such as a carousel, a wide table, or a code block.
- holding Shift while scrolling never navigates.

## shortcuts and pages

when a page has its own use for a shortcut, the page gets it first. Cmd+S in a
web editor saves the document instead of toggling the sidebar, and Google Docs'
own shortcuts work as they would in any other browser. if the page does not use
the key, wis runs its action as usual.

a small set of shortcuts always belongs to wis, the same set every major browser
keeps for itself: new tab, close tab, close pane, reopen closed tab, new window,
new private window, new workspace, next and previous tab, numbered tab
switching, next and previous workspace, focus address bar, and the command
palette.

two more details keep typing natural:

- a shortcut bound to a key that moves the text cursor, such as **Cmd+Left** for
  back, gives way to a focused text field, so it moves the cursor while you type
  and navigates otherwise.
- on macOS, undo, redo, and select all (**Cmd+Z**, **Cmd+Shift+Z**, **Cmd+A**)
  go to the page first too, so web apps with their own undo history get them.

## browser identity

sites decide what to serve partly by how a browser identifies itself (its user
agent). **settings → compatibility → browser identity** chooses what wis
presents:

- **Safari** (the default and the recommendation, since the engine is WebKit).
- **Chrome**, for sites that turn away anything else.
- **engine**, the engine's own unmodified identity.

the identity always names the operating system you are really on.

if one stubborn site still reports an unsupported browser, give just that site a
different identity under **per-site identity**: enter its host, pick an
identity, and click **add**. remove an override with **remove**. the identity is
chosen when a tab is created, so open the site in a new tab after changing it.

## set wis as the default browser

**settings → compatibility → default browser** has a **set as default** button.
it reads **default** once wis is your default browser.

- **macOS** shows the system prompt asking you to confirm.
- **Windows** registers wis and opens Windows Settings at **default apps**,
  where you pick wis yourself (Windows does not let apps switch it directly).
- **Linux** sets it through `xdg-settings`.

once wis is the default, links you click in other apps open as new tabs, even
when wis was not running yet. a local file opened with wis (an `.html` file, for
example) opens as its `file://` address.

## open in default browser

the **open in default browser** button at the right of the address bar hands
the current page to your OS default browser. it shows on any web page. it is the
escape hatch for pages the embedded engine cannot fully handle, chiefly
Widevine-DRM video (see [known limitations](/docs/reference/known-limitations/)).
on macOS, if wis is itself the default browser, it opens the page in Safari
instead so the handoff cannot loop back in.
