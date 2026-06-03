# Project Infinity SQL Mastery

A human-centric SQL mastery system based on the supplied PDF brief. The first implementation is a static web app that turns the 24-week roadmap into a working learning dashboard with XP, levels, lesson completion, daily reviews, SQL practice, badges, and boss battles.

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
- `src/state/` - persistence and derived progress selectors
- `src/utils/` - date, icon, and SQL-check helpers
- `src/views/` - focused renderers for dashboard sections
- `assets/data-thinking-map.svg` - visual learning model asset
- `reference/` - source PDF and extracted text brief

## Current Judgment Call

The PDF describes a learning product rather than a conventional course document. This version starts with the product surface a learner would use every day: select a week, complete visible wins, attempt SQL, do retention reviews, and watch level progress change.

Future versions can add a real SQL execution engine, user accounts, richer analytics, spaced repetition scheduling, and instructor dashboards.
