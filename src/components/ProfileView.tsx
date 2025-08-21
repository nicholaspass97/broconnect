'use client';

import { useState } from 'react';
import Header from './Header';
import { UserCircleIcon, HeartIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function ProfileView() {
  const [profile] = useState({
    name: 'John Doe',
    ageRange: '30-35',
    interests: ['Cycling', 'BBQ', 'Craft Beer'],
    favoriteActivities: ['Weekend bike rides', 'Backyard grilling', 'Beer tasting'],
    hasPartner: true,
    relationshipStatus: 'Partnered',
    location: 'San Diego'
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Profile Info */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <div className="text-center mb-6">
            <UserCircleIcon className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
            <p className="text-gray-600">{profile.ageRange}</p>
          </div>

          {/* Interests */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Interests</h3>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <PencilIcon className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
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
          {profile.hasPartner && (
            <div className="flex items-center gap-2 mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
              <HeartIcon className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-800">{profile.relationshipStatus}</span>
            </div>
          )}

          {/* Favorite Activities */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Favorite Activities</h3>
            <div className="space-y-2">
              {profile.favoriteActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-700">{activity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
            <p className="text-gray-700">{profile.location}</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
