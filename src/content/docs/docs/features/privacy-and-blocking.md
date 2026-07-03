---
title: privacy and blocking
description: the native blocking stack that replaces extensions, tracker blocking, cosmetic filtering, an element picker, scriptlets, filter lists, and user scripts.
sidebar:
  order: 4
---

an embedded WebKit cannot load browser extensions, so wis ships a **native
blocking stack** instead. it runs by default, with no add-ons to install, and
covers most of what an ad blocker plus a userscript manager would.

## tracker and ad blocking

trackers are blocked at two levels: host-level blocking in the per-workspace
network proxy, and engine-level blocking compiled into a WebKit content-rule
list. wis ships with EasyPrivacy and EasyList, refreshed in the background and
cached so a warm launch never re-parses them.

blocking is skipped for workspaces set to **permissive** privacy mode.

## cosmetic filtering

network blocking stops requests, but it leaves behind empty ad slots,
placeholders, and overlay nags. cosmetic filtering hides those: wis applies the
filter lists' element-hiding rules to each page, including modern `:has(...)`
rules that catch containers like sponsored feed cards. it re-applies itself
across single-page-app navigations, so sites that swap content without a full
reload stay clean.

## element picker and zapper

when something slips through, hide it yourself. open the picker with
**Cmd+Shift+X** (or **view → hide element**), hover to highlight the element
under your cursor, and click to hide it. wis computes a stable selector, hides it
immediately, and remembers it for that site on every future visit.

manage hidden elements in **settings → privacy → filter lists** (the "hidden
elements" list).

## filter lists

**settings → privacy → filter lists** manages your subscriptions. wis defaults
to the uBO filters and quick-fixes lists (which carry the YouTube rules), and you
can add or remove any HTTPS filter-list URL. each is fetched, cached, and folded
into the blocking engine; adding one triggers a fetch and rebuild that re-applies
to live tabs.

**scriptlets** from Brave's prebuilt uBO resource library expand `+js(...)` rules
into small injected scripts. this is what makes **YouTube ad blocking** work:
the scriptlets strip ad entries from the player's responses before they play.

## user scripts

wis includes a Tampermonkey-style user-script runner. import a `.user.js` file
in **settings → privacy → user scripts**, and wis reads its `==UserScript==`
metadata (`@name`, `@match`, `@include`, `@exclude`, `@run-at`) to decide where
and when it runs.

:::note
user scripts run in the **page world with no GM_* APIs**. they are good for DOM
and CSS tweaks and self-contained logic; they do not get a privileged bridge.
each script is wrapped so an error in one cannot break the page.
:::

scripts are skipped in permissive workspaces, like the rest of the blocking
stack. toggle or remove them any time.

## fraudulent website warning

every page wis loads has WebKit's fraudulent-website warning enabled (Apple's
proxied Safe Browsing). it shows a full-page warning before a suspected phishing
or malware site, backed by a real threat database, complementing the structural
heuristics in [safe browsing](/docs/features/safe-browsing/). toggle it in
**settings → privacy** (it is on by default, since the check performs network
lookups).
