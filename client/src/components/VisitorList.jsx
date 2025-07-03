import React from 'react';

export default function VisitorList({ visitors, selectedVisitorId, onSelectVisitor }) {
  return (
    <div className="w-1/4 bg-white border-r overflow-y-auto">
      <h2 className="p-4 text-sm font-semibold text-gray-700">Active</h2>
      {visitors.map(visitor => (
        <div
          key={visitor.visitorId}
          onClick={() => onSelectVisitor(visitor.visitorId)}
          className={`flex items-center px-4 py-3 cursor-pointer transition hover:bg-gray-100 ${
            visitor.visitorId === selectedVisitorId ? 'bg-gray-100' : ''
          }`}
        >
          <div className="relative">
            <img
              src={visitor.profileImageUrl || 'https://via.placeholder.com/40'}
              alt={visitor.name}
              className="w-10 h-10 rounded-full"
            />
            {visitor.isActive && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-900 truncate">{visitor.name}</p>
              {visitor.unreadMessageCount > 0 && (
                <span className="ml-2 text-xs font-semibold bg-red-500 text-white rounded-full px-2">
                  {visitor.unreadMessageCount}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 truncate">
              {visitor.lastMessageSnippet || 'New visitor started chat'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}