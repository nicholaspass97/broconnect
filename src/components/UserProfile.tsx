'use client';

import { useState } from 'react';
import Header from './Header';
import { UserCircleIcon, HeartIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface UserProfileProps {
  userId: string;
  onNavigate: (page: string) => void;
}

const MOCK_USERS = {
  '1': {
    id: '1',
    name: 'John',
    ageRange: '30-35',
    interests: ['Cycling', 'BBQ'],
    favoriteActivities: ['Weekend bike rides', 'Backyard grilling'],
    hasPartner: true,
    location: 'San Diego',
    relationshipStatus: 'Partnered'
  },
  '2': {
    id: '2',
    name: 'Mike',
    ageRange: '25-30',
    interests: ['Golf', 'Craft Beer'],
    favoriteActivities: ['Weekend golf rounds', 'Beer tasting'],
    hasPartner: true,
    location: 'San Diego',
    relationshipStatus: 'Married'
  },
  '3': {
    id: '3',
    name: 'Mark',
    ageRange: '30-35',
    interests: ['Fitness', 'Sports'],
    favoriteActivities: ['Gym sessions', 'Basketball games'],
    hasPartner: true,
    location: 'San Diego',
    relationshipStatus: 'Partnered'
  }
};

export default function UserProfile({ userId, onNavigate }: UserProfileProps) {
  const [user] = useState(MOCK_USERS[userId as keyof typeof MOCK_USERS]);
  const [hasWaved, setHasWaved] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-md mx-auto px-4 py-6">
          <p className="text-center text-gray-600">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Profile Info */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <div className="text-center mb-6">
            <UserCircleIcon className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.ageRange}</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <MapPinIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">{user.location}</span>
            </div>
          </div>

          {/* Interests */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Partner Badge */}
          {user.hasPartner && (
            <div className="flex items-center gap-2 mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
              <HeartIcon className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-800">{user.relationshipStatus}</span>
            </div>
          )}

          {/* Favorite Activities */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Favorite Activities</h3>
            <div className="space-y-2">
              {user.favoriteActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-700">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave Button */}
        <button
          onClick={() => setHasWaved(!hasWaved)}
          className={`w-full py-4 rounded-lg font-semibold transition-colors ${
            hasWaved
              ? 'bg-green-500 text-white'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {hasWaved ? 'Waved!' : 'Wave'}
        </button>

        {/* Back Button */}
        <button
          onClick={() => onNavigate('matches')}
          className="w-full mt-3 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Back to Matches
        </button>
      </div>
    </div>
  );
}
