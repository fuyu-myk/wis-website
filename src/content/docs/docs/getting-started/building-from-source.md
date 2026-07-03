---
title: build from source
description: build and run wis locally with the Makefile, pnpm, and cargo.
sidebar:
  order: 2
---

wis is a Cargo workspace with a React/TypeScript chrome, wired together with
Tauri. everything runs through the `Makefile`.

## prerequisites

- a **Rust** toolchain (stable), via [rustup](https://rustup.rs/).
- **Node.js** and **pnpm**. wis is pnpm-only; never use npm, npx, or yarn.
- the platform Tauri/WebView build dependencies. on macOS that is the Xcode
  command-line tools; on Linux, the WebKitGTK and related dev packages listed in
  the [Tauri prerequisites](https://tauri.app/start/prerequisites/).

## clone and run

```bash
git clone https://github.com/fuyu-myk/wis.git
cd wis
make install   # install the frontend dependencies (pnpm)
make dev       # launch the app in development mode
```

`make dev` runs `pnpm tauri dev`. the built-in [Tor client](/docs/features/network-and-tor/)
is a **default cargo feature**, so a plain `make dev` already includes it.

## a production build

```bash
make build
```

this produces a bundled, optimized app for your platform's target triple. the
Makefile detects your architecture automatically (Apple Silicon, Intel, Linux,
or Windows).

## the commands

| command | what it does |
|---|---|
| `make install` | install frontend dependencies with pnpm |
| `make dev` | launch the app in development mode |
| `make build` | production build for your platform |
| `make check` | `cargo check` the whole workspace |
| `make test` | run the full Rust test suite |
| `make lint` | clippy with warnings as errors |
| `make fmt` | format all Rust code |
| `make clean` | remove build artefacts |

the frontend typecheck gate is `cd crates/shell && pnpm build` (which runs `tsc`
then `vite build`).

## cargo features

the **`tor`** feature is on by default. to build without the bundled Tor client:

```bash
cargo build --no-default-features
```

## where to go next

the [architecture reference](/docs/reference/architecture/) explains how the
five crates fit together and where new logic belongs, which is the best starting
point if you plan to contribute.
