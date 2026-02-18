'use server';
/**
 * @fileOverview A helpful AI assistant that explains our automation services.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']).describe('The role of the message sender.'),
  content: z.string().describe('The message content.'),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

const LeadQualifyingChatbotInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
  conversationHistory: z.array(ChatMessageSchema).optional().describe('Previous messages in the conversation.'),
});
export type LeadQualifyingChatbotInput = z.infer<typeof LeadQualifyingChatbotInputSchema>;

const LeadQualifyingChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user message.'),
  isQualified: z.boolean().describe('Whether the user is interested in a custom build.'),
  qualificationReason: z.string().optional().describe('Why we should or shouldn\'t work with them.'),
  nextStep: z.string().optional().describe('What the user should do next.'),
});
export type LeadQualifyingChatbotOutput = z.infer<typeof LeadQualifyingChatbotOutputSchema>;

const prompt = ai.definePrompt({
  name: 'leadQualifyingChatbotPrompt',
  input: {schema: LeadQualifyingChatbotInputSchema},
  output: {schema: LeadQualifyingChatbotOutputSchema},
  system: `You are a friendly, helpful assistant for AImatic, a small team that builds custom automation for businesses.

YOUR GOAL:
- Explain what we do in simple, non-tech terms.
- Find out if the person needs help saving time on repetitive tasks.
- See if they care about keeping their business data private.

WHAT WE DO:
- We build custom software "robots" that do boring tasks automatically.
- We help businesses save hours of manual work every week.
- IMPORTANT: You own the tools we build. There are no monthly "rent" fees for the software.
- IMPORTANT: Everything is private. Your company data stays inside your own business.

TONE:
- Be very friendly and helpful. 
- Avoid technical jargon (don't say "API", "n8n", "Data Sovereignty").
- Use simple analogies (e.g., "It's like having a 24/7 assistant that never makes mistakes").

QUALIFICATION:
- If they have repetitive tasks and care about privacy/ownership, they are a good fit.
- Suggest a "Free Review Call" as the next step for interested people.`,
  prompt: `{{#if conversationHistory}}
Recent chat:
{{#each conversationHistory}}
{{role}}: {{content}}
{{/each}}
{{/if}}

User asked: {{{message}}}

Please give a friendly response. If they seem interested in our help, suggest booking a free call.`,
});

const leadQualifyingChatbotFlow = ai.defineFlow(
  {
    name: 'leadQualifyingChatbotFlow',
    inputSchema: LeadQualifyingChatbotInputSchema,
    outputSchema: LeadQualifyingChatbotOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      if (!output) throw new Error('No output');
      return output;
    } catch (error) {
      return {
        response: "I'm sorry, I'm having a little trouble thinking right now. You can reach us at hello@aimatic.com for help!",
        isQualified: false,
      };
    }
  }
);

export async function leadQualifyingChatbot(input: LeadQualifyingChatbotInput): Promise<LeadQualifyingChatbotOutput> {
  return leadQualifyingChatbotFlow(input);
}
