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

## Model & token use

- Default model for this project: **Sonnet (`sonnet`)**, set in `.claude/settings.json`; small TypeScript starter. Helper agents (subagents) run on Haiku.
- At the start of a session, and whenever the task changes, check whether the model you are running fits the job. If it doesn't, tell Peter in one line which model to switch to and that he can type `/model <name>` (you cannot switch it yourself). Guide:
  - `haiku`: file searches, bulk data/CSV work, simple renames.
  - `sonnet`: routine edits, docs, copy, small UI tweaks, prompt writing.
  - `opus`: debugging, architecture, hardware/printer/serial/EFTPOS, firmware, security, anything that has failed once already.
  - `fable`: never by default. Peter is on the Pro plan, where Fable is billed as extra usage credits, not plan limits. Suggest it only after Opus has failed twice on the same problem, and say it costs extra.
- Keep context small: open the specific files a task needs rather than sweeping the repo.
