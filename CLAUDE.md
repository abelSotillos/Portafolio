# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Abel Sotillos Cuenca (abelsotillos.com) built as a **Windows desktop-style UI** using Astro. The entire site simulates draggable/resizable windows, a taskbar, and a start menu. Content is primarily a professional CV/resume displayed in Spanish.

## Commands

- **Dev server:** `npm run dev` (Astro dev with hot reload)
- **Build:** `npm run build` (outputs static site to `dist/`)
- **Preview build:** `npm run preview`
- **Docker build:** `docker build -t astro .` (serves static files on port 80 via `npx serve dist`)

Local development uses `npm`. The CI pipeline (`.github/workflows/npm-publish-github-packages.yml`) runs on a **self-hosted runner** with Node 24 and `pnpm`, then builds a Docker image and deploys via an external script.

## Architecture

### Window System

The core UI pattern is a custom window manager built with vanilla JavaScript and Astro components:

1. **`DraggableWindow.astro`** — Generic window container with drag, resize, minimize, maximize, close. Accepts props: `id`, `title`, `lucideIcon`, `width`, `height`, `initialX`, `initialY`, `initialHidden`. Contains an `iconMap` that maps icon name strings to Lucide components.
2. **`Taskbar.astro`** — Fixed bottom bar. Listens for custom events from windows to manage window buttons, focus state, and clock display.
3. **`StartMenu.astro`** — App launcher grid with search filtering. Receives an `App[]` array.
4. **`taskbar.types.ts`** — Defines the `App` interface and `defaultApps` registry (maps app IDs to window components).

**Custom event flow:** Windows emit `win-register`, `win-focus`, `win-minimize`, `win-close` events. The Taskbar listens for these to sync its button state.

**To add a new window:**
1. Create a content component in `src/components/windows/`
2. Add a `DraggableWindow` wrapper in `src/pages/index.astro`
3. Register it in `defaultApps` in `taskbar.types.ts`
4. If using a new Lucide icon, import it and add it to the `iconMap` in `DraggableWindow.astro`

Note: `index.astro` does not use `Layout.astro` — it has its own full HTML document with the desktop background.

### Styling

- Scoped `<style>` blocks in each `.astro` file (no global CSS framework)
- Dark theme using consistent HSL values (e.g., `hsl(222 47% 14%)` for window backgrounds, `hsl(213 90% 45%)` for accent blue)
- Font: "Segoe UI", system-ui, sans-serif
- Animations via CSS keyframes for window open/close transitions

### Tech Stack

- **Astro 5.x** with TypeScript (strict mode)
- **Lucide icons** via `@lucide/astro`
- **No frontend framework** — vanilla JS `<script>` blocks for interactivity
- **Docker** deployment with Node.js LTS + `serve`
