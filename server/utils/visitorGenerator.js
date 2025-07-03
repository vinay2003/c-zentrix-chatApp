const { randomUUID } = require('crypto');

const maleNames = ["Raj", "Amit", "Vikram", "Sanjay", "Rohan", "Karan", "Arjun", "Anil"];
const femaleNames = ["Priya", "Neha", "Asha", "Kriti", "Anjali", "Deepa", "Meena", "Riya"];
const maleImages = [
  "https://randomuser.me/api/portraits/men/11.jpg",
  "https://randomuser.me/api/portraits/men/31.jpg",
  "https://randomuser.me/api/portraits/men/45.jpg",
  "https://randomuser.me/api/portraits/men/56.jpg",
  "https://randomuser.me/api/portraits/men/67.jpg",
  "https://randomuser.me/api/portraits/men/79.jpg"
];
const femaleImages = [
  "https://randomuser.me/api/portraits/women/21.jpg",
  "https://randomuser.me/api/portraits/women/36.jpg",
  "https://randomuser.me/api/portraits/women/48.jpg",
  "https://randomuser.me/api/portraits/women/59.jpg",
  "https://randomuser.me/api/portraits/women/63.jpg",
  "https://randomuser.me/api/portraits/women/82.jpg"
];

function generateRandomVisitor() {
  const gender = Math.random() < 0.5 ? 'male' : 'female';
  const name = gender === 'male'
    ? maleNames[Math.floor(Math.random() * maleNames.length)]
    : femaleNames[Math.floor(Math.random() * femaleNames.length)];
  const profileImageUrl = gender === 'male'
    ? maleImages[Math.floor(Math.random() * maleImages.length)]
    : femaleImages[Math.floor(Math.random() * femaleImages.length)];
  return {
    visitorId: randomUUID(),
    name,
    email: `${name.toLowerCase()}${Math.floor(Math.random() * 100)}@gmail.com`,
    profileImageUrl,
    isActive: true,
    currentChatSessionId: randomUUID(),
    unreadMessageCount: 0,
    lastMessageSnippet: '',
  };
}

function generateRandomMessage(visitor) {
  return {
    messageId: randomUUID(),
    sessionId: visitor.currentChatSessionId,
    senderId: visitor.visitorId,
    senderType: 'Visitor',
    timestamp: new Date().toISOString(),
    content: 'New simulated message from visitor.',
    isReadByReceiver: false,
    isHighlighted: true,
  };
}

module.exports = { generateRandomVisitor, generateRandomMessage };
