import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { User, Stethoscope, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function AdminDashboard() {

  const kpis = [
      { title: "Total Patients", value: "1,284", icon: User, description: "+20% from last month" },
      { title: "Active Specialists", value: "73", icon: Stethoscope, description: "+5 from last month" },
      { title: "Appointments Today", value: "92", icon: Calendar, description: "Peak hours: 10am - 1pm" },
  ];
  
  const departmentUsage = [
      { name: "Cardiology", value: 75 },
      { name: "Neurology", value: 60 },
      { name: "Oncology", value: 40 },
      { name: "Pediatrics", value: 85 },
  ]
  
  return (
      <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
              {kpis.map(kpi => (
                  <Card key={kpi.title}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                          <kpi.icon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                          <div className="text-2xl font-bold">{kpi.value}</div>
                          <p className="text-xs text-muted-foreground">{kpi.description}</p>
                      </CardContent>
                  </Card>
              ))}
          </div>

          <Card>
              <CardHeader>
                  <CardTitle>Specialist Usage</CardTitle>
                  <CardDescription>Breakdown of appointments by department for this month.</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4">
                    {departmentUsage.map((dept) => (
                        <div key={dept.name} className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-medium">{dept.name}</span>
                                <span className="text-muted-foreground">{dept.value}%</span>
                            </div>
                            <Progress value={dept.value} />
                        </div>
                    ))}
                  </div>
              </CardContent>
          </Card>
      </div>
  );
}
