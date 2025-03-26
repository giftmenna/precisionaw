
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import HeroSection from '../components/home/hero-section';
import PhotoGallery from '../components/home/photo-gallery';
import WordOfTheDay from '../components/home/word-of-the-day';
import Leaderboard from '../components/home/leaderboard';
import CTASection from '../components/home/cta-section';
import EducationalVideos from '../components/home/educational-videos';
import LoginModal from '../components/auth/login-modal';
import { useAuth } from '../context/auth-context';

const Home = () => {
  const [location, setLocation] = useLocation();
  const { currentUser } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1]);
    if (params.get('redirect') === 'login') {
      setShowLoginModal(true);
      window.history.replaceState({}, document.title, location.split('?')[0]);
    }
  }, [location]);

  useEffect(() => {
    if (currentUser && location === '/') {
      setLocation('/dashboard');
    }
  }, [currentUser, location, setLocation]);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <WordOfTheDay />
      <EducationalVideos />
      <PhotoGallery />
      <Leaderboard />
      <CTASection />
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
};

export default Home;
