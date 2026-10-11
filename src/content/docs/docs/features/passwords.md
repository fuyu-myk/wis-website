---
title: passwords
description: an encrypted password vault unlocked with Touch ID or Windows Hello, with save prompts, autofill at the field, strong generated passwords, breach checks, and CSV import and export.
sidebar:
  order: 8
---

wis includes a password vault: encrypted at rest, unlocked with Touch ID on
macOS or Windows Hello on Windows, and fully on-device. pages can never reach
it; only wis can read a credential, and only to fill it into the page it belongs
to.

:::note
the vault is not available on Linux yet, since it needs an OS key store and a
biometric check there. **settings → passwords** says so on that platform.
:::

## how it is secured

credentials are sealed with ChaCha20-Poly1305 (AEAD) under a 32-byte master key,
generated with the OS random generator. the in-memory copy of the key is wiped
as soon as it is no longer needed, and plaintext is never logged or written to
disk.

- **macOS**: the key is stored in the login Keychain as this-device-only, and
  released into memory only after a **Touch ID** check (your login password
  works as a fallback).
- **Windows**: the key is sealed with DPAPI to your Windows account, so it is
  useless to another account or on a stolen disk, and unlocking asks for
  **Windows Hello**. on a machine with no Hello PIN or biometric set up, the
  vault unlocks without a prompt rather than locking you out.

## saving a password

when you submit a login, wis offers to save it: the key button in the address
bar opens with **"save password?"** (or **"update saved password?"** when the
username is already saved). the capture watches several submit signals, form
submit, Enter in a password field, a click on a login button, the page tearing
down, and the password field disappearing, and it pierces shadow DOM, so it
catches single-page-app and modal logins (Twitch, Gmail, Canvas) that a naive
form watcher would miss.

the save prompt follows the login you captured across the post-login navigation,
so it waits for you to act instead of vanishing when the page changes.

only the page itself, or a frame from the page's own site, can raise a save
prompt, so an embedded ad or third-party frame cannot raise one under the
page's name.

## strong passwords at signup

when you focus the password field of a signup form, wis offers a generated
password in a card anchored to the field. **use password** fills it in;
**not now** leaves the field alone. either answer settles that page until it
navigates, so refocusing the field does not ask again.

- the password is generated to fit the field: wis reads the site's declared
  password rules and maximum length, so the result is one the site accepts.
- the card carries a **"remember this decision"** switch (off by default).
  remembering "use password" fills empty signup fields from then on without
  asking; remembering "not now" stops the offer. change it back any time in
  **settings → passwords → "offer a strong password on signup"**
  (**ask**, **always**, or **never**).
- the key button in the address bar also offers **"use a strong password"**,
  generated to fit the focused field. this covers password fields the card does
  not recognise as a signup, though never one the site marks as a sign-in
  field.
- signup fields inside embedded frames are not covered.

saving a generated password is a normal prompt after you submit the signup, not
a save the moment you accept it. that prompt notes that wis generated the
password and has not saved it anywhere else, so dismissing it would leave you
without a copy.

## autofill

when you focus a sign-in field (the password, or the username before it) on a
site with saved logins, a card at the field lists the usernames saved for that
site. pick one and wis fills it in; Touch ID (or Windows Hello) is asked only
after you pick, and only when the vault is locked. the **key button** in the
address bar lists the same logins.

wis matches credentials to the page origin and fills them by evaluating into
the page; the page itself can never call the vault. a page can make the card
appear by focusing a field, but it cannot read the list or pick a login: filling
always takes your click on the card, and clicks in the first moment after the
card appears are ignored. hosts are normalised so a login saved on
`www.example.com` still fills on `example.com` and vice versa.

## password generator

the add-password form in **settings → passwords** has a **generate** control.
set a length (8 to 128 characters, 20 by default) and choose which classes to
include alongside lowercase letters: uppercase (**A-Z**), digits (**0-9**), and
symbols (**!#$**). every chosen class is guaranteed to appear, and the symbols
are limited to `!#$%&*+-=?@^_~` so a password pastes safely into shells and
URLs. a readout shows the password's strength in bits and flags settings weak
enough to be worth attacking offline.

## breach check

**settings → passwords → "check for breaches"** looks your saved passwords up in
Have I Been Pwned's public breach data without revealing them. each password is
hashed on your device, and only the first five characters of that hash are
sent (k-anonymity): the service answers with every hash sharing that prefix,
and wis finishes the comparison locally, so neither the password nor its full
hash leaves the machine.

- the requests follow the active workspace's network route, so a workspace on
  Tor asks over Tor.
- Touch ID (or Windows Hello) is asked first, even when the vault is already
  unlocked.
- it runs only when you click **check**, never on a timer. passwords that turn
  up are marked **breached** in the list, so you know which to change first.

## import and export

move passwords in and out as CSV in **settings → passwords**.

- **import** reads Chrome, Firefox, and Safari CSV exports. an existing entry
  for the same site and username is updated rather than duplicated.
- **export** saves every password as a plain, unencrypted CSV file. wis warns
  you first, since anyone who opens the file can read every saved password;
  import it into its destination directly and delete it once you are done.

both directions ask for Touch ID (or Windows Hello) every time, even when the
vault is already unlocked.

## managing saved logins

manage everything in **settings → passwords**: unlock the vault, search saved
logins, show or copy a password, add one by hand, remove ones you no longer
need, and lock the vault again when you are done.
