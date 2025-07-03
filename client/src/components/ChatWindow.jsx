import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { motion } from 'framer-motion';

export default function ChatWindow({ messages, selectedVisitor, onSendMessage }) {
  const [input, setInput] = useState('');
  const scrollRef = useRef();

  const handleSend = () => {
    if (!input.trim() || !selectedVisitor) return;

    const newMsg = {
      messageId: crypto.randomUUID(),
      sessionId: selectedVisitor.currentChatSessionId,
      senderId: 'agent-001',
      senderType: 'Agent',
      timestamp: new Date().toISOString(),
      content: input,
      isReadByReceiver: true,
      isHighlighted: false,
    };

    onSendMessage(newMsg);
    setInput('');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!selectedVisitor) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Please select a visitor to start chatting.
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col flex-1 bg-[#f7f7f8]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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

      {!selectedVisitor?.isActive && (
        <div className="bg-yellow-100 text-yellow-800 text-sm px-6 py-2 border-b border-yellow-300">
          This visitor is currently offline.
        </div>
      )}

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
        {messages.map(msg => (
          <MessageBubble key={msg.messageId} msg={msg} isSeen={msg.isReadByReceiver} />
        ))}
      </div>

      <div className="px-6 py-4 border-t bg-white">
        <form className="flex gap-2" onSubmit={e => { e.preventDefault(); handleSend(); }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
          >
            Send
          </button>
        </form>
      </div>
    </motion.div>
  );
}
