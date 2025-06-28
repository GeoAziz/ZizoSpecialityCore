import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function DoctorPatientsPage() {
    const patients = [
        { id: "1", name: "John Doe", lastVisit: "2024-10-15", condition: "Hypertension", status: "Stable" },
        { id: "2", name: "Jane Smith", lastVisit: "2024-10-14", condition: "Diabetes", status: "Needs Review" },
        { id: "3", name: "Peter Jones", lastVisit: "2024-10-12", condition: "Post-Op Recovery", status: "Stable" },
        { id: "4", name: "Mary Johnson", lastVisit: "2024-10-11", condition: "Migraines", status: "New Results" },
        { id: "5", name: "Emily White", lastVisit: "2024-10-10", condition: "Asthma", status: "Stable" },
    ];

    const getBadgeVariant = (status: string) => {
        switch (status) {
            case 'Stable':
                return 'secondary';
            case 'Needs Review':
                return 'destructive';
            case 'New Results':
                return 'default';
            default:
                return 'secondary';
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>My Patients</CardTitle>
                <CardDescription>A list of all patients assigned to you.</CardDescription>
            </CardHeader>
             <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Patient Name</TableHead>
                            <TableHead>Last Visit</TableHead>
                            <TableHead>Condition</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {patients.map((p) => (
                            <TableRow key={p.id}>
                                <TableCell className="font-medium">{p.name}</TableCell>
                                <TableCell>{p.lastVisit}</TableCell>
                                <TableCell>{p.condition}</TableCell>
                                <TableCell>
                                    <Badge variant={getBadgeVariant(p.status)}>{p.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={`/doctor-dashboard/patients/${p.id}`}>View Record</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
