import React, { useState, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { motion } from 'framer-motion';

export default function ChatWindow({ messages, selectedVisitorId, setMessages, visitors, setVisitors }) {
  const selectedVisitor = visitors.find(v => v.visitorId === selectedVisitorId);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = {
      messageId: crypto.randomUUID(),
      sessionId: messages[0]?.sessionId,
      senderId: 'agent-001',
      senderType: 'Agent',
      timestamp: new Date().toISOString(),
      content: input,
      isReadByReceiver: true,
      isHighlighted: false,
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');
  };

  return (
    <motion.div
      className="flex flex-col flex-1 bg-[#f7f7f8]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 bg-white border-b">
        <img
          src={selectedVisitor?.profileImageUrl || 'https://via.placeholder.com/40'}
          alt={selectedVisitor?.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-800">{selectedVisitor?.name}</p>
          <p className={`text-xs ${selectedVisitor?.isActive ? 'text-green-500' : 'text-gray-400'}`}>
            {selectedVisitor?.isActive ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>

      {/* Offline warning */}
      {!selectedVisitor?.isActive && (
        <div className="bg-yellow-100 text-yellow-800 text-sm px-6 py-2 border-b border-yellow-300">
          This visitor is currently offline.
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
        {messages.map(msg => (
          <MessageBubble key={msg.messageId} msg={msg} />
        ))}
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
          >
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );
}
