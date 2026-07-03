---
title: tabs and panes
description: tab folders, pinned tabs, tmux-style split panes, numbered switching, and sessions that survive a restart.
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

create, rename inline, recolor, collapse, and delete folders (deleting one keeps
its tabs open, just unfiled). drag a tab onto a folder to file it, drag it out to
unfile, or use the tab's context menu. you can also give a folder an **icon**, a
wireframe or filled glyph or an emoji, rendered inside its color dot.

clicking a folder **selects** it as the target that new tabs file into, so
Cmd+T, opened links, and opened bookmarks all land in the selected folder. the
explicit "new tab" button always makes a loose, top-level tab.

collapsing a folder puts its tabs to sleep immediately, which ties into the
[memory model](#sleeping-tabs).

## pinned tabs

pin a tab to pull it out of the normal list into a docked, quick-access set
that is present in every layout. in the sidebar, pins are a favicon grid under
the workspace pill; in the top-tabs strip, they are favicon circles docked
nearest the rail. pinned tabs never sleep and never sit inside a folder. pin or
unpin from the tab context menu, or with **Cmd+Shift+P**.

## split panes

split the current view into a tmux-style tree of panes, each its own live
webview, with resizable dividers and a highlighted focused leaf.

- **Cmd+D** splits right, **Cmd+Shift+D** splits down.
- **Alt+Cmd+←/→/↑/↓** moves focus between panes.
- **Alt+Cmd+W** closes the focused pane; **Alt+Cmd+U** unsplits.

clicking a pane focuses it, and keyboard shortcuts route to the focused leaf.

## switching tabs

- **Cmd+1** through **Cmd+8** jump to a tab by its on-screen position. numbering
  follows reading order (members of expanded folders, then loose tabs) and skips
  pinned tabs and collapsed-folder members, so filing a tab renumbers the rest.
- **Cmd+9** is a ping-pong to the previously active tab.
- **Cmd+Shift+]** and **Cmd+Shift+[** cycle next and previous across every tab.
- the [command palette](/docs/features/productivity/#command-palette) (Cmd+L)
  switches to any tab by name.

## reopen, duplicate, move

- **Cmd+Shift+T** reopens the last closed tab with its **full session** intact:
  history, scroll position, and form contents are all restored. reopen is
  folder-faithful, dropping the tab back into the folder it came from. (reopen is
  inert in private workspaces.)
- **Cmd+Shift+K** duplicates the current tab.
- the tab context menu can **move a tab to a new window** or to another
  workspace, carrying its session along.

## sleeping tabs

to keep wis light, background tabs are **discarded** ("slept") after an idle
threshold and recreated when you return to them. at launch only visible tabs
spin up a webview; the rest load on first show.

waking a slept tab is not a cold reload: its full back/forward history, scroll
position, and form data are restored from a saved snapshot. those sessions also
**survive a full restart**, captured periodically to disk.

the active tab, pinned tabs, audibly-playing tabs, and any
[popped-out video](/docs/features/media/) never sleep. tabs in a collapsed
folder sleep immediately. tune the idle threshold in **settings → performance**.
