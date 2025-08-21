'use client';

import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

const INTERESTS = ['Cycling', 'Game', 'BBQ', 'Golf', 'Fitness', 'Craft Beer', 'Board Games', 'Sports'];

export default function Onboarding() {
  const [relationshipStatus, setRelationshipStatus] = useState<'partnered' | 'married' | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [customInterest, setCustomInterest] = useState('');

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const addCustomInterest = () => {
    if (customInterest.trim() && !selectedInterests.includes(customInterest.trim())) {
      setSelectedInterests(prev => [...prev, customInterest.trim()]);
      setCustomInterest('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">BROCONNECT</h1>
          <p className="text-gray-600">Meet men in relationships for hobbies and friendships</p>
        </div>

        {/* Relationship Status */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Relationship status</h2>
          <div className="space-y-3">
            <button
              onClick={() => setRelationshipStatus('partnered')}
              className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                relationshipStatus === 'partnered'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              Partnered
            </button>
            <button
              onClick={() => setRelationshipStatus('married')}
              className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                relationshipStatus === 'married'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              Married
            </button>
          </div>
        </div>

        {/* Interests */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Interests</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {INTERESTS.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedInterests.includes(interest)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
          
          {/* Custom Interest */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <PlusIcon className="h-4 w-4" />
              <span>Add custom</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                placeholder="Enter custom interest"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && addCustomInterest()}
              />
              <button
                onClick={addCustomInterest}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="San Diego"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Continue Button */}
        <button
          className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          disabled={!relationshipStatus || selectedInterests.length === 0 || !location}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
