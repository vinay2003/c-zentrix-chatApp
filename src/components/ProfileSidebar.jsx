import React from 'react';
import { motion } from 'framer-motion';

export default function ProfileSidebar({ visitor, messages }) {
  const onlineStatus = visitor.isActive ? 'Online' : 'Offline';

  const formatTime = (iso) => {
    const date = new Date(iso);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get the last message from the visitor
  const lastVisitorMessage = [...messages]
    .filter(msg => msg.senderType === 'Visitor')
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

  const lastSeen = lastVisitorMessage ? formatTime(lastVisitorMessage.timestamp) : 'N/A';

  return (
    <motion.div
      className="w-1/4 border-l bg-white p-6"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center">
        <img
          src={visitor.profileImageUrl || 'https://via.placeholder.com/64'}
          alt={visitor.name}
          className="w-20 h-20 rounded-full border"
        />
        <p className="mt-3 font-semibold text-lg">{visitor.name}</p>
        <p className="text-sm text-gray-500">{visitor.email || 'unknown@mail.com'}</p>
        <p className={`text-xs mt-1 font-medium ${visitor.isActive ? 'text-green-500' : 'text-gray-400'}`}>
          {onlineStatus}
          {!visitor.isActive && lastSeen !== 'N/A' && (
            <span className="ml-2 text-gray-500">(Last seen at {lastSeen})</span>
          )}
        </p>
      </div>

      <div className="mt-6 w-full">
        <h4 className="text-sm font-semibold text-gray-600 mb-2">Last 5 Messages</h4>
        <ul className="text-sm text-gray-700 space-y-2 w-full">
          {[...messages].slice(-5).map(msg => (
            <li key={msg.messageId} className="truncate">
              <span className="font-medium text-gray-500 mr-1">
                {msg.senderType === 'Agent' ? 'You' : visitor.name}:
              </span>
              <span className="text-gray-700">{msg.content}</span>
              <span className="ml-2 text-xs text-gray-400">({formatTime(msg.timestamp)})</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
