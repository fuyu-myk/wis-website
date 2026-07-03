---
title: downloads
description: safety-first downloads with a popup, a full history page, and an optional "ask where to save".
sidebar:
  order: 10
---

wis handles downloads safety-first. files always land in `~/Downloads` by
default, with safe names, no overwrites, and the same Gatekeeper scanning any
browser download gets.

## how it handles a file

- the server-suggested filename is reduced to a **safe leaf** (final path
  component only, no control characters, no escaping the downloads folder) and
  collision-resolved Finder-style, so a download never overwrites an existing
  file.
- completed files are tagged with the macOS **quarantine** attribute, so
  Gatekeeper scans them like any browser download.
- downloads from a **private workspace or peek** still save (you asked for them)
  but are flagged private and never recorded in history.

## the downloads popup

a downloads glyph sits in both layouts (the sidebar footer and the top-tabs
rail), with a pulsing dot while anything is in flight. open it any time with
**Cmd+J**. it shows the latest items:

- in-flight rows with a live byte count.
- completed rows that **open the file** on click, or show "file may have been
  moved or deleted" when it is gone.
- an X to remove an entry from the list.
- a "view all downloads" footer that opens the full page.

## the downloads page

the full page (`about:downloads`) adds search over filename and URL, day
grouping, per-row **open** and **show in Finder**, and a select mode whose delete
removes only history entries, never the files themselves. completed downloads
persist across restarts.

## ask where to save

turn on **settings → downloads → "ask where to save"** to get a native save
panel for every download, prefilled with the safe name and starting in the last
folder you picked. cancelling the panel cancels the download.
