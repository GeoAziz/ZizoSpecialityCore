import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import Image from "next/image";

export default function DiagnosticsPage() {
    const results = [
        { name: "MRI Brain Scan", date: "2024-10-15", department: "Neurology", image: "https://placehold.co/400x300.png", dataAiHint: "MRI scan" },
        { name: "ECG Report", date: "2024-10-12", department: "Cardiology", image: "https://placehold.co/400x300.png", dataAiHint: "ECG graph" },
        { name: "Blood Test Results", date: "2024-10-10", department: "General", image: "https://placehold.co/400x300.png", dataAiHint: "lab test" },
    ];

    return (
        <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>Interactive MRI Viewer</CardTitle>
                    <CardDescription>An interactive view of your latest MRI scan.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-4 border rounded-lg bg-black flex items-center justify-center">
                        <Image src="https://placehold.co/800x600.png" width={800} height={600} alt="MRI Scan" className="rounded" data-ai-hint="MRI scan" />
                    </div>
                </CardContent>
             </Card>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.map((result) => (
                    <Card key={result.name}>
                        <CardHeader>
                            <CardTitle>{result.name}</CardTitle>
                            <CardDescription>{result.department} - {result.date}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Image src={result.image} width={400} height={300} alt={result.name} className="rounded-lg" data-ai-hint={result.dataAiHint} />
                            <div className="flex gap-2">
                                <Button variant="outline" className="w-full"><Eye className="mr-2 h-4 w-4" /> View</Button>
                                <Button className="w-full"><Download className="mr-2 h-4 w-4" /> Download</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
