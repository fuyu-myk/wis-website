---
title: safe browsing
description: peek at links in an isolated preview, a navigation safety interstitial for risky links, clear error pages for failed and untrusted connections, open-in-app prompts, and per-site camera and microphone consent.
sidebar:
  order: 9
---

beyond the [fraudulent-website warning](/docs/features/privacy-and-blocking/#fraudulent-website-warning)
(macOS only), wis adds its own safety layers for links, failed connections,
links into other apps, and device access. all of them run on macOS, Windows,
and Linux.

## peek

hold **Option and click** a link (**Alt+click** on Windows and Linux) to preview
it in a small card without leaving the page you are on. the preview is
**incognito**, loaded in a separate ephemeral data store and routed through your
workspace proxy, so a link-based scam can never touch your real session or
browser.

- a banner warns you about suspicious links, using structural heuristics:
  homograph and punycode tricks, `user@host` URLs, deceptive anchor text, raw IP
  hosts, plain `http`, and more.
- a **reader toggle** strips the previewed page down to its content, in place.
- you can browse inside the preview. the back and forward arrows in its header
  (or the usual back and forward shortcuts) move through its history, **Cmd+F**
  finds text in the preview, and **Cmd+R** reloads it. **Cmd+W** closes the
  preview, not the tab behind it.
- the banner follows the preview as it navigates, so the warning always matches
  the page you are looking at.
- **open as tab** moves the page into a real tab. for a high-risk link this
  first requires confirming a red "proceed anyway" dialog.

## navigation safety interstitial

peek handles links you choose to preview; the navigation guard handles real
navigations you might not have meant. when you click a risky link, wis intercepts
it **before anything loads in the background** and raises a full-window
interstitial showing the threat level and the reasons. a link that checks out
as safe just opens as normal.

from there you can "take me back" or confirm a red "proceed anyway" (which
remembers the host for the session). a page-load fallback also catches risky
navigations that do not come from a click, like an address-bar entry or a
JavaScript redirect. because wis already enforces HTTPS-First, a plain-`http`
medium-risk page is intentionally not interrupted.

## certificate errors

when a site's security certificate cannot be trusted, wis shows a full-page
warning in the tab, in place of the page, that your connection to the site isn't
private. it says what went wrong in plain terms: the certificate is expired or
not yet valid (sometimes just a wrong device clock), was issued for a different
site, comes from an untrusted issuer (such as a self-signed certificate, or a
connection being intercepted), or has been revoked.

there is no "proceed anyway" bypass: wis never loads a page over a connection it
could not verify, and the only action is **try again**.

## error pages for failed loads

when a page cannot load, wis shows a clear error page in the tab's place instead
of a blank pane, naming the link that failed:

- **can't find** the site: the address could not be resolved (a typo, or a
  site that no longer exists).
- **can't reach** the site: the server refused the connection or is
  unreachable.
- the site **took too long to respond**: the connection timed out.
- **you appear to be offline**: wis could not reach the network at all.

**try again** retries the same link. on Linux the engine reports failures more
coarsely, so apart from certificate errors you see a general "can't open"
message.

## open in app

links that hand off to another app, like `zoommtg://`, `slack://`, or
`mailto:`, never open silently. wis stops the navigation and shows a prompt
naming the site that asked, the app it wants to open (on macOS, by name), and
the full link; you choose **open** or **cancel**. if no app on your machine
handles the link, the prompt says so instead. this is also what lets a sign-in
page hand you back to a desktop app once you have logged in.

- the prompt carries a **"remember this decision"** switch (off by default).
  a remembered answer is tied to the site you were on, and also covers frames
  that site embeds.
- manage remembered decisions in **settings → privacy → open in app**: flip
  allowed and blocked, or remove a site so it asks again.
- links to local files and to OS handlers with a history of abuse are never
  offered at all.

:::note
the prompt covers tabs, new windows, peek, and widget panels. on Windows and
Linux, a link that fires inside a popup window is left to the engine's own
handling.
:::

## camera and microphone permission

an embedded WebKit grants every camera and microphone request silently. wis puts
that behind your consent instead. the first time a site asks to capture, an
in-browser prompt appears anchored to the page; nothing reaches the camera or mic
until you allow it.

- the prompt carries a **"remember this decision"** toggle (on by default). a
  remembered answer persists across restarts; with the toggle off, your answer
  lasts only for the session.
- manage remembered grants in **settings → privacy → site permissions**: flip
  allow and block, or remove a site so it asks again.

:::note
consent works on macOS, Windows, and Linux, with a few gaps. on Linux, widget
panels and peek get no camera or mic access yet (tabs are covered). a request
from a frame embedded from another site is not supported yet. on macOS, the OS
still shows its own one-time prompt for wis itself the first time the app
captures.
:::
