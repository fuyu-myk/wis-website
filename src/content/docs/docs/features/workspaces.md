---
title: workspaces
description: color-accented profiles with their own session, proxy, privacy mode, and icon, plus a private workspace toggle, private windows, and per-workspace backgrounds.
sidebar:
  order: 1
---

a workspace is a self-contained browsing profile. each one has its own WebView
data store (cookies, logins, local storage), its own network proxy, and its own
privacy mode, so work and personal never touch. workspaces are color-accented,
and the accent threads through the chrome so you always know which one you are
in.

## managing workspaces

the workspace pill opens a popover listing every workspace. from there you can
switch, rename (right-click a name), recolor, and give a workspace an
[icon](#workspace-icons). the header holds two buttons: **+** makes a new
workspace, and the closed-eye owl makes a new private one. **Alt+Cmd+N** also
creates a workspace and drops you straight into renaming it, and **Alt+Cmd+E**
and **Alt+Cmd+Q** step to the next and previous workspace.

the x on a row deletes that workspace after a confirm (you cannot delete your
only one). its tabs close for good, and wis lets go of everything it kept for
them: their hover previews, their entries in recently closed tabs, and any audio
they were still playing.

## one window per workspace

wis is **one OS window per workspace**. in-window multitasking is the
[split pane](/docs/features/tabs-and-panes/#split-panes); separate windows are
separate workspaces.

- **new window** opens a picker of workspaces no window is currently showing,
  plus a "new empty workspace" row.
- **move to new window** (on the tab context menu) tears a tab out into its own
  window. on macOS it carries the tab's history and scroll position with it.
- **move to workspace** relocates a tab into another existing workspace.

if you try to switch to a workspace that another window already shows, wis
focuses that window instead of duplicating it. your open windows are restored on
the next launch, each at the size and position you left it.

## private browsing

a private workspace is **ephemeral**: its data store is non-persistent, it is
excluded from every save, and it is wiped the moment you close it. nothing from
a private workspace ever touches disk.

- **Cmd+Shift+N** toggles private browsing in the current window. it switches to
  your private workspace, creating one (with a fresh tab) only when none exists
  yet, so pressing it again later returns you to the same private workspace
  rather than stacking up new ones. pressed from the private workspace, it takes
  you back to the regular workspace you were on.
- **new private window** opens a fresh private workspace in its own window, no
  picker. it has no default shortcut; find it in the File menu on macOS or in
  the [command palette](/docs/features/productivity/#command-palette), or bind
  one in **settings → shortcuts**.
- the closed-eye owl button in the workspace popover always creates a new
  private workspace in the current window.
- a private workspace wears a closed-eye owl in place of its color dot, and on
  macOS a focused private window switches the Dock icon to the same owl, a quiet
  signal that wis is not watching.
- bookmarks, session restore, saved passwords, and recently closed tabs are all
  disabled in private workspaces by design.

turn on **settings → privacy → always launch private** if you want every
session to start clean.

## per-workspace backgrounds

each workspace can carry its own page background, set in **settings → appearance
→ workspace background**.

- **gradients**: pick an angle and two to eight color stops, each with a custom
  color picker. edits preview live.
- **wallpapers and GIFs**: import a PNG, JPEG, GIF, or WebP (up to 20 MB). tune
  the fit (cover, contain, or tile), a dim overlay, and a blur that softens the
  wallpaper without blurring your content. GIFs animate.

across split panes a wallpaper is laid out as one shared image, so the panes
reveal contiguous regions of the same picture rather than repeating it. each
mode (theme default, gradient, image) remembers its own last configuration, so
switching between them restores what you built in each.

## custom accents

click a workspace's color dot in the popover to customize it. the popover offers
a grid of preset accents plus a saved custom palette. the dashed `+` square opens
the color picker to mint a new accent; confirming it both saves the color to
your shared palette and applies it to the workspace.

## workspace icons

the same popover has an icon picker, so a workspace can show an icon in place of
its color dot. choose a **line** or **fill** glyph, or an **emoji**; **none**
goes back to the plain dot. glyphs are tinted with the workspace color, and emoji
keep their own colors. tab folders use the same picker (see
[tab folders](/docs/features/tabs-and-panes/#tab-folders)). private workspaces
do not take an icon.
