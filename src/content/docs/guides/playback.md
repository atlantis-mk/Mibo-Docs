---
title: Playback
description: Understand playback, quality selection, and transcoding.
---

Mibo playback connects library items to playable media sources.

## Direct playback

When a client can play the source file directly, Mibo should prefer direct
playback to preserve quality and reduce server work.

## Transcoding

Use transcoding when the client needs a different container, codec, bitrate, or
resolution. Quality selection should stay explicit so playback behavior is
predictable.

## Live sources

Live TV and other streaming sources should expose stable source metadata so
clients can present clear playback choices.
