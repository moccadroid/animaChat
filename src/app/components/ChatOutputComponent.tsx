import React from 'react';
import { Message } from 'ai/react';
import styles from './ChatOutputComponent.module.scss';

interface ChatOutputComponentProps {
  messages: Message[];
}

const ChatOutputComponent: React.FC<ChatOutputComponentProps> = ({ messages }) => {
  const chatMessages = messages.slice(1);
  return (
    <div className={styles.chatOutput}>
      {chatMessages.map((message) => (
        <div
          key={message.id}
          className={
            message.role === 'user' ? styles.userMessage : styles.aiMessage
          }
        >
          <div className={styles.messageHeader}>
            {message.role === 'user' ? 'You' : 'Anima'}
          </div>
          <div className={styles.messageContent}>{message.content}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatOutputComponent;
