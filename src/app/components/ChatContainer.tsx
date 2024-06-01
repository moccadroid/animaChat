'use client'

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Message, useChat } from 'ai/react';
import ChatInputComponent from './ChatInputComponent';
import ChatOutputComponent from './ChatOutputComponent';
import Stack from './ui/Stack';
import styles from './ChatContainer.module.scss';
import Container from './ui/Container';
import Textarea from './ui/Textarea';
import { generateRandomString } from '@/utils/generateRandom';
import Button from './ui/Button';

const initialPrompt = `SYSTEM PROMPT: You are the helpful chatbot of ANIMA. A contemporary dance school, with a speciality in Martha Graham technique. 
It is your job to answer any question a user has in this context. When asked who you are, come up with a short story about
your being the anima unicorn that helps people with their questions. When asked about information you don't have, 
just make something up that sounds plausible. Do not break character!`;

const initalWelcome = 'Welcome to the ANIMA chat arena!';

const ChatContainer: React.FC = () => {
  const { messages, append, setMessages } = useChat();
  const [ systemPromptValue, setSystemPromptValue] = useState<string>(initialPrompt);
  const [ systemPrompt, setSystemPrompt ] = useState<string>(initialPrompt);
  const [ welcome, setWelcome ] = useState<string>(initalWelcome);
  const [ showSidebar, setShowSidebar ] = useState<boolean>(true);

  useEffect(() => {
    const prompt = localStorage.getItem('systemPrompt');
    const welcome = localStorage.getItem('welcome');
    if (prompt) {
      setSystemPrompt(prompt);
      setSystemPromptValue(prompt);
      setWelcome(welcome ?? initalWelcome);
    }
  }, []);

  useEffect(() => {
    setMessages([{
      id: generateRandomString(4),
      role: 'user',
      content: systemPrompt,
    }]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemPrompt]);

  const handleSubmit = (value: string) => {
    append({
      role: 'user',
      content: value,
    })
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSystemPromptValue(e.target.value);
  }

  const handleNewSystemPrompt = (e: FormEvent<HTMLFormElement>) => {
    setSystemPrompt(systemPromptValue);
    localStorage.setItem('systemPrompt', systemPromptValue);
    localStorage.setItem('welcome', welcome);
  }

  const handleWelcomeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setWelcome(e.target.value);
  }

  const handleToggleSidebar = () => {
    setShowSidebar(prev => !prev);
  }

  return (
    <Container>
      <Stack direction="row">
        <div className={styles.chatContainer}>
          <Stack direction="column" justify="flex-start" align="stretch" gap="10px">
            <div className={styles.outputContainer}>
              <ChatOutputComponent messages={messages} welcome={welcome}/>
            </div>
            <div className={styles.inputContainer}>
              <ChatInputComponent onSubmit={handleSubmit} />
            </div>
          </Stack>
        </div>
        { showSidebar ?
          <Container width="600px">
            <div className={styles.systemPrompt}>
              <form onSubmit={handleNewSystemPrompt} style={{ height: "100%"}}>
                <Stack direction="column" gap="10px">
                  <Container height="40px">
                    <Stack justify="space-between" align="center">
                      System prompt:
                        <Button onClick={handleToggleSidebar}>Close</Button>
                    </Stack>
                  </Container>
                  <Container grow>
                    <Textarea onChange={handleChange} value={systemPrompt} />
                  </Container>
                  Welcome message:
                  <Container height="100px">
                      <Textarea onChange={handleWelcomeChange} value={welcome} />
                  </Container>
                  <Container height="80px" padding="20px 0">
                    <Button type="submit">Set system prompt</Button>
                  </Container>
                </Stack>
              </form>
            </div>
          </Container>
        : <div style={{ position: 'absolute', top: '20px', right: '20px'}}><Button onClick={handleToggleSidebar}>Show</Button></div> }
      </Stack>
    </Container>
  );
};

export default ChatContainer;
