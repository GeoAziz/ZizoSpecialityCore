"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { PersonStanding, Stethoscope, Shield, LogIn, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

type Role = 'patient' | 'doctor' | 'admin';

const roleConfig = {
    patient: { icon: PersonStanding, name: "Patient" },
    doctor: { icon: Stethoscope, name: "Doctor" },
    admin: { icon: Shield, name: "Admin" },
}

export function AuthForm() {
  const [role, setRole] = useState<Role>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: role,
        uid: user.uid,
        createdAt: new Date(),
      });
      
      toast({ title: "Account created successfully!", description: "Redirecting to your dashboard..." });
      
      redirectToDashboard(role);
    } catch (error: any) {
      toast({ variant: 'destructive', title: "Sign up failed", description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === role) {
          toast({ title: "Signed in successfully!", description: "Redirecting to your dashboard..." });
          redirectToDashboard(userData.role);
        } else {
          await auth.signOut();
          toast({ variant: 'destructive', title: "Role mismatch", description: `You are trying to log in as a ${roleConfig[role].name}, but your account is registered as a ${roleConfig[userData.role as Role].name}.` });
        }
      } else {
        await auth.signOut();
        toast({ variant: 'destructive', title: "Sign in failed", description: "User data not found. Please contact support." });
      }
    } catch (error: any) {
      toast({ variant: 'destructive', title: "Sign in failed", description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const redirectToDashboard = (userRole: Role) => {
    switch (userRole) {
      case 'patient':
        router.push('/dashboard');
        break;
      case 'doctor':
        router.push('/doctor-dashboard');
        break;
      case 'admin':
        router.push('/admin');
        break;
      default:
        router.push('/');
    }
  };
  
  const handlePasswordReset = async () => {
    if (!email) {
      toast({ variant: 'destructive', title: 'Email required', description: 'Please enter your email address to reset your password.' });
      return;
    }
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast({ title: 'Password reset email sent', description: 'Please check your inbox.' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline">Zizo Specialty Core</CardTitle>
        <CardDescription>Select your role to sign in or create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 mb-6">
            {(['patient', 'doctor', 'admin'] as Role[]).map((r) => {
                const Icon = roleConfig[r].icon;
                return (
                    <Button 
                        key={r} 
                        variant="outline" 
                        onClick={() => setRole(r)}
                        className={cn("flex flex-col h-20 gap-1", role === r && 'bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground')}
                    >
                        <Icon className="w-6 h-6"/>
                        <span className="text-xs font-semibold">{roleConfig[r].name}</span>
                    </Button>
                )
            })}
        </div>
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin"><LogIn className="w-4 h-4 mr-2"/>Sign In</TabsTrigger>
            <TabsTrigger value="signup"><UserPlus className="w-4 h-4 mr-2"/>Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email-in">Email</Label>
                <Input id="email-in" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-in">Password</Label>
                <Input id="password-in" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} />
              </div>
              <Button onClick={handleSignIn} className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing In...' : `Sign In as ${roleConfig[role].name}`}
              </Button>
               <Button variant="link" size="sm" className="w-full" onClick={handlePasswordReset} disabled={isLoading}>
                  Forgot your password?
                </Button>
            </div>
          </TabsContent>
          <TabsContent value="signup">
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email-up">Email</Label>
                <Input id="email-up" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-up">Password</Label>
                <Input id="password-up" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} />
              </div>
              <Button onClick={handleSignUp} className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : `Sign Up as ${roleConfig[role].name}`}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
