import { Link } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  navLinks: Array<{ title: string; path: string }>;
  isLoggedIn: boolean;
  onLogout: () => Promise<void>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onLoginClick,
  navLinks,
  isLoggedIn,
  onLogout
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="md:hidden pb-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="hover:text-muted-foreground transition-colors font-medium"
                onClick={onClose}
              >
                {link.title}
              </Link>
            ))}
            
            {isLoggedIn ? (
              <Button
                variant="ghost"
                onClick={async () => {
                  await onLogout();
                  onClose();
                }}
                className="hover:text-muted-foreground transition-colors font-medium text-left justify-start px-0"
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={onLoginClick}
                className="hover:text-muted-foreground transition-colors font-medium text-left justify-start px-0"
              >
                Login
              </Button>
            )}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
