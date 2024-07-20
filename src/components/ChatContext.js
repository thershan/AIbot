// src/contexts/ChatContext.js
import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  const saveConversation = () => {
    setConversations([...conversations, { messages, feedback: null }]);
    setMessages([]);
  };

  const submitFeedback = (feedback) => {
    const updatedConversations = conversations.map((conv, index) => {
      if (index === feedback.conversationId) {
        return { ...conv, feedback };
      }
      return conv;
    });
    setConversations(updatedConversations);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, saveConversation, submitFeedback }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
