import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AppointmentsPage() {
    return (
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Your Appointments</CardTitle>
                        <Button><PlusCircle className="w-4 h-4 mr-2" /> Book New Appointment</Button>
                    </CardHeader>
                    <CardContent>
                        <Calendar
                            mode="multiple"
                            className="p-0"
                        />
                    </CardContent>
                </Card>
            </div>
            <div>
                 <Card>
                    <CardHeader>
                        <CardTitle>Upcoming</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                           <div>
                              <p className="font-bold">Neurology Consultation</p>
                              <p className="text-sm text-muted-foreground">Dr. Alex Turner</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">Tomorrow</p>
                                <p className="text-xs text-muted-foreground">10:30 AM</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                           <div>
                              <p className="font-bold">Cardiology Check-up</p>
                              <p className="text-sm text-muted-foreground">Dr. Evelyn Reed</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">Oct 28, 2024</p>
                                <p className="text-xs text-muted-foreground">2:00 PM</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
