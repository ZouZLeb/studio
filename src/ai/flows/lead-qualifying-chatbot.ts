'use server';
/**
 * @fileOverview An AI chatbot that qualifies leads based on privacy needs and engineering scope.
 *
 * - leadQualifyingChatbot - A function that handles the chatbot interaction and lead qualification process.
 * - LeadQualifyingChatbotInput - The input type for the leadQualifyingChatbot function.
 * - LeadQualifyingChatbotOutput - The return type for the leadQualifyingChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Message type for conversation history
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
  isQualified: z.boolean().describe('Whether the user is qualified as a lead.'),
  qualificationReason: z.string().optional().describe('Explanation of why the user is or is not qualified.'),
  nextStep: z.string().optional().describe('The next step for the user, e.g., schedule an architecture review.'),
});
export type LeadQualifyingChatbotOutput = z.infer<typeof LeadQualifyingChatbotOutputSchema>;

const prompt = ai.definePrompt({
  name: 'leadQualifyingChatbotPrompt',
  input: {schema: LeadQualifyingChatbotInputSchema},
  output: {schema: LeadQualifyingChatbotOutputSchema},
  system: `You are an AI assistant for SecureAutomate, a specialized automation engineering firm.
Your goal is to qualify leads for custom automation builds using n8n and custom scripts.

IMPORTANT DIFFERENTIATORS:
- We are NOT a 'chatgpt prompt' agency. We build custom code and workflows.
- We focus on PRIVACY and DATA SOVEREIGNTY.
- We build systems that the client OWNS and CONTROL.

QUALIFICATION CRITERIA (High-Quality Leads):
✓ Privacy concerns (don't want to share data with third-party AI/LLMs)
✓ Data sovereignty requirements (GDPR, HIPAA, regulated industries)
✓ Technical complexity (legacy system integration, multi-app n8n workflows, custom APIs)
✓ Professional software engineering needs (not just templates or simple automations)
✓ Scale requirements (processing high volumes, business-critical operations)
✓ Budget alignment (understands custom engineering has appropriate costs)

DISQUALIFICATION INDICATORS:
✗ Looking for simple Zapier/Make alternatives at low cost
✗ Expecting $20 template solutions
✗ No privacy/security concerns
✗ Very basic automation needs
✗ DIY mindset without professional engineering budget

CONVERSATION APPROACH:
1. Be friendly, professional, and consultative
2. Ask about their industry and biggest manual bottlenecks
3. Probe for privacy, security, or data ownership concerns
4. Understand technical complexity and scale
5. Assess if they need professional engineering vs. simple tools

QUALIFICATION DECISIONS:
- Set isQualified to true for leads matching 3+ qualification criteria
- Provide a clear qualificationReason explaining your assessment
- For qualified leads: suggest an "Architecture Review" as nextStep
- For unqualified leads: politely redirect to self-service tools (Zapier, Make, n8n cloud)

TONE: Professional, helpful, and consultative. Never pushy. Educate about the difference between custom engineering and template solutions.`,
  prompt: `{{#if conversationHistory}}
Previous conversation:
{{#each conversationHistory}}
{{role}}: {{content}}
{{/each}}
{{/if}}

User: {{message}}

Based on the conversation, provide a response that helps qualify this lead. Remember to assess:
- Privacy and data sovereignty needs
- Technical complexity
- Professional engineering requirements
- Budget alignment

Provide your assessment in the structured output format.`,
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
      
      if (!output) {
        throw new Error('No output received from the AI model');
      }
      
      // Validate output has required fields
      if (!output.response) {
        throw new Error('Response field is missing from AI output');
      }
      
      if (typeof output.isQualified !== 'boolean') {
        throw new Error('isQualified field is missing or invalid');
      }
      
      return output;
    } catch (error) {
      console.error('Error in leadQualifyingChatbotFlow:', error);
      
      // Return a fallback response
      return {
        response: "I apologize, but I'm having trouble processing your message right now. Please try again or contact us directly at contact@secureautomate.com for assistance.",
        isQualified: false,
        qualificationReason: 'Error occurred during qualification process',
      };
    }
  }
);

export async function leadQualifyingChatbot(input: LeadQualifyingChatbotInput): Promise<LeadQualifyingChatbotOutput> {
  return leadQualifyingChatbotFlow(input);
}