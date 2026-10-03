import {
  experimental_evaluate as evaluate,
  type Experimental_EvaluationQuestion as EvaluationQuestion,
  type Experimental_EvaluationResult as EvaluationResult,
} from 'ai';

/** Jev on Vercel AI Gateway. Auth comes from AI_GATEWAY_API_KEY. */
export const JEV_MODEL = 'typesafe-ai/jev';

/** Jev limits: 32k tokens for state + longest question, 64k per request. */
export type State = Parameters<typeof evaluate>[0]['state'];

/**
 * Ask Jev one or more typed questions about a shared state.
 * Batch related questions into a single call: it is cheaper and faster
 * than one call per question.
 */
export function askJev<const Q extends Record<string, EvaluationQuestion>>(
  state: State,
  questions: Q,
  options: { abortSignal?: AbortSignal } = {},
): Promise<EvaluationResult<Q>> {
  return evaluate({ model: JEV_MODEL, state, questions, ...options });
}

export type { EvaluationQuestion, EvaluationResult };
