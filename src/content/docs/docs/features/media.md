---
title: media
description: float a playing video as an always-on-top mini player with a seek bar, see and mute audio per tab, and control what may autoplay.
sidebar:
  order: 13
---

## video popout

switch away from a tab that is playing a video and wis floats that video as an
always-on-top mini player in its own window, free to leave the main browser
window and visible on every macOS Space. it is the same video, not a copy: wis
moves the tab's own webview into the floating window and back, so even streams
that cannot be re-opened elsewhere keep playing.

the mini player has its own controls:

- click to **play or pause**; double-click the left or right third to **seek
  -/+10 seconds**.
- a hover-revealed **seek bar** along the bottom tracks playback; drag it to
  jump anywhere in the video. it hides for live streams, which have no end to
  seek to.
- a hover-revealed **volume cluster** mutes, sets the level, and stays in lockstep
  with the site's own player both ways.
- **drag** anywhere to move it; drag a corner to resize, locked to the video's
  aspect ratio. the next popout opens where you last left it.
- an **X** top-right pauses and dismisses it (it pauses first, so audio never
  plays invisibly).

the mini player opens without stealing focus from your window, yet answers your
very first click, and its controls reveal on hover even while another window is
focused. while the pointer is over it, the page behind it ignores the cursor, so
nothing underneath lights up or reacts.

popout works two ways:

- **automatic**: when you leave a tab whose video is actually playing, it floats.
  controlled by **settings → layout → video popout** (on by default). muted
  autoplay ads do not trigger it.
- **manual**: a small pop-out button on the video under your cursor, or the
  **pop out video** action (Cmd+Shift+O, rebindable). manual popouts work for
  paused videos too and leave the tab's pane in place with a black placeholder
  you can click to fold the video back.

one video pops out at a time. the popped tab is exempt from sleeping, and
closing that tab stops its video along with the mini player. note that only
main-frame videos pop out; a video embedded in a cross-origin iframe does not.

:::note
the mini player described above is how popout works on macOS. on Windows,
popout opens the engine's native Picture-in-Picture window instead, with its own
controls. Linux does not support video popout yet; asking for one shows a toast
saying so.
:::

## tab audio and mute

any tab that is audibly playing shows a **speaker** beside its favicon, in both
the sidebar and the top-tabs strip. the signal comes from the engine itself, so
iframe players and Web Audio count too.

click the speaker to **mute** the tab without activating it. a muted tab shows a
slashed speaker whether or not it is currently making sound, so you can always
unmute it. muting is engine-level, so a page cannot un-mute itself, and it holds
for the rest of the session, even if the tab sleeps and wakes. widget panels get
the same mute as a header-bar toggle. the indicator and mute work on macOS,
Windows, and Linux.

audibly-playing tabs never sleep while they are making sound, so wis never cuts
your audio out from under you; they sleep normally once silent or muted.

## autoplay

**settings → privacy → autoplay** decides what media may start on its own,
without you clicking or pressing a key:

- **allow**: media plays on its own, sound included.
- **block sound** (the default): muted video may start, but sound waits until
  you interact with the page.
- **block all**: nothing starts until you interact.

below it, **per-site autoplay** gives individual sites their own rule: type a
site, pick allow, block sound, or block all, and click **add**. a site's rule
wins over the global one, and **remove** drops it again.

how it applies depends on the platform:

- **macOS**: the rule takes effect on each page load, so a change reaches an open
  page the next time it loads.
- **Linux**: the engine has no separate rule for sound, so **block sound**
  behaves as **block all**.
- **Windows**: the engine keeps its own built-in autoplay rule, and the setting
  shows as unavailable there.
