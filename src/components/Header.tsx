'use client';

import { UserCircleIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  showProfile?: boolean;
}

export default function Header({ showProfile = true }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex-1"></div>
        
        <h1 className="text-xl font-bold text-gray-900">BROCONNECT</h1>
        
        {showProfile && (
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <UserCircleIcon className="h-6 w-6 text-gray-600" />
          </button>
        )}
      </div>
    </header>
  );
}
