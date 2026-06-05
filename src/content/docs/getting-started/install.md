---
title: Install Mibo
description: Set up the Mibo frontend and backend services.
---

This guide covers the basic development setup for Mibo.

## Requirements

- Node.js with pnpm
- Go
- Git with submodule support

## Frontend

Install dependencies from the main Mibo repository:

```sh
pnpm install
```

Start the frontend development server:

```sh
pnpm dev
```

## Backend

Initialize the backend submodule:

```sh
git submodule update --init --recursive
```

Start the media server:

```sh
cd mibo-server
go run ./cmd/mibo-media-server
```

The frontend development server proxies API requests to the backend on
`http://127.0.0.1:8096`.
