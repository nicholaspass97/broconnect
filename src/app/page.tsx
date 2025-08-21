'use client';

import { useState } from 'react';
import Onboarding from '@/components/Onboarding';
import SuggestedMatches from '@/components/SuggestedMatches';
import ProfileView from '@/components/ProfileView';
import Groups from '@/components/Groups';
import Navigation from '@/components/Navigation';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('matches');

  const renderPage = () => {
    switch (currentPage) {
      case 'onboarding':
        return <Onboarding />;
      case 'matches':
        return <SuggestedMatches />;
      case 'profile':
        return <ProfileView />;
      case 'groups':
        return <Groups />;
      default:
        return <SuggestedMatches />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {renderPage()}
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}
