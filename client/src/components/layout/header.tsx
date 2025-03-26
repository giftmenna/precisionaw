import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { School } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import MobileMenu from './mobile-menu';
import LoginModal from '../auth/login-modal';
import { useAuth } from '../../context/auth-context';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { currentUser, logout } = useAuth();
  const [location] = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Primary School League', path: '/primary-league' },
    { title: 'Middle School League', path: '/middle-league' },
    { title: 'Senior School League', path: '/senior-league' },
    ...(currentUser ? [
      { title: 'Dashboard', path: '/dashboard' },
      { title: 'Practice Tests', path: '/test' },
      { title: 'Grades', path: '/grades' },
      { title: 'Profile', path: '/profile' },
    ] : [])
  ];

  return (
    <>
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
        <div className="flex items-center">
            <Link href="/" className="flex items-center">
            <img
            src="https://ekrgotbtktogzzoqrvxv.supabase.co/storage/v1/object/public/images/IMG_8702.JPG"
            alt="Precision Academic World Logo"
            className="h-16 w-auto border rounded-[10px] mr-2" // Increased height to 16 and border radius to 10px
            />
            </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link 
          key={link.path} 
          href={link.path} 
          className={`hover:text-muted-foreground transition-colors font-medium ${
            location === link.path ? 'text-accent-foreground underline' : ''
          }`}
            >
          {link.title}
            </Link>
          ))}
          
          {currentUser ? (
            <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="hover:text-muted-foreground transition-colors font-medium"
            >
          Logout
            </Button>
          ) : (
            <Button 
          variant="ghost" 
          onClick={() => setShowLoginModal(true)}
          className="hover:text-muted-foreground transition-colors font-medium"
            >
          Login
            </Button>
          )}
          
          <ThemeToggle />
        </nav>
        
        {/* Mobile menu button */}
        <div className="flex items-center md:hidden space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu"
          >
            <span className="material-icons">menu</span>
          </Button>
        </div>
          </div>
          
          {/* Mobile Navigation */}
          <MobileMenu 
        isOpen={showMobileMenu} 
        onClose={() => setShowMobileMenu(false)}
        onLoginClick={() => {
          setShowMobileMenu(false);
          setShowLoginModal(true);
        }}
        navLinks={navLinks}
        isLoggedIn={!!currentUser}
        onLogout={handleLogout}
          />
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default Header;
