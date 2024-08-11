'use client'
import { Stack, TextField, Box, Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import Header from '../components/Header';
import './chatbot.css';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m the Headstarter support agent, how can I assist you today?'
    }
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    // Don't send empty messages
    if (!message.trim() || isLoading) return;
    setIsLoading(true);

    // Add user message and a placeholder for the assistant's response
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: message },
      { role: 'assistant', content: 'Typing...' }, // Placeholder for loading indication
    ]);

    const userMessage = message;
    setMessage('');
    
  
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: userMessage }]),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = '';

  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });

        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          const otherMessages = prevMessages.slice(0, prevMessages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: result }, // Update last message
          ];
        });
      }
    } catch (error) {
      console.error('Error:', error);
      // Show error message in UI
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, prevMessages.length - 1),
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
      ]);
    }

    setIsLoading(false);
  }

  // Handle enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }
    
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return(
  
    <Box
            width="100vw" 
            height="100vh" 
            display="flex" 
            flexDirection="column" 
            justifyContent="center" 
            alignItems="center">
    
  
    <Header/>
    <Stack
      direction="column"
      width="600px"
      height="700px"
      border="1px solid black"
      p={2}
      spacing={3}
    >
      <Stack 
        direction="column"
        spacing={2}
        flexGrow={1}
        overflow="auto"
        maxHeight="100%"
      >
        {
          messages.map((message, index) => (
            <Box 
              key= {index}
              display = 'flex'
              justifyContent={ message.role==='assistant' ? 'flex-start' : 'flex-end'
            }>
              <Box 
                bgcolor={
                  message.role==='assistant' ? 'primary.main': 'secondary.main'
                }
                color="white"
                borderRadius={16}
                p={3}
              >
              {message.content}
            </Box>
            </Box>
          ))
        }
        <div ref={messagesEndRef} />
      </Stack>
      <Stack direction="row" spacing = {2}>
        <TextField
          label="Message"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <Button 
            variant="contained" 
            onClick={sendMessage}
            disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </Stack>
    </Stack>
  </Box>
  )
}