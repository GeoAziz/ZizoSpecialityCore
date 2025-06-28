import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquareQuote } from "lucide-react";

export default function ReferralsPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-start">
                 <div>
                    <CardTitle>Referrals</CardTitle>
                    <CardDescription>Manage your referrals and second opinions.</CardDescription>
                </div>
                <Button><MessageSquareQuote className="mr-2 h-4 w-4" /> Request Second Opinion</Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="p-4 border rounded-lg flex items-center justify-between">
                        <div>
                            <p className="font-bold">Referral to Neurologist</p>
                            <p className="text-sm text-muted-foreground">From Dr. Jane Smith (GP) to Dr. Alex Turner</p>
                            <p className="text-xs text-muted-foreground">Status: <span className="text-green-600 font-semibold">Completed</span></p>
                        </div>
                        <p className="text-sm text-muted-foreground">Date: 2024-09-01</p>
                    </div>
                     <div className="p-4 border rounded-lg flex items-center justify-between">
                        <div>
                            <p className="font-bold">Referral to Cardiologist</p>
                            <p className="text-sm text-muted-foreground">From Dr. Jane Smith (GP) to Dr. Evelyn Reed</p>
                            <p className="text-xs text-muted-foreground">Status: <span className="text-green-600 font-semibold">Completed</span></p>
                        </div>
                        <p className="text-sm text-muted-foreground">Date: 2024-08-15</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
