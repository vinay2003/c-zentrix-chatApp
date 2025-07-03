export const ACTIONS = {
  LOAD_INITIAL: 'load-initial',
  ADD_VISITOR_FROM_SERVER: 'add-visitor-from-server',
  ADD_MESSAGE_FROM_SERVER: 'add-message-from-server',
  ADD_AGENT_MESSAGE: 'add-agent-message',
  UPDATE_VISITOR: 'update-visitor',
  SELECT_VISITOR: 'select-visitor',
  CLEAR_UNREAD: 'clear-unread',
  SET_SOCKET: 'set-socket',
};

export const initialState = {
  visitors: [],
  messages: [],
  selectedVisitorId: null,
  socket: null,
};

export function chatReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_SOCKET:
      return { ...state, socket: action.payload };

    case ACTIONS.LOAD_INITIAL: {
      const { visitors = [], messages = [] } = action.payload || {};
      return {
        ...state,
        visitors,
        messages,
        selectedVisitorId: visitors[0]?.visitorId || null,
      };
    }

    case ACTIONS.ADD_VISITOR_FROM_SERVER:
      return {
        ...state,
        visitors: [...state.visitors, action.payload],
      };

    case ACTIONS.ADD_MESSAGE_FROM_SERVER: {
      const exists = state.messages.some(msg => msg.messageId === action.payload.messageId);
      if (exists) return state;
      return {
        ...state,
        messages: [...state.messages, action.payload],
        visitors: state.visitors.map(v =>
          v.visitorId === action.payload.senderId
            ? {
                ...v,
                unreadMessageCount:
                  v.visitorId === state.selectedVisitorId
                    ? 0
                    : (v.unreadMessageCount || 0) + 1,
                lastMessageSnippet: action.payload.content,
              }
            : v
        ),
      };
    }

    case ACTIONS.UPDATE_VISITOR:
      return {
        ...state,
        visitors: state.visitors.map(v =>
          v.visitorId === action.payload.visitorId
            ? { ...v, isActive: false }
            : v
        ),
      };

    case ACTIONS.ADD_AGENT_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case ACTIONS.SELECT_VISITOR:
      return {
        ...state,
        selectedVisitorId: action.payload,
      };

    case ACTIONS.CLEAR_UNREAD:
      return {
        ...state,
        visitors: state.visitors.map(v =>
          v.visitorId === action.payload.visitorId
            ? { ...v, unreadMessageCount: 0 }
            : v
        ),
      };

    default:
      return state;
  }
}
