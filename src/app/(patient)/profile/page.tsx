import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src="https://placehold.co/80x80.png" data-ai-hint="profile picture"/>
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Photo</Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" disabled />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="flex justify-end">
                    <Button>Save Changes</Button>
                </div>
            </CardContent>
        </Card>
        <Card>
             <CardHeader>
                <CardTitle>Health History</CardTitle>
                 <CardDescription>A brief overview of your health.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="text-sm">
                    <p className="font-semibold">Allergies</p>
                    <p className="text-muted-foreground">Pollen, Penicillin</p>
                </div>
                <div className="text-sm">
                    <p className="font-semibold">Chronic Conditions</p>
                    <p className="text-muted-foreground">Hypertension</p>
                </div>
                 <div className="text-sm">
                    <p className="font-semibold">Past Surgeries</p>
                    <p className="text-muted-foreground">Appendectomy (2015)</p>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}
