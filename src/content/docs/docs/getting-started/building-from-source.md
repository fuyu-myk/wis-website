---
title: build from source
description: build and run wis locally on macOS, Windows, or Linux with the Makefile, pnpm, and cargo.
sidebar:
  order: 2
---

wis is a Cargo workspace with a React and TypeScript interface, wired together
with Tauri 2. everything runs through the `Makefile`.

## prerequisites

- **Rust** via [rustup](https://rustup.rs/). the repository pins its compiler in
  `rust-toolchain.toml`, and rustup installs that exact version (with clippy and
  rustfmt) the first time you build.
- **Node.js 22.13 or later** and **pnpm 11 or later**. wis is pnpm-only; never
  use npm, npx, or yarn.
- the [Tauri prerequisites](https://tauri.app/start/prerequisites/) for your
  platform: the Xcode command-line tools on macOS, the Microsoft C++ build tools
  and WebView2 on Windows, and the WebKitGTK development packages on Linux. on
  Ubuntu 22.04, the CI build installs these:

```bash
sudo apt-get install -y libwebkit2gtk-4.1-dev libgtk-3-dev \
  libayatana-appindicator3-dev librsvg2-dev patchelf
```

## clone and run

```bash
git clone https://github.com/fuyu-myk/wis-browser.git
cd wis-browser
make install   # install the frontend dependencies (pnpm)
make dev       # launch the app in development mode
```

`make dev` runs `pnpm tauri dev` with a separate development profile
(`src-tauri/tauri.dev.conf.json`). the dev build runs under its own app
identifier, so it keeps its own browsing profile and never touches the data of
an installed copy of wis. the built-in
[Tor client](/docs/features/network-and-tor/) is a **default cargo feature**,
so a plain `make dev` already includes it.

## a production build

```bash
make build
```

this produces an optimized app and its installers for your platform. the
Makefile picks the target for your machine: Apple Silicon or Intel on macOS,
x86_64 on Linux and Windows. set `TARGET_TRIPLE` to override it.

## the commands

| command | what it does |
|---|---|
| `make install` | install frontend dependencies with pnpm |
| `make dev` | launch the app in development mode, on its own dev profile |
| `make build` | production build and installers for your platform |
| `make build_frontend` | build only the React frontend bundle |
| `make check` | `cargo check` the whole workspace, tests included |
| `make test` | run the Rust tests, then the frontend tests |
| `make lint` | clippy with warnings as errors, then ESLint on the frontend |
| `make fmt` | format all Rust code |
| `make fmt-check` | check Rust formatting without changing files (the CI gate) |
| `make clean` | remove build artefacts, the frontend bundle, and `node_modules` |
| `make help` | list every target |

## checks before you open a pull request

```bash
cd crates/shell && pnpm exec tsc --noEmit   # frontend type check
make lint                                   # clippy, then ESLint
make test                                   # Rust tests, then frontend tests
```

- `pnpm build` in `crates/shell` runs the same type check (`tsc`) followed by a
  production `vite build`.
- ESLint enforces the React hooks rules and `no-console`, all as errors.
- the frontend tests run on Node's built-in `node:test` runner, with no extra
  dependencies. `pnpm test` fails if line or function coverage of `src/lib`
  drops below 80%.

CI runs these gates, plus a Rust formatting check, on macOS, Windows, and Linux
for every push and pull request to `main`.

## cargo features

the **`tor`** feature, the bundled Arti Tor client, is on by default. to build
without it, pass `--no-default-features` through to cargo:

```bash
cd crates/shell
pnpm tauri build -- --no-default-features
```

## where to go next

read the
[contributing guide](https://github.com/fuyu-myk/wis-browser/blob/main/docs/contributing/CONTRIBUTING.md)
for branch names, commit style, and the review bar. the
[architecture reference](/docs/reference/architecture/) explains how the five
crates fit together and where new logic belongs, which is the best starting
point if you plan to contribute.
