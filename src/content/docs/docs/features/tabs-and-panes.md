---
title: tabs and panes
description: tab folders, pinned tabs, hover previews, tmux-style split panes, numbered switching, recently closed tabs, and tabs that sleep and recover.
sidebar:
  order: 2
---

wis gives you two layouts for tabs, a collapsible **sidebar** and a horizontal
**top-tabs** strip, and the same organising tools work identically in both.

## tab folders

group open tabs into named, recolorable folders. folders organise *live* tabs,
which is different from [bookmarks](/docs/features/bookmarks/) (those save URLs
for later).

- in the **sidebar**, folders are an IDE-style tree: a colored name pill, a
  chevron, and member rows beside an accent rail.
- in the **top-tabs** strip, folders are islands: a colored circle when
  collapsed, an expanded glass pill when open.

the sidebar has a **new folder** row right under **new tab**. in the top-tabs
layout, the folder button beside the **+** in the top bar creates a folder and
files the current tab into it.

rename inline, recolor, collapse, and delete folders (deleting one keeps its
tabs open, just unfiled). drag a tab onto a folder to file it, drag it out to
unfile, or use the tab's context menu. you can also give a folder an **icon**, a
wireframe or filled glyph or an emoji, rendered inside its color dot.

clicking a folder **selects** it as the target that new tabs file into, so
Cmd+T, opened links, and opened bookmarks all land in the selected folder. the
selection also follows the tab you are on: focusing a tab inside a folder
selects that folder, and focusing a loose tab clears it. the explicit "new tab"
button always makes a loose, top-level tab.

collapsing a folder puts its tabs to sleep immediately, which ties into the
[memory model](#sleeping-tabs). switching to a tab that sits in a collapsed
folder (from the command palette, say) expands that folder.

## pinned tabs

pin a tab to pull it out of the normal list into a docked, quick-access set
that is present in every layout. in the sidebar, pins are a favicon grid under
the workspace pill; in the top-tabs strip, they are favicon circles docked
nearest the rail. pinned tabs never sit inside a folder, and they sleep like any
other background tab. pin or unpin from the tab context menu, or with
**Cmd+Shift+P**.

## tab previews

rest the pointer on a tab for about a second and a preview card appears beside
it: a snapshot of the page over its title and host. it works on tab rows,
folder members, and pinned tabs in both layouts. sleeping tabs show the last
snapshot taken before they slept, so even tabs restored asleep after a restart
can preview. clicking, dragging, or moving off the tab hides the card.

:::note
tab previews are built for all three platforms, but they have so far been
tested only on macOS.
:::

## opening links

a link you open into a new tab lands **right beside the tab it came from**, not
at the end of the list. open several links from the same page and they line up
after it in the order you opened them. the exception is a link that files into
a different folder from the current tab, which goes to the end instead.
**Cmd+T** always adds its tab at the end.

- **Cmd+click** or **middle-click** opens a link in a background tab.
- a link that asks for a new window (such as `target=_blank`) opens as a
  foreground tab when it points to another site, and in the current tab when it
  stays on the same site.

## split panes

split the current view into a tmux-style tree of panes, each its own live
webview, with resizable dividers and a highlighted focused leaf.

- **Cmd+D** splits right, **Cmd+Shift+D** splits down.
- **Alt+Cmd+←/→/↑/↓** moves focus between panes.
- **Alt+Cmd+W** closes the focused pane's tab; **Alt+Cmd+U** unsplits back to a
  single pane.

clicking a pane focuses it, and keyboard shortcuts route to the focused leaf.

closing a tab that is showing in a pane **keeps the split**: the pane fills with
the tab you used most recently that is not already on screen (or, failing that,
the nearest one in the tab list). the pane only collapses when every other tab
is already showing in a pane. closing the tab of a pane you are not focused on
leaves focus where it is.

## switching tabs

- **Cmd+1** through **Cmd+8** jump to a tab by its on-screen position. numbering
  follows reading order (members of expanded folders, then loose tabs) and skips
  pinned tabs and collapsed-folder members, so filing a tab renumbers the rest.
- **Cmd+9** is a ping-pong to the previously active tab.
- **Cmd+Shift+]** and **Cmd+Shift+[** cycle next and previous across every tab.
- the [command palette](/docs/features/productivity/#command-palette) (Cmd+L)
  switches to any tab by name.

## reopen, duplicate, move

- **Cmd+Shift+T** reopens the last closed tab; press it again to go further
  back. reopen is folder-faithful, dropping the tab back into the folder and
  position it came from.
- recently closed tabs are **remembered across restarts**. the
  [command palette](/docs/features/productivity/#command-palette) lists the last
  few as soon as it opens, and typing searches the rest. private workspaces
  record nothing, and clearing history clears the list (see
  [history and data](/docs/features/history-and-data/)).
- **Cmd+Shift+K** duplicates the current tab.
- the tab context menu can **move a tab to a new window** or to another
  workspace.

on macOS, a tab reopened in the same session comes back with its **full
session** intact: history, scroll position, and form contents. a tab reopened
after a restart, or on Windows and Linux, loads its page fresh. the same goes
for moving a tab to another window or workspace: only macOS carries its history
and scroll along.

## sleeping tabs

to keep wis light, background tabs are **discarded** ("slept") after an idle
threshold and recreated when you return to them. at launch only visible tabs
spin up a webview; the rest load on first show. time your computer spends
asleep does not count as idle time, so waking it does not put every background
tab to sleep at once.

on macOS, waking a slept tab is not a cold reload: its full back/forward
history, scroll position, and form data are restored from a saved snapshot.
those sessions also **survive a full restart**, captured periodically to disk.
on Windows and Linux a slept tab reloads its page when you return, and after a
restart your tabs reopen at the pages they were on.

the active tab, audibly-playing tabs, and any
[popped-out video](/docs/features/media/) never sleep. pinned tabs sleep like
any other background tab, and tabs in a collapsed folder sleep immediately.
turn sleeping on or off and tune the idle threshold (15 minutes by default) in
**settings → performance**.

on macOS, the same settings section has a **memory by webview** list: the memory
each tab, widget panel, and peek preview is using (plus wis's own chrome),
refreshed every few seconds, with a button to close any tab or widget panel
from there. Windows and Linux expose no per-tab memory figure, so the list is
macOS-only.

## recovering tabs

- if a page's process crashes, wis reloads the tab on its own, on every
  platform.
- after your computer wakes from sleep, wis cuts the network connections that
  died while it slept, so pages reconnect instead of hanging until you reload
  them.
