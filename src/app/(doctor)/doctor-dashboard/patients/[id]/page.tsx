import { DoctorNotesSummary } from "@/components/doctor-notes-summary";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PatientRecordPage({ params }: { params: { id: string } }) {
    const patient = {
        id: params.id,
        name: "John Doe",
        age: 45,
        gender: "Male",
        email: "john.doe@example.com",
    };
    
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src="https://placehold.co/80x80.png" data-ai-hint="profile picture" />
                            <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-3xl font-headline">{patient.name}</CardTitle>
                            <CardDescription>{patient.age} years old, {patient.gender}. ID: {patient.id}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>
            <DoctorNotesSummary />
        </div>
    );
}
