import React from 'react';
import './ConversationList.css';
import userAvatar from '../assets/download.png'; // Replace with your image path

function ConversationList({ conversations, onSelectConversation }) {
  return (
    <div className="conversation-list">
      <h2>Past Conversations</h2>
      {conversations.map((conversation, index) => (
        <div
          key={index}
          className="conversation"
          onClick={() => onSelectConversation(conversation)}
        >
          <img src={userAvatar} alt="Avatar" />
          <div>
            <strong>Conversation {index + 1}</strong>
            <p>{conversation.question}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ConversationList;
