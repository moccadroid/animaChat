import React from 'react';
import { Message } from 'ai/react';
import styles from './ChatOutputComponent.module.scss';
import ChatMessage from './ui/ChatMessage';

interface ChatOutputComponentProps {
  messages: Message[];
  welcome: string;
}

const ChatOutputComponent: React.FC<ChatOutputComponentProps> = ({ messages, welcome }) => {
  const chatMessages = messages.slice(1);
  return (
    <div className={styles.chatOutput}>
      <ChatMessage role="assistant" content={welcome} />
      {chatMessages.map((message) => (
        <ChatMessage key={message.id} role={message.role} content={message.content}/>
      ))}
    </div>
  );
};

export default ChatOutputComponent;
