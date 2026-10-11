---
title: appearance
description: light and dark modes pushed to web content, chrome design controls, glass, custom themes you can build and share, layouts, and motion.
sidebar:
  order: 15
---

wis is yours to shape. the mode, glass, motion, and per-workspace backgrounds
live in **settings → appearance**; the shape of the chrome and your custom
themes in **settings → design**; and where the tabs go in **settings →
layout**.

## light, dark, and system

the theme setting (**light**, **dark**, or **auto**, which follows the system)
drives the whole chrome, and wis **pushes it to web content too**: each page's
native appearance is overridden so a site's `prefers-color-scheme` matches your
in-app theme instead of the OS. set wis to dark and pages render dark, even if
your system is in light mode. this works on macOS and Windows; Linux does not
push the theme to pages yet.

**URL bar focus glow**, also in **settings → appearance**, outlines the address
bar in your accent color while it has focus.

## layouts

in **settings → layout**, **tabs** chooses where the tab strip lives: a sidebar
on the **left** or **right**, or **top** tabs.

- **sidebar**: a vertical tab list that ends in a footer of controls
  (downloads, bookmarks, VPN, the [ai assistant](/docs/features/ai-assistant/)
  once it is set up, history, and settings). with **collapsible sidebar** on
  (the default), it floats over the page and expands when you hover it or push
  the pointer to the window's edge. **Cmd+S** switches between the floating and
  fixed sidebar.
- **top tabs**: a horizontal strip with a rail of controls on the edge you pick
  under **rail side**. loose tabs and folder islands scroll as one run, while
  pinned tabs stay anchored at the rail end.

the top strip behaves as an **accordion**: **open folders** (1, 2, 3, or no
limit; 2 by default) caps how many folder islands are expanded at once.
expanding one more collapses the island you opened longest ago and puts its
tabs to sleep.

the assistant panel, when open, docks on the side opposite the sidebar or rail,
so the two never crowd the same edge.

## window controls

on Windows and Linux, wis draws its own **minimize**, **maximize/restore**, and
**close** buttons at the right end of the top row, in every layout. the
maximize button tracks the window's real state, so it stays correct when you
maximize by snapping or from a window manager shortcut. macOS keeps its native
window buttons.

## design

**settings → design** reshapes the chrome itself. every change applies live.

- **corners**: round (default), soft, or sharp. sharp squares the interface;
  pills and circles stay round. on macOS and Windows the page area's corners
  follow too.
- **tab shape**: rounded (default) keeps each strip's own shape; pill and square
  force every tab.
- **folder style**: how a folder's label renders: pill (default), outline, or
  plain text.
- **active tab indicator**: how the active tab is marked in the sidebar: bar
  (default), underline, filled, or dot.
- **density**: overall chrome spacing: comfortable, cozy (default), or compact.
- **tab close button**: always, on hover (default), or hidden.
- **sidebar width**: a slider from 180 to 360 px (240 by default), with a
  **reset** button. it applies to the sidebar layouts.

:::note
Linux webviews render with square corners, so on Linux the chrome is squared to
match: **corners** is locked to sharp, while pills and circles stay round.
:::

## glass

**liquid glass** in **settings → appearance** (on by default) is the master
switch for blur and translucency. **settings → design** fine-tunes it:

- **glass intensity**: light, medium (default), or heavy backdrop blur.
- **glass on chrome**: the sidebar, top bar, and address bar.
- **glass on menus**: popovers, the command palette, context menus, and
  dialogs.
- **glass on tabs**: tab chips, folder islands, and pinned tabs.

the material behind the window comes from the OS: macOS uses its native
vibrancy, and Windows 11 uses **Mica**. Windows 10 has no Mica, so it gets no
glass, and Linux has no system glass material.

## custom themes

build a full chrome theme in **settings → design → themes**. the **built-in**
theme offers eight accents (periwinkle, mint, rose, sun, lila, azur, gray, and
ink); a custom theme goes further, carrying both a light and a dark set of
colors: accent, background, surface, raised surface, chrome, content, text,
secondary text, and border. the accent expands into the full color scale
automatically, so the entire chrome re-themes live as you edit.

- **new** starts a theme from the accent you are currently using and the
  default colors, so until you change something it looks exactly like the
  built-in theme.
- each theme can be edited (name it, switch between its light and dark colors,
  pick each color), **duplicated**, or **deleted**. deleting asks first, since
  it cannot be undone.
- **share** a theme: **export** it to a `.wistheme` file and **import** one
  back, or use **copy code** and **paste code** to pass it around as text.
  imports are validated and given a fresh id, so a shared theme never collides
  with one you already have.

## per-workspace backgrounds

each workspace can carry its own gradient, wallpaper, or GIF background, on
macOS, Windows, and Linux alike. see
[workspaces → per-workspace backgrounds](/docs/features/workspaces/#per-workspace-backgrounds)
for the details.

## motion

a three-level motion setting in **settings → appearance** controls chrome
animation:

- **full**: every transition, including the springy ones.
- **reduced**: keeps timings but flattens the overshoot.
- **off**: zeroes chrome transition and animation durations.

your OS "reduce motion" preference caps full at reduced automatically, live.
