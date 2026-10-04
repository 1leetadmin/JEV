# jev

TypeScript starter for TypeSafe AI's Jev decision model, called through Vercel AI Gateway
with the AI SDK's `experimental_evaluate` (see `src/jev.ts`).

- Use the **typesafe-ai** skill (plugin `typesafe@typesafe-ai`, enabled in
  `.claude/settings.json`) when designing or changing anything that calls Jev. Read the live
  docs at https://docs.typesafe.ai/llms.txt before writing an integration.
- The AI SDK names yes/no questions `boolean` and returns `probability`. TypeSafe's own API
  and docs call them `noul`. Use the AI SDK names in this repo.
- Auth: `AI_GATEWAY_API_KEY` from `.env` (git-ignored). Never commit keys.
- Check: `npm run typecheck`. Live example: `npm run triage` (needs a key).
