import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { User } from '../types';
import { signInWithEmail, signUpWithEmail, signInWithGoogle, signOut, getCurrentUser } from '../lib/auth';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string) => Promise<any>;
  loginWithGoogle: () => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for current session on mount
    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();

        if (data.session?.user) {
          const user = data.session.user;
          setCurrentUser({
            id: user.id,
            email: user.email || '',
            displayName: user.user_metadata?.name || null,
            photoURL: user.user_metadata?.avatar_url || null
          });
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const user = session.user;
        setCurrentUser({
          id: user.id,
          email: user.email || '',
          displayName: user.user_metadata?.name || null,
          photoURL: user.user_metadata?.avatar_url || null
        });
      } else {
        setCurrentUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    isLoading,
    login: signInWithEmail,
    signup: signUpWithEmail,
    loginWithGoogle: signInWithGoogle,
    logout: signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};