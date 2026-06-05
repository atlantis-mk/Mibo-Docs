---
title: Provider Plugins
description: Reference notes for Mibo provider plugin integrations.
---

Provider plugins let Mibo integrate with external metadata and storage systems
without pushing third-party concerns into core application logic.

## Metadata providers

Metadata providers resolve title, artwork, and enrichment data for discovered
media. Derived metadata should have one owner and should not be re-derived by
downstream stages once materialized.

## Storage providers

Storage providers expose media files or streams to the runtime through an
adapter boundary. Core playback logic should depend on the provider contract,
not on provider-specific SDKs.

## Failure handling

Provider calls should classify external dependency errors clearly and include
enough context to diagnose failed lookups or access attempts.
