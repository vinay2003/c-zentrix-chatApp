import React, { useState, useEffect } from 'react';
import VisitorList from './components/VisitorList';
import ChatWindow from './components/ChatWindow';
import ProfileSidebar from './components/ProfileSidebar';
import { visitorsData, messagesData } from './data/mockData';

export default function App() {
  const [visitors, setVisitors] = useState(visitorsData);
  const [messages, setMessages] = useState(messagesData);
  const [selectedVisitorId, setSelectedVisitorId] = useState(visitors[0].visitorId);

  // Indian names
  const indianMaleNames = ["Raj", "Amit", "Vikram", "Sanjay", "Rohan", "Karan", "Arjun", "Anil"];
  const indianFemaleNames = ["Priya", "Neha", "Asha", "Kriti", "Anjali", "Deepa", "Meena", "Riya"];

  // Male & Female images
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

  // Automatically sending messages
  useEffect(() => {
    const visitorTimer = setInterval(() => {
      const randomVisitorIndex = Math.floor(Math.random() * visitors.length);
      const visitor = visitors[randomVisitorIndex];
      if (!visitor || !visitor.isActive) return;

      const newMsg = {
        messageId: crypto.randomUUID(),
        sessionId: visitor.currentChatSessionId,
        senderId: visitor.visitorId,
        senderType: 'Visitor',
        timestamp: new Date().toISOString(),
        content: 'New simulated message from visitor.',
        isReadByReceiver: false,
        isHighlighted: true,
      };

      setMessages(prev => [...prev, newMsg]);
      setVisitors(prev =>
        prev.map(v =>
          v.visitorId === visitor.visitorId
            ? {
                ...v,
                unreadMessageCount: selectedVisitorId === v.visitorId ? 0 : v.unreadMessageCount + 1,
                lastMessageSnippet: newMsg.content,
              }
            : v
        )
      );
    }, 5000);

    return () => clearInterval(visitorTimer);
  }, [visitors, selectedVisitorId]);

  // Random visitors adding
  useEffect(() => {
    const addVisitorInterval = setInterval(() => {
      const gender = Math.random() < 0.5 ? 'male' : 'female';
      const name = gender === 'male'
        ? indianMaleNames[Math.floor(Math.random() * indianMaleNames.length)]
        : indianFemaleNames[Math.floor(Math.random() * indianFemaleNames.length)];
      const imageUrl = gender === 'male'
        ? maleImages[Math.floor(Math.random() * maleImages.length)]
        : femaleImages[Math.floor(Math.random() * femaleImages.length)];

      const newVisitorId = crypto.randomUUID();
      const newVisitor = {
        visitorId: newVisitorId,
        name,
        email: `${name.toLowerCase()}${Math.floor(Math.random() * 100)}@gmail.com`,
        profileImageUrl: imageUrl,
        isActive: true,
        currentChatSessionId: crypto.randomUUID(),
        unreadMessageCount: 0,
        lastMessageSnippet: '',
      };

      setVisitors(prev => [...prev, newVisitor]);
    }, 15000);

    return () => clearInterval(addVisitorInterval);
  }, []);

  useEffect(() => {
  const disconnectIntervals = [5, 7, 9, 11, 15];
  const timeouts = disconnectIntervals.map(min =>
    setTimeout(() => {
      setVisitors(prev => {
        const activeVisitors = prev.filter(v => v.isActive);
        if (activeVisitors.length === 0) return prev;

        const randomVisitor = activeVisitors[Math.floor(Math.random() * activeVisitors.length)];
        return prev.map(v =>
          v.visitorId === randomVisitor.visitorId
            ? { ...v, isActive: false }
            : v
        );
      });
    }, min * 60 * 1000)
  );

  return () => timeouts.forEach(clearTimeout);
}, []);

  useEffect(() => {
    if (!selectedVisitorId) return;
    setVisitors(prev =>
      prev.map(v =>
        v.visitorId === selectedVisitorId
          ? { ...v, unreadMessageCount: 0 }
          : v
      )
    );
  }, [selectedVisitorId]);

  return (
    <div className="flex h-screen overflow-hidden">
      <VisitorList
        visitors={visitors}
        selectedVisitorId={selectedVisitorId}
        onSelectVisitor={setSelectedVisitorId}
      />
      <ChatWindow
        messages={messages.filter(
          msg =>
            msg.sessionId ===
            visitors.find(v => v.visitorId === selectedVisitorId)?.currentChatSessionId
        )}
        selectedVisitorId={selectedVisitorId}
        setMessages={setMessages}
        visitors={visitors}
        setVisitors={setVisitors}
      />
      <ProfileSidebar
        visitor={visitors.find(v => v.visitorId === selectedVisitorId)}
        messages={messages.filter(
          msg =>
            msg.sessionId ===
            visitors.find(v => v.visitorId === selectedVisitorId)?.currentChatSessionId
        )}
      />
    </div>
  );
}
