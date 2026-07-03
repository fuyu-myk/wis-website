---
title: passwords
description: an encrypted password vault unlocked with Touch ID, with save-on-submit capture and origin-matched autofill.
sidebar:
  order: 6
---

wis includes a password vault: encrypted at rest, unlocked with Touch ID, and
fully on-device. pages can never reach it; only wis can read a credential, and
only to fill it into the page it belongs to.

## how it is secured

credentials are sealed with ChaCha20-Poly1305 (AEAD) under a 32-byte master key.
that key is generated with the OS random generator, stored in the macOS login
Keychain as this-device-only, and released into memory only after a **Touch ID**
check. the in-memory copy is wiped as soon as it is no longer needed, and
plaintext is never logged or written to disk.

## saving a password

when you submit a login, wis offers to save it. the capture watches several
submit signals, form submit, Enter in a password field, a click on a login
button, the page tearing down, and the password field disappearing, and it
pierces shadow DOM, so it catches single-page-app and modal logins (Twitch,
Gmail, Canvas) that a naive form watcher would miss.

the save prompt follows the login you captured across the post-login navigation,
so it waits for you to act instead of vanishing when the page changes.

## autofill

the **key button** in the address bar surfaces the logins saved for the current
site. wis matches credentials to the page origin and fills them by evaluating
into the page; the page itself can never call the vault. hosts are normalised so
a login saved on `www.example.com` still fills on `example.com` and vice versa.

## managing saved logins

manage everything in **settings → passwords**: view saved accounts, and remove
ones you no longer need.
