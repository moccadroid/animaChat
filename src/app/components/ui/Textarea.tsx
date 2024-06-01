'use client'
import React, { useState, ChangeEvent, KeyboardEvent, useRef, useEffect } from 'react';
import styles from './Textarea.module.scss';

interface TextareaProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  keepFocus?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({ value, onChange, onKeyDown, placeholder, keepFocus }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (keepFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [keepFocus, value]);

  return (
    <textarea
      ref={textareaRef}
      className={styles.textarea}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
    />
  );
};

export default Textarea;
