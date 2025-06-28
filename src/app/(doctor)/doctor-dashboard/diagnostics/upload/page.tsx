import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";


export default function DoctorUploadDiagnosticsPage() {
    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Upload Diagnostics</CardTitle>
                <CardDescription>Upload test results, scans, or other diagnostic files for a patient.</CardDescription>
            </CardHeader>
             <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="patient-id">Patient ID</Label>
                    <Input id="patient-id" placeholder="Enter patient ID" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="file-upload">File</Label>
                    <div className="flex items-center justify-center w-full">
                        <Label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-muted-foreground">PDF, PNG, JPG, DICOM (MAX. 25MB)</p>
                            </div>
                            <Input id="file-upload" type="file" className="hidden" />
                        </Label>
                    </div> 
                </div>
                <Button className="w-full">Upload and Attach to Patient Record</Button>
            </CardContent>
        </Card>
    );
}
