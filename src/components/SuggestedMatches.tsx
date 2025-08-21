'use client';

import { useState } from 'react';
import Header from './Header';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Bike } from 'lucide-react';

interface Match {
  id: string;
  name: string;
  ageRange: string;
  interests: string[];
  hasWaved: boolean;
}

const MOCK_MATCHES: Match[] = [
  { id: '1', name: 'John', ageRange: '30-35', interests: ['Cycling', 'BBQ'], hasWaved: false },
  { id: '2', name: 'Mike', ageRange: '25-30', interests: ['Golf', 'Craft Beer'], hasWaved: false },
  { id: '3', name: 'Mark', ageRange: '30-35', interests: ['Fitness', 'Sports'], hasWaved: false },
];

export default function SuggestedMatches() {
  const [matches, setMatches] = useState<Match[]>(MOCK_MATCHES);

  const handleWave = (matchId: string) => {
    setMatches(prev => 
      prev.map(match => 
        match.id === matchId 
          ? { ...match, hasWaved: !match.hasWaved }
          : match
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Suggested Matches</h2>
        
        {/* Matches List */}
        <div className="space-y-4 mb-6">
          {matches.map((match) => (
            <div key={match.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserCircleIcon className="h-12 w-12 text-gray-400" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{match.name}</h3>
                    <p className="text-sm text-gray-600">{match.ageRange}</p>
                    <p className="text-xs text-gray-500">{match.interests.join(', ')}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleWave(match.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    match.hasWaved
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {match.hasWaved ? 'Waved!' : 'Wave'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Activity Suggestion */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Bike className="h-6 w-6 text-blue-600" />
            <div>
              <p className="text-sm text-blue-800">
                Both of you like cycling — Saturday group ride nearby
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
