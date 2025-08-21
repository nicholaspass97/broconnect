'use client';

import { useState } from 'react';
import Landing from '@/components/Landing';
import SignUp from '@/components/SignUp';
import SignIn from '@/components/SignIn';
import Onboarding from '@/components/Onboarding';
import SuggestedMatches from '@/components/SuggestedMatches';
import ProfileView from '@/components/ProfileView';
import UserProfile from '@/components/UserProfile';
import Groups from '@/components/Groups';
import Chat from '@/components/Chat';
import PrivacySafety from '@/components/PrivacySafety';
import Navigation from '@/components/Navigation';

interface UserProfile {
  name: string;
  ageRange: string;
  interests: string[];
  relationshipStatus: string;
  location: string;
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    ageRange: '',
    interests: [],
    relationshipStatus: '',
    location: ''
  });

  const handleNavigate = (page: string, userId?: string) => {
    setCurrentPage(page);
    if (userId) {
      setSelectedUserId(userId);
    }
    
    if (page === 'signup' || page === 'signin') {
      setIsAuthenticated(false);
    } else if (page === 'matches' || page === 'groups' || page === 'profile' || page === 'chat' || page === 'privacy' || page === 'userProfile') {
      setIsAuthenticated(true);
    }
  };

  const handleSignUpComplete = (profileData: UserProfile) => {
    setUserProfile(profileData);
    setIsAuthenticated(true);
    setCurrentPage('onboarding');
  };

  const handleOnboardingComplete = () => {
    setCurrentPage('matches');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onNavigate={handleNavigate} />;
      case 'signup':
        return <SignUp onNavigate={handleNavigate} onComplete={handleSignUpComplete} />;
      case 'signin':
        return <SignIn onNavigate={handleNavigate} />;
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'matches':
        return <SuggestedMatches onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfileView />;
      case 'userProfile':
        return selectedUserId ? <UserProfile userId={selectedUserId} onNavigate={handleNavigate} /> : <SuggestedMatches onNavigate={handleNavigate} />;
      case 'groups':
        return <Groups />;
      case 'chat':
        return <Chat selectedUserId={selectedUserId || undefined} onNavigate={handleNavigate} />;
      case 'privacy':
        return <PrivacySafety />;
      default:
        return <Landing onNavigate={handleNavigate} />;
    }
  };

  // Show navigation only for authenticated users on app pages
  const showNavigation = isAuthenticated && ['matches', 'profile', 'groups', 'chat', 'privacy'].includes(currentPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
      {showNavigation && (
        <Navigation currentPage={currentPage} onPageChange={handleNavigate} />
      )}
    </div>
  );
}
