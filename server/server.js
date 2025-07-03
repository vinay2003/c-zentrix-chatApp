import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import http from 'http';
import { generateRandomVisitor, generateRandomMessage } from './utils/visitorGenerator.js';

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

let visitors = [];
let messages = [];

function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === 1) client.send(JSON.stringify(data));
  });
}

wss.on('connection', ws => {
  ws.send(JSON.stringify({ type: 'INIT', payload: { visitors: visitors || [], messages: messages || [] } }));

  ws.on('message', msg => {
    const data = JSON.parse(msg);
    switch (data.type) {
      case 'SEND_AGENT_MESSAGE':
        messages.push(data.payload);
        broadcast({ type: 'NEW_MESSAGE', payload: data.payload });
        break;
    }
  });
});

// Add new visitor
setInterval(() => {
  const visitor = generateRandomVisitor();
  visitors.push(visitor);
  broadcast({ type: 'NEW_VISITOR', payload: visitor });
}, 15000);

// Send message every 5s
setInterval(() => {
  const active = visitors.filter(v => v.isActive);
  if (active.length === 0) return;
  const visitor = active[Math.floor(Math.random() * active.length)];
  const message = generateRandomMessage(visitor);

  const exists = messages.find(m => m.messageId === message.messageId);
  if (!exists) {
    messages.push(message);
    visitors = visitors.map(v =>
      v.visitorId === visitor.visitorId
        ? { ...v, lastMessageSnippet: message.content, unreadMessageCount: v.unreadMessageCount + 1 }
        : v
    );
    broadcast({ type: 'NEW_MESSAGE', payload: message });
  }
}, 5000);

[5, 7, 9, 11, 15].forEach(min => {
  setTimeout(() => {
    const active = visitors.filter(v => v.isActive);
    if (active.length === 0) return;
    const victim = active[Math.floor(Math.random() * active.length)];
    visitors = visitors.map(v => v.visitorId === victim.visitorId ? { ...v, isActive: false } : v);
    broadcast({ type: 'UPDATE_VISITOR', payload: { visitorId: victim.visitorId } });
  }, min * 60000);
});

server.listen(4000, () => console.log('WebSocket Server running on http://localhost:4000'));
