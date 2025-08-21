'use client';

import { useState } from 'react';
import { ShieldCheckIcon, UserCircleIcon, FlagIcon, NoSymbolIcon } from '@heroicons/react/24/outline';
import Header from './Header';

interface BlockedUser {
  id: string;
  name: string;
  reason: string;
  dateBlocked: Date;
}

export default function PrivacySafety() {
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([
    {
      id: '1',
      name: 'John Doe',
      reason: 'Inappropriate behavior',
      dateBlocked: new Date('2024-01-15')
    }
  ]);

  const [reports, setReports] = useState([
    {
      id: '1',
      type: 'Inappropriate content',
      status: 'Under review',
      date: new Date('2024-01-10')
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy & Safety</h2>
        
        {/* Safety Features */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheckIcon className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Safety Features</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Platonic Only:</strong> This app is designed for friendship only. 
                All users are in relationships and looking for platonic connections.
              </p>
            </div>
            
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Location Privacy:</strong> Your exact location is never shared. 
                Only general area (city) is shown to potential matches.
              </p>
            </div>
          </div>
        </div>

        {/* Blocked Users */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <NoSymbolIcon className="h-6 w-6 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900">Blocked Users</h3>
          </div>
          
          {blockedUsers.length === 0 ? (
            <p className="text-gray-500 text-sm">No blocked users</p>
          ) : (
            <div className="space-y-3">
              {blockedUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <UserCircleIcon className="h-8 w-8 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.reason}</p>
                    </div>
                  </div>
                  <button className="text-sm text-blue-500 hover:text-blue-600">
                    Unblock
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reports */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FlagIcon className="h-6 w-6 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Reports</h3>
          </div>
          
          {reports.length === 0 ? (
            <p className="text-gray-500 text-sm">No reports filed</p>
          ) : (
            <div className="space-y-3">
              {reports.map((report) => (
                <div key={report.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-gray-900">{report.type}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      report.status === 'Under review' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Filed on {report.date.toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Profile Visibility</p>
                <p className="text-sm text-gray-500">Who can see your profile</p>
              </div>
              <select className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-900">
                <option>Everyone</option>
                <option>Friends only</option>
                <option>Hidden</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Location Sharing</p>
                <p className="text-sm text-gray-500">Show your general area</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Online Status</p>
                <p className="text-sm text-gray-500">Show when you are active</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
