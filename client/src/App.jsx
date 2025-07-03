import React, { useReducer, useEffect, useMemo } from 'react';
import VisitorList from './components/VisitorList';
import ChatWindow from './components/ChatWindow';
import ProfileSidebar from './components/ProfileSidebar';
import { chatReducer, initialState, ACTIONS } from './reducer/chatReducer';

export default function App() {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { visitors, messages, selectedVisitorId } = state;

  const selectedVisitor = useMemo(
    () => visitors.find(v => v.visitorId === selectedVisitorId),
    [visitors, selectedVisitorId]
  );

  const sessionMessages = useMemo(
    () =>
      messages.filter(
        msg => msg.sessionId === selectedVisitor?.currentChatSessionId
      ),
    [messages, selectedVisitor]
  );

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:4000');

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onmessage = event => {
      const { type, payload } = JSON.parse(event.data);

      switch (type) {
        case 'INIT':
          dispatch({ type: ACTIONS.LOAD_INITIAL, payload });
          break;
        case 'NEW_VISITOR':
          dispatch({ type: ACTIONS.ADD_VISITOR_FROM_SERVER, payload });
          break;
        case 'NEW_MESSAGE':
          dispatch({ type: ACTIONS.ADD_MESSAGE_FROM_SERVER, payload });
          break;
        case 'UPDATE_VISITOR':
          dispatch({ type: ACTIONS.UPDATE_VISITOR, payload });
          break;
        default:
          console.warn('Unknown message type from server:', type);
      }
    };

    // WebSocket to state
    dispatch({ type: ACTIONS.SET_SOCKET, payload: socket });

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (!selectedVisitorId) return;
    dispatch({ type: ACTIONS.CLEAR_UNREAD, payload: { visitorId: selectedVisitorId } });
  }, [selectedVisitorId]);

  const handleSendMessage = (msg) => {
    if (state.socket && state.socket.readyState === WebSocket.OPEN) {
      state.socket.send(JSON.stringify({ type: 'SEND_AGENT_MESSAGE', payload: msg }));
    }

    dispatch({ type: ACTIONS.ADD_AGENT_MESSAGE, payload: msg });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <VisitorList
        visitors={visitors}
        selectedVisitorId={selectedVisitorId}
        onSelectVisitor={id =>
          dispatch({ type: ACTIONS.SELECT_VISITOR, payload: id })
        }
      />
      <ChatWindow
        messages={sessionMessages}
        selectedVisitor={selectedVisitor}
        onSendMessage={handleSendMessage}
      />
      <ProfileSidebar visitor={selectedVisitor} messages={sessionMessages} />
    </div>
  );
}
