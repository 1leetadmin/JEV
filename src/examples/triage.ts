import { askJev } from '../jev.js';

if (!process.env.AI_GATEWAY_API_KEY) {
  console.error('Missing AI_GATEWAY_API_KEY. Copy .env.example to .env and add your key.');
  process.exit(1);
}

const ticket =
  process.argv.slice(2).join(' ') ||
  "Hi, I've been trying to connect my Stripe account for 3 days and the integration keeps failing. I'm losing sales. Please help ASAP.";

const { answers, usage } = await askJev(ticket, {
  department: {
    type: 'choice',
    instructions: 'Which team should handle this',
    criteria: {
      billing: 'Payment or subscription issues',
      technical: 'Bugs or integration problems',
      sales: 'Pricing or account questions',
    },
  },
  frustration: {
    type: 'score',
    instructions: 'How frustrated the customer appears',
    criteria: ['Calm, just stating facts', 'Frustrated but civil', 'Very angry, strong language'],
  },
  urgent: {
    type: 'boolean',
    instructions: 'The message conveys urgency or time-sensitivity',
  },
});

// Code stays in control: Jev answers narrow questions, your logic decides.
const priority = answers.urgent.probability >= 0.7 || answers.frustration.score >= 1.5 ? 'high' : 'normal';

console.log({
  department: answers.department.choice,
  departmentProbabilities: answers.department.probabilities,
  frustration: answers.frustration.score,
  urgentProbability: answers.urgent.probability,
  priority,
  usage,
});
