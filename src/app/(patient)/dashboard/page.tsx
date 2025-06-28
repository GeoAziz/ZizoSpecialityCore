import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, FileText, Pill, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PatientDashboard() {
  const quickNav = [
    { title: "Appointments", description: "View & book appointments", href: "/appointments", icon: Calendar },
    { title: "Diagnostics", description: "Access your test results", href: "/diagnostics", icon: FileText },
    { title: "Treatment Plan", description: "Follow your prescriptions", href: "/treatment", icon: Pill },
    { title: "Referrals", description: "Manage specialist referrals", href: "/referrals", icon: Share2 },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="flex flex-row items-center gap-6">
          <Image src="https://placehold.co/100x100.png" alt="Doctor" width={100} height={100} className="rounded-full border-4 border-primary/50" data-ai-hint="doctor portrait" />
          <div>
            <CardTitle className="text-3xl font-headline text-primary">Welcome Back!</CardTitle>
            <CardDescription className="text-lg">
              Your assigned physician is Dr. Evelyn Reed. Check your latest updates and upcoming appointments.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
            <Button asChild>
                <Link href="/appointments">View Appointments <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {quickNav.map((item) => (
          <Card key={item.title} className="hover:shadow-lg hover:-translate-y-1 transition-transform duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <item.icon className="w-6 h-6 text-primary" />
                <span>{item.title}</span>
              </CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href={item.href}>Go to {item.title} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Appointment Status</CardTitle>
          <CardDescription>Your next appointment is approaching.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <div>
              <p className="font-bold text-lg">Neurology Consultation</p>
              <p className="text-muted-foreground">with Dr. Alex Turner</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg text-primary">Tomorrow, 10:30 AM</p>
              <p className="text-sm text-green-600 font-semibold">Confirmed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
