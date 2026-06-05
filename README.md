# Mibo Docs

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

This repository contains the tutorial and reference documentation site for Mibo.
It is an Astro Starlight project intended to live independently from the main
application repository.

## Project Structure

Starlight reads Markdown and MDX content from `src/content/docs/`.

```
.
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   └── docs/
│   └── content.config.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Images can be added to `src/assets/` and embedded in Markdown with a relative
link. Static assets, like favicons, can be placed in `public/`.

## Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`                 | Starts local dev server at `localhost:4321`      |
| `pnpm build`               | Builds the production site to `./dist/`          |
| `pnpm preview`             | Previews the production build locally            |
| `pnpm astro ...`           | Runs Astro CLI commands                          |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |
