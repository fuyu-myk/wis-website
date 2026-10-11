---
title: page tools
description: the page context menu, inspect, view source, save page, screenshots, reader mode, and printing.
sidebar:
  order: 12
---

tools that act on the page in front of you: what you get when you right-click,
plus inspecting, saving, capturing, simplifying, and printing a page. on Windows
and Linux, read Cmd as Ctrl in the shortcuts below.

## the page context menu

right-click a page and wis shows its own menu, built from what is under the
pointer. rows are grouped link first, then image, media, selected text, and
finally the page itself, so right-clicking a linked image offers both the link
and the image rows.

### on a link

- **open link in new tab**, or **open link in background tab** to stay where you
  are.
- **open link in split view** opens it in a new
  [split pane](/docs/features/tabs-and-panes/#split-panes) to the right.
- **preview link** opens it in a [peek](/docs/features/safe-browsing/) card.
- **open link in new window** and **open link in new private window**. a private
  window offers only the private variant.
- **copy link address**.
- **copy clean link** copies the link with its tracking parameters stripped
  (`utm_*` tags and click ids such as `fbclid`, `gclid`, and `msclkid`). it only
  appears when there is something to strip, and says how many parameters it
  removes. every other parameter is left untouched, so the link still works.
- **bookmark link** saves it straight to your
  [bookmarks](/docs/features/bookmarks/) (not offered in a private window).

### on an image or media

- images: **open image in new tab**, **save image as…**, **copy image**, and
  **copy image address**.
- video and audio: **open video in new tab** (or audio) and **copy video
  address**.

saving or copying an image fetches it again through your workspace's network
route, so your proxy, DNS, and blocking rules apply. images over 20 MB are
refused. SVG images cannot be copied, and on Windows and Linux only PNG images
can be copied (save the others instead).

### on selected text

- **search DuckDuckGo for "…"** searches the selection in a new tab. the row
  names your
  [default engine](/docs/features/address-bar-and-search/#search-engines) and
  the start of the selection.
- **copy**.
- **ask the assistant** sends the selection to the
  [AI assistant](/docs/features/ai-assistant/), shown only once the assistant is
  set up.

the selection stays highlighted while the menu is open.

### on the page

**back**, **forward** (each dimmed when there is no history that way),
**reload**, **print…**, **view source**, **save page…**, and **inspect**. view
source is hidden in reader mode, and inspect is hidden in private windows.

### where the native menu stays

- **text fields and editable areas** keep the system menu, with its spelling
  suggestions and paste.
- sites that draw **their own right-click menu** keep it.
- **embedded frames** (a video player or map inside the page) keep the engine's
  menu.

wis's own pages (the launchpad, history, settings, and error pages) show the
same menu for links, images, and selected text, without the page rows. move
through the menu with the arrow keys, press Enter to run a row, and Escape to
close it.

## inspect

the web inspector is built in. **Alt+Cmd+I** opens it on the current tab, or
choose **inspect** from the page context menu.

on macOS, inspect from the context menu opens the inspector **on the element you
right-clicked**, and that includes right-clicking highlighted text. on Windows
and Linux the inspector opens on the page, since those engines give no way to
jump to an element.

the inspector is turned off in private windows.

## view source

**view source** in the page context menu opens a **page source** tab beside the
page. it shows the page **as it is now**, not the file the server sent: no
second request is made, so a page you are signed in to shows its signed-in
markup, including any changes its scripts have made since it loaded. a **copy**
button copies all of it, and a very large page is cut short with a note saying
so.

the source is held only while the original tab stays open. a source tab
restored after a restart shows nothing; choose view source again from the page.

## save page

**save page…** in the page context menu saves the whole page as one file that
opens offline with its images, stylesheets, and fonts. wis asks where to save
first. the format is the engine's own:

- macOS saves a **Web Archive** (`.webarchive`).
- Windows and Linux save **MHTML** (`.mhtml`).

## screenshots

capture the current page from the
[command palette](/docs/features/productivity/#command-palette), or bind the
actions to keys in **settings → shortcuts** (none have a shortcut by default):

- **capture screenshot**: the visible part of the page.
- **capture selected region**: drag a rectangle; Escape cancels. on macOS the
  region can cover any part of the window, browser interface included; on
  Windows and Linux it is drawn over the page.
- **capture window**: the whole window as you see it, browser interface and
  every visible pane together. on macOS this needs no Screen Recording
  permission. on Windows and Linux it captures the page only.

every capture is **copied to the clipboard**. a small notice confirms it with a
**save** button that writes the same image to disk, without taking it again.

## reader mode

reader mode turns a cluttered article into clean, readable text, in place. turn
it on with the reader button beside reload, with **Alt+Cmd+R**, or with **toggle
reader mode** in the command palette.

wis picks out the article itself, leaving out comments, sidebars, and related
links. turning reader mode off reloads the original page, and following a link
leaves it. it is not available on wis's own pages.

## print and save as PDF

**Cmd+P**, or **print…** in the page context menu, opens the system print
dialog for the current page. the same dialog saves a PDF: use the PDF menu on
macOS, or the Microsoft Print to PDF printer on Windows.

if a site handles Cmd+P itself, the site's own print runs instead (see
[shortcuts and pages](/docs/features/productivity/#shortcuts-and-pages)). Google
Docs prints by exporting a PDF; on macOS wis opens that export in the print
dialog instead of downloading it. Google Sheets and Slides still download their
print export as a file.
