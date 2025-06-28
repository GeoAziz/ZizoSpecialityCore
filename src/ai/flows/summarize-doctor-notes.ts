'use server';
/**
 * @fileOverview AI tool to summarize doctor's notes and extract key information.
 *
 * - summarizeDoctorNotes - A function that handles the summarization process.
 * - SummarizeDoctorNotesInput - The input type for the summarizeDoctorNotes function.
 * - SummarizeDoctorNotesOutput - The return type for the summarizeDoctorNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDoctorNotesInputSchema = z.object({
  notes: z
    .string()
    .describe('The doctor notes to be summarized.'),
});
export type SummarizeDoctorNotesInput = z.infer<typeof SummarizeDoctorNotesInputSchema>;

const SummarizeDoctorNotesOutputSchema = z.object({
  summary: z.string().describe('The summary of the doctor notes.'),
  keyInformation: z.string().describe('Key information extracted from the notes.'),
});
export type SummarizeDoctorNotesOutput = z.infer<typeof SummarizeDoctorNotesOutputSchema>;

export async function summarizeDoctorNotes(input: SummarizeDoctorNotesInput): Promise<SummarizeDoctorNotesOutput> {
  return summarizeDoctorNotesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDoctorNotesPrompt',
  input: {schema: SummarizeDoctorNotesInputSchema},
  output: {schema: SummarizeDoctorNotesOutputSchema},
  prompt: `You are an AI assistant helping doctors by summarizing their notes and extracting key information from them.

  Summarize the following doctor's notes, and extract the key information for easy reference.

  Doctor's Notes: {{{notes}}}

  Summary:
  Key Information: `,
});

const summarizeDoctorNotesFlow = ai.defineFlow(
  {
    name: 'summarizeDoctorNotesFlow',
    inputSchema: SummarizeDoctorNotesInputSchema,
    outputSchema: SummarizeDoctorNotesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
