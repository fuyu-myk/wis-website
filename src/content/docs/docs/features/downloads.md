---
title: downloads
description: safety-first downloads with live progress, cancel, a popup, a full history page, and an optional "ask where to save".
sidebar:
  order: 14
---

wis handles downloads safety-first. files land in your Downloads folder by
default, with safe names and no overwrites, and on macOS they get the same
Gatekeeper scanning any browser download gets.

## how it handles a file

- the server-suggested filename is reduced to a **safe leaf** (final path
  component only, no control characters, no escaping the downloads folder) and
  collision-resolved Finder-style, so a download never overwrites an existing
  file.
- on macOS, completed files are tagged with the **quarantine** attribute, so
  Gatekeeper scans them like any browser download.
- downloads from a **private workspace or peek** still save (you asked for them)
  but are flagged private and never recorded in history.

## when a link turns into a download

on macOS, wis keeps tabs tidy when a page hands you a file:

- a link that turns out to be a download leaves the tab **on the page you were
  reading**, with its address and title intact.
- a tab that was opened only to fetch a file **closes itself** once the download
  starts (or resets to the new-tab page if it was the workspace's last tab).
- PDFs opened as a page, and any response the server marks as an attachment,
  **download** instead of opening in an inline viewer. attachments download
  from any frame, so a file a page sends through a hidden frame still reaches
  you. a PDF embedded inside a page still displays in place.

## the downloads button

a downloads glyph sits in both layouts (the sidebar footer and the top-tabs
rail), and its badge tells you what is happening:

- while files are in flight, a **progress pie** fills in the theme color. when
  wis cannot know a file's full size (the server sent none, or you are on
  Windows or Linux), a spinner shows instead.
- when a download finishes, a check mark draws in briefly; a failure shows an
  amber exclamation mark.
- after a completed download, the glyph stays tinted until you open the popup.

## the downloads popup

open the popup from the button or any time with **Cmd+J**. it shows the latest
items:

- in-flight rows with a live byte count. on macOS, each has an **X** that
  cancels the download and deletes the partial file.
- completed rows that **open the file** on click, or show "file may have been
  moved or deleted" when it is gone.
- an X on finished rows to remove the entry from the list (after a confirm; the
  file itself stays on disk).
- a "view all downloads" footer that opens the full page.

## the downloads page

the full page (`about:downloads`) adds search over filename and URL, day
grouping, per-row **open** and **show in Finder**, and a select mode whose delete
removes only history entries, never the files themselves. completed downloads
persist across restarts.

on Windows, **show in Finder** selects the file in File Explorer; on Linux it
opens the file's folder in your file manager.

## ask where to save

turn on **settings → downloads → ask where to save each download** to get a
native save panel for every download, prefilled with the safe name and starting
in the last folder you picked. cancelling the panel cancels the download.
