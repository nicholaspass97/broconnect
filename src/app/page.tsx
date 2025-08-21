'use client';

import { useState } from 'react';
import Landing from '@/components/Landing';
import SignUp from '@/components/SignUp';
import SignIn from '@/components/SignIn';
import Onboarding from '@/components/Onboarding';
import SuggestedMatches from '@/components/SuggestedMatches';
import ProfileView from '@/components/ProfileView';
import Groups from '@/components/Groups';
import Navigation from '@/components/Navigation';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    if (page === 'signup' || page === 'signin') {
      setIsAuthenticated(false);
    } else if (page === 'matches' || page === 'groups' || page === 'profile') {
      setIsAuthenticated(true);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onNavigate={handleNavigate} />;
      case 'signup':
        return <SignUp onNavigate={handleNavigate} />;
      case 'signin':
        return <SignIn onNavigate={handleNavigate} />;
      case 'onboarding':
        return <Onboarding />;
      case 'matches':
        return <SuggestedMatches />;
      case 'profile':
        return <ProfileView />;
      case 'groups':
        return <Groups />;
      default:
        return <Landing onNavigate={handleNavigate} />;
    }
  };

  // Show navigation only for authenticated users on app pages
  const showNavigation = isAuthenticated && ['matches', 'profile', 'groups'].includes(currentPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
      {showNavigation && (
        <Navigation currentPage={currentPage} onPageChange={handleNavigate} />
      )}
    </div>
  );
}
