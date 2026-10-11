---
title: privacy and blocking
description: Global Privacy Control and the native blocking stack that replaces extensions, with tracker blocking, cosmetic filtering, an element picker, scriptlets, filter lists, user scripts, and the fraudulent website warning.
sidebar:
  order: 6
---

an embedded WebKit cannot load browser extensions, so wis ships a **native
blocking stack** instead. it runs by default, with no add-ons to install, and
covers most of what an ad blocker plus a userscript manager would.

everything on this page is managed in **settings → privacy**. to clear history,
cookies, cache, or site storage, see
[history and data](/docs/features/history-and-data/).

## Global Privacy Control

wis asks every site you visit not to sell or share your data, using the Global
Privacy Control signal. it is on by default.

- every page, in every frame, sees `navigator.globalPrivacyControl` set to
  `true`, which is how sites read the signal.
- the `Sec-GPC: 1` header is added to unencrypted requests. an HTTPS connection
  is encrypted end to end, so wis cannot add a header to it; the page-side
  signal covers those sites.

turn it off in **settings → privacy → "Global Privacy Control"**. the change
reaches open tabs straight away, with no restart.

## tracker and ad blocking

trackers and ads are blocked in the per-workspace network proxy, so a matching
request is dropped before it leaves the machine. on macOS a second layer
compiles the tracker rules into a WebKit content-rule list, so the engine itself
refuses them too. wis ships with EasyPrivacy and EasyList, refreshed in the
background and cached so a warm launch never re-parses them.

blocking is skipped for workspaces set to **permissive** privacy mode (see
[workspaces](/docs/features/workspaces/)).

## cosmetic filtering

network blocking stops requests, but it leaves behind empty ad slots,
placeholders, and overlay nags. cosmetic filtering hides those: wis applies the
filter lists' element-hiding rules to each page, including modern `:has(...)`
rules that catch containers like sponsored feed cards. it re-applies itself
across single-page-app navigations, so sites that swap content without a full
reload stay clean. it runs on macOS, Windows, and Linux.

## element picker and zapper

when something slips through, hide it yourself. open the picker with
**Cmd+Shift+X**, from the [command palette](/docs/features/productivity/#command-palette)
("hide element"), or on macOS from **view → hide element**. hover to highlight
the element under your cursor, and click to hide it. wis computes a stable
selector, hides it immediately, and remembers it for that site on every future
visit. the picker works on macOS, Windows, and Linux.

hidden elements are listed per site in **settings → privacy** (the "hidden
elements" list, under filter lists). remove one there and reload the page to
bring it back.

## filter lists

**settings → privacy → filter lists** manages your subscriptions. EasyPrivacy,
EasyList, and the uBO scriptlet resources are built in, and wis subscribes you
to the uBO filters and quick-fixes lists by default (they carry the YouTube
rules). you can add any HTTPS filter-list URL or remove a subscription. each is
fetched, cached, and folded into the blocking engine; adding one triggers a
fetch and rebuild that re-applies to live tabs.

lists refresh on launch and are cached for 24 hours. turn that off with
**"auto-update filter lists"**, or pull the latest copies any time with
**"refresh now"**.

**scriptlets** from Brave's prebuilt uBO resource library expand `+js(...)` rules
into small injected scripts. this is what makes **YouTube ad blocking** work:
the scriptlets strip ad entries from the player's responses before they play.

:::note
scriptlets run on macOS only for now. on Windows and Linux, network blocking
and cosmetic filtering still apply, but `+js(...)` rules (and with them YouTube
ad blocking) do not.
:::

## user scripts

wis includes a Tampermonkey-style user-script runner. import a `.user.js` file
in **settings → privacy → user scripts**, and wis reads its `==UserScript==`
metadata (`@name`, `@match`, `@include`, `@exclude`, `@run-at`) to decide where
and when it runs.

:::note
user scripts run in the **page world with no GM_* APIs**. they are good for DOM
and CSS tweaks and self-contained logic; they do not get a privileged bridge.
each script is wrapped so an error in one cannot break the page. like
scriptlets, they run on macOS only for now.
:::

scripts are skipped in permissive workspaces, like the rest of the blocking
stack. toggle or remove them any time.

## fraudulent website warning

on macOS, every page wis loads has WebKit's fraudulent-website warning enabled
(Apple's proxied Safe Browsing). it shows a full-page warning before a suspected
phishing or malware site, backed by a real threat database, complementing the
structural heuristics in [safe browsing](/docs/features/safe-browsing/). toggle
it in **settings → privacy** (it is on by default, since the check performs
network lookups).

:::note
this warning is macOS-only: the engines wis uses on Windows and Linux expose no
equivalent, and the settings row says so there. the navigation safety
interstitial in [safe browsing](/docs/features/safe-browsing/) still checks
risky links on every platform.
:::
