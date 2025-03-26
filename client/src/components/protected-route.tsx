import { useLocation } from 'wouter';
import { useAuth } from '../context/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from './ui/spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (!currentUser) {
    setLocation('/?redirect=login');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
