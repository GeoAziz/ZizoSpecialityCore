"use client";

import { useState } from "react";
import { summarizeDoctorNotes, SummarizeDoctorNotesOutput } from "@/ai/flows/summarize-doctor-notes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import { Separator } from "./ui/separator";

export function DoctorNotesSummary() {
    const [notes, setNotes] = useState("");
    const [summaryResult, setSummaryResult] = useState<SummarizeDoctorNotesOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSummarize = async () => {
        if (!notes.trim()) {
            toast({ variant: 'destructive', title: "Notes are empty", description: "Please enter some notes to summarize." });
            return;
        }

        setIsLoading(true);
        setSummaryResult(null);

        try {
            const result = await summarizeDoctorNotes({ notes });
            setSummaryResult(result);
            toast({ title: "Summary Generated!", description: "AI has summarized the notes." });
        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: "Summarization Failed", description: "An error occurred while generating the summary." });
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="grid lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Doctor's Notes</CardTitle>
                    <CardDescription>Enter the patient's consultation notes below. The AI will summarize it.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea 
                        placeholder="e.g., Patient presents with a persistent cough and mild fever..." 
                        rows={12}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                    <Button onClick={handleSummarize} disabled={isLoading} className="mt-4 w-full">
                        {isLoading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                        ) : (
                            <><Sparkles className="mr-2 h-4 w-4" /> Generate AI Summary</>
                        )}
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>AI Generated Summary</CardTitle>
                    <CardDescription>A concise summary and key points from the notes.</CardDescription>
                </CardHeader>
                <CardContent className="min-h-[300px]">
                    {isLoading ? (
                         <div className="flex items-center justify-center h-full text-muted-foreground text-center p-8">
                             <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                        </div>
                    ) : summaryResult ? (
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-primary mb-2">Summary</h3>
                                <p className="text-sm text-foreground whitespace-pre-wrap">{summaryResult.summary}</p>
                            </div>
                            <Separator />
                            <div>
                                <h3 className="font-semibold text-primary mb-2">Key Information</h3>
                                <p className="text-sm text-foreground whitespace-pre-wrap">{summaryResult.keyInformation}</p>
                            </div>
                        </div>
                    ) : (
                         <div className="flex items-center justify-center h-full text-muted-foreground text-center p-8 border-2 border-dashed rounded-lg">
                            <p>The summary will appear here once generated.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
