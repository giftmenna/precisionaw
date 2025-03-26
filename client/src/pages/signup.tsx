
import { useState } from 'react';
import { useLocation } from 'wouter';
import SignupForm from '../components/auth/signup-form';
import { useAuth } from '../context/auth-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const Signup = () => {
  const [, navigate] = useLocation();
  const { currentUser } = useAuth();
  const [emailSent, setEmailSent] = useState(false);
  
  // If user is already logged in, redirect to dashboard
  if (currentUser) {
    navigate('/dashboard');
    return null;
  }
  
  if (emailSent) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Check Your Email</CardTitle>
              <CardDescription>
                We've sent you a confirmation email. Please check your inbox and click the verification link to complete your registration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                If you don't see the email, please check your spam folder.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <SignupForm onEmailSent={() => setEmailSent(true)} />
      </div>
    </div>
  );
};

export default Signup;
