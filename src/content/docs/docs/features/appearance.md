---
title: appearance
description: light and dark themes pushed to web content, full custom themes you can build and share, layouts, and motion controls.
sidebar:
  order: 11
---

wis is yours to shape. layouts, themes, motion, and per-workspace backgrounds
all live in **settings → appearance** and **settings → layout**.

## light, dark, and system

the light/dark/system setting drives the whole chrome, and wis **pushes it to web
content too**: each page's native appearance is overridden so a site's
`prefers-color-scheme` matches your in-app theme instead of the OS. set wis to
dark and pages render dark, even if your mac is in light mode.

## layouts

choose between a collapsible **sidebar** and a horizontal **top-tabs** strip. the
sidebar can float and auto-expand on hover; toggle it with **Cmd+S**. the
top-tabs strip behaves as an accordion, keeping at most a set number of folders
expanded at once (configurable in **settings → layout**).

## custom themes

build a full chrome theme in **settings → appearance → themes**. a theme carries
both light and dark token sets, accent plus backgrounds, surfaces, text, and
borders. the accent expands into the full color scale automatically, so the
entire chrome re-themes live as you edit.

- create, duplicate, and delete themes, with per-mode color pickers and live
  preview.
- **share** a theme: export it to a `.wistheme` file and import one back. imports
  are validated and given a fresh id, so a shared theme never collides with one
  you already have.

## per-workspace backgrounds

each workspace can carry its own gradient, wallpaper, or GIF background.
see [workspaces → per-workspace backgrounds](/docs/features/workspaces/#per-workspace-backgrounds)
for the details.

## motion

a three-level motion setting in **settings → appearance** controls chrome
animation:

- **full**: every transition, including the springy ones.
- **reduced**: keeps timings but flattens the overshoot.
- **off**: zeroes chrome transition and animation durations.

your OS "reduce motion" preference caps full at reduced automatically, live.
