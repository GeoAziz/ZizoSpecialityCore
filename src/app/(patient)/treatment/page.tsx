import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

export default function TreatmentPage() {
    const prescriptions = [
        { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", status: "Active" },
        { name: "Metformin", dosage: "500mg", frequency: "Twice daily", status: "Active" },
        { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily at night", status: "Completed" },
    ];
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-start">
                <div>
                    <CardTitle>Your Treatment Plan</CardTitle>
                    <CardDescription>List of prescriptions and doctor's notes.</CardDescription>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Download</Button>
                    <Button><Printer className="mr-2 h-4 w-4" /> Print</Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Medication</TableHead>
                            <TableHead>Dosage</TableHead>
                            <TableHead>Frequency</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {prescriptions.map((p) => (
                            <TableRow key={p.name}>
                                <TableCell className="font-medium">{p.name}</TableCell>
                                <TableCell>{p.dosage}</TableCell>
                                <TableCell>{p.frequency}</TableCell>
                                <TableCell>
                                    <Badge variant={p.status === 'Active' ? 'default' : 'secondary'} className={p.status === 'Active' ? 'bg-green-600 text-white' : ''}>{p.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Doctor's Notes</h3>
                    <div className="p-4 border rounded-lg bg-secondary/30">
                        <p className="text-muted-foreground">Patient responding well to treatment. Continue current dosage for Lisinopril and Metformin. Follow up in 3 months. Advised patient to monitor blood pressure at home.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
