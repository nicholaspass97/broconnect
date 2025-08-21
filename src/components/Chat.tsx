'use client';

import { useState } from 'react';
import { PaperAirplaneIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Header from './Header';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

interface ChatProps {
  matchName?: string;
}

export default function Chat({ matchName = 'Alex' }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'match',
      content: 'Hey! I saw we both like cycling. Want to join the Saturday group ride?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isOwn: false
    },
    {
      id: '2',
      senderId: 'user',
      content: 'That sounds great! What time does it start?',
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      isOwn: true
    },
    {
      id: '3',
      senderId: 'match',
      content: '8 AM at Balboa Park. Should be a good group!',
      timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
      isOwn: false
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: 'user',
        content: newMessage.trim(),
        timestamp: new Date(),
        isOwn: true
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showMenu={true} showProfile={false} />
      
      <div className="max-w-md mx-auto h-screen flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <UserCircleIcon className="h-10 w-10 text-gray-400" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{matchName}</h3>
            <p className="text-sm text-gray-500">Platonic friendship</p>
          </div>
          <button className="text-sm text-red-500 hover:text-red-600">
            Block
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.isOwn
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-200 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.isOwn ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Keep it friendly - this is for planning meetups only
          </p>
        </div>
      </div>
    </div>
  );
}
