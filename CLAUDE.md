# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # Type-check and build
npm run test:unit    # Run tests with Vitest
npm run lint         # ESLint with auto-fix
npm run format       # Prettier formatting
```

Run a single test file:
```bash
npx vitest run src/path/to/file.spec.ts
```

## Architecture

**Twinballs** is a Vue 3 + TypeScript browser puzzle game where players move two balls simultaneously to reach winning pad positions.

### Routing & Views

Three routes defined in [src/router/index.ts](src/router/index.ts):
- `/` → `MainMenu.vue` — title screen
- `/game/levels` → `LevelsView.vue` — level selector
- `/game/levels/:id` → `GameView.vue` — gameplay

### State Management (Pinia Stores)

- **`useBoardStore`** ([src/stores/useBoardStore.ts](src/stores/useBoardStore.ts)) — core game engine: ball positions, movement, collision detection with blocks and pads, win condition check. This is the most complex store.
- **`useLevelStore`** ([src/stores/useLevelStore.ts](src/stores/useLevelStore.ts)) — tracks current level and progression.
- **`useTimerStore`** ([src/stores/useTimerStore.ts](src/stores/useTimerStore.ts)) — elapsed time per level.
- **`useGlobalLoadingStore`** ([src/stores/useGlobalLoadingStore.ts](src/stores/useGlobalLoadingStore.ts)) — loading indicator.

### Game Loop

1. `useKeyboard` composable ([src/composables/useKeyboard.ts](src/composables/useKeyboard.ts)) captures WASD/arrow key events and calls movement actions on `useBoardStore`.
2. Both balls always move in the same direction simultaneously.
3. Ball effects (`NONE`, `FAST`, `REVERSE`) modify movement behavior. `FAST` moves two cells; `REVERSE` inverts the direction for that ball.
4. Pads on the board can apply effects to balls when landed on. The `win` pad type is the goal.
5. Level is complete when both balls are on `win` pads.

### Level Data

Levels are defined in [src/levels/default.json](src/levels/default.json). Each level specifies:
- Initial ball positions (`twinBalls` array)
- `blocks` — obstacles on the grid
- `pads` — special tiles with effects (`normal`, `reverse`, `fast`, `win`)
- `winningPositions` — where each ball must land

Level loading and transformation is handled by [src/services/levelService.ts](src/services/levelService.ts) and [src/helpers/LevelHelper.ts](src/helpers/LevelHelper.ts).

### Board Grid

Constants and grid utilities live in [src/helpers/BoardHelper.ts](src/helpers/BoardHelper.ts). The board is a fixed-size grid; positions are `{ x, y }` objects typed in [src/types/Position.ts](src/types/Position.ts).

### Key Types

All game entity shapes are in [src/types/](src/types/): `TwinBall`, `Block`, `Pad`, `Position`, `BoardElement`, `Level`.

### Composables

Composables in [src/composables/](src/composables/) encapsulate level lifecycle actions:
- `useSetLevel` — loads a level into the board store
- `useRestartLevel` — resets current level state
- `useClearLevel` — tears down board state on exit

### Public Assets

Pad images: `/public/images/pads/` (`reverse.gif`, `fast.gif`, `win.gif`)  
Block images: `/public/images/` (`block_1.png`, `block_2.png`, `block_3.png`)

## Tech Stack

- **Vue 3** (Composition API + `<script setup>`)
- **TypeScript** with path alias `@/` → `src/`
- **Vite** for build, **Vitest** + **jsdom** for tests
- **Pinia** for state, **Vue Router** for navigation
- **Tailwind CSS** with custom `h-32/40/56` and `w-32/40/56` utilities
- Deployed on **Vercel** (`vercel.json` present)
