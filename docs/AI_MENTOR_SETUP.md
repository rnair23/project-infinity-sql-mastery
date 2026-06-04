# AI Mentor Setup

The AI Mentor is built into the frontend, but OpenAI calls must happen through a secure backend. Do not put an OpenAI API key in browser JavaScript or GitHub Pages.

## Recommended Start

Use Vercel for the first secure deployment because this repo now includes `api/mentor.js`.

1. Import the GitHub repo into Vercel.
2. Add an environment variable named `OPENAI_API_KEY`.
3. Optional: add `OPENAI_MODEL`. The default is `gpt-5-mini`.
4. Optional: add `ALLOWED_ORIGIN` with your GitHub Pages URL.
5. Deploy.

If Vercel hosts both the frontend and backend, the app can call:

```text
/api/mentor
```

If you keep GitHub Pages as the frontend and deploy only the backend elsewhere, set the frontend mentor endpoint in browser local storage:

```js
localStorage.setItem("projectInfinityAiEndpoint", "https://your-backend.example.com/api/mentor");
```

## Mentor Behavior

The prompt is designed to:

- help the learner start without giving away everything
- explain SQLite errors in simple language
- translate SQL results into business decisions
- recommend the next learning action
- use only the current week schema and challenge context

## Files

- `api/mentor.js` - secure OpenAI Responses API bridge
- `src/services/mentorClient.js` - frontend API client
- `src/views/mentorView.js` - mentor panel rendering helpers
- `src/data/featureGuides.js` - in-app guide for the feature
