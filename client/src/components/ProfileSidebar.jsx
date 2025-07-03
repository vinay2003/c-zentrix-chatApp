import React, { memo, useMemo } from 'react';
import { User, Mail, Clock, MessageCircle } from 'lucide-react';

const ProfileSidebar = memo(function ProfileSidebar({ visitor, messages }) {
  const stats = useMemo(() => {
    if (!visitor) return { totalMessages: 0, visitorMessages: 0, lastSeen: null };

    const visitorMessages = messages.filter(msg => msg.senderType === 'Visitor');
    const lastVisitorMessage = [...visitorMessages]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

    return {
      totalMessages: messages.length,
      visitorMessages: visitorMessages.length,
      lastSeen: lastVisitorMessage ? new Date(lastVisitorMessage.timestamp) : null,
    };
  }, [visitor, messages]);

  const recentMessages = useMemo(() => {
    return [...messages]
      .slice(-5)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }, [messages]);

  if (!visitor) {
    return (
      <div className="w-80 border-l border-gray-200 bg-white p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">Select a visitor to view their profile</p>
        </div>
      </div>
    );
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatLastSeen = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto">
      {/* Profile Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="text-center">
          <div className="relative inline-block">
            <img
              src={visitor.profileImageUrl}
              alt={visitor.name}
              className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
            />
            {visitor.isActive && (
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">{visitor.name}</h3>
          <p className="text-sm text-gray-500 flex items-center justify-center mt-1">
            <Mail className="w-4 h-4 mr-1" />
            {visitor.email}
          </p>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-3 ${
            visitor.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${visitor.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            {visitor.isActive ? 'Online' : 'Offline'}
          </div>
        </div>
      </div>

      {/* Conversation Stats */}
      <div className="p-6 border-b border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Conversation Stats</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MessageCircle className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">Total Messages</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{stats.totalMessages}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <User className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">Visitor Messages</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{stats.visitorMessages}</span>
          </div>
          {stats.lastSeen && !visitor.isActive && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Last Seen</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{formatLastSeen(stats.lastSeen)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Recent Messages */}
      <div className="p-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Recent Messages</h4>
        {recentMessages.length === 0 ? (
          <p className="text-sm text-gray-500">No messages yet</p>
        ) : (
          <div className="space-y-3">
            {recentMessages.map((message) => (
              <div key={message.messageId} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-start justify-between mb-1">
                  <span className="text-xs font-medium text-gray-600">
                    {message.senderType === 'Agent' ? 'You' : visitor.name}
                  </span>
                  <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
                </div>
                <p className="text-sm text-gray-800 line-clamp-2">{message.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default ProfileSidebar;
