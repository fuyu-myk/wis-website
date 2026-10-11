---
title: architecture
description: how wis is built, the five-crate workspace, the IPC pattern, the cross-platform layer, and where new logic belongs. for contributors.
sidebar:
  order: 4
---

this page is a contributor-facing overview of how wis is built. the full,
authoritative architecture document is
[`WIS.md`](https://github.com/fuyu-myk/wis-browser/blob/main/WIS.md) at the
repository root; read it before making changes. subsystem deep dives live in
[`docs/architecture/`](https://github.com/fuyu-myk/wis-browser/tree/main/docs/architecture),
and where they disagree, `WIS.md` wins.

## the shape of it

wis is a **Cargo workspace** with a React and TypeScript chrome, wired together
with Tauri 2. the guiding principle is a **functional core, imperative shell**:
pure, dependency-light logic lives in the core crates and is fully testable,
while Tauri commands and React components stay thin.

## the five crates

dependencies flow strictly downward; upper layers import lower ones, never the
reverse.

```text
wis-browser      (crates/shell/src-tauri)  Tauri shell, IPC commands, native glue
       |
  wis-network    (crates/network)          privacy decision engine, proxy, DoH, Tor
       |
  wis-storage    (crates/storage)          Storage trait + SQLite
       |                 \
   wis-core      (crates/core)   wis-secrets (crates/secrets)  vault crypto + key store
   (pure data model, no I/O)
```

- **wis-core**: the pure data model, no I/O. defines the root `BrowserState`,
  workspaces, tabs, settings, and typed IDs, plus pure logic such as keyboard
  bindings, search engines, link-safety heuristics, bookmark HTML and password
  CSV import and export, and user scripts. every mutation is a pure `with_*`
  builder that returns a new value.
- **wis-secrets**: vault cryptography, master-key storage, and the password
  generator, isolated from the rest. entries are sealed with ChaCha20-Poly1305
  under a random master key held in the OS secure store (the macOS Keychain, or
  a Windows DPAPI-sealed blob), released only after Touch ID or Windows Hello
  and zeroized on drop. Linux has no key store yet, so the vault is off there.
- **wis-storage**: persistence. a `Storage` trait with a single SQLite
  implementation (bundled SQLite in WAL mode): normalized tables, append-only
  migrations, `VACUUM INTO` backups, and a resilient open that sets a profile
  aside only when it fails an integrity check.
- **wis-network**: the privacy decision engine. tracker and ad blocking (the
  `adblock` crate), HTTPS-First, DNS over HTTPS, request policy, and a
  per-workspace loopback proxy that forwards directly, through a SOCKS5 host, or
  through the built-in Tor client (Arti, behind the default-on `tor` feature).
- **wis-browser**: the Tauri shell. `AppState`, IPC commands, one native module
  per feature (overlays, find, capture, downloads, vault, peek, reader, and the
  rest), and the per-platform seams described below.

## the IPC pattern

every mutating command goes through `mutate`: take the state lock, snapshot for
rollback, compute the next state through a pure `wis-core` transition, persist
it, and roll back in memory if the write fails. on success the command emits a
`browser-state-changed` event and the frontend re-fetches state through React
Query, which is the single source of truth on the JavaScript side. read-only
commands hold the lock only long enough to clone what they need.

## the capability boundary

the security boundary is **local versus remote content**, not just the window.
Tauri's command-granting capability covers only wis's own local webviews (the
chrome and its `overlay-*` webviews) in the `main` and `win-*` windows. tab
pages (`tab-<uuid>`) and the peek preview load remote URLs and match no
command-granting capability, so a web page can never call a command, without
exception. wry's `window.ipc` global and Tauri's own scripts are kept off remote
pages too.

## webviews, overlays, and windows

native tab webviews composite **above** the chrome, so any floating UI that must
sit over a page (the find bar, command palette, address-bar suggestions, peek,
and so on) is a separate per-window **overlay webview**, positioned natively.

wis runs **one OS window per workspace**. the chrome bundle is window-agnostic:
it reads its own window label at runtime and routes tabs, overlays, peek, and
widgets to that window, so a secondary window behaves exactly like the main one
over its own workspace. every webview disables wry's drag-and-drop handler so
pages keep native HTML5 drag and drop and file drops, and hidden child webviews
are parked off-window so they never intercept a drag meant for the visible
page.

## the cross-platform layer

wis is macOS-first, with Windows and Linux ports. each macOS capability reaches
the other platforms through a **per-feature seam**, verified per platform,
rather than a lowest-common-denominator abstraction.

- **page to chrome messages.** the page scripts are identical on every platform;
  only the receiving plumbing differs. macOS gives each feature its own
  `WKScriptMessageHandler`. Windows has a single WebView2 message pipe, so a
  document-start shim recreates `window.webkit.messageHandlers` and one
  dispatcher (`win_dispatch`) routes each message to the same per-feature
  logic. Linux registers native WebKitGTK handlers (`gtk_dispatch`), no shim
  needed.
- **a private script world.** on macOS and Linux, the channels whose messages
  make the browser act, and their scripts, run in wis's own script world, so a
  page can neither post to them nor reach their globals. WebView2 has no
  isolated world, so on Windows those scripts post through a private sender
  carrying a per-tab token, and the dispatcher drops any acting message
  without it.
- **keyboard shortcuts.** native menu accelerators on macOS, where a focused tab
  is offered every non-reserved shortcut first. on Windows and Linux, native
  accelerators never fire behind a focused webview, so shortcuts are dispatched
  in JavaScript: by the chrome and overlays, and by a forwarder injected into
  each tab.
- **native UX ports.** clipboard, file dialogs, downloads, click-to-focus, find,
  print, and capture each have a per-platform implementation in the same
  module.
- **the feature-availability toast.** a user-invokable feature with no backend on
  the running platform raises a notice instead of a silent no-op.
  `lib/platformSupport.ts` is the single source of truth; wiring a feature up on
  a platform means deleting its entry there.

wis vendors patched copies of **wry**, **tao**, and **tauri-runtime-wry** under
`vendor/`, applied through `[patch.crates-io]`. the patches cover what upstream
does not yet: compositing positioned child webviews on Linux (a full-window
`gtk::Fixed` overlay plus show and map fixes), key events and page-first menu
shortcuts for focused child webviews on macOS, load-failure reporting, download
progress and cancel, and keeping Tauri's scripts off remote pages. each patch is
documented in its `WIS-PATCH.md`, and feature code never patches them.

the user-facing result is summarized in
[platform support](/docs/reference/platform-support/).

## the frontend

the chrome lives in `crates/shell/src`, in React and TypeScript. imports always
use `@/...` aliases, never relative paths across modules. `components/` holds
the chrome, tab strips, settings, and pages; `hooks/` the state, webview, and
overlay hooks; `lib/` framework-agnostic helpers (keybindings, theme, URL-bar
suggestions, platform support); `overlay/` the overlay surfaces; and
`bindings/` the typed IPC wrappers that mirror `wis-core`.

## tech stack

- **app**: Rust (toolchain pinned in `rust-toolchain.toml`) and Tauri 2, with
  vendored, patched wry, tao, and tauri-runtime-wry.
- **rendering**: the system WebView: WKWebView on macOS, WebView2 on Windows,
  WebKitGTK on Linux.
- **interface**: React 18, TypeScript, Vite, and TanStack Query.
- **storage**: SQLite via `rusqlite`.
- **network**: a per-workspace loopback proxy on `tokio` and `hyper`, Brave's
  `adblock` engine, DNS over HTTPS via `hickory`, and Tor via Arti.
- **vault**: ChaCha20-Poly1305, with the key held in the macOS Keychain or
  Windows DPAPI.

## quality bar

production-grade or it does not ship. every change is judged on correctness,
performance, security, UI/UX, and architecture together, not just "it works".
performance is the product: ask what a change costs in RAM, IPC round-trips,
re-renders, and dependencies, and keep unused features at zero cost. a change
to a core subsystem (browser state, storage, network) needs a test that locks
the invariant, and `WIS.md` is updated in the same change; it is the source of
truth other contributors and agents read first.

before claiming a change done, run:

```bash
cd crates/shell
pnpm build   # tsc type check, then vite build
pnpm lint    # ESLint: React hooks rules and no-console
pnpm test    # node:test, with an 80% coverage gate on src/lib
cd ../..
make lint    # clippy with warnings as errors, then ESLint
make test    # Rust tests, then the frontend tests
```

## CI and releases

**CI** runs on every push and pull request to `main`, on a matrix of macOS,
Windows, and Ubuntu 22.04. each leg builds the frontend, runs ESLint and the
frontend tests, then `cargo fmt --check`, clippy with warnings as errors, and
`cargo test`. it is the only place the Windows (WebView2) and Linux (WebKitGTK)
code is fully compiled, since a macOS host cannot cross-compile it.

**releases** build on a `v*` tag: a universal `.dmg` for macOS, `.msi` and NSIS
`.exe` installers for Windows, and `.deb`, `.rpm` and `.AppImage` packages for Linux,
attached to one draft release with signed updater artifacts. Apple code signing
and notarization are not set up yet, so the in-app updater stays dormant until
they are.

## contributing

read the
[contributing guide](https://github.com/fuyu-myk/wis-browser/blob/main/docs/contributing/CONTRIBUTING.md)
for branch names, commit style, and the review checklist, and
[build from source](/docs/getting-started/building-from-source/) to get a
local build running.
