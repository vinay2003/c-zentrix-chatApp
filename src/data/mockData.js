export const visitorsData = [
  {
    visitorId: 'v1',
    name: 'Ana',
    email: 'ana21@mail.com',
    accountStatus: 'Active',
    lastActivity: new Date().toISOString(),
    isActive: true,
    unreadMessageCount: 1,
    lastMessageSnippet: 'Hey! I had like to personalize a suitcase.',
    profileImageUrl: 'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGh1bWFufGVufDB8fDB8fHww',
    customAttributes: {},
    currentChatSessionId: 's1'
  },
  {
    visitorId: 'v2',
    name: 'Abhay',
    email: 'abhay17@mail.com',
    accountStatus: 'Premium',
    lastActivity: new Date().toISOString(),
    isActive: true,
    unreadMessageCount: 2,
    lastMessageSnippet: 'The shipping takes too long so far...',
    profileImageUrl: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGh1bWFufGVufDB8fDB8fHww',
    customAttributes: {},
    currentChatSessionId: 's2'
  },
  {
    visitorId: 'v3',
    name: 'Binod',
    email: 'Binod04@gmail.com',
    accountStatus: 'Guest',
    lastActivity: new Date().toISOString(),
    isActive: false,
    unreadMessageCount: 0,
    lastMessageSnippet: 'Yes, I made a mistake could you help?',
    profileImageUrl: 'https://images.unsplash.com/photo-1517308883849-ceac3c24681e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGh1bWFufGVufDB8fDB8fHww',
    customAttributes: {},
    currentChatSessionId: 's3'
  }
];

export const messagesData = [
  {
    messageId: 'm1',
    sessionId: 's1',
    senderId: 'v1',
    senderType: 'Visitor',
    timestamp: new Date().toISOString(),
    content: 'Hey! I had like to personalize a suitcase. What options do I have?',
    isReadByReceiver: false,
    isHighlighted: true
  },
  {
    messageId: 'm2',
    sessionId: 's2',
    senderId: 'v2',
    senderType: 'Visitor',
    timestamp: new Date().toISOString(),
    content: 'The shipping takes too long so far...',
    isReadByReceiver: false,
    isHighlighted: false
  },
  {
    messageId: 'm3',
    sessionId: 's3',
    senderId: 'v3',
    senderType: 'Visitor',
    timestamp: new Date().toISOString(),
    content: 'Yes, I made a mistake - could you help?',
    isReadByReceiver: false,
    isHighlighted: false
  }
];
