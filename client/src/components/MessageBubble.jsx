import React from 'react';

export default function MessageBubble({ msg }) {
  const isVisitor = msg.senderType === 'Visitor';
  return (
    <div className={`flex ${isVisitor ? 'justify-start' : 'justify-end'} mb-2`}>
      <div
        className={`px-4 py-2 max-w-[70%] rounded-xl text-sm shadow-sm whitespace-pre-line ${
          isVisitor ? 'bg-white text-gray-800' : 'bg-blue-600 text-white'
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}