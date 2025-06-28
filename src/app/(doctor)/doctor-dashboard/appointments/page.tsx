import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { CardContent } from "@/components/ui/card";

export default function DoctorAppointmentsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>My Appointments</CardTitle>
                <CardDescription>Your schedule for the week. This feature is under construction.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Calendar
                    mode="week"
                    className="p-0"
                />
            </CardContent>
        </Card>
    );
}
