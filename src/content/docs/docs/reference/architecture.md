---
title: architecture
description: how wis is built, the five-crate workspace, the IPC pattern, and where new logic belongs. for contributors.
sidebar:
  order: 3
---

this page is a contributor-facing overview of how wis is built. the full,
authoritative architecture document is [`WIS.md`](https://github.com/fuyu-myk/wis/blob/main/WIS.md)
at the repository root; read it before making changes.

## the shape of it

wis is a **Cargo workspace** with a React/TypeScript chrome, wired together with
Tauri. the guiding principle is a **functional core, imperative shell**: pure,
dependency-light logic lives in the core crates and is fully testable, while
Tauri commands and React components stay thin.

## the five crates

dependencies flow strictly downward; upper layers import lower ones, never the
reverse.

```text
wis-browser-app  (crates/shell/src-tauri)  Tauri shell, IPC commands, native glue
       |
  wis-network    (crates/network)          privacy decision engine, proxy, DoH, Tor
       |
  wis-storage    (crates/storage)          Storage trait + SQLite
       |                 \
   wis-core      (crates/core)   wis-secrets (crates/secrets)  vault crypto + keychain
   (pure data model, no I/O)
```

- **wis-core**: the pure data model, no I/O. defines the root browser state,
  workspaces, tabs, settings, and the typed transitions over them. every mutation
  is a pure builder that returns a new value.
- **wis-secrets**: vault cryptography and master-key storage, isolated from the
  rest. ChaCha20-Poly1305 under a key held in the macOS Keychain.
- **wis-storage**: the persistence layer. a `Storage` trait with a single SQLite
  implementation; browser state is saved across normalized tables in one atomic
  transaction.
- **wis-network**: the privacy decision engine, tracker blocking, DNS over HTTPS,
  HTTPS-First, the per-workspace proxy, and the built-in Tor client.
- **wis-browser-app**: the Tauri shell. IPC commands, app state, and the native
  macOS glue (overlays, biometrics, cookies, downloads, and the rest).

## the IPC pattern

every mutating command follows the same shape: take the state lock, snapshot for
rollback, compute the next state through a pure transition from `wis-core`,
persist it, and roll back in memory if the write fails. on success the command
emits a `browser-state-changed` event and the frontend re-fetches state through
React Query, which is the single source of truth on the JavaScript side.

## the frontend

the chrome lives in `crates/shell/src`, in React and TypeScript. because native
tab webviews composite **above** the chrome, any floating UI that must sit over a
page (the find bar, command palette, URL-bar suggestions, peek, and so on) is a
separate **overlay webview**, positioned natively. the chrome bundle is
window-agnostic: it reads its own window label at runtime and routes everything
to that window, so a secondary window behaves exactly like the main one over its
own workspace.

## contributing

the [quality bar](https://github.com/fuyu-myk/wis/blob/main/WIS.md) is
production-grade or it does not ship, judged on correctness, performance,
security, UI/UX, and architecture together. before claiming a change done, run
the frontend typecheck (`cd crates/shell && pnpm build`), `make lint`, and
`make test`. a change to a core subsystem needs a test that locks the invariant.
keep `WIS.md` accurate in the same change; it is the source of truth other
contributors and agents read first.
