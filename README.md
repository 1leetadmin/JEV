# jev

TypeScript starter for **Jev**, TypeSafe AI's System One decision model, called through
[Vercel AI Gateway](https://vercel.com/ai-gateway/models/jev) with the AI SDK.

Jev doesn't generate text. You send a **state** plus typed **questions**, and it returns
structured answers your code can act on:

| Question type | Returns | Use for |
| --- | --- | --- |
| `choice` | `choice` + `probabilities` per option | classification, routing |
| `score` | fractional `score` over ordered levels (0-based) + `probabilities` | rubrics, severity |
| `boolean` | `probability` that the answer is yes | checks, guardrails |

Limits: 64k tokens per request, 32k for state + longest question. No streaming.
Pricing: about $0.04 per 1M input tokens, output is free.

## Setup

Requires Node 22.9+.

```bash
npm install
cp .env.example .env   # then paste your AI Gateway API key
npm run triage
npm run triage -- "Where can I download last month's invoice?"
```

Get a key in the Vercel dashboard under **AI Gateway → API Keys**. The key is read from
`AI_GATEWAY_API_KEY`. Never commit `.env`.

## Usage

```ts
import { askJev } from './src/jev.js';

const { answers } = await askJev('The support agent issued a full refund.', {
  refunded: { type: 'boolean', instructions: 'Was a refund issued?' },
});

if (answers.refunded.probability > 0.8) {
  // your code decides what happens next
}
```

Batch related questions into one call. It's cheaper and faster than one call per question.

## Files

- `src/jev.ts`: thin typed wrapper around the AI SDK's `experimental_evaluate`
- `src/examples/triage.ts`: support-ticket triage example (choice + score + boolean)

## Notes

- `experimental_evaluate` is experimental in the AI SDK, so its API may change between releases.
- The AI SDK names yes/no questions `boolean`. TypeSafe's own API and docs call them `noul`.
- Docs: <https://docs.typesafe.ai>. For coding agents, TypeSafe publishes a skill:
  `claude plugin marketplace add typesafe-ai/skills && claude plugin install typesafe@typesafe-ai`.
