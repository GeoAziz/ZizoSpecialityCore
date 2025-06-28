"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, Calendar, FilePlus, LogOut, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().role === 'doctor') {
          setUser({ ...user, ...userDoc.data() });
        } else {
          if(auth.currentUser) await auth.signOut();
          router.push('/auth');
        }
      } else {
        router.push('/auth');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/auth');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!user) {
    return null;
  }

  const menuItems = [
    { href: "/doctor-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/doctor-dashboard/patients", label: "Patients", icon: Users },
    { href: "/doctor-dashboard/appointments", label: "Appointments", icon: Calendar },
    { href: "/doctor-dashboard/diagnostics/upload", label: "Upload Diagnostics", icon: FilePlus },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user.photoURL || `https://placehold.co/40x40.png`} data-ai-hint="doctor portrait" />
              <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="font-semibold text-sm">{user.displayName || `Dr. ${user.email.split('@')[0]}`}</span>
                <span className="text-xs text-muted-foreground">Doctor</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton isActive={pathname.startsWith(item.href) && (item.href === '/doctor-dashboard' ? pathname === item.href : true)} tooltip={item.label}>
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <div className="p-2 mt-auto">
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
            </Button>
        </div>
      </Sidebar>
      <SidebarInset>
        <header className="p-4 border-b flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-2xl font-headline font-semibold">{menuItems.find(i => pathname.startsWith(i.href))?.label || 'Dashboard'}</h1>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
