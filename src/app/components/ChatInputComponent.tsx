'use client'
import React, { useState, ChangeEvent, FormEvent, KeyboardEvent, useRef } from 'react';
import styles from './ChatInputComponent.module.scss';
import Textarea from './ui/Textarea';
import Button from './ui/Button';

interface ChatInputComponentProps {
  onSubmit: (value: string) => void;
}

const ChatInputComponent: React.FC<ChatInputComponentProps> = ({ onSubmit }) => {
  const [input, setInput] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    onSubmit(input);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      handleSubmit();
    }
  };

  return (
    <form className={styles.chatForm} onSubmit={handleFormSubmit}>
      <Textarea
        keepFocus
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
      />
      <Button type="submit">Send</Button>
    </form>
  );
};

export default ChatInputComponent;
