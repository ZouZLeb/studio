'use server';
/**
 * @fileOverview An AI chatbot that qualifies leads based on industry and project size.
 *
 * - leadQualifyingChatbot - A function that handles the chatbot interaction and lead qualification process.
 * - LeadQualifyingChatbotInput - The input type for the leadQualifyingChatbot function.
 * - LeadQualifyingChatbotOutput - The return type for the leadQualifyingChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LeadQualifyingChatbotInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
});
export type LeadQualifyingChatbotInput = z.infer<typeof LeadQualifyingChatbotInputSchema>;

const LeadQualifyingChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user message.'),
  isQualified: z.boolean().describe('Whether the user is qualified as a lead.'),
  nextStep: z.string().optional().describe('The next step for the user, e.g., schedule a consultation.'),
});
export type LeadQualifyingChatbotOutput = z.infer<typeof LeadQualifyingChatbotOutputSchema>;

export async function leadQualifyingChatbot(input: LeadQualifyingChatbotInput): Promise<LeadQualifyingChatbotOutput> {
  return leadQualifyingChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'leadQualifyingChatbotPrompt',
  input: {schema: LeadQualifyingChatbotInputSchema},
  output: {schema: LeadQualifyingChatbotOutputSchema},
  prompt: `You are an AI chatbot designed to qualify leads for a software automation agency.
  Your primary goal is to determine if the user is a potential client based on their industry and project size.
  Engage the user in a conversation to gather the necessary information.
  Ask the user questions to determine their industry, the size of their company, and the scope of the automation project they are considering.

  Based on the user's input, determine if they are a qualified lead.
  A qualified lead is someone who:
  - Works in an industry that the agency serves (e.g., e-commerce, SaaS, healthcare).
  - Is considering an automation project of significant scope (e.g., multi-system integration, custom AI chatbot).

  If the user is a qualified lead, set isQualified to true and suggest they schedule a consultation.
  If the user is not a qualified lead, set isQualified to false and politely thank them for their time.

  Here's the user's message: {{{message}}}

  Generate a response for the user, set the isQualified field, and optionally suggest a next step.
  Format the output as a JSON object with the following fields:
  - response: The chatbot response to the user message.
  - isQualified: Whether the user is qualified as a lead (true or false).
  - nextStep: The next step for the user (optional).

  Example Output:
  {
    "response": "Thank you for providing that information. Based on your input, you are a qualified lead. Would you like to schedule a consultation to discuss your project further?",
    "isQualified": true,
    "nextStep": "Schedule a consultation at [link to scheduling page]"
  }

  {
    "response": "Thank you for your interest. At this time, we are unable to assist you.",
    "isQualified": false
  }
  `,
});

const leadQualifyingChatbotFlow = ai.defineFlow(
  {
    name: 'leadQualifyingChatbotFlow',
    inputSchema: LeadQualifyingChatbotInputSchema,
    outputSchema: LeadQualifyingChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
