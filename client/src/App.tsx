// src/App.tsx
import { useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import NotFound from '@/pages/not-found';
import { AuthProvider } from './context/auth-context';
import ProtectedRoute from './components/protected-route';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Test from './pages/test';
import Results from './pages/results';
import Grades from './pages/grades';
import Profile from './pages/profile';
import About from './pages/about';
import Terms from './pages/terms';
import Privacy from './pages/privacy';
import Signup from './pages/signup';
import PrimaryLeague from './pages/primary-league';
import MiddleLeague from './pages/middle-league';
import SeniorLeague from './pages/senior-league';
import { supabase } from './lib/supabase';
import { Toaster } from '@/components/ui/toaster';

function AppRoutes() {
  const [, navigate] = useLocation();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/dashboard');
      }
      if (event === 'SIGNED_OUT') {
        navigate('/');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/terms" component={Terms} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/signup" component={Signup} />
          <Route path="/primary-league" component={PrimaryLeague} />
          <Route path="/middle-league" component={MiddleLeague} />
          <Route path="/senior-league" component={SeniorLeague} />
          <Route path="/dashboard">
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </Route>
          <Route path="/test">
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          </Route>
          <Route path="/results/:id">
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          </Route>
          <Route path="/grades">
            <ProtectedRoute>
              <Grades />
            </ProtectedRoute>
          </Route>
          <Route path="/profile">
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;