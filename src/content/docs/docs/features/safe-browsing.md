---
title: safe browsing
description: peek at links in an isolated preview, a navigation safety interstitial for risky links, and per-site camera and microphone consent.
sidebar:
  order: 7
---

beyond the [fraudulent-website warning](/docs/features/privacy-and-blocking/#fraudulent-website-warning),
wis adds two of its own safety layers for links and one for device access.

## peek

hold **Option and click** a link to preview it in a small card without leaving
the page you are on. the preview is **incognito**, loaded in a separate ephemeral
data store and routed through your workspace proxy, so a link-based scam can
never touch your real session or browser.

- a banner warns you about suspicious links, using structural heuristics:
  homograph and punycode tricks, `user@host` URLs, deceptive anchor text, raw IP
  hosts, plain `http`, and more.
- a **reader toggle** strips the previewed page down to its content, in place.
- opening a high-risk link as a real tab first requires confirming a red "proceed
  anyway" dialog.

## navigation safety interstitial

peek handles links you choose to preview; the navigation guard handles real
navigations you might not have meant. when you click a risky link, wis intercepts
it **before anything loads in the background** and raises a full-window
interstitial showing the threat level and the reasons.

from there you can "take me back" or confirm a red "proceed anyway" (which
remembers the host for the session). a page-load fallback also catches risky
navigations that do not come from a click, like an address-bar entry or a
JavaScript redirect. because wis already enforces HTTPS-First, a plain-`http`
medium-risk page is intentionally not interrupted.

## camera and microphone permission

an embedded WebKit grants every camera and microphone request silently. wis puts
that behind your consent instead. the first time a site asks to capture, an
in-browser prompt appears anchored to the page; nothing reaches the camera or mic
until you allow it.

- the prompt carries a **"remember this decision"** toggle (on by default). a
  remembered answer persists across restarts; "just once" lasts only for the
  session.
- manage remembered grants in **settings → privacy → site permissions**: flip
  allow and block, or remove a site so it asks again.

:::note
this is macOS-only (other platforms deny), and the OS still shows its own
one-time prompt for wis itself the first time the app captures.
:::
