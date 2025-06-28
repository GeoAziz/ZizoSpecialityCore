import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bell, UserCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DoctorDashboard() {
    const patients = [
        { id: "1", name: "John Doe", lastVisit: "2024-10-15", condition: "Hypertension", status: "Stable" },
        { id: "2", name: "Jane Smith", lastVisit: "2024-10-14", condition: "Diabetes", status: "Needs Review" },
        { id: "3", name: "Peter Jones", lastVisit: "2024-10-12", condition: "Post-Op Recovery", status: "Stable" },
        { id: "4", name: "Mary Johnson", lastVisit: "2024-10-11", condition: "Migraines", status: "New Results" },
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
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Assigned Patients</CardTitle>
                        <CardDescription>An overview of patients under your care.</CardDescription>
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
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Bell /> Notifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                            <UserCheck className="h-5 w-5 mt-1 text-primary" />
                            <p className="text-sm">New patient <span className="font-semibold">Emily White</span> has been assigned to you.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 mt-1 text-yellow-500" />
                            <p className="text-sm">Test results for <span className="font-semibold">Jane Smith</span> are ready for review.</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                     <CardHeader>
                        <CardTitle>Department Stats</CardTitle>
                        <CardDescription>Neurology Department</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex justify-between"><span className="text-muted-foreground">Total Patients</span><span className="font-bold">48</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Appointments this week</span><span className="font-bold">22</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Avg. Wait Time</span><span className="font-bold">15 min</span></div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
