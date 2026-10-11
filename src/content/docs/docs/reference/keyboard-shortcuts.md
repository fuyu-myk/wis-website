---
title: keyboard shortcuts
description: every default keyboard shortcut in wis on macOS, Windows, and Linux. all of them are rebindable in settings.
sidebar:
  order: 1
---

every action below can be rebound in **settings → shortcuts**, and the defaults
are listed here. on macOS the modifiers are Cmd, Shift, Alt (the Option key),
and Ctrl. on Windows and Linux every default swaps Cmd for **Ctrl** and keeps
the rest the same, so Cmd+T becomes Ctrl+T and Alt+Cmd+W becomes Ctrl+Alt+W.

## tabs

| action | macOS | Windows and Linux |
|---|---|---|
| new tab | Cmd+T | Ctrl+T |
| close tab | Cmd+W | Ctrl+W |
| reopen closed tab | Cmd+Shift+T | Ctrl+Shift+T |
| duplicate tab | Cmd+Shift+K | Ctrl+Shift+K |
| pin or unpin tab | Cmd+Shift+P | Ctrl+Shift+P |
| next tab | Cmd+Shift+] | Ctrl+Shift+] |
| previous tab | Cmd+Shift+[ | Ctrl+Shift+[ |
| switch to tab 1 to 8 | Cmd+1 ... Cmd+8 | Ctrl+1 ... Ctrl+8 |
| switch to last tab | Cmd+9 | Ctrl+9 |

## navigation

| action | macOS | Windows and Linux |
|---|---|---|
| focus address bar | Cmd+E | Ctrl+E |
| back | Cmd+[ or Cmd+Left | Ctrl+[ or Ctrl+Left |
| forward | Cmd+] or Cmd+Right | Ctrl+] or Ctrl+Right |
| reload tab | Cmd+R | Ctrl+R |
| reload (bypass cache) | Cmd+Shift+R | Ctrl+Shift+R |
| copy current URL | Cmd+Shift+C | Ctrl+Shift+C |
| open command palette | Cmd+L | Ctrl+L |

## find and zoom

| action | macOS | Windows and Linux |
|---|---|---|
| find in page | Cmd+F | Ctrl+F |
| find next match | Cmd+G | Ctrl+G |
| find previous match | Cmd+Shift+G | Ctrl+Shift+G |
| zoom in | Cmd+= | Ctrl+= |
| zoom out | Cmd+- | Ctrl+- |
| reset zoom | Cmd+0 | Ctrl+0 |

## panes

| action | macOS | Windows and Linux |
|---|---|---|
| split pane right | Cmd+D | Ctrl+D |
| split pane down | Cmd+Shift+D | Ctrl+Shift+D |
| focus pane left | Alt+Cmd+Left | Ctrl+Alt+Left |
| focus pane right | Alt+Cmd+Right | Ctrl+Alt+Right |
| focus pane up | Alt+Cmd+Up | Ctrl+Alt+Up |
| focus pane down | Alt+Cmd+Down | Ctrl+Alt+Down |
| close pane | Alt+Cmd+W | Ctrl+Alt+W |
| unsplit panes | Alt+Cmd+U | Ctrl+Alt+U |

## workspaces and windows

| action | macOS | Windows and Linux |
|---|---|---|
| new window | Cmd+N | Ctrl+N |
| toggle private workspace | Cmd+Shift+N | Ctrl+Shift+N |
| new workspace | Alt+Cmd+N | Ctrl+Alt+N |
| next workspace | Alt+Cmd+E | Ctrl+Alt+E |
| previous workspace | Alt+Cmd+Q | Ctrl+Alt+Q |

**toggle private workspace** takes the window to its private workspace,
creating one if there is none, and from a private workspace back to the one you
came from.

## tools and panels

| action | macOS | Windows and Linux |
|---|---|---|
| show bookmarks | Alt+Cmd+B | Ctrl+Alt+B |
| bookmark this page | Cmd+Shift+B | Ctrl+Shift+B |
| show downloads | Cmd+J | Ctrl+J |
| show history | Cmd+Shift+H | Ctrl+Shift+H |
| open settings | Cmd+, | Ctrl+, |
| clear browsing data | Cmd+Shift+Backspace | Ctrl+Shift+Backspace |
| toggle floating sidebar | Cmd+S | Ctrl+S |

## page tools

| action | macOS | Windows and Linux |
|---|---|---|
| toggle reader mode | Alt+Cmd+R | Ctrl+Alt+R |
| hide element (picker) | Cmd+Shift+X | Ctrl+Shift+X |
| pop out video | Cmd+Shift+O | Ctrl+Shift+O |
| print page | Cmd+P | Ctrl+P |
| inspect | Alt+Cmd+I | Ctrl+Alt+I |

**inspect** opens the web inspector on the current tab. it does nothing in a
private workspace, whose pages are built without developer tools. video popout
is not available on Linux yet; see
[platform support](/docs/reference/platform-support/).

## unbound by default

these actions ship without a shortcut. give them one in **settings →
shortcuts**:

- capture screenshot
- capture selected region
- capture window
- new private window
- focus next pane
- switch to tab 9
- focus address bar (alt), a spare second binding

## how shortcuts reach the page

wis keeps a small set of shortcuts for itself, so they always work, even when a
page tries to capture the keystroke: new tab, close tab, close pane, reopen
closed tab, new window, new private window, toggle private workspace, new
workspace, next and previous tab, the numbered and last-tab switches, next and
previous workspace, focus address bar, and the command palette. on macOS these
stay with the native menu, so they work even when a page has stopped
responding.

every other shortcut is **offered to the page first**. if the page handles the
keystroke, wis stands back, so a site's own shortcuts keep working: Cmd+S
(Ctrl+S) saves the document in a web editor instead of toggling the sidebar. if
the page does not use the keystroke, wis runs its action. on macOS, undo, redo,
and select all also go to the page first, so a web app's own undo (in Google
Docs, for example) behaves as it does in any other browser.

inside a text field, shortcuts that **move the caret or delete text** give way
to the field. a binding on an arrow key, Home, End, Page Up, Page Down,
Backspace, or Delete with at most one of Cmd, Ctrl, or Alt does nothing while
you type there, so Cmd+Left (Ctrl+Left) still moves the caret instead of going
back. outside a text field, the same shortcut runs its action as usual.

:::tip
to rebind any action, open **settings → shortcuts**, click its binding, and
press the new combination (Escape cancels). a reset button restores the default.
wis flags conflicts, so two actions never silently share a shortcut.
:::
