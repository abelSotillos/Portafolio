# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Abel Sotillos Cuenca (abelsotillos.com) built as a **Windows desktop-style UI** using Astro. The entire site simulates draggable/resizable windows, a taskbar, and a start menu. Content is primarily a professional CV/resume displayed in Spanish.

## Commands

- **Dev server:** `npm run dev` (Astro dev with hot reload)
- **Build:** `npm run build` (outputs static site to `dist/`)
- **Preview build:** `npm run preview`
- **Docker build:** `docker build -t astro .` (serves static files on port 80 via `npx serve dist`)

The CI pipeline uses `pnpm` (`pnpm install && pnpm run build`), but local development uses `npm`.

## Architecture

### Window System

The core UI pattern is a custom window manager built with vanilla JavaScript and Astro components:

1. **`DraggableWindow.astro`** — Generic window container with drag, resize, minimize, maximize, close. Accepts props: `id`, `title`, `lucideIcon`, `width`, `height`, `initialX`, `initialY`, `initialHidden`.
2. **`Taskbar.astro`** — Fixed bottom bar. Listens for custom events from windows to manage window buttons, focus state, and clock display.
3. **`StartMenu.astro`** — App launcher grid with search filtering. Receives an `App[]` array.
4. **`taskbar.types.ts`** — Defines the `App` interface and `defaultApps` registry (maps app IDs to window components).

**Custom event flow:** Windows emit `win-register`, `win-focus`, `win-minimize`, `win-close` events. The Taskbar listens for these to sync its button state.

**To add a new window:** Create a content component in `src/components/windows/`, add a `DraggableWindow` wrapper in `src/pages/index.astro`, and register it in `defaultApps` in `taskbar.types.ts`.

### Window Content Components (`src/components/windows/`)

- **`Portafolio.astro`** — Main CV/resume with tabbed sections (Profile, Experience, Skills, Education)
- **`ExplorerWindow.astro`** — File explorer UI (static demo)
- **`NotesWindow.astro`** — Simple text editor with character counter

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
