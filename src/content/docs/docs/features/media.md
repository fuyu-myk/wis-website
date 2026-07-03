---
title: media
description: float a playing video as an always-on-top mini player, and see and mute audio per tab.
sidebar:
  order: 9
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
- a hover-revealed **volume cluster** mutes, sets the level, and stays in lockstep
  with the site's own player both ways.
- **drag** anywhere to move it; drag a corner to resize, locked to the video's
  aspect ratio.
- an **X** top-right pauses and dismisses it (it pauses first, so audio never
  plays invisibly).

popout works two ways:

- **automatic**: when you leave a tab whose video is actually playing, it floats.
  controlled by **settings → layout** (on by default). muted autoplay ads do not
  trigger it.
- **manual**: a small pop-out button on the video under your cursor, or the
  **pop out video** action (Cmd+Shift+O, rebindable). manual popouts work for
  paused videos too and leave the tab's pane in place with a black placeholder
  you can click to fold the video back.

one video pops out at a time. the popped tab is exempt from sleeping. note that
only main-frame videos pop out; a video embedded in a cross-origin iframe does
not.

## tab audio and mute

any tab that is audibly playing shows a **speaker** beside its favicon, in both
the sidebar and the top-tabs strip, using the same signal Safari's tab icon
does, so iframe players and Web Audio count too.

click the speaker to **mute** the tab without activating it. a muted tab shows a
slashed speaker whether or not it is currently making sound, so you can always
unmute it. muting is engine-level, so a page cannot un-mute itself. widget panels
get the same mute as a header-bar toggle.

audibly-playing tabs never sleep while they are making sound, so wis never cuts
your audio out from under you; they sleep normally once silent or muted.
