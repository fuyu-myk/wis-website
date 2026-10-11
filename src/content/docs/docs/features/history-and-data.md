---
title: history and data
description: per-workspace history, recently closed tabs, the clear browsing data dialog, per-site data, and encrypted profile backups.
sidebar:
  order: 5
---

wis keeps your history and site data per workspace, remembers the tabs you
close, and gives you one dialog to clear any of it. a private window records
none of it. on Windows and Linux, read Cmd as Ctrl in the shortcuts below.

## history

**Cmd+Shift+H**, or the history button in the sidebar footer, opens the history
page.

- it shows **this workspace** by default. switch to **all workspaces** to see
  everything, with each entry labelled by its workspace.
- entries are grouped by day (today, yesterday, then dates) and **deduplicated**:
  revisiting a page moves its single entry to the top instead of adding another,
  and jumping to an anchor on a page counts as the same page.
- **search history** filters by title and address as you type.
- click an entry to open it in the history tab, or middle-click to open it in a
  background tab.
- the **x** on an entry removes it. **select** lets you pick several and
  **delete** them together, and **clear all** removes every entry in the current
  scope after a confirmation.

only web pages are recorded, and nothing from a private window ever is. your
history also feeds the
[address bar suggestions](/docs/features/address-bar-and-search/#suggestions-and-inline-completion)
and the [command palette](/docs/features/productivity/#command-palette).

## recently closed tabs

wis remembers the last 25 tabs you closed, and the list survives a restart.

- **Cmd+Shift+T** reopens the most recently closed tab.
- open the [command palette](/docs/features/productivity/#command-palette) and,
  before you type anything, it lists the last few closed tabs under **recently
  closed**. type to search the whole list.
- reopening a tab takes it off the list, so it never comes back twice.

on macOS, a tab closed earlier in the same session comes back with its full
state: back and forward history, scroll position, and form contents. a tab
closed before a restart, or on Windows and Linux, reopens at its address.

only web pages are remembered. a private window records no closed tabs and
cannot reopen one. clearing history clears the matching closed tabs too, with
the same workspace and time range, and removing a single history entry removes
its closed tab.

## clear browsing data

**Cmd+Shift+Backspace** opens the **clear browsing data** dialog. you can also
reach it from the command palette or from **settings → privacy → clear browsing
data**.

1. choose the scope: **this workspace** or **all workspaces**.
2. choose how far back to go: **1 hour**, **24 hours**, **7 days**, or **all
   time** (the default).
3. tick what to remove. each kind is separate:
   - **browsing history**, along with the matching recently closed tabs.
   - **cookies**, which signs you out of sites.
   - **cached files**, the pages and images kept for faster loading.
   - **site storage**: local storage, databases, and service workers.
4. click **clear**.

if part of the clear fails, the dialog stays open and says what was not cleared
and why, instead of closing as if everything worked.

:::note
on Linux, the dialog clears history only. cookies, cached files, and site
storage are shown as not available on Linux yet.
:::

## site data

**settings → site data** lists every site that has stored cookies, cache, or
local storage in the current workspace.

- **search sites** filters the list.
- the **x** beside a site removes all of that site's data, leaving every other
  site signed in.
- **clear all** removes data for every site in the workspace, after a
  confirmation.

per-site data works on macOS and Windows. on Linux the section says that
per-site data management is not available yet.

## backup and restore

**settings → backup & restore** moves your profile to another machine through a
single encrypted `.wisbackup` file. there is no server and no account: the file
is sealed with a passphrase you choose, using Argon2id and ChaCha20-Poly1305.

### exporting

pick what goes in the file:

- **settings, shortcuts & themes**: your layout, keyboard shortcuts, new tab
  setup, and custom themes. on by default.
- **workspaces, tabs & bookmarks**: your workspaces with their tabs, split
  layout, folders, and bookmarks.
- **browsing history**: the history of the workspaces above. it only travels
  with them.
- **saved passwords**: your saved logins. off unless you turn it on, and
  including them needs a biometric unlock (Touch ID on macOS, Windows Hello on
  Windows).

enter a **backup passphrase** and click **export backup…** to save the file.
private workspaces are never exported.

:::note
the passphrase cannot be recovered. without it, the backup cannot be opened.
:::

### restoring

enter the **restore passphrase** the file was made with and click **restore
backup…**. a wrong passphrase, or a file that has been altered, is refused
before anything is applied.

restoring **merges** the backup into what you already have rather than
replacing it:

- settings in the backup are applied over your current ones.
- imported workspaces arrive as new workspaces alongside yours. a workspace
  with the same name as one you already have is skipped, so restoring the same
  file twice adds no duplicates.
- a custom theme is added only if you do not already have the same one.
- saved passwords are re-encrypted for the new device and matched by site and
  username. restoring them asks for the same biometric unlock, and declining it
  cancels the whole restore before anything is written.

when it finishes, wis tells you what was restored.
