'use client';

import Header from './Header';
import { HeartIcon, UsersIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Group {
  id: string;
  name: string;
  icon: 'heart' | 'users';
  memberCount?: number;
}

const MOCK_GROUPS: Group[] = [
  { id: '1', name: 'San Diego BBQ Dads', icon: 'heart' },
  { id: '2', name: 'Seattle Retro Gamers', icon: 'users' },
];

export default function Groups() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Groups</h2>
        
        <div className="space-y-4">
          {MOCK_GROUPS.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {group.icon === 'heart' ? (
                  <HeartIcon className="h-6 w-6 text-red-500" />
                ) : (
                  <UsersIcon className="h-6 w-6 text-blue-500" />
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">{group.name}</h3>
                  {group.memberCount && (
                    <p className="text-sm text-gray-600">{group.memberCount} members</p>
                  )}
                </div>
              </div>
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>

        {/* Create Group Button */}
        <button className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
          Create New Group
        </button>
      </div>
    </div>
  );
}
