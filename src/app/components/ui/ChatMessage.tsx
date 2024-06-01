import React from 'react';
import styles from './ChatMessage.module.scss';

interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool';
  content: string;
  userLabel?: string;
  aiLabel?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({  role, content, userLabel = 'You', aiLabel = 'Anima' }) => {
  return (
    <div
      className={role === 'user' ? styles.userMessage : styles.aiMessage}
    >
      <div className={styles.messageHeader}>
        {role === 'user' ? userLabel : aiLabel}
      </div>
      <div className={styles.messageContent}>{content}</div>
    </div>
  );
};

export default ChatMessage;
