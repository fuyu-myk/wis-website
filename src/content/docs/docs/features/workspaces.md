---
title: workspaces
description: color-accented profiles with their own session, proxy, and privacy mode, plus private windows and per-workspace backgrounds.
sidebar:
  order: 1
---

a workspace is a self-contained browsing profile. each one has its own WebView
data store (cookies, logins, local storage), its own network proxy, and its own
privacy mode, so work and personal never touch. workspaces are color-accented,
and the accent threads through the chrome so you always know which one you are
in.

## one window per workspace

wis is **one OS window per workspace**. in-window multitasking is the
[split pane](/docs/features/tabs-and-panes/#split-panes); separate windows are
separate workspaces.

- **new window** opens a picker of workspaces no window is currently showing,
  plus a "new empty workspace" row.
- **move to new window** (on the tab context menu) tears a tab out into its own
  window, carrying its history and scroll.
- **move to workspace** relocates a tab into another existing workspace.

if you try to switch to a workspace that another window already shows, wis
focuses that window instead of duplicating it. your open windows are restored on
the next launch, each at the size and position you left it.

## private browsing

a private window is an **ephemeral workspace**: its data store is non-persistent,
it is excluded from every save, and it is wiped the moment you close it. nothing
from a private workspace ever touches disk.

- **new private window** opens one immediately, no picker.
- private windows wear a closed-eye owl icon, in the title bar and in the Dock,
  as a quiet signal that wis is not watching.
- bookmarks, session restore, and saved passwords are all disabled in private
  workspaces by design.

you can also set wis to **always launch private** if you want every session to
start clean.

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

the workspace color popover offers a grid of preset accents plus a saved custom
palette. the dashed `+` square opens the color picker to mint a new accent;
confirming it both saves the color to your shared palette and applies it to the
workspace.
