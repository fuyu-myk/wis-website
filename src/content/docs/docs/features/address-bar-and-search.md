---
title: address bar and search
description: the address bar with its suggestions and inline completion, built-in and custom search engines, keyword shortcuts, the launchpad, and the navigation controls.
sidebar:
  order: 3
---

the address bar takes a web address, a search, or a keyword shortcut, and
suggests where to go as you type. **Cmd+E** focuses it. on Windows and Linux,
read Cmd as Ctrl in every shortcut on this page.

## the address bar

the bar shows the current page's address without the `https://` prefix. the
icon at its left edge reflects the connection: a **padlock** for HTTPS, a
**not secure** mark for plain HTTP, and a search glyph on the launchpad and on
wis's own pages, where the bar is a search box.

press **Escape** once to close the suggestions; press it again to discard
what you typed and put the page's address back.

the controls at the right end of the bar:

- a **zoom chip** shows the page's zoom while the site is not at your default
  zoom (see [zoom](/docs/features/productivity/#zoom)).
- the **key button** appears when you have a saved login for the site (see
  [passwords](/docs/features/passwords/)).
- the **open in default browser** button hands the page to another browser (see
  [open in default browser](/docs/features/productivity/#open-in-default-browser)).
- the **star** bookmarks the page (see [bookmarks](/docs/features/bookmarks/)).

## suggestions and inline completion

focus the empty bar and a dropdown lists your most visited sites, then your
**recent searches**. start typing and it changes to:

- **inline completion**: the bar fills in the rest of the first site you have
  visited whose address starts with what you typed, reduced to the site itself
  (type `you` and it completes to `youtube.com/`, never a deep link). the
  completed part is selected, so keep typing to replace it or press Enter to go.
- your past searches that match.
- your query itself, marked **search with** and the engine that will run it,
  when what you typed is a search rather than an address.
- **wis recommendations**: a few more matching sites from your history.

a site that is already open in a tab shows **switch to tab** and takes you to
that tab instead of loading it again. move through the rows with the arrow keys
or Tab, and press Enter to pick one. the **x** on a row removes that site or
search from your history.

suggestions come from the current workspace's history. searches typed in a
private window are never remembered.

## typing addresses

anything that looks like an address opens as one; everything else is searched
for with your default engine.

- an address normally needs a dot (`example.com`). `localhost`, a bracketed IPv6
  address, and a name with a port (`devbox:8080`) also count, so local
  development servers open directly.
- local addresses (`localhost`, any `*.localhost` name, `127.x.x.x`, and
  `[::1]`) open over `http://`. everything else opens over `https://`.
- a `file://` URL opens the local file as typed.
- other schemes, such as `javascript:`, `data:`, and `mailto:`, are searched for
  and never opened from the bar.

## search engines

**settings → search** lists the built-in engines, **DuckDuckGo** (the default),
**Google**, and **Bing**, plus any custom engines you add. click **make default**
on any of them. the default engine is used everywhere wis searches: the address
bar, the launchpad, the
[command palette](/docs/features/productivity/#command-palette), and the
**search** row of the
[page context menu](/docs/features/page-tools/#the-page-context-menu).

### custom engines

add an engine under **add a custom engine** with an optional name, a keyword,
and the site's search URL with `%s` (or `{searchTerms}`) where the query goes,
for example `https://kagi.com/search?q=%s`. wis checks the template as you add
it:

- the URL must start with `http://` or `https://` and contain the placeholder.
- the placeholder cannot be part of the site's address itself.
- a custom engine needs a keyword; leave the name blank and it is named after
  the site.

you can keep up to 16 custom engines. remove one with **remove**.

## keyword shortcuts

type a keyword, a space, and a query to search a specific engine without
changing your default: `kagi rust lifetimes` searches Kagi if `kagi` is that
engine's keyword.

- every custom engine has a keyword. built-in engines can carry one too: click
  **add keyword** beside DuckDuckGo, Google, or Bing.
- keywords are a single word, up to 32 characters, and unique across both lists.
- if a custom engine and a built-in engine ever share a keyword, the custom
  engine wins.
- keywords are checked before anything else, so an address can never shadow
  one. a keyword typed on its own, with no query after it, is treated as normal
  input.

keyword shortcuts work in the address bar, on the launchpad, and in the command
palette.

## the launchpad

a new tab opens the **launchpad**: a search box and a row of shortcut tiles over
your [workspace background](/docs/features/workspaces/). the search box behaves
exactly like the address bar, with the same suggestions, engines, and keyword
shortcuts; its suggestions open when you click or start typing.

- click a tile to open it, or middle-click to open it in a background tab and
  stay on the launchpad.
- drag tiles to reorder them.
- right-click a tile for the link actions of the
  [page context menu](/docs/features/page-tools/#the-page-context-menu).

### new tab settings

**settings → new tab** controls what a new tab shows:

- **new tabs open**: choose **launchpad** or **homepage**.
- **homepage**: the address loaded for new tabs while homepage is selected. it
  must be a web address; leave it empty and new tabs fall back to the launchpad.
- **launchpad shortcuts**: up to eight tiles. add one with an optional label
  (left blank, it is named after the site) and an address, drag the grip to
  reorder, and remove a tile to make room for another.

## navigation controls

the back, forward, and reload buttons sit beside the address bar.

- **back** and **forward** dim when the tab has no history in that direction.
- **reload** turns into a **stop** button while the page is loading; click it to
  stop the load. **Cmd+R** reloads and **Cmd+Shift+R** reloads past the cache.
- a thin **progress strip** in your accent color runs along the bottom edge of
  the address bar while a page loads. Windows does not report how far a load
  has got, so there the strip plays a steady animation instead.
- the **reader mode** button next to them is covered in
  [page tools](/docs/features/page-tools/#reader-mode).

you can also go back and forward with **Cmd+[** and **Cmd+]** (or Cmd+Left and
Cmd+Right), or with a
[two-finger swipe](/docs/features/productivity/#swipe-to-go-back-and-forward).
