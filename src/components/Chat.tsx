'use client';

import { useState } from 'react';
import { PaperAirplaneIcon, UserCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Header from './Header';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

interface Conversation {
  id: string;
  userId: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
}

interface ChatProps {
  selectedUserId?: string;
  onNavigate: (page: string) => void;
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    userId: '1',
    name: 'John',
    lastMessage: '8 AM at Balboa Park. Should be a good group!',
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    unreadCount: 0
  },
  {
    id: '2',
    userId: '2',
    name: 'Mike',
    lastMessage: 'Want to grab a beer this weekend?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unreadCount: 1
  },
  {
    id: '3',
    userId: '3',
    name: 'Mark',
    lastMessage: 'Great game yesterday!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unreadCount: 0
  }
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      senderId: 'match',
      content: 'Hey! I saw we both like cycling. Want to join the Saturday group ride?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isOwn: false
    },
    {
      id: '2',
      senderId: 'user',
      content: 'That sounds great! What time does it start?',
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      isOwn: true
    },
    {
      id: '3',
      senderId: 'match',
      content: '8 AM at Balboa Park. Should be a good group!',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      isOwn: false
    }
  ],
  '2': [
    {
      id: '1',
      senderId: 'match',
      content: 'Hey! I saw we both like craft beer. Want to grab a beer this weekend?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isOwn: false
    }
  ],
  '3': [
    {
      id: '1',
      senderId: 'user',
      content: 'Great game yesterday!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      isOwn: true
    }
  ]
};

export default function Chat({ selectedUserId, onNavigate }: ChatProps) {
  const [conversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [selectedUser, setSelectedUser] = useState<string | null>(selectedUserId || null);
  const [messages, setMessages] = useState<Message[]>(selectedUserId ? MOCK_MESSAGES[selectedUserId] || [] : []);
  const [newMessage, setNewMessage] = useState('');

  const handleSelectConversation = (userId: string) => {
    setSelectedUser(userId);
    setMessages(MOCK_MESSAGES[userId] || []);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser) {
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

  const handleBack = () => {
    setSelectedUser(null);
  };

  // Show conversation list
  if (!selectedUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="max-w-md mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages</h2>
          
          <div className="space-y-3">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation.userId)}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <UserCircleIcon className="h-12 w-12 text-gray-400" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">
                        {conversation.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {conversations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No conversations yet</p>
              <p className="text-sm text-gray-400 mt-2">Start waving at matches to begin chatting!</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show individual chat
  const currentConversation = conversations.find(c => c.userId === selectedUser);
  const matchName = currentConversation?.name || 'Unknown';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto h-screen flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
          </button>
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
