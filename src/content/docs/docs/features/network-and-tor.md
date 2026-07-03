---
title: network and Tor
description: DNS over HTTPS, HTTPS-First, the one-toggle built-in Tor VPN, upstream proxies, media extensions, and staying logged in across restarts.
sidebar:
  order: 5
---

wis treats the network as a privacy boundary. every request a workspace makes is
judged per workspace: blocked, upgraded, or routed through your proxy or Tor,
before it leaves the machine.

## DNS over HTTPS

DNS lookups are resolved over HTTPS (DoH), so the names you visit are not sent in
the clear for anyone on the network to read.

## HTTPS-First

wis enforces HTTPS-First: a plain `http://` request is upgraded to `https://`
before it leaves, so you connect securely wherever a site supports it.

## Tor VPN

wis has a **built-in Tor client** (Arti), exposed as a simple on/off toggle in
the sidebar and the top-tabs rail. there is no extension and no separate browser
to run.

- the Tor icon lights only when connected, and shows a connecting state in
  between.
- toggling Tor re-routes the workspace by reloading its tabs.

Tor is a default build feature, so a standard build of wis already includes it.

## upstream proxy

each workspace can route through an upstream proxy, either a SOCKS5 endpoint or
the built-in Tor. the proxy is per workspace, so you can run one workspace over
Tor and another direct at the same time.

## media extensions (MSE and EME)

wis enables WebKit's Media Source Extensions and Encrypted Media Extensions on
pages, toggleable in **settings → privacy**.

- **MSE** restores adaptive streaming on many non-DRM video sites (it is off by
  default in an embedded WebKit).
- **EME** exposes the FairPlay key system to services that request it.

this does not unlock Widevine-gated services; see
[known limitations](/docs/reference/known-limitations/) for what the engine can
and cannot play, and the [open in default browser](/docs/features/productivity/#open-in-default-browser)
escape hatch for the rest.

## stay logged in across restarts

WebKit keeps session cookies (the kind with no expiry) only in memory and drops
them on quit, so logins like Canvas would not survive a restart. wis snapshots a
workspace's session cookies and restores them on its next launch, so you stay
signed in.

these snapshots are **encrypted at rest** with ChaCha20-Poly1305 under a key in
the macOS Keychain, separate from the password vault and available automatically
at launch. because session cookies are live bearer tokens, a restored session
**auto-expires after 14 days**, forcing a periodic re-auth so a stolen snapshot
is only useful for a bounded window. ephemeral (private) workspaces never persist
anything.

turn it off in **settings → privacy → "stay logged in across restarts"** (on by
default); turning it off skips the snapshots and wipes any that were saved.
