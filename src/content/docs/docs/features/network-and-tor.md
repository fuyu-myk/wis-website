---
title: network and Tor
description: DNS over HTTPS with a provider picker, HTTPS-First, the one-toggle built-in Tor VPN, SOCKS5 upstream proxies, media extensions, and staying logged in across restarts.
sidebar:
  order: 7
---

wis treats the network as a privacy boundary. every request a workspace makes is
judged per workspace: blocked, upgraded, or routed through your proxy or Tor,
before it leaves the machine. the routing and DNS controls live in
**settings → network**.

## DNS over HTTPS

DNS lookups are resolved over HTTPS (DoH), so the names you visit are not sent in
the clear for anyone on the network to read.

pick the provider in **settings → network → "encrypted DNS"**: **Cloudflare**
(the default), **Quad9**, or **Google**. the row explains what each one sees
(Quad9, for instance, also refuses to resolve known malicious hosts). a change
applies live, with no restart, and wis runs a test lookup through the new
provider and shows whether it answered, since pages cannot load through a
provider that does not.

a workspace routed through Tor or a SOCKS5 proxy does not use this provider:
Tor resolves names at its exit, and a SOCKS5 proxy resolves them itself. the row
says so when that is the case.

## HTTPS-First

wis enforces HTTPS-First: a plain `http://` request is upgraded to `https://`
before it leaves, so you connect securely wherever a site supports it. strict
workspaces go further and block plain HTTP outright, while permissive ones leave
it alone.

## Tor VPN

wis has a **built-in Tor client** (Arti), exposed as a simple on/off toggle in
the sidebar and the top-tabs rail. there is no extension and no separate browser
to run.

- the Tor icon lights only when connected, shows a connecting state in between,
  and shows a distinct error state if Tor could not connect.
- the first connection bootstraps and can take a few seconds.
- toggling Tor re-routes the workspace by reloading its tabs.
- while a workspace uses a SOCKS5 proxy, the toggle is disabled; switch the
  route in settings instead.

Tor is a default build feature, so a standard build of wis already includes it.

## upstream proxy

each workspace can route through an upstream proxy: the built-in Tor, or a
SOCKS5 proxy running on your machine or network. the proxy is per workspace, so
you can run one workspace over Tor and another direct at the same time.

set it in **settings → network → "route this workspace"**: **direct**, **Tor**,
or **SOCKS5**.

- choosing SOCKS5 opens host and port fields (`127.0.0.1` and `9050` to start).
  enter a bare host and port, with no scheme, credentials, or path; the row
  flags anything else before you can apply it.
- once a route is applied, the **"connection"** row checks that the proxy
  answers and speaks SOCKS5 (or that Tor is up), and re-checks while settings
  is open.

routing fails closed. if a route cannot be set up, for example Tor will not
connect, the change is refused and the row says why, so the workspace never
looks routed while its traffic goes elsewhere. if a route stops working later,
wis refuses the workspace's traffic rather than sending it any other way, and
the next tab you open retries the route. changing the route also cuts
connections already open, so nothing keeps using the old path.

## after sleep or a network change

when your computer wakes from sleep or moves to another network, wis drops the
connections that died along the way and redials any that were still
connecting, so pages do not hang waiting on a dead connection. a reload also
revives a stalled connection.

## media extensions (MSE and EME)

wis enables WebKit's Media Source Extensions and Encrypted Media Extensions on
pages. on macOS they are toggleable in
**settings → privacy → "streaming media support"** (on by default).

- **MSE** restores adaptive streaming on many non-DRM video sites (it is off by
  default in an embedded WebKit).
- **EME** exposes the FairPlay key system to services that request it.

on Windows and Linux, Media Source is always on and there is no toggle; the
FairPlay part is macOS-only.

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

:::note
staying logged in across restarts is macOS-only for now. on Windows and Linux,
session logins end when you quit.
:::
