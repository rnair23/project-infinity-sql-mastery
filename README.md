# Project Infinity SQL Mastery

A human-centric SQL mastery system based on the supplied PDF brief. The app turns the 24-week roadmap into a working learning dashboard with XP, levels, lesson completion, daily reviews, real in-browser SQLite practice, badges, and boss battles.

## Open The App

Run a local static server from this folder:

```powershell
cd D:\Development\project-infinity-sql-mastery
& "C:\Users\rohan\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173
```

No package install step is required.

## Project Shape

- `index.html` - app shell
- `styles.css` - responsive interface styling
- `src/main.js` - app coordinator and event wiring
- `src/data/curriculum.js` - 24-week roadmap and challenge content
- `src/data/constants.js` - game balance constants, level thresholds, and badge rules
- `src/state/` - persistence and derived progress selectors
- `src/state/storageAdapter.js` - local persistence wrapper for future backend swaps
- `src/utils/` - date, icon, and SQL-check helpers
- `src/services/sqlEngine.js` - SQLite WebAssembly runtime wrapper
- `src/services/badgeEngine.js` - pure badge calculation service
- `src/services/queryService.js` - SQL practice orchestration service
- `src/views/` - focused renderers for dashboard sections
- `src/data/featureGuides.js` - "What's New" guide content for user-facing additions
- `api/mentor.js` - optional secure AI Mentor backend for serverless deployment
- `docs/AI_MENTOR_SETUP.md` - setup notes for connecting OpenAI safely
- `vendor/sqljs/` - vendored SQL.js browser runtime
- `assets/data-thinking-map.svg` - visual learning model asset
- `reference/` - source PDF and extracted text brief

## Verification

```powershell
npm run verify:solutions
npm run verify:scaling
```

The scaling checklist foundation currently covers constants extraction, storage adapter wrapping, badge engine extraction, and service prep for query execution/event-based growth.

## New Feature Guide Rule

Whenever a user-facing feature is added, update `src/data/featureGuides.js` with a new guide `id`, clear release label, and arrowed steps that point to the new controls or output area. The app shows the latest guide once per user and keeps it available through the `What's New` button.

## Current Judgment Call

The PDF describes a learning product rather than a conventional course document. This version starts with the product surface a learner would use every day: select a week, complete visible wins, execute SQL against sample data, do retention reviews, and watch level progress change.

Future versions can add richer datasets, user accounts, spaced repetition scheduling, and instructor dashboards.

## AI Mentor

The app includes an AI Mentor panel and a serverless OpenAI endpoint scaffold. GitHub Pages cannot securely store API keys, so the mentor needs a backend deployment such as Vercel before live OpenAI responses work. See `docs/AI_MENTOR_SETUP.md`.
